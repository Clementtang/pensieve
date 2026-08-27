---
title: "Salesforce 把 27 年的招牌借給 Anthropic，然後叫你不用再打開 Salesforce"
description: "2026 年 8 月 26 日，Salesforce 在交出創紀錄財報的同一天，把只留給自家產品的 -force 字尾讓給了 Anthropic。我想聊聊這個決定背後的邏輯，以及它可能錯在哪裡。"
date: 2026-08-27
author: "Clement Tang"
tags: ["議題研究", "AI", "企業軟體", "Salesforce", "Anthropic", "OpenAI", "競爭分析"]
category: articles
status: draft
---

# Salesforce 把 27 年的招牌借給 Anthropic，然後叫你不用再打開 Salesforce

> Salesforce 與 Anthropic 在 2026 年 8 月 26 日共同發布 Claudeforce，把 Claude 直接嵌進 CRM 的核心工作流。財報數字很漂亮，客戶的抱怨也很具體，我想把這兩件事放在一起看。

## 元資料

| 項目         | 內容                                                             |
| ------------ | ---------------------------------------------------------------- |
| **建立日期** | 2026-08-27                                                       |
| **更新日期** | 2026-08-27                                                       |
| **標籤**     | #議題研究 #AI #企業軟體 #Salesforce #Anthropic #OpenAI #競爭分析 |
| **狀態**     | 草稿                                                              |
| **字數**     | 約 4,700 字                                                      |

---

Salesforce 的財報日通常不會讓我想寫東西。這次的觸發點是一個字：Claudeforce。

我第一次看到這個字的時候，直覺以為是哪個社群帳號做的迷因，畢竟把 Claude 跟 Salesforce 的字尾湊在一起，怎麼看都像是網友在開玩笑。結果查下去發現，這是 2026 年 8 月 26 日 Salesforce 與 Anthropic 的官方合作品牌，新聞稿標題還下得非常張揚，〈Salesforce and Anthropic Announce Claudeforce: The #1 AI Meets the #1 AI CRM〉，Salesforce 甚至開了一個專屬產品頁。

(嗯，是我格局小了。)

同一天，Salesforce 公布 FY27 第二季財報，數字相當好看。營收 113.5 億美元，年增 11%，小勝市場預期的 113.2 億美元；淨利 35.3 億美元，每股盈餘 4.29 美元，年增 87%；Non-GAAP 每股盈餘 5.90 美元，比分析師預估的 3.27 美元高出近八成；全年營收指引上修到 461 億至 464 億美元，股價盤後上漲約 14%。Marc Benioff 在法說會上還順手回敬了過去半年市場對「SaaSpocalypse」(軟體末日) 的焦慮，他說：「這種 SaaSpocalypse 的胡說八道，我覺得該停止了。」

但財報數字很快就會被下一季的財報數字取代，Claudeforce 這個命名不會。`-force` 這個字尾，過去 27 年只出現在 Salesforce 自己的產品線裡，從公司本名 salesforce.com、開發平台 Force.com，一路到近兩年主打的 Agentforce，全是自家血統。多家報導指出，這是 Salesforce 第一次把它掛在別家公司的產品名稱上。一間把命名權看得極重的公司，在財報最風光的那天把招牌讓出去，這個動作本身比任何一項數字都值得拆。

## Claudeforce 到底是什麼東西

先講清楚它實際上是什麼東西，再來談它代表什麼。

首發產品叫「Salesforce in Claude」，形式是 Claude 裡的一個 plugin，底層走 MCP 跟 MCP Apps，內建 37 個預建銷售技能 (prebuilt sales skills)，涵蓋會議準備、成交健康度檢視、pipeline 檢視這些業務的日常。官方把它形容成業務人員的「AI CRO」，賣點是你可以在 Claude 的對話視窗裡直接查詢、更新 live CRM 資料並且採取行動，完全不用打開 Salesforce 本身，而所有動作最終仍然會路由回 Salesforce 執行，確保既有的商業規則被強制套用。

上市節奏分三段：2026 年 8 月 26 日起先開放給精選的 pilot 客戶，2026 年 9 月進 open beta，涵蓋其他職能的技能預計從第三季起陸續推出。定價目前沒有公布，所以我也不猜。

我沒有 pilot 資格，所以這次沒辦法先實測十分鐘再回來寫，以下都是根據官方說法跟媒體報導整理的。

不過如果只把 Claudeforce 理解成一個外掛，會嚴重低估這件事的規模。它其實是一個傘狀品牌，底下是一整層預設模型的更換：Claude 同時成為 Slack AI 與 Slackbot 的預設模型，並透過 Claude Tag 支援團隊決策；在 Agentforce 這側，Claude 是 Atlas Reasoning Engine 可選用的推理模型之一，同時是 Agentforce Vibes 與 Agentforce Coworker 的預設模型；在 Headless 360 裡，Claude 一樣是預設模型。Salesforce 甚至把 Claude Code 部署到自己全球的工程組織內部使用。換句話說，Claude 被塞進了 Salesforce 幾乎每一個會用到模型推理的位置。

Anthropic 執行長 Dario Amodei 在新聞稿裡的說法，語氣比 Benioff 收斂很多：「我們相信前沿智慧應該是安全、可信、且能力深厚的，這正是全球頂尖企業把最重要的工作交給 Claude 的原因。Salesforce in Claude 把同樣的前沿智慧帶進全世界大多數商業活動實際發生的系統裡。透過這個合作，企業可以把 Claude 指向他們在 Salesforce 裡累積數十年的客戶資訊與商業脈絡，並真正用它來經營與成長。」

## 這邊岔個題：Salesforce 自己也做過語言模型

寫到這裡我想起一件事。

2022 年底我寫過一篇關於 AI 生成內容能不能降低遊戲開發成本的文章，裡面提到 AI Dungeon 這個服務。當時開發者 Nick Walton 除了用 OpenAI 的 GPT-2 之外，還套用了一個叫 CTRL 的模型，來修正 GPT-2 衍生的內容重複問題。那個 CTRL 全名是 Conditional Transformer Language Model for Controllable Generation，2019 年由 Salesforce Einstein AI 團隊發表，16.3 億個參數，訓練資料包含維基百科、Gutenberg 上的書籍與 OpenWebText2 的網頁資料，還以 BSD-3 授權開源，讓開發者可以調控生成文本的樣式與風格。

也就是說，2019 年的 Salesforce，是會自己發論文、自己訓模型、還把權重開源出去給人玩的那種公司。

七年後，它不做模型了，改成把別人的模型掛上自己的招牌。

我不覺得這是墮落，反而覺得這是一個很誠實的商業判斷。前沿模型的軍備競賽早就不是一間 CRM 公司的資本結構撐得起的，硬要自研，最好的結果也只是永遠落後半代。但把這兩件事擺在同一條時間軸上看，你會很具體地感受到這七年來，價值鏈上的話語權移動到哪裡去了。

## Agentforce 這兩年：數字很漂亮，客戶不太買單

回到主線。要理解 Salesforce 為什麼要做 Claudeforce，得先看它自己的 agent 產品線走到哪裡。

Salesforce 的 agentic AI 產品線從 2024 年 10 月的 Agentforce 1.0 起步，之後更新速度幾乎每季一次：2024 年 12 月的 Agentforce 2 強化了 Atlas Reasoning Engine，追求更可預測的推理結果；2025 年 3 月的 Agentforce 2dx 讓 agent 可以嵌進任何工作流，支援主動觸發；2025 年 6 月的 Agentforce 3 補上互通性與治理；2025 年 10 月 13 日的 Dreamforce 大會上，Agentforce 360 正式全面上線。

財報上的表現確實亮眼。FY27 第二季，Agentforce ARR 突破 15 億美元，年增超過 240%，加上 Data 360 的 24 億美元 ARR (年增逾 200%)，兩者合計接近 39 億美元。用來衡量 agent 實際完成工作量的 Agentic Work Units (AWU) 累計達 70 億，光這一季就新增 32 億，季增 97%。往前一季看也很熱鬧，FY27 第一季 Agentforce ARR 是 12 億美元、年增 205%，Slack MCP server 上線六週就衝破 100 萬活躍使用者。

這邊要停一下。

Salesforce 在同一份財報裡揭露，「自本季起，Agentforce ARR 的計算範圍納入 AI offerings、Slackbot 與 Headless 360」。也就是說，這一季才把 Slackbot 跟 Headless 360 的 ARR 併進 Agentforce 這個口徑。我不認為這是造假，這些產品本來就是 Claudeforce 傘狀品牌下的一員，歸進去有它的邏輯。但這確實意味著，15 億美元、年增 240% 這組被市場反覆引用的數字，並不是在同一個統計基礎上跟去年同期比較。想拿它做逐季趨勢推論的人，最好先意識到分母在這季被動過。

人力那一側，Salesforce 講得比誰都直白。Benioff 在 2025 年 9 月證實，客服團隊從約 9,000 人縮到約 5,000 人，減幅 44%，AI agent 處理大約一半的客戶對話，客服成本下降 17%，他當時的原話是「I need less heads」。2026 年 2 月再裁不到 1,000 人，6 月又有一輪，除了業務團隊以外幾乎全面凍結招募，工程組織的生產力據稱提升超過三成。

然後就是尷尬的部分了。

2026 年 7 月，KeyBanc 把 Salesforce 從 Overweight 降到 Sector Weight，依據是一份 CIO 調查，結論寫得毫不留情，說 Salesforce 是「a standout for the wrong reasons」。客戶回饋集中在兩點：一是自己的資料還沒整理好，根本做不了有意義的 AI；二是 Agentforce 這個產品「就是還沒到位」(isn't there yet)。調查還發現，多數客戶不願意透過 CRM 供應商付費購買 AI 能力，同時抱怨 Salesforce 的漲價幅度太激進，而預期未來 12 個月要調降 Salesforce 預算優先序的 CIO，人數多過打算加碼的。

這也不是 Salesforce 一家的問題。Gartner 預測到 2027 年底，超過 40% 的 agentic AI 專案會被取消，理由是成本失控、商業價值不明、風險控管不足，並預期 2026 年會有三分之一的企業因為太早部署 AI 而傷害了客戶體驗。

把這兩組訊息疊在一起，其實可以同時為真：財報上的成長曲線是真的，客戶端「產品還沒準備好」的抱怨也是真的。一間公司完全可以一邊靠擴大計算口徑交出漂亮的年增率，一邊還在補產品本身的完成度。而 Claudeforce，某種程度上就是 Salesforce 對這道落差開出的處方，用外面最強的模型，去填自研 agent 現在還填不滿的洞。

## Slack 才是這盤棋的關鍵

要理解 Claudeforce 為什麼長成現在這樣，繞不開 Slack。

Slack 手上握著企業內部最稀缺的一種資產：對話式資料跟 work graph，也就是誰在跟誰討論什麼、一筆交易卡在哪個環節、一個決策是怎麼被做出來的。這些脈絡不存在於 CRM 的欄位裡，卻恰好是 AI agent 判斷「這件事到底進行到哪一步」最需要的東西。規模上，Slack 在 2025 年初的日活躍使用者超過 4,200 萬，2026 財年營收約 30 億美元，接近八成的 Fortune 100 企業都在用，但在企業通訊市場的份額大約 13%，仍然遠遠落後 Microsoft Teams 的約 37%。

有意思的是 Slack 對第三方存取這批資料的態度，過去一年做了一次很漂亮的兩段式操作。

第一段是關門。2025 年 5 月 29 日，Slack 更新服務條款，新增資料使用章節，明文禁止透過 API 大量匯出資料，也禁止用 Slack API 取得的資料訓練大型語言模型。像 Glean 這類企業搜尋業者因此不能再長期索引或儲存 Slack 資料，只能暫時取用後刪除，Glean 當時還特地發信警告客戶，說這項政策會「妨礙你把資料用在自選的企業 AI 平台上」。Salesforce 官方的解釋很官方：「當 AI 帶來客戶資料如何被處理的關鍵考量時，我們正在強化 Slack API 資料如何被儲存、使用與分享的防護措施。」

第二段是發鑰匙。2025 年 10 月的 Dreamforce 預告了 Real-Time Search API 與 MCP server；2026 年 1 月 13 日，由 Claude 驅動的新版 Slackbot 上線，被定位成可以跨 Salesforce CRM、Google Drive、Microsoft Teams 取用資料的「super agent」；2026 年 2 月 17 日，RTS API 與 MCP server 正式全面上線，超過 50 家夥伴 (包含 Anthropic、Google、OpenAI、Perplexity) 在上面打造具情境感知能力的 agent，RTS 查詢與 MCP tool call 的呼叫量成長了 25 倍；2026 年 6 月 23 日，Anthropic 推出 Claude Tag，可以在頻道裡直接標記 @Claude 指派任務，舊版的 Claude in Slack 整合則在 8 月 3 日退役。

先把免費的批量搜刮封死，再由自己以受控、可稽核、資料留在 Slack 系統內的形式重新開放。Slack 就這樣從一個「容易被外部工具搜刮的資料來源」，升級成「發放存取許可的守門人」。Anthropic 之所以能在這道門裡走得比誰都深，很大一部分原因是它選擇配合這套規則，而不是繞過去。

這段期間還有一個很戲劇性的人事插曲。2025 年 11 月，Sam Altman 公開批評 Slack「creates a lot of fake work」，暗示 OpenAI 可能自己做生產力工具來取代它。一個月後，2025 年 12 月 9 日，OpenAI 就把 Slack 執行長 Denise Dresser 挖走，出任 Chief Revenue Officer，向 COO Brad Lightcap 匯報，而 Dresser 在接 Slack 執行長之前，已經在 Salesforce 體系裡待超過十年。

再九個月，Salesforce 把守了 27 年的招牌，給了 Anthropic。

這兩件事之間未必有直接因果，但擺在同一條時間軸上，畫面還挺清楚的。

## 行文至此，我想呼應一下我的下標

Salesforce 為什麼選 Anthropic，我覺得有四條線索。

最直接的是合規。金融服務、醫療、資安、生命科學這些受規管產業，對模型商能不能進入企業信任邊界極度敏感。2025 年 10 月 14 日，Anthropic 與 Salesforce 宣布擴大策略合作，Claude 成為受規管產業的偏好模型，早期客戶包含 CrowdStrike 與 RBC Wealth Management。技術路徑走 Amazon Bedrock，所有 Claude 流量都包在 Salesforce 的 VPC 裡，透過 AWS PrivateLink 連接，模型供應商拿不到客戶資料，Bedrock 本身也不儲存。Anthropic 因此成為第一家完全整合進 Salesforce trust boundary 的大型語言模型供應商。

第二條是能力的現實，前面談 CTRL 的時候已經講過了。

第三條線索比較個人。Benioff 對 Microsoft 的敵意由來已久，早在 2024 年 10 月他就公開炮轟 Copilot「令人失望」、「就是不能用，也不能提供任何準確度」，還說「Copilot 更像是 Clippy 2.0」。這種敵意讓 OpenAI 這個選項天然帶折扣，畢竟 OpenAI 跟 Microsoft 的資本與技術關係盤根錯節，選 OpenAI 某種程度上等於間接繫上 Microsoft。相較之下，Anthropic 沒有消費端流量的野心，也沒有自建 CRM 或生產力套件的企圖。

第四條最容易被忽略，是資本。Salesforce Ventures 從 2023 年 5 月的 Series C 起連續參與 Anthropic 的每一輪募資，到 2026 年 6 月，這筆持股價值約 50 億美元，據報導約占 Salesforce 整個策略投資組合的三分之二。這代表 Salesforce 早就在自己最大的技術依賴對象身上下了重注。Anthropic 表現好，Salesforce 的帳面回報跟著漂亮；Claudeforce 成功，Anthropic 的估值故事也更有說服力。兩家的利益在品牌合作發生之前，就已經被股權綁在一起了。

但真正讓 Claudeforce 特殊的，還是命名這個動作本身。技術整合有多深，在企業軟體業一點都不稀奇，稀奇的是品牌的公開讓渡。VentureBeat 的標題把這個邏輯講得很直白，說 Salesforce 讓客戶「不用打開 Salesforce 也能用 Salesforce」，這幾乎是自我去中介化的公開宣言。Benioff 選擇主動把入口讓給 Claude，賭的是資料與治理層的價值終究會高過介面層。

當然，SaaSpocalypse 的敘事壓力也在背後推了一把。過去一年市場激烈辯論 AI 會不會繞過既有 SaaS 介面、直接吞掉企業軟體的價值，CNBC 在 2026 年 8 月初就以「SaaSpocalypse debate intensifies」為題記錄過軟體股的劇烈震盪。Benioff 選擇正面反擊，而 Claudeforce 就是這場反擊最具體的產品化答案，它把「AI 會取代 Salesforce」這個假設，改寫成「AI 需要透過 Salesforce 才能運作」。耶魯的 Jeffrey Sonnenfeld 在財報同日於 Fortune 撰文〈The SaaSpocalypse that wasn't〉，論證 Salesforce、Booking Holdings、IBM 這類公司的護城河在 AI 時代反而更穩，算是幫 Benioff 站了台。

## OpenAI 那邊，做的是完全不一樣的事

有，但形態完全不同，這也是我覺得最有意思的對照。

先說 Salesforce 跟 OpenAI 的關係其實沒有斷。2025 年 10 月 14 日，也就是宣布跟 Anthropic 擴大合作的同一天，Salesforce 也宣布擴大跟 OpenAI 的策略合作，Agentforce 360 進入 ChatGPT，Salesforce 平台上可以直接用 GPT-5 系列模型建 agent，ChatGPT 與 Codex 也被帶進 Slack。到 2025 年 12 月至 2026 年 1 月，Agentforce Sales 進一步成為原生的 ChatGPT app 並開放 open beta。OpenAI 在 Salesforce 的版圖裡有位置，只是它是被放進生態系的其中一個模型選項，沒有被掛上招牌。

OpenAI 在其他企業 SaaS 的佈局也很清楚。2026 年 1 月 20 日，OpenAI 與 ServiceNow 宣布多年期策略合作，GPT-5.2 系列成為 ServiceNow 企業客戶的「preferred intelligence capability」，整合進 AI Control Tower。零售端則有 2025 年 10 月起 Walmart 與 Target 讓消費者直接在 ChatGPT 裡購物、結帳、連結會員帳號。自家企業產品線也在擴張，2026 年 2 月 5 日發布的 OpenAI Frontier 是端到端的企業 agent 建置與管理平台，可以連接資料源、CRM 與內部應用，甚至能管理在 OpenAI 之外建的 agent；Company Knowledge 則讓 ChatGPT 的 Business、Enterprise、Edu 版本連上 SharePoint、Google Drive、Slack、GitHub 這些內部系統。

但攤開來看，有一件事 OpenAI 沒做過：查證範圍內，找不到任何一家企業把 OpenAI 的品牌併進自己的產品名稱。ServiceNow 用的措辭是「preferred intelligence capability」，不是 ServiceNow×OpenAI 這種複合命名。Claudeforce 在商業史上的特殊性，並不在技術整合的深度，而在品牌讓渡這個動作，至少到目前為止是獨此一家。

這個差異其實反映了兩家完全相反的路線。OpenAI 從消費端的 ChatGPT 品牌與流量出發往企業端滲透，所以它跟 SaaS 巨頭的合作模式多半是「把你的 app 放進我的介面」。Anthropic 從企業後端與程式碼協作起家，所以它的模式是「把我的模型放進你的系統，再讓你的系統出現在我的介面裡」。Claudeforce 能做到雙向嵌入，正是因為 Anthropic 在 Slack 跟 Agentforce 內部已經卡了將近一年的位置。

這條路線差異在市佔上留下了很清楚的痕跡。根據 Menlo Ventures 對技術主管的調查，2023 年 OpenAI 在企業 LLM API 市場的佔有率約 50%，Anthropic 只有 12%；到 2025 年中排序翻轉，Anthropic 32%、OpenAI 25%；到 2025 年底，Anthropic 進一步拉開到 40%、OpenAI 27%。同一份調查也指出，企業 LLM 支出在六個月內從 35 億美元翻倍到 84 億美元。市場在長大，但主要受益者換人了。營收規模上，Bloomberg 在 2026 年 8 月報導 OpenAI 的年化 run rate 約 400 億美元，而據 Motley Fool 引述的資料，Anthropic 同期約在 650 億美元上下，方向感是一致的。

## 一些個人觀察

回到下標那件事。

我的看法是，Salesforce 這個決定正確，但危險。

正確的部分在於它認清了自己的位置。過去 27 年，Salesforce 的護城河建立在介面上，客戶登入 Lightning 頁面、點按鈕、填欄位。Claudeforce 押的是另一套邏輯：護城河其實是這 27 年累積的客戶資料、metadata、工作流邏輯與治理框架，這些才是模型變不出來、新創短期複製不了的東西。與其等著被 Claude 或 ChatGPT 這類對話介面繞過去，不如主動把自己變成它們背後的資料與執行層。平台轉移的歷史一再證明，硬抗新介面的既有者通常會輸。

危險的部分在於定價權。如果企業客戶真正在意的介面，最終從 CRM 頁面全面轉移到對話層，定價權就會慢慢往「誰擁有智慧」的那一方移動，而擁有 Claude 的是 Anthropic。KeyBanc 調查裡那句「多數客戶不願意透過 CRM 供應商付費購買 AI 能力」，我認為是目前最值得盯的領先指標。如果企業寧可直接向 Anthropic 或 OpenAI 買模型能力，Salesforce 能收的，可能就只剩資料存取與治理這一層的過路費，而不再是完整的軟體授權費。

最後想拉回四年前那篇文章。當時 NFX 的 James Currier 把生成式科技的工作拆成「0 到 1」、「1 到 10」、「10 到 100」三個階段，那時候 AI 只能幫創作者做到 0 到 1，也就是產出靈感跟前置素材，1 到 10 還在努力，10 到 100 得靠人跟傳統軟體收尾。

四年後，同一個框架搬到企業軟體上，被生成的東西已經從「內容」變成「動作」。Claudeforce 想證明的，就是 AI 能不能從「幫你查一下這筆單子的狀況」的 0 到 1，走到「幫你把這筆單子更新完並通知相關人」的 1 到 10。至於 10 到 100，看 KeyBanc 那份 CIO 調查的口氣，顯然還早得很。

Salesforce 用 27 年的招牌，換來的究竟是一張 agent 時代的入場券，還是一份讓別人主導定價的租約，這個問題現在還沒有答案。但接下來每一季的 Agentforce 客戶滿意度、每一次 Anthropic IPO 前後的估值波動，都會是很好的觀察座標。

我會繼續看下去。

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
58. [Salesforce CTRL: A Conditional Transformer Language Model for Controllable Generation（GitHub）](https://github.com/salesforce/ctrl)
59. [NFX〈Generative Tech Begins〉by James Currier（2022-10）](https://www.nfx.com/post/generative-tech)

---

_最後更新：2026-08-27_
