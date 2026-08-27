---
title: "Claudeforce：Salesforce 用 27 年招牌，換一張 AI 時代的入場券"
description: "2026 年 8 月 26 日，Salesforce 交出創紀錄財報的同一天，把自家沿用近三十年、只留給自有產品的 -force 命名資產讓給了 Anthropic。這場品牌讓渡的背後，是一場關於誰能掌握企業軟體定價權的豪賭。"
date: 2026-08-27
author: "Clement Tang"
tags: ["議題研究", "AI", "企業軟體", "Salesforce", "Anthropic", "OpenAI", "競爭分析"]
category: articles
status: draft
---

# Claudeforce：Salesforce 用 27 年招牌，換一張 AI 時代的入場券

> Salesforce 與 Anthropic 在 2026 年 8 月 26 日共同發布 Claudeforce，把 Claude 直接嵌進 CRM 的核心工作流。財報數字亮眼，商業質疑同樣尖銳，這篇文章試著把兩件事放在一起看。

## 元資料

| 項目         | 內容                                                             |
| ------------ | ---------------------------------------------------------------- |
| **建立日期** | 2026-08-27                                                       |
| **更新日期** | 2026-08-27                                                       |
| **標籤**     | #議題研究 #AI #企業軟體 #Salesforce #Anthropic #OpenAI #競爭分析 |
| **狀態**     | 草稿                                                              |
| **字數**     | 約 5,000 字                                                       |

---

## The Big Picture

2026 年 8 月 26 日，Salesforce 公布 FY27 第二季財報。營收 113.5 億美元，年增 11%，超越市場預期的 113.2 億美元；淨利 35.3 億美元，每股盈餘 4.29 美元，年增 87%；Non-GAAP 每股盈餘來到 5.90 美元，比分析師預估的 3.27 美元高出近八成。全年營收指引隨即上修到 461 億至 464 億美元之間，股價在盤後應聲上漲約 14%。

Marc Benioff 在同一場法說會上，用一句話回應過去半年市場對「SaaSpocalypse」（軟體末日）的焦慮：「這種 SaaSpocalypse 的胡說八道，我覺得該停止了。」但這場財報真正被記住的，很可能是同一天發布的另一則新聞，Benioff 這句反擊反倒成了前菜。Salesforce 與 Anthropic 共同宣布，推出一個叫做 Claudeforce 的合作品牌，官方新聞稿的標題直白到近乎誇張：〈Salesforce and Anthropic Announce Claudeforce: The #1 AI Meets the #1 AI CRM〉。Benioff 在 X 上寫道，「Claudeforce is here. 第 1 名的 AI 現在原生跑在第 1 名的 CRM 上」，透過新的 AIforce harness 與 Headless 360，Claude 可以直接、受治理地存取 Data 360、Tableau、Slack 與整個 Salesforce 工作流，「全程不用離開對話」。

`-force` 這個字尾，過去 27 年來只出現在 Salesforce 自己的產品名裡，從公司本名 salesforce.com、開發平台 Force.com，到近兩年的 Agentforce，一路都是自家血統。多家報導指出，這是 Salesforce 第一次把這個字尾掛在別家公司的產品名稱上。一家把命名權看得極重的公司，在財報最風光的那一天，選擇把它讓出去。這個動作本身，比任何一項財報數字都更值得拆解。

## Why It Matters

如果你的公司用 Salesforce 管理客戶關係、用 Slack 溝通日常工作，這則新聞不只是產業八卦。Claudeforce 意味著你原本熟悉的介面，正在被一層會思考、會推理的對話層取代，而那層對話的底層模型不屬於 Salesforce，屬於 Anthropic。你的客戶資料、你的業務流程、你團隊的討論紀錄，未來很可能是透過 Claude 而不是透過 Salesforce 的頁面被存取與執行。

對投資人與企業軟體從業者而言，Claudeforce 提供了一個少見的公開樣本，讓人觀察一家市值數千億美元的老牌 SaaS 公司，如何在「自己做模型」與「把模型外包給別人」之間做出選擇，以及這個選擇如何影響它的定價權。這場豪賭的賭注很大，贏了，Salesforce 證明資料與治理層的價值高於介面層；輸了，它可能會發現自己親手把最值錢的入口，讓給了一家它投資了近 50 億美元的公司。

---

## 主要內容

### Claudeforce 到底是什麼：一個外掛，加上一整層預設模型的更換

在追問 Claudeforce 代表什麼之前，有必要先說清楚它實際上是什麼。首發產品名為「Salesforce in Claude」，形式是 Claude 裡的一個 plugin，底層技術走 MCP 與 MCP Apps，內建 37 個預建銷售技能，涵蓋會議準備、成交健康度檢視、pipeline 檢視等業務日常工作。官方把它形容成業務人員的「AI CRO」，賣點是可以在 Claude 的對話視窗裡直接查詢、更新 live CRM 資料並採取行動，完全不必打開 Salesforce 本身；但所有動作最終仍會路由回 Salesforce 執行，確保既有的商業規則被強制套用。上市時程分成三段：2026 年 8 月 26 日起先開放給精選的 pilot 客戶，2026 年 9 月進入 open beta，涵蓋其他職能的技能則預計自第三季起陸續推出。Salesforce 目前未公布任何定價資訊。

把 Claudeforce 只理解成一個外掛，會低估這件事的規模。它其實是一個傘狀合作品牌，Claude 同時成為 Slack AI 與 Slackbot 的預設模型，並透過 Claude Tag 支援團隊決策；在 Agentforce 這一側，Claude 是 Atlas Reasoning Engine 可選用的推理模型之一，同時是 Agentforce Vibes 與 Agentforce Coworker 的預設模型；在 Headless 360 裡，Claude 同樣是預設模型。Salesforce 甚至把 Claude Code 部署到自己全球的工程組織內部使用。Claudeforce 牽動的是整條產品線，把 Claude 塞進 Salesforce 幾乎每一個會用到模型推理的位置，範圍遠遠超出單一產品的單一功能。

Anthropic 執行長 Dario Amodei 在新聞稿裡的說法，恰好與 Benioff 的高調形成對照：「我們相信前沿智慧應該是安全、可信、且能力深厚的，這正是全球頂尖企業把最重要的工作交給 Claude 的原因。Salesforce in Claude 把同樣的前沿智慧帶進全世界大多數商業活動實際發生的系統裡。透過這個合作，企業可以把 Claude 指向他們在 Salesforce 裡累積數十年的客戶資訊與商業脈絡，並真正用它來經營與成長。」

### 從 Agentforce 到 Agentforce 360：一路狂奔，又一路被質疑的兩年

Salesforce 的 agentic AI 產品線始於 2024 年 10 月的 Agentforce 1.0，第一代企業 AI agent 平台。此後版本更新的速度幾乎是每季一次：2024 年 12 月推出 Agentforce 2，強化 Atlas Reasoning Engine，追求更可預測、有依據的推理結果；2025 年 3 月的 Agentforce 2dx 讓 agent 可以嵌入任何工作流，支援主動觸發與跨職能協作；2025 年 6 月的 Agentforce 3 補上互通性與治理能力，為規模化部署鋪路；最終在 2025 年 10 月 13 日的 Dreamforce 大會上，Agentforce 360 正式全面上線，被定位為「連結人與 AI agent 的單一可信系統」。

這條產品線在財報數字上的表現確實搶眼。FY27 第二季，Agentforce ARR 突破 15 億美元，年增逾 240%；加上 Data 360 的 24 億美元 ARR（年增逾 200%），兩者合計近 39 億美元。Agentic Work Units（AWU，用來衡量 agent 實際完成工作量的指標）累計達 70 億，光是這一季就新增 32 億，季增 97%。往前一季看同樣熱鬧，FY27 第一季 Agentforce ARR 為 12 億美元、年增 205%，Slack MCP server 上線六週內就衝破 100 萬活躍使用者。

但這份成績單裡藏著一個值得放慢速度看的細節。Salesforce 在 FY27 第二季財報中揭露，「自本季起，Agentforce ARR 的計算範圍納入 AI offerings、Slackbot 與 Headless 360」，換句話說，這一季才把 Slackbot 與 Headless 360 這兩項產品的 ARR 併入 Agentforce 這個口徑。這不代表數字造假，Slackbot 與 Headless 360 本來就是 Claudeforce 傘狀品牌下的一員，把它們算進 Agentforce ARR 也有其邏輯。但這也意味著，15 億美元、年增 240% 這組被市場反覆引用的數字，並非在同一個統計基礎上與去年同期比較。任何想拿這個數字做逐季趨勢推論的人，都應該先意識到分母在這一季被動過。

Salesforce 也持續把 agent 取代人力的敘事講得很直接。Benioff 在 2025 年 9 月證實，公司客服團隊已從約 9,000 人縮減至約 5,000 人，減幅高達 44%，AI agent 目前處理約一半的客戶對話，客服成本因此下降 17%。他當時的說法是「I need less heads」。2026 年 2 月與 6 月又各有一輪裁員，Benioff 表示除了業務團隊以外，公司幾乎全面凍結招募。

然而外界的評價並不一致。2026 年 7 月，KeyBanc 將 Salesforce 的評等從 Overweight 降至 Sector Weight，理由來自一份 CIO 調查，結論相當直白，「a standout for the wrong reasons」。客戶回饋集中在兩個共通點：資料還沒整理好，做不了有意義的 AI；以及 Agentforce 這個產品「就是還沒到位」（isn't there yet）。調查同時發現，多數客戶不願意透過 CRM 供應商付費購買 AI 能力，並抱怨漲價幅度過於激進；預期未來 12 個月會調降 Salesforce 預算優先序的 CIO，人數也多於打算提高預算的 CIO。

這種落差不是 Salesforce 獨有的問題。研究機構 Gartner 預測，到 2027 年底，超過 40% 的 agentic AI 專案會被取消，原因是成本失控、商業價值不明、風險控管不足，並預期 2026 年將有三分之一企業因為過早部署 AI 而傷害了客戶體驗。把這兩組訊息放在一起看，Salesforce 財報上的高速成長曲線，與客戶端「產品還沒準備好」的抱怨，很可能同時為真。一家公司完全可以一邊靠著擴大計算口徑交出漂亮的年增率，一邊還在補齊產品本身的完成度。Claudeforce，某種程度上正是 Salesforce 對這道落差給出的答案，用外部最強的模型，去填補自研 agent 目前還填不滿的那塊空缺。

### Slack 的兩段式操作：先關門，再發鑰匙

要理解 Claudeforce 為什麼會長成現在這個樣子，繞不開 Slack。Slack 手上握有企業內部最稀缺的一種資產，對話式資料與 work graph，也就是誰在跟誰討論什麼、一筆交易卡在哪個環節、一個決策是怎麼被做出來的。這些脈絡不存在於 CRM 的欄位裡，卻恰恰是 AI agent 判斷「這件事到底進行到哪一步」所需要的關鍵資訊。規模上，Slack 在 2025 年初的日活躍使用者超過 4,200 萬，近八成的 Fortune 100 企業都在使用，但它在企業通訊市場的份額約 13%，仍遠遠落後 Microsoft Teams 的約 37%。

Slack 對第三方存取這批資料的態度，在過去一年裡經歷了一次明顯的反轉。2025 年 5 月 29 日，Slack 更新服務條款，新增資料使用章節，明文禁止透過 API 大量匯出資料，也禁止用 Slack API 取得的資料訓練大型語言模型。像 Glean 這類企業搜尋業者因此無法再長期索引或儲存 Slack 資料，只能暫時取用後刪除，Glean 當時甚至對客戶發信警告，這項政策會「妨礙你把資料用在自選的企業 AI 平台上」。Salesforce 官方的解釋是，「當 AI 帶來客戶資料如何被處理的關鍵考量時，我們正在強化 Slack API 資料如何被儲存、使用與分享的防護措施」。

半年之後，門開始重新打開，只是走的是另一條路。2025 年 10 月的 Dreamforce 大會上，Slack 預告 Real-Time Search API 與 MCP server；2026 年 1 月 13 日，由 Claude 驅動的新版 Slackbot 上線，被定位為可跨 Salesforce CRM、Google Drive、Microsoft Teams 取用資料的「super agent」；2026 年 2 月 17 日，RTS API 與 MCP server 正式全面上線，超過 50 家夥伴（包含 Anthropic、Google、OpenAI、Perplexity）在上面打造具備情境感知能力的 agent，RTS 查詢與 MCP tool call 的呼叫量成長了 25 倍。2026 年 6 月 23 日，Anthropic 進一步推出 Claude Tag，使用者可以在頻道裡直接標記 @Claude 指派任務、讓它記住頻道脈絡，舊版的 Claude in Slack 整合則在同年 8 月 3 日正式退役。

把這兩段動作連起來看，順序其實很清楚。先是無償、大量、繞過 Salesforce 基礎設施的批量存取被封死，接著才由 Salesforce 自己以 API 與 MCP server 的形式，重新開放一條受控、可稽核、資料留在 Slack 系統內的存取路徑。Slack 因此從一個「容易被外部工具搜刮的資料來源」，轉型為一個「發放存取許可的守門人」。而 Anthropic 之所以能在這道門裡走得比誰都深，某種程度上正是因為它選擇了配合這套規則，而不是繞過它。這也解釋了為什麼 Claudeforce 的官方定位裡，會特別強調「受治理地存取」這幾個字，對 Salesforce 而言，開放存取看似慷慨，實則是一套精算過的可控機制。

這段時期裡也發生了一段值得記住的人事插曲。2025 年 11 月，Sam Altman 公開批評 Slack「creates a lot of fake work」，暗示 OpenAI 有可能自己動手做生產力工具來取代它。一個月後，2025 年 12 月 9 日，OpenAI 把 Slack 執行長 Denise Dresser 挖走，出任 Chief Revenue Officer，向 COO Brad Lightcap 匯報。Dresser 在轉任 Slack 執行長之前，已經在 Salesforce 體系內待了超過十年。九個月之後，Salesforce 把守護了 27 年的 `-force` 字尾，交給了 Anthropic 而不是 OpenAI。這兩件事未必有直接的因果關係，但擺在同一條時間軸上，它們共同勾勒出一幅畫面，OpenAI 一邊貶低 Slack 的價值，一邊挖走它的商業領導者，而 Salesforce 選擇把最珍視的品牌資產，交給了那個沒有先貶低過它的對象。

### 為什麼是 Anthropic：一次不只是技術選擇的品牌讓渡

Salesforce 選擇 Anthropic，有幾條線索可以追溯。最直接的是合規需求，金融服務、醫療、資安、生命科學這類受規管產業，對模型商能否進入企業信任邊界極度敏感。2025 年 10 月 14 日，Anthropic 與 Salesforce 宣布擴大策略合作，Claude 成為受規管產業的偏好模型，早期客戶包含 CrowdStrike 與 RBC Wealth Management。技術路徑走的是 Amazon Bedrock，所有 Claude 流量都被包在 Salesforce 的 VPC 之內，透過 AWS PrivateLink 連接，模型供應商無法存取客戶資料，Bedrock 本身也不儲存資料。Anthropic 也因此成為第一家完全整合進 Salesforce trust boundary 的大型語言模型供應商。

第二條線索是現實層面的能力落差。Salesforce 從未真正投入自研前沿模型的軍備競賽，它的資本結構與組織能力也不支持這麼做。與其硬撐一個追不上前沿實驗室的自有模型，不如把最強的推理能力外包出去，自己專注在資料、工作流與治理這一層，這是一條務實得近乎必然的路。

第三條線索帶有更明顯的個人色彩。Benioff 對 Microsoft 的敵意由來已久，早在 2024 年 10 月，他就公開炮轟 Copilot「令人失望」、「就是不能用，也不能提供任何準確度」，甚至說「Copilot 更像是 Clippy 2.0」。這種敵意讓 OpenAI 這個選項天然帶有折扣，畢竟 OpenAI 與 Microsoft 的資本與技術關係盤根錯節，選擇 OpenAI 某種程度上等於間接繫上 Microsoft。相較之下，Anthropic 沒有消費端流量的野心，也沒有自建 CRM 或生產力套件的企圖，在企業 API 市場上，它已經是排名最前面的選項之一。

最後一條線索，也是最容易被忽略的一條，是資本關係。Salesforce Ventures 自 2023 年 5 月的 Series C 起，連續參與 Anthropic 之後每一輪募資，到 2026 年 6 月，這筆持股價值約 50 億美元，據報導約占 Salesforce 整個策略投資組合的三分之二。這意味著 Salesforce 在自己最大的技術依賴對象身上，早已下了一筆重注。當 Anthropic 表現好，Salesforce 的帳面回報跟著漂亮；當 Claudeforce 成功，Anthropic 的估值故事也更有說服力。兩家公司的利益，早在品牌合作發生之前，就已經透過股權緊緊綁在一起。

讓 Claudeforce 顯得特殊的，其實是命名這個動作本身。技術整合的深度在企業軟體業並不罕見，真正罕見的是品牌的公開讓渡。Salesforce 過去 27 年來，`-force` 這個字尾只留給自己的產品，即便是與它關係同樣深厚的 AWS，也從未擁有過這樣的待遇；多家報導指出，這是它第一次把這項命名資產讓渡給另一家公司。這個決定背後有一層不容易迴避的張力，一家把品牌辨識度看得極重的企業，願意在市場面前承認，這一代 CRM 的價值主張已經需要靠別人的模型來背書。VentureBeat 用一個更直白的標題點出這個邏輯，Salesforce 讓客戶「不用打開 Salesforce 也能用 Salesforce」，這句話幾乎是自我去中介化的公開宣言。Benioff 選擇主動把入口讓給 Claude，賭的是資料與治理層的價值終究會高於介面層。

SaaSpocalypse 帶來的敘事壓力也不能忽視。過去一年，市場對 AI 是否會繞過既有 SaaS 介面、直接吞下企業軟體的價值展開激烈辯論，CNBC 在 2026 年 8 月初就以「SaaSpocalypse debate intensifies」為題，記錄軟體股在這場辯論中劇烈震盪的走勢。Claudeforce 是 Benioff 對這場辯論最具體的產品化反擊，它把「AI 會取代 Salesforce」這個假設，改寫成「AI 需要透過 Salesforce 才能運作」。耶魯大學的 Jeffrey Sonnenfeld 在財報同日於 Fortune 撰文〈The SaaSpocalypse that wasn't〉，論證 Salesforce、Booking Holdings、IBM 這類公司的護城河在 AI 時代反而更加穩固，呼應了 Benioff 的立場。

### 鏡像的另一半：OpenAI 走的是完全相反的路

如果只看 Salesforce 與 Anthropic 這一半的故事，很容易誤以為這是一場排他的選邊站。事實上，Salesforce 同樣與 OpenAI 有深度合作，只是形態完全不同。2025 年 10 月 14 日，也就是與 Anthropic 擴大合作的同一天，Salesforce 也宣布擴大與 OpenAI 的策略合作，Agentforce 360 進入 ChatGPT，Salesforce 平台上可以直接用 GPT-5 系列模型建構 agent，ChatGPT 與 Codex 也被帶進 Slack。到 2025 年 12 月至 2026 年 1 月，Agentforce Sales 進一步成為原生 ChatGPT app，開放 open beta。換句話說，OpenAI 也在 Salesforce 的產品版圖裡佔有一席之地，只是它是被放進 Salesforce 生態系裡的其中一個模型選項，而不是被 Salesforce 掛上自家招牌的合作對象。

OpenAI 在其他企業 SaaS 身上的佈局同樣清楚。2026 年 1 月 20 日，OpenAI 與 ServiceNow 宣布多年期策略合作，GPT-5.2 系列模型成為 ServiceNow 企業客戶的「preferred intelligence capability」，整合進 ServiceNow 的 AI Control Tower。零售端也有動作，2025 年 10 月起，Walmart 與 Target 先後讓消費者可以直接在 ChatGPT 內購物、結帳與連結會員帳號。OpenAI 自己的企業產品線也在同步擴張，2026 年 2 月 5 日發布的 OpenAI Frontier，是一個端到端的企業 agent 建置與管理平台，可連接資料源、CRM 與內部應用，甚至能管理在 OpenAI 之外建構的 agent；另一項產品 Company Knowledge，則讓 ChatGPT Business、Enterprise、Edu 版本可以連接 SharePoint、Google Drive、Slack、GitHub 等企業內部系統。

把這些案例攤開來看，一個明確的差異浮現出來：查證範圍內，沒有找到任何一家企業把 OpenAI 的品牌併入自己產品名稱的先例。ServiceNow 用的措辭是「preferred intelligence capability」，不是 ServiceNow×OpenAI 這種複合命名。這意味著 Claudeforce 在商業史上的特殊性，並不在於技術整合的深度，而在於品牌讓渡這個動作本身，至少到目前為止，這是獨此一家的案例。

這個差異其實反映了兩家公司完全相反的企業市場策略。OpenAI 從消費端的 ChatGPT 品牌與流量出發，往企業端滲透，因此它與 SaaS 巨頭的合作模式，多半是「把你的 app 放進我的介面」。Anthropic 則是從企業後端與程式碼協作起家，因此它與 SaaS 巨頭的合作模式，是「把我的模型放進你的系統，再讓你的系統出現在我的介面裡」，Claudeforce 之所以能做到雙向嵌入，正是因為 Anthropic 在 Slack 與 Agentforce 內部，已經耕耘了將近一年的存取權限。

這種策略差異在企業 LLM API 市場的佔比變化上，留下了清晰的痕跡。根據 Menlo Ventures 對技術主管的調查，2023 年時 OpenAI 在企業市場的佔有率約 50%，Anthropic 僅 12%；到 2025 年中，這個排序已經翻轉，Anthropic 上升到 32%，OpenAI 下滑到 25%；到 2025 年底，Anthropic 進一步擴大到 40%，OpenAI 降至 27%。同一份調查也指出，企業 LLM 支出在六個月內從 35 億美元翻倍到 84 億美元，市場規模在擴大，但擴大的主要受益者換了人。營收規模上，根據 Bloomberg 於 2026 年 8 月的報導，OpenAI 的年化營收 run rate 約 400 億美元；而據 Motley Fool 引述的資料，Anthropic 在同期的年化 run rate 約落在 650 億美元左右，方向感一致：在企業市場這條戰線上，Anthropic 走在前面。

---

## 總結

把這些線索拼在一起，Claudeforce 的輪廓其實相當清楚。它不只是一次產品整合，而是 Salesforce 對自己商業模式核心假設的一次重新表態。過去 27 年，Salesforce 的護城河建立在介面之上，客戶登入 Lightning 頁面、點擊按鈕、填寫欄位。Claudeforce 押的是另一套邏輯：與其說護城河是介面，不如說是這 27 年累積下來的客戶資料、metadata、工作流邏輯與治理框架，這些才是任何模型都變不出來、任何新創在短期內也複製不了的資產。與其被 Claude 或 ChatGPT 這類對話介面繞過，不如主動把自己變成它們背後的資料與執行層，讓「不用打開 Salesforce」本身變成 Salesforce 仍然不可或缺的證明。

這個賭注也有明顯會出錯的地方。如果企業客戶真正在意的介面，最終從 CRM 頁面全面轉移到像 Claude 這樣的對話層，定價權就會逐漸往「誰擁有智慧」的一方移動，而擁有 Claude 的是 Anthropic，不是 Salesforce。KeyBanc 調查裡「多數客戶不願意透過 CRM 供應商付費購買 AI 能力」這句話，某種程度上已經預告了這種風險：如果企業寧可直接向 Anthropic 或 OpenAI 付費買模型能力，Salesforce 能收取的，可能只剩下資料存取與治理這一層的過路費，而不再是完整的軟體授權費。Salesforce 用 27 年的招牌，換來的究竟是一張 agent 時代的入場券，還是一張讓別人主導定價的租約，這個問題現在還沒有答案，但財報之外的每一次 Agentforce 客戶滿意度調查、每一次 Anthropic IPO 前後的估值波動，都會是接下來觀察這場豪賭輸贏的座標。

---

## 參考資料

1. [Salesforce〈Salesforce and Anthropic Announce Claudeforce: The #1 AI Meets the #1 AI CRM〉（2026-08-26）](https://www.salesforce.com/news/press-releases/2026/08/26/salesforce-and-anthropic-announce-claudeforce/)
2. [Salesforce Claudeforce 產品頁](https://www.salesforce.com/claudeforce/)
3. [Marc Benioff on X：Claudeforce is here（2026-08-26）](https://x.com/Benioff/status/2092705110082347011)
4. [itbrief〈Salesforce & Anthropic launch Claudeforce partnership〉（2026-08-26）](https://itbrief.co.nz/story/salesforce-anthropic-launch-claudeforce-partnership)
5. [channellife〈Salesforce & Anthropic launch Claudeforce partnership〉（2026-08-26）](https://channellife.co.nz/story/salesforce-anthropic-launch-claudeforce-partnership)
6. [Salesforce Delivers Record Second Quarter Fiscal 2027 Results（投資人關係，2026-08-26）](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Second-Quarter-Fiscal-2027-Results/default.aspx)
7. [Salesforce FY27 Q2 8-K（SEC）](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000187/crm-q2fy27xexhibit991.htm)
8. [Salesforce FY27 Q1 8-K（SEC）](https://www.sec.gov/Archives/edgar/data/0001108524/000110852426000125/crm-q1fy27xexhibit991.htm)
9. [CNBC〈Salesforce (CRM) Q2 earnings report 2027〉（2026-08-26）](https://www.cnbc.com/2026/08/26/salesforce-crm-q2-earnings-report-2027.html)
10. [Investing.com〈Earnings call transcript: Salesforce tops Q2 2026 profit forecasts, shares jump〉](https://in.investing.com/news/stock-market-news/earnings-call-transcript-salesforce-tops-q2-2026-profit-forecasts-shares-jump-93CH-5572995)
11. [CNBC〈Salesforce, Anthropic expand partnership as Benioff responds to 'SaaSpocalypse' concerns〉（2026-08-26）](https://www.cnbc.com/2026/08/26/salesforce-anthropic-partnership-claudeforce.html)
12. [CNBC〈Salesforce CEO Marc Benioff says the 'SaaSpocalypse' is nonsense〉（2026-08-26）](https://www.cnbc.com/2026/08/26/salesforce-ceo-marc-benioff-saaspocalypse-nonsense.html)
13. [CNBC〈'SaaSpocalypse' debate intensifies as software stocks swing wildly〉（2026-08-07）](https://www.cnbc.com/2026/08/07/saaspocalypse-debate-intensifies-as-software-stocks-swing-wildly.html)
14. [Fortune〈The SaaSpocalypse that wasn't〉by Jeffrey Sonnenfeld（2026-08-26）](https://fortune.com/2026/08/26/saaspocalypse-salesforce-booking-ibm-sonnenfeld/)
15. [Salesforce Ben〈Salesforce and Anthropic Announce 'Claudeforce' in Q2 '27 Earnings〉（2026-08-26）](https://www.salesforceben.com/salesforce-and-anthropic-announce-claudeforce-in-q2-27-earnings/)
16. [Salesforce Ben〈From 1.0 to 3: How Agentforce has Evolved Since Its Launch〉](https://www.salesforceben.com/from-1-0-to-3-how-agentforce-has-evolved-since-its-launch/)
17. [TechCrunch〈Salesforce announces Agentforce 360 as enterprise AI competition heats up〉（2025-10-13）](https://techcrunch.com/2025/10/13/salesforce-announces-agentforce-360-as-enterprise-ai-competition-heats-up/)
18. [Salesforce〈Welcome to the Agentic Enterprise: Agentforce 360〉（2025-10-13）](https://www.salesforce.com/news/press-releases/2025/10/13/agentic-enterprise-announcement/)
19. [Fortune〈Salesforce CEO Marc Benioff says his company has cut 4,000 customer service jobs〉（2025-09-02）](https://fortune.com/2025/09/02/salesforce-ceo-billionaire-marc-benioff-ai-agents-jobs-layoffs-customer-service-sales/)
20. [Fortune〈AI slashes white-collar jobs; Salesforce CEO Marc Benioff says one department is still hiring〉（2026-05-28）](https://fortune.com/2026/05/28/ai-slashes-white-collar-jobs-salesforce-ceo-marc-benioff-one-department-still-hiring-sales/)
21. [The Register〈Salesforce's Agentforce isn't winning over clients, KeyBanc analysts claim〉（2026-07-15）](https://www.theregister.com/saas/2026/07/15/salesforces-agentforce-isnt-winning-over-clients-keybanc-analysts-claim/5271866)
22. [CIO.com〈Salesforce's Agentforce product maturity questioned as KeyBanc cites weak customer traction〉（2026-07）](https://www.cio.com/article/4198127/salesforces-agentforce-product-maturity-questioned-as-keybanc-cites-weak-customer-traction.html)
23. [MarTech〈Gartner: 40% of agentic AI projects will fail, making humans indispensable〉](https://martech.org/gartner-40-of-agentic-ai-projects-will-fail-making-humans-indispensable/)
24. [Forbes〈Why 40% Of Agentic AI Projects May Be Canceled By 2027〉（2026-07-07）](https://www.forbes.com/sites/robertszczerba/2026/07/07/why-40-of-agentic-ai-projects-may-be-canceled-by-2027/)
25. [Business of Apps〈Slack Revenue and Usage Statistics (2026)〉](https://www.businessofapps.com/data/slack-statistics/)
26. [Computerworld〈Salesforce changes Slack API terms to block bulk data access for LLMs〉（2025-06）](https://www.computerworld.com/article/4005509/salesforce-changes-slack-api-terms-to-block-bulk-data-access-for-llms.html)
27. [Slack Developer Docs〈Announcing the Slack MCP server and Real-time Search API〉（2026-02-17）](https://docs.slack.dev/changelog/2026/02/17/slack-mcp/)
28. [Slack〈Slack Securely Powers Your Third-Party Agents With Your Business Context〉（2026-02）](https://slack.com/blog/news/mcp-real-time-search-api-now-available)
29. [CNBC〈Salesforce releases updated Slackbot powered by Anthropic's AI model〉（2026-01-13）](https://www.cnbc.com/2026/01/13/salesforce-releases-updated-slackbot-powered-by-anthropics-ai-model.html)
30. [TechRepublic〈Slack Powers Up Slackbot to AI Assistant〉（2026-01）](https://www.techrepublic.com/article/news-salesforce-turns-slack-into-ai-hub/)
31. [Anthropic〈Introducing Claude Tag〉（2026-06-23）](https://www.anthropic.com/news/introducing-claude-tag)
32. [TechRepublic〈Anthropic Launches Claude Tag, Bringing AI Agents Into Slack〉（2026-06）](https://www.techrepublic.com/article/news-anthropic-claude-tag-ai-agent-slack/)
33. [Salesforce Ben〈Why Does Sam Altman Want to Kill Slack?〉](https://www.salesforceben.com/why-does-sam-altman-want-to-kill-slack/)
34. [TechCrunch〈Slack CEO Denise Dresser to join OpenAI as chief revenue officer〉（2025-12-09）](https://techcrunch.com/2025/12/09/slack-ceo-denise-dresser-to-join-openai-as-chief-revenue-officer/)
35. [CNBC〈OpenAI hires Slack CEO Denise Dresser as chief revenue officer〉（2025-12-09）](https://www.cnbc.com/2025/12/09/openai-slack-ceo-denise-dresser-chief-revenue-officer.html)
36. [OpenAI〈OpenAI appoints Denise Dresser〉（2025-12-09）](https://openai.com/index/openai-appoints-denise-dresser/)
37. [Salesforce〈Anthropic and Salesforce Expand Strategic Partnership to Deliver Trusted AI for Regulated Industries〉（2025-10-14）](https://www.salesforce.com/news/press-releases/2025/10/14/anthropic-regulated-industries-partnership-expansion-announcement/)
38. [Anthropic〈Anthropic and Salesforce expand partnership to bring Claude to regulated industries〉（2025-10）](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership)
39. [AWS Partner Network Blog〈Salesforce and AWS Accelerate Agentic AI Transformation for Agentic Enterprises〉](https://aws.amazon.com/blogs/apn/salesforce-and-aws-accelerate-agentic-ai-transformation-for-agentic-enterprises/)
40. [VentureBeat〈Salesforce CEO Marc Benioff slams Microsoft Copilot as 'Clippy 2.0'〉（2024-10）](https://venturebeat.com/ai/salesforce-ceo-marc-beinoff-slams-microsoft-copilot-as-clippy-2-0)
41. [Salesforce Ventures〈Behind the Investment: Anthropic〉](https://salesforceventures.com/perspectives/behind-the-investment-anthropic/)
42. [Bloomberg〈Salesforce Investment in Anthropic Is Valued at About $5 Billion〉（2026-06-01）](https://www.bloomberg.com/news/articles/2026-06-01/salesforce-investment-in-anthropic-is-valued-at-about-5-billion)
43. [Salesforce Ben〈Could Anthropic Acquire Salesforce?〉](https://www.salesforceben.com/could-anthropic-acquire-salesforce/)
44. [VentureBeat〈Salesforce just put its entire CRM inside Claude and says you'll never need its app again〉（2026-08-26）](https://venturebeat.com/orchestration/salesforce-just-put-its-entire-crm-inside-claude-and-says-youll-never-need-its-app-again)
45. [Salesforce〈Salesforce and OpenAI announce strategic partnership expansion〉（2025-10-14）](https://www.salesforce.com/news/press-releases/2025/10/14/openai-partnership-expansion-announcement/)
46. [CNBC〈Salesforce will bring Agentforce to OpenAI's ChatGPT〉（2025-10-14）](https://www.cnbc.com/2025/10/14/salesforce-will-bring-agentforce-to-openais-chatgpt.html)
47. [OpenAI〈ServiceNow powers actionable enterprise AI with OpenAI〉（2026-01-20）](https://openai.com/index/servicenow-powers-actionable-enterprise-ai-with-openai/)
48. [ServiceNow Newsroom〈ServiceNow and OpenAI collaborate to deepen and accelerate enterprise AI outcomes〉（2026-01-20）](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-and-OpenAI-collaborate-to-deepen-and-accelerate-enterprise-AI-outcomes/default.aspx)
49. [OpenAI〈Introducing company knowledge〉](https://openai.com/index/introducing-company-knowledge/)
50. [OpenAI〈Target partnership〉](https://openai.com/index/target-partnership/)
51. [CNBC〈OpenAI launches new enterprise platform Frontier〉（2026-02-05）](https://www.cnbc.com/2026/02/05/open-ai-frontier-enterprise-customers.html)
52. [TechCrunch〈OpenAI launches a way for enterprises to build and manage AI agents〉（2026-02-05）](https://techcrunch.com/2026/02/05/openai-launches-a-way-for-enterprises-to-build-and-manage-ai-agents/)
53. [Menlo Ventures〈2025 Mid-Year LLM Market Update〉](https://menlovc.com/perspective/2025-mid-year-llm-market-update/)
54. [Menlo Ventures 2025 State of Generative AI Report（Yahoo Finance 轉載）](https://finance.yahoo.com/news/menlo-ventures-2025-state-generative-123000623.html)
55. [Bloomberg〈OpenAI's Revenue Run Rate Tops $40 Billion Ahead of IPO〉（2026-08-13）](https://www.bloomberg.com/news/articles/2026-08-13/openai-s-revenue-run-rate-tops-40-billion-ahead-of-ipo)
56. [Motley Fool〈Anthropic's Revenue Run Rate Just Hit $65 Billion〉（2026-08-20）](https://www.fool.com/investing/2026/08/20/anthropics-revenue-run-rate-just-hit-65-billion-amazon-and-spacex-may-be-the-biggest-winners/)
57. [Fortune〈Anthropic confidentially files for IPO after raising $65 billion at a $965 billion valuation〉（2026-06-01）](https://fortune.com/2026/06/01/anthropic-confidentially-files-ipo-965-billion-valuation/)

---

_最後更新：2026-08-27_
