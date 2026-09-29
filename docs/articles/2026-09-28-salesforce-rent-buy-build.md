---
title: "二十天，三個選擇：Salesforce 租了 Claude、買了 Fin，又自己造了 Koa"
description: "二十天內，Salesforce 先讓 Claude 進駐旗下多項產品，又用現金收購 Fin，最後端出自研的 Koa。我用租、買、造拆解這二十天，並指出官方至今從未說明三者的分工。"
date: 2026-09-28
author: "Clement Tang"
tags: ["議題研究", "AI", "企業軟體", "Salesforce", "Anthropic", "Fin", "Koa", "NVIDIA", "AI 模型策略"]
category: articles
status: published
---

# 二十天，三個選擇：Salesforce 租了 Claude、買了 Fin，又自己造了 Koa

> 2026 年 8 月 26 日，Salesforce 讓 Claude 成為自己多項產品的預設大腦，十五天後它用現金買下一家客服公司，再過五天又端出自己造的推理模型。三件事疊在一起，像是同一家公司同時往三個方向下注。我想把這二十天拆開來看，弄清楚這究竟是想得很清楚，還是根本沒想清楚。

## 元資料

| 項目         | 內容                                                                     |
| ------------ | ------------------------------------------------------------------------ |
| **建立日期** | 2026-09-28                                                                |
| **更新日期** | 2026-09-29                                                                |
| **標籤**     | #議題研究 #AI #企業軟體 #Salesforce #Anthropic #Fin #Koa #NVIDIA #AI模型策略 |
| **狀態**     | 已發布                                                                     |
| **字數**     | 約 4,000 字                                                               |

---

先把三個日期放在一起，不加評論。

2026 年 8 月 26 日，Salesforce 與 Anthropic 共同發布 Claudeforce，Claude 成為 Salesforce 多項產品的預設模型。2026 年 9 月 10 日，Salesforce 完成對 Fin（原名 Intercom）的收購，對價約 36 億美元現金。2026 年 9 月 15 日，Dreamforce 開幕當天，Salesforce 同步發表 Koa，官方稱之為自己第一個 CRM 推理模型。

三個日期，二十天。

再把另外三件事疊上去。Salesforce 持有 Anthropic 的股權，根據它自己的 FY27 第二季 10-Q，截至 2026 年 7 月 31 日，這筆股權的帳面價值約 51 億美元，約占 Salesforce 整個策略投資組合的 45%。而 Anthropic 本身，恰好也是 Fin 的客戶：根據 fin.ai 的官方案例頁，Anthropic 每月透過 Fin 處理逾 56 萬次解決，解決率 79%。更微妙的是，Fin 自家的 benchmark 顯示，它的新模型 Fin Apex 在解決率上贏過 Claude：73.1 分，對上 Claude Opus 4.5 的 71.1 分、Claude Sonnet 4.6 的 69.6 分（這是 Fin 自己公布的評測，不是中立第三方的結果）。

然後，Salesforce 又自己做了一個。

把這幾件事放在同一張時間軸上，畫面有點荒謬：Salesforce 把自己 27 年的招牌借給 Anthropic，接著買下 Anthropic 的客服供應商，而這家供應商才剛公開說自己的模型贏過 Anthropic 的模型。然後五天後，Salesforce 又端出了一個自己造的模型。這究竟是一家公司把腦分散下注，想得很清楚，還是它自己也還沒想清楚，才會同時向三個方向伸手？我想把這二十天拆開，一段一段看。

## 先把「租」說完：Claude，但不只 Claude

Claudeforce 本身是什麼，我在前作〈[Salesforce 把 27 年的招牌借給 Anthropic，然後叫你不用再打開 Salesforce](./2026-08-27-claudeforce-salesforce-anthropic-analysis.md)〉裡已經寫過，這裡不重複，只補上前作發表後的新進度，以及一個我當時沒講清楚的細節。

Claudeforce 目前已經開放給所有客戶進入 beta，內建 37 個銷售技能。客服、行銷、商務這三類技能，官方的措辭是「in the near future」，沒有給出任何日期。

真正值得補上的，是 Claude 實際落在哪裡。Claudeforce 新聞稿寫，Claude 是 Slack（含 Slackbot）、Agentforce Vibes、Agentforce Coworker 等產品的預設模型，也是 Agentforce Atlas Reasoning Engine 的推理模型之一。但在 Agentforce 本身，Claude 不是預設，只是一個選項。截至 2026 年 9 月，Salesforce Help 的〈Select Agentforce Model Option〉頁面寫得很清楚：官方建議的「Salesforce Default」，在新版 Agentforce Builder 用的是 GPT-4.1，舊版用 GPT-4o；客戶要選擇「AWS-Hosted」，才會用到 Claude，版本是 Claude Haiku 4.5；另外還有一個選項是 Gemini 3.5 Flash。

換句話說，Salesforce 租的腦其實有好幾個，Anthropic 只是其中一家，這是可以查證的事實。我認為，這本身就是「不把腦押在同一家供應商身上」的第一層，只是這一層在前作發表的時候，我沒有看得夠仔細。

寫到這裡，有一個曖昧值得點一下：我說 Salesforce 在「租」，但租的對象，正是它自己持股、帳面價值約 51 億美元的那家公司。房客同時是房東的股東，這讓「租」這個字沒有表面上那麼單純。

成本這一側也值得補一筆。Salesforce 副財務長 Mike Spencer 在 2026 年 8 月 27 日的 Deutsche Bank 科技大會上說：「roughly about six months ago, we unleashed Claude in our R&D cycle. It is part of the reason we did not raise margin guidance on the year is because we are covering some of the token spend」他同場還說，多數工作用「second or third generation model」就夠，公司內部同時在用 OpenAI、Cursor、Claude，也開始試用 Grok。要提醒的是，Spencer 講的是 Salesforce 內部研發使用 Claude 的成本，不是 Claudeforce 產品本身的成本，財報稿與法說會只寫了 GAAP 營益率指引從約 20.6% 調到約 20.1%，法說會本身完全沒有提到 token 這個字。把營益率和 Claude 連在一起的，是投資人大會上的口頭發言，不是財報揭露。

還有一件事可以先埋在這裡：Claudeforce 的客服技能還沒上線，而客服，正好是 Fin 的地盤。

## 再來是「買」：把客服的答案握在自己手裡

Fin 是這二十天裡新聞含金量最高的一段，值得多花一點篇幅。

交易本身沒有太多懸念。FY27 第二季 10-Q 寫明對價約 36 億美元現金。從 2026 年 6 月 15 日簽約到 9 月 10 日交割，只花了 87 天。簽約時官方預計在 FY27 第四季交割，實際在第三季就完成了。交割新聞稿列出的數字是逾 30,000 家企業客戶，平均解決率 76%。

但比交易本身更有意思的，是 Fin 自己走過的路。還叫 Intercom 的時候，初代 Fin 用的是 OpenAI 的模型。2024 年 10 月，Fin 2 發布，改用 Anthropic 的 Claude 3.5 Sonnet，共同創辦人暨首席策略長 Des Traynor 在官方部落格裡寫下這句話：「We landed on Claude for one simple reason: it delivers.」到了 2026 年 3 月，Fin 發表在開放權重基座上後訓練的 Fin Apex 1.0，走完了「先租、再自己造」這條路。

我覺得這裡有一層值得停下來想的張力：一家公司先租了 Claude，後來自己造了一個模型，然後這家公司被另一家正在租 Claude 的公司買下。每一步都是可以查證的事實，把它們串起來讀出的那層諷刺，是我的解讀。

Salesforce 買到的顯然不只是一個模型。它買到的是一個開箱即用的客服代理，收購新聞稿明確寫了 Fin 的 fast-to-value「especially well-suited for SMB and some commercial」，我的理解是，Fin 補的是 Salesforce 在中小企業市場的那一塊。它買到的還有一套現成的成果計價，每次成果 0.99 美元，每月最低 50 次。而在 Salesforce 自己的產品線裡，同樣做客服的還有 Casey，Help Agent 的具名包裝，每次解決收費 2 美元。官方的說法是讓客戶自己選，至於 Casey 與 Fin 最終會不會整併，目前查無官方定論。值得一提的是，Salesforce 同時也把 agent 能力包回了席次價，Sales Cloud Core 從每人每月 195 美元起跳，成果計價與席次制目前是並存的兩條軌道，不是誰取代誰。

這裡先埋一個伏筆，留給下一段的 Koa。Fin 的官方頁面上同時寫著兩個數字：一句文案說解決率「高 2.8%」，圖表卻顯示是 73.1 對 69.6，也就是 3.5 個百分點。不管用百分點還是相對百分比去讀，這兩個說法都對不上。我認為這個小矛盾本身就是一個提醒，廠商自建的 benchmark，連自己都對不齊。這個模式，在 Koa 身上還會再出現一次。

## 造：Koa，以及我在前作漏看的一段

這是全文最需要小心的一段，因為牽涉到我自己前作的判斷。先引用前作裡的兩句話：

「七年後，它不做模型了，改成把別人的模型掛上自己的招牌。」

「硬要自研，最好的結果也只是永遠落後半代。」

### 我當時漏看的部分

第一句話，我必須自己修正。前作發表前七週，Salesforce 新聞室就在〈How We Cut Inference Spend by Right-Sizing Our Models〉（作者 Jayesh Govindarajan，發布於 2026 年 7 月 8 日）裡公開說明，Agentforce 早已在正式環境跑五個自家調校的專用模型，其中四個已經正式上線（GA）。負責意圖路由的 HyperClassifier，在那時就已經是 Service Agent 與 Employee Agent 範本的預設路由模型。也就是說，「它不做模型了」這句話，在我寫下它的當下就已經不精確。前作文末已於 2026 年 9 月 27 日補上更正，這裡不重複展開，有興趣可以回去看。

但精確一點說，七月那批模型是在 GPT-OSS-20B 等開源模型上微調而成的，原文自己寫得很直接：「We weren't training from scratch」它們負責的是路由、防護、評估、重排序這類周邊工作。所以前作那句「軍備競賽不是一家 CRM 公司撐得起」的判斷，我認為仍然成立。

真正的轉折，藏在兩句話的並置裡。七月那篇原文寫的是：「A frontier foundation model still handles the core muti-step [sic] reasoning」也就是核心的多步驟推理，仍然交給前沿模型。九月，Salesforce 在〈Why We Post-Trained Our Own Reasoning Model〉裡寫：「Koa handles multi-step enterprise reasoning」

把這兩句話放在一起讀，我的解讀是：Salesforce 七月就已經在做模型了，Koa 新的地方，在於自家模型第一次被放進了核心推理這個位置。十週之內，移動的是分工線本身。

而且即使是這一次，「造」這個字也要打點折扣。Koa 是在 NVIDIA 開放權重的 Nemotron 3 Super（120B）上 post-train 出來的，不是從零訓練。我認為它和七月那批周邊模型是同一種做法，只是這次的位置往上移了一層。連「造」的地基，也是借來的。

### Koa 是什麼

官方對 Koa 的定位是「Salesforce's first CRM reasoning model for Agentforce, built on NVIDIA Nemotron」。訓練資料是合成資料，官方明確寫「No customer data was used」。Salesforce 稱這是與 NVIDIA「co-engineered」的成果，模型權重由 Salesforce 自己控制，推理也在自己的信任邊界（trust boundary）內完成。在 Agentforce 裡，Koa 是第四個可選的 model provider，客戶需要自己 opt-in，不是預設。時程上，官方稿說 pilot 客戶現在就能用，正式上線（GA）預計在 2026 年冬季、限美國區域；NVIDIA 的部落格則寫 pilot 在十月，兩份說法我並列在這裡，不合併成單一日期。目前公開的 pilot 客戶名單包括 1-800Accountant、Baxter Credit Union、Engine、Formula 1、UChicago Medicine 與 Xero。

### 新聞稿與自家論文對不上的地方

| 來源 | 說法 |
|------|------|
| Salesforce 新聞稿 | 「matches or exceeds leading model performance on CRM actions with three times fewer errors」，未點名對手 |
| Salesforce 自家論文（arXiv 2609.15066）摘要 | 「surpasses a strong proprietary baseline while remaining below the strongest frontier models」，被超越的 baseline 是 GPT-4.1 |

論文附的、Salesforce 自建的 CRM Bench 加權平均分數是這樣的：GPT-5.5 0.90、Claude Opus 4.8 0.87、Koa 0.86、Nemotron 基座模型 0.84、GPT-4.1 0.81。「three times fewer errors」這句話，完全沒有出現在論文裡。

這裡有兩件各自是事實的事，值得連起來讀。Koa 贏過的 GPT-4.1，正好是前面提到、Agentforce 現行的預設模型；Koa 輸給的 Claude Opus 4.8，則出自 Salesforce 的另一家租用來源 Anthropic。連起來看，我的解讀是：Koa 超過了 Agentforce 現在的預設模型，但還追不上 Salesforce 所租用的供應商手上最強的那一級，而且它比起未經調校的 Nemotron 基座，也只多拿了 0.02 分。我認為，前作那句「硬要自研，最好的結果也只是永遠落後半代」，被 Salesforce 自己發表的論文印證了。

這裡要提醒兩件事。第一，我不認為新聞稿在造假或誤導，它說的是「CRM actions」，論文給的是加權平均，兩者未必指向同一個切片，我把兩句原文並陳，讓讀者自己判斷。第二，論文比的是 Claude Opus 4.8，Anthropic 在那之後已經發布更新的模型，例如 2026 年 9 月 22 日的 Claude Opus 5.5，所以這裡比的不是最新版的 Claude。

### 那為什麼還要造

官方唯一比較接近答案的一句話，出自〈Why We Post-Trained Our Own Reasoning Model〉：「orchestrating purpose-built models alongside frontier LLMs… while Koa handles multi-step enterprise reasoning」這句話同樣沒有點名 Claude。官方反覆強調的重點是信任邊界與模型權重的控制權。至於「Koa 比 Claude 便宜」這個說法，我只在 TechCrunch 的報導與生態系訪談裡看到，這不是官方的說法，我也沒有找到 Salesforce 主管公開這樣說過。Agentforce 的定價頁上，目前也查不到 Koa 的價格。

## 拆解：為什麼三條路可以同時走

把開場那種荒謬感拆開來看，我認為它其實有一套可以自洽的架構，但要先說清楚，接下來這一段幾乎全是我的推論，不是官方說法。

### 一張堆疊圖

| 層 | 資產 | 取得方式 | 看起來負責什麼（推論） | 官方說到哪裡 |
|----|------|---------|---------------------|-------------|
| 前沿通用推理 | Claude | 租（對象是自己持股的公司） | 對話介面、協作工具、銷售技能 | Slack、Vibes、Coworker 預設；Agentforce 可選（Haiku 4.5） |
| Agentforce 預設推理 | GPT-4.1 | 租 | Agentforce agent 的預設大腦 | Help 頁面：Salesforce Default |
| 客服垂直 | Fin Apex＋Fin 代理 | 買 | 客服解決、按成果計價 | 保留 Fin model suite；Fin Apex 掛在 Fin agent 下 |
| CRM 平台推理 | Koa | 造（在開放權重上 post-train） | 多步驟 CRM 動作 | 第四個可選 provider；「alongside frontier LLMs」 |
| 周邊專用模型 | HyperClassifier、TextEval 等 | 造（在 GPT-OSS-20B 上微調） | 路由、防護、評估、重排序 | 七月 Right-Sizing 原文；多數已 GA |

這張表想說的是，「造」並非從 Koa 才開始，Koa 只是第一次造到了核心推理這一層，這是我的推論。

### 這套邏輯為什麼自洽

租，是因為前沿模型的軍備競賽，呼應前作，一家 CRM 公司的資本結構撐不起，而且 Salesforce 租的還不只一家。買，是因為客服是少數能夠按成果收費的場景，「解決率」這個指標最好握在自己手上，客服同時也是 Benioff 用來證明 AI 回報的櫥窗，他在 2025 年 8 月底的 podcast 上說，自己把 support 團隊從 9,000 人減到約 5,000 人，理由是「I need less heads」。造，則是因為高頻的 CRM 動作如果長期全靠前沿模型的 token，控制權與成本都留在別人手上。合起來看，這套邏輯的核心只有一句：不要把腦押在同一家供應商身上。

第三方的說法可以拿來佐證，但要小心邊界。Everest Group 在 2026 年 6 月說，Fin Apex 能「降低對前沿實驗室 API 的依賴」，這句話寫在 Koa 發表之前，只談 Fin Apex，不能套用到 Koa 身上。CNBC 在 2026 年 9 月 18 日的報導裡寫道：「Salesforce customers and partners at the conference told CNBC that older and cheaper AI models are plenty powerful for everyday sales and customer service work.」這是記者對現場受訪者說法的轉述。同一篇報導裡還有一句「Salesforce isn't relying on … Claude Fable 5.1 or … GPT-6 Astra, according to a support page」，不過那個支援頁面上並沒有提到 Fable 或 Astra，這一句是記者對照模型清單得出的推論。前面提過 Mike Spencer 的說法也可以呼應，他說多數工作用上一兩代的模型就夠。

### 真正值得注意的是沉默

拆到這裡，比起這套架構怎麼自洽，我認為更值得注意的，是 Salesforce 從來沒有明確說過的那些空白。Claude 與 Fin Apex 的分工，查無。Koa 與 Claude 的分工，查無。Koa 與 Fin Apex 的分工，查無。Koa 會不會進入 Atlas Reasoning Engine，查無。Anthropic 對 Koa 的回應，同樣查無，截至 2026 年 9 月 23 日，anthropic.com/news 上關於 Salesforce、Koa、Claudeforce、Dreamforce 的提及次數是零。這裡要精確一點：Anthropic 確實在 claude.com 部落格發過一篇〈Salesforce in Claude〉，但那是 Claudeforce 本身的產品發表文，所以只能說 Anthropic 對 Koa 沒有回應，不能說它對 Salesforce 隻字未提。

Salesforce 到現在還沒有告訴客戶，哪一個腦負責哪一件事。我認為這裡有兩種可能的解讀：一種是刻意保留彈性，讓每個場景都能挑最合適的模型；另一種是它自己也還沒想清楚。這兩種解讀，現階段都只是推論，我沒有辦法替讀者選一個。

## 回到租約的問題

前作結尾留下一個問題：Salesforce 用 27 年的招牌換來的，究竟是一張 agent 時代的入場券，還是一份讓別人主導定價的租約？

二十天後，我想我可以給一個階段性的回答。買下 Fin、造出 Koa，這兩個動作看起來像是 Salesforce 在替那份租約找退路，用自己的錢買一個能自己掌握定價的客服模型，用自己的技術造一個能自己掌握權重的 CRM 推理模型。但 Koa 自己的論文已經說得很清楚，自己造的腦，還追不上它所租用的供應商手上最強的那一個。所以我的判斷是，至少在短期內，那份租約還退不掉。前作說這個決定「正確但危險」，我想在這裡把它更新一下：正確的部分沒有變，危險的部分現在多了一個新的變數，Salesforce 自己也在同時往另外兩個方向下注，賭注被分散了，但沒有一個賭注贏到可以退租的地步。

接下來有幾個時間點值得繼續盯著。Koa 正式上線，官方說是 2026 年冬季、美國區域，以及它的正式定價，目前官方完全查無價格，也沒有證實是否會以 Flex Credits 計價。Koa 會不會進入 Atlas Reasoning Engine，或者哪一天取代 GPT-4.1 成為 Agentforce 的預設。Claudeforce 的客服技能上線的那一天，Salesforce 會怎麼說明它與 Fin 的分工，或者乾脆不說明。Fin Apex 與 Koa 之間有沒有整併的訊號。還有 FY27 第三季財報裡，Fin 的購買價格分攤會揭露多少細節。

前作用「我會繼續看下去」收尾。這一次，我想換一句：比起 Salesforce 說了什麼，我更想追蹤的，是它一直沒有說出口的那些部分。

---

## 參考資料

1. [Salesforce〈Salesforce and Anthropic Announce Claudeforce: The #1 AI Meets the #1 AI CRM〉（2026-08-26）](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)
2. [Salesforce〈Salesforce Completes Acquisition of Fin〉（2026-09-10）](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/)
3. [Salesforce〈Salesforce Signs Definitive Agreement to Acquire Fin〉（2026-06-15）](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)
4. [Salesforce FY27 Q2 Form 10-Q（SEC）](https://www.sec.gov/Archives/edgar/data/1108524/000110852426000190/crm-20260731.htm)
5. [Salesforce〈AIforce〉發布稿（2026-09-15）](https://www.salesforce.com/news/stories/aiforce-announcement/)
6. [Salesforce Help〈Select Agentforce Model Option〉](https://help.salesforce.com/s/articleView?id=ai.agent_setup_select_model_provider.htm&type=5)
7. [CNBC 報導 Marc Benioff 談 support 團隊人數（2025-09-02）](https://www.cnbc.com/2025/09/02/salesforce-ceo-confirms-4000-layoffs-because-i-need-less-heads-with-ai.html)
8. [fin.ai〈AI-first by design: How Anthropic transformed support operations with Fin〉](https://fin.ai/customers/anthropic-transformation)
9. [fin.ai〈CX Models〉](https://fin.ai/cx-models)
10. [The Register〈Salesforce blames its Claude addiction for denting profit margin guidance〉（2026-09-03）](https://www.theregister.com/ai-and-ml/2026/09/03/salesforce-blames-its-claude-addiction-for-denting-profit-margin-guidance/5294219)
11. [Deutsche Bank 2026 Technology Conference 逐字稿（2026-08-27）](https://stockanalysis.com/stocks/crm/transcripts/737696-deutsche-bank-2026-technology-conference/)
12. [Salesforce FY27 Q2 8-K EX-99.1](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm)
13. [Intercom Blog〈Fin 2: Powered by Anthropic's Claude LLM〉（2024-10）](https://www.intercom.com/blog/fin-2-powered-by-anthropic-claude-llm/)
14. [Intercom Blog〈Announcing Fin Apex: The age of vertical models is here〉（2026-03）](https://www.intercom.com/blog/announcing-fin-apex-the-age-of-vertical-models-is-here/)
15. [fin.ai〈Pricing〉](https://fin.ai/pricing)
16. [Salesforce〈Agentforce Pricing〉](https://www.salesforce.com/agentforce/pricing/)
17. [Salesforce〈Announcing Koa: Salesforce's First CRM Reasoning Model, Built on NVIDIA Nemotron〉（2026-09-15）](https://www.salesforce.com/news/press-releases/2026/09/15/koa-reasoning-model/)
18. [Salesforce〈Why We Post-Trained Our Own Reasoning Model〉（2026-09-16）](https://www.salesforce.com/news/stories/why-we-post-trained-our-own-reasoning-model/)
19. [Salesforce Agentforce Koa 產品頁](https://www.salesforce.com/agentforce/koa/)
20. [arXiv:2609.15066 Salesforce Koa technical report](https://arxiv.org/abs/2609.15066)
21. [Salesforce〈How We Cut Inference Spend by Right-Sizing Our Models〉by Jayesh Govindarajan（2026-07-08）](https://www.salesforce.com/news/stories/cutting-inference-spend-by-right-sizing-models/)
22. [CNBC〈AI safety debate meets reality at Dreamforce as business leaders say last year's models are enough〉（2026-09-18）](https://www.cnbc.com/2026/09/18/at-dreamforce-business-leaders-say-older-ai-models-are-enough.html)
23. [Everest Group〈Salesforce built the foundation, Fin brings the intelligence〉（2026-06）](https://www.everestgrp.com/blogs/salesforce-built-the-foundation-fin-brings-the-intelligence)
24. [Fortune〈Salesforce CEO Marc Benioff says his company has cut 4,000 customer service jobs〉（2025-09-02）](https://fortune.com/2025/09/02/salesforce-ceo-billionaire-marc-benioff-ai-agents-jobs-layoffs-customer-service-sales/)
25. [TechCrunch〈Salesforce and Nvidia's new reasoning model is everything the AI labs should fear〉（2026-09-15）](https://techcrunch.com/2026/09/15/salesforce-and-nvidias-new-reasoning-model-is-everything-the-ai-labs-should-fear/)
26. [Anthropic〈Introducing Claude Opus 5.5〉（2026-09-22）](https://www.anthropic.com/claude-opus-5-5)
27. [Anthropic Newsroom](https://www.anthropic.com/news)
28. [Claude Blog〈Salesforce in Claude〉（2026-09-15）](https://claude.com/blog/salesforce-in-claude)
29. [The Logan Bartlett Show〈EP 149: Marc Benioff (CEO, Salesforce) Predicts Half of Conversations Will be With AI Agents Next Year〉（2025-08-29）](https://podcasts.apple.com/us/podcast/ep-149-marc-benioff-ceo-salesforce-predicts-half-of/id1606770839?i=1000724017332)
30. [Salesforce Sales Cloud 定價頁](https://www.salesforce.com/sales/pricing/)
31. [Clement Tang〈Salesforce 把 27 年的招牌借給 Anthropic，然後叫你不用再打開 Salesforce〉（2026-08-27）](./2026-08-27-claudeforce-salesforce-anthropic-analysis.md)

---

_本文為個人觀點，與任職公司立場無關；非投資建議。_

_最後更新：2026-09-29_
