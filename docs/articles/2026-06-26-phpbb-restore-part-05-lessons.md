---
title: "6 週踩雷集錦，那些卡了我半天的小事"
description: "1Password SSH agent 撞 MaxAuthTries=3、phpBB 顯示成功訊息但根本沒寄信、sed 解析 .env 密碼含等號被截斷、Prettier 把 phpBB 模板搞壞，每個都是 1 到 3 小時 debug 的小坑，集合起來才是真實的 6 週體感。"
date: 2026-06-26
author: "Clement Tang"
tags: ["debugging", "phpbb", "docker", "mysql", "blog-series"]
category: articles
status: published
draft: true
series: "phpBB Restore Series"
seriesTitle: "phpBB Restore 系列"
seriesIndex: 5
---

# 6 週踩雷集錦，那些卡了我半天的小事

> 1Password SSH agent 撞 MaxAuthTries=3、phpBB 顯示成功訊息但根本沒寄信、sed 解析 .env 密碼含等號被截斷、Prettier 把 phpBB 模板搞壞，每個都是 1 到 3 小時 debug 的小坑，集合起來才是真實的 6 週體感。系列文 5 篇之 #5，最終回。

## 為什麼要記 debug 過程

[#4 那篇](2026-06-24-phpbb-restore-part-04-infrastructure)寫完了部署架構。整個 phpbb-restore 系列的「主軸」基本就那四篇，這篇是收尾，記錄前面文章因為篇幅與主題沒有展開的那些小事。

寫 debug 過程通常被認為瑣碎、沒人想看，但實務上這些小坑加起來的時間佔了整個專案的一大半。如果只看完成的成品，會以為這 6 週是順順跑下來的；事實上每天晚上有一半時間在 debug 看似不該存在的問題，看到一個錯誤訊息要花 1 到 3 小時才能挖到根因。把它們記下來有兩個好處，一是公開讓踩過同樣坑的人少花一輪時間 Google，二是給自己未來重看當作 debug pattern 的對照。

下面 8 個是我這次印象最深的，每個都吃掉至少一個晚上。

## 1Password SSH agent 撞 Bluehost MaxAuthTries=3

`ssh bluehost` 第一次連回去就拋 `Too many authentication failures` 拒接，連密碼提示都沒看到。這個錯誤訊息字面看是「認證失敗太多次」，但我密碼還沒輸入過、key 也還沒嘗試過，怎麼就太多次？

挖了一陣子才發現，1Password SSH agent 一次會拋出我整本 1Password 裡的 6 把 SSH key（91APP GitLab、DigitalOcean、GitHub、id_ed25519、Mac mini 2012、Bluehost），順序是按 1Password 內部的儲存順序，Bluehost 那把排在第 6。OpenSSH 的 default 行為是「每次連線最多嘗試 6 把 key 然後放棄」，但伺服器端可以設 `MaxAuthTries`，Bluehost 設的是 3。也就是 ssh client 試了前 3 把（都不是 Bluehost 那把）就被 server 踢掉、第 4 到 6 把根本沒機會試。

修法是 `~/.ssh/config` 給 Bluehost 加 `IdentitiesOnly yes` 跟 `IdentityFile ~/.ssh/bluehost.pub`，明確告訴 ssh 只試這把 key、不要丟整本給 server。public key 從 1Password 桌面 app 的 Bluehost 項目 Public Key 欄位複製、`pbpaste > ~/.ssh/bluehost.pub`、`chmod 600` 即可。設定完一次就通了。

教訓是 1Password SSH agent 的便利有它的副作用，agent 把所有 key 都丟進連線會撞 server 端 throttle。對這種有 hard limit 的 server 一定要 pin 特定 key。

## phpBB 顯示「忘記密碼信已寄出」但根本沒寄

debug 過程最戲劇的就是這個。我在 phpBB 上點忘記密碼、輸入 email、頁面顯示「reset email 已寄出，請查收」，但 Gmail 永遠收不到。我以為是 SMTP 或 DNS 問題，把 Resend 配置、SPF、DKIM、port 全 trace 一遍都正確。

最後在 phpBB 原始碼挖出真相。`reset_password.php` 在第 227 行附近做了一個 anti-enumeration 的設計，如果使用者已經有一個 `reset_token` 還沒過期（24 小時內申請過第二次），就 silently skip 寄信、但顯示成功訊息。理由是防止攻擊者用「點忘記密碼看反應」來判斷 email 是否註冊在系統裡。從安全角度合理，從 debug 角度地獄。

修法是 SQL 直接清掉 token：`UPDATE phpbb3_users SET reset_token='', reset_token_expiration=0 WHERE username='<my_username>';`，再點一次忘記密碼、收信、確認流程通了。

這個雷有兩個 takeaway。第一是 phpBB 顯示成功訊息不等於真寄信，所有「使用者體驗成功」的回饋對 debug 沒意義，要看寄信端的 log。第二是讀過 phpBB 原始碼之後我才發現這類 anti-enumeration 設計散落在 phpBB 的 forgot password、registration、login 各處，每一處都會有「看似成功但其實 silent skip」的可能。對 debug 系統信流程來講要連 source code 一起讀。

## sed 解析 .env 撞到密碼含等號

VPS 上的 cron 要從 `/opt/phpbb/.env` 抽出 MySQL 密碼塞進 `mysqldump -p$MYSQL_PW`。第一版 cron 寫法用 `cut -d= -f2`，意思是用 `=` 切 line 取第 2 欄。看起來合理，跑下去 mysqldump 偶爾會 401。

問題在於 1Password 產的 32 字元 alphanumeric 密碼有時候會包含 `=`，比如類似 `MYSQL_ROOT_PASSWORD=AbCdEf=GhIj=...` 的 pattern（這個是示意、不是實際密碼）。`cut -d= -f2` 拿到的是第一個 `=` 跟第二個 `=` 之間的字串（中間那一段），密碼被截斷成只剩前半段。mysqldump 用截斷的密碼登入當然 401。

修法改成 `sed -n 's/^MYSQL_ROOT_PASSWORD=//p'`，意思是「找以 `MYSQL_ROOT_PASSWORD=` 開頭的行、把這個前綴拿掉、回印剩下的整段」。這樣不管密碼裡有幾個 `=` 都能完整抽出來。

教訓是 .env 解析不要用 `cut`，用 `sed` 或 awk 加明確 prefix match。如果一定要用 `cut`，密碼產生規則要排除 `=` 跟其他 special char。

## phpBB 3.3.15 加 PHP 8 加 en lang 觸發 DATETIME_FORMAT warning

某個 user 設定了 `user_lang=en` 之後登入訪問 ucp，瀏覽器頁面出現幾百行 `[phpBB Debug] PHP Warning: Undefined array key DATETIME_FORMAT`，整個介面被 warning 訊息淹沒。同樣的 user 切回 `zh_cmn_hant` 又正常了。

這個 warning 不是 lang pack 缺檔。我把官方 phpBB 3.3.15 的 `language/en/common.php` 跟我們站上的逐行 diff，完全相同。問題在於 phpBB 自己對 PHP 8 的相容性有一個 timing bug，`DATETIME_FORMAT` 在 lang load 過程中某個瞬間還沒被定義就被讀取，PHP 8 的 strict array key 檢查會噴 warning。我們的版本踩到這個 bug，但 user_lang=zh_cmn_hant 不會觸發、只有 user_lang=en 會。

修法是不去改 phpBB core（會被下次升級覆蓋），而是 patch `includes/startup.php` 第 23 行，把 `error_reporting()` 的 `$level` 加上 `& ~E_WARNING` 抑制 warning 的 echo。實際的 warning 還會寫到 `php_errors.log`、不會無聲消失，只是 user 視覺上不會看到。

教訓是 phpBB 3.3 對 PHP 8 的相容性其實還有不少 cosmetic bug，這類 fix 應該集中放在 startup level、未來升級時拿掉。

## MySQL `init-db/` 多 DB 陷阱

`docker-compose.yml` 我用了 MySQL image 的 `docker-entrypoint-initdb.d/` 機制，把 phpBB 兩站的 dump 放進這個目錄，希望 container 第一次啟動時自動匯入。eq2 站正常起來，eq 站論壇開出來 500 error。

挖了一個多小時才找到根因。`docker-entrypoint-initdb.d/` 的 init 腳本是這樣跑的，先 create environment 變數 `MYSQL_DATABASE` 指定的單一 schema、然後依字母順序執行 init 目錄下所有 `.sql` 檔在那個單一 schema 裡。問題是我的兩份 dump 是 `mysqldump --databases eq2_db` 跟 `mysqldump --databases eq_db` 出來的，但實際 dump 內容沒寫 `CREATE DATABASE` 跟 `USE`（mysqldump 預設行為），所有 SQL 都被灌進 `MYSQL_DATABASE` 指定的那一個 schema。eq 站的表全跑進 `eq2_db` 裡，自己的 schema `eq_db` 從來沒被建立過。

修法兩個。第一是新增一個 `00-create-eq-db.sql` 寫 `CREATE DATABASE IF NOT EXISTS eq_db;`，第二是手動在兩份 dump 開頭補 `USE <dbname>;` 確保 SQL 進到對的 schema。重新 init（要先 `docker compose down -v` 砍 volume），兩站都正常。

教訓是 `docker-entrypoint-initdb.d/` 對多 DB 場景不友善，預設行為假設你只有一個 schema。要塞多個 schema 必須手動在每份 dump 補 `CREATE DATABASE` 跟 `USE`。

## Calendar extension 缺一個 en 路徑就 500

Phase 4 寫完 Calendar 唯讀 extension 上線之後，ACP 進到「版面權限 / 群組權限 / 管理員權限」5 個連結會 PHP fatal 500。其他 ACP 頁正常、論壇前台也正常，只有那 5 個權限連結。

stack trace 顯示 `acp_permissions::main()` 呼叫到 `add_permission_language()` 在 `language_file_loader.php:186` 找不到檔。挖原始碼發現它要載入 `language/<user_lang>/acp/permissions_calendar.php`，找不到就 fallback 到 `language/en/acp/permissions_calendar.php`，再找不到就 fatal。

問題出在這個 extension 是 2009 年某個 phpBB MOD 作者寫的，他用 `en_us` 作為英文目錄名（phpBB MOD 時代習慣），於是檔案路徑是 `language/en_us/acp/permissions_calendar.php`。phpBB 3.3 的 fallback 順序找 `<user_lang>` → `en`，從來不會找 `en_us`。對 user_lang=zh_cmn_hant 的人來說，找不到 zh 版本後 fallback 到 en，en 也沒有，fatal 500。

修法是把 `permissions_calendar.php` 從 `en_us/acp/` 複製到 `en/acp/` 跟 `zh_cmn_hant/acp/`，再砍掉 `cache/production/data_ext_finder.php` 強制 phpBB 重建 extension cache。線上跟本機 template 兩邊都同步了一份。

教訓是接手老 extension 時，目錄命名假設要重新驗證。`en_us` vs `en` 這類細節 phpBB 2 時代各家 MOD 都不一致，到 phpBB 3.3 標準化成 `en`。

## sunmoon/pages 擴充功能，資料庫說啟用、後台說壞掉

這個坑是做別的事的時候意外撞到的。我為了驗證 phpBB 的 DB 帳號權限進了 ACP 的「擴充功能管理」，看到三個自製 extension 裡的 `sunmoon/pages` 被列在「停用的擴充功能」段，旁邊一行錯誤「必填欄位 version 沒有設定」。但奇怪的是，這個 extension 提供的三個頁面——關於我們、下載、DKP 退役說明——前台打開全都正常 200。

我先查資料庫。phpBB 記錄 extension 狀態的 `phpbb3_ext` 表裡，`sunmoon/pages` 的 `ext_active` 是 1，也就是資料層認為它是啟用的。但 ACP 後台說它停用。兩邊打架。接著對比三個自製 extension 的 `composer.json`，`applicationform` 跟 `calendar` 都有 `"version"` 欄位，只有 `pages` 漏了。phpBB 3.3 載入 extension metadata 時把 `version` 列為必填，缺了就判定整個 extension invalid、ACP 標成停用加錯誤訊息。那為什麼前台三個頁面還活著？因為頁面的 route 註冊資訊還在 phpBB 的 cache 裡，cache 沒失效之前 route 照樣 work。

修法是 `composer.json` 補一行 `"version": "1.0.0"` 跟另外兩個 extension 對齊，再砍掉 `cache/production/data_ext_finder.php` 強制 phpBB 重建 extension metadata cache。重整 ACP，`sunmoon/pages` 跳回「啟用的擴充功能」段。

教訓是這是一個 dormant bug，站台表面一直好好的，但它其實已經壞了——只是靠 cache 撐著，下一次任何原因清了 cache，三個頁面就會一起 404。「資料庫說啟用、後台說停用」這個狀態不一致就是它的線索。從 phpBB 3.0 的 MOD 體系搬到 3.3 的 extension 體系時，`composer.json` 的必填欄位很容易漏，`applicationform` 跟 `calendar` 剛好沒漏、`pages` 漏了，純粹是手工搬移時的疏忽。

## Prettier 把 phpBB 模板靜悄悄改壞

我習慣用 VS Code 加 Prettier 自動格式化，這個習慣在 phpbb-restore 中段差點把整個論壇模板搞壞。

phpBB 的 `.html` 模板用一套自家的 control flow 語法，像 `<!-- IF S_USER_LOGGED_IN -->` 這類 directive 會被 phpBB 模板引擎處理。Prettier 把 `.html` 當 standard HTML 格式化，遇到長 directive 會自動 wrap 換行：

```
<!-- IF S_USER_LOGGED_IN
  AND S_DISPLAY_BANNER -->
```

phpBB 模板引擎不認得跨行的 directive，編譯時 silently 略過。後果是模板看起來都還在、phpBB 不會報錯，但某些 conditional render 的元素整片消失。我有一次更新一個樣式檔，存檔自動格式化跑了一輪，過了 20 分鐘才注意到 navbar 的某個按鈕從前台消失了。

修法是用 Python 腳本而不是 Edit 工具改模板，腳本只動目標 byte range、不重新 format 整檔。後來又加了 Prettier 的 `.prettierignore` 把 phpBB 模板路徑全 exclude 掉。

教訓是 phpBB 的模板語法跟標準 HTML 不兼容，自動格式化工具預設會破壞它，要麼明確 ignore 要麼換工具。

## 系列收尾

5 篇寫完了。

\#1 講為什麼救這個 23 年的舊論壇，是動機篇。#2 講一個 PM 怎麼用 Claude Code 自己做這件事，包括能委託什麼、必須親自做什麼，以及這個專案怎麼意外長出 `/seer` skill。#3 講資料復原的多代升級鏈、中文編碼、附件對齊驗證。#4 講部署架構、Traefik 一個 domain 分流到三站、SMTP 怎麼繞過 DigitalOcean 封 port。這篇 #5 集中收錄 8 個吃時間的小坑。

對抗遺忘是一種勞動，整個過程不只把論壇救活，還順手把 23 年公會的紀錄重新放在自己掌控之下。如果這個系列文對其他想保存自己社群數位文物的人有幫助，那 33 天的時間跨度就是值得的。

論壇現在站在 [eq2.3d-olg.net/community](https://eq2.3d-olg.net/community/) 與 [eq.3d-olg.net](https://eq.3d-olg.net/)，The Sun Moon Guild 在 EverQuest II Halls of Fate 伺服器持續運作中。歡迎老友回來、歡迎陌生人路過。

---

_系列文 5 篇之 #5，phpBB Restore Series 完。_
