---
title: "AI 編程工具對 SaaS 產業的潛在顛覆效應"
description: "深度研究 Claude Code、Cursor 等 AI 編程工具如何改變軟體建造經濟學，以及對 SaaS 產業價值鏈的衝擊"
date: 2026-03-08
author: "Clement Tang"
tags: ["議題研究", "AI", "SaaS", "vibe-coding", "軟體產業", "商業模式"]
category: topic-research
status: draft
version: "1.0"
---

# AI 編程工具對 SaaS 產業的潛在顛覆效應

> 當 AI 讓任何人都能在週末造出一套 CRM，「軟體即服務」的護城河還剩下什麼？

## 元資料

| 項目         | 內容                                                        |
| ------------ | ----------------------------------------------------------- |
| **建立日期** | 2026-03-08                                                  |
| **更新日期** | 2026-03-08                                                  |
| **研究者**   | Clement Tang                                                |
| **標籤**     | #議題研究 #AI #SaaS #vibe-coding #軟體產業 #商業模式        |
| **狀態**     | 草稿                                                        |
| **研究深度** | 深度分析                                                    |
| **議題類型** | 產業變革 / 跨域整合                                         |

---

## 執行摘要 (Executive Summary)

### 議題一句話定位

AI 編程工具正在將軟體建造的邊際成本壓縮至趨近於零，從根本上動搖了 SaaS 產業「替你寫程式、替你維護」的價值主張。

### 核心問題陳述

> 當 Andrej Karpathy 在 2025 年初提出「vibe coding」概念時，多數人視之為一種開發者的新奇玩具。一年後的 2026 年 2 月，全球 SaaS 產業在 24 小時內蒸發了近 2,850 億美元市值。觸發點是 Anthropic 的 Claude Cowork 和 OpenAI 的企業代理人 Frontier 展示了 AI 代理人能自主處理複雜知識工作的能力。市場突然意識到：如果 AI 能取代軟體的使用者本身，那麼賣「座位數授權」的商業模式還能存活多久？

### 關鍵發現總覽

| 分析維度       | 核心發現                                                                 | 確信程度 |
| -------------- | ------------------------------------------------------------------------ | -------- |
| 現況趨勢       | vibe coding 搜尋量自 2025 年初暴增 2,400%，企業已開始用 AI 自建工具取代 SaaS | 高       |
| 最受衝擊類型   | 簡單工作流程工具、AI wrapper、功能型 SaaS 最脆弱；系統記錄型、合規型 SaaS 有護城河 | 高       |
| 經濟學轉變     | SaaS MVP 建造成本從 $25,000 降至 $7,000，功能對齊時間從 12-18 個月縮短至 3-6 個月 | 高       |
| 維護成本風險   | AI 生成程式碼的維護成本在第二年起可達傳統程式碼的 4 倍，技術債嚴重 | 中       |
| 商業模式演進   | 從「座位制」轉向「成果制」，「配方與材料」模式初現雛形                   | 中       |

### 立場聲明

> AI 編程工具對 SaaS 產業的衝擊是真實且正在加速的，但「SaaS 已死」的論述過於簡化。真正發生的是價值鏈的重組：應用層的價值正在被壓縮，而基礎設施層（開源程式庫、API 服務、資料平台）和信任層（合規、安全、SLA）的價值正在提升。SaaS 不會消失，但會從「替你蓋房子」的承包商，演變為「賣你建材和藍圖」的供應商。

---

## 第一部分：現況調查（2025Q4-2026Q1）

### 1.1 AI 編程工具的爆發式成長

2025 年可謂 AI 編程工具的「iPhone 時刻」。幾個關鍵里程碑標示了產業的快速演進。

Claude Code 於 2025 年 5 月發布後，僅八個月便成為最多人使用的 AI 編程工具，超越了 GitHub Copilot 和 Cursor。根據調查，95% 的受訪開發者每週至少使用一次 AI 工具，75% 的人有超過一半的軟體工程工作由 AI 輔助完成。在滿意度方面，Claude Code 以 46% 的喜愛度遙遙領先，Cursor 為 19%，GitHub Copilot 僅 9%。

Cursor 的成長速度更是打破了 SaaS 產業的所有紀錄。從推出到達成 10 億美元年度經常性收入（ARR）僅花了不到 24 個月，2025 年底已超過 100 萬名每日活躍使用者和 5 萬家企業客戶。到 2026 年 3 月，Cursor 的年化營收已突破 20 億美元，收入每兩個月翻一倍，估值達 293 億美元。

與此同時，GitHub Copilot 擁有超過 300 萬付費使用者，Claude Code 達到 5 億美元的年化營收，而被 OpenAI 收購的 Windsurf 在收購時已有 8,200 萬美元 ARR。值得注意的是，約 4% 的 GitHub commits 現在由 Claude Code 撰寫。

這些數據描繪的不僅是一個新工具類別的崛起，更是整個軟體開發方式的典範轉移。

### 1.2 「Vibe Coding」趨勢與自建工具案例

「Vibe coding」一詞由 AI 研究者 Andrej Karpathy 在 2025 年初提出，意指「完全投入感覺，擁抱指數成長，忘記程式碼的存在」。使用者以自然語言描述需求，讓 AI 負責編寫、除錯和改進程式碼。Google Trends 顯示，自 2025 年 1 月以來，「vibe coding」的搜尋量暴增了 2,400%。

以下是幾個具體的自建工具取代 SaaS 的案例：

**案例一：Blinkist 節省 $60,000/年 SaaS 支出**

德國書摘服務公司 Blinkist 使用 Lovable 和 Replit 等 vibe coding 工具，已取代了約 $60,000/年的 SaaS 訂閱。Blinkist 的產品負責人 Tarek Sadi 組織了一場 AI Hackday，超過 20 名從未接觸過程式碼的員工成功建造了各種內部工具，包括團隊主管用的預算概覽工具。過去從構想到可展示的原型需要數月，現在只需數天。

**案例二：Klarna 棄用 Salesforce，年省 $200 萬**

瑞典金融科技公司 Klarna 是最受矚目的案例。CEO Sebastian Siemiatkowski 宣布棄用 Salesforce CRM 和 Workday HR 系統，改用內部建造的 AI 驅動技術堆疊。他們使用 Neo4j 圖形資料庫整合資料，搭配 Cursor AI 快速部署新介面，並將原有的 1,200 個 SaaS 應用整合為統一的內部平台。在 CRM 方面省下約 200 萬美元，整體 AI 計畫（包括以 ChatGPT 驅動的客服機器人取代 700 名約聘員工）每年節省約 4,000 萬美元。員工人均年營收從 40 萬美元提升至 70 萬美元。

然而，Klarna 的案例也有後續發展值得關注。CEO 後來坦承對 Salesforce 風波感到「非常尷尬」，承認 AI 客服的品質不如預期，客戶仍需要人類支援，公司已開始重新招募人力。這個案例完美展示了自建工具的誘惑與陷阱。

**案例三：Alex Shartsis 的 20 分鐘個人 AI CRM**

Alex Shartsis 使用 Claude 在 20 分鐘內建造了一套個人 AI CRM，每月成本僅 20 美元，他聲稱這套系統已比傳統 CRM 更強大。這類故事在社群媒體上廣為流傳，包括一位前 Amazon 高管據報在一個週末內建造了一套功能完整的 CRM 系統。

**案例四：SaaStr 取消 $10,000/年贊助商入口網站**

SaaStr 的 Chief AI Officer Amelia Lerutte（非工程師背景）在約一天半內用 vibe coding 工具建造了一套贊助商入口網站，取代了年費 $10,000 的 SaaS 訂閱。觸發因素是原有工具在 2026 年初仍然沒有任何 AI 功能。Jason Lemkin 稱之為「下巴掉下來測試」（jaw drop test）：如果你付費的工具在 2026 年仍然零 AI 功能，那就是你該開始自建的信號。

### 1.3 社群討論熱度

在 X/Twitter 上，「SaaSpocalypse」（SaaS 末日）一詞成為熱門話題。2026 年 2 月 3 日至 4 日，全球 SaaS 和 IT 服務公司在 24 小時內蒸發了約 2,850 億美元市值。SaaS 指數在 2025 年全年下跌 6.5%，而同期 S&P 500 上漲 17.6%。Salesforce 市值蒸發 26%，Atlassian 下跌 30%，Adobe 下跌 19%，HubSpot、ServiceNow 等從高點下跌 30-50%。

Reddit 和 Hacker News 上的討論集中在幾個主題：一是「自建 vs 購買」的決策翻轉（過去十年的共識是「專注核心、其餘外包」，現在開始動搖）；二是非技術人員使用 vibe coding 工具的經驗分享；三是對 AI 生成程式碼品質的擔憂。

---

## 第二部分：SaaS 產業影響分析

### 2.1 最容易被取代的 SaaS 類型

根據多方分析，以下類型的 SaaS 最容易被 AI 自建工具取代：

**（一）簡單工作流程與 CRUD 應用**

SaaStr 的 Jason Lemkin 精準總結了這個現象：企業不是在用 vibe coding 建造自己的 Salesforce，而是在取代那些「每月 49 美元、提供 80% 你需要的功能和 40% 你不需要的功能」的小型 SaaS 工具。當一個獨立開發者能在一個週末複製核心功能時，這類產品的防禦力幾乎為零。2024 年，建造一個 SaaS 功能需要一個團隊 2-6 週；2026 年，借助 AI 編程工具，同樣的功能可以在一天甚至幾小時內上線。

**（二）「AI Wrapper」型產品**

那些本質上只是在大型語言模型上包一層介面的產品面臨最嚴峻的考驗。產業分析預測，90% 的 AI wrapper 新創將在 2026 年前倒閉。當基礎模型能力持續提升，這些產品的差異化空間不斷被壓縮。

**（三）機率型/模式匹配型 SaaS**

核心價值建立在模式匹配、內容生成、推薦系統或簡單自動化之上的公司風險最高，因為基礎模型只需幾行程式碼就能複製其整個產品。當自然語言成為介面，「優秀的 UX」不再是護城河。使用者寧可在 ChatGPT 裡打一行指令，也不想在複雜的工作流程建構器中導航。

**（四）Micro-SaaS 與單功能工具**

IDC 在 2025 年 12 月的分析報告「Is SaaS Dead?」預測，到 2028 年，純粹的座位制定價將過時，70% 的軟體供應商將重新設計定價策略。對單一功能的 Micro-SaaS 而言，當建造成本趨近於零，訂閱費用就顯得難以合理化。

### 2.2 仍具護城河的 SaaS 類型

並非所有 SaaS 都面臨同等威脅。以下特徵提供了相對持久的防禦力：

**（一）系統記錄型（Systems of Record）**

作為關鍵商業資料權威來源的應用程式面臨較低的顛覆風險。AI 代理人管理客戶關係仍然需要一個 CRM 來儲存資料；底層的系統記錄仍然不可或缺。關鍵在於：AI 代理人需要結構化、可靠的資料才能有效運作。

**（二）深度資料護城河**

專有資料是最強的護城河。雖然 GPT-4o 無處不在，真正的價值在於專有的使用模式、領域專屬內容和交易歷史。資料飛輪的運作邏輯是：更多使用者產生更豐富的資料，創造更好的體驗，吸引更多使用者。

**（三）確定性系統**

存活與否的決定因素是核心系統是確定性還是機率性的。確定性系統中，精確性至關重要、狀態管理複雜、錯誤會連鎖產生嚴重後果，這些特性使 AI 更難以取代。

**（四）網路效應與合規要求**

具備強大網路效應的平台（如 Slack、GitHub）和深度嵌入合規要求的企業軟體（金融監管、醫療法規）在 AI 時代反而可能更有價值。在受監管產業中，企業願意為符合治理要求的 AI 增強軟體支付溢價。

**（五）「脈絡系統」（Systems of Context）**

2026 年最有價值的軟體正在從「系統記錄」演化為「脈絡系統」。系統記錄告訴你客戶買了什麼產品，脈絡系統則理解客戶為什麼買。這類系統能消化即時對話、電子郵件和非結構化文件，提供 AI 無法輕易複製的深度洞察。

### 2.3 Anthropic 的 Token 補貼策略

Anthropic 透過訂閱方案以低於 API 定價銷售 token，其經濟學類似「吃到飽自助餐」。這種做法建立了品牌忠誠度，但也帶來了嚴重的經濟壓力。

**訂閱方案定價：**
- Free：免費，使用限制較多
- Pro：$20/月（年繳約 $17/月）
- Max：$100/月（Pro 的 5 倍用量）或 $200/月（Pro 的 20 倍用量）

**補貼的經濟現實：**

一位 $200/月的 Max 訂閱者執行 Opus 等級的 agentic 工作負載，若以 API 計費可能超過 $1,000。更極端的案例中，有單一 Max 使用者在一個月內消耗了 $51,291 的運算資源，而訂閱費僅 $200。一般估計，Max 方案的重度使用者每月可燒掉 $5,000-$8,000 的運算資源。

Anthropic 在 2025 年的修正後毛利率從預期的 50% 降至 40%，推論成本比預期高出 23%。公司的 AWS 支出在 2024 年達 13.5 億美元，到 2025 年 9 月已累計達 26.6 億美元，增速超過其總營收。

這種補貼策略的可持續性建立在分佈上：大多數 Max 訂閱者可能只使用 20-40% 的可用容量，由中度使用者補貼重度使用者。Anthropic 在 2025 年 8 月引入了每週使用上限和超額使用按 API 費率計費作為安全閥。2026 年 2 月，Anthropic 更封鎖了第三方工具透過訂閱 OAuth token 存取 Claude 模型的方式，引發了 OpenCode、Roo Code、Cline 等工具社群的強烈反彈。

Sam Altman 在 2025 年 1 月公開承認 OpenAI「在 Pro 訂閱上虧錢」。Anthropic 的損益兩平預計要到 2028 年才能實現，前提是推論成本繼續以每年約 10 倍的速度下降。

---

## 第三部分：「重複造輪子」的經濟學分析

### 3.1 當造輪子成本趨近零

SaaS MVP 的建造成本已從 $25,000 降至約 $7,000，功能對齊時間從 12-18 個月縮短至 3-6 個月。這意味著「造輪子」的前期成本正在急劇下降，但這是否改變了造輪子的根本經濟邏輯？

一篇深具啟發性的分析指出：歸類為「通用功能」的東西（薪資系統、請假管理、身份驗證）不值得重複造輪子，這個道理並未改變。關鍵區別在於通用軟體與策略性差異化工具。對一家零售商而言，採購管理系統是策略性的、值得客製化建造的；對另一家來說，值得投資的是物流工具；其餘都可以標準化。

AI 改變的是「值得自建」的門檻：更多東西現在在經濟上可行自建了，但策略聚焦仍然比以往更重要。你花錢請一位專家解決他已解決過上千次的問題，好讓你將稀缺的人才集中在真正獨特的問題上。AI 輔助開發並沒有改變這個基本邏輯。如果一千個組織有同樣的需求，一個優秀的解決方案勝過一千個平庸的。

然而，現實中有一個重要的細微差異：SaaStr 的經驗表明，觸發自建的信號是「你付費的工具在 2026 年仍然零 AI 功能」。換言之，AI 並非讓所有造輪子都合理化，而是暴露了那些停滯不前的 SaaS 產品的脆弱性。

### 3.2 應用層價值壓縮與底層價值提升

當程式碼變成通用品，價值正在向兩個方向轉移。

**向下轉移：基礎設施與開源程式庫**

2025 年 GitHub 上成長最快的 10 個儲存庫中，有 6 個是 AI 基礎設施專案。Ollama、Hugging Face/Transformers、llama.cpp 等開源工具成為 AI 開發的標準基礎設施。MCP（Model Context Protocol）由 Anthropic 在 2024 年 11 月推出，正在成為 LLM 連接內外部能力的標準化協議。

開源的價值正在從「透過分發進行複合成長」轉變為 AI 無法生成的東西：信任。正如 ZITADEL 所述，他們真正販賣的是風險轉移——承擔正常運作時間、安全回應、合規文件和長期維護的責任。SLA、SOC 2 報告、CVE 揭露、威脅情報，這些不是功能，而是保險。

**向上轉移：脈絡與整合**

「Headless SaaS」的概念正在浮現：AI 代理人透過 API 而非 Web UI 與服務互動。這可能反而擴大市場，因為軟體的消費者不再只是人類，還包括 AI 代理人。

### 3.3 歷史類比

**3D 列印與分散式製造**

3D 列印的歷史提供了一個有力的類比。Ford 的生產線將工作帶到工人面前；3D 列印更進一步，將工作帶到客戶面前。根據 MIT 的研究，3D 列印可節省 85% 的運輸成本、17% 的庫存成本，整個供應鏈節省 70%。

然而，3D 列印並沒有消滅傳統製造業。它創造了一個新的利基市場（客製化、快速原型、備品），同時傳統製造在量產和精度上仍具優勢。類比到 SaaS：vibe coding 將創造一個「客製化內部工具」的新市場，但量產型、高可靠性的企業軟體仍有其價值。

關鍵啟示是：3D 列印將「設計檔案」（CAD 檔案）和「材料」（線材、樹脂）的價值提升了，而中間的「工廠」環節被壓縮。同樣，在 AI 編程時代，「規格/配方」和「基礎元件/API」的價值將提升，而「應用層的組裝」（即傳統 SaaS 的核心業務）將被壓縮。

**自助出版與內容創作**

Amazon Kindle Direct Publishing 讓任何人都能出版電子書，但並沒有消滅出版業。結果是：頂端出版商透過品牌、行銷和品質篩選維持價值；中間的代理人和小出版商受到最大衝擊；底端出現了大量自出版者。類比到 SaaS：頂級企業軟體商將存活，中間層的「功能型 SaaS」面臨最大壓力，底端將出現大量 vibe-coded 的個人化/小型團隊工具。

---

## 第四部分：「配方與材料」商業模式

### 4.1 已存在的類似模式

「配方與材料」模式並非全新概念，多個現有商業模式已展現類似邏輯：

- **Vercel Templates / v0**：Vercel 提供免費的 AI 應用程式模板和 starter kits，v0 則能將文字提示轉化為完整的響應式 Web 應用。社群驅動的生態系統讓開發者分享可重用的 UI 元件。
- **Shopify Themes & Apps**：主題和外掛程式市場的運作模式就是「配方」（主題/外掛設計）加「材料」（Shopify 基礎設施）。
- **WordPress Plugins/Themes**：整個 WordPress 生態系的經濟模型建立在此模式上。

### 4.2 AI 時代的「配方」形態

AI 時代的「配方」正在以幾種形態快速演化。

**（一）可重用 Prompts 與 Recipes**

Neon 提出了「可重用提示作為未來的 starter templates」概念。開發者正在建立「recipes」，例如 Neon + Drizzle 設定方案，包含逐步指令、必要套件安裝、程式碼添加和結構決策說明。AI 代理人的工作就是遵循步驟並套用變更。

**（二）Specification-Driven Development（SDD）**

SDD 是 vibe coding 的反向操作。使用者先撰寫結構化的、行為導向的規格書，定義預期行為和約束條件，AI 代理人接收規格書作為主要輸入，生成符合規格的程式碼。2026 年初，三大平台推出了專門的 SDD 工具：GitHub 的 Spec Kit、AWS Kiro 和 Tessl Framework。

Vercel 的 CTO 用了一個精妙比喻：「軟體現在是免費的。像小狗一樣免費。」生成很便宜，維護才是真正的工作。SDD 的甜蜜點在於需求明確的全新功能：新 API 端點、CRUD 模組、整合層。

**（三）Claude Code 的 Agent Skills 與 Plugins**

Anthropic 在 Claude Code 中引入了 Agent Skills（持久性、可重用的指令）和 Plugins（將 MCP 伺服器、資源和 skills 打包為可安裝的套件）。這代表了一種新的分發機制：不只分享工具，還分享 AI 代理人正確使用工具所需的指令和脈絡。

**（四）AI 代理團隊與分工協作**

2026 年 2 月隨 Opus 4.6 發布的 Agent Teams 是 Claude Code 最重要的更新。團隊成員之間直接溝通、共享發現、透過共享任務清單和信箱系統協調。Cursor 的代理人也能在隔離的雲端虛擬機器上運行 10-20 個平行代理人。

### 4.3 「配方與材料」模式的可行性與挑戰

**可行性信號：**
- Lovable 在推出三個月內達到 1,700 萬美元 ARR，證明了「幫助非技術人員建造軟體」的市場需求
- Emergent 獲得 Y Combinator 支持，7,000 萬美元 B 輪融資，估值 3 億美元
- AI 開發工具市場預計 2033 年達到 157 億美元

**主要挑戰：**
- **標準化困難**：每個企業的需求足夠不同，使得通用「配方」難以涵蓋所有邊緣案例
- **品質保證**：缺乏專業架構判斷的配方可能導致大規模技術債
- **商業模式可持續性**：配方的邊際成本趨近零，如何定價和變現仍是問題
- **生態碎片化風險**：過多的配方和工具可能造成選擇癱瘓

---

## 第五部分：反面論點

### 5.1 自建工具的維護成本（技術債）

這是反對「AI 取代 SaaS」敘事最有力的論點。

**AI 生成程式碼的品質問題嚴峻。** Ox Security 分析了超過 300 個儲存庫後發現，AI 生成的程式碼「高度功能性但系統性缺乏架構判斷」，80-100% 存在十種反覆出現的反模式，包括不完整的錯誤處理、脆弱的並發管理和不一致的架構。

**維護成本呈指數成長。** 到第二年以後，未管理的 AI 生成程式碼可能使維護成本達到傳統程式碼的 4 倍。AI 生成程式碼引入的問題數量是人類撰寫程式碼的 1.7 倍，可維護性和程式碼品質錯誤高出 1.64 倍。40-62% 的 AI 生成程式碼包含安全或設計缺陷。

**程式碼重複與流失率飆升。** GitClear 的研究發現，AI 編程助手的採用導致程式碼重複區塊增加了 8 倍。程式碼流失率（快速新增後又修改或移除的程式碼量）在 2021-2024 年間翻了一倍。

**認知偏差加劇問題。** METR 在 2025 年對資深開源開發者的對照實驗發現，在複雜的新任務中，使用 AI 的開發者實際上慢了 19%，但他們自認快了 20%——存在 39-44% 的認知差距。只有 3% 的開發者高度信任 AI 生成的程式碼，71% 拒絕在未經人工審查的情況下合併。

**SaaStr 的現實教訓。** SaaStr 的 Jason Lemkin 坦言，沒有人談論的是每週 15-20 小時用於維護代理人的時間、將一切串聯在一起的混亂流程，以及單人依賴的風險。如果唯一的代理人管理者離職，所有代理人都得停擺。SaaStr 估算 Amelia 的時間成本為每小時 $1,000-$2,000，這完全重新框定了自建 vs 購買的計算：軟體成本不重要，建造者的機會成本才是唯一的變數。

Vercel CTO 的比喻再次適用：「軟體現在像小狗一樣免費——免費領養，但之後的飼料、獸醫、訓練才是真正的支出。」

### 5.2 企業級需求

大型組織已花費數年和數百萬美元將 ERP 和 CRM 系統深度嵌入營運流程，隔夜替換極不現實。Salesforce CEO Marc Benioff 質問 Klarna：沒有成熟的 SaaS 平台，如何管理資料、分享、合規和治理？

企業級需求包括：
- **安全性**：vibe-coded 和第三方代理人本質上不如 Salesforce 等企業平台安全
- **合規性**：受監管產業（金融、醫療、政府）需要稽核軌跡、SOC 2 認證、GDPR 合規等
- **SLA 保證**：內部自建工具難以提供與 SaaS 供應商同等的正常運作時間保證
- **規模化**：從原型到支撐數千使用者的生產系統之間存在巨大鴻溝

### 5.3 整合和互通性問題

每建造一個 app 就多一個需要維護的 app。SaaStr 的經驗表明，維護 vibe-coded app 佔據了每天大量時間。更重要的是，多個自建工具之間的整合比使用統一 SaaS 生態系統（如 Salesforce 的完整堆疊）更加複雜和脆弱。

### 5.4 SaaS 的反擊策略

SaaS 巨頭並未坐以待斃。

**Salesforce Agentforce**：Salesforce 報告了 29,000 筆 Agentforce 交易和 8 億美元的 Agentforce ARR。已交付 24 億個 Agentic Work Units（AWU）。推出了「Agentic Enterprise License Agreement」（AELA），以完成的任務而非使用者登入來衡量價值。

**HubSpot Credits**：HubSpot 成功抵禦了 SaaSpocalypse，推出「HubSpot Credits」模式，客戶為 AI 代理人執行的工作付費，而非為人類座位數付費。

**Workday Flex Credits**：2025 年推出，允許為特定 AI 成果和代理人動作付費。

**Adobe Generative Credits**：轉向「生成式信用額度」系統，按特定輸出付費。

**整體趨勢**：從「座位制」向「成果制」或「消費制」轉型。超過 60% 的 SaaS 公司已採用某種形式的使用量基礎定價。全球 SaaS 支出預計從 2025 年的 3,180 億美元增長至 2029 年的 5,760 億美元（Forrester 估計）。企業並非放棄軟體，而是在軟體上花更多錢。

值得深思的反駁：「企業軟體的價值從未僅僅存在於程式碼本中。」

### 5.5 被忽略的人力資本問題

有一位開發者在大量使用 AI 工具後發現，當沒有 AI 輔助時，過去本能性的任務變得費力且笨拙。這暗示了一個更深層的風險：過度依賴 AI 工具可能侵蝕人類開發者的基礎技能，長期而言這可能比技術債更難修復。

50 人的工程部門到 2027 年可能縮減為 15 人，但這 15 人的生產力將翻倍，薪資也將大幅提升。這不是「被 AI 取代」，而是「被有效使用 AI 的人取代」。

---

## 第六部分：情境規劃

### 6.1 關鍵不確定因素

| 不確定因素                   | 可能範圍                          | 影響程度 |
| --------------------------- | -------------------------------- | -------- |
| AI 推論成本的下降速度         | 每年 2-10 倍                      | 高       |
| 企業對 AI 生成程式碼的信任度   | 緩慢接受到快速擁抱                 | 高       |
| 監管環境（AI 合規要求）       | 寬鬆到嚴格                        | 中       |
| AI 工具本身的可靠性提升速度    | 漸進改善到突破性提升               | 高       |

### 6.2 三種情境

**情境 A：「大解構」（機率 25%）**

AI 工具的可靠性和架構判斷力在 2027-2028 年達到企業級標準。大量中型 SaaS 公司倒閉或被併購。「配方與材料」模式成為主流。SaaS 市場規模在經歷短期萎縮後，以新形態重新成長。底層基礎設施和 API 服務商成為最大贏家。

**情境 B：「共存演化」（機率 55%）**

AI 自建工具在中小企業和個人開發者中普及，但企業市場仍以 SaaS 為主。SaaS 公司成功轉型為「AI 增強平台」，從座位制轉向消費制/成果制定價。自建工具和 SaaS 形成互補而非替代關係。市場整體持續成長，但利潤率承壓。

**情境 C：「技術債清算」（機率 20%）**

2026-2027 年的 vibe coding 熱潮產生大量低品質的內部工具，到 2027-2028 年出現系統性的維護危機和安全事件。企業重新擁抱專業 SaaS，但要求更高的 AI 整合度。SaaS 產業經歷「否極泰來」，估值回升。

### 6.3 早期預警信號

| 情境     | 早期信號                                                      |
| -------- | ------------------------------------------------------------- |
| 情境 A   | AI 生成程式碼的缺陷率持續大幅下降；大型企業開始裁撤 SaaS 預算  |
| 情境 B   | SaaS 定價模式成功轉型；AI 工具與 SaaS 深度整合成為常態         |
| 情境 C   | 重大的 AI 生成程式碼安全事件；企業內部工具維護成本急劇攀升      |

---

## 第七部分：研究結論

### 7.1 核心發現總結

1. **關於問題本質：** AI 編程工具對 SaaS 產業的衝擊是結構性的，而非週期性的。應用層軟體的建造成本正在趨近零，這是不可逆的趨勢。然而，建造成本趨近零不等於擁有成本趨近零——維護、安全、合規的成本仍然高昂。

2. **關於價值鏈重組：** 價值正在從「應用層組裝」向上下兩端移動。向下移向基礎設施（開源程式庫、API、資料平台），向上移向脈絡與信任（合規、安全、領域專業知識）。這與 3D 列印對製造業的影響高度類似。

3. **關於 SaaS 的分層命運：** 並非所有 SaaS 同等脆弱。簡單工作流程工具和 AI wrapper 面臨最大壓力。系統記錄型、確定性系統、具網路效應和合規護城河的 SaaS 仍具防禦力，甚至可能因 AI 代理人的需求而獲益。

4. **關於商業模式演進：** 「配方與材料」模式正在萌芽（可重用 prompts、SDD 規格書、Agent Skills/Plugins），但尚未成熟。座位制定價正在死亡，消費制/成果制定價正在崛起。

5. **關於維護的隱藏成本：** 這是目前被嚴重低估的風險。AI 生成程式碼的品質問題（1.7 倍的問題率、8 倍的重複率、39-44% 的認知偏差）暗示 2026 年的 vibe coding 浪潮可能在 2027-2028 年產生大規模的技術債清算。

### 7.2 對台灣市場的啟示

台灣的 SaaS 市場規模相對較小，但影響路徑可能與全球趨勢有所不同：

- **中小企業導向**：台灣企業以中小型為主，更可能採用 vibe coding 工具取代小型 SaaS 訂閱
- **代工思維的延伸**：台灣的 OEM/ODM 文化可能使「配方與材料」模式更容易被理解和接受
- **系統整合商的角色轉變**：傳統 SI 可能轉型為「AI 整合顧問」，幫助企業選擇和維護自建工具
- **合規需求較低**：相較於歐美市場，台灣的軟體合規要求相對寬鬆，可能加速自建工具的採用

### 7.3 一句話結論

> 當造輪子的成本趨近於零，輪子本身的價值不會歸零——但會從「成品」轉移至「材料」和「使用說明書」，而真正無法被 AI 複製的，是使用者對輪子的信任。

---

## 附錄：參考資料

### 產業報告與分析

| 機構/來源 | 標題/主題 | 連結 |
| --------- | --------- | ---- |
| Bain & Company | Will Agentic AI Disrupt SaaS? | [連結](https://www.bain.com/insights/will-agentic-ai-disrupt-saas-technology-report-2025/) |
| IDC | Is SaaS Dead?（2025 年 12 月） | 報告 |
| Forrester | 全球 SaaS 支出預測 2025-2029 | 報告 |
| METR | Measuring the Impact of Early-2025 AI on Experienced OS Developer Productivity | [連結](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) |
| Ox Security | AI 生成程式碼品質分析（300+ 儲存庫） | 報告 |
| GitClear | AI 編程助手對程式碼品質的影響 | 報告 |

### 新聞與分析文章

| 來源 | 標題 | 連結 |
| ---- | ---- | ---- |
| TechCrunch | SaaS in, SaaS out: Here's what's driving the SaaSpocalypse | [連結](https://techcrunch.com/2026/03/01/saas-in-saas-out-heres-whats-driving-the-saaspocalypse/) |
| TechCrunch | Cursor has reportedly surpassed $2B in annualized revenue | [連結](https://techcrunch.com/2026/03/02/cursor-has-reportedly-surpassed-2b-in-annualized-revenue/) |
| TechCrunch | Klarna CEO doubts that other companies will replace Salesforce with AI | [連結](https://techcrunch.com/2025/03/04/klarna-ceo-doubts-that-other-companies-will-replace-salesforce-with-ai/) |
| MIT Technology Review | AI coding is now everywhere. But not everyone is convinced. | [連結](https://www.technologyreview.com/2025/12/15/1128352/rise-of-ai-coding-developers-2026/) |
| MIT Sloan Management Review | The Hidden Costs of Coding With Generative AI | [連結](https://sloanreview.mit.edu/article/the-hidden-costs-of-coding-with-generative-ai/) |
| The New Stack | Beyond vibe coding: the case for spec-driven AI development | [連結](https://thenewstack.io/vibe-coding-spec-driven/) |
| InfoQ | AI-Generated Code Creates New Wave of Technical Debt | [連結](https://www.infoq.com/news/2025/11/ai-code-technical-debt/) |
| The Pragmatic Engineer | AI Tooling for Software Engineers in 2026 | [連結](https://newsletter.pragmaticengineer.com/p/ai-tooling-2026) |

### 部落格與專欄

| 來源 | 標題 | 連結 |
| ---- | ---- | ---- |
| SaaStr | The 90/10 Rule for AI Agents | [連結](https://www.saastr.com/the-90-10-rule-for-ai-agents-updated-we-replaced-a-paid-saas-tool-in-a-day-with-a-vibe-coded-app-heres-what-we-learned/) |
| SaaStr | What Folks Are Really Vibe Coding Today | [連結](https://www.saastr.com/what-folks-are-really-vibe-coding-today-its-not-building-their-own-salesforce/) |
| Medium (Rob Saker) | AI is Eating Enterprise SaaS | [連結](https://medium.com/@rsaker/ai-is-eating-enterprise-saas-1259d352f193) |
| Medium (Steven Cen) | AI Killed the Feature Moat | [連結](https://medium.com/@cenrunzhe/ai-killed-the-feature-moat-heres-what-actually-defends-your-saas-company-in-2026-9a5d3d20973b) |
| Medium (Tarek Sadi) | Vibe-code new ideas and SaaS tools | [連結](https://medium.com/@tarekPixels/vibe-code-new-ideas-and-saas-tools-9480e602466d) |
| Medium (Waleed Kadous) | SaaS is Losing Its Head | [連結](https://waleedk.medium.com/saas-is-losing-its-head-4645308bd087) |
| Growth Unhinged | Everyone can have their own AI CRM | [連結](https://www.growthunhinged.com/p/personal-ai-crm) |
| Uncoveralpha | The Great SaaS Unbundling | [連結](https://www.uncoveralpha.com/p/the-great-saas-unbundling-why-ai) |
| Neon | Reusable Prompts: The Future of Starter Templates | [連結](https://neon.com/blog/reusable-prompts-the-future-of-starter-templates) |
| DEV Community | Spec-Driven Development: Write the Spec, Not the Code | [連結](https://dev.to/bobbyblaine/spec-driven-development-write-the-spec-not-the-code-2p5o) |
| GitHub Blog | What to expect for open source in 2026 | [連結](https://github.blog/open-source/maintainers/what-to-expect-for-open-source-in-2026/) |
| ZITADEL | Open Source in the AI Era | [連結](https://zitadel.com/blog/open-source-in-the-ai-era) |
| Antoine Sauvinet | Build vs Buy in 2026: The Paradigm Has Shifted | [連結](https://oinant.com/en/posts/2026-01-05-build-vs-buy-2026/) |
| Particula | Cursor vs Claude Code in 2026 | [連結](https://particula.tech/blog/cursor-vs-claude-code-2026-guide) |
| Intellectia | Will AI Disrupt SaaS Business Model? 2026 Analysis | [連結](https://intellectia.ai/blog/will-ai-disrupt-saas-business-model-2026) |
| Natural 20 | Anthropic Banned OpenClaw: The OAuth Lockdown | [連結](https://natural20.com/coverage/anthropic-banned-openclaw-oauth-claude-code-third-party) |

### 企業與產品資料

| 來源 | 主題 | 連結 |
| ---- | ---- | ---- |
| Anthropic | Claude Plans & Pricing | [連結](https://claude.com/pricing) |
| Anthropic | Claude API Pricing | [連結](https://platform.claude.com/docs/en/about-claude/pricing) |
| Vercel | AI App Templates | [連結](https://vercel.com/templates/ai) |
| Salesforce Ben | Klarna-Salesforce Analysis | [連結](https://www.salesforceben.com/klarna-salesforce-workday-partnership-called-off-amidst-major-gen-ai-overhaul/) |
| Sacra | Cursor Revenue & Funding | [連結](https://sacra.com/c/cursor/) |

---

_最後更新：2026-03-08_
