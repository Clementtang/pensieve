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

> 段落層級大綱。每段標明要用的數據、來源層級，以及對應的備忘禁寫條目。所有數據的原始出處與核實紀錄見 [Research Memo](./2026-09-10-memo-salesforce-fin-acquisition-research.md)。

## 總覽

| 項目 | 內容 |
|------|------|
| **標題** | 二十天，三個選擇：Salesforce 租了 Claude、買了 Fin，又自己造了 Koa |
| **結構** | 角度 C 開場（荒謬感）→ 租、買、造三段 → 角度 A 拆解（為什麼自洽）→ 回扣前作 |
| **預估字數** | 正文約 4,000 至 4,500 字 |
| **主視角** | 第一人稱，比照前作語氣 |
| **系列定位** | 前作〈Salesforce 把 27 年的招牌借給 Anthropic，然後叫你不用再打開 Salesforce〉的續篇。前作講「租」，本篇補上「買」與「造」 |
| **資料截止** | 2026-09-18（Research Memo 第三輪核實）；2026-09-26 時效檢查；**2026-09-27 第四輪一手核實**（R1 至 R7，結果見 3-1 與文末決策紀錄） |

### 來源層級標記

- **T1**：Salesforce、NVIDIA、Fin 官方新聞稿、官方頁面、SEC 文件
- **T2**：一線媒體原文（Bloomberg、TechCrunch 等）
- **T3**：產業媒體與分析機構
- **vendor**：廠商自建的 benchmark 或自發布的論文，引用時必須標明「自家數字」
- **推論**：作者觀點，行文時必須讓讀者看得出這是判斷而非事實

### 核心論點

Salesforce 在二十天內，對「AI 的腦從哪裡來」給了三個不同的答案。三者看起來互相矛盾，放在同一張堆疊圖上卻各有位置（**推論**）。但三者之間怎麼分工，Salesforce 到現在一句都沒有公開說明（**已查證的空白**）。

### 動筆前的三條紅線

1. **租、買、造是作者的分析框架，不是 Salesforce 的官方說法。** 官方從未用 rent、buy、build 描述自己（禁寫・事實類 6）
2. **Claude、Fin Apex、Koa 三者之間的官方分工全部查無。** 任何「誰負責什麼」都只能寫成推論（禁寫・事實類 4、5、8）
3. **兩個 benchmark 都是廠商自建。** Fin Apex 的 73.1% 與 Koa 的 CRM Bench 都不是中立評測（禁寫・術語類 2、3）

---

## 開場：二十天的時間軸（約 500 字）｜角度 C

**這段要做到的事：** 讓讀者覺得「這家公司是不是瘋了」。

**段落節奏：**

1. **用三個日期開場**，不加評論，讓時間軸自己說話
   - 2026-08-26：Claudeforce 發布，Claude 成為 Salesforce 多項產品的預設模型｜T1
   - 2026-09-10：Fin 交割，約 36 億美元現金｜T1（新聞稿＋FY27 Q2 10-Q）
   - 2026-09-15：Dreamforce 同日發表 Koa，Salesforce 第一個 CRM 推理模型｜T1
2. **疊上諷刺三角**，一句一個事實
   - Salesforce 持有 Anthropic 股權，2026 年 6 月估值約 50 億美元｜T2（Bloomberg）
   - Anthropic 本身是 Fin 的客戶：每月逾 56 萬次解決、79% 解決率｜T1（fin.ai 案例頁）
   - Fin 自家 benchmark 說 Fin Apex 贏過 Claude：73.1 對 Opus 4.5 的 71.1、Sonnet 4.6 的 69.6｜vendor
   - 然後 Salesforce 又自己做了一個
3. **拋出全文要回答的問題**：一家公司同時向三個方向要 AI 的腦，是沒想清楚，還是想得很清楚？

**禁寫提醒：**

- Anthropic 案例不要用舊數字 58% 與 1,700 小時（數字類 4）
- Fin Apex 的數字要標自家 benchmark（術語類 2）

---

## 一、租：Claude（約 500 字）

**這段要做到的事：** 快速交代，**不重複前作**。前作已經把 Claudeforce 講透了。

**段落節奏：**

1. **一段帶過前作**，附前作連結，讓想深入的讀者回頭看
2. **前作發表後的新進度**
   - Claudeforce 已開放所有客戶 beta，含 37 個銷售技能｜T1（AIforce 稿，2026-09-15）
   - 客服、行銷、商務技能寫的是「in the near future」｜T1
3. **Claude 目前的位置**：多項產品的預設模型，也是 Atlas Reasoning Engine 可選的推理模型之一｜T1（前作備忘已核）
   - **Agentforce 的預設不是 Claude（2026-09-27 核實）**：Salesforce Help〈Select Agentforce Model Option〉寫「Salesforce Default」是官方建議的選項，新版 Agentforce Builder 建立的 agent 用 GPT-4.1，舊版 builder 用 GPT-4o；選「AWS-Hosted」才是 Claude，版本為 Claude Haiku 4.5 on Amazon Bedrock；另有 Gemini 3.5 Flash 選項｜T1（Help 頁無發布日期，只代表讀取當下狀態）
   - 寫作時要分清楚：Claude 是 Slack、Agentforce Vibes、Coworker 等產品的預設；在 Agentforce 推理引擎裡是可選項，而且可選的是 Haiku 4.5，不是 Opus
4. **埋伏筆**：客服技能還沒上線，而客服正好是 Fin 的地盤（**推論**）
5. **寫作細節**：說是「租」，但租的對象是自己持股約 50 億美元的公司。這個曖昧可以點一句
6. **成本面（選用，2026-09-27 核實）**：Salesforce 副財務長 Mike Spencer 在 2026-08-27 Deutsche Bank 科技大會說：「roughly about six months ago, we unleashed Claude in our R&D cycle. It is part of the reason we did not raise margin guidance on the year is because we are covering some of the token spend」｜受訪者原話，引文取逐字稿版本（StockAnalysis 逐字稿｜T3；The Register 2026-09-03 引述措辭略有縮寫｜T2）
   - 同場他也說要進入「refinement mode」、「prescription model choice for task at hand」，多數工作用「second or third generation model」就夠，內部同時用 OpenAI、Cursor、Claude，並開始試 Grok
   - 對照 T1：FY27 Q2 財報稿與法說會原文只寫 GAAP 營益率指引更新為約 20.1%（Q1 時為 20.6%）、non-GAAP 維持約 34.3%，**法說會逐字稿沒有提到 token**。把營益率連到 Claude 的是 Spencer 在投資人大會的說法，不是財報揭露
   - **措辭注意**：這是 Salesforce 內部研發使用 Claude 的 token 成本，不是 Claudeforce 產品的成本。The Register 標題的「addiction」是媒體語氣，不要當成事實引用

**禁寫提醒：**

- 前作用的「Headless 360」一詞已出現三種說法，本篇盡量避開。若非提不可，寫「當時官方稱 Headless 360」（術語類 1）

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
- **成果計價**：每次成果 0.99 美元｜T1（fin.ai/pricing，2026-09-27 再次確認仍為 0.99 美元，每月最低 50 次）
- **與 Casey 並存**：Casey 是 Help Agent 的具名包裝，每次解決 2 美元｜T1。官方說法是讓客戶選擇，合併路徑查無
- **定價雙軌只帶一句**：Salesforce 同時把 agent 能力包回席次價（Core 195 美元起）｜T1。細節留給另一篇，見拆篇建議

### 2-4 替 Koa 段埋伏筆

- Fin 官方頁同時寫「解決率高 2.8%」與圖表的 73.1 對 69.6。後者是 3.5 個百分點，兩種讀法都湊不出 2.8%｜vendor
- 用一句話點出：**廠商自己的 benchmark 連自己都對不齊**。這個模式在 Koa 段會再出現一次

**禁寫提醒：**

- 不要寫「3 萬個 AI 客戶」，官方是「逾 3 萬家企業客戶」（數字類 1）
- 解決率每次引用都要標出處（數字類 3）
- 不要寫 Casey 與 Fin 已合併（事實類 15）

---

## 三、造：Koa（約 900 字）

**這段要做到的事：** 全篇最硬的一段。先自我修正，再用 Salesforce 自己的論文拆它自己的新聞稿。

### 3-1 回扣前作：三週前我寫錯了一半

- 引前作兩句原文：
  - 「七年後，它不做模型了，改成把別人的模型掛上自己的招牌。」
  - 「硬要自研，最好的結果也只是永遠落後半代。」
- 坦白說第一句三週就被推翻
- **但要精確**：Koa 是在 NVIDIA 開放權重的 Nemotron 3 Super（120B）上 post-train，不是從零訓練｜T1（Why We Post-Trained，2026-09-16）
- 所以前作「不參加前沿模型軍備競賽」那層判斷其實還站得住。「造」的地基也是借來的（**推論**）

> **動筆前阻擋項（2026-09-26 時效檢查發現；2026-09-27 已核實解除，結果見下方）：** 搜尋摘要顯示 Salesforce 新聞室在 **2026-07-08** 發過〈How We Cut Inference Spend by Right-Sizing Our Models〉（Jayesh Govindarajan），稱 Agentforce 已把大部分推理交給五個自家小型專用模型，只保留前沿模型處理多步驟推理。**若屬實，前作 8/27 寫「它不做模型了」時就已經不精確**，本段的框架要從「三週後被推翻」改成「寫的時候就漏看了」。另外，Koa 的官方定位「handles multi-step enterprise reasoning」剛好是七月那篇保留給前沿模型的工作，這一點若屬實也很值得寫。**此條僅搜尋摘要，須先一手核實原文，核實前本段不可定稿。**

#### R1 核實結果（2026-09-27 第四輪，已讀原文）

**結論 A：屬實，但範圍要限定。** Salesforce 在前作發表（2026-08-27）之前，已經在 Agentforce 生產環境跑自家調校的專用模型。這些模型是在開源模型上微調、負責周邊工作；核心多步驟推理仍交給前沿模型。

- **原文存在，標題、作者、日期皆符**：〈How We Cut Inference Spend by Right-Sizing Our Models〉，Jayesh Govindarajan（EVP, Software Engineering, Salesforce AI），2026-07-08（頁面 schema datePublished 2026-07-08T14:50:58Z，dateModified 僅晚 31 秒）｜T1｜[原文](https://www.salesforce.com/news/stories/cutting-inference-spend-by-right-sizing-models/)
- **五個模型與狀態（原文表格）**：HyperClassifier（GA Spring ’26）、Prompt injection defense（Rolling out，GA Summer ’26）、Toxicity model（GA）、TextEval（GA）、TextRerank（GA）。**五個都不是 xLAM 或 xGen**
- **生產環境的逐字證據**：「The HyperClassifier became generally available in Spring ’26 and is now the default intent detection and routing model for Agentforce Service and Employee Agent templates.」
- **不是從零訓練**：「we broke out different tasks and tuned specific open-source models to accomplish them」、「We weren’t training from scratch.」HyperClassifier 與 TextEval 都是在 GPT-OSS-20B 上微調
- **保留給前沿模型的工作**：「A frontier foundation model still handles the core muti-step reasoning」（原文拼字即為 muti-step，引用時可加 [sic] 或改寫成中文）；結尾段再寫一次「today, a frontier model handles the core reasoning in our stack」
- **沒有點名 Claude**：全文 Claude、Anthropic 出現次數皆為 0，只寫「Eighteen months ago, Agentforce also ran entirely on a single rented model」
- **搜尋摘要有誤差**：原文沒有「大部分推理」，寫的是「these precision models run a growing share of the stack」。**不可寫成「大部分推理已交給自家模型」**
- **其他 T1 佐證**：Salesforce Engineering〈Solving Real-Time AI Classification for Agentforce〉（2025-11-20）描述 HyperClassifier 已上線生產；Help〈Salesforce-Owned Models〉寫「Salesforce AI Research creates, trains, and fine tunes models to address specific Salesforce use cases.」，列出 CodeGen、HyperClassifier、TextEval；Help〈Select Agentforce Model Option〉寫「For any option, specific tasks, such as subagent classification or citations, may use Salesforce-owned models.」（兩個 Help 頁皆無發布日期，只證明 2026-09-27 讀取當下狀態，發表前狀態以七月原文為準）
- **xLAM 與 xGen-Sales 不建議當生產佐證**：2024-09-06 官方稿寫 xLAM「A significantly more advanced, proprietary version is powering Agentforce」、xGen-Sales「will be generally available soon」；但 2024-10-21 xGen-Sales 官方部落格寫「Today xGen-Sales is only available to a subset of pilot customers」，之後的正式上線**查無可靠來源**。七月原文又說 18 個月前 Agentforce 完全跑在單一租來的模型上，與 2024 年的 xLAM 說法有張力。兩者都不要寫進正文
- **順帶一提**：Salesforce AI Research 在 2025-04 仍以 research release 開源 xLAM-2 系列權重（arXiv 2504.03601，2025-04-04 提交；Hugging Face 模型卡）。前作把「開源權重給人玩」寫成 2019 年的事，其實 2025 年還在做

#### 3-1 改寫建議（供 writer 使用，取代原本的「三週後被推翻」框架）

**建議小標：** 回扣前作：我寫的時候就漏看了

**段落節奏：**

1. 引前作兩句原文（同上）
2. **自我修正**：前作發表前七週，Salesforce 新聞室就公開說 Agentforce 已經在跑自家調校的專用模型，負責意圖路由的 HyperClassifier 在 Spring ’26 正式上線，還是 Service 與 Employee Agent 範本的預設。所以「它不做模型了」在我寫的當下就不精確，不是三週後才被推翻｜T1
3. **但要精確**：七月那批模型都是在 GPT-OSS-20B 等開源模型上微調，原文自己寫「We weren’t training from scratch」，負責的是路由、防護、評估、重排序這類周邊工作。前作「前沿模型的軍備競賽不是 CRM 公司撐得起」那層判斷仍然站得住｜T1
4. **真正的轉折（推論）**：Koa 新的地方不在「Salesforce 開始做模型」，而在自家模型第一次被放進核心多步驟推理的位置。七月寫前沿模型「still handles the core muti-step reasoning」；九月的 Why We Post-Trained 寫「Koa handles multi-step enterprise reasoning」。十週內移動的是分工線｜兩句皆 T1，並置的解讀是**作者觀點**
5. Koa 仍是在 Nemotron 3 Super 上 post-train，和七月那批模型是同一種「在開源權重上調校」的做法，只是位置往上移了一層（**推論**）。這也讓標題的「造」字維持原判斷：造的是調校，不是從零訓練
6. 接 3-2

**這段的措辭分寸：**

- 不要寫「Salesforce 早就有自家推理模型」。七月那批是分類、防護、評估模型，官方說 Koa 是「first CRM reasoning model」，兩者不衝突
- 不要寫「大部分推理早已交給自家模型」（搜尋摘要誤差，見上）
- 不要寫七月那篇點名 Claude，也不要把 xLAM、xGen-Sales 寫進生產環境的事實
- 前作是否公開更正由使用者決定，更正草稿見文末決策紀錄

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
- **標明比較的是哪一版 Claude**：論文的對照組是 Claude Opus 4.8。Anthropic 在論文之後已發布更新的模型（例如 2026-09-22 的 Opus 5.5｜T1，anthropic.com 原文）。寫「Koa 落在 Claude 之後」時要寫明是論文所用的 Opus 4.8，避免讀者以為是跟最新的 Claude 比
- **可點出的事實**：在 Salesforce 自己設計的 CRM 基準上，Koa 仍落在它租來的 Claude 之後。post-train 比基座多出 0.02
- **可加的一層（2026-09-27 核實）**：論文裡被 Koa 超越的「strong proprietary baseline」GPT-4.1，正好是 Help〈Select Agentforce Model Option〉寫的「Salesforce Default」在新版 Agentforce Builder 使用的模型｜T1。所以 Koa 贏過的是 Agentforce 現行預設，輸給的是最強的前沿模型。兩件事分別是事實，連起來讀是**推論**；Help 頁無發布日期，引用時寫明讀取日
- **呼應前作第二句**：「永遠落後半代」這個判斷，被 Salesforce 自己的論文證實了（**作者觀點**）

**這段的措辭分寸：**

- **不要寫新聞稿造假或誤導。** 新聞稿說的是「CRM actions」，論文是加權平均，兩者可能指向不同切片。並陳兩句原文，讓讀者自己判斷
- **不使用 Tau2Bench 數字**（2026-09-26 決定）。該組數字只見搜尋摘要、未經一手核實；CRM Bench 的 0.86 對 0.84 已足以說明 post-train 增益有限

### 3-4 那為什麼還要造

- 官方唯一接近答案的句子：「orchestrating purpose-built models alongside frontier LLMs… Koa handles multi-step enterprise reasoning」｜T1（Why We Post-Trained）
- 注意這句**沒有點名 Claude**
- trust boundary 與權重控制權是官方強調的重點｜T1
- 「Koa 比 Claude 便宜」只見 TechCrunch 報導與訪談｜T2。**不可寫成官方說法**
- ~~待核線索：Computer Weekly 的「cheaper than Claude or ChatGPT」~~ **2026-09-27 讀原文：這句不存在。** Computer Weekly〈Salesforce wants ASEAN customers to stop thinking in tokens〉（Aaron Tan，頁面標示 2026-09-17，schema 為 2026-09-16 21:02 UTC｜T3）全文沒有 Koa 比 Claude 或 ChatGPT 便宜的句子，同網站 2026-09-15 的 AIforce／Koa 報導也沒有。**不可寫「另有 Salesforce 區域主管受訪這樣說」**
  - 原文可用的只有：副標是記者的話「tools that hand simple tasks to cheaper models」；Gavin Barfield 的直接引語「using a sledgehammer to cut a nut」是講客戶拿大型 LLM 做案件摘要，接著是記者轉述「when a smaller or open source model could do the job very well」；談 Koa 的直接引語只有「It’s probably not very good at looking up a cheesecake recipe, but that’s not what customers want to do」
  - 「Koa 比 Claude 便宜」目前仍只有 TechCrunch 一個媒體來源（見上）

**禁寫提醒：**

- 不要寫 Koa 取代 Claude 或已進入 Atlas（事實類 5）
- 不要把「比 Claude 便宜」寫成官方定價承諾（事實類 7）
- CRM Bench 與 3x 要標自建（術語類 3）

---

## 四、拆解：三條路為什麼可以同時走（約 800 字）｜角度 A

**這段要做到的事：** 把開場的荒謬感拆成自洽的架構。**這一段幾乎全是推論，必須讓讀者看得出來。**

### 4-1 一張堆疊圖

建議做成表格或示意圖，每一格標明官方確認到哪裡：

| 層 | 資產 | 取得方式 | 看起來負責什麼（推論） | 官方說到哪裡 |
|----|------|---------|---------------------|-------------|
| 前沿通用推理 | Claude | 租（對象是自己持股的公司） | 通用推理、對話介面、銷售技能 | 多項產品預設模型；Atlas 可選模型之一 |
| 客服垂直 | Fin Apex＋Fin 代理 | 買 | 客服解決、按成果計價 | 保留 Fin model suite；Fin Apex 掛在 Fin agent 下 |
| CRM 平台推理 | Koa | 造（在開放權重上 post-train） | 多步驟 CRM 動作 | 第四個可選 provider；「alongside frontier LLMs」 |

> **2026-09-27 補充（R1）：** 堆疊圖其實還有一層官方已確認、比 Koa 更早的「造」：HyperClassifier、TextEval 等在 GPT-OSS-20B 上微調的周邊專用模型，負責路由、防護、評估、重排序，多數已 GA（七月 Right-Sizing 原文｜T1）。建議在表格下加一行註記或另加一列，讓讀者看到「造」不是從 Koa 才開始，Koa 是第一次造到核心推理這一層（後半句為**推論**）

### 4-2 自洽的邏輯（全段標作者觀點）

- **租**：前沿模型的軍備競賽，一家 CRM 公司的資本結構撐不起（呼應前作）
- **買**：客服是少數能按成果收費的場景，「解決率」這個指標要握在自己手上。客服也是 Benioff 證明 AI 回報的櫥窗，Salesforce 自家客服團隊從約 9,000 人減到約 5,000 人｜前作備忘
- **造**：高頻的 CRM 動作如果長期全靠前沿模型的 token，控制權與成本都在別人手上
- **合起來**：不把腦押在同一家供應商身上
- Everest Group 說 Fin Apex 能「降低對前沿實驗室 API 的依賴」｜T3。**這句寫於 2026-06，只談 Fin Apex，不可套用到 Koa**（事實類 10）
- **CNBC 已讀原文（2026-09-27）**：〈AI safety debate meets reality at Dreamforce as business leaders say last year's models are enough〉（Isabel O'Brien、Jordan Novet，2026-09-18｜T2）。記者寫「Salesforce customers and partners at the conference told CNBC that older and cheaper AI models are plenty powerful for everyday sales and customer service work.」又寫「For bots built with Agentforce, Salesforce isn't relying on Anthropic's cutting-edge Claude Fable 5.1 or OpenAI's new GPT-6 Astra, according to a support page on its website.」
  - 引用的支援頁是 Help〈Select Agentforce Model Option〉（ai.agent_setup_select_model_provider）。頁面沒有提到 Fable 或 Astra，寫的是 Salesforce Default 用 GPT-4.1（新版 builder）或 GPT-4o（舊版），AWS-Hosted 用 Claude Haiku 4.5，另有 Gemini 3.5 Flash。CNBC 那句是記者根據清單做的推論，引用時要寫成「CNBC 依據 Salesforce 支援頁指出」
  - 可佐證「造」的邏輯：客戶與夥伴受訪說舊模型夠用（受訪者說法），加上 Salesforce 副財務長 Mike Spencer 說多數工作用「second or third generation model」就夠（見一、租第 6 點）

### 4-3 真正值得注意的是沉默

這是本段的收束，也是全文最重要的觀察：

- Claude 與 Fin Apex 的分工：**查無**
- Koa 與 Claude 的分工：**查無**
- Koa 與 Fin Apex 的分工：**查無**
- Koa 是否進入 Atlas：**查無**
- Anthropic 對 Koa 的回應：**查無**（anthropic.com/news 截至 2026-09-23 的標題中，對 Salesforce、Koa、Claudeforce、Dreamforce 的提及為零｜原文）
  - **措辭注意**：Anthropic 另在 claude.com 部落格發過〈Salesforce in Claude〉（2026-09-15），那是 Claudeforce 的產品發表文，不是對 Koa 的回應。所以只能寫「Anthropic 對 Koa 沒有回應」，**不能寫「Anthropic 對 Salesforce 隻字未提」**
- **點出**：Salesforce 還沒有告訴客戶，哪一個腦負責哪一件事
- **兩種解讀並陳**（**推論**）：刻意保留彈性，或者還沒想清楚

**禁寫提醒：**

- 事實類 4、5、6、8、9、10 全部適用於這一段

---

## 結尾：回到前作的問題（約 500 字）

**這段要做到的事：** 回答前作留下的問題，並給讀者可追蹤的觀察點。

1. **前作的收尾問題**：Salesforce 用 27 年招牌換來的，是 agent 時代的入場券，還是一份讓別人主導定價的租約？
2. **本篇的回答**（**作者觀點**）
   - 二十天內的「買」和「造」，看起來像在替那份租約找退路
   - 但 Koa 的論文顯示，自己造的腦還追不上租來的腦
   - 所以短期內，那份租約退不掉
   - 更新前作「正確但危險」的判斷
3. **接下來的觀察座標**（每一項都是可查證的時間點）
   - Koa 正式上線（官方：2026 年冬季，美國區域）與正式定價（目前定價頁、2026-08-31 版 Flex Credits Rate Card、Koa 產品頁 FAQ 皆查無；「以 Flex Credits 計價」僅見合作夥伴說法，未獲官方證實）
   - Koa 會不會進入 Atlas Reasoning Engine
   - Claudeforce 的客服技能上線時，Salesforce 怎麼說明它與 Fin 的分工
   - Fin Apex 與 Koa 有沒有整併的訊號
   - FY27 Q3 財報的購買價格分攤
4. **收尾句**：前作用「我會繼續看下去」收尾。本篇建議換一句，避免系列文重複

---

## 篇幅：單篇（2026-09-26 定案）

理由：這篇的 C 與 A 是交織在一起的。開場每一個荒謬的點，都會在第四段被拆解。拆成兩篇的話，C 只剩幾個諷刺點撐不起一篇，A 少了開場會很冷。

**可另外衍生的短文（選做，未排程）：**

| 候選 | 形式 | 理由 |
|------|------|------|
| Koa 新聞稿與自家論文的反差 | social post | 自成一個完整的小故事，有兩句原文可以直接對照 |
| 定價雙軌（角度 B） | 短觀點文 | 本篇只帶一句，素材足以另寫：席次捆綁與成果計價並存 |

---

## 這篇不用的素材

以下在 Research Memo 裡都有，但與本篇主軸無關，刻意不放：

- **競爭格局**：Zendesk、Sierra、Decagon 的處境與估值倍數。這是研究初期的兩大主軸之一，本篇選擇聚焦模型策略，所以捨棄
- 監管細節：德國與澳洲的申報紀錄
- Dreamforce 的其他數字：Hunter pipeline、Fulton Bank、兩個 30,000
- 產品改名與 Headless 360 的三種說法
- Listen Labs 收購傳聞
- 台灣市場

---

## 決策紀錄

### 已決定（2026-09-26）

1. **單篇**，不拆篇
2. **前作補上 Headless 360 術語註記**：已完成。`docs/articles/2026-08-27-claudeforce-salesforce-anthropic-analysis.md` 文末新增「術語註記」，並陳三種說法
3. **不使用 Tau2Bench 數字**
4. **標題維持「造」字**：Koa 是 post-train、不是從零訓練，由 3-1 在內文說清楚。這個落差本身也是可寫的素材

### 時效檢查結果（2026-09-26，範圍 9/18 至 9/26）

由 subagent 執行。除 anthropic.com 與 claude.com 可讀原文外，其餘皆為搜尋摘要。

| 項目 | 結論 | 對大綱的影響 |
|------|------|-------------|
| Koa 定價、GA、與 Claude 分工、第三方評測 | 查無新進展 | 無。另有 Flex Credits 計價線索待核（見下） |
| Claudeforce 客服技能 | 查無新進展。claude.com〈Salesforce in Claude〉原文未提時程，也未提 Fin 或 Koa | 無 |
| Fin 與 Casey 整併、改名、調價 | 查無新進展 | 無 |
| Headless 360 官方說明 | 查無新進展。第三方文章明寫 Salesforce 未發布正式改名公告 | 前作註記維持並陳 |
| Anthropic 對 Koa 回應 | 查無，newsroom 截至 9/23 原文確認 | 4-3 已更新日期與措辭 |
| Listen Labs | 查無新進展，仍未簽約 | 無（本篇不用） |

### 動筆前阻擋項

1. ~~**3-1 的七月文章**：須先一手核實 2026-07-08〈Right-Sizing〉原文~~ **已解除（2026-09-27）**：原文存在，結論 A（屬實，範圍限定）。3-1 已附核實結果與改寫建議，前作更正草稿見下方「前作處理建議」

### 待一手核實的線索（2026-09-27 第四輪已逐項核實）

1. **Koa 是否以 Flex Credits 計價：未獲官方證實。** [Koa 產品頁](https://www.salesforce.com/agentforce/koa/)正文與 FAQ 沒有 Flex Credits 或任何價格，頁面只在通用區塊放了「Flex Credit Calculator」連結；[Rate Cards 頁](https://www.salesforce.com/agentforce/rates/)目前連到的最新版是 [2026-08-31 Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf)，Koa 與 Nemotron 出現次數為 0；Help〈Flex Credits Billable Usage Types〉也沒有 Koa。結尾觀察座標維持「定價查無」，備忘 K4 結論不變（已補註第四輪查核）
2. **Computer Weekly 的「cheaper than Claude」：原文不存在。** 見 3-4
3. **CNBC 9/18 引用的支援頁：已讀。** Help〈Select Agentforce Model Option〉，Agentforce 預設是 GPT-4.1／GPT-4o，Claude 選項是 Haiku 4.5。見一、租第 3 點與 4-2
4. **The Register（2026-09-03）：已讀。** 來源是 2026-08-27 Deutsche Bank 科技大會，不是財報或法說會。見一、租第 6 點
5. **fin.ai/pricing：仍為每次成果 0.99 美元**（2026-09-27 讀取），每月最低 50 次，qualifications 9.99 美元。頁面無日期，也沒有交割後調價字樣

### 第四輪一手核實結果（2026-09-27）

方法：WebFetch、curl 讀原文，Salesforce Help 以 headless Chrome 渲染後讀取。搜尋只用來找網址。

| 項目 | 結論 | 來源與日期 | 對大綱的影響 |
|------|------|-----------|-------------|
| R1 七月 Right-Sizing | A，屬實但範圍限定：五個自家調校模型，四個 GA、一個 rollout；開源微調，非從零訓練；核心多步驟推理仍給前沿模型；未點名 Claude；非 xLAM、xGen | [Salesforce 新聞室](https://www.salesforce.com/news/stories/cutting-inference-spend-by-right-sizing-models/)，2026-07-08｜T1 | 3-1 改框架；4-1 補註；前作更正草稿見下 |
| R1 xLAM、xGen-Sales 生產佐證 | 證據不足。2024 官方稿說 xLAM 專有版驅動 Agentforce，但 2026-07 原文說 18 個月前 Agentforce 全靠單一租用模型；xGen-Sales 停在 pilot，GA 查無可靠來源 | [2024-09-06 稿](https://www.salesforce.com/news/stories/agentforce-ai-models-announcement/)；[xGen-Sales 部落格 2024-10-21](https://www.salesforce.com/blog/xgen-sales/)｜T1 | 不寫進正文 |
| R2 Salesforce Ben 連結 | 連結正確，原文確實寫了並逐字引述 Help；Help 版本說明可讀，是更好的 T1 來源 | [Salesforce Ben，2026-09-16](https://www.salesforceben.com/comparing-salesforces-aiforce-headless-360-and-the-enterprise-ai-harness/)｜T3；[Help AIforce 版本說明](https://help.salesforce.com/s/articleView?id=release-notes.rn_headless360.htm&release=264&type=5)（無日期）｜T1 | 前作處理建議見下 |
| R3 Koa 與 Flex Credits | 未獲官方證實 | Koa 產品頁；2026-08-31 Rate Card｜T1 | 無 |
| R4 Computer Weekly | 「cheaper than Claude or ChatGPT」原文不存在 | [Computer Weekly](https://www.computerweekly.com/news/366650532/Salesforce-wants-ASEAN-customers-to-stop-thinking-in-tokens)，2026-09-17｜T3 | 3-4 刪除該線索 |
| R5 CNBC 與支援頁 | 支援頁寫 Agentforce 預設 GPT-4.1／GPT-4o，Claude 選項為 Haiku 4.5；CNBC 的 Fable、Astra 句是記者推論 | [CNBC，2026-09-18](https://www.cnbc.com/2026/09/18/at-dreamforce-business-leaders-say-older-ai-models-are-enough.html)｜T2；[Help](https://help.salesforce.com/s/articleView?id=ai.agent_setup_select_model_provider.htm&type=5)（無日期）｜T1 | 一、租第 3 點；3-3；4-2 |
| R6 The Register | 來源為 2026-08-27 Deutsche Bank 科技大會，Mike Spencer 原話與逐字稿一致；法說會與財報稿只有 GAAP 20.1%、non-GAAP 34.3%，未提 token | [The Register，2026-09-03](https://www.theregister.com/ai-and-ml/2026/09/03/salesforce-blames-its-claude-addiction-for-denting-profit-margin-guidance/5294219)｜T2；[逐字稿](https://stockanalysis.com/stocks/crm/transcripts/737696-deutsche-bank-2026-technology-conference/)｜T3；[法說會逐字稿](https://www.fool.com/earnings/call-transcripts/2026/08/31/salesforce-crm-q2-2027-earnings-call-transcript/)｜T3；[FY27 Q2 EX-99.1](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm)｜T1 | 一、租第 6 點（選用） |
| R7 fin.ai/pricing | 仍為 0.99 美元 | [fin.ai/pricing](https://fin.ai/pricing)，2026-09-27 讀取｜T1 | 2-3 標註再確認 |

### 前作處理建議（使用者決定，**本輪未修改已發布前作**）

#### R1：前作第 57 至 59 行的更正草稿

**判斷：** 前作「七年後，它不做模型了」在 2026-08-27 寫作當下就不精確。證據是 Salesforce 自己在 2026-07-08 發表的原文（T1），不是事後才出現的資訊。但前作接下來「前沿模型的軍備競賽早就不是一間 CRM 公司的資本結構撐得起的」那層判斷不受影響，因為七月那批模型都是開源微調，核心推理仍交給前沿模型。

**選項一：文末加更正說明（保留原句）**

> **更正（日期待定）：** 本文原寫「七年後，它不做模型了，改成把別人的模型掛上自己的招牌」，這句不精確。Salesforce 在本文發表前的 2026 年 7 月 8 日就公開說明，Agentforce 已在生產環境使用自家調校的專用模型，包括負責意圖分類與路由的 HyperClassifier、負責檢查回答品質與引用的 TextEval，以及毒性過濾與搜尋結果重排序模型，其中多數已正式上線（[Salesforce，2026-07-08](https://www.salesforce.com/news/stories/cutting-inference-spend-by-right-sizing-models/)）。這些模型是在 OpenAI 開源的 GPT-OSS-20B 等模型上微調而成，不是從零訓練，負責的也是周邊工作；Salesforce 在同一篇文章裡寫明，核心的多步驟推理仍由前沿模型處理。比較準確的說法是：Salesforce 沒有停止做模型，它沒有做的是從零訓練通用大模型、參加前沿模型的競賽。本文其餘關於能力現實與軍備競賽的判斷不變。

**選項二：直接改寫原句，並在元資料「更新日期」註明**

> 原句：七年後，它不做模型了，改成把別人的模型掛上自己的招牌。
>
> 改寫：七年後，它不再從零訓練通用大模型，只在開源模型上調校負責分類、防護、評估的專用小模型，最核心的推理則租用別人的前沿模型，最後還把別人的模型掛上自己的招牌。

**建議：** 選項一較透明，也和續篇 3-1「我寫的時候就漏看了」的自我修正互相呼應。若採選項二，續篇 3-1 引用前作原句時要註明「原句，已於某日修訂」。

#### R2：前作「術語註記」第 2 點的連結處理

- **連結本身正確**：Salesforce Ben〈Comparing Salesforce’s AIforce, Headless 360, and the Enterprise AI Harness〉（Sasha Semjonova，2026-09-16）確實寫「Salesforce has confirmed that Headless 360 has been rebranded to AIforce.」並逐字引述 Help：「As of September 4, 2026, Headless 360 has been rebranded to AIforce」
- **Help 原文可讀，建議改引 T1**：[Salesforce Help〈AIforce〉版本說明](https://help.salesforce.com/s/articleView?id=release-notes.rn_headless360.htm&release=264&type=5) 的 Note 寫「As of September 4, 2026, Headless 360 has been rebranded to AIforce. During this transition, you may see references to Headless 360 in our application and documentation. While the name is new, the functionality and content remains unchanged.」（Help 頁無發布日期，讀取於 2026-09-27）
- **建議改寫第 2 點**：「Salesforce Help 的 AIforce 版本說明寫明，自 2026 年 9 月 4 日起 Headless 360 改名為 AIforce（[Salesforce Help](https://help.salesforce.com/s/articleView?id=release-notes.rn_headless360.htm&release=264&type=5)；[Salesforce Ben，2026-09-16](https://www.salesforceben.com/comparing-salesforces-aiforce-headless-360-and-the-enterprise-ai-harness/) 亦有引述）」
- **連帶要改的一句**：註記導言「Salesforce 尚未發布正式的改名說明」與 Help 版本說明衝突。建議改為「Salesforce 沒有發布改名新聞稿，但 Help 文件已寫明改名」。上方時效檢查表「第三方文章明寫 Salesforce 未發布正式改名公告」一列，也應以此為準
- 補充：2026-08-31 版 Flex Credits Rate Card 仍使用「Headless 360」一詞，與 9 月 4 日改名的時序一致
