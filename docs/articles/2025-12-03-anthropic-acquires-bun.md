---
title: "Anthropic 併購 Bun：AI 編碼巨頭的基礎設施豪賭"
description: "Claude Code 在 6 個月內衝破 10 億美元營收後,Anthropic 用首次併購展現野心——收購全球最快的 JavaScript runtime Bun,為 AI 原生開發工具打造專屬引擎。"
date: 2025-12-03
tags: ["Anthropic", "Bun", "併購", "AI編碼", "Claude", "JavaScript", "開發工具"]
category: articles
---

# Anthropic 併購 Bun：AI 編碼巨頭的基礎設施豪賭

> Claude Code 在 6 個月內衝破 10 億美元營收後,Anthropic 用首次併購展現野心——收購全球最快的 JavaScript runtime Bun,為 AI 原生開發工具打造專屬引擎。

## 元資料

- **建立日期：** 2025-12-03
- **更新日期：** 2025-12-03
- **標籤：** #Anthropic #Bun #併購 #AI編碼 #Claude #JavaScript #開發工具
- **狀態：** 已發布
- **字數：** 約 3,200 字

---

## The Big Picture

**2025 年 12 月 2 日**,AI 巨頭 **Anthropic** 宣布收購 JavaScript runtime 新星 **Bun**,這是 Anthropic 成立以來的首次併購。

這筆交易背後的三大關鍵訊號：
- **爆炸式成長的壓力**：Claude Code 在 6 個月內達到 10 億美元 run-rate revenue,基礎設施能力成為瓶頸
- **技術棧掌控權**：從依賴 Node.js 生態系統轉向自主掌控核心 runtime,為 AI 原生開發工具量身打造
- **市場領先地位**：在 GitHub Copilot、Cursor、Replit 的激烈競爭中,透過垂直整合建立技術護城河

併購金額未披露,但 Bun 保持開源,MIT 授權不變。這次併購展現了 AI 編碼工具的新趨勢：當產品驗證成功後,掌控底層基礎設施成為決定勝負的關鍵。

---

## Why It Matters

### 1. Claude Code 的驚人成長曲線

Claude Code 在 2025 年創下 AI 開發工具的成長紀錄：

**六個月的奇蹟：**
- **2025 年 5 月**：Claude 4 模型發布後,Claude Code 用戶開始成長
- **2025 年 7 月**：從 4 月的 $17.5M ARR 成長到 $400M ARR
- **2025 年 11 月**：達到 $1B run-rate revenue
- **成長幅度**：從 4 月到 12 月成長約 57 倍

**關鍵數據：**
- **115,000 名開發者**使用 Claude Code（2025 年 7 月數據）
- **每週處理 1.95 億行程式碼**
- **企業客戶**：Netflix、Spotify、KPMG、L'Oreal、Salesforce
- **營收占比**：約 80% 來自企業和開發者工作負載

這種成長速度需要配套的基礎設施能力。當你每週處理近 2 億行程式碼時,runtime 的性能直接影響用戶體驗。

### 2. Bun 的技術優勢

Bun 在 2021 年由 Jarred Sumner 創立,目標是打造比 Node.js 更快的 JavaScript runtime。

**核心技術特點：**

| 層面 | Bun | Node.js | 性能優勢 |
|------|-----|---------|----------|
| **HTTP 服務器** | 52,000 req/sec | 13,000 req/sec | 4x |
| **啟動時間** | 微秒級冷啟動 | 秒級啟動 | 顯著提升 |
| **CPU 密集任務** | 1,700 ms | 3,400 ms | 2x |
| **檔案 I/O** | - | - | 3x |
| **套件安裝** | - | - | 10-30x |

**架構優勢：**
- **語言**：使用 Zig 編寫（低階語言,性能優越）
- **引擎**：採用 JavaScriptCore（Safari 使用的引擎）而非 V8
- **整合工具**：runtime、package manager、bundler、test runner 四合一

**市場接受度：**
- **每月 700 萬次下載**
- **GitHub 82,000 顆星**
- **企業用戶**：Midjourney、Lovable 等

### 3. AI 編碼工具的基礎設施戰

這次併購顯示 AI 編碼工具進入新階段：**從 AI 能力競爭轉向完整技術棧競爭**。

**第一階段（2023-2024）：AI 能力競爭**
- 誰的程式碼補全更準確？
- 誰能支援更多語言？
- 誰的 context window 更大？

**第二階段（2025-）：完整體驗競爭**
- 執行速度夠快嗎？
- 部署順暢嗎？
- 能否無縫整合開發流程？

**實際影響：**
Anthropic 在併購公告中明確表示：「Bun 的合作對 Claude Code 團隊的快速執行至關重要,直接推動了 Claude Code native installer 的推出。」

這透露了重要訊息：Bun 不只是被收購方,而是 Claude Code 產品開發的關鍵推動者。

---

## 核心分析

### Anthropic 的成長軌跡與策略轉變

**公司整體表現（2025）：**

| 時間點 | 里程碑 | 意義 |
|--------|--------|------|
| **2025 年初** | Claude 3 系列發布 | 確立市場競爭力 |
| **2025 年 5 月** | Claude 4 系列發布 | 技術領先地位 |
| **2025 年 7 月** | Claude Code ARR $400M | 開發工具市場突破 |
| **2025 年 11 月** | Series F 融資,估值 $183B | 資本充足支持擴張 |
| **2025 年 12 月** | 收購 Bun | 首次併購,垂直整合 |

**營收結構：**
- **2025 年全年預估營收**：$3.3B
- **Claude Code 貢獻**：$1B+ run-rate revenue
- **企業與 API**：約 80% 營收來源

**策略轉變：**
Anthropic 從「AI 模型提供商」轉變為「AI 應用平台」：
1. **模型層**：Claude 系列模型
2. **應用層**：Claude Code、Claude Agent SDK
3. **基礎設施層**：收購 Bun,掌控 runtime（NEW）

### Bun 的發展歷程與創辦人背景

**Jarred Sumner 的故事：**
- **背景**：高中輟學,自學程式設計,2014 年 Thiel Fellowship 得主
- **職涯**：曾兩度在 Stripe 工作,主要擔任前端工程師
- **創業**：2022 年創立 Oven,開發 Bun
- **融資**：從 Kleiner Perkins 和 Vercel 創辦人 Guillermo Rauch 募得 $26M

**Bun 的發展時間線：**

| 時間點 | 里程碑 |
|--------|--------|
| **2021** | Jarred Sumner 開始開發 Bun |
| **2022** | 正式開源,MIT 授權 |
| **2023** | Bun 1.0 發布,獲得廣泛關注 |
| **2024** | 企業採用增加,生態系統成熟 |
| **2025 年 12 月** | 被 Anthropic 收購 |

**Bun 的技術哲學：**
- **速度至上**：比現有方案快是首要目標
- **開發者體驗**：簡化工具鏈,減少配置
- **相容性**：支援 Node.js 生態系統

### 併購的戰略邏輯

**對 Anthropic 的價值：**

**1. 技術掌控**
- **性能優化**：為 AI 編碼場景量身打造 runtime 優化
- **快速迭代**：無需等待第三方 runtime 更新
- **深度整合**：在 runtime 層級整合 AI 能力

**2. 產品競爭力**
- **速度優勢**：Claude Code 執行速度提升 2-4 倍
- **穩定性**：自主掌控核心技術棧
- **新功能**：可以開發 Node.js 無法實現的功能

**3. 團隊與人才**
- **獲得頂尖 runtime 開發團隊**
- **Jarred Sumner 的技術領導力**
- **系統程式設計專長**（Zig、低階優化）

**4. 開源社群**
- **700 萬月下載量**的用戶基礎
- **82,000 GitHub stars** 的社群支持
- **開源信譽**加持 Anthropic 的開發者品牌

**對 Bun 的價值：**

**1. 資源支持**
- Anthropic 估值 $183B,資源充沛
- 可以加速 Bun 的開發和推廣
- 企業客戶資源共享

**2. 實際應用場景**
- Claude Code 提供大規模實戰環境
- 每週 1.95 億行程式碼的測試場景
- 115,000 開發者的真實回饋

**3. 願景延續**
- Bun 保持開源
- MIT 授權不變
- 繼續服務廣泛的 JavaScript 社群

---

## 產業脈絡

### 1. AI 編碼工具市場的白熱化競爭

**市場格局（2025）：**

| 產品 | 公司 | 定位 | 估值/市場地位 |
|------|------|------|---------------|
| **GitHub Copilot** | Microsoft | IDE 整合型 AI 助手 | 微軟支持,市佔率領先 |
| **Cursor** | Anysphere | AI 原生程式碼編輯器 | 快速成長,開發者喜愛 |
| **Claude Code** | Anthropic | AI 編碼 agent 平台 | $1B ARR,企業市場強 |
| **Replit** | Replit | AI 驅動線上開發環境 | 完整開發平台 |
| **v0.dev** | Vercel | AI UI 生成工具 | 專注前端開發 |

**Claude Code 的差異化：**
- **Agent 導向**：完整的自主開發能力,不只是程式碼補全
- **企業市場**：80% 營收來自企業,服務 Netflix、Spotify 等
- **垂直整合**：從 AI 模型到 runtime 的完整技術棧

**競爭趨勢：**
1. **從工具到平台**：單一功能工具向完整開發平台演進
2. **垂直整合**：掌控更多技術棧層次
3. **企業市場**：個人用戶向企業級解決方案轉變

### 2. JavaScript Runtime 的演進

**歷史演進：**

| 年代 | Runtime | 特點 | 市場地位 |
|------|---------|------|----------|
| **2009** | Node.js | 革命性創新,建立生態系統 | 主導地位 |
| **2018** | Deno | 安全性優先,TypeScript 原生 | 小眾市場 |
| **2021** | Bun | 性能至上,工具整合 | 快速成長 |

**Bun 的市場挑戰：**
- **生態系統**：Node.js 有 15 年的套件累積
- **企業採用**：大型企業遷移成本高
- **開發者習慣**：需要時間改變

**Anthropic 收購的影響：**
- **加速採用**：Claude Code 的 115,000 開發者是天然用戶
- **企業信任**：Anthropic 的企業客戶可能嘗試 Bun
- **生態投資**：更多資源投入 Bun 生態系統建設

### 3. AI 巨頭的併購策略

**2025 年 AI 產業併購趨勢：**

**之前：**
- AI 公司專注模型訓練和 API 服務
- 透過合作夥伴建構應用生態
- 較少進行併購

**現在：**
- 向上下游擴張（基礎設施、應用）
- 策略性併購補強能力
- 建立完整技術棧

**Anthropic 的併購策略：**
- **首次併購即選擇基礎設施**：顯示長期布局
- **保持開源**：維護開發者社群信任
- **快速整合**：Bun 已經在 Claude Code 中使用

---

## 挑戰與考量

### 1. 開源社群的疑慮

**潛在擔憂：**

**商業化壓力**
- 被大公司收購後,開源專案是否會偏向商業利益？
- Bun 的開發優先順序是否會向 Claude Code 傾斜？

**技術方向**
- Bun 是否會針對 AI 編碼場景過度優化？
- 一般 JavaScript 開發者的需求是否會被忽視？

**Anthropic 的回應：**
- 明確承諾 Bun 保持開源、MIT 授權
- 繼續投資使 Bun 成為所有 JavaScript/TypeScript 開發者的首選
- 公開開發,透明決策

**歷史參照：**
- **成功案例**：Microsoft 收購 GitHub,繼續開源友善
- **失敗案例**：某些被收購的開源專案逐漸商業化

### 2. 技術整合複雜度

**挑戰領域：**

**Claude Code 整合**
- 如何深度整合 AI 能力到 runtime 層？
- 需要哪些 Bun 的客製化功能？
- 如何平衡通用性與專用性？

**性能優化**
- AI 編碼的特殊性能需求是什麼？
- 如何針對大量程式碼生成和執行優化？
- 記憶體管理的新挑戰

**相容性維護**
- 保持 Node.js 生態系統相容性
- 支援現有 npm 套件
- 開發者遷移成本

**整合時間線：**
- **短期（3-6 個月）**：穩定現有整合,優化性能
- **中期（6-12 個月）**：推出 AI 原生的 runtime 功能
- **長期（1-2 年）**：建立 Bun 生態系統,擴大採用

### 3. 競爭對手的反應

**可能的市場動態：**

**Microsoft / GitHub**
- 可能加強 GitHub Copilot 與 VS Code 的整合
- 投資於 Node.js 性能改進
- 或考慮收購其他開發工具

**Cursor / Replit**
- 可能尋求類似的垂直整合機會
- 探索與其他 runtime 的深度合作
- 或開發自己的 runtime 解決方案

**Vercel / Next.js**
- Vercel 創辦人是 Bun 的早期投資者
- 可能影響 Next.js 與 Bun 的整合策略
- 需要平衡與 Anthropic 的關係

### 4. 市場定位的取捨

**Bun 的身份轉變：**

**之前：**
- 中立的開源 JavaScript runtime
- 服務所有 JavaScript 開發者
- 與各種工具和平台相容

**之後：**
- Anthropic 旗下的開源專案
- 優先支援 Claude Code
- 可能被視為「Anthropic 的 runtime」

**潛在影響：**
- 競爭對手可能減少採用 Bun
- 某些企業可能有供應商鎖定疑慮
- 但 Claude Code 的用戶基礎提供強大推動力

---

## 產業影響

### 1. AI 編碼工具的「全棧化」趨勢

**三個層次的整合：**

**第一層：AI 模型**
- 程式碼生成能力
- 理解和推理能力
- Context 處理能力

**第二層：開發工具**
- 編輯器整合
- 偵錯和測試
- 版本控制

**第三層：執行環境** ← Bun 在這裡
- Runtime 性能
- 部署和託管
- 監控和維運

**啟示：**
未來 AI 編碼平台的競爭,將是完整技術棧的競爭。只有 AI 能力或只有工具能力都不夠,需要端到端的優化體驗。

### 2. 開源商業模式的新範式

**Bun 的模式：**
1. **開源建立品牌和社群**：700 萬月下載,82,000 stars
2. **被大公司收購**：獲得資源和規模
3. **繼續開源**：維持社群信任和貢獻
4. **整合到商業產品**：成為更大生態系統的一部分

**對開源創業者的啟示：**
- 開源專案可以是併購標的
- 保持技術中立性在早期很重要
- 但最終與商業產品深度整合可能帶來最大價值

### 3. AI 巨頭的基礎設施戰略

**趨勢觀察：**

**OpenAI：**
- 專注於模型和 API
- 透過合作夥伴建構應用層
- 較少自建基礎設施

**Anthropic：**
- 模型 + 應用（Claude Code）
- 現在加上基礎設施（Bun）
- 垂直整合策略

**Google：**
- 擁有完整技術棧（GCP、Gemini、Workspace）
- 但開發者工具市場表現較弱

**啟示：**
Anthropic 的策略可能代表新的模式：AI 公司不只提供模型,而是建立從底層到應用的完整生態系統。

---

## 關鍵洞察

**從 Anthropic 併購 Bun,我們可以觀察到：**

### 1. 性能是 AI 應用的隱藏瓶頸

Claude Code 每週處理 1.95 億行程式碼。當規模達到這個程度,runtime 的性能差異被放大：
- 4x 的速度提升 = 更快的開發迭代
- 更低的延遲 = 更好的用戶體驗
- 更高的吞吐量 = 更低的基礎設施成本

**規模放大了微小差異的影響。**

### 2. 開源是併購標的,也是護城河

Bun 的開源策略帶來：
- **社群驗證**：82,000 stars 證明技術品質
- **生態系統**：700 萬月下載的用戶基礎
- **人才吸引**：頂尖工程師願意貢獻

被收購後繼續開源：
- **維持信任**：避免社群反彈
- **持續貢獻**：外部開發者繼續改進
- **品牌價值**：Anthropic 的開發者友善形象

### 3. AI 編碼市場已進入整合期

**2023-2024：產品驗證期**
- 各家推出 AI 編碼工具
- 競爭焦點：AI 能力

**2025-：整合與深化期**
- 勝出者開始垂直整合
- 競爭焦點：完整體驗

Anthropic 收購 Bun 可能開啟併購潮。預期未來會看到更多類似交易。

### 4. 創辦人背景的重要性

Jarred Sumner 的經歷凸顯成功的模式：
- **深厚技術背景**：能用 Zig 寫 runtime
- **實戰經驗**：在 Stripe 的工作經驗
- **清晰願景**：「faster than anyone would believe」
- **執行能力**：4 年建立成功產品

這種創辦人是大公司最想要的。

### 5. 估值 $183B 的併購策略

Anthropic 在估值 $183B 時進行首次併購,選擇了基礎設施而非應用層,這透露：
- **長期思維**：不急於擴大應用產品線
- **技術優先**：掌控核心技術棧
- **差異化**：建立競爭對手難以複製的優勢

**高估值公司的首次併購選擇,往往定義其長期戰略方向。**

---

## What's Next

### 對 Anthropic

**短期（3-6 個月）：**
1. **深化整合**：將 Bun 更深入整合到 Claude Code
2. **性能優化**：針對 AI 編碼場景的專門優化
3. **功能推出**：基於 Bun 的新 Claude Code 功能
4. **社群溝通**：向 Bun 社群說明願景和計劃

**中期（6-12 個月）：**
1. **生態建設**：投資 Bun 生態系統
2. **企業採用**：推動企業客戶採用 Bun
3. **開發者教育**：教學資源和文件
4. **Agent SDK**：將 Bun 整合到 Claude Agent SDK

**長期（1-2 年）：**
1. **市場領導地位**：Bun 成為 AI 開發的首選 runtime
2. **進一步整合**：可能收購其他開發工具
3. **平台生態**：建立完整的 AI 開發平台
4. **IPO 準備**：以完整技術棧吸引投資者

### 對 Bun 社群

**機會：**
- **更多資源**：Anthropic 的資金和人才支持
- **實戰驗證**：Claude Code 的大規模使用場景
- **企業採用**：Anthropic 的企業客戶可能嘗試 Bun
- **生態發展**：更多投資於工具和文件

**挑戰：**
- **方向疑慮**：是否會過度偏向 AI 編碼場景？
- **商業化**：如何平衡開源和商業利益？
- **競爭**：其他 runtime 可能強調「中立性」

**關鍵觀察點：**
- Bun 的 roadmap 是否變化？
- 社群貢獻是否保持活躍？
- 非 AI 場景的支援是否持續？

### 對 JavaScript 生態系統

**短期影響：**
- Bun 採用率可能快速提升
- Node.js 面臨更大壓力改進性能
- Deno 需要重新定位

**長期影響：**
- **Runtime 多元化**：不同場景使用不同 runtime
- **性能標準提升**：所有 runtime 都需要更快
- **AI 原生工具**：更多針對 AI 開發優化的工具

### 對競爭對手

**Microsoft / GitHub Copilot：**
- 可能投資 Node.js 性能改進
- 或考慮收購其他 runtime
- 加強 VS Code 生態整合

**Cursor：**
- 需要評估 runtime 策略
- 可能尋求技術合作
- 或專注於差異化功能

**Replit：**
- 已有自己的執行環境
- 可能加強基礎設施投資
- 突出雲端原生優勢

---

## 延伸思考

### 對開發者的啟示

**技能組合的轉變：**

**傳統技能仍重要：**
- 理解 JavaScript/TypeScript
- 掌握演算法和資料結構
- 系統設計能力

**新興技能越來越關鍵：**
- **與 AI 協作**：如何有效使用 AI 編碼工具
- **性能意識**：理解不同 runtime 的權衡
- **全棧思維**：從前端到 runtime 的完整理解

**職涯啟示：**
- 系統程式設計人才（如 Jarred Sumner）極度稀缺
- AI 時代,低階技能的價值反而提升
- 能橋接 AI 和基礎設施的人才最搶手

### 對創業者的啟示

**開源創業的新模式：**

**傳統模式：**
1. 開源專案
2. 建立社群
3. 推出商業版或雲端服務
4. 獲利

**新興模式（Bun 模式）：**
1. 開源專案
2. 建立社群
3. 被大公司收購
4. 整合到更大生態

**選擇考量：**
- 產品類型（基礎設施 vs. 應用）
- 市場規模
- 創辦人目標（獨立 vs. 影響力）

### 對投資者的啟示

**評估 AI 公司的新維度：**

**不只看模型能力：**
- 應用層產品如何？
- 基礎設施掌控度如何？
- 能否建立完整生態？

**併購能力也是競爭力：**
- 有足夠資本進行策略併購嗎？
- 有整合能力嗎？
- 有長期視野嗎？

**Anthropic 的啟示：**
- 估值 $183B 不只是模型價值
- 而是完整平台的價值
- 併購 Bun 展現執行力和願景

---

## 總結

Anthropic 併購 Bun 是一個標誌性事件,標誌著 **AI 編碼工具市場從產品驗證期進入垂直整合期**。

**核心要點：**

✅ **成長驅動併購**：Claude Code 在 6 個月內達到 $1B ARR,需要更強的基礎設施支撐

✅ **性能是護城河**：Bun 的 4x 性能優勢在 AI 編碼的大規模場景下被放大

✅ **開源是資產**：82,000 stars 和 700 萬月下載證明技術品質和社群支持

✅ **全棧是趨勢**：從 AI 模型到 runtime 的完整掌控成為競爭關鍵

✅ **整合是挑戰**：保持開源承諾的同時深化商業整合,需要智慧和執行力

**三個更大的趨勢：**

1. **AI 編碼工具走向平台化**：不再只是工具,而是完整的開發平台
2. **基礎設施重新被重視**：AI 時代,runtime 和底層技術的價值被重新評估
3. **開源併購成為常態**：成功的開源專案成為大公司的戰略併購標的

**最值得觀察的問題：**

Anthropic 能否成功整合 Bun,同時維持開源社群的信任和活力？這將決定這次併購是「雙贏的戰略聯姻」還是「雄心勃勃的豪賭」。

對於關注 AI 產業的人來說,Bun 在 Claude Code 中的演進將是重要觀察指標。如果成功,我們可能會看到更多 AI 巨頭收購開源基礎設施專案。如果遇到阻力,可能會讓其他公司重新思考垂直整合策略。

無論如何,**Anthropic 的首次併購選擇告訴我們：在 AI 時代,掌控技術棧底層的價值,可能比我們想像的更重要。**

---

## 參考資料

1. [Bun is joining Anthropic | Bun Blog](https://bun.com/blog/bun-joins-anthropic)
2. [Anthropic acquires Bun as Claude Code reaches $1B milestone](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone)
3. [Anthropic makes first acquisition with purchase of Bun | SiliconANGLE](https://siliconangle.com/2025/12/02/anthropic-makes-first-acquisition-purchase-bun-accelerate-claude-code/)
4. [Claude Code revenue jumps 5.5x | VentureBeat](https://venturebeat.com/ai/anthropic-adds-usage-tracking-to-claude-code-as-enterprise-ai-spending-surges)
5. [Bun vs Node.js 2025: Performance Comparison](https://strapi.io/blog/bun-vs-nodejs-performance-comparison-guide)
6. [Jarred Sumner interview | InfoWorld](https://www.infoworld.com/article/2338698/interview-with-jarred-sumner-buns-creator-talks-tech-funding-and-startups.html)
7. [Anthropic acquires Bun | Hacker News Discussion](https://news.ycombinator.com/item?id=46124267)

---

## 更新記錄

- **2025-12-03：** 建立文章,完整分析 Anthropic 併購 Bun 的背景、戰略意義與產業影響

---

*最後更新：2025-12-03*
