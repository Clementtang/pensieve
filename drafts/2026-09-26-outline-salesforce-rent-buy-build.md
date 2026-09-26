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
| **資料截止** | 2026-09-18（Research Memo 第三輪核實）。發佈前建議做一次時效檢查，見文末待決事項 |

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
4. **埋伏筆**：客服技能還沒上線，而客服正好是 Fin 的地盤（**推論**）
5. **寫作細節**：說是「租」，但租的對象是自己持股約 50 億美元的公司。這個曖昧可以點一句

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
- **成果計價**：每次成果 0.99 美元｜T1（fin.ai/pricing）
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
- **可點出的事實**：在 Salesforce 自己設計的 CRM 基準上，Koa 仍落在它租來的 Claude 之後。post-train 比基座多出 0.02
- **呼應前作第二句**：「永遠落後半代」這個判斷，被 Salesforce 自己的論文證實了（**作者觀點**）

**這段的措辭分寸：**

- **不要寫新聞稿造假或誤導。** 新聞稿說的是「CRM actions」，論文是加權平均，兩者可能指向不同切片。並陳兩句原文，讓讀者自己判斷
- Tau2Bench 的 69.41 對基座 68.64 **只見搜尋摘要，未經一手核實**。要用必須先核，否則不用。CRM Bench 的 0.86 對 0.84 已經足以說明同一件事

### 3-4 那為什麼還要造

- 官方唯一接近答案的句子：「orchestrating purpose-built models alongside frontier LLMs… Koa handles multi-step enterprise reasoning」｜T1（Why We Post-Trained）
- 注意這句**沒有點名 Claude**
- trust boundary 與權重控制權是官方強調的重點｜T1
- 「Koa 比 Claude 便宜」只見 TechCrunch 報導與訪談｜T2。**不可寫成官方說法**

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

### 4-2 自洽的邏輯（全段標作者觀點）

- **租**：前沿模型的軍備競賽，一家 CRM 公司的資本結構撐不起（呼應前作）
- **買**：客服是少數能按成果收費的場景，「解決率」這個指標要握在自己手上。客服也是 Benioff 證明 AI 回報的櫥窗，Salesforce 自家客服團隊從約 9,000 人減到約 5,000 人｜前作備忘
- **造**：高頻的 CRM 動作如果長期全靠前沿模型的 token，控制權與成本都在別人手上
- **合起來**：不把腦押在同一家供應商身上
- Everest Group 說 Fin Apex 能「降低對前沿實驗室 API 的依賴」｜T3。**這句寫於 2026-06，只談 Fin Apex，不可套用到 Koa**（事實類 10）

### 4-3 真正值得注意的是沉默

這是本段的收束，也是全文最重要的觀察：

- Claude 與 Fin Apex 的分工：**查無**
- Koa 與 Claude 的分工：**查無**
- Koa 與 Fin Apex 的分工：**查無**
- Koa 是否進入 Atlas：**查無**
- Anthropic 對 Koa 的回應：**查無**（Anthropic newsroom 截至 2026-09-18 對 Salesforce、Koa、Claudeforce 的提及為零）
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
   - Koa 正式上線（官方：2026 年冬季，美國區域）與正式定價（目前定價頁查無）
   - Koa 會不會進入 Atlas Reasoning Engine
   - Claudeforce 的客服技能上線時，Salesforce 怎麼說明它與 Fin 的分工
   - Fin Apex 與 Koa 有沒有整併的訊號
   - FY27 Q3 財報的購買價格分攤
4. **收尾句**：前作用「我會繼續看下去」收尾。本篇建議換一句，避免系列文重複

---

## 拆篇建議

**建議寫成單篇。**

理由：這篇的 C 與 A 是交織在一起的。開場每一個荒謬的點，都會在第四段被拆解。拆成兩篇的話，C 只剩幾個諷刺點撐不起一篇，A 少了開場會很冷。

**可另外衍生的短文（選做）：**

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

## 待決事項

1. **標題的「造」字是否精確**：Koa 是 post-train，不是從零訓練。建議標題維持「造」，由 3-1 在內文說清楚。這個落差本身也是可寫的素材
2. **前作的 Headless 360 註記**：本篇會引用前作，發佈前是否要先替前作加上術語註記（Research Memo 待補充項目 11）
3. **單篇或拆篇**：見上方建議
4. **Tau2Bench 數字**：要用就要先一手核實，不用則直接刪去
5. **時效檢查**：資料截至 2026-09-18，發佈前建議確認 Koa 定價、Claudeforce 客服技能、Fin 與 Casey 整併這三項有無新進展
