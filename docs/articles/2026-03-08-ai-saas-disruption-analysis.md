---
title: "當造輪子變得免費：AI 編程工具如何重組 SaaS 的價值鏈"
description: "從 vibe coding 到配方經濟，分析 AI 編程工具對 SaaS 產業的結構性衝擊與價值鏈重組"
date: 2026-03-08
author: "Clement Tang"
tags: ["議題研究", "AI", "SaaS", "企業軟體", "商業模式", "Claude Code"]
category: articles
status: draft
---

# 當造輪子變得免費：AI 編程工具如何重組 SaaS 的價值鏈

> 當 AI 讓任何人都能在週末造出一套 CRM，「軟體即服務」的護城河還剩下什麼？

## 元資料

- **建立日期：** 2026-03-08
- **標籤：** #議題研究 #AI #SaaS #企業軟體 #商業模式 #Claude-Code
- **狀態：** 草稿
- **字數：** 約 8,000 字

---

## The Big Picture

2026 年 2 月 3 日，全球 SaaS 和 IT 服務公司在 24 小時內蒸發了近 2,850 億美元市值。Salesforce 市值縮水 26%，Atlassian 下跌 30%，Adobe 下跌 19%。市場突然開始認真思考一個問題：如果 AI 代理人能自主處理知識工作，那麼按「座位數」賣軟體的商業模式還能撐多久？

這場恐慌的源頭可以追溯到更早之前。2025 年初，AI 研究者 Andrej Karpathy 提出了「vibe coding」的概念：完全投入感覺，用自然語言描述需求，讓 AI 負責寫程式。這聽起來像是開發者圈子裡的新奇玩具，但一年後，Google Trends 上「vibe coding」的搜尋量已暴增 2,400%，而且使用者不只是工程師。

更深層的問題是：當造輪子的成本趨近於零，輪子的價值會發生什麼變化？答案可能比「SaaS 已死」的聳動標題更複雜，也更有趣。

---

## Why It Matters

如果你是 SaaS 的使用者，你可能很快就要面對一個選擇：繼續每月付費，還是花一個週末自己造一套？如果你是 SaaS 的建造者，你需要思考自己的護城河是否還在。如果你是投資人，你需要重新評估哪些軟體公司的估值建立在即將消失的前提上。

這篇文章試圖回答一個核心問題：AI 編程工具到底在顛覆什麼，又在創造什麼？

---

## 正在發生的事

### 造輪子的人越來越多了

2025 年下半年到 2026 年初，一個明確的趨勢浮現：越來越多人用 AI 編程工具自己造工具，取代原本付費訂閱的 SaaS。

幾個資料點可以說明這股浪潮的規模。Claude Code 於 2025 年 5 月發布後，僅八個月就成為最受歡迎的 AI 編程工具，在開發者滿意度調查中以 46% 的喜愛度遙遙領先 Cursor（19%）和 GitHub Copilot（9%）。Cursor 的年化營收在不到 24 個月內突破 10 億美元，到 2026 年 3 月已超過 20 億美元，打破了 SaaS 產業所有成長紀錄。約 4% 的 GitHub commits 現在由 Claude Code 撰寫。95% 的受訪開發者每週至少使用一次 AI 工具，75% 的人有超過一半的工作由 AI 輔助完成。

這些數字反映的是整個軟體開發方式正在發生典範轉移的訊號，遠超過「開發者用了新工具」的層次。

### 具體案例：從 Klarna 到個人 CRM

案例比數字更有說服力。

Klarna 是最受矚目的一個。這家瑞典金融科技公司的 CEO Sebastian Siemiatkowski 宣布棄用 Salesforce CRM 和 Workday HR 系統，改用內部建造的 AI 驅動技術堆疊。他們用 Neo4j 圖形資料庫整合資料，搭配 Cursor AI 快速部署新介面，將原有的 1,200 個 SaaS 應用整合為統一的內部平台。光是 CRM 就省下約 200 萬美元，整體 AI 計畫每年節省約 4,000 萬美元。員工人均年營收從 40 萬美元提升至 70 萬美元。

然而，這個故事有後續。Siemiatkowski 後來坦承對 Salesforce 風波感到「非常尷尬」，承認 AI 客服品質不如預期，公司已開始重新招募人力。Salesforce CEO Marc Benioff 也直接質問：沒有成熟的 SaaS 平台，如何管理資料、合規和治理？Klarna 的案例完美展示了自建工具的誘惑與陷阱。

規模更小但同樣有啟發性的案例在各處出現。德國書摘服務 Blinkist 透過 vibe coding 工具取代了約 6 萬美元的年度 SaaS 訂閱。超過 20 名從未接觸過程式碼的員工在一場 AI Hackday 中成功建造了各種內部工具。SaaStr 的 Chief AI Officer Amelia Lerutte（非工程師背景）在大約一天半內用 vibe coding 建造了一套贊助商入口網站，取代了年費 1 萬美元的 SaaS。Alex Shartsis 用 Claude 在 20 分鐘內建造了一套個人 AI CRM，每月成本僅 20 美元。

SaaStr 的 Jason Lemkin 精準總結了實際情況：企業真正在取代的，是那些「每月 49 美元、提供 80% 你需要的功能和 40% 你不需要的功能」的小型 SaaS 工具，沒有人在用 vibe coding 建造自己的 Salesforce。

---

## 誰最脆弱，誰有護城河

### 最容易被取代的 SaaS

簡單的工作流程和 CRUD 應用首當其衝。2024 年，建造一個 SaaS 功能需要一個團隊 2-6 週；2026 年，借助 AI 編程工具，同樣的功能可以在一天甚至幾小時內完成。SaaS MVP 的建造成本已從 25,000 美元降至約 7,000 美元，功能對齊時間從 12-18 個月縮短至 3-6 個月。

「AI Wrapper」型產品面臨更嚴峻的考驗。那些本質上只是在大型語言模型上包一層介面的產品，當基礎模型能力持續提升，差異化空間就不斷被壓縮。產業分析預測，90% 的 AI wrapper 新創將在 2026 年前倒閉。

Micro-SaaS 和單功能工具同樣脆弱。IDC 在 2025 年 12 月的報告預測，到 2028 年，純粹的座位制定價將過時，70% 的軟體供應商將重新設計定價策略。對單一功能的 Micro-SaaS 而言，當建造成本趨近於零，月費就顯得難以合理化。

歸納來看，觸發自建的信號是：你付費的工具在 2026 年仍然零 AI 功能。AI 並非讓所有造輪子都合理化，而是暴露了那些停滯不前的 SaaS 產品。

### 仍具防禦力的 SaaS

系統記錄型（Systems of Record）應用面臨較低的風險。AI 代理人管理客戶關係仍然需要一個 CRM 來儲存資料，底層的系統記錄不可或缺。AI 代理人需要結構化、可靠的資料才能有效運作，這反而可能提升系統記錄的價值。

確定性系統也具備天然防禦力。當精確性至關重要、狀態管理複雜、錯誤會連鎖產生嚴重後果時，AI 生成程式碼的風險太高。金融交易系統、醫療紀錄系統、合規報告系統都屬於這一類。

具備強大網路效應的平台（如 Slack、GitHub）和深度嵌入合規要求的企業軟體，在 AI 時代反而可能更有價值。在受監管產業中，企業願意為符合治理要求的 AI 增強軟體支付溢價。

2026 年最值得關注的演化是「脈絡系統」（Systems of Context）的出現。系統記錄告訴你客戶買了什麼產品，脈絡系統則理解客戶為什麼買。這類系統能消化即時對話、電子郵件和非結構化文件，提供 AI 無法輕易複製的深度洞察。

---

## 煮飯的比喻：價值往兩端移動

用煮飯來類比這場變革或許最直覺。當煮飯變得全自動化（AI 讓任何人都能寫程式），商業價值就只能往兩端發展。一端是高端的人工煮飯（需要深度專業的企業級軟體），另一端是全自動人人可以煮，但需要購買配方和材料（元件庫、API 服務、規格模板）。

這個類比有歷史先例支撐。

### 3D 列印的啟示

3D 列印的歷史提供了最有力的類比。Ford 的生產線將工作帶到工人面前，3D 列印更進一步，將工作帶到客戶面前。MIT 的研究顯示，3D 列印可節省 85% 的運輸成本、17% 的庫存成本，整個供應鏈節省 70%。

然而，3D 列印並沒有消滅傳統製造業。它創造了一個新的利基市場（客製化、快速原型、備品），同時傳統製造在量產和精度上仍具優勢。關鍵啟示是：3D 列印將「設計檔案」和「材料」的價值提升了，而中間的「工廠」環節被壓縮。

同樣的邏輯正在軟體產業重演。「規格/配方」和「基礎元件/API」的價值正在提升，而「應用層的組裝」（即傳統 SaaS 的核心業務）正在被壓縮。

### 自助出版的教訓

Amazon Kindle Direct Publishing 讓任何人都能出版電子書，但並沒有消滅出版業。結果是：頂端出版商透過品牌、行銷和品質篩選維持價值；中間的代理人和小出版商受到最大衝擊；底端出現了大量自出版者。

類比到 SaaS：頂級企業軟體商將存活，中間層的「功能型 SaaS」面臨最大壓力，底端將出現大量 vibe-coded 的個人化工具。

---

## 底層程式庫的重要性提升

當應用層的價值被壓縮，底層的價值正在上升。2025 年 GitHub 上成長最快的 10 個儲存庫中，有 6 個是 AI 基礎設施專案。Ollama、Hugging Face/Transformers、llama.cpp 等開源工具成為 AI 開發的標準基礎設施。MCP（Model Context Protocol）由 Anthropic 在 2024 年 11 月推出，正在成為 LLM 連接內外部能力的標準化協議。

開源專案的價值正在發生質變。正如身份驗證服務 ZITADEL 所述，他們真正販賣的是風險轉移（承擔正常運作時間、安全回應、合規文件和長期維護的責任），程式碼本身反而是次要的。SLA、SOC 2 報告、CVE 揭露、威脅情報，這些看似功能，實際上是保險。

這意味著，當所有人都在用 AI 重複造輪子時，輪子本身的價值確實在降低，但組成輪子的零件（開源程式庫、API 服務、資料平台）的價值反而在提升。因為 AI 代理人需要可靠的、標準化的元件來組裝輪子，元件的品質直接決定了輪子的品質。

---

## 配方與材料：新的商業模式

如果造輪子變得免費，那賣配方和材料就是一門新生意。這個概念已經有了具體的雛形。

### 已存在的類似模式

Vercel Templates 和 v0 能將文字提示轉化為完整的 Web 應用。Shopify 的主題和外掛程式市場就是「配方」（主題設計）加「材料」（Shopify 基礎設施）的運作模式。WordPress 整個生態系的經濟模型建立在此模式上。這些都是 AI 時代之前的先行者。

### AI 時代的配方形態

AI 時代的配方正在以幾種形態快速演化。

第一種是可重用 Prompts 與 Recipes。Neon 提出了「可重用提示作為未來的 starter templates」的概念。開發者正在建立包含逐步指令、套件安裝、程式碼添加和架構決策的「recipes」，AI 代理人遵循這些步驟就能快速產出符合規格的應用。

第二種是 Specification-Driven Development（SDD），可以理解為 vibe coding 的結構化升級版。使用者先撰寫行為導向的規格書，定義預期行為和約束條件，AI 代理人再據此生成程式碼。2026 年初，GitHub 的 Spec Kit、AWS Kiro 和 Tessl Framework 三個 SDD 工具幾乎同時推出，驗證了這個方向的可行性。

第三種最接近「配方與材料」的完整形態：Claude Code 引入了 Agent Skills（持久性、可重用的指令）和 Plugins（將 MCP 伺服器、資源和 skills 打包為可安裝套件）。這代表了一種新的分發機制，同時分享工具本身，以及 AI 代理人正確使用工具所需的指令和脈絡。

回到使用者的角度，這意味著：使用者只要說「我要做一套 CRM」，AI 透過問幾個關鍵問題（你的客戶類型？銷售流程？需要哪些整合？），就能利用現成的 recipes、元件庫和 API 快速開發出高度客製化的系統，不需要從頭開始寫。

Vercel 的 CTO 用了一個精妙比喻：「軟體現在像小狗一樣免費，免費領養。」但他接著說：「之後的飼料、獸醫、訓練才是真正的支出。」

---

## 不能忽視的反面論點

### 維護成本：被低估的隱形炸彈

這是反對「AI 取代 SaaS」敘事最有力的論點，也是最常被忽略的。

Ox Security 分析了超過 300 個儲存庫後發現，AI 生成的程式碼「高度功能性但系統性缺乏架構判斷」，80-100% 存在反覆出現的反模式，包括不完整的錯誤處理、脆弱的並發管理和不一致的架構。到第二年以後，未管理的 AI 生成程式碼可能使維護成本達到傳統程式碼的 4 倍。

程式碼重複問題同樣嚴峻。GitClear 的研究發現，AI 編程助手的採用導致程式碼重複區塊增加了 8 倍，程式碼流失率（快速新增後又修改或移除的量）在 2021-2024 年間翻了一倍。

更令人不安的是認知偏差。METR 在 2025 年對資深開源開發者的對照實驗發現，在複雜任務中，使用 AI 的開發者實際上慢了 19%，但他們自認快了 20%。這 39-44% 的認知差距意味著：很多人以為自己在加速，實際上在累積技術債。

SaaStr 的 Jason Lemkin 坦言自家的實際經驗：沒有人談論的是每週 15-20 小時用於維護代理人的時間、將一切串聯在一起的混亂流程，以及「單人依賴」的風險。如果唯一的代理人管理者離職，所有代理人都得停擺。他估算建造者的時間成本為每小時 1,000 到 2,000 美元。這完全重新框定了自建 vs 購買的計算：軟體成本不重要，建造者的機會成本才是唯一的變數。

### SaaS 巨頭的反擊

SaaS 巨頭並未坐以待斃。Salesforce 推出 Agentforce，已交付 24 億個 Agentic Work Units，推出了以「完成的任務」而非「使用者登入」來衡量價值的新授權模式。HubSpot 推出 Credits 模式，客戶為 AI 代理人執行的工作付費。Workday、Adobe 也各自推出了消費制定價。

這場反擊揭示了一個更深層的事實：超過 60% 的 SaaS 公司已採用某種形式的使用量基礎定價。全球 SaaS 支出預計從 2025 年的 3,180 億美元增長至 2029 年的 5,760 億美元。企業並非放棄軟體，而是在軟體上花更多錢，只是花法不同了。

### Token 補貼的可持續性問題

Anthropic 透過 Pro（每月 20 美元）和 Max（每月 100 至 200 美元）方案補貼 token 使用，這是推動 vibe coding 浪潮的重要因素。但經濟現實很嚴峻：有單一 Max 使用者在一個月內消耗了 51,291 美元的運算資源，而訂閱費僅 200 美元。一般重度使用者每月可消耗 5,000 到 8,000 美元的運算資源。

Anthropic 的修正後毛利率從預期的 50% 降至 40%，AWS 支出增速超過營收。Sam Altman 在 2025 年公開承認 OpenAI「在 Pro 訂閱上虧錢」。這種補貼模式的損益兩平預計要到 2028 年才能實現，前提是推論成本繼續以每年約 10 倍的速度下降。

如果補貼不可持續，vibe coding 的經濟學就會發生根本性的改變。當造輪子的「免費」其實是「暫時被補貼的」，長期計算就不一樣了。

---

## What's Next

### 三種可能的未來

**共存演化（最可能，約 55%）：** AI 自建工具在中小企業和個人開發者中普及，但企業市場仍以 SaaS 為主。SaaS 公司成功轉型為「AI 增強平台」，從座位制轉向消費制定價。自建工具和 SaaS 形成互補而非替代。市場持續成長，但利潤率承壓。

**大解構（約 25%）：** AI 工具的可靠性在 2027-2028 年達到企業級標準。大量中型 SaaS 公司倒閉或被併購。「配方與材料」模式成為主流，底層基礎設施和 API 服務商成為最大贏家。

**技術債清算（約 20%）：** 2026 年的 vibe coding 熱潮產生大量低品質內部工具，到 2027-2028 年出現系統性的維護危機和安全事件。企業重新擁抱專業 SaaS，但要求更高的 AI 整合度。

### 一句話結論

當造輪子的成本趨近於零，輪子本身的價值不會歸零，但會從「成品」轉移至「材料」和「使用說明書」。而真正無法被 AI 複製的，是使用者對輪子的信任。

**值得關注的發展：**

- SaaS 定價模式的轉型速度（座位制 → 消費制/成果制）
- AI 生成程式碼品質的改善幅度（決定「技術債清算」情境的機率）
- 「配方與材料」生態系的成熟度（Claude Code Plugins、SDD 工具的採用率）
- Token 補貼的可持續性（Anthropic、OpenAI 的推論成本下降速度 vs 使用量成長）

**給讀者的建議：**

- 如果你正在付費訂閱在 2026 年仍然零 AI 功能的 SaaS，開始評估替代方案
- 如果你在建造 SaaS 產品，思考你的價值是在「組裝層」還是在「材料層」或「信任層」
- 如果你在用 AI 自建工具，誠實計算維護成本，別只看建造成本

---

## 參考資料

- [SaaS in, SaaS out: Here's what's driving the SaaSpocalypse](https://techcrunch.com/2026/03/01/saas-in-saas-out-heres-whats-driving-the-saaspocalypse/) - TechCrunch 對 SaaS 產業震盪的深度分析
- [Cursor has reportedly surpassed $2B in annualized revenue](https://techcrunch.com/2026/03/02/cursor-has-reportedly-surpassed-2b-in-annualized-revenue/) - Cursor 的破紀錄成長
- [Klarna CEO doubts that other companies will replace Salesforce with AI](https://techcrunch.com/2025/03/04/klarna-ceo-doubts-that-other-companies-will-replace-salesforce-with-ai/) - Klarna 棄用 Salesforce 的後續
- [The 90/10 Rule for AI Agents](https://www.saastr.com/the-90-10-rule-for-ai-agents-updated-we-replaced-a-paid-saas-tool-in-a-day-with-a-vibe-coded-app-heres-what-we-learned/) - SaaStr 自建工具取代 SaaS 的實際經驗
- [What Folks Are Really Vibe Coding Today](https://www.saastr.com/what-folks-are-really-vibe-coding-today-its-not-building-their-own-salesforce/) - 實際上人們在 vibe coding 什麼
- [Will Agentic AI Disrupt SaaS?](https://www.bain.com/insights/will-agentic-ai-disrupt-saas-technology-report-2025/) - Bain & Company 的 SaaS 產業分析
- [Reusable Prompts: The Future of Starter Templates](https://neon.com/blog/reusable-prompts-the-future-of-starter-templates) - 可重用提示作為配方的概念
- [Beyond vibe coding: the case for spec-driven AI development](https://thenewstack.io/vibe-coding-spec-driven/) - SDD 的分析
- [Open Source in the AI Era](https://zitadel.com/blog/open-source-in-the-ai-era) - 開源在 AI 時代的價值轉變
- [Measuring the Impact of Early-2025 AI on Experienced OS Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) - METR 對 AI 輔助開發的對照實驗
- [Vibe-code new ideas and SaaS tools](https://medium.com/@tarekPixels/vibe-code-new-ideas-and-saas-tools-9480e602466d) - Blinkist 的 vibe coding 經驗

---

_最後更新：2026-03-08_
