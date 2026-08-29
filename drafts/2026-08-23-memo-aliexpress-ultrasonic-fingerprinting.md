---
title: "Research Memo：AliExpress「超音波追蹤」事件查證與裝置指紋辨識全景"
description: "查證結果顯示 AliExpress 事件並非超音波麥克風追蹤，而是網頁端的 WebAudio 零增益指紋辨識。本 memo 釐清訛傳、補上真正有據可查的 uXDT 案例，並串起 Apple 與 Google 的政策角力。"
date: 2026-08-23
author: "Clement Tang"
tags: ["議題研究", "電商", "Apple", "Google", "平台競爭"]
category: topic-research
status: draft
---

# Research Memo：AliExpress「超音波追蹤」事件查證與裝置指紋辨識全景

> 輕量級研究備忘錄，用於後續長文撰寫。所有事實均附來源與可信度標記。

## 會話資訊

| 欄位 | 內容 |
|------|------|
| **日期** | 2026-08-23 |
| **平台** | CLI（Claude Agent SDK） |
| **目標輸出** | Topic Research（議題研究長文） |
| **預計字數** | 6,000 至 8,000 字 |
| **研究限制** | 本次環境的 WebFetch 被 egress policy 封鎖，無法直接讀取一手部落格、Hacker News、FTC 官網原文。所有內容來自搜尋引擎摘要與多來源交叉比對，逐字引述的精確性需在撰稿前二次核對 |

---

## 一、查證結論（最重要，請先讀這段）

### 結論一句話

「AliExpress App 用人耳聽不見的超音波、透過麥克風進行裝置指紋辨識」這個說法**不成立**。真實事件是 AliExpress **網站**（瀏覽器端）執行 **WebAudio（AudioContext）指紋辨識**，程式碼把訊號送進增益為零的節點，不發出任何聲音，也**完全不需要麥克風權限**。

### 訛傳是怎麼長出來的

事件的傳播路徑本身就是一個很好的寫作素材。原始發現者是因為藍牙耳機「被 PC 佔住、切不回手機」才察覺異狀，於是媒體標題大量出現「AliExpress secretly tracking your device through your headphones」這類措辭。「耳機」加上「聽不見的聲音」兩個關鍵字合在一起，讀者很自然會腦補成超音波信標（ultrasonic beacon）與麥克風竊聽，於是二手轉述逐步變形為「超音波追蹤」。

實際上兩者的技術方向完全相反。超音波信標是「發送端播、接收端用麥克風聽」的跨裝置通訊；WebAudio 指紋辨識則是「瀏覽器自己算、自己量」的本機運算特徵擷取，聲音從頭到尾沒有離開過裝置。

### 三件事的正確區分

| 項目 | 真實的 AliExpress 事件 | 訛傳版本 | 真正的 uXDT（有據可查，但主角不是 AliExpress） |
|------|----------------------|---------|------------------------------|
| 載體 | 網頁瀏覽器（AliExpress 首頁） | 手機 App | 手機 App 內嵌的 SDK |
| 是否需麥克風 | 否 | 傳言說是 | 是，需要 `RECORD_AUDIO` 權限 |
| 是否發出聲音 | 否（gain 設為 0） | 傳言說是超音波 | 是，18 至 20 kHz 的近超音波 |
| 目的 | 單裝置的辨識與反詐欺風控 | 跨裝置追蹤 | 跨裝置關聯、電視收視監測、店內定位 |
| 代表案例 | collina.js／fireyejs.js（2026） | 無 | SilverPush、Shopkick、Lisnr、Signal360（2014 至 2017） |

**寫作提醒：** 這篇文章的最佳角度，正是「一個真實的隱私事件，如何在 72 小時內被轉述成一個技術上錯誤的故事」。誠實標註訛傳，比順著超音波敘事寫下去更有價值，也更符合 Pensieve 的定位。

---

## 二、事件本身（起）

### 時間線

| 日期 | 事件 | 可信度 |
|------|------|--------|
| 2026-08-20 | 一位以 m-c-tech（Hacker News 帳號 emctech）為名的開發者在 laserphile 部落格發文，記錄 AliExpress 首頁載入數秒後建立兩個持續運作的 WebAudio context | 一手來源（部落格原文），發現者身分為二手轉述 |
| 2026-08-20 至 21 | 貼文登上 Hacker News，標題為「AliExpress runs silent WebAudio fingerprinting that breaks Bluetooth multipoint」，當週累積約 1,031 分 | 二手轉述（分數數字待核） |
| 2026-08-20 至 22 | Mozilla 官方 Firefox 帳號在 X 發文，稱 AliExpress 的追蹤企圖「被 Firefox 的反指紋辨識技術擋下」 | 一手來源（官方帳號） |
| 2026-08-22 | Brave 官方帳號在 X 發文，稱 AliExpress「被抓到利用使用者的音訊系統追蹤他們」，該則貼文據報約兩百萬次瀏覽 | 一手來源（官方帳號），瀏覽數為二手 |
| 事件後數日內 | Mozilla 隱私工程師 Tom Ritter 在個人網站發表技術分析，反解混淆後說明程式碼在量測什麼，並指出 Firefox 已大致消除此一指紋辨識向量 | 一手來源（工程師個人分析） |
| 2026-08-23 | 大量二線科技媒體跟進，標題開始出現「透過耳機追蹤你」的誤導性措辭 | 二手轉述 |

### 具體發現了什麼

發現方式與典型的資安研究流程相去甚遠。這裡沒有逆向工程 APK、沒有流量分析、也沒有權限稽核，起點只是**一個使用者體驗的異常**。發現者的藍牙耳機同時配對 PC 與手機（multipoint），瀏覽 AliExpress 時手機的音訊怎麼樣都切不過來，關掉 AliExpress 分頁後就恢復正常。

順著這條線追查，他在 AliExpress 首頁找到兩支高度混淆的 Alibaba 安全腳本：

- **collina.js**，版本 1.140.0
- **fireyejs.js**，版本 1.231.67

（版本號來自多家媒體引述原文，屬二手轉述，撰稿前建議回原文核對。`fireyejs` 的命名與資安公司 FireEye 無關，屬 Alibaba 內部命名。）

這兩支腳本建立的音訊處理圖（audio graph）大致是：**鋸齒波振盪器（sawtooth OscillatorNode）→ AnalyserNode / ScriptProcessorNode → 增益為零的 GainNode → AudioContext.destination**。

關鍵在最後一段。把節點接到 `AudioContext.destination` 會強迫瀏覽器**真的去處理**這條音訊路徑，即使最終音量是零。副作用有三個：

1. 沒有任何媒體元素、沒有任何可聽見的聲音
2. 分頁靜音與系統靜音都擋不住（因為它根本沒在「播放」）
3. 系統的音訊輸出通道被持續佔用，導致藍牙 multipoint 耳機認為 PC 端仍在播放，拒絕把音訊交還給手機

第三點就是整起事件被發現的唯一原因。若不是這個副作用，這段程式碼可以永遠不被察覺。

### 音訊只是冰山一角

同樣兩支腳本還蒐集 canvas 繪製結果、WebGL、硬體規格、WebRTC 資訊、滑鼠與觸控行為軌跡、以及自動化（bot）偵測訊號，打包後送回 Alibaba 的遙測伺服器。音訊指紋只是這組廣泛裝置指紋中的一個欄位。（來源：多家媒體一致轉述原文，二手轉述）

### 官方回應

**截至 2026-08-23，查無 Alibaba 或 AliExpress 的任何官方回應、聲明或修正說明。** 也查無腳本被移除的證據。撰稿時應明確寫「截至本文完稿，Alibaba 未對此事回應」，並保留後續更新空間。

### 一個重要的反面聲音

有一篇標題為〈The Sound of Zero Gain: A WebAudio Fingerprinting Investigation, and an Overstated Conclusion〉的技術文章，主張技術發現本身正確，但**隨之流傳的結論被過度放大**。Tom Ritter 的分析也指向類似方向：瀏覽器指紋辨識整體上確實過度氾濫，但「就 WebAudio 這一項而言，它其實沒那麼有效」，Firefox 已大致封死這個向量。

這代表一個重要的敘事平衡點。事件的真正意義在於一家大型電商在沒有告知的情況下，持續執行歐盟法律早已認定需要同意的處理行為。至於 WebAudio 指紋本身的技術威力，其實相當有限。

---

## 三、Fingerprinting 的技術與商業背景（承）

### 什麼是裝置指紋辨識

裝置指紋辨識蒐集裝置軟硬體的多項片段資訊（設定、時鐘、瀏覽器資訊、硬體特性等），組合後可唯一識別特定裝置。它與 cookie 的根本差異在於：**cookie 可以被刪除或封鎖，硬體層級的細微差異卻很難改變**，因此持續性遠高於 cookie。

### 常見的指紋訊號清單

| 訊號 | 原理 | 代表研究／備註 |
|------|------|--------------|
| Canvas | 相同繪圖指令在不同 GPU／驅動／字型渲染下產生像素差異 | 最經典的向量 |
| WebGL | 3D 渲染管線的實作差異，加上 GPU 型號字串 | 熵值高 |
| AudioContext | 相同波形經不同 CPU、音效堆疊、瀏覽器實作後產生浮點差異，取雜湊值 | Englehardt & Narayanan（Princeton, 2016）首度在百萬站點普查中記錄到野外使用 |
| 字型清單 | 已安裝字型組合 | 傳統向量 |
| 螢幕解析度／時區／語系 | 低熵但便宜 | 通常作為輔助 |
| 感測器校準誤差 | 加速度計、陀螺儀、磁力計的出廠校準參數 | SensorID（Cambridge, IEEE S&P 2019），iPhone 6S 上約 67 bits 熵，無需任何權限、一秒內可完成 |
| 電池狀態 | Battery Status API | 多數瀏覽器已限制 |
| IP 位址與網路特徵 | 伺服器端可得 | 隨 IP 輪替失效 |

Englehardt 與 Narayanan 在 2016 年的論文中記錄到兩種 AudioContext 指紋組態，其中第二種是「三角波 → AnalyserNode → ScriptProcessorNode → gain 設為零的 GainNode → destination，透過 `onaudioprocess` 取 FFT 輸出後做 SHA1」。**AliExpress 2026 年的實作與這個十年前就被記錄的組態幾乎一模一樣**，只是把三角波換成鋸齒波。這是很強的寫作素材。學術界早在十年前就記錄過這個手法，它至今仍在全球前百大電商的首頁上運作。

### 商業誘因：為什麼非做不可

需要區分兩條動機線，這兩條線在 AliExpress 案中糾纏在一起，也是全案在法律上最曖昧的地方。

**反詐欺與風控線。** 電商平台需要偵測機器人、防止刷單與帳號盜用、對交易做風險評分。Alibaba 的 collina.js 與 fireyejs.js 在定位上就是安全與反濫用工具，腳本同時蒐集自動化偵測訊號也印證這點。這條動機在多數法域被視為「正當利益」，甚至有機會落入 ePrivacy 的必要性豁免。

**廣告與歸因線。** Apple 的 ATT 之後，跨 App 追蹤識別碼大幅失效，廣告主與歸因平台轉而尋找不需使用者同意的替代訊號。指紋辨識因此從灰色地帶重新回到檯面。

問題在於，同一組指紋資料可以同時服務兩條線，而外部觀察者無法分辨。**廠商永遠可以說「這是反詐欺」，而這個說法無法被證偽。** 這是整篇文章可以推進的核心論點。

### 法規視角

**歐盟：** EDPB 於 2024-10-07 定案的 Guidelines 2/2023，明確釐清 ePrivacy 指令第 5(3) 條不只適用於 cookie，也適用於追蹤像素、追蹤連結與**裝置指紋辨識技術**。指引並指出「取得存取（gaining access）」與「儲存資訊（storing information）」是兩個獨立概念，兩者不必同時存在即可觸發第 5(3) 條。實務意義是：AliExpress 這種未經告知、未取得同意的指紋辨識，在歐盟很難找到合法基礎，除非能證明落入「提供使用者明示要求之服務所嚴格必要」的豁免。反詐欺是否構成「嚴格必要」，是可以做深度討論的爭點。

**英國：** ICO 在 2024-12 針對 Google 政策轉向的回應中強調，企業「並非可以隨心所欲使用指紋辨識」，必須符合透明性、自由給予的同意、公平處理，並保障刪除權等資訊權利。

**美國：** FTC 的主要工具是 FTC Act 第 5 條的「不公平或欺騙性行為」。2016 年對 SilverPush 相關 App 開發者的警告信就是以「若你的說明或介面暗示 App 未蒐集電視收視資料、實際上卻有蒐集，即可能違反第 5 條」為法律基礎。重點是**揭露義務**而非技術本身。

**台灣：** 個人資料保護委員會於 2025 年正式設立，總統於 2025-11-11 公布個資法修正條文以配合委員會運作，並設有六年過渡期由各中央目的事業主管機關續行管理。**目前查無台灣主管機關針對「裝置指紋是否構成個人資料」的明確函釋或裁罰案例。** 這是一個誠實的缺口，也是台灣讀者最需要的一段分析：在缺乏歐盟式 ePrivacy 專法、且個資法以「得以直接或間接方式識別該個人」為要件的架構下，裝置指紋的定性至今仍屬未決。撰稿時應標註為「作者觀察」而非「法律見解」。

---

## 四、超音波技術細節（轉，這裡是真正的 uXDT）

雖然 AliExpress 事件與超音波無關，超音波跨裝置追蹤（ultrasonic cross-device tracking, uXDT）本身是完全真實、且有大量文獻與監理紀錄的技術。這一段可以作為文章的對照組。

### 原理

uXDT 使用約 **18 至 20 kHz** 的近超音波頻段。這個頻段在成年人聽覺上限之上（人耳高頻感知隨年齡衰退，多數成年人在 17 kHz 以上已近乎無感），卻仍落在一般手機喇叭與 MEMS 麥克風的可用範圍內。這個「人聽不到、機器聽得到」的縫隙，就是整個技術的立足點。

### 編碼方式

SilverPush 的信標由**五個英文字母**組成，每個字母對應 18 kHz 至 20 kHz 之間的一個專屬頻率，依序發送，使用 **M-FSK（multiple frequency-shift keying，多頻移鍵控）**。

Lisnr 的技術運作於 **18.75 至 19.2 kHz**，純靠音訊即可達到約 **100 bits 每秒**的資料傳輸率。

其他實作也使用 chirp（掃頻）與展頻（spread spectrum）以提升抗噪與抗多重路徑能力。有效距離通常限於同一房間，因為高頻聲波衰減快且穿不透牆壁。這個物理限制在 Chromecast 的設計中被當成**特色**而非缺點。

### 為什麼能繞過作業系統的隱私邊界

這是 uXDT 最值得寫的一點。傳統追蹤依賴共同識別碼（cookie、IDFA、AAID），作業系統與瀏覽器可以透過權限、沙盒、識別碼輪替來切斷關聯。但聲音走的是**物理世界的類比通道**，它不受任何軟體沙盒管轄。

一台電視、一支手機、一台平板，彼此之間沒有共同帳號、沒有共同 IP、沒有共同識別碼，只要它們處在同一個房間，一段超音波就能把它們綁成同一個「使用者」。作業系統的隱私模型完全看不到這條路徑，它唯一的把關點是麥克風權限，而麥克風權限通常已經被使用者為了其他理由授權出去了。

### 有據可查的實作與案例

| 主體 | 用途 | 時期 | 備註 |
|------|------|------|------|
| SilverPush | 電視廣告信標，關聯電視收視與手機 | 2014 至 2017 | 印度 Gurgaon 公司，引發 FTC 行動 |
| Shopkick | 店內小型發射器確認顧客實體到店，發放忠誠點數 | 持續 | 用途相對明確揭露 |
| Lisnr | 音訊資料傳輸（票證、支付、行動辨識） | 持續 | 18.75 至 19.2 kHz，100 bps |
| Signal360 | 場館與零售信標 | 2016 前後 | 涉入 Golden State Warriors App 訴訟 |
| Google Chromecast | 超音波配對，透過電視喇叭送出編碼音訊讓同房間手機接收 | 2014 起 | 揭露且屬使用者主動啟用的功能 |

### 學術與防禦研究

- **Arp、Quiring、Wressnegger、Rieck，〈Privacy Threats through Ultrasonic Side Channels on Mobile Devices〉，IEEE EuroS&P 2017（巴黎，2017-04-26 至 28）。** 研究發現 **234 款 Android App** 內含超音波信標偵測行為，並在兩個歐洲城市實地走訪的 **35 家商店中發現 4 家**正在發送信標。研究同時展示 uXDT 可用於**去匿名化 Tor 使用者**，誘使目標瀏覽會發出超音波的頁面，再由手機端接收 App 洩漏真實 IP。
- **SoniControl（超音波防火牆）**，ACM Multimedia 2018，由 FH St. Pölten 團隊開發，是首個面向一般使用者的超音波偵測與遮蔽工具。
- **Matyunin 等人，〈Zero-Permission Acoustic Cross-Device Tracking〉**，示範不需麥克風權限的聲學跨裝置追蹤路徑。

### 監理與訴訟紀錄

**FTC，2016-03。** 對 12 家在 Google Play 上架、程式碼內含 SilverPush 的 App 開發者發出警告信。時任 FTC 消費者保護局長 Jessica Rich 表示：「這些 App 有能力在背景聆聽並蒐集消費者資訊，卻沒有通知他們。」（"These apps were capable of listening in the background and collecting information about consumers without notifying them."）警告信指出，若 App 的說明或介面聲稱或暗示未蒐集並傳輸電視收視資料，實際上卻有，即可能違反 FTC Act 第 5 條。

**Satchell v. Sonic Notify（Golden State Warriors 案），2016 至 2017。** 紐約居民 LaTisha Satchell 於 2016-09 對 NBA 金州勇士隊、App 開發商 YinzCam、信標技術商 Signal360 提告，主張球隊 App 在執行期間持續開啟麥克風錄音，違反聯邦竊聽法。被告方辯稱 App 只偵測人耳聽不見的高頻訊號。聯邦法官 Jeffrey White 於 2017-03 駁回全案，理由是原告未能舉證其對話確實遭攔截或使用。

**這個判決結果本身值得寫。** 它揭示了此類案件的舉證困境：技術上「持續開啟麥克風」與法律上「攔截通訊」之間有一道原告幾乎跨不過去的門檻。

### 值得對照的「繞過沙盒」案例：Localhost tracking

技術原理不同，但屬於同一類「用非預期通道打通沙盒隔離」的行為，是很好的對照素材。

**Local Mess（2025-06）。** IMDEA Networks、Radboud University、KU Leuven 三方合作的研究發現，Meta 與 Yandex 的 Android App（Facebook、Instagram、Yandex Maps、Yandex Browser）在背景監聽 localhost 通訊埠，而嵌入在數千個網站上的 Meta Pixel 與 Yandex Metrica 追蹤腳本則把瀏覽資料與 cookie 送到這些通訊埠。App 端再用自身的持久識別碼（登入憑證、裝置 ID）把網頁瀏覽記錄與真實使用者身分對接。即使使用者清除 cookie、使用無痕模式或限制 App 權限，這條 localhost 橋樑都能繞過。

**後續：** Meta 於 **2025-06-03** 宣布暫停該功能，稱正與 Google 討論 Play 商店政策的「潛在誤解」。Google 認定該行為違反 Play 條款與 Android 隱私原則，並在 **2025-05-26 發布的 Chrome 137** 中加入緩解措施，封鎖 Meta Pixel 使用的 SDP Munging 等手法。

三個案例並置，可以構成一條清楚的主線：**每當平台關上一扇門，產業就會去找牆上的縫。超音波是聲音的縫，localhost 是網路堆疊的縫，WebAudio 是運算特徵的縫。**

---

## 五、Apple 與 Google 的政策脈絡（合）

### Apple 的識別碼緊縮時間線

| 時間 | 動作 | 意義 |
|------|------|------|
| 2012 至 2013 | 廢止 UDID，改推 IDFA／ASIdentifierManager | 從硬體綁定識別碼轉向可重置的廣告識別碼 |
| 2021-04（iOS 14.5） | App Tracking Transparency（ATT）上線，跨 App 追蹤必須取得明示同意 | 廣告產業的分水嶺 |
| 同期 | SKAdNetwork 作為隱私保護式歸因方案 | 以彙總資料取代個體級歸因 |
| 2022 WWDC | 明文表態：「指紋辨識永遠不被允許。無論使用者是否給予追蹤權限，指紋辨識，也就是利用裝置訊號試圖識別裝置或使用者，依 Apple Developer Program License Agreement 均不被允許。」 | 把指紋辨識從灰色地帶劃入明確禁區 |
| 2024-05-01 | Privacy Manifests（`PrivacyInfo.xcprivacy`）與 Required Reason API 強制執行，未在隱私聲明檔中說明使用理由的新 App 與更新不被 App Store Connect 接受 | 從「禁止」轉向「可稽核」 |
| 2024 WWDC | AdAttributionKit 接續 SKAdNetwork | 歸因基礎設施世代交替 |

值得注意的一個反面觀點：資安研究團隊 Mysk 在 2024-05-03 發表〈Does Apple's Required Reason API Thwart Device Fingerprinting?〉，對 Required Reason API 能否實際阻止指紋辨識提出質疑。這是很好的平衡素材，說明「宣示性禁令」與「技術性封鎖」之間的落差。

### ATT 的實際衝擊

**Meta 的 100 億美元說法，請務必謹慎處理。** 正確的出處是 Meta 財務長 David Wehner 在 **2022-02-02 的 Q4 2021 財報電話會議**上表示：「我們認為 iOS 整體在 2022 年對我們業務造成的逆風，量級大約是 100 億美元。」（"the impact of iOS overall as a headwind on our business in 2022 is on the order of $10 billion."）

三個必須標註的但書：

1. 這是 Wehner 對**尚未結束的年度**所做的**前瞻性預估**，他當場就說「我們無法在這件事上做到精確」
2. 這個數字**從未被事後驗證或審計**，卻在後續傳播中被當成既成事實引用
3. 部分二手來源引用「130 億美元」，但本次查證未能追溯到該數字的一手出處，**建議一律使用 100 億美元並註明是預估**

**Opt-in 率的數字同樣分歧。** 查得的說法包括：ATT 使 美國的追蹤同意率下降近 55%；全球 opt-in 率從 2021-05 的 16% 上升至 2022 年中的 25%，遊戲類 App 約 30%。不同資料商（AppsFlyer、Adjust、Flurry）口徑與樣本差異極大，撰稿時應標明來源與統計口徑，避免當成單一權威數字。學術面則有 Management Science 上的〈Evaluating the Impact of Privacy Regulation on E-Commerce Firms: Evidence from Apple's App Tracking Transparency〉可引用，該研究發現對 Meta 依賴度較高的企業，整體營收相對降幅落在 8% 至 40% 區間。

### Google 的反向操作

這是全篇最強的反差，也是最適合當作結論的轉折。

**2024-12。** Google 宣布自 **2025-02-16** 起，不再禁止使用其廣告產品的組織採用指紋辨識技術。這與 Google 自己 2019 年的公開立場完全相反，當時 Google 說：「我們認為這顛覆了使用者的選擇權，是錯誤的。」（"We think this subverts user choice and is wrong."）

**ICO 的回應（2024-12）。** 英國資訊委員辦公室公開批評此舉，並提醒企業「並非可以隨心所欲使用指紋辨識」，若未合法透明地部署，ICO 將採取行動。ICO 特別引用 Google 自己曾說過的理由：指紋辨識不符合使用者的隱私期待，因為使用者無法像處理 cookie 那樣輕易同意或拒絕，也因此無法控制自身資訊如何被蒐集。

**2025-04-22。** Google 宣布不再推動 Chrome 第三方 cookie 的淘汰，維持現有的 cookie 設定選項。

**2025-10-17。** Google 正式終止 Privacy Sandbox，歷經六年開發。Topics、Protected Audience、Attribution Reporting、IP Protection、Related Website Sets 等 API 全數退場，僅 CHIPS、FedCM、Private State Tokens 留存。Android 版 Privacy Sandbox 同日起進入棄用狀態。Chrome 端的移除自 **Chrome 144（2026-01）** 開始，預定於 **Chrome 150（2026-07）** 完成。

### 現況：三方角力的結果

把時間軸拉直，會看到一個相當諷刺的結構。

Apple 用 ATT 與 Required Reason API 把個體級追蹤鎖進權限對話框，代價是把廣告產業推向不需權限的替代訊號。Google 原本要用 Privacy Sandbox 提供「隱私友善的替代品」，六年後承認失敗、放棄淘汰第三方 cookie，並在同一段時間解除對指紋辨識的禁令。監理端的 ICO 與 EDPB 只能事後表態，手上沒有平台級的技術執行工具。

於是在 2026 年，**指紋辨識成了現實中最不受約束、也最被默許的追蹤基礎設施**。AliExpress 首頁那兩支腳本代表的正是這個結構下的常態。它之所以被看見，只是因為一副藍牙耳機剛好切不回手機。

---

## 六、無法查證或需二次核對的項目

撰稿時請避開或明確標註為「待查」：

1. **laserphile 原文的逐字引述。** 本次環境無法讀取 `blog.laserphile.com`、`news.ycombinator.com`、`ritter.vg`、`ppc.land`、`cyberinsider.com`、`ftc.gov`，所有引述均經搜尋摘要轉手。任何要放進正文的直接引語，請務必回原文核對。
2. **腳本版本號** collina.js 1.140.0 與 fireyejs.js 1.231.67，來自媒體轉述，未見一手截圖。
3. **Hacker News 分數 1,031 分**，以及 Brave 貼文「約兩百萬次瀏覽」，均為二手數字。
4. **發現者身分** m-c-tech／emctech，為二手轉述，且該人未公開真實姓名。
5. **Firefox 官方貼文的精確日期**（推測為 2026-08-20 至 21），僅取得貼文連結，未確認時戳。
6. **Alibaba 是否已移除或修改腳本**，截至 2026-08-23 查無任何證據，也查無官方回應。
7. **Meta「130 億美元」損失**，未能追溯一手出處，建議不用。
8. **ATT opt-in 率**的各種數字，來源口徑不一，需標明出處。
9. **台灣主管機關對裝置指紋的法律定性**，查無函釋或裁罰先例，任何論述都應寫成作者推論。
10. **AliExpress 手機 App（原生）是否有任何音訊或麥克風相關的追蹤行為**，本次查證完全沒有證據，請勿在文中暗示。

---

## 七、內容大綱建議

### 1. 起：一副切不回手機的藍牙耳機

從 2026-08-20 的使用者體驗異常切入。強調發現的偶然性，以及「若沒有這個副作用，這段程式碼可以永遠隱形」的意涵。

### 2. 承：先把訛傳拆掉

坦白說明「超音波追蹤」是誤傳，並解釋誤傳如何從「耳機」與「聽不見的聲音」兩個詞長出來。用區分表釐清三件事。這一節本身就是文章的差異化價值。

### 3. 轉之一：WebAudio 指紋是什麼，為什麼十年沒被解決

從 Englehardt & Narayanan 2016 的百萬站點普查講到 AliExpress 2026 的實作，指出兩者組態幾乎相同。帶出指紋訊號全景與 SensorID。

### 4. 轉之二：那超音波呢？真正的 uXDT 檔案

SilverPush、Shopkick、Lisnr、Signal360、Chromecast。Arp et al. 2017 的 234 款 App 與 35 家商店中的 4 家。FTC 2016 警告信與 Warriors 案的駁回。說明 uXDT 為何能繞過沙盒，以及它與 localhost tracking 的共同邏輯。

### 5. 轉之三：反詐欺這塊免死金牌

同一組指紋資料同時服務風控與廣告，外部無法分辨。EDPB Guidelines 2/2023 與「嚴格必要」豁免的爭點。

### 6. 合：Apple 關門、Google 開門，然後呢

Apple 時間線與 ATT 衝擊（含 100 億美元說法的但書），對照 Google 2024-12 解禁指紋、2025-04 保留 cookie、2025-10 終結 Privacy Sandbox。收在「AliExpress 代表的是常態中偶然被看見的那一部分」。

### 7. 台灣視角

個資會 2025 年設立後的空窗、個資法欠缺 ePrivacy 式的裝置存取條款、台灣電商與 App 開發者實務上大量使用第三方風控與歸因 SDK 的曝險。明確標註為作者觀察。

---

## 八、可直接引用的關鍵事實（附可信度）

| # | 事實 | 可信度 |
|---|------|--------|
| 1 | AliExpress 首頁的 collina.js 與 fireyejs.js 建立零增益 WebAudio 圖，不需麥克風、不發出聲音、不受靜音影響，且會佔住系統音訊通道 | 一手部落格 + 多家媒體交叉印證 |
| 2 | Englehardt & Narayanan（2016）記錄的 AudioContext 指紋組態之一，與 AliExpress 2026 年實作幾乎相同 | 一手學術論文 |
| 3 | Arp et al.（EuroS&P 2017）發現 234 款 Android App 內含超音波信標偵測，兩個歐洲城市 35 家商店中有 4 家發送信標 | 一手學術論文 |
| 4 | FTC 於 2016-03 對 12 家使用 SilverPush 程式碼的 App 開發者發出警告信 | 一手（FTC 新聞稿） |
| 5 | SilverPush 信標以五個字母、18 至 20 kHz 的 M-FSK 編碼傳送 | 二手技術報導 |
| 6 | EDPB Guidelines 2/2023（2024-10-07 定案）確認裝置指紋辨識落入 ePrivacy 第 5(3) 條 | 一手（EDPB 文件） |
| 7 | Google 自 2025-02-16 起解除對廣告客戶使用指紋辨識的禁令，ICO 於 2024-12 公開批評 | 一手（Google 政策、ICO 新聞稿） |
| 8 | Google 於 2025-10-17 終止 Privacy Sandbox，Android 版同日棄用；2025-04-22 已宣布保留第三方 cookie | 主流媒體 + 官方公告 |
| 9 | David Wehner 於 2022-02-02 稱 iOS 變更在 2022 年對 Meta 造成「約 100 億美元」逆風，並自承無法精確 | 一手（財報電話會議，CNBC 報導） |
| 10 | Meta 與 Yandex 的 localhost 追蹤於 2025-06 曝光，Meta 於 2025-06-03 暫停 | 一手學術網站 + 主流媒體 |

---

## 九、資料來源

### 事件一手與近一手來源

1. [laserphile〈AliExpress webpage keeping multipoint Bluetooth headphones active with WebAudio fingerprinting〉（2026-08-20）](https://blog.laserphile.com/2026/08/aliexpress-webpage-keeping-multipoint.html)
2. [Hacker News 討論串〈AliExpress runs silent WebAudio fingerprinting that breaks Bluetooth multipoint〉](https://news.ycombinator.com/item?id=49372583)
3. [Tom Ritter〈webaudio fingerprinting on alibaba〉](https://ritter.vg/blog-webaudio_alibaba.html)
4. [Brave 官方 X 貼文（2026-08-22）](https://x.com/brave/status/2091232672659972110)
5. [Firefox 官方 X 貼文](https://x.com/firefox/status/2090589371049087177)
6. [Magic Tools〈The Sound of Zero Gain: A WebAudio Fingerprinting Investigation, and an Overstated Conclusion〉](https://tools.cooconsbit.com/en/articles/webaudio-fingerprinting-aliexpress-en)
7. [CyberInsider〈Alibaba spotted using WebAudio fingerprinting for user tracking〉](https://cyberinsider.com/alibaba-spotted-using-webaudio-fingerprinting-for-user-tracking/)
8. [PPC Land〈Hidden AliExpress audio tracking〉](https://ppc.land/hidden-aliexpress-audio-tracking/)
9. [PPC Land〈Explaining audio fingerprinting〉](https://ppc.land/audio-fingerprinting/)
10. [Lobsters 討論串](https://lobste.rs/s/b0olmy/aliexpress_keeps_multipoint_bluetooth)

### 學術研究

1. [Arp, Quiring, Wressnegger, Rieck〈Privacy Threats through Ultrasonic Side Channels on Mobile Devices〉IEEE EuroS&P 2017（PDF）](https://mlsec.org/docs/2017a-eurosp.pdf)
2. [Englehardt & Narayanan〈Online Tracking: A 1-million-site Measurement and Analysis〉Princeton（PDF）](https://www.cs.princeton.edu/~arvindn/publications/OpenWPM_1_million_site_tracking_measurement.pdf)
3. [Zhang, Beresford, Sheret〈SensorID: Sensor Calibration Fingerprinting for Smartphones〉IEEE S&P 2019（PDF）](https://www.cl.cam.ac.uk/~arb33/papers/ZhangBeresfordSheret-SensorID-Oakland2019.pdf)
4. [SensorID 專案網站（Cambridge）](https://sensorid.cl.cam.ac.uk/)
5. [SoniControl: A Mobile Ultrasonic Firewall（arXiv）](https://arxiv.org/pdf/1807.07617)
6. [Matyunin et al.〈Zero-Permission Acoustic Cross-Device Tracking〉（PDF）](https://caslab.io/publications/matyunin2018zeropermission.pdf)
7. [Local Mess: Covert Web-to-App Tracking via Localhost on Android](https://localmess.github.io/)
8. [IMDEA Networks 研究說明](https://networks.imdea.org/research-co-led-by-imdea-networks-discovers-a-privacy-abuse-involving-meta-and-yandex-bridging-persistent-identifiers-to-browsing-histories/)
9. [Management Science〈Evaluating the Impact of Privacy Regulation on E-Commerce Firms: Evidence from Apple's App Tracking Transparency〉](https://pubsonline.informs.org/doi/10.1287/mnsc.2024.06600)

### 監理與法律

1. [FTC〈FTC Issues Warning Letters to App Developers Using 'Silverpush' Code〉（2016-03）](https://www.ftc.gov/news-events/news/press-releases/2016/03/ftc-issues-warning-letters-app-developers-using-silverpush-code)
2. [EDPB Guidelines 2/2023 on Technical Scope of Art. 5(3) of ePrivacy Directive（PDF）](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)
3. [ICO〈Our response to Google's policy change on fingerprinting〉（2024-12）](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2024/12/our-response-to-google-s-policy-change-on-fingerprinting/)
4. [Lewis Silkin〈Google adopts new stance on device fingerprinting〉](https://www.lewissilkin.com/insights/2025/01/16/google-adopts-new-stance-on-device-fingerprinting-102ju7b)
5. [DLA Piper Privacy Matters〈Google's U-Turn on Device Fingerprinting〉](https://privacymatters.dlapiper.com/2025/01/googles-u-turn-on-device-fingerprinting-icos-response-and-subsequent-guidance/)
6. [MediaPost〈Golden State Warriors, Signal360 And App Developer Sued Over 'Eavesdropping' Allegations〉（2016-09）](https://www.mediapost.com/publications/article/283944/golden-state-warriors-signal360-and-app-developer.html)
7. [FOX Sports〈Judge rules for Golden State Warriors, dismisses eavesdropping app lawsuit〉（2017-03）](https://www.foxsports.com/nba/story/judge-dismisses-golden-state-warriors-eavesdropping-app-lawsuit-031617)
8. [行政院〈政院通過「個人資料保護委員會組織法」草案及「個人資料保護法」部分條文修正草案〉](https://www.ey.gov.tw/Page/9277F759E41CCD91/747cda78-926f-4205-99b3-1a735fc1b97b)
9. [理律法律事務所〈總統公布「個人資料保護法」修正條文〉](https://www.leeandli.com/TW/NewslettersDetail/7532.htm)
10. [個人資料保護委員會](https://www.pdpc.gov.tw/)

### 平台政策

1. [Apple Developer News〈Reminder: Privacy requirement for app submissions starts May 1〉](https://developer.apple.com/news/?id=pvszzano)
2. [Mysk〈Does Apple's Required Reason API Thwart Device Fingerprinting?〉（2024-05-03）](https://mysk.blog/2024/05/03/apple-required-reason-api/)
3. [AdGuard〈Apple against device fingerprinting: your privacy at stake〉](https://adguard.com/en/blog/apple-device-fingerprinting-rules.html)
4. [CNBC〈Facebook says Apple iOS privacy change will result in $10 billion revenue hit this year〉（2022-02-02）](https://www.cnbc.com/2022/02/02/facebook-says-apple-ios-privacy-change-will-cost-10-billion-this-year.html)
5. [Search Engine Land〈Google officially shuts down Privacy Sandbox〉](https://searchengineland.com/google-officially-shuts-down-privacy-sandbox-463561)
6. [Usercentrics〈Google Privacy Sandbox officially shuts down〉](https://usercentrics.com/knowledge-hub/what-is-google-privacy-sandbox/)
7. [The Register〈Meta pauses mobile port tracking tech on Android after researchers cry foul〉（2025-06-03）](https://www.theregister.com/2025/06/03/meta_pauses_android_tracking_tech/)

### 超音波技術背景

1. [The Hacker News〈Hundreds of Apps Using Ultrasonic Signals to Silently Track Smartphone Users〉（2017-05）](https://thehackernews.com/2017/05/ultrasonic-tracking-signals-apps.html)
2. [Schneier on Security〈Using Ultrasonic Beacons to Track Users〉（2017-05）](https://www.schneier.com/blog/archives/2017/05/using_ultrasoni.html)
3. [Threatpost〈Ultrasonic Beacons Are Tracking Your Every Movement〉](https://threatpost.com/ultrasonic-beacons-are-tracking-your-every-movement/125484/)
4. [TechCrunch〈How Can Chromecast Connect To Your Friend's Phones Without Using WiFi? Ultrasonic Sounds〉（2014-06）](https://techcrunch.com/2014/06/26/how-can-chromecast-connect-to-your-friends-phones-without-using-wifi-ultrasonic-sounds)
5. [Infosecurity Magazine〈Android Apps with Ultrasonic Beacons Track People's Daily Habits〉](https://www.infosecurity-magazine.com/news/android-apps-with-ultrasonic/)
6. [The Hacker News〈Top Websites Using Audio Fingerprinting to Secretly Track Web Users〉（2016-05）](https://thehackernews.com/2016/05/audio-fingerprint.html)

---

## 十、交接備註

### 研究狀態

- [x] 事件查證完成（結論：超音波說法不成立，真實事件為 WebAudio 指紋辨識）
- [x] 技術背景資料收集完成
- [x] 法規與平台政策脈絡收集完成
- [x] 大綱確定
- [ ] 一手來源逐字引述核對（本次環境受限，需在可連網環境補做）

### 待補充項目

1. 回讀 laserphile 原文與 Tom Ritter 分析，補上可直接引用的逐字引語與程式碼片段
2. 追蹤 Alibaba 是否於 2026-08-23 之後發布回應或移除腳本
3. 補查台灣是否有電商或金融 App 使用同類第三方指紋 SDK 的公開資料（可從 App 隱私標籤與 SDK 揭露清單著手）
4. 若要寫台灣視角，建議補訪一位本地 adtech 或風控從業者，取得實務觀點

### 續接建議

- **續接平台：** CLI
- **建議模板：** `templates/topic-research-template.md`
- **特別注意：** 標題與導言**絕對不能**沿用「超音波」框架。若要提及，必須以「被誤傳為超音波」的方式處理。文章的核心價值在於同時交付「正確的技術事實」與「訛傳的傳播路徑分析」。

---

*最後更新：2026-08-23*
