---
title: "資料復原，phpBB 與 WordPress 的多代升級鏈"
description: "phpBB 從 2.0 升到 3.3.15 跨 5 個 major version、WordPress 從 1.5 升到 6.9 跨十多個 schema 版本。中文編碼、附件路徑、prefix 差異、私版破圖救援，每一步怎麼做、怎麼證明資料沒掉。"
date: 2026-06-22
author: "Clement Tang"
tags: ["phpbb", "wordpress", "data-migration", "mysql", "blog-series"]
category: articles
status: published
draft: true
series: "phpBB Restore Series"
seriesTitle: "phpBB Restore 系列"
seriesIndex: 3
---

# 資料復原，phpBB 與 WordPress 的多代升級鏈

> phpBB 從 2.0 升到 3.3.15 跨 5 個 major version、WordPress 從 1.5 升到 6.9 跨十多個 schema 版本。中文編碼、附件路徑、prefix 差異、私版破圖救援，每一步怎麼做、怎麼證明資料沒掉。系列文 5 篇之 #3。

## 兩個資料層、四個 schema 版本、3,159 個附件

[#2 那篇](2026-06-20-phpbb-restore-part-02-claude-code)講了「怎麼自己做」的工作節奏與委託邊界。實際做下去，第一個要解決的就是資料復原這一塊，這也是這 6 週裡 debug 量最大的環節。

這個專案要救的有兩個資料層。一個是兩個 phpBB 站，eq2.3d-olg.net（公會主站）和 eq.3d-olg.net（EQ 1 那邊的舊站），兩站都從 phpBB 3.0.14 升到 3.3.15。另一個是 WordPress archive，eq2 域名根目錄底下的部落格區，從 2015 年 dump 出來的 1.5 / 2.7 時代資料庫升到 6.9.4。

這個 dump 有 14 篇 2008 到 2011 年的 publish post、12 個 user、12 個 comment 加 7 個 link，附件那邊兩個 phpBB 站合計 3,159 個檔案，從螢幕截圖、地圖標記到自製攻略 PDF 都有。整個資料復原工程的目標是把這些東西完整搬到新環境、不丟一筆、不錯一個編碼，最後在新 VPS 上跑得起來。

## phpBB 跨大版本升級鏈

phpBB 不像 WordPress 可以一個 image 直接吞舊資料庫，跨大版本升級必須照官方升級路徑逐版跑 migration，3.0 → 3.1 → 3.2 → 3.3 一步都不能跳。每一版的 `migrations/` 目錄裡都有對應的 schema 變更腳本，包括 ACP 設定 key 的 rename、權限模型變更、ucp profile field 結構調整等等。跳級的話 migrator 找不到 baseline 會直接 abort。

eq2 站照官方路徑跑了完整的 3.0.14 → 3.1.12 → 3.2.11 → 3.3.15 四段升級，每一段都在本機 docker 環境跑、跑通才進下一段。eq 站體量小很多（10 倍少於 eq2），可以直接從 3.0 跳到 3.3，888 個 migrations 在 30 秒內跑完，沒有觸發任何資料層的副作用。

升級過程踩到的第一個小坑是官方 installer。phpBB 的 CLI installer 在 PHP 8 加 mysqli 環境下會卡在某個 metadata check 階段，跑超過 15 分鐘還沒結束。我繞過 installer，寫了一個 `run-migrator.php` 直接呼叫 `$migrator->update()`，4 秒內整個 migration chain 跑完。這個小腳本後來在每次 phase 切換都用得到。

第二個小坑是兩站的 prefix 不同。eq2 用 `phpbb3_` 開頭（phpBB 3 時代命名），eq 用 `phpbb_`（phpBB 2 時代沿用）。這個差異在我寫任何跨站 SQL 時都要記得切換，後來我把它寫進專案 memory，每次 Claude Code 開新 session 都會自動讀到。沒寫進 memory 之前已經被坑過幾次，跑下去 0 row affected 才發現是 prefix 沒對。

## 中文編碼這條老坑

中文編碼是 phpBB 2 時代留下來最具歷史風味的問題。phpBB 2 預設用 latin1 charset 加 BIG5 collation，內容是中文但 MySQL 不知道，所以 SELECT 出來的 byte 直接 cast 成 latin1 變亂碼。phpBB 3.0 開始全面改 UTF-8，升級過程必須做一次 charset 轉換，把所有 user_post / post_subject / pm_text 欄位的 byte 重新解碼為 BIG5 再編碼為 UTF-8。

實作上 phpBB 官方 convertor 會幫忙處理，但那個 convertor 是 phpBB 2 → phpBB 3.0 的版本，假設源資料的 charset 是某個固定值。我們站的歷史更複雜一些，中間有兩段時期分別用過 BIG5 和 GBK，要先做 sniff 才知道哪些 row 走哪條 decode 路徑。後來我們的處理方式是先 mysqldump 出來、用 Python 腳本逐 row 嘗試解碼、確認出 charset 之後再批次轉。這個過程花了大概兩個晚上。

驗證階段用 `iconv -f utf-8 -t utf-8` 跑一遍 dump 檔，exit code 0 表示整份檔案都是 valid UTF-8 sequence，沒有殘留的 latin1 byte。再隨機抽 10 筆中文 post 比對 hex dump 跟原始 phpBB 2 站上看到的字符一致。這個 hex 比對在後面的 WordPress 升級鏈也用上了，是中文資料完整性的最終 gate。

## WordPress 升級鏈為什麼必須走三段

WordPress 跟 phpBB 一樣不能跳級升，但麻煩的是它跨度大太多。我們的源 dump 是 2015 年從 Bluehost 抓下來的 `wp_*` 表，schema 版本對應大約 WP 2.7。要升到 6.9 跨 4 個 major version 加幾十個 minor version，整條 migration chain 包含上百個 schema 變更腳本。

實際做的時候我把它切成 4 段，每段用一個對應 image 跑 migration，跑完 dump 出來當下一段的 input。順序是 2.7 → 4.8 → 5.0 → 6.0 → 6.9。為什麼要在這幾個版本切？因為它們各自處理的事情不同。

第一個切點是 4.8。WordPress 4.2 引入 `wp_convert_to_utf8mb4()` 函式，把所有 utf8 欄位轉成 utf8mb4，這是 emoji 與更廣的 Unicode 字符（包含某些中文罕用字）能存進來的關鍵。這個轉換只要 schema 版本 < 31536 升上去就會自動觸發，但 Mac arm64 上 WordPress 官方 image 最舊只到 4.8（4.2 / 4.5 / 4.6 / 4.7 都沒 arm64 版本），所以實作切點放 4.8。從 2.7 跳 4.8 等價走過 utf8mb4 conversion，目的達成。

剩下的切點 5.0、6.0、6.9 處理各自時代的 schema 變更，包含 user meta 結構、auto-saved post draft、Gutenberg block 的 metadata、site health check 表等等。每段升完都跑 iconv 確認 UTF-8 還是乾淨的，再 hex dump 14 篇 post 的 post_content 跟前一段比對，確認 CJK byte 沒被改寫。

## Volume 掛載陷阱

WordPress 升級鏈跑到一半我踩了一個很討厭的雷，跟 Docker volume 有關。

最初的設計是把 wp-core 程式碼放在一個 volume 裡叫 `wp_html`，每段升級切 image 的時候 volume 不動、image 變，這樣 WordPress core 跟著 image 升、user content 留在 volume 裡。聽起來合理，跑下去就壞。

問題在於 WordPress 6.9 image 的 entrypoint 啟動時會檢查 `/var/www/html/wp-includes/version.php`，如果版本對不上就會把整個 wp-core 寫成 image 自帶的版本（6.9.4）。所以我先掛 wp_html 跑 4.8，wp-core 是 4.8 沒問題，dump 之後切到 6.9 image，entrypoint 第一件事就把 wp_html 裡的 wp-core 從 4.8 蓋成 6.9.4。下一輪要回來跑 5.0 image 時，wp_html 已經是 6.9.4 的 core，5.0 image 的 PHP 5.6 直接 parse error 拒絕啟動。

修法是放棄共用 volume 的設計。每段升級的 image 用 ephemeral wp-core（image 自帶、container 起來自己用），只有最後 6.9 用 wp_html 把 wp-core 持久化下來。資料庫部分一直在 mysql_data volume 裡跨段共用，因為 mysql 不會被 entrypoint 主動覆蓋。

這個雷我認真 debug 了大半天才搞清楚，因為錯誤訊息（PHP 5.6 parse error）跟根因（6.9 entrypoint 寫過了 wp_html）距離很遠，要 trace 兩層 image 啟動流程才看得到。

## WordPress 的取捨，14 篇老文還是 2 篇新文

WordPress 這塊本來有兩個方案。X 方案是承接 Bluehost 現況，那邊的 DB 用 Bluehost cPanel 自動產的隨機 prefix（不是 default `wp_`），有兩篇 2024 年的 post 加 308 MB 的 plugin 群（Akismet、Yoast、Jetpack 之類）。Y 方案是還原 2015 年的 dump，default `wp_*` prefix，14 篇 2008 到 2011 年的老 post、12 個 user、12 個 comment、7 個 link，無 plugin。

兩個方案的內容完全不重疊，要選一個放棄一個。我選了 Y 方案。

理由是這個 archive 的核心保存價值在於那 14 篇 2008 到 2011 年的老 post，那段時期我用 WordPress 寫過一陣子個人觀察、遊戲心得、社群動態，而 2024 年那兩篇近期文純粹是測試性質、沒實質內容。Plugin 群更不該保留，Akismet 的反垃圾規則早就過期、Yoast 的 SEO 設定針對的是已停更的論壇生態、Jetpack 那堆 widget 全部是 2014 年代設計風格，留下來只會在 6.9 環境出 deprecation warning 跟 PHP 8 fatal。

選 Y 方案還有一個工程好處，default `wp_` prefix 跨工具相容性最高，wp-cli、官方升級流程、所有 third-party 文件都假設是 `wp_`。換 prefix 是個自找麻煩的事，能避則避。

代價是 2024 那兩篇近期文丟了，但因為它們是測試文，這個代價可以接受。

## 一致性驗證怎麼做

跨幾段升級之後最關鍵的問題是「資料真的沒掉嗎？」靠肉眼看是不可能的（光附件就 3,159 個），所以我建立了一套自動化的 parity gate 在每個 phase 末尾跑。

第一層是 SQL count。phpBB 兩站的 `phpbb_posts` / `phpbb3_posts`、`phpbb_users` / `phpbb3_users`、`phpbb_attachments` / `phpbb3_attachments` 各自的 row count 升級前後必須一致。WordPress 那邊的 `wp_posts WHERE post_type='post' AND post_status='publish'` 必須是 14、`wp_users` 必須是 12、`wp_comments` 必須是 12、`wp_links` 必須是 7。

第二層是附件數對齊。`find eq2/community/files -type f | wc -l` 期望值 3,159，跟 `SELECT COUNT(*) FROM phpbb3_attachments` 必須對得上。沒對上的話有兩種可能，要嘛附件實體檔少於 DB 紀錄（檔案在 Bluehost 抓下來時掉了），要嘛 DB 有 orphan row（附件被刪了但 row 沒 cascade）。任何一邊偏移都要追到底。

第三層是 SHA256 byte-for-byte 比對。對 14 篇 WordPress publish post 的 `post_title` / `post_date` / `post_content` 三個欄位連起來算 SHA256，新 production 跟 2015 baseline dump 必須完全一致。任何一個 byte 不一樣（比如 charset 解碼錯一個字、或 search-replace 不小心動到了實際內容）SHA256 就會炸。

第四層是 URL 殘留檢查。WordPress 升級過程中我們的 siteurl 從 `http://eq2.3d-olg.net/wordpress/` 改到 `https://eq2.3d-olg.net/`，post_content 裡所有舊 URL 也要跟著改。`wp search-replace` 跑了三輪共 65 加 46 個 replacements，最後查 `LIKE '%http://eq2.3d-olg.net/wordpress/%'` 必須回 0 row。

四層都綠了才算這一段升級完成。每段都跑、不只最後跑，因為錯誤越早發現越好 debug。

## 一個沒料到的小細節，user_lang=en_us

phpBB 3.3 的語系包命名是 `en` 和 `zh_cmn_hant`，但我們 eq2 站有 16 個 user 的 `user_lang` 欄位是 `en_us`。這是 phpBB MOD 時代的命名遺跡，當時某個 MOD 用了 `en_us` 而不是官方的 `en`。

phpBB 3.3 的 fallback 邏輯是 `user_lang` 找不到就用 `default_lang`，預設是 `zh_cmn_hant`，所以這 16 個 user 登入後會看到中文介面，乍看沒問題。但會觸發另一個問題，PHP 8 加 user_lang=en 訪問 ucp 會踩到一個 cosmetic 的 `[phpBB Debug] Undefined array key DATETIME_FORMAT` warning，本來不會被觸發，現在因為 fallback 路徑多繞一圈被觸發了。

修法是直接 UPDATE，把 16 個 `en_us` 改成 `en`。順手做的決定，但讓我意識到 MOD 時代留下來的命名與設定假設一個個都要 audit，越早發現越省事。

## 私版破圖救援

附件那邊還有一個 edge case 值得記下來。

WordPress 的 14 篇 publish post 裡有兩篇引用了 phpBB 私版的 attachment，分別是 post 4 和 post 6 引用了 forum_id 6（公會成員友誼廳）的兩個圖片。這個論壇對訪客 by design 拒絕下載，所以從 WordPress 渲染出來的 `<img>` tag 即使路徑對也會 403。

修法是手動把這兩個圖片從 phpBB 站 docker container 內拷貝到 WordPress 的 uploads 目錄，路徑改成 `wp-content/uploads/private-archive/`，再用 wp search-replace 改 post_content 的 src。這樣 WordPress 那邊看得到、phpBB 站那邊權限照舊。

剩下 9 篇 post（3、7、9、15、47、56、59、67、73）引用的是已經消失的 wp-content/uploads/，Bluehost 那邊在 2026 年 4 月抓 snapshot 的時候就已經是空骨架，Wayback Machine 對 `eq2.3d-olg.net` 整 domain 0 個 snapshot，永久救不回來。處理方式是在 Kubrick 主題的 `footer.php` 加一段 inline `<script>`，偵測 `<img>` 的 onerror 事件後動態替換成一個米色背景加棕色虛線邊框、寫著「圖片已遺失」加 alt 截前 40 字的 inline SVG。視覺上不是空白破圖、語意上有交代圖片原本的描述。

JS 那段加了 `{ once: true }` 跟 `dataset.kbPlaceholder` 雙重 guard 防 infinite loop（替換後的 SVG 又觸發 onerror 變成永遠跑）。一個 12 行的 script，花了我大半小時 debug 兩個版本才穩。

## 接下來

資料層接好了之後下一步是基礎設施。系列文 #4「部署架構」會處理 Docker Compose 三服務、Traefik path-based routing 一個 domain 分流到三站、Resend SMTP relay 怎麼繞過 DigitalOcean 封 port、MySQL 8.4 in-place 升級，那是這 6 週裡架構決策最多的環節。

---

_天地日月公會論壇現在站在 [eq2.3d-olg.net/community](https://eq2.3d-olg.net/community/) 與 [eq.3d-olg.net](https://eq.3d-olg.net/)。系列文 5 篇之 #3，下一篇 #4 進部署架構。_
