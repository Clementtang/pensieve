---
title: "為什麼我花 33 天救一個 23 年的舊論壇"
description: "公會論壇 2015 年就停更了。為什麼 2026 年才動手？真正的觸發點是 AI 工具終於成熟到讓非工程師能自己做這件事，Bluehost 退場只是順便。"
date: 2026-05-09
author: "Clement Tang"
tags:
  ["phpbb", "self-hosting", "claude-code", "everquest", "guild", "blog-series"]
category: articles
status: draft
series: "phpBB Restore Series"
seriesPart: 1
---

# 為什麼我花 33 天救一個 23 年的舊論壇

> 公會論壇 2015 年就停更了。為什麼 2026 年才動手？真正的觸發點是 AI 工具終於成熟到讓非工程師能自己做這件事，Bluehost 退場只是順便。系列文 5 篇之 #1。

## 論壇 11 年沒人發文了，為什麼現在動手

我們公會的 phpBB 論壇從 2015 年起就停更了，從那年到 2026 年整整 11 年沒人發過新文。中間幾次想動工，每次都停在同一個點：「我有時間自己重建嗎？」直到 2026 年初某個下午，我打開 Claude Code，問它一個問題：「我有兩個 phpBB 論壇，從 2003 年用到 2015 年停更，現在還能救起來嗎？」那個下午之後，計畫就開始了。

Bluehost 的續約通知是 4 月 25 日才寄來的，那時候我已經在 phpBB 升級鏈上做了快兩個月，所以那封通知信不能算是觸發點，只是讓退場時間表變得明確。既然要重建，那就一起搬家吧。這篇文章想記錄的，是「為什麼是現在」、「為什麼是這個論壇」、「為什麼花 33 天」這三件事，在進入後面四篇技術紀實之前，先把動機交代清楚。

## 從笑傲江湖到 The Sun Moon

公會比論壇更早。最早那批人是在另一款叫「笑傲江湖網路版」的線上遊戲裡認識的；後來大家轉去玩 EverQuest，2003 年 6 月 13 日由深藍星辰、一丁、瓏瓏等元老在台灣版伺服器立了分會。我不是創會的人，是創會幾天後我的高中同學「吉爾斯」路過拉我進場，我以「光明元素」這個 ID 入會，朋友後來都叫我光明，再後來叫我老頭。

![phpBB about us 頁面：天地日月公會簡介，含 23 年公會歷史中文 quote](/images/posts/phpbb-restore/01-aboutus-page.png)

兩年後 EverQuest II 東方版開放，遊戲橘子代理，我牽頭找了 5 個夥伴一起在東方版立起天地日月。另外那 5 個人都是 EQ 2 才認識的新成員，台版 EQ 1 那邊的天地日月並沒有跟過來，會長交給了卡塔菈之後我重心轉到 EQ 2，從跟著別人玩到自己當會長中間差了兩年。下面這張是 2005 年 11 月 9 日東方版遊戲內的截圖，公會那時候 203 個成員、剛升到 30 級，畫面右側 Recent Events 還能看到當年的會務動態：

![EQ2 東方版 2005-11-09 遊戲內公會 panel，The Sun Moon 升級到 30 級的瞬間](/images/posts/phpbb-restore/02-eq2-eastern-2005.png)

可惜 EQ 2 東方版只活了 9 個月，2006 年 3 月遊戲橘子宣布結束營運，我們依官方移民方案登上美版 Najena 伺服器，中文公會名沒辦法沿用，重新起了英文名 **The Sun Moon**。後來 Najena 在 2010 年併入 Unrest，Unrest 又在 2015 年併入 Halls of Fate，論壇剛好也是那一年起停更。從 2003 那年夏天到 2026 年春天，公會走過了 23 年，換過三個伺服器、改過一次名、走過 EQ 2 十多個資料片，論壇是這 23 年所有對話、相簿、活動規畫、成員聚散的共同載體。

## 為什麼是 phpBB（而不是 Discord、不是別的）

2003 年那個時間點公會論壇等於 phpBB，那是 BBS 時代的標準。我自己 2004 年就架過 phpBB 2.0、WordPress 1.4 跑個人網站，所以在工具上熟悉。我們公會論壇從 phpBB 2.0 一路升上來，到 2015 年停更時是 3.0.14，中間累積了不少東西。光是活動規畫的 thread 就有上千篇，每一篇下面記著哪一天去打哪一張地圖、誰負責 tank、誰負責 heal、戰利品怎麼分。再加上 3,159 個附件，從螢幕截圖、地圖標記到自製攻略 PDF 都有。論壇還有一個 forum_id 是 6 的私版「公會成員友誼廳」，給核心成員聊些公開區不方便聊的事；另外曾經有一個獨立的 DKP 系統，Dragon Kill Points 點數紀錄，後來在副本玩法改變後退役。

這些東西要搬到 Discord 嗎？技術上可以，但語意上不行。Discord 是即時訊息工具，按時間軸把訊息往下推；phpBB 是 thread-based 論壇，每個 thread 是一個獨立的話題容器。一篇 2009 年的活動規畫貼，下面跟著 30 個回覆，這個結構搬到 Discord 會被攤平。更直接的理由是，那些 thread 已經是「發生過的對話」，沒有人會繼續討論，重點是保存。Discord 適合活的對話，phpBB 適合保存的對話。

論壇 2015 年起停更，但它從一開始就不只是公會內部的工具。EQ 1 站有一篇 2011 年的 thread，標題就是 [〈沒想到這網站還活著...〉](https://eq.3d-olg.net/viewtopic.php?t=1334)，老玩家 Aroust 路過、卡塔菈進去回說「多人仍使用此網站查詢遊戲資料」，連別的伺服器（Vulak）的玩家都進來感謝過資料幫助。那段時期我們的論壇實際上是 EQ 中文玩家社群的一個知識點，不只是公會內部討論版。「沒想到這網站還活著」這句話從 2011 年看到 2026 年，更貼切了，要保存這些對話，phpBB 才是對的容器。

## 為什麼是 2026 年初

2015 年論壇停更時我就知道遲早要做點什麼，但「自己做」這條路在 2015 到 2024 之間都沒被認真考慮過，因為它的成本太高。phpBB 從 3.0 升到 3.3 要過 5 個 major version，中文編碼、附件路徑、user table 結構每代都有破壞性變更；PHP 5.6、7.x、8.x 之間還有相容性破洞要補；Docker、Traefik、Let's Encrypt 這些 2015 年我還不熟的技術要重新學；同樣的時間裡 WordPress 也累積了 10 個以上的 schema 版本要走過。

要找 freelancer 重建？預算要好幾千美金、學習價值是 0、還要持續維護。要自己做？我是 PM，會 HTML、CSS，看得懂 SQL，但不寫 production code，這個能力跟需要的能力之間有一道縫，過去 9 年那道縫沒收得起來。

2026 年初不一樣了。Claude Code 的 pair programming 模式我用了大半年，從個人專案到工作專案都跑得起來。它不是「AI 幫我寫程式」，比較像是「我跟它一起做工程決策」，它做技術深挖，我做產品判斷與最終驗收。這個工作節奏和我作為 PM 的日常工作非常像，差別只在於對面的人變成了 LLM。

於是「自己做」這條路第一次成立了。預算上 Claude Code 月費可預期，不像 freelancer 計時收費；學習價值上，23 年舊論壇的升級鏈每一步我都會在現場看到、debug 到、做最終決策；進度上，白天 91APP 工作，晚上和週末做這個專案，自己決定 sprint 節奏；長期來看，架構、文件、CLI 我自己摸過一輪，下次同類型的事更熟。關於這個工作節奏的細節，我會在系列文 #2「PM × Claude Code 6 週救活公會論壇紀實」展開講，這篇先把動機講完。

## 4 月 25 日那封 Bluehost 通知信

如果只說「Bluehost 不是觸發點」也不完全準確，它確實在中段加了一個 deadline。4 月 25 日 Bluehost 寄了續約通知過來：

![Bluehost 4/25 寄來的續約通知信，WordPress Plus Hosting + 3D-OLG.NET 一年含稅 $214.07](/images/posts/phpbb-restore/03-bluehost-renew.png)

WordPress Plus Hosting 加 3D-OLG.NET 一年 $203.88、加上 SiteLock Lite（免費附帶）、含稅 **$214.07**，續約日 5 月 25 日、到期日 6 月 9 日。這個價錢不算貴，但跟 DigitalOcean 對照就有差。Bluehost 是 shared hosting，cPanel 加 FTP，平均一個月 $17.84。DigitalOcean SGP1 同樣價位的方案是一台 1 GB RAM、1 vCPU、25 GB SSD 的 VPS，月費 $6，年費 $72，加上 root SSH 的完全控制權。一年下來差 $142，差不多等於 DigitalOcean 兩年的訂閱費。技術上 1 GB RAM 跑得動 phpBB 兩站加 WordPress 加 MySQL 兩個 instance 加 Traefik 嗎？跑得動，但要小心調 swap、要 build container 時錯開、要把 WordPress DB 拆成獨立 instance 避免單點故障，這些是 #4「部署架構」的內容。

省 $142 還不到啟動專案的程度，但有了具體日期之後整個退場時間表就清晰了。5 月 25 日是 Bluehost 續約日（auto-renew 已關），6 月 9 日訂閱實際到期，在這之前所有 cutover 都要完成。Bluehost 把模糊的「遲早要做」變成清晰的「6 月 9 日前要做完」，它讓我認真，但啟動專案的原因不在那封通知信。

## 33 天值不值得

從 4 月初到 5 月初，加上後段 Bluehost 退場規畫，整個專案前後跨了 33 天。實際工時遠比這個數字短，白天還有 91APP 的工作要做，phpbb-restore 主要塞在晚上和週末，每天能碰電腦的時間頂多 2 到 3 小時。所以「33 天」說的是時間跨度，不是工時量。值不值得，看你怎麼算。如果只算「保留閱讀舊文的權利」，那太貴了，把 phpBB 整個 export 成 HTML、丟到一個靜態 hosting，便宜很多、維護也接近 0。但我做的不只是「保留閱讀」，而是「讓論壇繼續是論壇」，能登入、能發新文、能上傳新附件、私版還是私版、DKP 系統有條件地復活，這意味著公會老友哪天想回去發一篇「23 週年聚」的貼文，論壇是接得住的。

這個差別在工程上是兩個極端。靜態 export 大概一個下午就能搞定，活的 phpBB 加 WordPress archive 加 SMTP 寄信加 HTTPS 加備份 cron 則要前後一個月、加上中間幾十次的 debug 與重來，買到的是「論壇還能用」這四個字。值不值得，不是工程帳能算的。23 年的對話，那些已經有人離開遊戲、有人換了帳號、有人不再上線的對話，這些東西如果只能讀不能回就是博物館，如果還能繼續寫就是社群。我選了後者。

對抗遺忘是一種勞動。23 年裡有人成家、有人轉行、有人不在了，論壇上那些貼文是這些事情發生之前的快照，沒人會替我們保存，只能自己保存。而且坦白說，過程本身有趣，phpBB 從 2.0 升到 3.3 要看完整個論壇開源社群的演化史，WordPress 1.5 升到 6.9 要走過 PHP 5.6、7、8 三代相容，每個技術坑後面都有一段 Stack Overflow 上 2009 年的回應、一個某個外國人寫的 patch、一個 phpBB 官方論壇 2014 年的討論串。整個工作很像考古，而 Claude Code 是那個願意陪我一起翻紀錄的同伴。

## 接下來的 4 篇

這個系列共 5 篇，這篇是動機篇，談為什麼救、為什麼是現在、為什麼花 33 天。接下來的 4 篇分別處理不同層面。

**#2「PM × Claude Code 6 週救活公會論壇紀實」** 寫一個 PM 怎麼用 AI pair programming 完成工程任務，能委託什麼、必須親自做什麼，順便講一個重要的副產品，這個專案後來長出了 `/seer` skill。

**#3「資料復原」** 談 phpBB 2.0 升到 3.3.15 的 5 代升級鏈、WordPress 1.5 升到 6.9 的 schema 變遷、中文編碼處理，以及 3,159 個附件對齊驗證。

**#4「部署架構」** 談 Docker Compose、Traefik path-based routing、Resend SMTP relay、MySQL 8.4 in-place 升級。

**#5「6 週踩雷集錦」** 寫那些卡了我半天的小事，1Password SSH agent 排序、phpBB anti-spam silent skip、Docker volume 升級陷阱、phpBB DATETIME_FORMAT cosmetic warning 等。

決定救之後，下一個問題是，一個 PM 怎麼自己做這件事？在 #2 接著聊。

---

_天地日月公會論壇現在站在 [eq2.3d-olg.net/community](https://eq2.3d-olg.net/community/) 與 [eq.3d-olg.net](https://eq.3d-olg.net/)，2003 年至今 23 年，The Sun Moon Guild 在 EverQuest II Halls of Fate 伺服器持續運作中。_
