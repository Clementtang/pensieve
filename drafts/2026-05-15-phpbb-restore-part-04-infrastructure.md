---
title: "部署架構，從 Bluehost shared hosting 到 1 GB VPS"
description: "DigitalOcean SGP1 一台 1 GB droplet 怎麼跑 phpBB 兩站加 WordPress 加兩個 MySQL instance。Traefik path-based routing、Resend SMTP relay 繞過 DO 封 port、MySQL in-place 升級的實作細節。"
date: 2026-05-15
author: "Clement Tang"
tags: ["docker", "traefik", "mysql", "smtp", "self-hosting", "blog-series"]
category: articles
status: draft
series: "phpBB Restore Series"
seriesPart: 4
---

# 部署架構，從 Bluehost shared hosting 到 1 GB VPS

> DigitalOcean SGP1 一台 1 GB droplet 怎麼跑 phpBB 兩站加 WordPress 加兩個 MySQL instance。Traefik path-based routing、Resend SMTP relay 繞過 DO 封 port、MySQL in-place 升級的實作細節。系列文 5 篇之 #4。

## 1 GB RAM 跑得動嗎，盤點要塞進去的東西

[#3 那篇](2026-05-13-phpbb-restore-part-03-data-recovery)講完了資料復原。資料層接好之後，下一步是把這些資料放在哪裡跑。

要塞進這台 VPS 的東西有六個 service。phpBB eq2 站一份（PHP 8.1 + Apache）、phpBB eq 站一份（同上）、WordPress 一份（PHP 8.2 + Apache）、phpBB 兩站共用一個 MySQL 8.0 instance、WordPress 自己一個獨立 MySQL 8.0 instance、最外面一層 Traefik v3 做 reverse proxy 與 HTTPS 終止。六個 container 加起來要在 1 GB RAM 的機器上跑得動，而且還要留 buffer 給 Docker daemon、Linux kernel、定期跑的 cron job。

這個配置看起來很擠，但對公會論壇這種低互動流量站夠用。MySQL 那邊 innodb_buffer_pool 縮過、VPS 加了 2 GB swap 防 docker build 時的 memory peak，平時跑得穩。

這篇文章想記錄的是這個架構長什麼樣，包含為什麼選這幾個元件、怎麼配置、踩過哪幾個坑。資料層的 detail 在 #3，這篇處理基礎設施那一層。

## 為什麼選 DigitalOcean SGP1

選 hosting 時我考慮過三家，DigitalOcean、Linode（現在叫 Akamai）、Vultr，最後選 DigitalOcean SGP1。三個原因。

第一是地理位置。我人在越南河內，公會剩下的活躍老友散在台灣、香港、東南亞、北美。SGP1（新加坡）是這個分布的重心，從河內 ping VPS round-trip 大約 140 ms，從 VPS 反向 ping 台灣 HiNet 大約 80 ms，北美段沒實測但 routing 上會更高。對公會論壇這種低互動性 archive 流量算可接受。同樣價位 DigitalOcean 在亞洲的選項只有 SGP1 跟 BLR1（班加羅爾），BLR1 對東亞延遲不友善。

第二是訂閱模式與費率。1 GB / 1 vCPU / 25 GB SSD 的 Basic Droplet 月費 $6、年費 $72，可以隨時 destroy 立刻停止計費，沒有像 Bluehost 那種一年合約綁約。實際成本上比 Bluehost WordPress Plus Hosting 一年 $214 便宜不少，加上 root SSH 完全控制權。

第三是社群成熟度。Docker、Traefik、Let's Encrypt 這條 stack 在 DigitalOcean 上是 well-trodden path，社群文件多、踩雷別人都踩過、解法都在 GitHub issue 跟 Stack Overflow 上。我這種非工程師背景做這種專案最需要的就是「踩雷一搜就有答案」的環境。

選定之後 30 分鐘內 droplet 就開好了，hostname 取名 `tsm-forum`（The Sun Moon），第一件事是把 SSH key 加進 1Password agent、關掉 password login、開 ufw、加 swapfile，跑 `apt update && apt upgrade` 把 base image 補到當前 patch level。這些都是 standard server hardening 的標準步驟，網路上一搜就有 checklist，照著跑就行。

## Docker Compose 六個 service 的架構

整個 production 跑在一份 `docker-compose.yml` 裡，六個 service 按職責拆開。

最外層的 Traefik 監聽 80 / 443 兩個 port，所有對 `eq2.3d-olg.net` 跟 `eq.3d-olg.net` 的 inbound HTTPS 流量都經過它，由它根據 host 與 path 把 request 路由到對應的後端 container。Traefik 同時負責 Let's Encrypt 自動申請與續簽憑證，這部分後面會講。

phpBB eq2 跟 phpBB eq 兩個 service 用同一份 Dockerfile 起來，base image 是 `php:8.1-apache`，加了 mysqli、GD、opcache、zip 這幾個 phpBB 跑得起來必要的 PHP extension。兩個 container 共用一個 MySQL 8.0 instance（phpbb-db），兩站 DB 用不同 schema name 隔離（`eq2_db` 與 `eq_db`），不同 prefix（`phpbb3_` vs `phpbb_`）也降低跨站誤操作的風險。

WordPress 那邊我刻意做了獨立的 db-wordpress instance，跟 phpBB 的 MySQL 完全隔離。為什麼？因為 [#3](2026-05-13-phpbb-restore-part-03-data-recovery) 提過 WordPress 走的是 Y 方案，是個 archive，14 篇 publish post 加 12 user 的小資料量，但它 schema 升級過程動到了 utf8 → utf8mb4 conversion、跑了 4 段 image 切換、總共改過幾百個 schema 變更。這條鏈如果 share MySQL instance 跟 phpBB 的話，任何一個 WordPress 升級腳本意外副作用都可能波及 phpBB。隔離兩個 instance 是用一點記憶體換掉一個 SPOF 風險，划得來。

備份策略放在 `/etc/cron.d/phpbb-backup`，phpBB DB 在每日 UTC 04:00 跑、WordPress DB 在 04:05 跑，各自 dump gzip 後存到 `/opt/phpbb/backups/db-YYYY-MM-DD.sql.gz` 與 `wp-db-YYYY-MM-DD.sql.gz`，保留 30 天輪替（`find -mtime +30 -delete`）。dump 用 `--single-transaction` 避免鎖表，密碼從 `/opt/phpbb/.env` 用 sed 抽出來注入而不是 hard-code 在 cron 檔裡，整個過程不到 30 秒結束，使用者完全感受不到。

Volume 設計上 mysql_data、wp_mysql_data、wp_html、traefik_letsencrypt 都是 named volume，docker-compose down 不會被刪掉。phpBB 兩站的 `/var/www/html` 透過 bind mount 掛 `/opt/phpbb/eq2/community/` 跟 `/opt/phpbb/eq/`，這樣 hot-fix 時用 `docker exec` 或直接編 host 端的檔都行，不用每次 rebuild image。

## Traefik 一個 domain 怎麼分流到三站

Traefik 設定的關鍵是 path-based routing，因為一個 domain `eq2.3d-olg.net` 同時要服務 phpBB 跟 WordPress 兩個應用。

eq2 phpBB 的 router rule 是 `Host(eq2.3d-olg.net) && (PathPrefix(/community) || PathPrefix(/theme))`，priority 100。`/community/` 是論壇的 entry point、`/theme/` 是舊版網站層的靜態 CSS（tsm 樣式有引用），這兩個 path 命中 phpBB container。

WordPress 的 router rule 是 `Host(eq2.3d-olg.net)`，priority 1。這是個 catch-all，凡是 host 對但 path 不是 phpBB 那兩個 prefix 的 request 都進到 WordPress。priority 1 比 phpBB 的 100 低，Traefik 會優先 match phpBB rule，剩下落到 WordPress。

eq 站簡單，自己一個 domain，rule 就是 `Host(eq.3d-olg.net)`。

這個分流讓 <https://eq2.3d-olg.net/> 看到 WordPress archive 首頁、<https://eq2.3d-olg.net/community/> 進到 phpBB 論壇、<https://eq2.3d-olg.net/theme/index.css> 拿到舊版 CSS。三條路共存在同一個 domain 底下、各自獨立。

寫 Traefik label 的時候我踩過一個小坑，priority 沒設或設一樣大的時候，Traefik 用 router 名稱字母順序決定，這個 fallback 行為在我們的 case 會讓 WordPress 比 phpBB 先 match，所有 `/community/` request 都會掉到 WordPress 然後 404。明確設 priority=100 vs 1 之後就不會出這個問題。

還有一個跟分流無關、但同樣是 Traefik 設定的坑——image tag。一開始 `docker-compose.yml` 我寫 `traefik:latest`，方便、每次重建都拿最新版。但 `latest` 是浮動 tag，哪天重建 container 撈到一個帶 breaking change 的新版本，reverse proxy 起不來就是三站一起掛，而且當下未必聯想得到是 Traefik 自己升版造成的。後來鎖成 `traefik:v3.6`，minor 版本固定、patch 還是會自動更新，要跳大版本時我自己挑時間。基礎設施這一層的 image，穩定性比追新版重要，該 pin 就 pin。

## HTTPS 與 Let's Encrypt 自動續簽

Traefik 內建 Let's Encrypt ACME client，初次啟動時為兩個 domain 各申請一張 cert，存到 traefik_letsencrypt volume，每 60 天自動續簽一次（cert 有效期 90 天，提前 30 天續）。

整個流程跑得很順，唯一要記得的是 Cloudflare DNS 那邊的 proxied 模式要關掉，否則 ACME challenge 路由不到 Traefik。我們選擇 DNS-only 模式（灰雲），不走 Cloudflare proxy。

## SMTP 怎麼在 DigitalOcean 上寄出去

phpBB 跟 WordPress 都需要寄系統信，phpBB 的 forgot_password、新成員 confirm email、版主通知這些都是郵件流程；WordPress 的 admin notification 雖然 archive 用不太到但保留功能。

問題出在 DigitalOcean 預設封了所有 outbound 的標準 SMTP port（25、465、587），這是 DO 為了防止 droplet 被濫發垃圾信而做的限制，新帳號要寄 outbound mail 必須申請解封或走 third-party relay。我選了走 relay。

relay 用 [Resend](https://resend.com/)，理由是它有 free tier（每月 3,000 封信、每天 100 封、可掛 1 個 domain、30 天 data retention）、API 跟 SMTP 兩種介面、SPF / DKIM / DMARC 自動處理 alignment、UI 直接看每封信的送達狀態跟 bounce log。對公會論壇這種低流量場景非常合適，1 domain 的 limit 我們只用一個 `3d-olg.net` 也剛好。

實作上踩了兩個小坑值得記下來。第一是 port 選擇。Resend 跟其他 relay 一樣標準 port 是 25 / 465 / 587 三個都支援，但 DO 那三個全 block，所以要走 Resend 的 alternate port 2465（implicit SSL）跟 2587（STARTTLS）。phpBB 3.3 對 STARTTLS 比較相容，最後用 2587。

第二是 from address 限制。Resend 的 API key 可以設 `Sending access restricted to root domain`，意思是 from 必須是根 domain 例如 `noreply@3d-olg.net`。如果用 subdomain 例如 `noreply@send.3d-olg.net`，Resend 會回 403 / 550 拒絕送出。我一開始按官方文件範例設了 `send.` subdomain，跑了 1 小時都沒寄成才發現是這個 restriction。改回 root domain 就通了。

phpBB ACP 那邊 SMTP 的設定值最後是這樣，server `smtp.resend.com`、port `2587`、auth method `LOGIN`、username `resend`、password 用 1Password reference 注入、`board_email = noreply@3d-olg.net`、`board_email_sig = "Cheers!\nThe Sun Moon Admin"`。寄出去的信 envelope-from 會走 send.\* subdomain（Resend SPF 設定），visible from 是 root domain，alignment 過。

驗證流程是手動觸發 phpBB 的 forgot_password、Gmail 收到信、查 raw header 確認 SPF / DKIM 都 pass、Resend dashboard 看到送達狀態 delivered。整套寄信流程從 click 到 inbox 大概 3 到 5 秒。

## MySQL 8.4 in-place 升級

兩個 MySQL instance 起頭都是 8.0，計畫在 Bluehost 退場前升到 8.4 LTS。

8.0 升 8.4 官方支援 in-place upgrade，意思是不用 dump-and-restore，直接換 image 啟動 container 就行，新版的 mysqld 會偵測舊資料目錄、跑 schema migration、然後正常啟動。實作上的步驟是 docker compose down db、把 image tag 從 `mysql:8.0` 改成 `mysql:8.4`、docker compose up -d db、看 log 確認 migration 成功。整個過程 downtime 大概 30 秒。

升級前一定要先 dump 全套資料庫做 fallback。我用 `mysqldump --all-databases --single-transaction --routines --triggers --events` 跑一份 baseline 存到 `/opt/phpbb/backups/pre-mysql-8.4-upgrade.sql.gz`，外加 DigitalOcean dashboard 上做一份 droplet snapshot，雙重保險。如果 in-place migration 出意外，30 分鐘內可以從 snapshot rollback 回 8.0。

8.4 拿掉了一些舊的 auth plugin 跟 deprecation warning，phpBB 的 connection 要重新核對 GRANT 權限。不過 GRANT 這件事在 8.4 升級之前就單獨處理過一輪，牽出一個「phpBB 到底該用多大權限的 DB 帳號」的問題，下一節單獨講。

這個升級因為涉及 production 切換、有不可逆風險，我排在 Bluehost 訂閱失效前的最後一週做（2026 年 6 月 3 日起），給自己留 5 天 buffer 出包還能重來。如果 6 月 5 日還沒搞定就直接 rollback 回 8.0、把 8.4 升級延後到 7 月做獨立 maintenance window。

## phpBB 該用多大權限的 DB 帳號

phpBB 的 `config.php` 預設配一個 DB 帳號走天下，這個帳號通常握有它那個 schema 的全部權限。Phase 5.7 加固時我建了專用的 `phpbb` 帳號、不再讓 phpBB 用 MySQL root，但 GRANT 還是整個 schema 全開，包含 `DROP`、`ALTER`、`CREATE` 這些 DDL 權限。

在一次部署設定的審查裡這個 GRANT 被挑出來。一個正常運轉的 phpBB，日常只做 `SELECT` / `INSERT` / `UPDATE` / `DELETE`，根本不碰 DDL；DDL 只在跑核心 migration、安裝或升級 extension 時才用到。照最小權限原則，跑在 `config.php` 裡的 runtime 帳號不該有 DDL，該拆成兩個——`phpbb_app` 只有 CRUD 四種權限給 `config.php` 用，`phpbb_migrate` 才有 DDL、平常密碼鎖在 1Password、只在手動跑升級時拿出來。

但拆之前先驗證一個假設——phpBB 後台的「擴充功能管理」，按下「啟用」去裝一個 extension 的時候，走的是哪條 DB 連線？挖下去發現它走的就是 `config.php` 裡那個 runtime 帳號。extension 啟用會觸發 migration、可能 `CREATE TABLE` 或 `ALTER TABLE`。如果 runtime 帳號是 CRUD-only，後台按「啟用」會 silent fail、只丟一個籠統的「無法啟用」訊息，根因完全看不出來。換句話說「runtime 帳號零 DDL」這個潔癖，會直接弄壞後台一個正常功能。

最後的決定是維持單一 `phpbb_app` 帳號，但 GRANT 從「整個 server 全開」收斂成「只對 phpBB 那兩個 schema 各自 `GRANT ALL PRIVILEGES`」。schema 層級的 `GRANT ALL` 不包含 server 層級權限——`GRANT OPTION`、`CREATE USER`、`RELOAD` 那些都不在內，攻擊面仍然收斂；最壞情況是攻擊者拿到 `phpbb_app` 連線時能 DROP 掉這兩個 schema 的表，但那本來就難避免。放棄「runtime 零 DDL」的理想潔癖，換後台功能正常運作。這件事的 takeaway 是，最小權限是對的方向，但「多小才合理」得先搞懂應用實際怎麼用資料庫——一開始的審查以為 runtime 用不到 DDL，結果 phpBB 後台的設計就是用 runtime 連線跑 migration。有意思的是這個審查本身，後來被一個更貼近 phpBB 實際行為的審查修正了，正好呼應 [#2](2026-05-11-phpbb-restore-part-02-claude-code) 講的，審查抓到的東西也得再審查一輪。

## 接下來

部署架構接好之後，整個系列剩下最後一篇。系列文 #5「6 週踩雷集錦」會記錄那些卡了我半天的小事，包含 1Password SSH agent 排序撞到 MaxAuthTries=3、phpBB anti-spam 看似成功但根本沒寄信、Docker volume 升級鏈陷阱、phpBB 3.3.15 加 PHP 8 加 en lang 觸發 cosmetic warning 等等。每個都是 1 到 3 小時 debug 的小坑，集合起來才是真實的 6 週體感。

---

_天地日月公會論壇現在站在 [eq2.3d-olg.net/community](https://eq2.3d-olg.net/community/) 與 [eq.3d-olg.net](https://eq.3d-olg.net/)。系列文 5 篇之 #4，下一篇 #5 是踩雷集錦，整個系列的最後一篇。_
