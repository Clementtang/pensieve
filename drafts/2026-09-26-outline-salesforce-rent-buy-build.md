---
title: "文章大綱：二十天，三個選擇：Salesforce 租了 Claude、買了 Fin，又自己造了 Koa"
description: "Salesforce 收購 Fin 分析文的段落層級大綱：角度 C 開場建立荒謬感，租、買、造三段展開，角度 A 拆解為何自洽，最後回扣前作 Claudeforce 分析文"
date: 2026-09-26
author: "Clement Tang"
tags: ["outline", "Salesforce", "Fin", "Claude", "Koa", "Anthropic", "NVIDIA", "AI 模型策略"]
category: articles
status: draft
related:
  - "drafts/2026-09-10-memo-salesforce-fin-acquisition-research.md"
  - "docs/articles/2026-08-27-claudeforce-salesforce-anthropic-analysis.md"
---

# 文章大綱：二十天，三個選擇

> 可動筆版（2026-09-27 整理）。每段標明要用的數據、來源層級，以及對應的備忘禁寫條目。所有數據的原始出處見 [Research Memo](./2026-09-10-memo-salesforce-fin-acquisition-research.md) 文末的「一手來源核實紀錄」。核實過程與決策歷程收在本文最後的決策紀錄，動筆時不用看。

## 總覽

| 項目 | 內容 |
|------|------|
| **標題** | 二十天，三個選擇：Salesforce 租了 Claude、買了 Fin，又自己造了 Koa |
| **結構** | 角度 C 開場（荒謬感）→ 租、買、造三段 → 角度 A 拆解（為什麼自洽）→ 回扣前作 |
| **篇幅** | 單篇，正文約 4,000 至 4,500 字 |
| **主視角** | 第一人稱，比照前作語氣 |
| **系列定位** | 前作〈Salesforce 把 27 年的招牌借給 Anthropic，然後叫你不用再打開 Salesforce〉的續篇。前作講「租」，本篇補上「買」與「造」 |
| **資料截止** | 2026-09-27（四輪一手核實＋一次時效檢查） |

### 來源層級標記

- **T1**：Salesforce、NVIDIA、Fin、Anthropic 官方新聞稿、官方頁面、說明文件、SEC 文件
- **T2**：一線媒體原文（Bloomberg、CNBC、TechCrunch 等）
- **T3**：產業媒體、分析機構、第三方逐字稿
- **vendor**：廠商自建的 benchmark 或自發布的論文，引用時必須標明「自家數字」
- **推論**：作者觀點，行文時必須讓讀者看得出這是判斷而非事實

### 核心論點

Salesforce 在二十天內，對「AI 的腦從哪裡來」給了三個不同的答案。三者看起來互相矛盾，放在同一張堆疊圖上卻各有位置（**推論**）。但三者之間怎麼分工，Salesforce 到現在一句都沒有公開說明（**已查證的空白**）。

### 動筆前的四條紅線

1. **租、買、造是作者的分析框架，不是 Salesforce 的官方說法。** 官方從未用 rent、buy、build 描述自己（禁寫・事實類 6）
2. **Claude、Fin Apex、Koa 三者之間的官方分工全部查無。** 任何「誰負責什麼」都只能寫成推論（禁寫・事實類 4、5、8）
3. **兩個 benchmark 都是廠商自建。** Fin Apex 的 73.1% 與 Koa 的 CRM Bench 都不是中立評測（禁寫・術語類 2、3）
4. **Claude 不是 Salesforce 的「全線」預設模型。** Claude 是 Slack、Agentforce Vibes、Coworker 等產品的預設，但 Agentforce 的預設是 OpenAI 的 GPT-4.1。只能寫「多項產品的預設」

### 發佈前待核（不擋動筆）

以下三條是第一輪研究時從搜尋摘要取得、之後四輪都沒有讀過原文的事實。大綱中標為「**待讀原文**」。可以先照寫，**發佈前必須核實**：

1. Claudeforce 新聞稿列出的 Claude 預設產品清單（開場、一、租）
2. Salesforce 持有 Anthropic 股權約 50 億美元（開場、一、租、4-1）。Bloomberg 有付費牆，可改找 Salesforce 10-Q 的策略投資揭露
3. Salesforce 自家客服從約 9,000 人減到約 5,000 人（4-2）。前作引用的是 Fortune 2025-09-02〈Salesforce CEO Marc Benioff says his company has cut 4,000 customer service jobs〉

---

## 開場：二十天的時間軸（約 500 字）｜角度 C

**這段要做到的事：** 讓讀者覺得「這家公司是不是瘋了」。

**段落節奏：**

1. **用三個日期開場**，不加評論，讓時間軸自己說話
   - 2026-08-26：Claudeforce 發布，Claude 成為 Salesforce 多項產品的預設模型｜Claudeforce 新聞稿，**待讀原文**
   - 2026-09-10：Fin 交割，約 36 億美元現金｜T1（新聞稿＋FY27 Q2 10-Q）
   - 2026-09-15：Dreamforce 同日發表 Koa，Salesforce 第一個 CRM 推理模型｜T1
2. **疊上諷刺三角**，一句一個事實
   - Salesforce 持有 Anthropic 股權，2026 年 6 月估值約 50 億美元｜Bloomberg，**待讀原文**
   - Anthropic 本身是 Fin 的客戶：每月逾 56 萬次解決、79% 解決率｜T1（fin.ai 案例頁）
   - Fin 自家 benchmark 說 Fin Apex 贏過 Claude：73.1 對 Opus 4.5 的 71.1、Sonnet 4.6 的 69.6｜vendor
   - 然後 Salesforce 又自己做了一個
3. **拋出全文要回答的問題**：一家公司同時向三個方向要 AI 的腦，是沒想清楚，還是想得很清楚？

**禁寫提醒：**

- Anthropic 案例不要用舊數字 58% 與 1,700 小時（數字類 4）
- Fin Apex 的數字要標自家 benchmark（術語類 2）

---

## 一、租：Claude，但不只 Claude（約 500 字）

**這段要做到的事：** 快速交代，**不重複前作**。重點是讓讀者知道 Salesforce 租的腦不只一個。

**段落節奏：**

1. **一段帶過前作**，附前作連結
2. **前作發表後的新進度**
   - Claudeforce 已開放所有客戶 beta，含 37 個銷售技能｜T1（AIforce 稿，2026-09-15）
   - 客服、行銷、商務技能寫的是「in the near future」，沒有日期｜T1
3. **Claude 實際在哪裡**
   - Slack AI、Slackbot、Agentforce Vibes、Agentforce Coworker 的預設模型｜Claudeforce 新聞稿，**待讀原文**（多家轉述一致）
   - 在 Agentforce 裡是**選項**，不是預設：Salesforce Help〈Select Agentforce Model Option〉寫官方建議的「Salesforce Default」在新版 Agentforce Builder 用 **GPT-4.1**、舊版用 GPT-4o；選「AWS-Hosted」才會用到 Claude，版本是 **Claude Haiku 4.5**；另有 Gemini 3.5 Flash｜T1（Help 頁無發布日期，引用時寫「截至 2026 年 9 月」）
4. **點出重點**：Salesforce 租的腦其實有好幾個，Anthropic 只是其中一家（這是事實）。這本身就是「不把腦押在同一家」的第一層（**推論**）
5. **寫作細節**：說是「租」，但租的對象是自己持股約 50 億美元的公司。這個曖昧可以點一句
6. **成本面（選用）**
   - Salesforce 副財務長 Mike Spencer 在 2026-08-27 Deutsche Bank 科技大會說：「roughly about six months ago, we unleashed Claude in our R&D cycle. It is part of the reason we did not raise margin guidance on the year is because we are covering some of the token spend」｜受訪者原話（逐字稿｜T3；The Register 2026-09-03 有引述｜T2）
   - 同場他說多數工作用「second or third generation model」就夠，內部同時用 OpenAI、Cursor、Claude，也開始試 Grok
   - 財報稿與法說會只寫 GAAP 營益率指引從約 20.6% 調到約 20.1%，**法說會沒有提到 token**｜T1。把營益率連到 Claude 的是投資人大會上的說法，不是財報揭露
7. **埋伏筆**：Claudeforce 的客服技能還沒上線，而客服正好是 Fin 的地盤（**推論**）

**這段的措辭分寸：**

- Spencer 講的是 Salesforce **內部研發**使用 Claude 的成本，不是 Claudeforce 產品的成本
- The Register 標題用「addiction」是媒體語氣，不要當成事實引用
- 本篇避開「Headless 360」一詞。官方說明文件已寫明它自 2026-09-04 起改名 AIforce；若非提不可，寫「當時稱 Headless 360、現名 AIforce」（術語類 1）

---

## 二、買：Fin（約 900 字）｜新聞主體

**這段要做到的事：** 交代新聞本身，並說明 Salesforce 買到的不只是一個模型。

### 2-1 交易本身

- 約 36 億美元**現金**｜T1（FY27 Q2 10-Q）
- 2026-06-15 簽約，2026-09-10 交割，歷時 87 天，比原訂的 FY27 第四季提早一整季｜T1
- 逾 30,000 家企業客戶、76% 平均解決率｜T1（交割新聞稿）

### 2-2 Fin 的模型路徑：從租到造，它自己走過一遍

- 初代 Fin 用 OpenAI
- 2024-10 換成 Claude 3.5 Sonnet。Des Traynor 原話：「We landed on Claude for one simple reason: it delivers.」｜T1（Intercom Blog）
- 2026-03 發表自研的 Fin Apex 1.0
- **可點出的張力**：Fin 自己就走過「先租 Claude、再自己造」這條路，然後被一家正在租 Claude 的公司買下（**推論**，但每一步都是事實）

### 2-3 Salesforce 買到的不只是模型

- **代理產品**：開箱即用的客服代理
- **SMB 通路**：收購新聞稿寫 Fin 的 fast-to-value「especially well-suited for SMB and some commercial」｜T1
- **成果計價**：每次成果 0.99 美元，每月最低 50 次｜T1（fin.ai/pricing）
- **與 Casey 並存**：Casey 是 Help Agent 的具名包裝，每次解決 2 美元｜T1。官方說法是讓客戶選擇，合併路徑查無
- **定價雙軌只帶一句**：Salesforce 同時把 agent 能力包回席次價（Core 195 美元起）｜T1

### 2-4 替 Koa 段埋伏筆

- Fin 官方頁同時寫「解決率高 2.8%」與圖表的 73.1 對 69.6。後者是 3.5 個百分點，兩種讀法都湊不出 2.8%｜vendor
- 用一句話點出：**廠商自己的 benchmark 連自己都對不齊**。這個模式在 Koa 段會再出現一次

**禁寫提醒：**

- 不要寫「3 萬個 AI 客戶」，官方是「逾 3 萬家企業客戶」（數字類 1）
- 解決率每次引用都要標出處（數字類 3）
- 不要寫 Casey 與 Fin 已合併（事實類 15）

---

## 三、造：Koa（約 900 字）

**這段要做到的事：** 全篇最硬的一段。先自我修正，再指出分工線的移動，最後用 Salesforce 自己的論文對照它自己的新聞稿。

### 3-1 回扣前作：我寫的時候就漏看了

1. **引前作兩句原文**
   - 「七年後，它不做模型了，改成把別人的模型掛上自己的招牌。」
   - 「硬要自研，最好的結果也只是永遠落後半代。」
2. **自我修正**：前作發表前七週，Salesforce 新聞室就在〈How We Cut Inference Spend by Right-Sizing Our Models〉（Jayesh Govindarajan，2026-07-08）公開說明，Agentforce 已在正式環境跑五個自家調校的專用模型，四個已 GA。負責意圖路由的 HyperClassifier 還是 Service 與 Employee Agent 範本的預設。所以「它不做模型了」在我寫的當下就不精確｜T1
3. **說明前作已補更正**：前作文末已於 2026-09-27 加上更正說明，這裡附連結
4. **但要精確**：七月那批模型是在 GPT-OSS-20B 等開源模型上微調，原文自己寫「We weren't training from scratch」，負責路由、防護、評估、重排序這類周邊工作。前作「前沿模型的軍備競賽不是 CRM 公司撐得起」那層判斷仍然成立｜T1
5. **真正的轉折**
   - 七月：「A frontier foundation model still handles the core multi-step reasoning」｜T1（原文拼成 muti-step，引用時加 [sic] 或改寫成中文）
   - 九月：「Koa handles multi-step enterprise reasoning」｜T1（Why We Post-Trained，2026-09-16）
   - 兩句並置後的解讀（**作者觀點**）：Koa 新的地方不在「Salesforce 開始做模型」，而在自家模型第一次被放進核心推理的位置。**十週之內，移動的是分工線**
6. **「造」字的分寸**：Koa 是在 NVIDIA 開放權重的 Nemotron 3 Super（120B）上 post-train，不是從零訓練｜T1。和七月那批是同一種做法，只是位置往上移了一層（**推論**）。「造」的地基也是借來的

**這段的措辭分寸：**

- 不要寫「Salesforce 早就有自家推理模型」。七月那批是分類、防護、評估模型，官方說 Koa 是「first CRM reasoning model」，兩者不衝突
- 不要寫「大部分推理早已交給自家模型」。原文是「a growing share of the stack」
- 七月那篇**沒有點名 Claude**，只寫「a single rented model」。不要替它補上名字
- 不要把 xLAM、xGen-Sales 寫成已上線的正式產品，證據不足

### 3-2 Koa 是什麼

- 官方定位：「Salesforce's first CRM reasoning model for Agentforce, built on NVIDIA Nemotron」｜T1
- 用合成資料訓練，官方明寫「No customer data was used」｜T1
- 與 NVIDIA「co-engineered」，Salesforce 控制權重，推理在自己的 trust boundary 內｜T1
- 在 Agentforce 裡是第四個可選的 model provider，客戶 opt-in｜T1（產品頁）
- 時程：pilot 客戶現在可用，GA 預計 2026 年冬季、美國區域｜T1。NVIDIA blog 寫 pilot 在十月，兩者並陳
- Pilot 客戶：1-800Accountant、Baxter Credit Union、Engine、Formula 1、UChicago Medicine、Xero｜T1

### 3-3 新聞稿與自家論文的反差

| 來源 | 說法 |
|------|------|
| 新聞稿｜T1 | 「matches or exceeds leading model performance on CRM actions with three times fewer errors」，未點名對手 |
| arXiv 2609.15066 摘要｜vendor | 「surpasses a strong proprietary baseline while remaining below the strongest frontier models」，被超越的 baseline 是 GPT-4.1 |

- **CRM Bench 加權平均**｜vendor：GPT-5.5 0.90、Claude Opus 4.8 0.87、**Koa 0.86**、Nemotron 基座 0.84、GPT-4.1 0.81
- 論文裡**沒有**「three times fewer errors」這句
- **可點出的兩件事**
  - Koa 贏過的 GPT-4.1，正好是 Agentforce 現行的預設模型（見一、租）｜兩件事各自是事實
  - Koa 輸給的 Claude Opus 4.8，是 Salesforce 另一個租來的腦｜vendor
  - 連起來讀（**推論**）：Koa 超過了 Agentforce 現在的預設，但還追不上最強的前沿模型。post-train 比基座多出 0.02
- **呼應前作第二句**：「永遠落後半代」這個判斷，被 Salesforce 自己的論文證實了（**作者觀點**）

**這段的措辭分寸：**

- **不要寫新聞稿造假或誤導。** 新聞稿說的是「CRM actions」，論文是加權平均，兩者可能指向不同切片。並陳兩句原文，讓讀者自己判斷
- **寫明比的是哪一版 Claude。** 論文用的是 Opus 4.8，Anthropic 之後已發布更新的模型（例如 2026-09-22 的 Opus 5.5｜T1）。不要讓讀者以為是跟最新的 Claude 比
- 不使用 Tau2Bench 數字

### 3-4 那為什麼還要造

- 官方唯一接近答案的句子：「orchestrating purpose-built models alongside frontier LLMs… Koa handles multi-step enterprise reasoning」｜T1（Why We Post-Trained）
- 這句**沒有點名 Claude**
- trust boundary 與權重控制權是官方強調的重點｜T1
- 「Koa 比 Claude 便宜」只見 TechCrunch 的報導與訪談｜T2。**不可寫成官方說法，也不要寫成 Salesforce 主管說的**

**禁寫提醒：**

- 不要寫 Koa 取代 Claude 或已進入 Atlas（事實類 5）
- 不要把「比 Claude 便宜」寫成官方定價承諾（事實類 7）
- CRM Bench 與 3x 要標自建（術語類 3）

---

## 四、拆解：三條路為什麼可以同時走（約 800 字）｜角度 A

**這段要做到的事：** 把開場的荒謬感拆成自洽的架構。**這一段幾乎全是推論，必須讓讀者看得出來。**

### 4-1 一張堆疊圖

建議做成表格或示意圖。每一格標明官方確認到哪裡：

| 層 | 資產 | 取得方式 | 看起來負責什麼（推論） | 官方說到哪裡 |
|----|------|---------|---------------------|-------------|
| 前沿通用推理 | Claude | 租（對象是自己持股的公司） | 對話介面、協作工具、銷售技能 | Slack、Vibes、Coworker 預設；Agentforce 可選（Haiku 4.5） |
| Agentforce 預設推理 | GPT-4.1 | 租 | Agentforce agent 的預設大腦 | Help：Salesforce Default |
| 客服垂直 | Fin Apex＋Fin 代理 | 買 | 客服解決、按成果計價 | 保留 Fin model suite；Fin Apex 掛在 Fin agent 下 |
| CRM 平台推理 | Koa | 造（在開放權重上 post-train） | 多步驟 CRM 動作 | 第四個可選 provider；「alongside frontier LLMs」 |
| 周邊專用模型 | HyperClassifier、TextEval 等 | 造（在 GPT-OSS-20B 上微調） | 路由、防護、評估、重排序 | 七月 Right-Sizing 原文；多數已 GA |

表格下方一句話（**推論**）：「造」不是從 Koa 才開始，Koa 是第一次造到核心推理這一層。

### 4-2 自洽的邏輯（全段標作者觀點）

- **租**：前沿模型的軍備競賽，一家 CRM 公司的資本結構撐不起（呼應前作）。而且租的不只一家
- **買**：客服是少數能按成果收費的場景，「解決率」這個指標要握在自己手上。客服也是 Benioff 證明 AI 回報的櫥窗，Salesforce 自家客服團隊從約 9,000 人減到約 5,000 人｜前作備忘，**待讀原文**
- **造**：高頻的 CRM 動作如果長期全靠前沿模型的 token，控制權與成本都在別人手上
- **合起來**：不把腦押在同一家供應商身上
- **第三方佐證**
  - Everest Group 說 Fin Apex 能「降低對前沿實驗室 API 的依賴」｜T3。**這句寫於 2026-06，只談 Fin Apex，不可套用到 Koa**（事實類 10）
  - CNBC（2026-09-18）報導，Dreamforce 上的客戶與合作夥伴表示「older and cheaper AI models are plenty powerful for everyday sales and customer service work」｜T2，受訪者說法
  - Mike Spencer 說多數工作用上一兩代的模型就夠（見一、租第 6 點）

**這段的措辭分寸：**

- CNBC 另有一句「Salesforce isn't relying on … Claude Fable 5.1 or … GPT-6 Astra, according to a support page」。支援頁上並沒有提到 Fable 或 Astra，那是記者根據模型清單做的推論。要引用就寫「CNBC 依據 Salesforce 支援頁指出」

### 4-3 真正值得注意的是沉默

這是本段的收束，也是全文最重要的觀察：

- Claude 與 Fin Apex 的分工：**查無**
- Koa 與 Claude 的分工：**查無**
- Koa 與 Fin Apex 的分工：**查無**
- Koa 是否進入 Atlas：**查無**
- Anthropic 對 Koa 的回應：**查無**（anthropic.com/news 截至 2026-09-23 的標題，對 Salesforce、Koa、Claudeforce、Dreamforce 的提及為零｜T1）
- **點出**：Salesforce 還沒有告訴客戶，哪一個腦負責哪一件事
- **兩種解讀並陳**（**推論**）：刻意保留彈性，或者還沒想清楚

**這段的措辭分寸：**

- Anthropic 在 claude.com 部落格發過〈Salesforce in Claude〉（2026-09-15），那是 Claudeforce 的產品發表文。所以只能寫「Anthropic 對 Koa 沒有回應」，**不能寫「Anthropic 對 Salesforce 隻字未提」**
- 事實類 4、5、6、8、9、10 全部適用於這一段

---

## 結尾：回到前作的問題（約 500 字）

**這段要做到的事：** 回答前作留下的問題，並給讀者可追蹤的觀察點。

1. **前作的收尾問題**：Salesforce 用 27 年招牌換來的，是 agent 時代的入場券，還是一份讓別人主導定價的租約？
2. **本篇的回答**（**作者觀點**）
   - 二十天內的「買」和「造」，看起來像在替那份租約找退路
   - 但 Koa 的論文顯示，自己造的腦還追不上租來最強的那個
   - 所以短期內，那份租約退不掉
   - 更新前作「正確但危險」的判斷
3. **接下來的觀察座標**（每一項都是可查證的時間點）
   - Koa 正式上線（官方：2026 年冬季，美國區域）與正式定價（目前官方查無價格，也沒有證實以 Flex Credits 計價）
   - Koa 會不會進入 Atlas Reasoning Engine，或取代 GPT-4.1 成為 Agentforce 的預設
   - Claudeforce 的客服技能上線時，Salesforce 怎麼說明它與 Fin 的分工
   - Fin Apex 與 Koa 有沒有整併的訊號
   - FY27 Q3 財報的購買價格分攤
4. **收尾句**：前作用「我會繼續看下去」收尾。本篇換一句，避免系列文重複

---

## 可另外衍生的短文（選做，未排程）

| 候選 | 形式 | 理由 |
|------|------|------|
| Koa 新聞稿與自家論文的反差 | social post | 自成一個完整的小故事，有兩句原文可以直接對照 |
| 定價雙軌（角度 B） | 短觀點文 | 本篇只帶一句，素材足以另寫：席次捆綁與成果計價並存 |

## 這篇不用的素材

以下在 Research Memo 裡都有，但與本篇主軸無關，刻意不放：

- **競爭格局**：Zendesk、Sierra、Decagon 的處境與估值倍數。這是研究初期的兩大主軸之一，本篇選擇聚焦模型策略，所以捨棄
- 監管細節：德國與澳洲的申報紀錄
- Dreamforce 的其他數字：Hunter pipeline、Fulton Bank、兩個 30,000
- 產品改名：Sales Cloud 復名、Headless 360 改名 AIforce
- xLAM、xGen-Sales：是否上過正式產品證據不足
- Listen Labs 收購傳聞
- 台灣市場

---

## 決策紀錄

以下是本大綱的決策與核實歷程，**動筆時不用看**，留作追溯。

### 已決定

| 日期 | 決定 |
|------|------|
| 2026-09-26 | 標題定為〈二十天，三個選擇：Salesforce 租了 Claude、買了 Fin，又自己造了 Koa〉，結構為角度 C 開場、角度 A 拆解 |
| 2026-09-26 | 寫成單篇，不拆篇 |
| 2026-09-26 | 標題維持「造」字，由 3-1 說明 Koa 是 post-train、不是從零訓練 |
| 2026-09-26 | 不使用 Tau2Bench 數字（只見搜尋摘要，未經一手核實） |
| 2026-09-27 | 3-1 框架從「三週後被推翻」改為「寫的時候就漏看了」，依據七月 Right-Sizing 原文 |
| 2026-09-27 | 一、租改寫為「Claude，但不只 Claude」，依據 Agentforce 預設為 GPT-4.1 |
| 2026-09-27 | 大綱整理為可動筆版，核實歷程集中到本節 |
| 2026-09-27 | 整理時對照核實紀錄，發現三條第一輪的事實從未讀過原文，原本卻標成 T1 或 T2。改標「待讀原文」，列入發佈前待核 |

### 已發布前作的修改（皆經使用者同意）

檔案：`docs/articles/2026-08-27-claudeforce-salesforce-anthropic-analysis.md`

| 日期 | 修改 | 依據 |
|------|------|------|
| 2026-09-26 | 新增「術語註記」，說明 Headless 360 名稱異動 | 第二輪核實 |
| 2026-09-27 | 修訂術語註記。初版寫「Salesforce 尚未發布正式的改名說明」不正確，改以 Salesforce Help 官方文件為主要來源，並在註記中註明初版錯誤 | 第四輪 R2 |
| 2026-09-27 | 新增「更正」，說明「七年後，它不做模型了」不精確，並補充 2025 年仍開源 xLAM-2 權重；內文原句保留並加註 | 第四輪 R1 |

### 核實歷程

| 輪次 | 日期 | 範圍 | 對本大綱的主要影響 |
|------|------|------|-------------------|
| 第一至三輪 | 2026-09-11 至 09-18 | Fin 收購、Dreamforce 會後、Koa | 大綱的事實基礎，詳見 Research Memo |
| 時效檢查 | 2026-09-26 | 9/18 至 9/26 新進展（subagent，多為搜尋摘要） | P0 三項查無新進展；發現七月 Right-Sizing 線索；3-3 補上 Claude 版本、4-3 修正 Anthropic 措辭 |
| 第四輪 | 2026-09-27 | R1 至 R7 一手核實 | 見下表 |

### 第四輪結果摘要

| 項目 | 結論 | 影響 |
|------|------|------|
| R1 七月 Right-Sizing | 屬實，範圍限定：五個自家微調模型，四個 GA；核心推理仍給前沿模型；未點名 Claude | 3-1 改框架；4-1 加一列；前作新增更正 |
| R1 xLAM、xGen-Sales | 是否上過正式產品證據不足 | 不寫進正文 |
| R2 Headless 360 改名 | Salesforce Help 官方文件寫明 2026-09-04 起改名 AIforce，沒有新聞稿 | 前作註記修訂 |
| R3 Koa 以 Flex Credits 計價 | 未獲官方證實 | 結尾維持「定價查無」 |
| R4 Computer Weekly「比 Claude 便宜」 | 原文不存在，是搜尋摘要生成的 | 3-4 刪除該線索 |
| R5 Agentforce 預設模型 | GPT-4.1（新版）／GPT-4o（舊版）；Claude 選項為 Haiku 4.5 | 一、租改寫；3-3 加一層；4-1 加一列；新增紅線第 4 條 |
| R6 The Register 成本報導 | 來源為 Deutsche Bank 大會的 Mike Spencer 原話；法說會未提 token | 一、租第 6 點 |
| R7 fin.ai/pricing | 仍為每次成果 0.99 美元 | 無 |

每一項的原文網址與讀取日期，見 Research Memo 文末「一手來源核實紀錄」。

### 核實過程中學到的事

搜尋摘要兩度憑空生出不存在的內容：一次是「Dreamforce 於 9/22 發表 Koa」，一次是 Computer Weekly 那句「比 Claude 便宜」。兩者都在一手核實時被攔下，沒有寫進任何文件。之後凡是要進正文的引語，都要讀過原文。
