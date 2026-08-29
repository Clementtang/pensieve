---
title: "Research Memo: Claudeforce 與 Salesforce 的模型外包賭注"
description: "Salesforce 與 Anthropic 發布 Claudeforce 的研究備忘（合作沿革、Agentforce 商業數據、Slack 戰略角色與 OpenAI 對照組），已擴寫為分析文後歸檔"
date: 2026-08-27
author: "Clement Tang"
tags: ["research-memo", "Salesforce", "Anthropic", "Claude", "Slack", "Agentforce", "OpenAI", "企業軟體"]
category: memo
status: archived
related:
  - "docs/articles/2026-08-27-claudeforce-salesforce-anthropic-analysis.md"
---

# Research Memo: Claudeforce 與 Salesforce 的模型外包賭注

> 輕量級研究備忘錄，供 writer agent 擴寫為深度分析文。所有事實均以 2026-08-27 當日網路查證為準，並標註來源與報導日期。已擴寫為正式分析文（見 related）。

## 會話資訊

| 欄位 | 內容 |
|------|------|
| **日期** | 2026-08-27 |
| **平台** | CLI（deep research agent） |
| **目標輸出** | Article（深度分析文章） |
| **預計字數** | 3,000 至 4,500 字 |
| **研究方法** | WebSearch 多輪查證。**注意：本次環境的 WebFetch 遭 egress proxy 全面封鎖**，無法逐字讀取原始新聞頁面，所有內容均來自搜尋引擎回傳的摘要。引述用語可能與原文有細微出入，writer 若要直接引用金句，建議再次核對原始連結。 |

---

## 一、Claudeforce 是什麼（已查證事實）

### 1.1 確認存在，非媒體暱稱

Claudeforce 是 Salesforce 與 Anthropic **共同發布的官方產品與合作品牌名稱**，不是媒體用語或社群玩笑。發布時間為 **2026 年 8 月 26 日**，與 Salesforce FY27 第二季財報同日公布。

- 官方新聞稿標題為〈Salesforce and Anthropic Announce Claudeforce: The #1 AI Meets the #1 AI CRM〉，見 [Salesforce 新聞室](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/) 與 [Salesforce 投資人關係頁](https://investor.salesforce.com/news/news-details/2026/Salesforce-and-Anthropic-Announce-Claudeforce-The-1-AI-Meets-the-1-AI-CRM/default.aspx)（2026-08-26）
- Salesforce 另闢專屬產品頁 [salesforce.com/claudeforce](https://www.salesforce.com/claudeforce/)
- 媒體同步報導：[CNBC〈Salesforce, Anthropic expand partnership as Benioff responds to 'SaaSpocalypse' concerns〉](https://www.cnbc.com/2026/08/26/salesforce-anthropic-partnership-claudeforce.html)（2026-08-26）、[VentureBeat](https://venturebeat.com/orchestration/salesforce-just-put-its-entire-crm-inside-claude-and-says-youll-never-need-its-app-again)（2026-08-26）、[Salesforce Ben](https://www.salesforceben.com/salesforce-and-anthropic-announce-claudeforce-in-q2-27-earnings/)（2026-08-26）

### 1.2 命名的象徵意義

多家報導指出，這是 Salesforce **第一次把自家的 `-force` 後綴掛在別家公司的產品上**（[CNBC](https://www.cnbc.com/2026/08/26/salesforce-anthropic-partnership-claudeforce.html)、[Salesforce Ben](https://www.salesforceben.com/salesforce-and-anthropic-announce-claudeforce-in-q2-27-earnings/)，2026-08-26）。過去 `-force` 只保留給 Salesforce 自有產品線。

### 1.3 定位與官方定義

官方說法是「把 Claude 的智慧與推理，結合 Salesforce 值得信任的企業 harness（trusted enterprise harness），讓資料、工作流、商業邏輯、動作與治理能安全地被任何 agent 取用」。

Benioff 在 X 上的描述更直白：「Claudeforce is here. 第 1 名的 AI（Claude）現在原生跑在第 1 名的 CRM（Salesforce）上。透過新的 AIforce harness 加上 Headless 360，Claude 直接、受治理地存取 Data 360、Tableau、Slack 與你整個 Salesforce 工作流，全程不用離開對話。」（[Benioff on X](https://x.com/Benioff/status/2092705110082347011)，2026-08-26）

### 1.4 首發產品：Salesforce in Claude

| 項目 | 內容 |
|------|------|
| 形式 | Claude 內的 Plugin（外掛），底層走 MCP 與 MCP Apps |
| 內容 | **37 個預建銷售技能（prebuilt sales skills）**，包含會議準備、成交健康度檢視、pipeline 檢視等 |
| 賣點 | 官方稱之為給業務的「AI CRO」，可查詢、更新、對 live CRM 資料採取行動，**完全不必打開 Salesforce 本身** |
| 技術差異 | Salesforce 與 Anthropic 共同打造，強調是針對 Claude 的推理、agentic tool use 與 generative UI 設計，而非單純的 API wrapper |
| 治理 | 所有動作路由回 Salesforce 執行，確保商業規則被強制套用 |
| 上市時間 | 2026-08-26 起開放**精選 pilot 客戶**；**2026 年 9 月 open beta**；更多其他職能的技能於 2026 年下半年（Q3 起）陸續推出 |
| 定價 | **查無可靠來源。** Salesforce 僅表示定價與包裝仍可能變動（pricing and packaging subject to change）。writer 不要編造價格 |

來源：[Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)、[VentureBeat](https://venturebeat.com/orchestration/salesforce-just-put-its-entire-crm-inside-claude-and-says-youll-never-need-its-app-again)（2026-08-26）

### 1.5 Claudeforce 不只是一個外掛

Claudeforce 實際上是一個**傘狀合作品牌**，涵蓋 Claude 成為多個 Salesforce 產品的預設模型：

- **Slack**：Claude 是 Slack AI 與 Slackbot 的預設模型，並透過 Claude Tag 支援團隊決策，同時是 Slack Code 的創始夥伴
- **Agentforce**：Claude 作為 Atlas Reasoning Engine 的推理模型之一，並且是 **Agentforce Vibes 與 Agentforce Coworker 的預設模型**，也可在 Agent Builder 中選用
- **Headless 360**：Claude 是預設模型
- **Salesforce 內部**：Claude Code 部署至全球工程組織

來源：[Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)、[itbrief](https://itbrief.co.nz/story/salesforce-anthropic-launch-claudeforce-partnership)、[channellife](https://channellife.co.nz/story/salesforce-anthropic-launch-claudeforce-partnership)（2026-08-26）

### 1.6 高層引述（來自搜尋摘要，引用前建議核對原文）

> 「透過融合 Claude 卓越的推理能力，與每個企業賴以運作的可信資料、工作流與治理，我們正在交付一個會思考、會推理、會行動的動態介面。這就是未來每一家企業的運作方式。」
> — Marc Benioff, Salesforce 董事長暨執行長，2026-08-26（[Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)）

Anthropic 這一側的說法：

> 「我們相信前沿智慧應該是安全、可信、且能力深厚的，這正是全球頂尖企業把最重要的工作交給 Claude 的原因。Salesforce in Claude 把同樣的前沿智慧帶進全世界大多數商業活動實際發生的系統裡。透過這個合作，企業可以把 Claude 指向他們在 Salesforce 裡累積數十年的客戶資訊與商業脈絡，並真正用它來經營與成長。」
> — Dario Amodei, Anthropic 執行長，2026-08-26（[Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)）

法說會上的口徑：

> 「這就是兩全其美。全世界第 1 名的 AI（Anthropic）與第 1 名的 CRM（Salesforce）第一次以極具威力的方式結合，打造出一個新產品叫 Claudeforce。」
> — Marc Benioff，FY27 Q2 法說會，2026-08-26（[Salesforce Ben](https://www.salesforceben.com/salesforce-and-anthropic-announce-claudeforce-in-q2-27-earnings/)）

---

## 二、Anthropic 與 Salesforce 合作沿革（已查證事實）

### 2.1 時間軸

| 日期 | 事件 | 來源 |
|------|------|------|
| 2023-05-16 | Salesforce Ventures 首次投資 Anthropic，參與 Series C，金額約 5,000 萬美元 | [Salesforce Ventures](https://salesforceventures.com/perspectives/behind-the-investment-anthropic/) |
| 2025-05-29 | Slack 更新服務條款，新增 Data usage 條款，禁止透過 API 大量匯出資料、禁止以 Slack API 資料訓練 LLM | [Computerworld](https://www.computerworld.com/article/4005509/salesforce-changes-slack-api-terms-to-block-bulk-data-access-for-llms.html)（2025-06） |
| 2025-10-13 | Dreamforce 2025：Agentforce 360 正式 GA；Slack 同步預告 Real-Time Search API 與 MCP server | [Salesforce](https://www.salesforce.com/news/press-releases/2025/10/13/agentic-enterprise-announcement/)、[TechCrunch](https://techcrunch.com/2025/10/13/salesforce-announces-agentforce-360-as-enterprise-ai-competition-heats-up/) |
| 2025-10-14 | **Anthropic 與 Salesforce 擴大策略合作**：Claude 成為受規管產業的偏好模型 | [Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2025/10/14/anthropic-regulated-industries-partnership-expansion-announcement/)、[Anthropic](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership) |
| 2025-10-14 | 同日 Salesforce 也宣布擴大與 **OpenAI** 的合作，Agentforce 360 進入 ChatGPT | [Salesforce](https://www.salesforce.com/news/press-releases/2025/10/14/openai-partnership-expansion-announcement/)、[CNBC](https://www.cnbc.com/2025/10/14/salesforce-will-bring-agentforce-to-openais-chatgpt.html) |
| 2025-12-09 | Slack 執行長 Denise Dresser 跳槽 OpenAI 出任 Chief Revenue Officer | [TechCrunch](https://techcrunch.com/2025/12/09/slack-ceo-denise-dresser-to-join-openai-as-chief-revenue-officer/)、[OpenAI](https://openai.com/index/openai-appoints-denise-dresser/) |
| 2026-01-13 | Salesforce 推出由 Claude 驅動的新版 Slackbot | [CNBC](https://www.cnbc.com/2026/01/13/salesforce-releases-updated-slackbot-powered-by-anthropics-ai-model.html) |
| 2026-02-17 | Slack Real-Time Search API 與 MCP server 正式 GA | [Slack Developer Docs](https://docs.slack.dev/changelog/2026/02/17/slack-mcp/) |
| 2026-02（下旬） | Salesforce 宣布支援 Anthropic MCP Apps，推出 Claude 內的雙向擴充，先從 Slack 開始，再擴及 Agentforce 360。同期 Anthropic Claude Cowork 生態夥伴公布，Salesforce 股價一度上漲約 4% | [Salesforce](https://www.salesforce.com/news/stories/salesforce-anthropic-trusted-context-ai-actions-on-claude/)、[Salesforce Ben](https://www.salesforceben.com/anthropics-new-claude-cowork-partnerships-boost-salesforce-stock-4/) |
| 2026-04-15 | TDX 2026：Salesforce 發布 **Headless 360** | [Salesforce Trail](https://salesforcetrail.com/salesforce-introduces-headless-360-at-tdx-2026/)、[Futurum](https://futurumgroup.com/insights/salesforce-bets-the-platform-on-headless-360/) |
| 2026-06-01 | 彭博報導 Salesforce 持有的 Anthropic 股權價值約 50 億美元 | [Bloomberg](https://www.bloomberg.com/news/articles/2026-06-01/salesforce-investment-in-anthropic-is-valued-at-about-5-billion) |
| 2026-06-23 | Anthropic 推出 **Claude Tag**（Slack 內 @Claude），舊版 Claude in Slack 整合於 2026-08-03 退役 | [Anthropic](https://www.anthropic.com/news/introducing-claude-tag)、[TechRepublic](https://www.techrepublic.com/article/news-anthropic-claude-tag-ai-agent-slack/) |
| 2026-08-19 | Salesforce 擴大 Headless 360，推出 Headless 360 MCP Server，可被 Agentforce、Claude、ChatGPT、Cursor 等呼叫 | [Salesforce](https://www.salesforce.com/news/stories/expanding-headless-360-enterprise-capabilities/) |
| 2026-08-26 | **Claudeforce 發布** | 見第一節 |

### 2.2 2025 年 10 月合作的三大支柱

1. **Claude 成為受規管產業的偏好模型**，涵蓋金融服務、醫療、資安、生命科學
2. **共同開發產業別 AI 解決方案**，從金融服務起步
3. **Claude 與 Slack 深度整合**，並計畫把 Agentforce 360 帶進 Claude

同時，Salesforce 宣布把 **Claude Code 部署到全球工程組織**，並透過 Slack MCP server 讓工程師在 Claude Code 中讀取 Slack 規格與脈絡、把文件寫回 Slack canvas。

來源：[Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2025/10/14/anthropic-regulated-industries-partnership-expansion-announcement/)、[Anthropic](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership)、[Salesforce Ben](https://www.salesforceben.com/anthropics-claude-now-powers-salesforces-agentforce-360/)（2025-10）

### 2.3 商業條款與資本關係

**投資關係**

- Salesforce Ventures 自 2023 年 Series C 起連續參與 Anthropic 的 Series C 至 Series G（[Salesforce Ventures](https://salesforceventures.com/perspectives/behind-the-investment-anthropic/)、[Salesforce Ben](https://www.salesforceben.com/could-anthropic-acquire-salesforce/)）
- 2026 年 6 月，Salesforce 的 Anthropic 持股價值約 **50 億美元**，據報導約占 Salesforce 整個策略投資組合的**三分之二**（[Bloomberg](https://www.bloomberg.com/news/articles/2026-06-01/salesforce-investment-in-anthropic-is-valued-at-about-5-billion)、[The Next Web](https://thenextweb.com/news/salesforce-anthropic-investment-5-billion-ipo)，2026-06）

**互為客戶**

- Anthropic 是 Salesforce 客戶，使用 Slack 作為內部工作平台、Agentforce Sales 作為業務系統，Salesforce 是 Anthropic 的偏好 CRM
- Salesforce 內部大量使用 Anthropic 技術（Claude Code、Slackbot、Agentforce Coworker）
- Salesforce 揭露：內部 Slackbot 已產生 **810 萬小時年化生產力效益**，季增超過一倍

來源：[Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)、[channellife](https://channellife.co.nz/story/salesforce-anthropic-launch-claudeforce-partnership)（2026-08-26）

**AWS / Bedrock 的角色**

- Anthropic 是**第一家完全整合進 Salesforce trust boundary 的 LLM 供應商**，所有 Claude 流量都被包在 Salesforce 的 VPC 內
- 技術路徑是 Amazon Bedrock。流量透過 AWS PrivateLink 連接，至少 TLS 1.2 加密，模型供應商無法存取客戶資料，Bedrock 不儲存資料
- Agentforce 中的 AWS Hosted 選項使用 Amazon Bedrock 上的 Claude Haiku 4.5（2026-07 資料）

來源：[Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2025/10/14/anthropic-regulated-industries-partnership-expansion-announcement/)、[AWS Partner Network Blog](https://aws.amazon.com/blogs/apn/salesforce-and-aws-accelerate-agentic-ai-transformation-for-agentic-enterprises/)

**金流方向**

Claudeforce 的收入分潤、誰付錢給誰、最低採購承諾等商業條款，**查無可靠來源**。writer 不要推測具體金額。

---

## 三、Agentforce 的發展與商業成績（已查證事實）

### 3.1 版本演進

| 版本 | 時間 | 重點 |
|------|------|------|
| Agentforce（1.0） | 2024-10 | 第一代企業 AI agent 平台 |
| Agentforce 2 | 2024-12 | 強化 Atlas Reasoning Engine，追求更可預測、有依據的結果 |
| Agentforce 2dx | 2025-03 | agent 可嵌入任何工作流，支援主動觸發與跨職能 |
| Agentforce 3 | 2025-06 | 互通性與治理，為規模化做準備 |
| Agentforce 360 | 2025-10-13 | GA，定位為「連結人與 AI agent 的單一可信系統」 |

來源：[Salesforce Ben](https://www.salesforceben.com/from-1-0-to-3-how-agentforce-has-evolved-since-its-launch/)、[Salesforce](https://www.salesforce.com/news/press-releases/2025/10/13/agentic-enterprise-announcement/)、[TechCrunch](https://techcrunch.com/2025/10/13/salesforce-announces-agentforce-360-as-enterprise-ai-competition-heats-up/)

### 3.2 FY27 Q2 財報數據（2026-08-26 公布，季度截止 2026-07-31）

| 指標 | 數值 | 來源 |
|------|------|------|
| 營收 | 113.5 億美元，年增 11%（市場預期 113.2 億） | [CNBC](https://www.cnbc.com/2026/08/26/salesforce-crm-q2-earnings-report-2027.html) |
| 淨利 | 35.3 億美元，每股 4.29 美元，年增 87%（去年同期 18.9 億 / 1.96 美元） | [CNBC](https://www.cnbc.com/2026/08/26/salesforce-crm-q2-earnings-report-2027.html) |
| Non-GAAP EPS | 5.90 美元（分析師預估 3.27，超出約 80%） | [Investing.com 法說逐字稿](https://in.investing.com/news/stock-market-news/earnings-call-transcript-salesforce-tops-q2-2026-profit-forecasts-shares-jump-93CH-5572995) |
| **Agentforce ARR** | **超過 15 億美元，年增逾 240%** | [Salesforce 財報](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm) |
| AI 與 Data ARR 合計 | 近 39 億美元，年增逾 210% | 同上 |
| cRPO | 固定匯率年增 14% | [SiliconANGLE](https://siliconangle.com/2026/08/26/salesforce-scoffs-at-saaspocalypse-fears-with-a-crushing-earnings-beat/) |
| Agentic Work Units（AWU） | 累計 70 億；本季 32 億，季增 97% | [Salesforce 財報](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm) |
| FY27 全年營收指引 | 上修至 461 億至 464 億美元 | [CNBC](https://www.cnbc.com/2026/08/26/salesforce-crm-q2-earnings-report-2027.html) |
| 股價反應 | 盤後上漲約 14% | [CNBC](https://www.cnbc.com/2026/08/26/salesforce-crm-q2-earnings-report-2027.html)、[Reuters via Investing.com](https://www.investing.com/news/stock-market-news/salesforce-raises-annual-revenue-forecasts-on-ai-product-momentum-4877862) |

### 3.3 FY27 Q1 對照（2026-05-27 公布）

- Agentforce ARR 12 億美元，年增 205%；Agentforce + Data 360 ARR 近 34 億美元
- 累計 AWU 38 億，季增 111%
- **Slack MCP 上線六週內突破 100 萬活躍使用者**
- 累計處理超過 28.6 兆 token，季增 152%
- Agentforce One Edition 與 Agentforce for Apps 的 bookings 年增近 60%

來源：[Salesforce FY27 Q1 8-K](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000125/crm-q1fy27xexhibit991.htm)、[Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2026/05/27/fy27-q1-earnings/)

### 3.4 內部替代人力的數據

- Benioff 於 2025 年 9 月證實，客服團隊從約 **9,000 人縮減至約 5,000 人**（減幅 44%），AI agent 處理約一半的客戶對話，客服成本下降 17%。名言是「I need less heads」（[Fortune](https://fortune.com/2025/09/02/salesforce-ceo-billionaire-marc-benioff-ai-agents-jobs-layoffs-customer-service-sales/)、[SF Chronicle](https://www.sfchronicle.com/tech/article/salesforce-ai-job-cuts-benioff-21025920.php)，2025-09）
- 工程組織生產力據稱提升逾 30%，FY26 全年工程人力持平，以生產力取代招募
- 2026 年 2 月裁員不到 1,000 人，6 月再有一輪；Benioff 表示除了業務以外幾乎全面凍結招募（[Fortune](https://fortune.com/2026/05/28/ai-slashes-white-collar-jobs-salesforce-ceo-marc-benioff-one-department-still-hiring-sales/)，2026-05；[Salesforce Ben](https://www.salesforceben.com/salesforce-lays-off-nearly-1000-employees-in-early-2026-cuts/)，2026）

### 3.5 外界質疑（重要的反方素材）

**KeyBanc 降評（2026-07-09）**

- 將 Salesforce 從 Overweight 降至 Sector Weight
- CIO 調查結果負面，Salesforce 是「a standout for the wrong reasons」
- 客戶回饋兩大共通點：資料還沒整理好，無法做有意義的 AI；以及「Agentforce 這個產品就是還沒到位（isn't there yet）」
- 多數客戶「不願意透過 CRM 供應商付費買 AI 能力」，同時批評 Salesforce 「aggressive price increases」
- 調查中預期未來 12 個月會**降低** Salesforce 預算優先序的 CIO，多於提高的

來源：[The Register](https://www.theregister.com/saas/2026/07/15/salesforces-agentforce-isnt-winning-over-clients-keybanc-analysts-claim/5271866)、[CIO.com](https://www.cio.com/article/4198127/salesforces-agentforce-product-maturity-questioned-as-keybanc-cites-weak-customer-traction.html)、[Seeking Alpha](https://seekingalpha.com/news/4612661-salesforce-receives-downgrade-to-sector-weight-as-agentforce-fails-to-gain-momentum-keybanc)（2026-07）

**Gartner 的行業預警**

- 預測到 2027 年底，超過 **40% 的 agentic AI 專案會被取消**，原因是成本失控、商業價值不明、風險控管不足
- 2026 年將有三分之一企業因為過早部署 AI 而傷害客戶體驗

來源：[MarTech](https://martech.org/gartner-40-of-agentic-ai-projects-will-fail-making-humans-indispensable/)、[Forbes](https://www.forbes.com/sites/robertszczerba/2026/07/07/why-40-of-agentic-ai-projects-may-be-canceled-by-2027/)

**股價**

- 2026 年 YTD 一度下跌逾 30%，52 週高點 267.75 美元、6 月低點 146.32 美元（[BigGo Finance](https://finance.biggo.com/news/cf62cb06-9521-421e-ac09-7a83f248bd1c)、[stockanalysis.com](https://stockanalysis.com/stocks/crm/)）
- 財報後 CNBC Investing Club 上調目標價（[CNBC](https://www.cnbc.com/2026/08/26/were-raising-our-price-target-on-salesforce-after-results-defy-saaspocalypse.html)，2026-08-26）
- **注意：** 各聚合網站的市值與股價數字彼此不一致（有來源同時列出股價 203.61 美元與市值 1,667 億美元，兩者無法對應）。writer 若要引用市值，建議另行查證或直接略過。

---

## 四、Slack 的戰略角色（已查證事實）

### 4.1 為何 Slack 是核心

Slack 擁有企業內部最稀缺的資產：**對話式資料與 work graph**。這些資料不存在於 CRM 欄位裡，卻是 agent 判斷「這筆交易到底怎麼了」的關鍵脈絡。

規模面：Slack 2025 年初日活躍使用者超過 4,200 萬，財年 2026 營收約 30 億美元，近 80% 的 Fortune 100 企業使用；企業通訊市場份額約 13%，落後 Microsoft Teams 的約 37%（[Business of Apps](https://www.businessofapps.com/data/slack-statistics/)、[sqmagazine](https://sqmagazine.co.uk/slack-statistics/)，2026）。

### 4.2 產品時間軸

- **2025-10-13**：Dreamforce 宣布 Real-Time Search API 與 MCP server；Agentforce 專門體驗（Sales、IT Service、HR Service、Tableau）嵌入 Slack
- **2026-01-13**：新版 Slackbot 上線，由 Claude 驅動，被定位為可跨 Salesforce CRM、Google Drive、Microsoft Teams 取用資料的「super agent」，開放給 Business+ 與 Enterprise+ 訂戶（[CNBC](https://www.cnbc.com/2026/01/13/salesforce-releases-updated-slackbot-powered-by-anthropics-ai-model.html)、[TechRepublic](https://www.techrepublic.com/article/news-salesforce-turns-slack-into-ai-hub/)）
- **2026-02-17**：RTS API 與 MCP server 正式 GA。超過 50 家夥伴（含 Anthropic、Google、OpenAI、Perplexity）在上面打造 context-aware agent；RTS 查詢與 MCP tool call 成長 25 倍（[Slack Developer Docs](https://docs.slack.dev/changelog/2026/02/17/slack-mcp/)、[Slack Blog](https://slack.com/blog/news/mcp-real-time-search-api-now-available)）
- **2026-05-04**：Agentforce Channel Expert 退役（[Slack Help](https://slack.com/help/articles/43686587570963-Use-Channel-Expert-in-Slack--legacy-)）
- **2026-06-23**：Claude Tag beta 上線，可在頻道 @Claude 指派任務、記憶頻道脈絡，並有選用的 ambient 模式。管理員有 30 天遷移窗口，舊版 Claude in Slack 於 **2026-08-03** 下線（[Anthropic](https://www.anthropic.com/news/introducing-claude-tag)、[TechRepublic](https://www.techrepublic.com/article/news-anthropic-claude-tag-ai-agent-slack/)）
- **2026 夏季起**：所有新 Salesforce 客戶將自動佈建 Slack，從第一天就是 AI 驅動且 Salesforce-aware，Slack 的成長模式從 land-and-expand 轉為**預設綁定分發**

### 4.3 API 政策轉向：從封鎖到選擇性開放

2025 年 5 月 29 日，Slack 更新服務條款新增 Data usage 章節，**禁止透過 API 大量匯出資料，並明文禁止用 Slack API 取得的資料訓練 LLM**。Glean 等企業搜尋業者不能再長期索引或儲存 Slack 資料，只能暫時使用後刪除。Glean 當時對客戶發信警告此舉會「妨礙你把資料用在自選的企業 AI 平台上」。

Salesforce 官方說法：「當 AI 帶來客戶資料如何被處理的關鍵考量時，我們正在強化 Slack API 資料如何被儲存、使用與分享的防護措施。」

來源：[Computerworld](https://www.computerworld.com/article/4005509/salesforce-changes-slack-api-terms-to-block-bulk-data-access-for-llms.html)、[Salesforce Ben](https://www.salesforceben.com/salesforce-rivals-blocked-from-using-slack-data/)、[Hunton](https://www.hunton.com/insights/legal/salesforce-locks-down-slack-data-time-to-review-your-slack-api-terms)（2025-06）

**分析（我的推論，非查證事實）：** 這是一個先關門、再發鑰匙的兩段式操作。2025 年 5 月先把 Slack 資料的「無償批量取用」封死，2025 年 10 月到 2026 年 2 月再以 RTS API 與 MCP server 的形式，把受控、可稽核、留在 Slack 基礎設施內的存取路徑重新開放。這讓 Slack 從「被搜刮的資料來源」升級為「發放許可的守門人」。Anthropic 之所以能成為最深度的夥伴，一部分原因正是它願意走進這道門，而非繞過它。

### 4.4 人事上的張力

- 2025 年 11 月，Sam Altman 公開批評 Slack「creates a lot of fake work」，並暗示 OpenAI 可能自建生產力工具替代方案（[Salesforce Ben](https://www.salesforceben.com/why-does-sam-altman-want-to-kill-slack/)、[IBTimes UK](https://www.ibtimes.co.uk/openai-ceo-sam-altman-criticised-slacks-fake-workthen-hired-its-ceo-revenue-lead-1761788)）
- 一個月後，2025 年 12 月 9 日，OpenAI 把 Slack 執行長 **Denise Dresser** 挖走出任 Chief Revenue Officer，向 COO Brad Lightcap 匯報。Dresser 在 Slack 之前已在 Salesforce 待超過十年（[TechCrunch](https://techcrunch.com/2025/12/09/slack-ceo-denise-dresser-to-join-openai-as-chief-revenue-officer/)、[CNBC](https://www.cnbc.com/2025/12/09/openai-slack-ceo-denise-dresser-chief-revenue-officer.html)）

**分析（我的推論）：** 這是 writer 最好用的敘事鉤子之一。OpenAI 先貶低 Slack，再挖走 Slack 的 CEO 去賣企業方案。九個月後，Salesforce 把 `-force` 這個 27 年來只留給自己的後綴，送給了 Anthropic。人事流動與品牌讓渡，兩件事拼在一起說明了 Salesforce 選邊站的心理路徑。

---

## 五、為何是 Anthropic：雙方動機（部分查證，部分推論）

### 5.1 Salesforce 這一側

**已查證的合作理由**

- 受規管產業的合規需求：金融、醫療、資安、生命科學。Anthropic 是第一家完全進入 Salesforce trust boundary、流量全包在 Salesforce VPC 內的模型商。早期客戶包括 CrowdStrike 與 RBC Wealth Management（[Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2025/10/14/anthropic-regulated-industries-partnership-expansion-announcement/)，2025-10）
- 面對 SaaSpocalypse 的敘事壓力（見第七節）
- 對 Microsoft 的長期敵意：Benioff 自 2024 年 10 月起持續攻擊 Copilot，稱其「令人失望」、「就是不能用，也不能提供任何準確度」、「Copilot 更像是 Clippy 2.0」（[VentureBeat](https://venturebeat.com/ai/salesforce-ceo-marc-beinoff-slams-microsoft-copilot-as-clippy-2-0)、[CIO.com](https://www.cio.com/article/3586887/marc-benioff-rails-against-microsofts-copilot.html)，2024-10）

**分析（我的推論）：** Salesforce 沒有自研前沿模型的野心，也沒有那個資本結構去養。它的三個選項是綁 OpenAI（等於間接綁 Microsoft，而 Benioff 兩年來公開攻擊 Copilot）、綁 Google（Benioff 確實在 2025 年底公開稱讚 Gemini 3，但 Google 自己就是 CRM 與生產力工具的潛在競爭者），或是綁 Anthropic。Anthropic 是唯一一家沒有消費端流量野心、沒有自建 CRM 意圖、且在企業 API 市場已是第一名的選項。它同時是 Salesforce Ventures 的重倉部位，帳面上兩家的利益已經綁在一起。

### 5.2 Anthropic 這一側

**已查證的數據**

| 指標 | 數值 | 來源 | 日期 |
|------|------|------|------|
| 營收年化 run rate | 約 650 億美元（7 月底） | [Motley Fool](https://www.fool.com/investing/2026/08/20/anthropics-revenue-run-rate-just-hit-65-billion-amazon-and-spacex-may-be-the-biggest-winners/) | 2026-08 |
| 企業與 API 佔營收比重 | 約 80%（其餘為訂閱） | [ValueAdd VC](https://valueaddvc.com/blog/anthropics-business-model-how-the-ai-safety-company-makes-money) | 2026 |
| 企業客戶數 | 逾 30 萬家 | [Anthropic 統計彙整](https://www.getpanto.ai/blog/anthropic-ai-statistics) | 2025-10 起 |
| 年花費逾 100 萬美元的企業客戶 | 逾 1,000 家（Series G 時為 500 家） | 同上 | 2026 |
| Series H | 650 億美元募資，投後估值 9,650 億美元 | [Fortune](https://fortune.com/2026/06/01/anthropic-confidentially-files-ipo-965-billion-valuation/) | 2026-06-01 |
| IPO | 2026-06-01 秘密送件，傳目標 10 月於 Nasdaq 掛牌 | [Fortune](https://fortune.com/2026/06/01/anthropic-confidentially-files-ipo-965-billion-valuation/) | 2026-06 |

> **數據可信度警告：** 上述 run rate 與估值數字，不同來源差異很大（有來源稱 ARR 為 741 億美元、有稱 470 億美元）。Fortune 與 Bloomberg 的報導可信度較高，其餘數字多半來自二手彙整站。writer 引用時**只用 Fortune / Bloomberg / CNBC 這類一手媒體的數字，並務必標註日期與「截至某月」**。

**分析（我的推論）：** 對 Anthropic 而言，Salesforce 提供的是**分發通路與合規背書**。Anthropic 的弱點一向是消費端沒有 ChatGPT 那種品牌與流量，強項是企業 API。透過 Claudeforce，它一次拿到三樣東西：Slack 的日常入口、Salesforce 逾 15 萬家客戶的通路，以及金融醫療等受規管產業的合規敲門磚。Salesforce Ben 甚至寫了一篇〈Could Anthropic Acquire Salesforce?〉來討論兩家的權力關係反轉，並指出 Salesforce 一向是「先投資、再收購」，若反過來被自己投資的公司收購，將是史上首例（[Salesforce Ben](https://www.salesforceben.com/could-anthropic-acquire-salesforce/)）。這篇文章本身就是很好的分析素材，代表市場已經開始認真討論誰才是這段關係中的強勢方。

---

## 六、OpenAI 有沒有做類似的事（已查證事實）

### 6.1 OpenAI 與企業 SaaS 的合作

| 對象 | 內容 | 日期 | 來源 |
|------|------|------|------|
| Salesforce | Agentforce 360 進入 ChatGPT；Salesforce 平台可用 GPT-5 建 agent；ChatGPT 與 Codex 進入 Slack；ChatGPT 商務體驗 | 2025-10-14 | [Salesforce](https://www.salesforce.com/news/press-releases/2025/10/14/openai-partnership-expansion-announcement/)、[CNBC](https://www.cnbc.com/2025/10/14/salesforce-will-bring-agentforce-to-openais-chatgpt.html) |
| Salesforce（續） | Agentforce Sales 成為原生 ChatGPT app，開放 open beta | 2025-12 / 2026-01 | [Salesforce](https://www.salesforce.com/ap/news/press-releases/2026/01/07/the-1-ai-crm-meets-chatgpt/)、[Salesforce Ben](https://www.salesforceben.com/salesforce-brings-agentforce-sales-to-chatgpt/) |
| ServiceNow | 多年期策略合作，GPT-5.2 成為 ServiceNow 企業客戶的 preferred intelligence capability，整合進 AI Control Tower | 2026-01-20 | [OpenAI](https://openai.com/index/servicenow-powers-actionable-enterprise-ai-with-openai/)、[ServiceNow](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-and-OpenAI-collaborate-to-deepen-and-accelerate-enterprise-AI-outcomes/default.aspx)、[SiliconANGLE](https://siliconangle.com/2026/01/20/servicenow-partners-openai-develop-deploy-enterprise-grade-ai-agents/) |
| Walmart | ChatGPT 內購物與結帳，支援帳號連結、會員與 Walmart Pay | 2025-10 | [Forbes](https://www.forbes.com/sites/arafatkabir/2025/10/22/what-does-walmarts-partnership-with-openai-mean-for-retail/) |
| Target | Target app 進入 ChatGPT，同時擴大使用 ChatGPT Enterprise | 2025 年末 | [OpenAI](https://openai.com/index/target-partnership/) |

**Workday / SAP / HubSpot / Intercom 與 OpenAI 的具體合作：查無可靠來源。** 搜尋結果只把這幾家列為企業 AI 領域的競爭者，沒有找到對等的官方合作公告。writer 不要硬寫。

### 6.2 OpenAI 的企業產品線

- **OpenAI Frontier**（2026-02-05 發布）：端到端的企業 agent 建置與管理平台，可連接資料源、CRM 與內部應用，形成語意層；支援管理在 OpenAI 之外建的 agent；打包 ChatGPT Enterprise/Business、Agents SDK、AgentKit；並派駐 forward-deployed engineers（[TechCrunch](https://techcrunch.com/2026/02/05/openai-launches-a-way-for-enterprises-to-build-and-manage-ai-agents/)、[CNBC](https://www.cnbc.com/2026/02/05/open-ai-frontier-enterprise-customers.html)、[VentureBeat](https://venturebeat.com/orchestration/openai-launches-centralized-agent-platform-as-enterprises-push-for-multi)）
- **Company Knowledge**：ChatGPT Business / Enterprise / Edu 可用，連接 SharePoint、Google Drive、Dropbox、Box、Outlook、Teams、Gmail、Slack、GitHub、Linear（[OpenAI](https://openai.com/index/introducing-company-knowledge/)、[OpenAI Help Center](https://help.openai.com/en/articles/12628342-company-knowledge-in-chatgpt-business-enterprise-and-edu)）
- **Apps SDK / connectors**：2025-12-17 起 connectors 更名為 apps，統一 UI 型 app 與搜尋型 connector
- **Agents SDK 更新**（2026-04-15，[TechCrunch](https://techcrunch.com/2026/04/15/openai-updates-its-agents-sdk-to-help-enterprises-build-safer-more-capable-agents/)）

### 6.3 有沒有「冠名」先例

**沒有對等案例。** 查證結果顯示 OpenAI 與 SaaS 巨頭的合作模式都是「preferred model」或「app in ChatGPT」，**沒有任何一家把 OpenAI 的品牌併進自己的產品名稱**。ServiceNow 用的措辭是 preferred intelligence capability，不是 ServiceNow×OpenAI 的複合名。

**分析（我的推論）：** Claudeforce 在商業史上的特殊性，不在技術而在**品牌讓渡**。Salesforce 願意把 27 年來嚴守的命名資產分給模型商，等於在市場面前承認：這一代 CRM 的價值主張，已經需要靠別人的模型來背書。這是全篇最值得寫的張力點。

### 6.4 兩家企業市場策略差異的可佐證數據

| 指標 | Anthropic | OpenAI |
|------|-----------|--------|
| 營收年化 run rate | 約 650 億美元（2026-07 底，[Motley Fool](https://www.fool.com/investing/2026/08/20/anthropics-revenue-run-rate-just-hit-65-billion-amazon-and-spacex-may-be-the-biggest-winners/)） | 約 400 億美元（2026-07，[Bloomberg](https://www.bloomberg.com/news/articles/2026-08-13/openai-s-revenue-run-rate-tops-40-billion-ahead-of-ipo)） |
| 營收結構 | 約 80% 來自 API 與企業 | 企業佔比逾 50%，但歷史上以 ChatGPT 消費訂閱為主體 |
| 客戶結構 | 逾 30 萬家企業客戶；逾 1,000 家年花費逾 100 萬美元 | 逾 100 萬家企業客戶；ChatGPT for Work 座位數逾 700 萬（[OpenAI](https://openai.com/index/1-million-businesses-putting-ai-to-work/)） |
| 估值 | 9,650 億美元（Series H，2026-06，[Fortune](https://fortune.com/2026/06/01/anthropic-confidentially-files-ipo-965-billion-valuation/)） | 約 8,520 億美元（2026-08） |
| IPO | 2026-06-01 秘密送件 | 2026-06-08 秘密送件 |

**企業 LLM API 市佔（Menlo Ventures）**

- 2023：OpenAI 50%、Anthropic 12%、Google 7%
- 2025 年中：Anthropic 32%、OpenAI 25%、Google 20%（[Menlo Ventures](https://menlovc.com/perspective/2025-mid-year-llm-market-update/)，樣本為 150 位技術主管）
- 2025 年底：Anthropic 40%、OpenAI 27%、Google 21%（[Menlo Ventures 2025 State of Generative AI](https://finance.yahoo.com/news/menlo-ventures-2025-state-generative-123000623.html)）
- 企業 LLM 支出從 2024 年末的 35 億美元增至 84 億美元（六個月內翻倍）
- 企業 AI coding 市場，Anthropic 2026 年中約 54%（此數字來自二手彙整，可信度較低，建議另行查證）

**分析（我的推論）：** 兩家的路線差異可以濃縮成一句話。OpenAI 從消費端往企業端打，靠的是 ChatGPT 的品牌與流量，因此它跟 SaaS 的合作模式是「把你的 app 放進我的介面」。Anthropic 從企業後端與 coding 起家，因此它跟 SaaS 的合作模式是「把我的模型放進你的系統，順便把你的系統放進我的介面」。Claudeforce 之所以能雙向，正是因為 Anthropic 在 Slack 與 Agentforce 內部已經卡了將近一年的位。

---

## 七、SaaSpocalypse 論戰與第三方觀點（已查證事實）

### 7.1 事件本身

- **詞源**：由 Jefferies 股票交易部門的 Jeffrey Favuzza 提出，形容 SaaS 股的「apocalypse」與「get me out 式的拋售」
- **引爆點**：2026 年 2 月 5 日前後，Anthropic 發布 Claude Cowork 被視為催化劑，48 小時內全球軟體股蒸發 2,850 億美元；過去 12 個月軟體市值累計蒸發約 2 兆美元
- **Claude Cowork**：2026 年 1 月底 research preview，macOS 公測 1 月、Windows 2 月，2026-04-09 GA。它在檔案系統層級運作，深度整合 Gmail、Google Drive、Chrome，具備排程任務、外掛市集與 Dispatch（computer use）

來源：[NxCode](https://www.nxcode.io/resources/news/saaspocalypse-2026-software-stock-crash)、[Forbes](https://www.forbes.com/sites/petercohan/2026/02/06/saaspocalypse-now-ai-is-disrupting-saas---but-not-all-software-is-doomed/)、[The SaaS Sentinel](https://saassentinel.com/2026/07/03/saaspocalypse-2026-what-happened-to-saas-and-where-the-market-stands-now/)、[TechSy](https://techsy.io/en/blog/claude-cowork-guide)

> **注意：** 「2,850 億美元 48 小時蒸發」與「2 兆美元 12 個月蒸發」這兩個數字來自二手部落格與媒體彙整，非彭博或路透一手報導。writer 若要引用，建議加上「據市場統計」之類的保留語氣，或改引用 [CNBC〈'SaaSpocalypse' debate intensifies as software stocks swing wildly〉](https://www.cnbc.com/2026/08/07/saaspocalypse-debate-intensifies-as-software-stocks-swing-wildly.html)（2026-08-07）這類可信來源。

### 7.2 Benioff 的正面回應

> 「這種 SaaSpocalypse 的胡說八道，我覺得該停止了。」
> — Marc Benioff，FY27 Q2 法說會，2026-08-26（[CNBC](https://www.cnbc.com/2026/08/26/salesforce-ceo-marc-benioff-saaspocalypse-nonsense.html)）

Benioff 的核心論證是：Claude 這類模型需要 Salesforce 平台上的客戶資料、商業脈絡與工作流才能運作，因此 Salesforce 是 AI agent 的**地基**，而非被取代的對象。他在 2026 年 2 月就已表態不畏懼 SaaS-pocalypse（[Fortune](https://fortune.com/2026/02/27/salesforces-marc-benioff-does-not-fear-the-saas-pocalypse/)）。

Yale 的 Jeffrey Sonnenfeld 於財報同日在 Fortune 撰文〈The SaaSpocalypse that wasn't〉，論證 Salesforce、Booking Holdings、IBM 的護城河在 AI 時代反而更穩固（[Fortune](https://fortune.com/2026/08/26/saaspocalypse-salesforce-booking-ibm-sonnenfeld/)，2026-08-26）。

### 7.3 反方觀點（已查證，非常重要）

**介面商品化風險**

分析指出，如果介面層被商品化，定價權會往「誰擁有智慧」的一方移動，而擁有 Claude 的是 Anthropic 不是 Salesforce。從座位授權轉向消耗量計價的過渡期，可能出現座位收入被侵蝕的速度快於 API 呼叫收入補上的速度（[VentureBeat](https://venturebeat.com/orchestration/salesforce-just-put-its-entire-crm-inside-claude-and-says-youll-never-need-its-app-again)，2026-08-26）。

**Salesforce 的反論**

同一篇分析也提出 Salesforce 的賭注：它的護城河從來不是 Lightning 頁面，而是 27 年累積的資料、metadata、工作流邏輯與治理，這些是模型變不出來、新創短期複製不了的。Claudeforce 等於押注「與其抵抗被去中介化，不如主動擁抱」，因為平台轉移的歷史顯示，抵抗新介面的既有者通常會輸。

**產品成熟度質疑**：見第 3.5 節的 KeyBanc 與 Gartner。

**權力反轉的討論**：Salesforce Ben 的〈Could Anthropic Acquire Salesforce?〉指出，若 Anthropic 收購 Salesforce，將立刻取得受規管產業的資格與逾 15 萬家客戶；但該文也認為，2026 年真正有能力收購「受傷的 SaaS 巨頭」的只有 Microsoft，而 Microsoft 已經與 OpenAI 綁在一起（[Salesforce Ben](https://www.salesforceben.com/could-anthropic-acquire-salesforce/)）。

---

## 八、給 writer 的重點提示

### 8.1 最值得寫的 7 個論點

1. **`-force` 後綴的讓渡是全篇最強的象徵。** 27 年來只留給自己的命名資產，第一次送給一家模型公司。查證後確認 OpenAI 沒有任何對等的冠名先例，這讓 Claudeforce 在企業軟體史上具備獨特性。（第 1.2、6.3 節）

2. **「不用打開 Salesforce 也能用 Salesforce」是自我去中介化的宣言。** VentureBeat 的標題直接點出這一點。Benioff 選擇主動把入口讓給 Claude，賭的是資料與治理層的價值高於介面層。（第 1.4、7.3 節）

3. **Slack 的兩段式操作：先關門，再發鑰匙。** 2025 年 5 月封鎖第三方 LLM 批量抓取 Slack 資料，2025 年 10 月到 2026 年 2 月再以 RTS API 與 MCP server 開放受控通道。Anthropic 是走進這道門最深的一家。（第 4.3 節）

4. **人事與品牌的對照敘事。** 2025 年 11 月 Sam Altman 說 Slack 是「fake work」，12 月 OpenAI 挖走 Slack 執行長 Denise Dresser。九個月後 Salesforce 把品牌後綴給了 Anthropic。（第 4.4 節）

5. **財報數字與客戶回饋的落差。** Agentforce ARR 15 億美元、年增 240%，同時 KeyBanc 的 CIO 調查說「產品就是還沒到位」、多數客戶不願透過 CRM 供應商買 AI。Claudeforce 可以讀成 Salesforce 對這個落差的解方，也可以讀成對自研能力的認輸。（第 3.2、3.5 節）

6. **兩家 AI 巨頭的企業策略是鏡像。** OpenAI 從消費端往下打（把你的 app 放進 ChatGPT），Anthropic 從企業後端往上打（把模型放進你的系統，再把你的系統放進 Claude）。Menlo Ventures 的市佔翻轉（OpenAI 從 50% 掉到 27%，Anthropic 從 12% 升到 40%）是最好的佐證。（第 6.4 節）

7. **Salesforce 持有 Anthropic 約 50 億美元股權，占其整個策略投資組合三分之二。** 這既是護身符也是把柄：Salesforce 在自己最大的技術依賴對象身上下了重注，兩家的估值已經互相綁定。Anthropic 若在 10 月成功 IPO，這段關係的權力天平會更明顯地傾斜。（第 2.3、5.2 節）

### 8.2 可用的金句素材

- Benioff：「這種 SaaSpocalypse 的胡說八道，我覺得該停止了。」
- Benioff：「第 1 名的 AI 與第 1 名的 CRM 第一次結合。」
- Benioff 對 Microsoft：「Copilot 更像是 Clippy 2.0。」（2024-10，可用來對照他 2026 年選擇 Anthropic 的一致性）
- Benioff 談裁員：「I need less heads.」（2025-09）
- Dario Amodei：「企業可以把 Claude 指向他們在 Salesforce 裡累積數十年的客戶資訊。」
- Sam Altman：Slack「creates a lot of fake work」（2025-11）
- KeyBanc：Salesforce 是「a standout for the wrong reasons」；客戶說 Agentforce「isn't there yet」
- 可用的比喻方向（我的建議，非引述）：Salesforce 把大門鑰匙交出去，換取自己仍然是那棟樓的房東；或是「27 年的後綴，換一張 agent 時代的入場券」

### 8.3 寫作時的注意事項

- **WebFetch 全面被封鎖**，本備忘所有內容來自搜尋摘要。逐字引述前務必核對原始連結，特別是第 1.6 節的三段高層引述。
- **數字可信度分層**：Salesforce 財報數字（SEC 8-K、CNBC）最可信；Anthropic / OpenAI 的 run rate 與估值只用 Fortune、Bloomberg、CNBC 的版本；SaaSpocalypse 的市值蒸發金額、Anthropic 741 億 ARR、AI coding 54% 市佔等來自二手彙整站，建議略過或加保留語氣。
- **不要寫的東西**：Claudeforce 的定價、收入分潤、最低採購承諾（查無可靠來源）；OpenAI 與 Workday / SAP / HubSpot / Intercom 的合作（查無可靠來源）；Salesforce 精確市值（各來源互相矛盾）。
- 全篇需明確區分 Salesforce 官方說法與市場質疑，不要讓新聞稿語言（「trusted enterprise harness」「AI CRO」）未加引號地滲進分析段落。

---

## 資料來源

### 一手資料（公司公告、財報、官方部落格）

1. [Salesforce〈Salesforce and Anthropic Announce Claudeforce: The #1 AI Meets the #1 AI CRM〉](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)（2026-08-26）
2. [Salesforce 投資人關係：Claudeforce 公告](https://investor.salesforce.com/news/news-details/2026/Salesforce-and-Anthropic-Announce-Claudeforce-The-1-AI-Meets-the-1-AI-CRM/default.aspx)（2026-08-26）
3. [Salesforce Claudeforce 產品頁](https://www.salesforce.com/claudeforce/)
4. [Salesforce FY27 Q2 8-K（SEC）](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm)（2026-08-26）
5. [Salesforce FY27 Q1 8-K（SEC）](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000125/crm-q1fy27xexhibit991.htm)（2026-05-27）
6. [Salesforce〈Anthropic and Salesforce Expand Strategic Partnership to Deliver Trusted AI for Regulated Industries〉](https://www.salesforce.com/news/press-releases/2025/10/14/anthropic-regulated-industries-partnership-expansion-announcement/)（2025-10-14）
7. [Anthropic〈Anthropic and Salesforce expand partnership to bring Claude to regulated industries〉](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership)（2025-10）
8. [Salesforce〈Salesforce and OpenAI announce strategic partnership expansion〉](https://www.salesforce.com/news/press-releases/2025/10/14/openai-partnership-expansion-announcement/)（2025-10-14）
9. [Salesforce〈Welcome to the Agentic Enterprise: Agentforce 360〉](https://www.salesforce.com/news/press-releases/2025/10/13/agentic-enterprise-announcement/)（2025-10-13）
10. [Salesforce〈Salesforce and Anthropic Bring Trusted Business Context and AI Actions to Claude Through Slack and Agentforce 360〉](https://www.salesforce.com/news/stories/salesforce-anthropic-trusted-context-ai-actions-on-claude/)（2026-02）
11. [Salesforce〈Expanding Headless 360: Enterprise Capabilities〉](https://www.salesforce.com/news/stories/expanding-headless-360-enterprise-capabilities/)（2026-08-19）
12. [Anthropic〈Introducing Claude Tag〉](https://www.anthropic.com/news/introducing-claude-tag)（2026-06-23）
13. [Slack Developer Docs〈Announcing the Slack MCP server and Real-time Search API〉](https://docs.slack.dev/changelog/2026/02/17/slack-mcp/)（2026-02-17）
14. [Slack〈Slack Securely Powers Your Third-Party Agents With Your Business Context〉](https://slack.com/blog/news/mcp-real-time-search-api-now-available)（2026-02）
15. [Salesforce Ventures〈Behind the Investment: Anthropic〉](https://salesforceventures.com/perspectives/behind-the-investment-anthropic/)
16. [OpenAI〈ServiceNow powers actionable enterprise AI with OpenAI〉](https://openai.com/index/servicenow-powers-actionable-enterprise-ai-with-openai/)（2026-01-20）
17. [OpenAI〈OpenAI appoints Denise Dresser〉](https://openai.com/index/openai-appoints-denise-dresser/)（2025-12-09）
18. [OpenAI〈1 million business customers〉](https://openai.com/index/1-million-businesses-putting-ai-to-work/)
19. [OpenAI〈Introducing company knowledge〉](https://openai.com/index/introducing-company-knowledge/)
20. [OpenAI〈Target partnership〉](https://openai.com/index/target-partnership/)
21. [ServiceNow Newsroom〈ServiceNow and OpenAI collaborate〉](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-and-OpenAI-collaborate-to-deepen-and-accelerate-enterprise-AI-outcomes/default.aspx)（2026-01-20）
22. [Marc Benioff on X：Claudeforce is here](https://x.com/Benioff/status/2092705110082347011)（2026-08-26）

### 新聞媒體

1. [CNBC〈Salesforce, Anthropic expand partnership as Benioff responds to 'SaaSpocalypse' concerns〉](https://www.cnbc.com/2026/08/26/salesforce-anthropic-partnership-claudeforce.html)（2026-08-26）
2. [CNBC〈Salesforce CEO Marc Benioff says the 'SaaSpocalypse' is nonsense〉](https://www.cnbc.com/2026/08/26/salesforce-ceo-marc-benioff-saaspocalypse-nonsense.html)（2026-08-26）
3. [CNBC〈Salesforce (CRM) Q2 earnings report 2027〉](https://www.cnbc.com/2026/08/26/salesforce-crm-q2-earnings-report-2027.html)（2026-08-26）
4. [CNBC〈'SaaSpocalypse' debate intensifies as software stocks swing wildly〉](https://www.cnbc.com/2026/08/07/saaspocalypse-debate-intensifies-as-software-stocks-swing-wildly.html)（2026-08-07）
5. [CNBC〈Salesforce releases updated Slackbot powered by Anthropic's AI model〉](https://www.cnbc.com/2026/01/13/salesforce-releases-updated-slackbot-powered-by-anthropics-ai-model.html)（2026-01-13）
6. [CNBC〈OpenAI hires Slack CEO Denise Dresser as chief revenue officer〉](https://www.cnbc.com/2025/12/09/openai-slack-ceo-denise-dresser-chief-revenue-officer.html)（2025-12-09）
7. [CNBC〈Salesforce will bring Agentforce to OpenAI's ChatGPT〉](https://www.cnbc.com/2025/10/14/salesforce-will-bring-agentforce-to-openais-chatgpt.html)（2025-10-14）
8. [CNBC〈OpenAI launches new enterprise platform Frontier〉](https://www.cnbc.com/2026/02/05/open-ai-frontier-enterprise-customers.html)（2026-02-05）
9. [VentureBeat〈Salesforce just put its entire CRM inside Claude〉](https://venturebeat.com/orchestration/salesforce-just-put-its-entire-crm-inside-claude-and-says-youll-never-need-its-app-again)（2026-08-26）
10. [Fortune〈Anthropic confidentially files for IPO after raising $65 billion at a $965 billion valuation〉](https://fortune.com/2026/06/01/anthropic-confidentially-files-ipo-965-billion-valuation/)（2026-06-01）
11. [Fortune〈The SaaSpocalypse that wasn't〉by Jeffrey Sonnenfeld](https://fortune.com/2026/08/26/saaspocalypse-salesforce-booking-ibm-sonnenfeld/)（2026-08-26）
12. [Fortune〈Salesforce CEO Marc Benioff says his company has cut 4,000 customer service jobs〉](https://fortune.com/2025/09/02/salesforce-ceo-billionaire-marc-benioff-ai-agents-jobs-layoffs-customer-service-sales/)（2025-09-02）
13. [Bloomberg〈Salesforce Anthropic Investment Is Valued at About $5B〉](https://www.bloomberg.com/news/articles/2026-06-01/salesforce-investment-in-anthropic-is-valued-at-about-5-billion)（2026-06-01）
14. [Bloomberg〈OpenAI's Revenue Run Rate Tops $40 Billion Ahead of IPO〉](https://www.bloomberg.com/news/articles/2026-08-13/openai-s-revenue-run-rate-tops-40-billion-ahead-of-ipo)（2026-08-13）
15. [TechCrunch〈Slack CEO Denise Dresser to join OpenAI as chief revenue officer〉](https://techcrunch.com/2025/12/09/slack-ceo-denise-dresser-to-join-openai-as-chief-revenue-officer/)（2025-12-09）
16. [TechCrunch〈Salesforce announces Agentforce 360〉](https://techcrunch.com/2025/10/13/salesforce-announces-agentforce-360-as-enterprise-ai-competition-heats-up/)（2025-10-13）
17. [TechCrunch〈OpenAI launches a way for enterprises to build and manage AI agents〉](https://techcrunch.com/2026/02/05/openai-launches-a-way-for-enterprises-to-build-and-manage-ai-agents/)（2026-02-05）
18. [Computerworld〈Salesforce changes Slack API terms to block bulk data access for LLMs〉](https://www.computerworld.com/article/4005509/salesforce-changes-slack-api-terms-to-block-bulk-data-access-for-llms.html)（2025-06）
19. [The Register〈Salesforce's Agentforce isn't winning over clients, KeyBanc analysts claim〉](https://www.theregister.com/saas/2026/07/15/salesforces-agentforce-isnt-winning-over-clients-keybanc-analysts-claim/5271866)（2026-07-15）
20. [CIO.com〈Salesforce's Agentforce product maturity questioned as KeyBanc cites weak customer traction〉](https://www.cio.com/article/4198127/salesforces-agentforce-product-maturity-questioned-as-keybanc-cites-weak-customer-traction.html)（2026-07）
21. [SiliconANGLE〈Salesforce scoffs at SaaSpocalypse fears with a crushing earnings beat〉](https://siliconangle.com/2026/08/26/salesforce-scoffs-at-saaspocalypse-fears-with-a-crushing-earnings-beat/)（2026-08-26）
22. [TechRepublic〈Anthropic Launches Claude Tag, Bringing AI Agents Into Slack〉](https://www.techrepublic.com/article/news-anthropic-claude-tag-ai-agent-slack/)（2026-06）
23. [TechRepublic〈Slack Powers Up Slackbot to AI Assistant〉](https://www.techrepublic.com/article/news-salesforce-turns-slack-into-ai-hub/)（2026-01）
24. [VentureBeat〈Salesforce CEO Marc Benioff slams Microsoft Copilot as 'Clippy 2.0'〉](https://venturebeat.com/ai/salesforce-ceo-marc-beinoff-slams-microsoft-copilot-as-clippy-2-0)（2024-10）
25. [Forbes〈SaaSpocalypse Now? AI Is Disrupting SaaS〉](https://www.forbes.com/sites/petercohan/2026/02/06/saaspocalypse-now-ai-is-disrupting-saas---but-not-all-software-is-doomed/)（2026-02-06）
26. [Forbes〈Why 40% Of Agentic AI Projects May Be Canceled By 2027〉](https://www.forbes.com/sites/robertszczerba/2026/07/07/why-40-of-agentic-ai-projects-may-be-canceled-by-2027/)（2026-07-07）

### 分析與產業研究

1. [Menlo Ventures〈2025 Mid-Year LLM Market Update〉](https://menlovc.com/perspective/2025-mid-year-llm-market-update/)
2. [Menlo Ventures 2025 State of Generative AI Report（Yahoo Finance 轉載）](https://finance.yahoo.com/news/menlo-ventures-2025-state-generative-123000623.html)
3. [Salesforce Ben〈Salesforce and Anthropic Announce 'Claudeforce' in Q2 '27 Earnings〉](https://www.salesforceben.com/salesforce-and-anthropic-announce-claudeforce-in-q2-27-earnings/)（2026-08-26）
4. [Salesforce Ben〈From 1.0 to 3: How Agentforce has Evolved Since Its Launch〉](https://www.salesforceben.com/from-1-0-to-3-how-agentforce-has-evolved-since-its-launch/)
5. [Salesforce Ben〈Could Anthropic Acquire Salesforce?〉](https://www.salesforceben.com/could-anthropic-acquire-salesforce/)
6. [Salesforce Ben〈Why Does Sam Altman Want to Kill Slack?〉](https://www.salesforceben.com/why-does-sam-altman-want-to-kill-slack/)
7. [Salesforce Ben〈Salesforce Rivals Blocked From Using Slack Data〉](https://www.salesforceben.com/salesforce-rivals-blocked-from-using-slack-data/)
8. [Constellation Research〈Salesforce expands OpenAI, Anthropic partnerships〉](https://www.constellationr.com/insights/news/salesforce-expands-openai-anthropic-partnerships-eyes-agentforce-everywhere)（2025-10）
9. [Futurum〈Salesforce Bets the Platform on Headless 360〉](https://futurumgroup.com/insights/salesforce-bets-the-platform-on-headless-360/)（2026）
10. [MarTech〈Gartner: 40% of agentic AI projects will fail〉](https://martech.org/gartner-40-of-agentic-ai-projects-will-fail-making-humans-indispensable/)
11. [AWS Partner Network Blog〈Salesforce and AWS Accelerate Agentic AI Transformation〉](https://aws.amazon.com/blogs/apn/salesforce-and-aws-accelerate-agentic-ai-transformation-for-agentic-enterprises/)
12. [Business of Apps〈Slack Revenue and Usage Statistics (2026)〉](https://www.businessofapps.com/data/slack-statistics/)

---

## 交接備註

### 研究狀態

- [x] 資料收集完成
- [x] 大綱確定（見第八節論點清單）
- [x] 可開始撰寫

### 待補充項目

1. Claudeforce 的定價與商業條款（目前查無可靠來源，建議 9 月 open beta 後回頭補查）
2. 財報後 24 小時內的分析師目標價調整（本次搜尋只查到財報前的 BMO 230 美元、UBS 210 美元）
3. Anthropic 若於 2026 年 10 月完成 IPO，S-1 公開後可補上真實的營收結構與客戶集中度數據
4. 台灣市場關聯性（本次未研究，若文章需要，可另查 Salesforce 台灣客戶與 Anthropic 在台落地情況）

### 續接建議

- **續接平台：** CLI
- **建議模板：** `templates/article-template.md`（深度分析文，3,000 至 4,500 字）
- **特別注意：**
  - 開頭建議用敘事場景切入，例如 2026 年 8 月 26 日財報電話會議上 Benioff 說出「SaaSpocalypse 是胡說八道」的那一刻
  - 全文避免破折號，中英文間留空格，當代人物一律用英文原名（Marc Benioff、Dario Amodei、Sam Altman、Denise Dresser、Jeffrey Sonnenfeld）
  - 分析段落請明確標示為作者觀點，與查證事實區隔
  - 引述前務必核對原始連結（本次 WebFetch 被封鎖，所有引述來自搜尋摘要）
