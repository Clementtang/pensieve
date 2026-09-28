---
title: "Research Memo: Salesforce 收購 Fin 與租、買、造三層模型策略"
description: "Salesforce 以約 36 億美元收購 Fin（前 Intercom）的研究備忘；Dreamforce 會後補上 Koa（首個 CRM reasoning model），把 Claude／Fin Apex／Koa 放進同一張堆疊圖，並標明哪些關係仍屬推論"
date: 2026-09-10
author: "Clement Tang"
tags: ["research-memo", "Salesforce", "Fin", "Intercom", "Agentforce", "Anthropic", "Claudeforce", "Koa", "NVIDIA", "AI 客服", "併購", "企業軟體"]
category: memo
status: draft
related:
  - "drafts/2026-08-27-memo-salesforce-claudeforce-research.md"
  - "docs/articles/2026-08-27-claudeforce-salesforce-anthropic-analysis.md"
---

# Research Memo: Salesforce 收購 Fin 與租、買、造三層模型策略

> 輕量級研究備忘錄，供 writer agent 擴寫為深度分析文。事實以 2026-09-10 初查為底，並於 2026-09-11 以一手頁面（live HTML / WebFetch）核實後更新；**2026-09-18 完成 Dreamforce 2026 會後核實（round 2）**，同日另完成 **Koa／三層模型策略核實（round 3）**。本篇為 Claudeforce 備忘（2026-08-27）的續篇，論述請與前作呼應。租／買／造三層是本研究分析框架，**不是** Salesforce 官方戰略名稱。

## 會話資訊

| 欄位 | 內容 |
|------|------|
| **日期** | 2026-09-10（初稿）；2026-09-11（一手核實）；**2026-09-18（Dreamforce 會後核實 round 2；Koa／三層模型 round 3）** |
| **平台** | CLI（deep research agent） |
| **目標輸出** | Article（深度分析文章） |
| **預計字數** | 3,000 至 4,500 字 |
| **前作** | [Claudeforce 研究備忘](./2026-08-27-memo-salesforce-claudeforce-research.md)、[Claudeforce 分析文](../docs/articles/2026-08-27-claudeforce-salesforce-anthropic-analysis.md) |
| **研究方法** | 2026-09-10 以 WebSearch 交叉查證；**2026-09-11 已對主要一手頁面以 live HTML / WebFetch 逐頁核實**（Salesforce 新聞稿、Fin Ideas、fin.ai 定價與案例、Apex / CX Models、Intercom 官方部落格、Agentforce / Zendesk 定價頁、Dreamforce 議程與 SEC 10-Q 等）。**2026-09-18 Dreamforce 會後核實（round 2）**：先通過 media resources gate，再以 WebFetch／curl 讀 Salesforce 官方稿、定價頁、Salesforce+ 場次元資料、SEC EDGAR、TNW／Salesforce Ben 等原文。**同日 round 3（Koa）**：gate 通過官方 Koa PR 標題與首段，再讀 Why We Post-Trained、產品頁、NVIDIA blog、arXiv 2609.15066、Agentforce 定價頁、TechCrunch／Techzine／Channel Insider、Anthropic newsroom（負面證據）；不重查前兩輪已確認的 Fin／Claudeforce 事實。搜尋僅作發現線索。仍查無或僅二手者已於「一手來源核實紀錄」標明。 |
| **重大更新** | （1）交易已於 **2026-09-10 完成交割**，對價約 **36 億美元現金**（FY27 Q2 10-Q）。（2）**2026-09-18 會後核實（round 2）**：產品名稱流動、Casey／Fin 並存、定價雙軌、AIforce／Claudeforce beta、兩個 30,000 必須分開。（3）**同日 round 3**：補上 **Koa**（首個 CRM reasoning model，built on Nemotron 3 Super）；堆疊圖改為 Claude／Fin Apex／Koa 三模型層；核心張力與角度 A 改三層架構論；「租腦／買手」比喻標為不完整分析框架。詳見會後更新內 **Koa 與三層模型策略**。 |

---

## 一、事件本體：時程被壓縮的一樁併購

### 1.1 三個關鍵日期

| 日期 | 事件 | 來源 |
|------|------|------|
| 2026-05-12 | Intercom 正式更名為 Fin | [Fin Ideas〈Today Intercom becomes Fin〉](https://ideas.fin.ai/p/today-intercom-becomes-fin)、[CX Today](https://www.cxtoday.com/contact-center/intercom-rebrands-to-fin/) |
| 2026-06-15 | Salesforce 簽署最終協議，以**約 36 億美元**收購 Fin，價格「subject to customary purchase price adjustments」；當時宣告預計於 **FY27 第四季**完成 | [Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)、[Salesforce 投資人關係頁](https://investor.salesforce.com/news/news-details/2026/Salesforce-Signs-Definitive-Agreement-to-Acquire-Fin/default.aspx)、[TechCrunch](https://techcrunch.com/2026/06/15/salesforce-acquires-ai-customer-service-platform-fin-for-3-6b/)、[CNBC](https://www.cnbc.com/2026/06/15/salesforce-ai-customer-service-fin-acquistion.html) |
| 2026-08-26 | FY27 Q2 法說會上，Salesforce 改口稱 Contentful 與 Fin 兩案將「在未來數週內」於 **FY27 第三季**分別完成；全年指引上修的 3 億美元中，**2 億美元來自這兩樁併購的預期交割** | [Salesforce FY27 Q2 財報稿](https://www.salesforce.com/news/press-releases/2026/08/26/fy27-q2-earnings/)、[法說會重點整理](https://finance.yahoo.com/markets/stocks/articles/salesforce-inc-crm-q2-2027-050132389.html) |
| 2026-09-10 | **Salesforce 宣布完成 Fin 收購**。Fin 將成為 **Salesforce AI Labs** 的一部分，繼續服務既有客戶並持續開發 AI 模型 | [Salesforce〈Salesforce Completes Acquisition of Fin〉](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/)、[Grafa](https://grafa.com/en/news/united-states/salesforce-completes-fin-acquisition-ai-customer-agent-platform) |

從簽署到交割只花了 **87 天**。原本被評論者點名為主要風險的「監管時程」，實際上完全沒有成為障礙。

### 1.2 官方口徑與數據

Salesforce 兩份新聞稿中反覆出現的三個數字：

| 指標 | 官方數值 | 來源 | 日期 |
|------|---------|------|------|
| 交易金額 | 約 36 億美元**現金**（subject to customary purchase price adjustments） | [Salesforce 新聞稿](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)、[FY27 Q2 10-Q](https://www.sec.gov/Archives/edgar/data/1108524/000110852426000190/crm-20260731.htm) | 2026-06 / 08 |
| Fin 客戶數 | 逾 30,000 家企業 | [Salesforce 完成收購新聞稿](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/) | 2026-09 |
| 平均解決率 | 76%（端到端自主解決，無需真人介入） | 同上 | 2026-09 |

支援通道請依新聞稿分開寫：

- **交割新聞稿（2026-09-10）**列出 live chat、email、WhatsApp、SMS、voice、Slack（[完成收購新聞稿](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/)）
- **簽約新聞稿（2026-06-15）**列出 live chat、email、WhatsApp、SMS、phone、Slack（[簽約新聞稿](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)）
- 兩稿措辭不同：簽約稿用 phone，交割稿用 voice；不要混成「電話與語音」並列為同一稿內容

> **交易結構（已更新）：** FY27 Q2 Form 10-Q 寫明 Salesforce 於 2026 年 6 月簽下協議，以約 **36 億美元現金**收購 Intercom, Inc.（Fin），「subject to customary purchase price adjustments」（[10-Q](https://www.sec.gov/Archives/edgar/data/1108524/000110852426000190/crm-20260731.htm)）。earnout / 或有對價、換股比例、留任獎金規模在已審閱的 10-Q Fin 段落與 EX-99.1 中**查無**。截至 2026-09-11，EDGAR 亦**查無** 6/15 簽約或 9/10 交割專屬 Form 8-K；請引用新聞稿與 Q2 10-Q / 8-K EX-99.1。法說指引上修中的 **2 億美元**來自 Contentful 與 Fin 兩案合計（[EX-99.1](https://www.sec.gov/Archives/edgar/data/1108524/000110852426000187/crm-q2fy27xexhibit991.htm)）。

### 1.3 市場反應

- 2026-06-15 宣布當日，Salesforce 股價盤前上漲約 1%、盤中上漲約 1.5%（[Investing.com](https://www.investing.com/news/stock-market-news/salesforce-stock-slightly-higher-after-36-billion-fin-acquisition-93CH-4742294)、[Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/salesforce-stock-rises-3-6-174328992.html)）
- 分析師多維持買進評等，Canaccord Genuity 目標價 225 美元、Truist 280 美元（[GuruFocus](https://www.gurufocus.com/news/8924466/salesforce-crm-to-acquire-fin-for-36-billion-analysts-upgrade-stock)，2026-06）
- 併購案發生時，Salesforce 股價當年度已下跌約 42%（[tikr](https://www.tikr.com/blog/salesforce-stock-is-down-45-from-its-peak-heres-what-the-3-6-billion-fin-acquisition-changes)，2026-06）。這與前作備忘中「2026 YTD 一度下跌逾 30%」的描述相符，是理解 Salesforce 為何急著買成長的重要背景

### 1.4 這是 2026 年 Salesforce 併購潮的一環

Fin 並非孤例。同期 Salesforce 還簽下 Contentful（2026-06-01 簽約，2026-09-01 完成，The Information 報導金額介於 10 億至 15 億美元之間，官方未揭露；[Salesforce](https://www.salesforce.com/news/stories/salesforce-signs-definitive-agreement-to-acquire-contentful/)、[Salesforce Ben](https://www.salesforceben.com/salesforce-plans-agentic-content-layer-with-contentful-acquisition/)）。Salesforce Ben 將 Fin 稱為該年度第五樁收購。

更值得注意的是：Fin 交割當天前後，Business Insider 報導 Salesforce 正洽談以約 20 億美元收購 AI 消費者研究新創 **Listen Labs**，該公司為此放棄了一輪 15 億美元估值的募資（[TNW](https://thenextweb.com/news/salesforce-fin-acquisition-closed-listen-labs-2bn-talks)、[TechCrunch](https://techcrunch.com/2026/09/09/ai-research-startup-listen-labs-scrubbed-a-1-5b-funding-round-for-salesforce-talks/)，2026-09-09）。有分析指出 20 億美元約當其營收的 67 倍。**此案尚未簽約，可能破局，writer 只能寫成「傳聞」。**

---

## 二、Fin 是誰：從 Intercom 到 Fin 的十五年

### 2.1 公司沿革

Intercom 於 2011 年在都柏林創立，創辦人為 Eoghan McCabe、Des Traynor、Ciarán Lee 與 David Barrett（[Silicon Republic](https://www.siliconrepublic.com/business/intercom-ceo-eoghan-mccabe-karen-peacock)）。McCabe 擔任執行長至 2020 年後交棒給 Karen Peacock，2022 年 10 月回鍋（[TechCrunch](https://techcrunch.com/2022/10/06/eoghan-mccabe-the-controversial-intercom-co-founder-who-left-the-ceo-role-in-2020-is-stepping-back-in)、[Irish Times](https://www.irishtimes.com/business/2022/10/06/intercom-switch-sees-eoghan-mccabe-return-to-chief-executive-role/)）。回鍋時他的說法是「回到我們的根本、極端聚焦，以及一個我們過去從不願意下的賭注：選一條車道，並且說清楚我們不做什麼」，並公開表態要正面對決 Zendesk。

### 2.2 更名的來龍去脈

2026-05-12，Intercom 宣布公司更名為 Fin，理由是 AI 客服代理 Fin 已成為業務重心。McCabe 形容這個決定「既顯而易見又太遲」，並指出老牌公司最難的地方在於客戶永遠把它跟最初成功的市場綁在一起（[Fin Ideas](https://ideas.fin.ai/p/today-intercom-becomes-fin)、[CX Today](https://www.cxtoday.com/contact-center/intercom-rebrands-to-fin/)）。

值得注意的細節：**Intercom 這個名字並未消失**，它降格成為該公司客服軟體平台的產品名，並同步推出重建版本 Intercom 2。全部約 1,400 名員工改隸屬於 Fin 公司（來源同上，員工數為二手整理，建議 writer 加保留語氣）。

從更名到被收購，中間只隔了 34 天。

### 2.3 規模數據（多來源，數字彼此不一致，務必並陳）

| 指標 | 數值 | 來源 | 日期 |
|------|------|------|------|
| Intercom / Fin 整體 ARR | 約 4 億美元 | [Sacra](https://sacra.com/c/intercom/) | 2026-04 |
| 2025 年底 ARR | 3.82 億美元 | [Sacra](https://sacra.com/c/intercom/) | 2025-12 |
| 2024 年營收 | 3.43 億美元（Sacra 估計，年增 25%） | [Sacra](https://sacra.com/research/intercom-at-343m/) | 2024 |
| 2024 年營收（另一說） | 約 2.67 億美元 | [tikr](https://www.tikr.com/blog/salesforce-stock-is-down-45-from-its-peak-heres-what-the-3-6-billion-fin-acquisition-changes) | 2026-06 |
| Fin 產品 ARR | 逾 1 億美元，年增約 350% | [VentureBeat](https://venturebeat.com/technology/intercoms-new-post-trained-fin-apex-1-0-beats-gpt-5-4-and-claude-sonnet-4-6)、[Compare the Cloud](https://www.comparethecloud.net/news/intercom-builds-fin-beyond-customer-service-ai-agent-launches-into-sales-crosses-100m-arr) | 2026-03 起 |
| 每週處理對話量 | 逾 200 萬則 | [VentureBeat](https://venturebeat.com/technology/intercom-now-called-fin-launches-an-ai-agent-whose-only-job-is-managing-another-ai-agent) | 2026-05 |
| Fin 使用客戶數 | 約 8,000 家（含 Anthropic、DoorDash、Mercury） | 同上 | 2026-05 |
| Fin 使用客戶數（另一說） | 12,000 家 | Fin 官方行銷頁 [fin.ai](https://fin.ai/learn/fin-vs-agentforce) | 2026 |
| 整體客戶數 | 逾 30,000 家 | [Salesforce](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/) | 2026-09 |
| 淨收入留存率（NRR） | 新客戶 12 個月 NRR 從 112% 升至 146%（轉向 outcome pricing 後；**非公司 IR 財報數字**） | [Eoghan McCabe LinkedIn（2025-06-11）](https://www.linkedin.com/pulse/intercom-update-our-friends-followers-eoghan-mccabe-utbpc)；[Mostly Metrics 訪談 Dan Griggs](https://www.mostlymetrics.com/p/how-intercom-reaccelerated-growth-with-outcome-based-pricing) 為二手放大 | 2025-06 |

> **客戶數的三個版本必須並陳。** 8,000 是「實際使用 Fin AI 代理」的客戶，30,000 是「Fin 公司整體客戶基數」（包含只買 Intercom 客服軟體的），12,000 出自 Fin 自家行銷頁。使用者提供的背景說「約 3 萬 AI 客戶」，**這個說法只在 Salesforce Ben 的標題〈Adding 30K AI Customers〉出現過**，與 Salesforce 新聞稿本身的措辭（「established global customer base of more than 30,000 companies」）並不一致。writer 請用「逾 3 萬家企業客戶」，不要寫成「3 萬個 AI 客戶」。

### 2.4 解決率也有三個版本

- **76%**：Salesforce 官方新聞稿的說法，稱為 industry-leading average resolution rate
- **65% 至 70%**：Intercom 財務長受訪時給的數字，並提到剛推出時只有約 25%（[Enterprise DNA](https://enterprisedna.co/resources/ai-pulse/ai-pulse-2026-08-02-intercom-s-fin-ai-agent-is-nearing-100m-arr-roughly-half-of/)，2026-08）
- **73.1%**：Fin Apex 1.0 在自家 benchmark 上的解決率（[VentureBeat](https://venturebeat.com/technology/intercoms-new-post-trained-fin-apex-1-0-beats-gpt-5-4-and-claude-sonnet-4-6)，2026-03）

三個數字的定義基礎不同（客戶平均 vs benchmark vs CFO 口徑），writer 引用時務必標明出處與定義，不要混為一談。

### 2.5 一個容易被忽略的細節：三個月前它才剛借錢

2026 年 3 月，Intercom 向 Hercules Capital 取得 **2.5 億美元創投債**，McCabe 當時的說法是選擇債而非股權是因為「比較便宜」，而且股權選項是有的（[Sacra](https://sacra.com/c/intercom/)）。2025 年公司也曾透過員工 tender offer 釋出 1 億美元股份，The Information 報導當時談的估值是「20 億美元或以上」（同上）。

三個月後，它以 36 億美元把整間公司賣了。這個轉折是敘事上很好的鉤子。

---

## 三、主軸一：Fin 與 Claudeforce 如何拼在一起

### 3.1 時間軸的順序很重要

```
2026-05-12  Intercom 更名為 Fin
2026-06-15  Salesforce 簽約收購 Fin（36 億美元）
2026-08-26  Claudeforce 發布，Claude 成為 Salesforce 多項產品的預設模型（Agentforce 預設為 GPT-4.1，見第四輪 R5）
2026-09-01  Contentful 交割完成
2026-09-10  Fin 交割完成，納入 Salesforce AI Labs
2026-09-15  Dreamforce 2026 開幕（Moscone Center，9/15 至 9/17）；同日發表 Koa（首個 CRM reasoning model）
```

收購案在前，模型外包在後，兩者相隔 72 天，而 Fin 的交割日距離 Dreamforce 開幕只有五天。會前（2026-09-11）官方頁確認活動為 **9/15 至 9/17**（Moscone / Salesforce+）；行銷首頁主打 Claudeforce 與 Dario Amodei，**尚無 Fin 收購專題露出**。瀏覽器議程目錄搜尋則已找到兩場 **Fin 具名場次**（Intercom = 0；精確詞「AI Labs」= 0）：

1. **How Fin Delivers Over 90% Resolution Rates for Customers**（週三 9/16，2:30 至 2:50 PM PDT；Moscone South, LL, Content Pavilion, Stage 8）
2. **SMB & Startup Keynote: 5 turnkey agents, 10x results ft. Fin**（週二 9/15，3:30 至 4:20 PM PDT；Moscone West, L3, Keynote Room 3001）

「舞台道具」推論因此**被議程部分坐實**（Fin 已有具名場次）。**會後（2026-09-18）更新：** SMB Keynote ft. Fin 已有 [Salesforce+ 成片](https://www.salesforce.com/plus/experience/dreamforce_2026/series/small_and_medium_business_at_dreamforce_2026/episode/episode-s1e2)（含 Des Traynor）；Stage 8「Over 90%」場次則**查無**錄影／摘要。產品整併技術路徑公開 meta 仍未說明。另請區分 **Fin Apex（模型）** 與議程中常見的 **Salesforce Apex（平台語言）** 場次，不可混為一談。詳見「Dreamforce 2026 會後更新」。（[Dreamforce](https://www.salesforce.com/dreamforce/)、[議程目錄](https://reg.salesforce.com/flow/plus/df26/sessioncatalog/page/catalog)）

### 3.2 Fin 在堆疊裡的位置

我的判讀（**分析，非查證事實**）：Fin 仍同時卡在 Agent／應用層；模型層在 Dreamforce 後已從「Claude vs Fin Apex」擴成**三個可觀測的模型資產**。下表拆開模型層，並標明官方確認與推論。

| 層級 | 資產 | 官方確認（截至 2026-09-18） | 關係／分工（推論請標明） |
|------|------|---------------------------|--------------------------|
| **模型層：前沿／平台預設** | Claude（Claudeforce／Agentforce 等） | Claude 為多產品預設模型，並為 Atlas Reasoning Engine **可選**推理模型之一（見前作備忘）；AIforce 稿稱 Claudeforce **all customers in beta**，主範圍偏銷售 | 與 Koa／Fin Apex **並存**而非官方宣告取代；三者之間**查無**完整官方分工聲明 |
| **模型層：客服垂直** | Fin CX Model Suite（含 Fin Apex 1.0） | 交割稿保留 Fin model suite；七 agent 稿把 Fin Apex 掛在 **Fin** agent 下；組織掛鉤為 **Salesforce AI Labs**（交割稿） | Everest（2026-06）稱 Apex 有助「降低對前沿實驗室 API 依賴」屬**分析**；**查無**官方「Fin Apex 負責客服、Claude 負責其他」句；**查無**與 Koa 整併訊號 |
| **模型層：CRM 平台推理（會期新增）** | **Koa** | 官方定位為 Salesforce **first CRM reasoning model for Agentforce**，built on **NVIDIA Nemotron**（Nemotron 3 Super post-train）；產品頁列為 Agentforce／Setup **可選 model provider（第四家）**、opt-in；weights 與 inference 在 Salesforce trust boundary；組織敘事掛 **AI Research**（技術故事／arXiv），**不是** AI Labs | **查無**官方「Koa 進入 Atlas」聲明；**查無**「取代 Claude」；**查無**「Koa 管 CRM、Fin Apex 管客服」分工；「租／買／造」三層＝**本研究框架，非官方戰略名**（詳見會後更新「Koa 與三層模型策略」） |
| **Agent 層** | Fin 開箱客服代理（官方平均解決率 76%） | 交割稿與七 agent 名單並存 Casey／Fin | 與 Agentforce Service Agent／Help Agent（Casey）高度重疊；合併路徑**查無** |
| **應用層** | Intercom 2 客服平台、逾 3 萬家客戶、SMB 通路 | 收購稿：Fin fast-to-value especially well-suited for SMB and some commercial | 與 Service Cloud 部分重疊，補中小企業市場；屬產品組合敘事 |

Everest Group（2026-06，**早於 Koa**）把 Fin 講成：把 Agentforce 往下延伸到企業級銷售模式服務不到的 SMB／中型市場，並帶來已跑通的 outcome-based 定價；同時稱 **Fin 自有 Apex 讓 Salesforce 擁有自己掌控的客服專用模型，降低對前沿實驗室 API 的依賴**（[Everest Group](https://www.everestgrp.com/blogs/salesforce-built-the-foundation-fin-brings-the-intelligence)）。**不可**把該句偷渡成 Everest 已評 Koa。

### 3.3 Fin 的模型策略：一段完整的「先外包、再自研」路徑

這是全篇最有價值的一條線，也是與前作 Claudeforce 備忘呼應最緊的一段。

**第一階段（2023）：用 OpenAI。** 初代 Fin 建立在 OpenAI 模型上。

**第二階段（2024-10）：換成 Claude。** Fin 2 發布，改用 Anthropic Claude 3.5 Sonnet。共同創辦人暨首席策略長 Des Traynor 在官方部落格原文寫道：「We landed on Claude for one simple reason: it delivers.」（[Intercom Blog〈Fin 2: Powered by Anthropic's Claude LLM〉](https://www.intercom.com/blog/fin-2-powered-by-anthropic-claude-llm/)，2024-10；[The Letter Two](https://thelettertwo.com/2024/10/12/intercom-releases-fin-2-ai-agent-switching-anthropic-from-openai/) 為二手轉述）。

**第三階段（2026-03）：自己做模型，並且公開宣稱贏過 Claude。** Fin Apex 1.0 發布。官方 Apex 部落格寫明：先前核心回答模型一直是前沿實驗室產品（先是 GPT 系列，後來是 Sonnet 4.0），現在核心回答模型改為 Apex 1.0；文中並討論 open-weight 基座與 post-training 的產業意涵。**一手 Fin / Intercom 文本未公開具名基座，也未見「數千億參數」逐字表述**；若引用參數規模，只能標為二手（如 VentureBeat）或直接略過（[Intercom Blog〈Announcing Fin Apex〉](https://www.intercom.com/blog/announcing-fin-apex-the-age-of-vertical-models-is-here/)，2026-03-26）。[fin.ai/cx-models](https://fin.ai/cx-models) 圖表數據為：Fin Apex 1.0 **73.1**、Claude Opus 4.5 **71.1**、GPT-5.4 **71.1**、Claude Sonnet 4.6 **69.6**；官方另稱相較 Sonnet 4.6，解決率高 2.8%、首 token 快 0.6 秒、幻覺少 **65%**（對照對象是 **Sonnet 4.6，不是 4.0**）。獨立第三方複現 73.1% 數字截至 2026-09-11 **查無**。

> **警告：Fin 自家的兩組數字對不起來。** 圖表的 73.1 對 69.6 是 **3.5 個百分點**（相對差 5.0%），與文案宣稱的「解決率高 2.8%」兩種讀法都湊不出來（2.8 個百分點會是 72.4，相對 2.8% 會是 71.5）。這兩個數字同時出現在 Fin 官方頁面上，但顯然出自不同批次的測量或不同的基準集。**writer 請擇一使用，不要把它們寫成同一個比較**；若要同時提及，必須說明兩者出處不同。這個矛盾本身也可以當成「vendor benchmark 不可盡信」的佐證。

Fin 的模型套件不只 Apex，而是七個各司其職的模型，包括 Escalation Router（採 multi-task ModernBERT 架構，決定要繼續、提議轉真人還是直接升級）、Retrieval、Reranker、Issue Summarizer 等（[The AI Economy](https://theaieconomy.substack.com/p/intercom-fin-api-platform-developers)、[fin.ai CX Models](https://fin.ai/cx-models)）。2026 年 4 月，Fin 進一步開放 Fin API Platform，讓開發者取用 Apex、RAG、Retrieval 與 Reranker（[The Letter Two](https://thelettertwo.com/2026/04/03/intercom-fin-api-platform-developers/)）。

**第四階段（2026-09 起）：併入 Salesforce。** Constellation Research 指出，Fin Apex 將加入 Salesforce AI Research 既有的模型陣容，與 xLAM（大型行動模型）和 xGen-Sales 並列（[Constellation Research](https://www.constellationr.com/research/blog/hot-take-salesforce-acquires-fin-and-leaves-us-reading-between-agentic-lines)，2026-06）。而 9 月 10 日的官方新聞稿則說 Fin 進入 **Salesforce AI Labs**，並將「持續打造定義市場的 AI 模型與技術」。

> **注意：** Constellation 說的是 Salesforce AI Research，交割新聞稿說的是 Salesforce AI Labs。**兩者不可逕自等同。** [Salesforce AI Research](https://www.salesforce.com/ai-research/) 有獨立說明頁；`salesforce.com/ai-labs/` 於 2026-09-11 查核為 **404**，亦查無 AI Labs 成立公告。writer 請直接引用交割稿「Salesforce AI Labs」，不要自行解釋它等於 AI Research。

### 3.4 核心張力：Fin 的模型決策會不會被 Claudeforce 覆蓋

**已查證的事實面：**

- Claudeforce 讓 Claude 成為 Slack AI、Slackbot、Agentforce Vibes、Agentforce Coworker 與 Headless 360 的預設模型，並成為 Atlas Reasoning Engine 可選的推理模型之一（見[前作備忘第 1.5 節](./2026-08-27-memo-salesforce-claudeforce-research.md)）
- Salesforce 持有的 Anthropic 股權於 2026 年 6 月價值約 50 億美元（[Bloomberg](https://www.bloomberg.com/news/articles/2026-06-01/salesforce-investment-in-anthropic-is-valued-at-about-5-billion)）
- Salesforce 官方新聞稿在收購時明確保留 Fin 的模型：「powered by the Fin model suite, the company's proprietary AI models trained specifically for customer experience」（[Salesforce](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/)，2026-09-10）
- Marc Benioff 在 All-In podcast 口述估計 2026 年 Salesforce 將使用約 **3 億美元** Anthropic tokens（主要談 coding），由 Business Insider 報導（[BI 2026-05-16](https://www.businessinsider.com/marc-benioff-salesforce-anthropic-spend-tokens-slack-2026-5)）。**這是執行長口述估計，不是 SEC 10-K/Q 或財報稿的列帳科目**；Q2 EX-99.1 / 10-Q 的 Fin 相關段落亦未寫入此數字。writer 引用時必須標「執行長口述估計」，不可寫成已審定支出。

**我的分析（非查證事實）：**

會前兩步棋拼起來，仍像**分層外包、分層自持**：把通用推理外包給 Anthropic（Claudeforce），用 36 億美元現金買下客服垂直的專用模型與現成代理（Fin／Fin Apex），把「解決率」這個能收費的指標握在自己手上。

Dreamforce 同日發表 **Koa** 之後，可觀測圖像變成**三套模型敘事**（仍非官方自我命名）：

1. **租（Claude）**：前沿推理／預設模型與 Claudeforce 通路；官方強調並存與可選，而非「只認一家」。
2. **買（Fin Apex）**：收購進來的 CX／客服垂直模型，掛在 Fin agent 與 **AI Labs**。
3. **造（Koa）**：在 Nemotron 開源權重上 post-train 的 CRM reasoning model，Salesforce 控制 weights、推理在 trust boundary；掛 **AI Research**／Agentforce 可選 provider。

原備忘的「Claudeforce 租腦、Fin 買手」比喻**至多描述前兩層**；少了「造」就無法解釋會期新增的 Koa。該比喻與「租／買／造」三層一樣，是**分析框架，不是 Salesforce 官方戰略聲明**（截至 2026-09-18 **查無**官方用 rent／buy／build 或「三層模型策略」自我描述）。

架構合理性（推論）：客服仍是 Benioff 證明 AI ROI 的重要櫥窗（自家客服團隊從約 9,000 人縮減到約 5,000 人，見前作備忘第 3.4 節）；Fin 把成果收費握在自己手上。Koa 則回應另一類風險：高頻 CRM multi-step 若長期只靠 frontier token，控制權、traces 與成本敘事（媒體 tokenomics，**非**官方定價承諾）都偏弱。官方 Why We Post-Trained 強調的是 trust boundary 與「alongside frontier LLMs」，不是「脫離 Anthropic」。

風險則在於：**同一公司現在同時講三套模型故事**。對客戶說 Claude 是預設／前沿推理；Fin 自家 benchmark 說 Apex 在客服場景贏過 Claude；Koa 的 PR 說在自家 CRM Bench 上 matches or exceeds leading model performance with three times fewer errors（**未點名** Claude／GPT），而同公司 arXiv 論文又承認 Koa remaining below the strongest frontier models。三句話可以並存（場景不同、基準不同），但產品訊息設計難度比兩套更高。**Claude vs Fin Apex、Koa vs Claude、Koa vs Fin Apex 的官方點名分工截至 2026-09-18 皆查無**（見會後更新 T3 與「Koa 與三層模型策略」）。

**還有一個諷刺的層次：Anthropic 自己是 Fin 的客戶。** 現行官方案例頁（核實於 2026-09-11）公布每月逾 **56 萬**次 Fin resolutions、**79%** resolution rate、**63%** automation rate；正文並寫 Fin 介入 **80%** 的進來查詢，再以 79% 解決率端到端處理約 63% 的支援量。**舊備忘的 58% 解決率與節省 1,700 小時已不在現行一手案例頁**，不可再當現況數字。也就是說，Salesforce 買下的公司，是它最大模型夥伴的客服供應商；而這家公司又發表 benchmark 說自己的模型比那個夥伴的模型好。會期再疊上 TechCrunch「AI labs should fear」與同稿「isn’t exactly abandoning Anthropic」的並讀，諷刺三角變成可寫的開場，但 Anthropic **查無**對 Koa 的官方回應。

> **這一段仍是全篇最強的敘事素材；round 3 起請用「三套敘事＋租買造為分析框架」鋪陳，勿寫成官方戰略名。**

---

## 四、主軸二：競爭格局與定價衝擊

### 4.1 賽道現況（截至 2026 年 9 月）

| 玩家 | 定位 | 關鍵數據 | 來源 |
|------|------|---------|------|
| **Fin（Salesforce）** | AI 原生客服代理 + 客服平台，helpdesk 無關 | 整體 ARR 約 4 億美元；Fin 產品 ARR 逾 1 億、年增約 350%；每週逾 200 萬則對話 | [Sacra](https://sacra.com/c/intercom/)、[VentureBeat](https://venturebeat.com/technology/intercom-now-called-fin-launches-an-ai-agent-whose-only-job-is-managing-another-ai-agent) |
| **Sierra**（Bret Taylor） | AI 原生代理平台，主打大型企業 | 2026-05 募資 9.5 億美元，投後估值逾 150 億美元；ARR 由 2025-11 的 1 億美元、2026-02 的 1.5 億美元增至 2026 年的 2 億美元；宣稱逾 40% 的 Fortune 50 為客戶 | [TechCrunch](https://techcrunch.com/2026/05/04/sierra-raises-950m-as-the-race-to-own-enterprise-ai-gets-serious/)、[TechCrunch](https://techcrunch.com/2025/11/21/bret-taylors-sierra-reaches-100m-arr-in-under-two-years/)、[Sacra](https://sacra.com/c/sierra/) |
| **Decagon** | AI 原生客服代理 | 2026-01 募資 2.5 億美元，估值升至 45 億美元（Coatue、Index 領投）；ARR 由 2025 年底的 4,400 萬美元增至 2026-07 的約 1 億美元 | [Bloomberg](https://www.bloomberg.com/news/articles/2026-01-28/ai-customer-support-startup-decagon-valued-at-4-5-billion)、[Sacra](https://sacra.com/c/decagon/) |
| **Zendesk** | 老牌客服軟體，2022 年下市 | 2025 年底 AI ARR 約 2 億美元、約 2 萬家客戶使用其 AI 產品；自 2022 年下市後整體營收 CAGR 約 8%；2026-03 收購 Forethought；2026-04 推出 resolution pricing | [SQ Magazine](https://sqmagazine.co.uk/zendesk-statistics/)、[The AI Economy](https://theaieconomy.substack.com/p/zendesk-ai-arr-2026-growth)、[Futurum](https://futurumgroup.com/insights/zendesk-bets-on-autonomous-ai-agents-outcome-pricing-to-upend-service-models/) |
| **Freshworks** | 上市 SaaS，Freshdesk 產品線 | FY2026 Q2（截至 2026-06-30）營收 2.374 億美元，年增 16%；上半年 4.66 億美元，年增 16% | [Freshworks 10-Q（SEC）](https://www.sec.gov/Archives/edgar/data/0001544522/000154452226000137/frsh-20260630.htm) |
| **Agentforce（Salesforce 自家）** | 企業級可客製代理平台 | FY27 Q2 ARR 逾 15 億美元、年增逾 240%（口徑本季起納入 AI offerings、Slackbot 與 Headless 360） | [Salesforce FY27 Q2 8-K](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm) |

> Bret Taylor 的雙重身分值得一提：他同時是 OpenAI 董事長與前 Salesforce 共同執行長（[TechCrunch](https://techcrunch.com/2026/05/04/sierra-raises-950m-as-the-race-to-own-enterprise-ai-gets-serious/)）。Salesforce 花 36 億美元買下的，正是它前任共同執行長現在正面對決的市場。

### 4.2 定價：三家的每次解決價碼

這是本次研究中最乾淨、最能量化的一組對比。

| 廠商 | 定價模式 | 單價 | 來源 |
|------|---------|------|------|
| **Fin** | 純 outcome-based | **每次成果 0.99 美元**（resolutions、procedure handoffs、disqualifications 各 0.99；qualifications 9.99）。每月最低 50 outcomes；另有 minimum commitments | [fin.ai/pricing](https://fin.ai/pricing)（2026-09-11 核實） |
| **Zendesk** | Automated Resolutions | 承諾量 **1.50 美元 / 次**（committed），隨用隨付 **2.00 美元 / 次**（pay-as-you-go）；數字嵌於官方定價頁 feature fragments | [zendesk.com/pricing](https://www.zendesk.com/pricing/)（2026-09-11 核實） |
| **Agentforce** | Conversations 模式 | **2 美元 / 對話**（仍在） | [salesforce.com/agentforce/pricing](https://www.salesforce.com/agentforce/pricing/)（2026-09-11 核實） |
| **Agentforce** | Flex Credits | 每個 action 20 credits；10 萬 credits 售價 500 美元；Voice action 30 credits | 同上 |
| **Salesforce Help Agent** | Help Agent Resolutions | **2 美元** / resolution（官方定價頁列名 Help Agent Resolutions） | 同上；負評不收費等細節另見 [CMSWire](https://www.cmswire.com/contact-center/salesforce-debuts-help-agent-with-payperresolution-ai/) 等二手整理 |

Everest Group 直接點名了這個價差的意義：Agentforce 每次對話 2 美元的表訂價，招來的正是「費用不可預測」的抱怨，而 Fin 的 0.99 美元每次解決正好是這個抱怨的答案（[Everest Group](https://www.everestgrp.com/blogs/salesforce-built-the-foundation-fin-brings-the-intelligence)）。

**我的分析：** Salesforce 買下的與其說是一個產品，不如說是一套**已經被市場驗證過的計價語言**。Eoghan McCabe 在 LinkedIn（2025-06-11）稱**新客戶** 12 個月 NRR 從 112% 升到 146%；此數字屬執行長訪談／公開貼文口徑，**不是公司 IR 財報**，Mostly Metrics 對 CFO Dan Griggs 的訪談為二手放大。若寫進文章，請標明「新客戶 NRR」與來源層級。即便如此，它仍是 outcome-based 定價「不一定侵蝕收入」的有力敘事素材，可對照前作備忘第 7.3 節對座位收入侵蝕的疑慮。

### 4.3 產業定價的大勢

- Cruxy 於 2026 年 4 月訪問 300 位 SaaS 執行長，**97% 計畫在兩年內淘汰席次制定價**
- Kyle Poyar 的 2026 State of B2B Monetization 調查（逾 230 家軟體公司）顯示，**37% 以混合式（hybrid）為主要結構**，是最常見的選擇，做法是可預測的席次費加上 AI 功能的 credit 計費
- Gartner 預測到 2030 年，至少 **40% 的企業 SaaS 支出**會轉向用量、代理或成果計價

來源：[Digital Thought Disruption](https://digitalthoughtdisruption.com/2026/08/18/saas-pricing-reset-ai-agents-renewal-strategy/)、[Monetizely](https://www.getmonetizely.com/blogs/the-2026-guide-to-saas-ai-and-agentic-pricing-models)、[Deloitte Technology Spotlight](https://dart.deloitte.com/USDART/home/publications/deloitte/industry/technology/accounting-outcome-based-pricing-agentic-ai)（2026-06-04）。

> **注意：** Cruxy 的 97% 與「Black February 蒸發逾 1 兆美元市值」這兩個數字皆來自二手部落格彙整，非一手調查報告或財經媒體。建議 writer 只用 Gartner 與 Deloitte 的版本，或對其餘數字加註「據業界調查」。

### 4.4 對競爭者的直接影響

**Zendesk 的處境最尷尬。** 論據有二。第一，Salesforce 用 36 億美元買下一家整體 ARR 約 4 億美元的 AI 原生挑戰者，而 Zendesk 這家 2022 年以 100 億美元下市、營收規模大得多的老牌廠商，年複合成長率只有約 8%。市場等於直接標定了「AI 原生 4 億美元營收 > 傳統客服 更大營收」的相對估值（[digitalapplied 分析](https://www.digitalapplied.com/blog/salesforce-acquires-fin-intercom-3-6b-ai-customer-service-analysis)）。第二，也是更實際的：**Fin 是 helpdesk 無關的疊加層，本來就可以掛在 Zendesk 上面跑**（[fin.ai](https://fin.ai/learn/fin-vs-zendesk)、[Intercom Help](https://www.intercom.com/help/en/articles/10118495-fin-for-platforms-explained)）。現在 Zendesk 客戶的 AI 層供應商，變成了 Salesforce。

Zendesk 並非毫無作為：2026 年 3 月收購 Forethought，4 月推出 resolution pricing，執行長 Tom Eggemeier 主推的「resolution pricing」與 Fin 的模式高度相似（[Futurum](https://futurumgroup.com/insights/zendesk-bets-on-autonomous-ai-agents-outcome-pricing-to-upend-service-models/)、[Diginomica](https://diginomica.com/zendesk-relate-2026-resolution-platform-ai-driven-service-delivery)）。

**Sierra 與 Decagon 的估值邏輯受到什麼影響，可以正反兩面說。** 負面看法是：它們現在對抗的不再是一家創投支持的獨立廠商，而是一個 ARR 4 億美元的產品加上 Salesforce 的通路（[digitalapplied](https://www.digitalapplied.com/blog/salesforce-acquires-fin-intercom-3-6b-ai-customer-service-analysis)）。正面看法是：36 億美元為這個賽道設下了一個明確的併購價格錨點，Sierra 的 150 億美元、Decagon 的 45 億美元估值，因此有了可對照的退出情境。

**我要提醒 writer：** 「Zendesk 被逼到牆角」「Sierra 估值邏輯受衝擊」這兩個判斷目前**只有分析部落格在講，沒有找到 Zendesk 或 Sierra 官方的回應，也沒有找到彭博 / 路透層級的追蹤報導**。請寫成推論，不要寫成事實。

### 4.5 監管風險：有區域申報紀錄，但未拖慢交割

- 交易於 2026-06-15 簽署時，官方措辭是「須滿足慣例成交條件，包括取得必要的法規許可」
- 實際結果：**87 天完成交割，比原訂時程提早一整季**
- **美國 FTC Early Termination / 歐盟 Merger Register / 英國 CMA：** 截至 2026-09-11 **查無** Salesforce / Fin / Intercom 專屬公開申報或 ET 紀錄。**查無 ≠ 未提 HSR**；等待期也可能期滿但未刊登 ET
- **德國 Bundeskartellamt：** 二手財經電訊報導約 2026-06-29 有 Anmeldung，Aktenzeichen **B7-50/26**（Salesforce / Intercom）；官方 clearance PDF 本輪未獨立取回（[finanznachrichten.de](https://www.finanznachrichten.de/nachrichten-2026-07/68935478-laufende-fusionskontrollverfahren-salesforce-inc-san-francisco-usa-mittelbarer-anteils-und-kontrollerwerb-ueber-die-intercom-inc-fin-san-f-019.htm)）
- **澳洲 ACCC：** MergerLoop 彙整 matter **MN-40031**，約 2026-07-28 送件，**Phase 1 於 2026-08-21 核准**（[MergerLoop](https://www.mergerloop.com.au/deals/MN-40031/salesforce-intercom)）

writer 可寫「主要法域未見公開阻擋，交割反而提前；至少德國有申報電訊、澳洲 ACCC Phase 1 已核准」。**不要**寫成「完全沒申報」或「FTC / 歐盟已放行」。

**我的分析：** 提前交割這件事本身就是最好的答案。Salesforce 在 8 月 26 日法說會上就已把 2 億美元的併購貢獻（Contentful + Fin 合計）寫進全年指引，等於在財報上先押了寶；9 月 1 日 Contentful、9 月 10 日 Fin 接連完成，時程精準對上 9 月 15 日 Dreamforce。這是被行銷日程倒推的交割節奏。

---

## Dreamforce 2026 會後更新

> 核實日：2026-09-18（Asia/Saigon）。活動：Dreamforce 2026，2026-09-15 至 09-17，已結束。來源層級：T1＝Salesforce／SEC 官方；T2＝一線媒體原文；T3＝產業媒體。以下各項皆標日期與層級；查不到寫「查無可靠來源」。

### T1 產品改名（會前網站更名，非會期新聞稿）

改名**確實發生在行銷官網上**，時間點約為 Dreamforce 前一週（約 2026-09-08 至 09-14），屬**會前網站更名**。Salesforce **沒有**發布「我們拿掉 Agentforce 前綴」的官方新聞稿；主源為 *The Information* 獨家（付費牆，本輪未能讀全文），由 [The Next Web（2026-09-14）](https://thenextweb.com/news/salesforce-drops-agentforce-branding-product-names-dreamforce) 等轉載並核對 live 頁（T2）。

截至 2026-09-18 官網現況（T1）：

| 項目 | 現況 | 狀態 |
|------|------|------|
| Sales Cloud | 官網主名已復為 **Sales Cloud**；文案中仍可見「Agentforce Sales」作能力描述 | 一致（TNW＋官網） |
| Agentforce 360 | **保留**該名稱（含產業變體） | 一致 |
| Fin | **品牌明確保留**（交割稿、2026-09-11 七 agent 名單、fin.ai） | 一致 |
| 「約兩打」產品去 Agentforce 前綴 | 僅媒體數字；**無公開完整對照表** | 部分一致／查無完整表 |
| 官方改名原因說明 | **查無可靠來源**（TNW：發言人未回應） | 查無 |

**Headless 360 不可寫成單一乾淨的「改回 Salesforce Platform」。** 三套說法並存：

1. **The Information 系（T2 轉述，TNW 核對）**：Headless 360 Platform → **Salesforce Platform**；平台頁標題為 Salesforce Platform，且頁上不見「Headless 360」字樣。
2. **Salesforce Ben（T3，引述 Help）**：稱自 **2026-09-04**，Headless 360 **rebranded to AIforce**；本輪未能直接打開該 Help 條目原文。**第四輪（2026-09-27）已讀 Help 原文，升級為 T1**：[Salesforce Help〈AIforce〉版本說明](https://help.salesforce.com/s/articleView?id=release-notes.rn_headless360.htm&release=264&type=5)寫「As of September 4, 2026, Headless 360 has been rebranded to AIforce.」
3. **Dreamforce 官方 AIforce 稿（T1，2026-09-15）**：定位 AIforce 為 live interface layer，寫「**AIforce is powered by the Headless Toolkit**」，**沒有**寫「Headless 360 已更名為 Salesforce Platform」或「Headless 360＝AIforce」。

**寫作建議（2026-09-27 依第四輪修訂）：** 可寫「Salesforce 官方說明文件寫明，Headless 360 自 2026-09-04 起改名為 AIforce；Salesforce 沒有為此發布新聞稿」。**不要**寫「官方宣布 Headless 360 改回 Salesforce Platform」。TNW 報導的平台頁改名 Salesforce Platform 可並陳，但它與「改名 AIforce」的關係官方未說明，不要替兩者下結論。前作已加註（見交接備註 T8）。

### T2 Casey 與 Fin 的分工

- **Casey 是 Help Agent 的具名／persona 包裝**，不是另一套引擎。官方句式為 *“Casey, your help agent”*；小企業部落格明寫 *“Casey is the friendly name for a Help Agent”*（[SMB blog 2026-09-14](https://www.salesforce.com/blog/small-business/meet-your-digital-teammate-for-service-agent/)，T1）。
- **七個具名 agent 於 2026-09-11（會前）發布**，不是 Dreamforce 會期首發（[job-ready agents 稿](https://www.salesforce.com/news/stories/agentforce-job-ready-ai-agents/)，T1）。名單含 Casey、Paige、Carter、Hunter、Marshall、Piper、**Fin**；Fin 條目點名 Operator 與 **Fin Apex**。
- **市場分段**：2026-06-15 收購稿有官方措辭：Fin 的 fast-to-value **especially well-suited for SMB and some commercial**；與 Agentforce **deeply customizable**／**enterprise-scale** 互補。這是 **Fin vs Agentforce（平台／客製）**，不是官方一句「Fin＝SMB、Agentforce Contact Center＝enterprise」的對位口號。Contact Center 對位表本輪**查無** Dreamforce 正式官方稿。
- **500 萬次對話**：Customer Zero 頁寫的是 **Agentforce on Help／Salesforce Help** 累計逾五百萬次；**不是**在該頁寫「Casey」。勿把 Customer Zero 數字直接等同「Casey 對外客戶部署量」。
- **合併路徑：查無可靠來源。** 交割稿與 9/11 稿皆為 choice／portfolio／complement。

### T3 Fin Apex 與 Claude 的分工

- **截至 2026-09-18，Dreamforce 官方材料中查無**「Fin Apex 負責客服、Claude 負責銷售／推理」這類明確分工聲明。備忘第 7.3 條「不要斷言 Fin Apex 會不會取代 Claude」**應保留**。
- **Claudeforce／Salesforce in Claude**：AIforce 稿（2026-09-15，T1）稱 **now available to all customers in beta**；**37 prebuilt sales skills**；service／marketing／commerce skills「in the near future」。亦即 broad beta **主範圍是銷售**，客服場景**尚未**列為已含。
- **AIforce 首發三件套**：Claudeforce、Slackforce、Agentforce Coworker。**Fin 未出現在 AIforce 首發三件套**。Fin 歸屬官方表述仍為 **Salesforce AI Labs**（交割稿）；**查無**「Fin Apex 納入 Salesforce AI Research」一手聲明。
- **Techzine 標題易誤導**（T3）：主體是 Salesforce＋NVIDIA 的 **Koa** CRM reasoning model，旁論 Fin Apex／Casey；**不是**官方「自建模型取代 Claude」聲明。Koa 與 Fin Apex 不可混為一談；完整 K1/K6 見下節「Koa 與三層模型策略」。

### T4 定價：席次制沒有被成果計價取代（雙軌）

**席次制沒有被成果計價取代。** 實際圖像是雙軌（以官方定價頁為準，2026-09-18）：

| 產品／項目 | 模式 | 單價（USD） | 來源 |
|------|------|-------------|------|
| Sales Cloud **Core** | 席次／年付 | **$195**/user/month | [sales pricing](https://www.salesforce.com/sales/pricing/)；[editions 稿 2026-09-03](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/)（T1） |
| Sales Cloud **Advanced** | 席次／年付 | **$395**/user/month | 同上 |
| Sales Cloud **Max** | 席次／年付 | **$550**/user/month | 同上 |
| Core 內含 | Slack Business+、Tableau Next、**500K Flex Credits／org／year** | 捆綁 | 定價頁 |
| Help Agent Resolutions（Casey） | 按 resolution | **$2** | [Agentforce pricing](https://www.salesforce.com/agentforce/pricing/)（T1）；Service 分層文案用 Casey 名 |
| Agentforce Conversations | 按 conversation | **$2** | 同上 |
| Fin | per outcome | **$0.99** | [fin.ai/pricing](https://fin.ai/pricing)；**查無**交割後官方改價聲明 |

Editions 稿（**會前** 2026-09-03）把 Slack、Tableau Next、credits、部分 agent 能力折回 Core／Advanced／Max 席次。官方 Agentforce 定價頁並列 consumption-based **or per-user licensing**。

產業媒體（SalesforceDevops.net，T3，2026-09-14）記載 legacy Enterprise list **$175**、Unlimited **$350**，故 Core／Advanced 約＋11%／＋13%；**非官方自己標的漲幅百分比**。若寫漲幅請標 T3 計算。

**對角度 B 的含義：** 應改寫為「敘事上推 outcomes，帳單上回收席次」，不是單向的席次制崩解。見 7.1。

### T5 Dreamforce 主要發表（一手核實）

| 項目 | 結果 | 來源與層級 |
|------|------|------------|
| **AIforce**＝live interface layer；疊在 Data 360／Customer 360／Agentforce 之上；**Zero Data Retention** | 確認 | [AIforce 公告 2026-09-15](https://www.salesforce.com/news/stories/aiforce-announcement/)（T1） |
| Claudeforce／Salesforce in Claude 進入 **all customers in beta** | 確認；台上轉寫另用 “open beta” | 同上＋keynote 轉寫／Salesforce Ben（T3） |
| Hunter 上季約 **$500M pipeline** | 台上宣稱（轉寫）；官方新聞稿未見此句；轉寫對 Hunter vs Hunter+Piper 歸因不一 | Singju 轉寫／Ben 摘要（T3） |
| Hunter **$2B annualized** | **非 Benioff 原話**；為媒體把 $500M×4 的外推 | [G2／Tim Sanders 2026-09-16](https://learn.g2.com/dreamforce-2026-keynote-recap) |
| Fin「逾 **30,000** 家企業」 | 交割官方稿，穩 | [交割稿 2026-09-10](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/)（T1） |
| Agentforce「over **30,000** customers on this platform」 | 會期台上口徑；**官網 metrics 頁仍寫 25,000+**（抓取 2026-09-18） | 轉寫／Ben；[Agentforce metrics](https://www.salesforce.com/eu/agentforce/metrics/) |
| Fulton Bank **80,000 hours**／**$389M** loans/deposits | **僅見** Salesforce Ben Agentforce keynote 摘要（T3）；官方 AIforce 稿僅有 Coworker 引言（約 20 use cases、3,000 users），**未**寫此二數字 | Ben 2026-09-16；勿升格為已刊官方數字 |

**兩個 30,000 必須分開。** Fin 30k＝被收購方既有全球客戶基數；Agentforce 30k＝平台上線客戶（台上）並與官網 25k+ 並陳。

### T6 Fin 在 Dreamforce 台上

| 場次 | 結果 |
|------|------|
| **SMB & Startup Keynote: 5 turnkey agents, 10x results ft. Fin**（9/15，Room 3001） | **已舉行**；[Salesforce+](https://www.salesforce.com/plus/experience/dreamforce_2026/series/small_and_medium_business_at_dreamforce_2026/episode/episode-s1e2) 已上架 Replay。官方文案：Fin＝five turnkey agents 中的 newest，對象為 SMB leaders；講者含 **Des Traynor**。公開 meta **未說明**產品整併技術路徑。 |
| **How Fin Delivers Over 90% Resolution Rates for Customers**（9/16，Stage 8） | **查無可靠來源**確認實際開講；**查無**錄影、官方摘要或可信現場稿。Salesforce+ 系列資料找不到此標題／Stage 8。「Over 90%」本場次無一手定義；**維持**兩個 90% 為最佳案例／標題用語、非平均值。 |

### 會前 vs 會期（防混淆）

| 日期 | 性質 | 與本節相關 |
|------|------|------------|
| 2026-09-03 | 會前 | Core／Advanced／Max editions＋席次捆綁 |
| 2026-09-04 | 會前（Help 原文，T1，第四輪核實） | Help 稱 Headless 360→AIforce |
| 約 2026-09-08 至 14 | 會前 | 網站拿掉多個 Agentforce 產品前綴（媒體） |
| 2026-09-10 | 會前 | Fin 交割；進 AI Labs |
| 2026-09-11 | 會前 | 七具名 agents（含 Casey、Fin） |
| 2026-09-15 至 17 | **會期** | AIforce；Claudeforce broad beta；Koa；SMB Keynote ft. Fin |

### Koa 與三層模型策略

> round 3 核實日：2026-09-18（Asia/Saigon）。範圍：僅補 Koa／三層模型缺口，不重查前兩輪 Fin／Claudeforce 已確認事實。T1＝Salesforce／NVIDIA／SEC；T2＝一線媒體；T3＝產業媒體。**租／買／造三層＝本研究分析框架，查無 Salesforce 官方以此自我描述。**

#### K1 官方定位與規格（T1）

- **定位句**（[Koa PR 2026-09-15](https://www.salesforce.com/news/press-releases/2026/09/15/koa-reasoning-model/)）："Salesforce's first CRM reasoning model for Agentforce, built on NVIDIA Nemotron."；"purpose-built to help agents reason through complex, multistep workflows and use the right tools to get work done."
- **基座與 post-train**：built by post-training **NVIDIA Nemotron 3 Super** with a proprietary synthetic dataset；方法含 SFT 與 GRPO（NVIDIA NeMo RL／Gym／AutoModel）。Why We Post-Trained 稱 Nemotron 3 Super 為 120B open model，並寫 "co-engineered Koa with NVIDIA"（[Why We Post-Trained 2026-09-16](https://www.salesforce.com/news/stories/why-we-post-trained-our-own-reasoning-model/)）。
- **27 年／nearly three decades**：官方並用 "27 years of Salesforce CRM intelligence" 與 "nearly three decades of CRM deployments"；訓練語料為 **synthetic scenarios**，PR 明寫 "No customer data was used"。
- **Benchmark**：PR 寫 "Salesforce's CRM benchmark"；NVIDIA blog／產品頁用專名 **CRM Bench**。arXiv（[2609.15066](https://arxiv.org/abs/2609.15066)，Submitted 2026-09-14，單位 Salesforce Agentforce & AI Research）將其與公開 Tau2Bench／BFCL 並列，屬 **vendor 自建／自發布**，不是獨立產業標準。
- **「three times fewer errors」**：PR／產品頁寫 matches or exceeds leading model performance on CRM actions with **three times fewer errors**；**未點名** Claude、GPT、ChatGPT。產品頁另給相對 "today's default general intelligence models" 的指標，仍未點名型號。
- **論文 nuance（同公司，須分層）**：CRM Bench Weighted Avg 例：GPT-5.5 0.90、Claude Opus 4.8 0.87、**Koa 0.86**、基座 Nemotron 0.84、GPT-4.1 0.81。摘要："surpasses a strong proprietary baseline while remaining below the strongest frontier models."（baseline 正文點名 GPT-4.1）。論文**未出現** "three times fewer errors"。Tau2Bench 上 Koa 亦落後 GPT-5.5／Opus 4.8。
- **獨立第三方複現**：截至 2026-09-18 **查無可靠來源**。管制比照 Fin Apex：勿把 CRM Bench／3x 當中立第三方評測。

#### K2 與 Claude 的分工

- **Atlas**：官方 PR／Why We Post-Trained／NVIDIA blog／產品頁全文 **查無** "Atlas"＋Koa。截至 2026-09-18 **查無**「Koa 進入 Atlas Reasoning Engine」官方聲明。
- **可選並存（官方訊號）**：產品頁稱 **fourth model provider** options in Setup、customers **opt-in**；NVIDIA blog：customer-selectable model in Agentforce；PR：Salesforce-hosted option。
- **最接近的官方編排句**（Why We Post-Trained，**未點名 Claude**）：orchestrating purpose-built models **alongside frontier LLMs**… while **Koa handles multi-step enterprise reasoning**。這不是「Koa＝CRM、Claude＝X」點名分工。
- **取代 Claude**：**查無**。Claudeforce 範圍本輪無反向改寫證據；前兩輪「broad beta 偏銷售、客服未列入」維持。
- **「比丟給 Claude 便宜」**：T1 PR／產品頁／[Agentforce pricing](https://www.salesforce.com/agentforce/pricing/)（2026-09-18 抓取）**無** cheaper-than-Claude、無 token 單價。TechCrunch（T2，2026-09-15）記者綜述＋生態系訪談談 tokens burned／tokenomics，屬**媒體／訪談**，不可寫成官方定價承諾。
- **官方「租、買、造三套模型」戰略聲明**：**查無**。

#### K3 與 Fin Apex 的邊界

| | Koa（官方） | Fin Apex（前兩輪） |
|------|-------------|-------------------|
| 定位 | CRM reasoning model for **Agentforce** | CX／客服垂直模型，驅動 **Fin** agent |
| 組織 | 技術故事／arXiv 掛 **AI Research** | 交割稿掛 **Salesforce AI Labs** |
| 任務語彙 | leads、opportunities、resolving service cases、CRM actions | 客服解決率／CX workflows |

- **官方領域分工聲明**：**查無**（兩者都碰 service／case，重疊風險屬推論）。
- **整併訊號**：Koa 一手來源零提及 Fin Apex；**查無**併入／反向路線圖。
- **AI Labs ≠ AI Research**：Koa 發表**沒有**把 Fin 改口到 AI Research，也**沒有**說 Koa 屬 AI Labs；維持前輪不可逕自等同。
- **Fin Apex 官方定位因 Koa 改寫**：**查無**證據。

#### K4 定價與可用性

- **時程（T1 PR）**：Available to **select pilot customers now** in Agentforce；general availability expected **winter 2026 in U.S. regions**。產品頁 FAQ 另寫 open beta starting shortly after。NVIDIA blog 寫 pilots "in **October**"（與 PR「now」略有時序差，並列兩源，勿揉成單一日期）。
- **Pilot 客戶名單（PR／產品頁）**：1-800Accountant、Baxter Credit Union (BCU)、Engine、Formula 1、UChicago Medicine、Xero。
- **計價**：Agentforce 定價頁（2026-09-18）**Koa／Nemotron 出現次數＝0**；PR／產品頁亦無公開價。**查無可靠來源**說明是否吃 Flex Credits、席次捆綁或獨立 SKU。角度 B 雙軌定價論**暫不因 Koa 強制改寫**；成本故事只能標媒體 tokenomics／尚無官方價。
- **第四輪複查（2026-09-27）**：合作夥伴 Sirocco Group 稱 Koa「priced in Flex Credits」，本輪查無官方佐證，上一條結論維持。[Koa 產品頁](https://www.salesforce.com/agentforce/koa/)正文與 FAQ 無 Flex Credits、無價格，只有通用區塊的「Flex Credit Calculator」連結；[Rate Cards 頁](https://www.salesforce.com/agentforce/rates/)連到的最新版 [2026-08-31 Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) 中 Koa、Nemotron 出現次數為 0；Help〈Flex Credits Billable Usage Types〉亦無 Koa。Help〈Select Agentforce Model Option〉列出的模型選項（Salesforce Default、AWS-Hosted、Google Gemini）也還沒有 Koa，與「pilot 中」一致。

#### K5 NVIDIA 合作性質

- **官方措辭**：PR "**deep technical collaboration** with NVIDIA"；Why We Post-Trained "**co-engineered**"；Salesforce **controls the model weights**，post-training and inference within its own trust boundary。定性為開源權重基座上的主導 post-train＋NeMo 工具鏈，**不是**買斷 Nemotron 或合資公司聲明。
- **Jensen Huang（PR 引，與 Koa 直接相關）**："NVIDIA Nemotron open models give Salesforce the foundation to turn decades of enterprise expertise into specialized AI with Koa…" (Jensen Huang, founder and CEO of NVIDIA).
- **Nemotron open weights**：Nemotron Open Model License（Last Modified 2025-12-15）商業可用、可衍生、no-charge royalty-free；**不是**口語「任意無條件開源」。客戶拿到的是 Salesforce-hosted option，**不是**下載 Koa 開源權重。
- **股權／投資**：截至 2026-09-18 **查無可靠來源**顯示本樁合作伴隨 Salesforce↔NVIDIA 新股權交易。不可與「Salesforce 持有 Anthropic 股權」編成對稱股權故事。

#### K6 外部評價與三層並讀

- TechCrunch（T2，2026-09-15）標題走向 "AI labs should fear"，同稿強調 isn't exactly abandoning Anthropic／Claudeforce。
- Techzine／Channel Insider（T3）有把 Claudeforce／Koa／Fin Apex 串讀或主張專用模型處理高頻 CRM；**皆非**官方三層戰略名。
- Everest「降低 API 依賴」（2026-06）原句綁 **Fin Apex**，**不可**直接當成對 Koa 的 Everest 評語。
- Anthropic newsroom（2026-09-18 抓取）：Salesforce／Dreamforce／Koa／Claudeforce **出現次數＝0**；**查無** Anthropic 官方回應。

---

## 五、估值合理性（次要，簡短）

以 36 億美元計算：

| 分母 | 倍數 | 說明 |
|------|------|------|
| 整體 ARR 約 4 億美元（2026-04, Sacra） | **約 9 倍** | 最常被引用的口徑 |
| 2024 年營收 3.43 億美元（Sacra） | 約 10.5 倍 | |
| 2024 年營收 2.67 億美元（tikr 版本） | **約 13.5 倍** | tikr 稱屬 SaaS 併購的前四分位 |
| Fin 產品 ARR 逾 1 億美元 | **約 36 倍** | 若只算 AI 產品線 |

對照 Intercom 自身的估值歷史：

- 2018-03 Series D 募資 1.25 億美元，投後估值 **12.75 億美元**（[CNBC](https://www.cnbc.com/2018/03/26/intercoms-new-funding-brings-valuation-to-1-point-275-billion.html)），此後未再進行股權募資
- 2025 年員工 tender offer 釋出約 1 億美元股份，The Information 報導談的估值為「20 億美元或以上」（[Sacra](https://sacra.com/c/intercom/)）
- 2026-03 取得 Hercules Capital 2.5 億美元創投債

從 2018 年的 12.75 億美元到 2026 年的 36 億美元，八年約 2.8 倍。以創投報酬標準看並不驚人，但考慮到中間完全沒有稀釋性股權募資，創辦人與早期員工的實際回報率相當可觀。

**我的判斷（分析）：** 9 倍 ARR 在 2026 年的 AI 併購環境中偏保守。同期 Sierra 的 150 億美元估值對應約 2 億美元 ARR（75 倍），Decagon 的 45 億美元對應約 1 億美元（45 倍）。Salesforce 之所以能用 9 倍買到，關鍵在於 Fin 的營收裡有很大一塊仍是傳統席次制的 Intercom 客服平台收入，市場給的不是純 AI 倍數。換個角度說，Salesforce 買的是一個**正在中途轉型的資產**，價格反映了轉型尚未完成的折價。

---

## 六、台灣與亞洲關聯

可確認的一手事實：

- **繁體中文支援：** Fin Help Center 將 Traditional Chinese 列為 AI Answers 支援語言之一（文章更新 2026-06-22；[fin.ai help](https://fin.ai/help/en/articles/13975804-use-fin-ai-agent-in-multiple-languages)）
- **APAC 經銷：** DKM Ecosystem 自稱 Intercom / Fin 的 APAC Distributor / Gold Partner，服務範圍含台灣等市場（[DKM](https://www.dkmeco.com/en/dkm-ecosystem-intercom-apac-distributor-ai-customer-service/)）。**精確簽約日薄弱**，勿寫死日期

仍查無：

- Fin 在台灣的客戶名單或營收貢獻
- Salesforce 台灣新聞室針對 Fin 收購的在地公告（trade press 如 iThome 有轉述，非 Salesforce Taiwan PR）
- Fin 或 Agentforce 在台灣的本地定價

**建議 writer 處理方式：** 可寫「產品層支援繁中」與「APAC 走經銷」。整併後通路可能重整屬**推論**。outcome-based 定價對台灣 BPO / 客服外包的「工時 vs 每次解決 0.99 美元」對比仍可用。**不要編造台灣客戶案例或本地價格。**

---

## 七、給 writer 的建議

### 7.1 建議切入角度（擇一或組合）

**角度 A：三層模型架構論（最推薦；round 3 改寫）**
以可觀測的三個模型資產畫同一張堆疊圖：**Claude（租／前沿預設）**、**Fin Apex（買／客服垂直，AI Labs）**、**Koa（造／CRM reasoning，AI Research＋Agentforce 可選 provider）**。硬事實可用：Koa＝first CRM reasoning model for Agentforce、Nemotron 3 Super post-train、fourth model provider／opt-in、weights＋inference in trust boundary、pilot now／GA winter 2026 U.S.、Why We Post-Trained「alongside frontier LLMs」。Everest「降低對前沿實驗室 API 依賴」仍可作 Fin Apex 的第三方佐證（2026-06），**不要**寫成已評 Koa。

**必須標為推論、不可寫成官方聲明的關係：** Claude／Fin Apex／Koa 彼此點名分工；Koa 是否進入 Atlas；Koa 是否取代 Claude；Koa 與 Fin Apex 是否整併；「租／買／造」是否為 Salesforce 戰略名稱；「Koa 比 Claude 便宜」是否為官方定價機制。

開頭可從 9 月 10 日交割寫起，五天後 Dreamforce 同日發表 Koa（會後已確認 SMB Keynote ft. Fin 有 Salesforce+ 成片；Stage 8「Over 90%」查無錄影）。建議與角度 C 組合：C 開場建立荒謬感，A 拆成自洽架構（見交接備註「角度 C vs A 素材」）。

**角度 B：成果敘事與席次捆綁的雙軌（2026-09-18 會後改寫）**
不要再寫「席次制走向終結」的單向崩解敘事。Dreamforce 前（2026-09-03 editions 稿＋定價頁）Salesforce 已把 Slack、Tableau Next、Flex Credits、部分 agent 能力折回 Sales／Service Cloud **Core $195／Advanced $395／Max $550** 席次；同時保留成果／用量錶：Fin **$0.99** per outcome、Help Agent Resolutions（Casey）**$2**、Agentforce Conversations **$2**。文章張力改為：Salesforce **一邊用成果計價打贏採購敘事，一邊把錢收回席次與捆綁**；席次制被重新武裝成 AI bundle，成果計價是加層而非替代。三個價碼（Fin 0.99、Zendesk 1.50／2.00、Agentforce 2.00）與 McCabe 新客戶 NRR 112%→146%（LinkedIn，非 IR）仍可用，但須放在雙軌框架下，並標明口徑。

**角度 C：那個諷刺的三角（可與 A 組合；C 開場、A 拆解）**
Anthropic 是 Fin 的客戶，Fin 說自己的模型贏過 Claude，Salesforce 同時買下 Fin 並把 Claude 立為預設模型；Dreamforce 再疊上自研 Koa 與 TechCrunch「AI labs should fear」／同稿「未放棄 Anthropic」並讀。以荒謬感開場，再用角度 A 的三層架構說明為何仍可自洽。PR「3x fewer errors」vs 自家論文「below the strongest frontier」也適合放在開場反差，但須分層引用。

### 7.2 可用的金句素材

- Eoghan McCabe（**Salesforce 簽約新聞稿**，2026-06-15）：「This is a major win for consumers of the world… Our technology has defined this category and set the new standards for what great customer service looks like today. By joining forces with Salesforce…」（[簽約新聞稿](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)；中譯可作「這對全世界的消費者是一場大勝…」）。**勿標成 Fin Ideas**
- Eoghan McCabe（**Fin Ideas**，同日另一篇）：「We're excited to share that we just signed an agreement for Salesforce to acquire Fin for ~$3.6B.」並寫「I'll still be CEO, Des will still be running R&D…」（[Fin Ideas](https://ideas.fin.ai/p/salesforce-signs-definitive-agreement)）
- Marc Benioff（簽約新聞稿）：「We're thrilled to welcome Fin to Salesforce as we enable every company to become an agentic enterprise… Fin brings proven agent technology, a deep commitment to customer success, and an incredible AI team that will complement Agentforce with powerful service agent capabilities…」（[同上簽約稿](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)）
- Marc Benioff（交割新聞稿）：「The #1 customer agent meets the #1 CRM… The future of customer service is autonomous, intelligent, and built on trust. Fin brings proven agent technology and an extraordinary AI team to Salesforce, making Agentforce even more powerful for customer service…」（[交割稿](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/)）
- Des Traynor 談 2024 年從 OpenAI 換到 Claude（官方原文）：「We landed on Claude for one simple reason: it delivers.」（[Intercom Blog](https://www.intercom.com/blog/fin-2-powered-by-anthropic-claude-llm/)）
- Eoghan McCabe 2022 年回鍋時：「回到我們的根本、極端聚焦，以及一個我們過去從不願意下的賭注：選一條車道，並且說清楚我們不做什麼。」（[Silicon Republic](https://www.siliconrepublic.com/business/intercom-ceo-eoghan-mccabe-karen-peacock)，2022-10）
- Everest Group：Fin 的自有 Apex 模型讓 Salesforce「降低對前沿實驗室 API 的依賴」
- 可用的比喻方向（我的建議，**分析非引述**）：Claudeforce 租的是腦，Fin 買的是手，Koa 是自己造的 CRM 推理層。原「租腦／買手」**不完整**，少了「造」；且**查無**官方 rent／buy／build 戰略名，寫作時必須標分析框架
- 時間對照的鉤子：三個月前還在借 2.5 億美元創投債的公司，三個月後以 36 億美元賣掉全公司

### 7.3 明確不要寫的東西

以下按 **事實類／術語類／數字類** 分組（涵蓋原清單並新增 Koa 管制）。各組內自行編號。

#### 事實類（事件、關係、官方 vs 推論）

1. **不要寫「交易尚未完成」或「預計 FY27 Q4 完成」。** 交易已於 2026-09-10 完成交割。
2. **交易對價可寫「約 36 億美元現金 + customary adjustments」（10-Q）。** 不要發明 earnout、換股比例或最終調整後價格；留任獎金仍查無。也不要宣稱 6/15 或 9/10 已有專屬 Form 8-K（截至 2026-09-11 查無）。
3. **監管：不要寫「完全沒申報」或「FTC / 歐盟已放行」。** 可寫 US ET / EU register / UK CMA 查無公開紀錄（查無 ≠ 未提 HSR）；德國有申報電訊；ACCC Phase 1 已核准。
4. **不要斷言 Fin Apex 會取代或不會取代 Claude。** 官方只說 Fin 將「繼續」以自有模型套件驅動；**查無**兩者分工聲明。
5. **不要斷言 Koa 取代 Claude，或 Koa 已進入 Atlas Reasoning Engine。** 截至 2026-09-18 兩者皆**查無**官方聲明；可寫產品頁 fourth model provider／opt-in。
6. **不要把「租／買／造」或「三層模型策略」寫成 Salesforce 官方戰略名稱。** 那是本研究分析框架；官方**查無** rent／buy／build 自我描述。
7. **不要把「Koa 比丟給 Claude／ChatGPT 便宜」寫成官方定價承諾。** 僅見 TechCrunch 等媒體／訪談 tokenomics；Agentforce 定價頁無 Koa。
8. **不要混淆 Koa 與 Fin Apex 的領域，也不要寫兩者已整併。** 官方分工與整併訊號皆**查無**；Koa＝Agentforce CRM reasoning／AI Research，Fin Apex＝Fin 客服垂直／AI Labs。
9. **不要把 Salesforce AI Labs 寫成等同 AI Research。** Fin→AI Labs（交割稿）；Koa→AI Research（技術故事／arXiv）；ai-labs/ 404。**查無** Fin Apex 納入 AI Research 一手聲明。
10. **不要把 Everest Group 2026-06「降低對前沿實驗室 API 依賴」直接套到 Koa。** 原句綁 Fin Apex，早於 Koa。
11. **不要編造台灣客戶案例、台灣定價或 Salesforce 台灣的官方說法。** 可寫產品支援繁中（fin.ai help）。
12. **不要斷言「Zendesk 被逼到牆角」是業界共識。** Zendesk / Sierra 官方回應仍查無。
13. **Listen Labs 收購案只能寫成傳聞。** 約 20 億美元洽談、尚未簽約；Dreamforce 無官宣。
14. **Fin 議程：** 不要宣稱議程「完全沒有 Fin 場次」。會前兩場具名；SMB Keynote 有 Salesforce+ 成片（含 Des Traynor）；Stage 8「Over 90%」**查無**錄影／摘要／舉行確證。不要把 Salesforce Apex（語言）誤認成 Fin Apex；不要發明 Stage 8 講稿。
15. **Casey 與 Fin：** Casey＝Help Agent persona；七 agent 為 **2026-09-11 會前**。官方並存 portfolio choice；**不要**寫已合併；**不要**把 Customer Zero 500 萬次寫成「Casey 對外客戶量」。
16. **不要寫「席次制已被成果計價取代」。** 官方是席次捆綁（Core／Advanced／Max）與 outcomes／credits 用量並存的雙軌；Koa 計價**查無**，勿發明第三軌官方機制。
17. ~~引述來自搜尋摘要、逐字引用前請核對~~：**2026-09-11 與 2026-09-18（含 round 3 Koa）已核實項目見會後更新節與文末核實表**；其餘未核者仍須保留。

#### 術語類（品牌、產品名、評測標籤）

1. **產品名稱管制：** 可寫會前網站去 Agentforce 前綴／Sales Cloud 復名，但須標**非官方新聞稿**；「約兩打」僅媒體。**不要**寫 Fin 品牌被吃掉。**不要**寫「官方宣布 Headless 360 改回 Salesforce Platform」。可寫官方說明文件已寫明 Headless 360 自 2026-09-04 改名 AIforce（Help，T1，第四輪核實），但**不要**寫成「官方發布改名新聞稿」；TNW 的 Salesforce Platform 說法可並陳，兩者關係官方未說明。
2. **不要把 Fin 的 benchmark 當成中立第三方評測。** 73.1% 等是 Fin／cx-models 自家數字，獨立複現查無。幻覺對照是 **Sonnet 4.6**，不是 4.0。
3. **不要把 Koa 的 CRM Bench／「three times fewer errors」當成中立第三方評測。** 基準為 Salesforce 自建；PR **未點名** Claude／GPT；同公司論文承認低於 strongest frontier，且論文無 3x 句；獨立複現**查無**。
4. **兩個 30,000：** Fin「逾 30,000 家企業」（交割稿）與 Agentforce「over 30,000 customers on this platform」（台上）定義不同，禁止合併；Agentforce 須並陳官網 metrics 仍為 25,000+。

#### 數字類（口徑、版本、外推）

1. **不要寫「3 萬個 AI 客戶」。** 官方是「逾 3 萬家企業組成的全球客戶基數」；實際使用 Fin AI 代理約 8,000 家（2026-05）。
2. **3 億美元 Anthropic tokens：只能寫「Benioff 口述估計」（All-In / BI），不可當 SEC 列帳。**
3. **不要混用解決率數字**，每次標出處與定義。已知版本含：76%（交割稿）、73.1%（Fin Apex benchmark）、79%（Anthropic 案例）、65-70%（第三方推估）、「up to 90%」（AWS）、「Over 90%」（Dreamforce 場次標題）。**兩個 90% 是最佳案例／標題用語，不是平均值。**
4. **不要再用 Anthropic 案例舊數字 58% / 1,700 小時。** 現行官方案例頁為 >560k / 79% / 63% / 80%。
5. **Hunter $2B：** 台上可寫上季約 $500M pipeline（註明轉寫對 Hunter／Piper 歸因不一）；**不要**把 $2B annualized 寫成官方年化（媒體外推）。
6. **Fulton 80k／$389M：** 僅 Salesforce Ben keynote 轉述可引並標 T3；**不要**升格為已刊官方數字。

### 7.4 寫作風格提醒（比照前作）

- 全文避免破折號，中英文之間留空格
- 當代人物一律用英文原名：Marc Benioff、Eoghan McCabe、Des Traynor、Bret Taylor、Tom Eggemeier、Dario Amodei、Karen Peacock、Ciarán Lee、David Barrett、Jensen Huang、Jayesh Govindarajan、Silvio Savarese
- 避免「這不是 X，而是 Y」句型
- 分析段落請明確標示為作者觀點，與查證事實區隔
- 開頭建議用敘事切入，例如 2026 年 9 月 10 日交割當天，距離 Dreamforce 開幕只剩五天

---

## 資料來源

### 一手資料（公司公告、財報、官方部落格）

1. [Salesforce〈Salesforce Signs Definitive Agreement to Acquire Fin〉](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/)（2026-06-15）
2. [Salesforce〈Salesforce Completes Acquisition of Fin〉](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/)（2026-09-10）
3. [Salesforce 投資人關係：Fin 收購公告](https://investor.salesforce.com/news/news-details/2026/Salesforce-Signs-Definitive-Agreement-to-Acquire-Fin/default.aspx)（2026-06-15）
4. [Salesforce〈Salesforce Delivers Record Second Quarter Fiscal 2027 Results〉](https://www.salesforce.com/news/press-releases/2026/08/26/fy27-q2-earnings/)（2026-08-26）
5. [Salesforce FY27 Q2 8-K（SEC）](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm)（2026-08-26）
6. [Salesforce〈Salesforce Signs Definitive Agreement to Acquire Contentful〉](https://www.salesforce.com/news/stories/salesforce-signs-definitive-agreement-to-acquire-contentful/)（2026-06-01）
7. [Salesforce〈Salesforce and Anthropic Announce Claudeforce〉](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)（2026-08-26）
8. [Fin Ideas〈Today Intercom becomes Fin〉by Eoghan McCabe](https://ideas.fin.ai/p/today-intercom-becomes-fin)（2026-05-12）
9. [Fin Ideas〈Salesforce signs definitive agreement to acquire Fin〉](https://ideas.fin.ai/p/salesforce-signs-definitive-agreement)（2026-06-15）
10. [Intercom Blog〈Announcing Fin Apex: The age of vertical models is here〉](https://www.intercom.com/blog/announcing-fin-apex-the-age-of-vertical-models-is-here/)（2026-03）
11. [Intercom Blog〈Fin 2: Powered by Anthropic's Claude LLM〉](https://www.intercom.com/blog/fin-2-powered-by-anthropic-claude-llm/)（2024-10）
12. [Intercom Blog〈Never stop disrupting yourself; introducing the Fin API platform〉](https://www.intercom.com/blog/introducing-the-fin-api-platform/)（2026-04）
13. [fin.ai〈Fin Apex 1.0 CX Models〉](https://fin.ai/cx-models)
14. [fin.ai〈AI-first by design: How Anthropic transformed support operations with Fin〉](https://fin.ai/customers/anthropic-transformation)
15. [Intercom Help〈Fin for platforms explained〉](https://www.intercom.com/help/en/articles/10118495-fin-for-platforms-explained)
16. [Freshworks FY2026 Q2 10-Q（SEC）](https://www.sec.gov/Archives/edgar/data/0001544522/000154452226000137/frsh-20260630.htm)（2026-06-30 季末）
17. [Salesforce Dreamforce 2026 官方頁](https://www.salesforce.com/dreamforce/)
18. [AWS〈Intercom & Anthropic Video Success Story〉](https://aws.amazon.com/solutions/case-studies/intercom-anthropic/)
19. [Salesforce FY27 Q2 Form 10-Q](https://www.sec.gov/Archives/edgar/data/1108524/000110852426000190/crm-20260731.htm)（2026-08-27；Fin 現金對價）
20. [fin.ai〈Pricing〉](https://fin.ai/pricing)
21. [Salesforce〈Agentforce Pricing〉](https://www.salesforce.com/agentforce/pricing/)
22. [Zendesk〈Pricing〉](https://www.zendesk.com/pricing/)
23. [Eoghan McCabe LinkedIn Pulse（NRR 112%→146%）](https://www.linkedin.com/pulse/intercom-update-our-friends-followers-eoghan-mccabe-utbpc)（2025-06-11）
24. [fin.ai Help〈Use Fin AI Agent in multiple languages〉](https://fin.ai/help/en/articles/13975804-use-fin-ai-agent-in-multiple-languages)
25. [Salesforce AI Research](https://www.salesforce.com/ai-research/)
26. [Dreamforce 2026 session catalog](https://reg.salesforce.com/flow/plus/df26/sessioncatalog/page/catalog)

27. [Salesforce〈Announcing Koa: Salesforce's First CRM Reasoning Model, Built on NVIDIA Nemotron〉](https://www.salesforce.com/news/press-releases/2026/09/15/koa-reasoning-model/)（2026-09-15）
28. [Salesforce〈Why We Post-Trained Our Own Reasoning Model〉](https://www.salesforce.com/news/stories/why-we-post-trained-our-own-reasoning-model/)（2026-09-16）
29. [Salesforce Agentforce Koa 產品頁](https://www.salesforce.com/agentforce/koa/)
30. [NVIDIA Blog〈Jensen Huang at Dreamforce〉](https://blogs.nvidia.com/blog/jensen-huang-dreamforce/)（2026-09-15）
31. [arXiv:2609.15066 Salesforce Koa technical report](https://arxiv.org/abs/2609.15066)（Submitted 2026-09-14；vendor paper）
32. [NVIDIA Nemotron 3 Super](https://research.nvidia.com/labs/nemotron/Nemotron-3-Super/)
33. [NVIDIA Nemotron Open Model License](https://www.nvidia.com/en-us/agreements/enterprise-software/nvidia-nemotron-open-model-license/)（Last Modified 2025-12-15）

### 新聞媒體

1. [CNBC〈Salesforce to buy AI customer service platform Fin for $3.6 billion〉](https://www.cnbc.com/2026/06/15/salesforce-ai-customer-service-fin-acquistion.html)（2026-06-15）
2. [TechCrunch〈Salesforce acquires AI customer service platform Fin for $3.6B〉](https://techcrunch.com/2026/06/15/salesforce-acquires-ai-customer-service-platform-fin-for-3-6b/)（2026-06-15）
3. [TechCrunch〈AI research startup Listen Labs scrubbed a $1.5B funding round for Salesforce talks〉](https://techcrunch.com/2026/09/09/ai-research-startup-listen-labs-scrubbed-a-1-5b-funding-round-for-salesforce-talks/)（2026-09-09）
4. [TechCrunch〈Sierra raises $950M as the race to own enterprise AI gets serious〉](https://techcrunch.com/2026/05/04/sierra-raises-950m-as-the-race-to-own-enterprise-ai-gets-serious/)（2026-05-04）
5. [TechCrunch〈Bret Taylor's Sierra reaches $100M ARR in under two years〉](https://techcrunch.com/2025/11/21/bret-taylors-sierra-reaches-100m-arr-in-under-two-years/)（2025-11-21）
6. [TechCrunch〈Eoghan McCabe, the controversial Intercom co-founder, is stepping back in〉](https://techcrunch.com/2022/10/06/eoghan-mccabe-the-controversial-intercom-co-founder-who-left-the-ceo-role-in-2020-is-stepping-back-in)（2022-10-06）
7. [Bloomberg〈AI Customer Support Startup Decagon Valued at $4.5 Billion〉](https://www.bloomberg.com/news/articles/2026-01-28/ai-customer-support-startup-decagon-valued-at-4-5-billion)（2026-01-28）
8. [Bloomberg〈Salesforce Investment in Anthropic Is Valued at About $5 Billion〉](https://www.bloomberg.com/news/articles/2026-06-01/salesforce-investment-in-anthropic-is-valued-at-about-5-billion)（2026-06-01）
9. [VentureBeat〈Intercom's new post-trained Fin Apex 1.0 beats GPT-5.4 and Claude Sonnet 4.6〉](https://venturebeat.com/technology/intercoms-new-post-trained-fin-apex-1-0-beats-gpt-5-4-and-claude-sonnet-4-6)（2026-03）
10. [VentureBeat〈Intercom, now called Fin, launches an AI agent whose only job is managing another AI agent〉](https://venturebeat.com/technology/intercom-now-called-fin-launches-an-ai-agent-whose-only-job-is-managing-another-ai-agent)（2026-05）
11. [CNBC〈Intercom's fresh funding brings valuation to $1.275 billion〉](https://www.cnbc.com/2018/03/26/intercoms-new-funding-brings-valuation-to-1-point-275-billion.html)（2018-03-26）
12. [Reuters via Investing.com〈Salesforce deepens AI automation push with $3.6 billion Fin buyout〉](https://www.investing.com/news/stock-market-news/salesforce-to-buy-fin-for-about-36-billion-4742007)（2026-06-15）
13. [Investing.com〈Salesforce stock slightly higher after $3.6 billion Fin acquisition〉](https://www.investing.com/news/stock-market-news/salesforce-stock-slightly-higher-after-36-billion-fin-acquisition-93CH-4742294)（2026-06-15）
14. [The Next Web〈Salesforce closes Fin and eyes $2bn Listen Labs〉](https://thenextweb.com/news/salesforce-fin-acquisition-closed-listen-labs-2bn-talks)（2026-09）
15. [Irish Times〈Salesforce to buy Fin, formerly Intercom, for $3.6bn〉](https://www.irishtimes.com/business/2026/06/15/salesforce-to-buy-fin-formerly-intercom-for-36bn/)（2026-06-15）
16. [Silicon Republic〈Intercom co-founder Eoghan McCabe returns as CEO〉](https://www.siliconrepublic.com/business/intercom-ceo-eoghan-mccabe-karen-peacock)（2022-10）
17. [CX Today〈Intercom Rebrands to Fin as AI Agent Becomes the Core Business〉](https://www.cxtoday.com/contact-center/intercom-rebrands-to-fin/)（2026-05）
18. [CMSWire〈Salesforce Debuts Help Agent With Pay-Per-Resolution AI〉](https://www.cmswire.com/contact-center/salesforce-debuts-help-agent-with-payperresolution-ai/)
19. [CMSWire〈Salesforce to Acquire Fin for $3.6 Billion〉](https://www.cmswire.com/customer-experience/salesforce-acquires-fin/)（2026-06）
20. [The Letter Two〈Intercom Switches from OpenAI to Anthropic for Fin AI Agent〉](https://thelettertwo.com/2024/10/12/intercom-releases-fin-2-ai-agent-switching-anthropic-from-openai/)（2024-10-12）
21. [The Letter Two〈Intercom Launches Fin API Platform for Developers〉](https://thelettertwo.com/2026/04/03/intercom-fin-api-platform-developers/)（2026-04-03）
22. [Business Insider〈Marc Benioff on Anthropic token spend〉](https://www.businessinsider.com/marc-benioff-salesforce-anthropic-spend-tokens-slack-2026-5)（2026-05-16；All-In 口述估計）
23. [Business Insider〈Salesforce Talks to Acquire Listen Labs〉](https://www.businessinsider.com/salesforce-acquire-ai-startup-listen-labs-2026-9)（2026-09-09；未簽約）

24. [TechCrunch〈Salesforce and Nvidia's new reasoning model is everything the AI labs should fear〉](https://techcrunch.com/2026/09/15/salesforce-and-nvidias-new-reasoning-model-is-everything-the-ai-labs-should-fear/)（2026-09-15；T2）
25. [Channel Insider〈Salesforce and NVIDIA announce Koa〉](https://www.channelinsider.com/ai/news-salesforce-nvidia-koa-agentforce-crm-ai-model/)（2026-09-16；T3）

### 分析與產業研究

1. [Constellation Research〈Hot Take: Salesforce Acquires Fin and Leaves Us Reading Between the Agentic Lines〉](https://www.constellationr.com/research/blog/hot-take-salesforce-acquires-fin-and-leaves-us-reading-between-agentic-lines)（2026-06）
2. [Everest Group〈Salesforce built the foundation, Fin brings the intelligence〉](https://www.everestgrp.com/blogs/salesforce-built-the-foundation-fin-brings-the-intelligence)（2026-06）
3. [Salesforce Ben〈Salesforce Acquires Fin (Formerly Intercom), Adding 30K AI Customers〉](https://www.salesforceben.com/salesforce-acquires-fin-formerly-intercom-adding-30k-ai-customers/)（2026-06）
4. [Salesforce Ben〈Complete Guide to Agentforce Pricing Options〉](https://www.salesforceben.com/complete-guide-to-agentforce-pricing-options/)
5. [Salesforce Ben〈Is Claudeforce Enough? What the Dreamforce '26 Announcement Might Be〉](https://www.salesforceben.com/is-claudeforce-enough-what-the-dreamforce-26-announcement-might-be/)（2026-09）
6. [Salesforce Ben〈Salesforce Acquires Contentful to 'Enhance Headless 360'〉](https://www.salesforceben.com/salesforce-plans-agentic-content-layer-with-contentful-acquisition/)（2026-06）
7. [Sacra〈Intercom revenue, valuation & funding〉](https://sacra.com/c/intercom/)
8. [Sacra〈Intercom at $343M/year〉](https://sacra.com/research/intercom-at-343m/)
9. [Sacra〈Sierra revenue, valuation & funding〉](https://sacra.com/c/sierra/)
10. [Sacra〈Decagon revenue, valuation & funding〉](https://sacra.com/c/decagon/)
11. [Futurum〈Zendesk Bets on Autonomous AI Agents & Outcome Pricing to Upend Service Models〉](https://futurumgroup.com/insights/zendesk-bets-on-autonomous-ai-agents-outcome-pricing-to-upend-service-models/)
12. [Diginomica〈Zendesk Relate 2026: Zendesk expands its Resolution Platform〉](https://diginomica.com/zendesk-relate-2026-resolution-platform-ai-driven-service-delivery)（2026）
13. [The AI Economy〈Zendesk's AI Revenue Could Hit $500M in 2026〉](https://theaieconomy.substack.com/p/zendesk-ai-arr-2026-growth)
14. [The AI Economy〈Intercom Opens Fin AI Platform to Developers〉](https://theaieconomy.substack.com/p/intercom-fin-api-platform-developers)（2026-04）
15. [Opus Research〈Intercom's Fin Apex raises the bar for AI CX vendors〉](https://opusresearch.net/2026/03/31/intercoms-fin-apex-raises-the-bar-for-ai-cx-vendors/)（2026-03-31）
16. [Deloitte〈Technology Spotlight: Accounting for Outcome-Based Pricing in an Agentic AI Software Product〉](https://dart.deloitte.com/USDART/home/publications/deloitte/industry/technology/accounting-outcome-based-pricing-agentic-ai)（2026-06-04）
17. [Monetizely〈The 2026 Guide to SaaS, AI, and Agentic Pricing Models〉](https://www.getmonetizely.com/blogs/the-2026-guide-to-saas-ai-and-agentic-pricing-models)
18. [tikr〈Salesforce Stock Is Down 45% From Its Peak. Here's What the $3.6 Billion Fin Acquisition Changes〉](https://www.tikr.com/blog/salesforce-stock-is-down-45-from-its-peak-heres-what-the-3-6-billion-fin-acquisition-changes)（2026-06）
19. [Digital Applied〈Salesforce Buys Fin for $3.6B: The Agentic CX Land Grab〉](https://www.digitalapplied.com/blog/salesforce-acquires-fin-intercom-3-6b-ai-customer-service-analysis)（2026-06）
20. [DKM Ecosystem〈DKM Ecosystem named Intercom APAC distributor〉](https://www.dkmeco.com/en/dkm-ecosystem-intercom-apac-distributor-ai-customer-service/)

---

## 一手來源核實紀錄

核實日期：2026-09-11（初輪）；**2026-09-18 追加 Dreamforce 會後核實（round 2）與 Koa／三層模型核實（round 3）**；**2026-09-27 追加第四輪（R1 至 R7，動筆前核實）**；**2026-09-28 追加第五輪（V1 至 V4，發佈前待核）**。方法：live HTML / WebFetch / curl，Salesforce Help 以 headless Chrome 渲染後讀取，非搜尋摘要。

| 核實項目 | 結果 | 來源 URL | 備註 |
|---------|------|---------|------|
| 交割新聞稿（客戶數、76%、AI Labs、通道） | 一致 | [完成收購新聞稿](https://www.salesforce.com/news/press-releases/2026/09/10/salesforce-completes-acquisition-of-fin/) | 通道為 live chat、email、WhatsApp、SMS、voice、Slack |
| 簽約新聞稿（36 億、Benioff / McCabe 引述、通道） | 一致 | [簽約新聞稿](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/) | 通道含 phone（非 voice）；McCabe「consumers」金句出自此稿 |
| Fin Ideas McCabe 聲明 | 一致（已分開標註） | [Fin Ideas 簽約聲明](https://ideas.fin.ai/p/salesforce-signs-definitive-agreement) | 「~$3.6B」；仍任 CEO、Des 仍跑 R&D；與新聞稿文案不同 |
| Intercom 更名 Fin Ideas | 一致 | [Today Intercom becomes Fin](https://ideas.fin.ai/p/today-intercom-becomes-fin) | 「obvious and so late」；1,400 employees；Intercom 名保留 |
| Fin 定價 | 一致（已改引官方） | [fin.ai/pricing](https://fin.ai/pricing) | $0.99/outcome；qualifications $9.99；50 outcomes/month minimum；min commitments |
| Agentforce 定價 | 一致（已改引官方） | [Agentforce Pricing](https://www.salesforce.com/agentforce/pricing/) | Conversations $2；Help Agent Resolutions $2；Flex Credits 仍在 |
| Zendesk 定價 | 一致（官方頁 HTML fragments） | [zendesk.com/pricing](https://www.zendesk.com/pricing/) | committed $1.50、pay-as-you-go $2.00；`/pricing/ai/` 404 |
| Anthropic 案例指標 | 已修正 | [Anthropic 案例頁](https://fin.ai/customers/anthropic-transformation) | 現行 >560k / 79% / 63% / 80%；58% 與 1,700 小時已不在頁上 |
| Apex / CX Models 圖表與幻覺對照 | 已修正 | [fin.ai/cx-models](https://fin.ai/cx-models) | 73.1 / Opus 71.1 / GPT-5.4 71.1 / Sonnet 4.6 69.6；幻覺少 65% vs **Sonnet 4.6** |
| Apex 官方部落格（基座敘事） | 一致（已軟化參數宣稱） | [Announcing Fin Apex](https://www.intercom.com/blog/announcing-fin-apex-the-age-of-vertical-models-is-here/) | 先 GPT 後 Sonnet 4.0，現 Apex；open-weight + post-training；一手未見「數千億參數」 |
| Des Traynor Fin 2 引述 | 一致（已改引一手） | [Fin 2 Claude 部落格](https://www.intercom.com/blog/fin-2-powered-by-anthropic-claude-llm/) | “We landed on Claude for one simple reason: it delivers.” |
| Dreamforce 日期與行銷 | 一致 | [Dreamforce](https://www.salesforce.com/dreamforce/) | 9/15 至 9/17；首頁推 Claudeforce / Dario Amodei，無 Fin 收購專題 |
| Dreamforce Fin 具名場次 | 已修正（非零） | [DF26 session catalog](https://reg.salesforce.com/flow/plus/df26/sessioncatalog/page/catalog) | 兩場 Fin 具名；Intercom=0；「AI Labs」精確詞=0；台上內容待會後補 |
| 交易結構（現金 / adjustments） | 已修正 | [FY27 Q2 10-Q](https://www.sec.gov/Archives/edgar/data/1108524/000110852426000190/crm-20260731.htm) | 約 $3.6B **in cash**；earnout 查無；指引 $200M 為 Contentful+Fin 合計（EX-99.1） |
| 6/15 或 9/10 專屬 Form 8-K | 仍查無 | EDGAR CIK 0001108524 | 請用新聞稿 + Q2 10-Q / 8-K EX-99.1 |
| 監管（US FTC ET / EU / UK CMA） | 仍查無公開紀錄 | FTC ET；EU Merger Register；GOV.UK CMA | 查無 ≠ 未提 HSR |
| 監管（德國 B7-50/26） | 二手一致 | [finanznachrichten.de 電訊](https://www.finanznachrichten.de/nachrichten-2026-07/68935478-laufende-fusionskontrollverfahren-salesforce-inc-san-francisco-usa-mittelbarer-anteils-und-kontrollerwerb-ueber-die-intercom-inc-fin-san-f-019.htm) | 約 2026-06-29 Anmeldung；官方 clearance PDF 未取回 |
| 監管（澳洲 ACCC MN-40031） | 一致（彙整） | [MergerLoop MN-40031](https://www.mergerloop.com.au/deals/MN-40031/salesforce-intercom) | Phase 1 Approved 2026-08-21 |
| Salesforce AI Labs vs AI Research | 仍查無等同證據 | [AI Research](https://www.salesforce.com/ai-research/)；`/ai-labs/` 404 | 交割稿用 AI Labs；不可逕自等同 AI Research |
| Apex 獨立複現 73.1% | 仍查無 | （無） | vendor / VentureBeat 報導公司數字；Opus Research 未複現 |
| Zendesk / Sierra 官方回應併購 | 仍查無 | Zendesk newsroom；sierra.ai | 僅有第三方分析觀點 |
| $300M Anthropic tokens | 已改標口述估計 | [BI Benioff Anthropic spend](https://www.businessinsider.com/marc-benioff-salesforce-anthropic-spend-tokens-slack-2026-5) | Benioff All-In 口述；非 SEC 列帳 |
| NRR 112%→146% | 已降級為訪談口徑 | [McCabe LinkedIn 2025-06-11](https://www.linkedin.com/pulse/intercom-update-our-friends-followers-eoghan-mccabe-utbpc) | McCabe：新客戶 12 個月 NRR；非公司 IR；Mostly Metrics 二手 |
| 台灣繁中支援 | 已修正 | [多語言 help](https://fin.ai/help/en/articles/13975804-use-fin-ai-agent-in-multiple-languages) | Traditional Chinese 列於支援語言 |
| Salesforce 台灣 Fin PR | 仍查無 | salesforce.com/tw/news/ | trade press 有轉述，非官方台灣稿 |
| DKM APAC 經銷日期 | 仍薄弱 | dkmeco.com | 可寫經銷關係；勿寫死簽約日 |
| Listen Labs | 仍查無簽約 | BI / TechCrunch 2026-09-09 | 約 $2B 洽談、未簽約、可能破局 |
| Media resources gate（round 2） | 通過 | [dreamforce-26-media-resources](https://www.salesforce.com/news/dreamforce-26-media-resources/) | 首則 AIforce 09/15/26；2026-09-18 |
| Sales Cloud 復名／去 Agentforce 前綴 | 部分一致 | [TNW 2026-09-14](https://thenextweb.com/news/salesforce-drops-agentforce-branding-product-names-dreamforce)；[salesforce.com/sales/](https://www.salesforce.com/sales/) | 會前網站；無官方改名稿；「約兩打」僅媒體 |
| Headless 360 術語 | 並陳三套說法 | TNW（→Platform）；Ben 引 Help（→AIforce）；[AIforce 稿](https://www.salesforce.com/news/stories/aiforce-announcement/)（Headless Toolkit） | 勿單寫「官方改回 Platform」 |
| Agentforce 360／Fin 品牌保留 | 一致 | 媒體＋官網；交割 PR；9/11 agents PR | Fin 未品牌被吃掉 |
| Casey＝Help Agent persona | 一致 | [job-ready agents 2026-09-11](https://www.salesforce.com/news/stories/agentforce-job-ready-ai-agents/)；[SMB blog 2026-09-14](https://www.salesforce.com/blog/small-business/meet-your-digital-teammate-for-service-agent/) | 七 agent 為會前發布 |
| 5M conversations 定義 | 已修正 | [Customer Zero](https://www.salesforce.com/agentforce/use-cases/customer-zero/) | Help／Agentforce on Help；非一律＝Casey |
| Casey／Fin 合併路徑 | 查無 | （無） | 官方講 choice／portfolio |
| Fin Apex vs Claude 官方分工 | 仍查無 | （無） | Dreamforce 後仍無；保留勿斷言 |
| Claudeforce all-customer beta | 一致 | AIforce 09/15 | Sales skills；service 未來；台上另稱 open beta |
| AIforce 首發三件套 | 一致 | AIforce PR | Claudeforce／Slackforce／Coworker；**Fin 不在三件套** |
| Core／Advanced／Max 官價 | 一致 | [sales pricing](https://www.salesforce.com/sales/pricing/)；[editions 09/03](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) | $195／$395／$550；Slack／Tableau／credits 捆綁 |
| $2／$0.99／$2 成果錶 | 一致 | [Agentforce pricing](https://www.salesforce.com/agentforce/pricing/)；[fin.ai/pricing](https://fin.ai/pricing) | 席次**未被**取代；雙軌 |
| AIforce＋Zero Data Retention | 確認 | [AIforce announcement](https://www.salesforce.com/news/stories/aiforce-announcement/) | 2026-09-15；T1 |
| Hunter $500M pipeline | 台上宣稱 | keynote 轉寫；Salesforce Ben | 歸因 Hunter vs Hunter+Piper 不一；非 SEC |
| Hunter $2B annualized | **非官方** | [G2 keynote recap](https://learn.g2.com/dreamforce-2026-keynote-recap) | 作者外推；勿當官方 |
| Fin 30k vs Agentforce 30k | 已分開 | 交割稿；轉寫／Ben；[metrics 25k+](https://www.salesforce.com/eu/agentforce/metrics/) | 禁止合併；台上 vs 產品頁並陳 |
| Fulton 80k／$389M | 僅 T3 | [Ben Agentforce keynote](https://www.salesforceben.com/complete-roundup-of-the-agentforce-keynote-at-dreamforce-26/) | 官方稿僅有 Coworker 引言 |
| SMB Keynote ft. Fin | 有 Salesforce+ 成片 | [episode-s1e2](https://www.salesforce.com/plus/experience/dreamforce_2026/series/small_and_medium_business_at_dreamforce_2026/episode/episode-s1e2) | Fin＝turnkey newest；含 Des Traynor |
| Stage 8 Over 90% 場次 | 查無錄影／摘要／舉行確證 | （無） | 勿塌縮進平均值 |
| Apex 2.8% vs 3.5pp／獨立複現 | 仍矛盾；仍查無複現 | fin.ai/cx-models；VentureBeat | 維持原狀（T7a） |
| Zendesk／Sierra／Bret Taylor 回應 | 仍查無 | newsroom；sierra.ai/blog | T7b |
| Form 8-K Item 2.01 | 仍查無；S-8 確認 09-10 交割 | [EDGAR S-8](https://www.sec.gov/Archives/edgar/data/1108524/000110852426000204/forms-8xfinequityplan.htm) | 無 PPA；T7c |
| DE B7-50/26 PDF／ACCC 原文 | PDF 仍未取回；ACCC URL 被擋 | （無） | 維持前輪；T7d |
| 台灣市場 | 仍查無客戶／定價／專稿 | （無） | 繁中支援前輪已記；T7e |
| Listen Labs（會期） | 仍未簽約；DF 無官宣 | BI／TC 2026-09-09 | T7f |
| Headless 360 in published article（T8） | 已發布文 2 行／3 次；前作備忘 6 行／7 次 | `docs/articles/2026-08-27-…`；`drafts/2026-08-27-…` | **建議 footnote，本輪未改已發布文** |
| Koa 官方 PR 定位／Nemotron 3 Super／synthetic／no customer data | 一致 | [Koa PR 2026-09-15](https://www.salesforce.com/news/press-releases/2026/09/15/koa-reasoning-model/) | first CRM reasoning model for Agentforce；27y／nearly three decades 並存 |
| Why We Post-Trained／trust boundary／alongside frontier | 一致 | [Why We Post-Trained 2026-09-16](https://www.salesforce.com/news/stories/why-we-post-trained-our-own-reasoning-model/) | co-engineered；Koa handles multi-step enterprise reasoning |
| Koa 產品頁 fourth provider／opt-in／GA | 一致 | [agentforce/koa](https://www.salesforce.com/agentforce/koa/) | pilot now；GA winter 2026 U.S. |
| CRM Bench 名稱與 vendor 自建 | 已寫清 | PR／NVIDIA／產品頁；[arXiv 2609.15066](https://arxiv.org/abs/2609.15066) | 非獨立產業標準；無第三方複現 |
| 3x fewer errors 對照組 | 已修正 | Koa PR／產品頁 | **未點名** Claude／GPT |
| arXiv：低於 strongest frontier；無 3x 句 | 已修正 | arXiv 2609.15066 | Koa 0.86 vs Opus 4.8 0.87 vs GPT-5.5 0.90 |
| Koa 進入 Atlas | 查無 | （PR／故事／NVIDIA／產品頁 Atlas=0） | 可寫 selectable provider，不可寫已進 Atlas |
| Koa 取代 Claude／官方點名分工 | 查無 | （無） | Why We Post-Trained 僅 frontier 總稱 |
| 官方稱 Koa 比 Claude 便宜 | 查無（媒體有） | TechCrunch 2026-09-15 | 定價頁無 Koa |
| 官方租／買／造戰略聲明 | 查無 | （無） | 三層＝分析框架 |
| Koa vs Fin Apex 分工／整併 | 查無 | Koa 材料零 Fin Apex | 領域潛在重疊屬推論 |
| Koa→AI Research；Fin→AI Labs | 已修正 | 交割稿；Why We Post-Trained／arXiv | 仍不可逕自等同 |
| Koa 公開計價／Flex Credits | 查無 | [Agentforce pricing](https://www.salesforce.com/agentforce/pricing/) 2026-09-18 | Koa／Nemotron=0 |
| NVIDIA deep technical collaboration／Jensen 引語 | 一致 | Koa PR；NVIDIA Dreamforce blog | 非股權交易敘事 |
| Nemotron Open Model License | 一致 | NVIDIA license 頁 | 可商用衍生；Koa 權重由 SF 控制 |
| Koa 合作含 Salesforce↔NVIDIA 新股權 | 查無 | 官方稿無披露 | 勿與 Anthropic 持股對稱編造 |
| Anthropic 對 Koa 回應 | 查無 | anthropic.com/news 2026-09-18 | SF／DF／Koa／Claudeforce=0 |
| TechCrunch／Techzine 三模型並讀 | 一致（媒體） | TechCrunch 2026-09-15；Techzine | 非官方三層戰略名 |
| R1 七月 Right-Sizing 原文（第四輪） | 一致（標題、作者、日期） | [Right-Sizing 2026-07-08](https://www.salesforce.com/news/stories/cutting-inference-spend-by-right-sizing-models/) | Jayesh Govindarajan；schema datePublished 2026-07-08T14:50:58Z |
| R1 Salesforce 在前作發表前已跑自家模型 | **屬實（結論 A），範圍限定** | 同上；[Engineering 2025-11-20](https://engineering.salesforce.com/solving-real-time-ai-classification-for-agentforce-how-single-token-prediction-delivers-30x-faster-agent-responses/) | HyperClassifier GA Spring ’26、Agentforce Service／Employee Agent 範本預設；Toxicity、TextEval、TextRerank GA；PID rolling out |
| R1 五個模型的來歷 | 開源微調，非從零訓練 | Right-Sizing 原文 | 「We weren’t training from scratch」；HyperClassifier、TextEval 皆微調自 GPT-OSS-20B；**非** xLAM、xGen |
| R1 保留給前沿模型的工作 | 已逐字核對 | Right-Sizing 原文 | 「A frontier foundation model still handles the core muti-step reasoning」（原文拼字）；對照 Koa「handles multi-step enterprise reasoning」 |
| R1 是否點名 Claude | 否 | Right-Sizing 原文 | Claude、Anthropic 出現次數 0；只寫「a single rented model」 |
| R1 搜尋摘要「大部分推理」 | 已修正 | Right-Sizing 原文 | 原文為「a growing share of the stack」，不可寫「大部分」 |
| R1 Help Salesforce-Owned Models | 一致（讀取當下） | Help ai.generative_ai_llm_salesforce_owned（無日期） | 「creates, trains, and fine tunes models」；CodeGen、HyperClassifier、TextEval |
| R1 xLAM 生產佐證 | 證據不足，官方說法有張力 | [2024-09-06 稿](https://www.salesforce.com/news/stories/agentforce-ai-models-announcement/) | 2024 稱專有版驅動 Agentforce；2026-07 稱 18 個月前全靠單一租用模型；勿寫進正文 |
| R1 xGen-Sales 正式上線 | 查無可靠來源 | [xGen-Sales 部落格 2024-10-21](https://www.salesforce.com/blog/xgen-sales/) | 當時僅 subset of pilot customers；GA 無一手紀錄 |
| R1 xLAM-2 開源權重 | 一致 | [arXiv 2504.03601](https://arxiv.org/abs/2504.03601)；[Hugging Face 模型卡](https://huggingface.co/Salesforce/Llama-xLAM-2-8b-fc-r) | 2025-04 research release |
| R2 Salesforce Ben Headless 360→AIforce | 連結正確 | [Salesforce Ben 2026-09-16](https://www.salesforceben.com/comparing-salesforces-aiforce-headless-360-and-the-enterprise-ai-harness/) | Sasha Semjonova；逐字引述 Help 並附連結 |
| R2 Help AIforce 版本說明 | 已讀原文（T1） | [Help rn_headless360](https://help.salesforce.com/s/articleView?id=release-notes.rn_headless360.htm&release=264&type=5) | 「As of September 4, 2026, Headless 360 has been rebranded to AIforce」；建議前作改引此頁，導言「尚未發布正式改名說明」需改寫（由使用者決定） |
| R3 Koa 以 Flex Credits 計價 | 查無官方佐證 | [Koa 產品頁](https://www.salesforce.com/agentforce/koa/)；[Rate Card 2026-08-31](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) | Koa=0；K4 結論維持，已補註 |
| R4 Computer Weekly「cheaper than Claude」 | **原文不存在** | [Computer Weekly 2026-09-17](https://www.computerweekly.com/news/366650532/Salesforce-wants-ASEAN-customers-to-stop-thinking-in-tokens) | Aaron Tan；schema 2026-09-16 21:02 UTC；只有記者副標「hand simple tasks to cheaper models」與 Barfield「sledgehammer to cut a nut」 |
| R5 CNBC 模型選擇段落 | 已逐字核對 | [CNBC 2026-09-18](https://www.cnbc.com/2026/09/18/at-dreamforce-business-leaders-say-older-ai-models-are-enough.html) | 「isn't relying on … Claude Fable 5.1 or … GPT-6 Astra, according to a support page」為記者推論 |
| R5 CNBC 引用的支援頁 | 已讀原文 | [Help Select Agentforce Model Option](https://help.salesforce.com/s/articleView?id=ai.agent_setup_select_model_provider.htm&type=5)（無日期） | Salesforce Default：新版 builder GPT-4.1、舊版 GPT-4o；AWS-Hosted：Claude Haiku 4.5；Gemini 3.5 Flash；Agentforce 預設**不是** Claude |
| R6 The Register Claude 成本 | 一致（來源為投資人大會） | [The Register 2026-09-03](https://www.theregister.com/ai-and-ml/2026/09/03/salesforce-blames-its-claude-addiction-for-denting-profit-margin-guidance/5294219)；[DB 大會逐字稿 2026-08-27](https://stockanalysis.com/stocks/crm/transcripts/737696-deutsche-bank-2026-technology-conference/) | Mike Spencer 原話；內部研發 token 成本，非 Claudeforce 產品成本；標題 addiction 為媒體語氣 |
| R6 法說會與財報對照 | 一致；法說會未提 token | [FY27 Q2 EX-99.1](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm)；[Q1 EX-99.1](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000125/crm-q1fy27xexhibit991.htm)；[法說會逐字稿](https://www.fool.com/earnings/call-transcripts/2026/08/31/salesforce-crm-q2-2027-earnings-call-transcript/) | Q2 GAAP 營益率 20.5%；FY GAAP 指引 20.6%→20.1%，non-GAAP 維持 34.3% |
| R7 fin.ai/pricing | 一致 | [fin.ai/pricing](https://fin.ai/pricing)（2026-09-27 讀取） | $0.99/outcome；50 outcomes/month minimum；qualifications $9.99 |
| V1 Claudeforce 新聞稿 Claude 預設產品清單（第五輪） | 一致；Atlas 措辭需微調 | [Claudeforce 新聞稿 2026-08-26](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)（2026-09-28 curl 讀全文；WebFetch 被擋） | 第 2 節「serving as a reasoning model for the Atlas Reasoning Engine, powering Agentforce Vibes and Agentforce Coworker by default, and available in Agent Builder」；第 3 節「Claude is the default model for Slack」、Slackbot「by default」；第 4 節「Claude is the default model for Slack AI, Slackbot, Salesforce in Claude, Headless 360, Agentforce Coworker, and Claude Code across Salesforce's engineering organization」（放在互為客戶段落，範圍不明）。Atlas 為「a reasoning model」，無 optional／default；Headless 360 出現兩次；Claude Code 與 Claude Enterprise 將開放給全體開發者與知識工作者 |
| V2 Bloomberg Anthropic 持股約 50 億美元（第五輪） | **僅見 Bloomberg 標題，正文未讀** | [Bloomberg 2026-06-01](https://www.bloomberg.com/news/articles/2026-06-01/salesforce-investment-in-anthropic-is-valued-at-about-5-billion) | WebFetch 與 curl 皆為機器人驗證頁（HTTP 403）。標題〈Salesforce Investment in Anthropic Is Valued at About $5 Billion〉；作者、時間與第一段只見於搜尋索引（Brody Ford；美東 12:21 PM；「worth about $5 billion」、匿名知情人士），不算讀過原文。本 memo 第 181、197 行仍沿用舊措辭，未改 |
| V2 SEC 揭露 Anthropic 持股（第五輪） | **一致，建議改引（T1）** | [FY27 Q2 10-Q](https://www.sec.gov/Archives/edgar/data/1108524/000110852426000190/crm-20260731.htm)（2026-08-27 申報）；[FY27 Q1 10-Q](https://www.sec.gov/Archives/edgar/data/1108524/000110852426000127/crm-20260430.htm)（2026-05-28 申報） | Q2：截至 2026-07-31 組合 $11.3B，「investment in Anthropic PBC (“Anthropic”) which represented approximately $5.1 billion」；占組合約 45%（01-31 為 22%）；Anthropic 未實現利得 $2.7B（三個月）、$3.0B（六個月）；口徑為 carrying value。Q1 未點名 Anthropic（兩筆各逾 5%、合計 37%）。2026-07-31 之後新數字查無可靠來源 |
| V2 法說會／財報稿提及 Anthropic 持股價值（第五輪） | 無金額 | [FY27 Q2 EX-99.1](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm)；[Motley Fool 逐字稿](https://www.fool.com/earnings/call-transcripts/2026/08/31/salesforce-crm-q2-2027-earnings-call-transcript/)（T3） | EX-99.1 Anthropic=0；逐字稿 Benioff「Then take the value of our Anthropic stock. That has been like half our value.」語意不明、無金額，不可當持股價值引用 |
| V3 客服 9,000→5,000 原始出處（第五輪） | 一致；數字為 Benioff 原話 | [Logan Bartlett Show EP 149（Apple Podcasts 2025-08-29）](https://podcasts.apple.com/us/podcast/ep-149-marc-benioff-ceo-salesforce-predicts-half-of/id1606770839?i=1000724017332)；[Fortune 2025-09-02](https://fortune.com/2025/09/02/salesforce-ceo-billionaire-marc-benioff-ai-agents-jobs-layoffs-customer-service-sales/)；[CNBC 2025-09-02](https://www.cnbc.com/2025/09/02/salesforce-ceo-confirms-4000-layoffs-because-i-need-less-heads-with-ai.html) | 未聽音檔；Fortune、CNBC 一致引述「I've reduced it from 9,000 heads to about 5,000, because I need less heads.」；部門為「my support」；4,000 為媒體相減；發言人稱「no longer need to actively backfill support engineer roles」、「redeployed hundreds of employees」；起訖時間未明說 |
| V3 2025-09 後是否更新數字（第五輪） | 查無可靠來源 | [Reshaping Workforce 2026-04-29](https://www.salesforce.com/news/stories/salesforce-reshaping-workforce-in-age-of-ai/)；[AI Workforce Strategy 2026-04-29](https://www.salesforce.com/news/stories/ai-workforce-strategy/) | 官方只寫「redeployed hundreds of support engineers」、「not backfilling other roles」；無新人數 |
| V4 簽約新聞稿預計交割時程（第五輪） | 一致 | [簽約新聞稿 2026-06-15](https://www.salesforce.com/news/press-releases/2026/06/15/salesforce-signs-definitive-agreement-to-acquire-fin/) | 「The transaction is expected to close in the fourth quarter of Salesforce's fiscal year 2027, subject to the satisfaction of customary closing conditions, including the receipt of required regulatory clearances.」 |

## 交接備註

### 研究狀態

- [x] 資料收集完成
- [x] 大綱確定（見第七節；**角度 B 雙軌定價**；**角度 A 已改三層架構**；建議 **C 開場＋A 拆解**）
- [x] **2026-09-11 一手來源核實輪次完成**
- [x] **2026-09-18 Dreamforce 會後核實（round 2）完成**
- [x] **2026-09-18 Koa／三層模型核實（round 3）完成**（新增「Koa 與三層模型策略」；改寫 3.2／3.4／7.1／7.3／核實表）
- [x] 可開始撰寫（下一動：詳細大綱，段落層級標數據）

### 已完成（round 2）

1. ~~Dreamforce 台上內容~~：SMB Keynote ft. Fin 有 Salesforce+ 成片；Stage 8「Over 90%」查無錄影／摘要
2. ~~定價方向~~：確認席次捆綁＋成果計價雙軌；角度 B 已改寫
3. ~~Casey／Fin 分工與七 agent 日期~~：Casey＝Help persona；9/11 會前；合併路徑查無
4. ~~產品改名範圍~~：Sales Cloud 復名、Agentforce 360／Fin 保留；Headless 360 三套說法並陳
5. ~~AIforce／Claudeforce beta／兩個 30k／Hunter $500M vs $2B~~：已寫入會後更新節

### 已完成（round 3）

1. ~~Koa 官方定位／規格／CRM Bench／3x／論文 nuance~~：見「Koa 與三層模型策略」K1
2. ~~Koa vs Claude／Atlas／便宜論／租買造官方聲明~~：K2；多數查無，可選並存有官方訊號
3. ~~Koa vs Fin Apex／AI Labs vs AI Research~~：K3；分工與整併查無
4. ~~Koa 定價~~：定價頁零提及；角度 B 暫不強制改寫
5. ~~NVIDIA 合作／Jensen／open weights／股權~~：K5；股權查無
6. ~~外部三層並讀／Anthropic 回應~~：K6
7. ~~3.2 堆疊表、3.4 三套敘事、7.1 角度 A、7.3 Koa 管制分組~~：已改寫

### 給 writer：角度 C vs A 的 Koa 素材（brief next_step）

**適合角度 C（諷刺／荒謬開場）：**

- 會前剛把 Claude 立為預設／Claudeforce broad beta；會上又發表自研 CRM reasoning model Koa
- TechCrunch「AI labs should fear」vs 同稿「isn't exactly abandoning Anthropic」
- PR「3x fewer errors」（未點名）vs 自家論文「below the strongest frontier models」
- Anthropic 是 Fin 客戶＋Fin Apex 自稱贏 Claude＋Salesforce 同時租 Claude、買 Fin、造 Koa

**適合角度 A（架構段）：**

- 產品頁「fourth model provider／opt-in」＝可選並存硬事實
- Why We Post-Trained「alongside frontier LLMs」＋ Koa 專責 multi-step enterprise reasoning
- Fin＝AI Labs／成果代理；Koa＝AI Research＋Agentforce 平台推理選項；Claude＝frontier／Claudeforce（結構可畫，箭頭多屬推論）
- trust boundary／控制 weights；pilot now、GA winter 2026 U.S.
- **不要**在架構段把租買造寫成官方戰略名；每條箭頭標「官方／推論」

### 待補充項目（仍開放）

1. **購買價格分攤（PPA）/ 商譽**：對價已確認為約 36 億美元現金；earnout 仍查無。FY27 Q3 財報若揭露 PPA 可回頭補。S-8（2026-09-10／11）確認交割但無 PPA
2. **Claude／Fin Apex／Koa 官方點名分工**（含 Koa 是否進 Atlas）：Dreamforce／Koa round 後**仍查無**；角度 A 關係箭頭維持推論
3. **獨立第三方對 Fin Apex／Koa CRM Bench 的複現**：仍查無；Fin 2.8% vs 3.5pp 矛盾仍在
4. **Koa 公開計價／是否納入 Flex Credits**：定價頁仍無；若 GA 前上架需回頭補，並評估是否動到角度 B
5. **Zendesk 與 Sierra／Bret Taylor 的官方回應**：仍查無
6. **台灣客戶名單 / 本地定價 / Salesforce Taiwan Fin PR**：仍查無（繁中支援已確認）
7. **Listen Labs**：截至 2026-09-18 仍為約 20 億美元洽談、未簽約；Dreamforce **無**官宣
8. **交割專屬 Form 8-K Item 2.01**：仍查無；可用 S-8 作 SEC 交割確認
9. **德國 B7-50/26 clearance PDF**、**ACCC Phase 1 原文**：仍未取回一手 PDF
10. **SMB Keynote 逐字聽寫**：本輪僅核到 Salesforce+ metadata，未逐字聽完成片
11. ~~**T8 已發布前作術語**~~ **已處理（經使用者同意）**
    - 2026-09-26：前作文末新增「術語註記」，第 47 行加註指向文末
    - 2026-09-27：依第四輪 R2 修訂註記。初版寫「Salesforce 尚未發布正式的改名說明」不正確，改以 Help 官方文件為主要來源，並在註記中註明初版錯誤
    - 2026-09-27：依第四輪 R1 新增「更正」一節，說明「七年後，它不做模型了」不精確（七月 Right-Sizing 原文、2025 年 xLAM-2 開源），內文原句保留並加註
    - `drafts/2026-08-27-memo-salesforce-claudeforce-research.md`（已封存的前作備忘）未修改

### 續接建議

- **續接平台：** CLI
- **建議模板：** `templates/article-template.md`（深度分析文，3,000 至 4,500 字；或分析長文＋短觀點文兩篇，待大綱後決定）
- **文章標題（2026-09-26 定案）：** 〈二十天，三個選擇：Salesforce 租了 Claude、買了 Fin，又自己造了 Koa〉。結構為角度 C 開場、角度 A 拆解
- **段落大綱：** [2026-09-26-outline-salesforce-rent-buy-build.md](./2026-09-26-outline-salesforce-rent-buy-build.md)
- **特別注意：**
  - **交易已完成交割（2026-09-10），不要沿用「尚未完成」的舊前提；對價寫現金約 36 億美元**
  - **定價寫雙軌，不要寫席次制已被取代**；見會後更新 T4 與 7.1 角度 B；Koa 尚無官方價
  - **模型層寫三套（Claude／Fin Apex／Koa），租買造標分析框架**；見 3.2／3.4／7.1／Koa 節
  - 本文與 2026-08-27 的 Claudeforce 分析文為同一系列，建議在文中明確互相引用，並避免重複展開 Claudeforce 的產品細節；**前作已新增更正與術語註記（見上列 T8）**，續篇引用前作「它不做模型了」時要一併提到這則更正
  - 一手引述以 2026-09-11、**2026-09-18（round 2＋3）** 與 **2026-09-27（round 4）** 核實措辭為準；見「一手來源核實紀錄」
  - 數字可信度分層：Salesforce／NVIDIA 官方與 SEC 最可信；vendor benchmark（Fin Apex、Koa CRM Bench）次之且須標自建；Sacra 為估算；分析部落格／TechCrunch 架構解讀只能當觀點；keynote 非官方轉寫須標明
