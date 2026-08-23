---
title: "一副切不回手機的藍牙耳機，揭發了 AliExpress 網站的零增益指紋辨識"
description: "一起被誤傳為超音波追蹤的事件，查證後其實是 AliExpress 網站執行的零增益 WebAudio 指紋辨識，不發聲、不需麥克風，卻因佔用系統音訊通道而被一副藍牙耳機意外揭穿。"
date: 2026-08-23
author: "Clement Tang"
tags: ["議題研究", "電商", "Apple", "Google", "個資保護", "平台競爭"]
category: articles
status: draft
---

# 一副切不回手機的藍牙耳機，揭發了 AliExpress 網站的零增益指紋辨識

> 2026 年 8 月 20 日，一位開發者發現自己的藍牙耳機被 AliExpress 的網頁死死佔住，怎麼切都切不回手機。順著這條線追下去，他找到的是一段刻意把音量調到零、卻仍被瀏覽器完整處理的 WebAudio 追蹤程式碼，與超音波信標毫無關係。這起事件在社群媒體上迅速被簡化成「超音波追蹤」，但真相遠比這個聳動的說法更值得細看。

## 元資料

| 項目         | 內容                                                     |
| ------------ | -------------------------------------------------------- |
| **建立日期** | 2026-08-23                                                |
| **更新日期** | 2026-08-23                                                |
| **標籤**     | #議題研究 #電商 #Apple #Google #個資保護 #平台競爭         |
| **狀態**     | 草稿                                                       |
| **字數**     | 約 5,700 字                                                |

---

## The Big Picture

2026 年 8 月 20 日冒出來的這則新聞，乍看只是一支被混淆過的 JavaScript 程式碼，躲在一個購物網站的首頁裡。把時間軸拉開來看，它其實濃縮了整個 2026 年線上追蹤產業的處境。Apple 花了十幾年時間，一道道築起裝置級追蹤的權限高牆；Google 卻在同一年鬆手，重新替指紋辨識鋪好路。夾在中間的商業誘因並沒有消失，只是被推去找牆縫。AliExpress 用的這一招，恰好是十年前一篇學術論文就記錄過的技術，如今仍安然運作在全球前百大電商的首頁上，直到一副拒絕切換的藍牙耳機把它意外揪了出來。

## Why It Matters

如果你曾經在瀏覽器裡逛過購物網站，這件事跟你有關。裝置指紋辨識不需要你按下任何一顆「同意」按鈕，不需要 cookie，甚至不需要你安裝任何 App，它靠的是你的瀏覽器與硬體本身就會洩漏的細微差異。對一般讀者而言，這代表清除 cookie、開啟無痕視窗這些傳統的隱私自保手段，對這類追蹤幾乎無效。對企業與開發者而言，這起事件也提醒一件事：安全與風控用途的偵測程式碼，和廣告歸因用途的追蹤程式碼，兩者在技術上長得幾乎一模一樣，外部監理者很難拆穿其中的差別。對台灣讀者而言，更值得留意的是，個資會今年才剛剛掛牌，面對裝置指紋辨識這種新型態的資料蒐集，台灣的法規與執法紀錄目前幾乎是一片空白。

---

## 主要內容

### 當一副藍牙耳機拒絕切回手機

2026 年 8 月 20 日，一位開發者遇到一個惱人的小狀況。他的藍牙耳機同時配對著電腦與手機（multipoint 功能原本應該讓耳機在兩台裝置之間自動切換），但只要瀏覽器分頁還開著 AliExpress 的首頁，耳機就死死黏在電腦這一端，手機那邊怎麼呼叫都切不過去。關掉分頁，一切立刻恢復正常。

資安研究團隊蹲點數週、逆向工程 APK 的畫面，在這起事件裡完全沒有出現，起點只是一次再普通不過的使用體驗異常。這位開發者把怪異現象寫成部落格文章公開，隨後被轉貼到 Hacker News 與 Lobsters，標題直白寫著 AliExpress 執行了會破壞藍牙 multipoint 的無聲 WebAudio 指紋辨識。連 Mozilla 與 Brave 兩家瀏覽器廠商的官方帳號都相繼在 X 上發文回應，Mozilla 表示追蹤企圖已被 Firefox 的反指紋辨識機制擋下，Brave 則直言 AliExpress 被抓到利用使用者的音訊系統進行追蹤。Mozilla 隱私工程師 Tom Ritter 隨後在個人網站發表技術分析，反解了高度混淆的程式碼，並指出就 WebAudio 這一項向量而言，成效其實相當有限，主流瀏覽器早已大致把它堵死。

順著這條線追查，才找出真正的元凶。AliExpress 首頁載入數秒後，會靜靜建立起兩個持續運作的音訊處理圖（audio graph），背後執行的是兩支高度混淆的 Alibaba 安全腳本 collina.js 與 fireyejs.js（多家媒體轉述版本號分別為 1.140.0 與 1.231.67，`fireyejs` 之名與資安公司 FireEye 無關，純屬 Alibaba 內部命名）。這組音訊圖的結構大致是：鋸齒波振盪器節點經 AnalyserNode 或 ScriptProcessorNode 處理，再串進增益為零的 GainNode，最後連上 `AudioContext.destination`。

關鍵就藏在最後一步。把節點接上 `AudioContext.destination`，會強迫瀏覽器真的去運算這條音訊路徑，即便最終輸出的音量是零。這帶來三個副作用：沒有任何媒體元素在播放，也就沒有人耳聽得見的聲音；分頁靜音或系統靜音都攔不住它，因為它從頭到尾不算「正在播放」；它會持續佔用系統的音訊輸出通道，讓藍牙 multipoint 耳機誤判電腦端仍在使用音訊，拒絕把控制權交還給手機。第三個副作用，正是這起事件被人察覺的唯一原因，若非這個意外瑕疵，這段程式碼大可永遠隱形運作下去。

音訊指紋只是冰山一角。同一組腳本還同時蒐集 canvas 繪製結果、WebGL 特徵、硬體規格、WebRTC 資訊、滑鼠與觸控行為軌跡，以及自動化偵測訊號，一併打包送回 Alibaba 的遙測伺服器，音訊圖只是這份廣泛裝置指紋清單裡的其中一個欄位。

真正值得梳理的，是這起事件在傳播過程中如何變形。多家媒體標題很快出現「AliExpress 透過你的耳機祕密追蹤你」這類措辭，「耳機」與「聽不見的聲音」兩個關鍵字擺在一起，讀者很自然聯想到超音波信標與麥克風竊聽，二手轉述便一路滑向更聳動、卻不準確的「超音波追蹤」。實際上兩者方向恰好相反：超音波信標是一端播、另一端用麥克風聽，目的是跨裝置通訊；AliExpress 這段程式碼則是瀏覽器自己算、自己量的本機運算特徵擷取，聲音從頭到尾沒有離開過裝置，也完全不需要碰觸麥克風權限。這段音訊之所以聽不見，並不是因為它躲進了人耳聽不到的高頻，而是因為它根本沒有被播放出來。

| 項目 | 真實的 AliExpress 事件 | 網路上流傳的版本 | 真正存在的超音波追蹤（uXDT） |
| --- | --- | --- | --- |
| 載體 | 網頁瀏覽器（首頁） | 手機 App | 手機 App 內嵌的 SDK |
| 是否需要麥克風權限 | 否 | 傳言認為是 | 是 |
| 是否真的發出聲音 | 否，增益設為零 | 傳言認為是超音波 | 是，18 至 20 kHz 近超音波 |
| 目的 | 單裝置辨識、反詐欺風控 | 跨裝置追蹤 | 跨裝置關聯、電視收視監測、店內定位 |
| 代表案例 | collina.js、fireyejs.js（2026） | 無 | SilverPush、Lisnr、Shopkick、Signal360（2014 至 2017） |

截至本文完稿，Alibaba 與 AliExpress 都沒有針對此事發出任何官方回應、聲明或修正說明，也查無任何腳本被移除或調整的證據。

### 比 cookie 更難刪除的痕跡

要理解 AliExpress 為什麼要做這件事，得先退一步看裝置指紋辨識這門技術本身。

裝置指紋辨識蒐集的是裝置軟硬體上大量細瑣的片段資訊，螢幕解析度、已安裝字型、瀏覽器版本、GPU 渲染出的像素差異、CPU 運算浮點數時的細微誤差，單獨一項幾乎沒有辨識力，組合起來卻足以在數以百萬計的裝置裡精準指認出某一台。它和 cookie 最根本的差異在於持續性。Cookie 可以被使用者一鍵刪除，也會被瀏覽器主動封鎖或過期；裝置本身的硬體特性卻很難改變，除非使用者真的換了一台電腦或手機，否則這串指紋幾乎會一路跟著使用者。

指紋訊號的清單遠比多數人想像得長：Canvas 利用不同 GPU、驅動程式與字型渲染下產生的像素差異；WebGL 把 3D 渲染管線的實作差異與 GPU 型號字串納入，熵值更高；AudioContext 原理類似，同一段波形訊號經不同 CPU、音效堆疊處理後輸出的浮點數出現微小差異，取雜湊值就成了裝置標記。更極端的是劍橋大學團隊在 IEEE S&P 2019 發表的 SensorID，利用加速度計、陀螺儀、磁力計出廠校準誤差當指紋，在 iPhone 6S 上量到約 67 位元熵值，且不需任何權限、一秒內完成。這類研究最讓人不安之處，在於它完全繞開了作業系統的每一道權限提示框，技術本身有多精巧反倒是其次。

廠商投入資源做這件事，背後糾纏著兩條動機線，在 AliExpress 這個案例裡纏得特別緊。第一條是反詐欺與風控線，電商平台需要偵測機器人、防止刷單與帳號盜用，這正是 collina.js 與 fireyejs.js 表面上的定位，腳本同時蒐集自動化偵測訊號也印證了這個說法，這條動機在多數法域裡被視為正當利益，甚至可能落入隱私法規「服務所必要」的豁免範圍。第二條是廣告與歸因線，Apple 推出 ATT 之後跨 App 追蹤識別碼大幅失效，廣告主與歸因平台急著找到不需使用者明示同意的替代訊號，指紋辨識因此重新從灰色地帶被拉回檯面。

真正棘手的地方在於，同一組指紋資料完全可以同時服務這兩條線，外部觀察者幾乎無法區分。一個伺服器端記錄下來的裝置指紋，可以拿去攔截一次盜刷，也可以拿去把一位訪客與他過去在其他頁面上的行為串接起來，兩種用途用的是同一把鑰匙。廠商永遠可以宣稱這是反詐欺措施，而這個說法在技術上幾乎無法被證偽，這正是這場貓抓老鼠遊戲裡，追蹤方手上最好用的擋箭牌。

法規端並非毫無動作。歐洲資料保護委員會（EDPB）於 2024 年 10 月定案的《Guidelines 2/2023》明確釐清，ePrivacy 指令第 5(3) 條的適用範圍不只限於 cookie，也涵蓋追蹤像素、追蹤連結與裝置指紋辨識技術，並指出「取得存取」與「儲存資訊」是兩個各自獨立的概念，不必同時成立即可觸發這條規定。像 AliExpress 這種未經告知就執行的指紋辨識，在歐盟很難找到合法基礎，除非落入「提供使用者明確要求之服務所嚴格必要」這項狹窄豁免，反詐欺是否構成「嚴格必要」則留給個案爭辯。美國這邊監理工具明顯不同，FTC 主要依靠《FTC Act》第五條「不公平或欺騙性行為」這把傘，重點放在揭露義務而非技術本身。

台灣的情況值得單獨拉出來談，這一段是我個人的觀察，而非法律意見。個人資料保護委員會直到 2025 年才正式掛牌成立，同年 11 月總統公布個資法修正條文以配合委員會運作，並設有六年過渡期，由各中央目的事業主管機關續行管理原本分散的個資監督工作。台灣的個資法架構建立在「得以直接或間接方式識別該個人」這個要件上，卻始終沒有一部類似歐盟 ePrivacy 指令那樣專門處理裝置存取與網路追蹤技術的法規，截至目前查無任何主管機關針對「裝置指紋是否構成個人資料」發出過明確函釋，也查無相關裁罰先例。歐盟已明文把指紋辨識納入需要同意的處理行為之列，台灣的電商與 App 開發者在實務上大量使用第三方風控與歸因 SDK，卻幾乎不需要面對任何本地監理風險，這是一個誠實存在、也值得持續關注的空窗期。

### 十年前寫在論文裡的把戲，今天仍在首頁運作

AliExpress 這套音訊圖聽起來像新發明，實際上一點也不新。普林斯頓大學的 Steven Englehardt 與 Arvind Narayanan 在 2016 年發表的百萬站點普查研究裡，就已記錄到野外實際使用的一種 AudioContext 指紋組態：三角波振盪器接上 AnalyserNode 與 ScriptProcessorNode，再串進增益設為零的 GainNode，最後接上 `destination`，透過 `onaudioprocess` 取出 FFT 輸出後計算 SHA1 雜湊值。對照 AliExpress 2026 年的實作，幾乎找不到差異，唯一改動只是把三角波換成鋸齒波。學術界十年前就寫下這套手法的完整原理，它至今仍運作在全球前百大電商的首頁上。

把鏡頭轉向真正的超音波追蹤，也就是使用者原本以為 AliExpress 在做的那件事，會發現這是另一個完全獨立、卻同樣有據可查的技術世界。超音波跨裝置追蹤（uXDT）使用的頻段約落在 18 至 20 kHz，剛好卡在多數成年人聽覺範圍之外（人耳對高頻的感知會隨年齡衰退，多數成年人在 17 kHz 以上已幾乎無感），卻仍落在一般手機喇叭與 MEMS 麥克風可正常收發的範圍內，這個「人聽不到、機器聽得到」的縫隙，就是整套技術賴以存在的基礎。SilverPush 的信標由五個英文字母組成，每個字母對應一個專屬頻率依序發送，採用多頻移鍵控（M-FSK）；Lisnr 運作在 18.75 至 19.2 kHz，純靠音訊就能達到每秒約 100 位元傳輸率；Shopkick 以店內發射器確認顧客到店以發放點數；Signal360 專攻場館與零售信標；Google Chromecast 則正大光明把它寫進產品設計，透過電視喇叭送出編碼音訊讓同房間手機配對，屬於使用者主動啟用、明確揭露用途的功能。

超音波能繞過作業系統的隱私邊界，原因並不複雜。傳統跨裝置追蹤依賴共同識別碼（cookie、廣告識別碼、登入帳號），作業系統與瀏覽器可透過權限管制、沙盒隔離、識別碼輪替切斷這類關聯。聲音走的卻是物理世界裡的類比通道，不受軟體沙盒管轄。一台電視、一支手機、一台平板，彼此可能沒有共同帳號、共同 IP 或共同識別碼，只要處在同一個房間裡，一段聽不見的聲音就能把它們綁成同一個使用者。作業系統的隱私模型看不見這條路徑，唯一的把關點是麥克風權限，而這項權限往往早已被使用者為了其他理由授權出去。

這套技術並非只存在於行銷簡報裡。德國團隊 Arp、Quiring、Wressnegger 與 Rieck 在 IEEE EuroS&P 2017 發表的研究，實際掃描出 234 款含超音波信標偵測行為的 Android App，並實地走訪兩個歐洲城市的 35 家商店，發現其中 4 家正在發送超音波信標，研究還示範誘使目標瀏覽會發出超音波訊號的網頁，再由手機端 App 接收並洩漏真實 IP，藉此對 Tor 使用者去匿名化。

監理端與司法端也留下了紀錄。FTC 於 2016 年 3 月對 12 家程式碼內含 SilverPush 的 App 開發者發出警告信，時任消費者保護局長 Jessica Rich 直言：「這些 App 有能力在背景聆聽並蒐集消費者資訊，卻沒有通知他們。」（"These apps were capable of listening in the background and collecting information about consumers without notifying them."）法律基礎在於，若 App 聲稱未蒐集電視收視資料實際上卻有，即構成欺騙性行為。同一年，紐約居民 LaTisha Satchell 對金州勇士隊、App 開發商 YinzCam 及信標技術商 Signal360 提告，主張球隊 App 持續開啟麥克風、違反聯邦竊聽法，被告方辯稱只偵測人耳聽不見的高頻訊號，此案於 2017 年 3 月遭聯邦法官駁回，理由是原告未能舉證對話確實遭攔截，揭示了這類案件的結構性困境：技術上「持續開啟麥克風」與法律上「攔截通訊」之間，隔著一道幾乎跨不過去的舉證門檻。

牆總是有縫可鑽，且縫的種類不只一種。2025 年 6 月曝光的「Local Mess」研究提供了另一個對照組。IMDEA Networks、Radboud University 與 KU Leuven 三方合作的團隊發現，Meta 與 Yandex 旗下的 Android App 會在背景監聽裝置的 localhost 通訊埠，嵌入在數千個網站上的 Meta Pixel 與 Yandex Metrica 追蹤腳本，則把瀏覽資料與 cookie 直接送進這些通訊埠，App 端再用自己手上的持久識別碼（登入憑證或裝置 ID），把網頁瀏覽紀錄與真實身分接上線。即使清除 cookie、開啟無痕模式、限制 App 權限，這條 localhost 橋樑都能悄悄繞過去。Meta 於 6 月 3 日宣布暫停該功能，稱正與 Google 討論 Play 商店政策上的「潛在誤解」。這起事件提醒讀者，用非預期通道打通沙盒隔離的手法並非中國企業的專利，一家總部在美國、股票在那斯達克上市的公司同樣會這麼做。

把 AliExpress 的 WebAudio 圖、真正的超音波信標，以及 Meta 與 Yandex 的 localhost 橋樑並排起來看，會浮現一條清晰的主線。每當平台方關上一扇門，產業就會去找牆上的縫。超音波是聲音的縫，localhost 是網路堆疊的縫，WebAudio 則是運算特徵的縫，門關得越緊，縫找得越刁鑽，使用者永遠是最後一個知道的人。

### Apple 關上一扇門之後，Google 又打開了它

要理解這扇門是怎麼被關上的，得從 Apple 過去十幾年緊縮裝置識別碼的軌跡說起。2012 到 2013 年間，Apple 廢止硬體綁定的 UDID，改推可重置的廣告識別碼 IDFA。2021 年 4 月隨 iOS 14.5 上線的 ATT，把跨 App 追蹤的門檻拉高到必須取得明示同意，搭配以彙總資料取代個體級歸因的 SKAdNetwork。到了 2022 年 WWDC，Apple 把話說死：無論使用者是否給予追蹤權限，任何利用裝置訊號識別裝置或使用者的指紋辨識行為一律不被允許。2024 年 5 月 1 日起，宣示變成可稽核機制，Privacy Manifests 與 Required Reason API 強制執行，未說明使用理由的新 App 或更新版本一律不被 App Store Connect 接受，同年 WWDC 的 AdAttributionKit 接續 SKAdNetwork，完成歸因基礎設施世代交替。這道防線的效力並非沒有人質疑，資安團隊 Mysk 在 2024 年 5 月發表分析，對 Required Reason API 能否真正阻止指紋辨識提出保留意見，點出「宣示性禁令」與「技術性封鎖」之間存在落差。

ATT 帶來的商業衝擊，最常被引用的數字來自 Meta。財務長 David Wehner 在 2022 年 2 月 2 日的 Q4 財報電話會議上，對即將到來的一整個年度做出前瞻性估計，認為 iOS 相關政策變動對 Meta 業務造成的逆風大約是一百億美元的量級，並當場承認團隊無法做到精確。這個數字後續從未被任何審計或財報覆核，卻在媒體轉述中逐漸被當成既成事實反覆引用，部分報導提到的更高金額則未能追溯到可靠出處，因此本文只採用有明確會議紀錄佐證的百億美元說法，並保留其為預估的但書。至於 ATT 上線後的同意率，不同資料商口徑差異相當大，有的估計美國追蹤同意率下降近五成五，有的估算全球選擇加入比例從一成六爬升到二成五、遊戲類 App 到三成，數字不宜視為單一權威，但方向一致：ATT 確實顯著壓縮了個體級追蹤的覆蓋率。《Management Science》一篇實證研究則從財務端佐證，對 Meta 依賴度較高的電商企業，ATT 上線後整體營收相對降幅落在百分之八到四十。

真正讓這個故事變得諷刺的，是 Google 在同一段時間走出的相反路線。2024 年 12 月，Google 宣布自 2025 年 2 月 16 日起，不再禁止使用其廣告產品的組織採用指紋辨識技術，這與 Google 自己在 2019 年公開表達過的立場完全相反，當時 Google 明白說過：「我們認為這顛覆了使用者的選擇權，是錯誤的。」（"We think this subverts user choice and is wrong."）英國資訊委員辦公室（ICO）隨即公開回應，提醒企業並非可以隨心所欲地使用指紋辨識，並引用 Google 自己過去的理由：指紋辨識不符合使用者的隱私期待，因為使用者無法像處理 cookie 那樣輕易同意或拒絕。

Google 的轉向並非孤立事件，而是它長達六年的 Privacy Sandbox 計畫走向終局的一部分。2025 年 4 月 22 日，Google 宣布不再推動 Chrome 淘汰第三方 cookie，維持既有 cookie 設定不變。到了同年 10 月 17 日，Google 正式終止整個 Privacy Sandbox 計畫，Topics、Protected Audience、Attribution Reporting 等原本要取代 cookie 的 API 全數退場，Android 版同日進入棄用狀態，程式碼移除已排上時程，自 2026 年 1 月的 Chrome 144 起逐步移除，預定 2026 年 7 月的 Chrome 150 完成。

把這幾條時間軸攤開來對照，會看到一個相當諷刺的結構。Apple 用 ATT 與 Required Reason API，把個體級追蹤鎖進一個又一個權限對話框，代價是把廣告產業推向不需權限、不需同意鍵的替代訊號。Google 原本打算用 Privacy Sandbox 提供「隱私友善的替代方案」，耗費六年後承認這條路走不通，不但放棄淘汰第三方 cookie，還在幾乎同一段時間解除了指紋辨識禁令。監理端的 ICO 與 EDPB 只能事後表態、事後開罰，手上沒有平台級的技術工具能即時攔截。走到 2026 年，指紋辨識反而成了現實裡最不受約束、也最被默許的追蹤基礎設施。AliExpress 首頁那兩支腳本，代表的正是這個結構底下最普通不過的日常，它之所以被人看見，單純只是因為一副藍牙耳機剛好切不回手機而已。

---

## What's Next

這起事件的技術結論相對明確，但幾條後續線索仍值得追蹤。Alibaba 至今保持沉默，這份沉默本身就是值得觀察的訊號。Firefox 與 Brave 已證明主流瀏覽器有能力大致封死 WebAudio 這條向量，值得留意這類防禦能力是否會擴散到其他瀏覽器引擎。更大的變數落在 Google 身上，Privacy Sandbox 移除期間正好與指紋辨識禁令解除的時間重疊，這段期間指紋辨識的使用量是否明顯上升，會是檢驗這波政策轉向真實影響的最直接數據。

**值得關注的發展：**

- Alibaba 是否會針對本次事件做出回應，或悄悄修改甚至移除 collina.js 與 fireyejs.js
- Chrome 144 到 Chrome 150 移除 Privacy Sandbox 的過程中，是否會出現指紋辨識使用量進一步上升的觀察數據
- 台灣個資會是否會針對裝置指紋辨識議題發出首份函釋或指引
- 是否有其他大型電商網站被發現運行類似的零增益 WebAudio 圖

**給讀者的建議：**

- 選擇對指紋辨識有主動防禦機制的瀏覽器（如 Firefox、Brave），比單純清除 cookie 更能對抗這類追蹤
- 企業導入第三方風控或歸因 SDK 前，應要求供應商說明資料是否同時被用於廣告歸因用途，並留下書面紀錄
- 對台灣的電商與 App 開發者而言，即使目前查無本地執法先例，仍應以歐盟 EDPB 的指引作為合規上限，而非等到台灣出現裁罰案例才開始因應

---

## 參考資料

1. [laserphile〈AliExpress webpage keeping multipoint Bluetooth headphones active with WebAudio fingerprinting〉（2026-08-20）](https://blog.laserphile.com/2026/08/aliexpress-webpage-keeping-multipoint.html)
2. [Hacker News 討論串〈AliExpress runs silent WebAudio fingerprinting that breaks Bluetooth multipoint〉](https://news.ycombinator.com/item?id=49372583)
3. [Lobsters 討論串〈AliExpress keeps multipoint Bluetooth headphones active〉](https://lobste.rs/s/b0olmy/aliexpress_keeps_multipoint_bluetooth)
4. [Firefox 官方 X 貼文](https://x.com/firefox/status/2090589371049087177)
5. [Brave 官方 X 貼文（2026-08-22）](https://x.com/brave/status/2091232672659972110)
6. [Tom Ritter〈webaudio fingerprinting on alibaba〉](https://ritter.vg/blog-webaudio_alibaba.html)
7. [Magic Tools〈The Sound of Zero Gain: A WebAudio Fingerprinting Investigation, and an Overstated Conclusion〉](https://tools.cooconsbit.com/en/articles/webaudio-fingerprinting-aliexpress-en)
8. [CyberInsider〈Alibaba spotted using WebAudio fingerprinting for user tracking〉](https://cyberinsider.com/alibaba-spotted-using-webaudio-fingerprinting-for-user-tracking/)
9. [PPC Land〈Hidden AliExpress audio tracking〉](https://ppc.land/hidden-aliexpress-audio-tracking/)
10. [PPC Land〈Explaining audio fingerprinting〉](https://ppc.land/audio-fingerprinting/)
11. [Englehardt & Narayanan〈Online Tracking: A 1-million-site Measurement and Analysis〉（Princeton, PDF）](https://www.cs.princeton.edu/~arvindn/publications/OpenWPM_1_million_site_tracking_measurement.pdf)
12. [Zhang, Beresford, Sheret〈SensorID: Sensor Calibration Fingerprinting for Smartphones〉（IEEE S&P 2019, PDF）](https://www.cl.cam.ac.uk/~arb33/papers/ZhangBeresfordSheret-SensorID-Oakland2019.pdf)
13. [SensorID 專案網站（Cambridge）](https://sensorid.cl.cam.ac.uk/)
14. [EDPB Guidelines 2/2023 on Technical Scope of Art. 5(3) of ePrivacy Directive（PDF）](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)
15. [行政院〈政院通過「個人資料保護委員會組織法」草案及「個人資料保護法」部分條文修正草案〉](https://www.ey.gov.tw/Page/9277F759E41CCD91/747cda78-926f-4205-99b3-1a735fc1b97b)
16. [理律法律事務所〈總統公布「個人資料保護法」修正條文〉](https://www.leeandli.com/TW/NewslettersDetail/7532.htm)
17. [個人資料保護委員會](https://www.pdpc.gov.tw/)
18. [The Hacker News〈Hundreds of Apps Using Ultrasonic Signals to Silently Track Smartphone Users〉（2017-05）](https://thehackernews.com/2017/05/ultrasonic-tracking-signals-apps.html)
19. [Schneier on Security〈Using Ultrasonic Beacons to Track Users〉（2017-05）](https://www.schneier.com/blog/archives/2017/05/using_ultrasoni.html)
20. [Threatpost〈Ultrasonic Beacons Are Tracking Your Every Movement〉](https://threatpost.com/ultrasonic-beacons-are-tracking-your-every-movement/125484/)
21. [TechCrunch〈How Can Chromecast Connect To Your Friend's Phones Without Using WiFi? Ultrasonic Sounds〉（2014-06）](https://techcrunch.com/2014/06/26/how-can-chromecast-connect-to-your-friends-phones-without-using-wifi-ultrasonic-sounds)
22. [Infosecurity Magazine〈Android Apps with Ultrasonic Beacons Track People's Daily Habits〉](https://www.infosecurity-magazine.com/news/android-apps-with-ultrasonic/)
23. [Arp, Quiring, Wressnegger, Rieck〈Privacy Threats through Ultrasonic Side Channels on Mobile Devices〉（IEEE EuroS&P 2017, PDF）](https://mlsec.org/docs/2017a-eurosp.pdf)
24. [SoniControl: A Mobile Ultrasonic Firewall（arXiv）](https://arxiv.org/pdf/1807.07617)
25. [Matyunin et al.〈Zero-Permission Acoustic Cross-Device Tracking〉（PDF）](https://caslab.io/publications/matyunin2018zeropermission.pdf)
26. [FTC〈FTC Issues Warning Letters to App Developers Using 'Silverpush' Code〉（2016-03）](https://www.ftc.gov/news-events/news/press-releases/2016/03/ftc-issues-warning-letters-app-developers-using-silverpush-code)
27. [MediaPost〈Golden State Warriors, Signal360 And App Developer Sued Over 'Eavesdropping' Allegations〉（2016-09）](https://www.mediapost.com/publications/article/283944/golden-state-warriors-signal360-and-app-developer.html)
28. [FOX Sports〈Judge rules for Golden State Warriors, dismisses eavesdropping app lawsuit〉（2017-03）](https://www.foxsports.com/nba/story/judge-dismisses-golden-state-warriors-eavesdropping-app-lawsuit-031617)
29. [Local Mess: Covert Web-to-App Tracking via Localhost on Android](https://localmess.github.io/)
30. [IMDEA Networks 研究說明](https://networks.imdea.org/research-co-led-by-imdea-networks-discovers-a-privacy-abuse-involving-meta-and-yandex-bridging-persistent-identifiers-to-browsing-histories/)
31. [The Register〈Meta pauses mobile port tracking tech on Android after researchers cry foul〉（2025-06-03）](https://www.theregister.com/2025/06/03/meta_pauses_android_tracking_tech/)
32. [Apple Developer News〈Reminder: Privacy requirement for app submissions starts May 1〉](https://developer.apple.com/news/?id=pvszzano)
33. [Mysk〈Does Apple's Required Reason API Thwart Device Fingerprinting?〉（2024-05-03）](https://mysk.blog/2024/05/03/apple-required-reason-api/)
34. [AdGuard〈Apple against device fingerprinting: your privacy at stake〉](https://adguard.com/en/blog/apple-device-fingerprinting-rules.html)
35. [CNBC〈Facebook says Apple iOS privacy change will result in $10 billion revenue hit this year〉（2022-02-02）](https://www.cnbc.com/2022/02/02/facebook-says-apple-ios-privacy-change-will-cost-10-billion-this-year.html)
36. [Management Science〈Evaluating the Impact of Privacy Regulation on E-Commerce Firms: Evidence from Apple's App Tracking Transparency〉](https://pubsonline.informs.org/doi/10.1287/mnsc.2024.06600)
37. [ICO〈Our response to Google's policy change on fingerprinting〉（2024-12）](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2024/12/our-response-to-google-s-policy-change-on-fingerprinting/)
38. [Lewis Silkin〈Google adopts new stance on device fingerprinting〉](https://www.lewissilkin.com/insights/2025/01/16/google-adopts-new-stance-on-device-fingerprinting-102ju7b)
39. [DLA Piper Privacy Matters〈Google's U-Turn on Device Fingerprinting〉](https://privacymatters.dlapiper.com/2025/01/googles-u-turn-on-device-fingerprinting-icos-response-and-subsequent-guidance/)
40. [Search Engine Land〈Google officially shuts down Privacy Sandbox〉](https://searchengineland.com/google-officially-shuts-down-privacy-sandbox-463561)
41. [Usercentrics〈Google Privacy Sandbox officially shuts down〉](https://usercentrics.com/knowledge-hub/what-is-google-privacy-sandbox/)

---

_最後更新：2026-08-23_
