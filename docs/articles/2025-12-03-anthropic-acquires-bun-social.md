---
title: "6 個月衝破 10 億美元後，Anthropic 用首次併購買了什麼？"
description: "一家高中輟學生創辦的開源專案，被估值 1,830 億美元的 AI 巨頭相中。這背後藏著 AI 編碼工具市場最關鍵的戰場。"
date: 2025-12-03
author: "Clement Tang"
tags: ["Anthropic", "Bun", "AI編碼", "Claude", "社群貼文"]
category: articles
status: published
---

# 6 個月衝破 10 億美元後，Anthropic 用首次併購買了什麼？

> 一家高中輟學生創辦的開源專案，被估值 1,830 億美元的 AI 巨頭相中。這背後藏著 AI 編碼工具市場最關鍵的戰場。

## 元資料

- **建立日期：** 2025-12-03
- **更新日期：** 2025-12-03
- **標籤：** #Anthropic #Bun #AI編碼 #Claude #社群貼文
- **狀態：** 已發布
- **字數：** 約 2,000 字

---

## 高中輟學生 vs. AI 巨頭

Jarred Sumner 是個有趣的人。

高中輟學，自學程式設計，拿到 Peter Thiel 的獎學金，在 Stripe 待過兩次。2021 年，他開始寫一個 JavaScript runtime，目標很簡單：**比 Node.js 快。**

四年後，他的專案 Bun 每月有 700 萬次下載，在 GitHub 上有 82,000 顆星。

然後，Anthropic 出手了。

**2025 年 12 月 2 日**，Anthropic 宣布收購 Bun。這是這家估值 1,830 億美元的 AI 巨頭的首次併購。

收購金額沒有公開。但時機耐人尋味。

---

## 6 個月，10 億美元，然後呢？

要理解這次併購，得先看 Claude Code 的瘋狂成長。

**2025 年 4 月**，Claude Code 的年化營收是 1,750 萬美元。

**2025 年 7 月**，衝到 4 億美元。

**2025 年 11 月**，突破 10 億美元。

**從 4 月到 11 月，營收成長 57 倍。**

這種成長速度帶來一個問題：當你每週要處理 1.95 億行程式碼時，執行速度差 1 秒，累積起來就是巨大的成本和糟糕的用戶體驗。

Node.js 不夠快了。

Anthropic 需要更快的引擎。

---

## 4 倍速度的誘惑

Bun 到底有多快？

**HTTP 服務器測試：**
- Node.js：每秒 13,000 個請求
- Bun：每秒 52,000 個請求
- **快 4 倍**

**CPU 密集任務：**
- Node.js：3,400 毫秒
- Bun：1,700 毫秒
- **快 2 倍**

**套件安裝：**
- npm：基準速度
- Bun：**快 10-30 倍**

這些數字在小規模應用中可能不明顯。但當你有 115,000 個開發者每週寫 1.95 億行程式碼，每一點性能提升都會被放大。

**4 倍的速度 = 4 倍的用戶體驗 = 可能 4 倍的成本節省。**

---

## 技術棧的掌控權

但速度只是表面原因。

真正的關鍵是**掌控權**。

### 當你依賴別人的技術

在收購 Bun 之前,Claude Code 面臨的處境：
- **AI 模型**：自己的（Claude 系列）✅
- **編碼工具**：自己的（Claude Code）✅
- **執行引擎**：別人的（Node.js）❌

這意味著：
- 想優化性能？等 Node.js 更新
- 想加新功能？看 Node.js 支不支援
- 想深度整合？受限於第三方 API

### 收購 Bun 之後

現在 Anthropic 可以：
- **客製化優化**：針對 AI 編碼場景量身打造
- **快速迭代**：想加什麼功能自己決定
- **深度整合**：在 runtime 層級整合 AI 能力

舉個例子：未來 Bun 可能直接內建 AI 輔助功能，在程式碼執行前就用 AI 優化。這是 Node.js 永遠做不到的。

**這就是技術棧掌控權的價值。**

---

## 三大競爭對手的壓力

AI 編碼工具市場在 2025 年已經是紅海。

**GitHub Copilot**：微軟支持，市佔率第一，深度整合 VS Code

**Cursor**：開發者最愛的 AI 程式碼編輯器，快速崛起

**Replit**：完整的線上開發環境，從寫程式到部署一條龍

Claude Code 有什麼？
- **AI 能力**：Claude 模型業界頂尖 ✅
- **企業市場**：Netflix、Spotify、Salesforce 都在用 ✅
- **完整技術棧**：現在有了 Bun ✅

**競爭已經從「誰的 AI 更聰明」進化到「誰的完整體驗更好」。**

Anthropic 顯然看到了這一點。

---

## 開源的矛盾與機會

Bun 的收購還有個有趣的角度：**開源專案被大公司收購，到底是好是壞？**

### 社群的擔憂

**會不會變調？**
- Bun 是開源專案，700 萬開發者在用
- 被 Anthropic 收購後，會不會只服務 Claude Code？
- 開源承諾還算數嗎？

**Anthropic 的回應很明確：**
- Bun 繼續開源
- MIT 授權不變
- 繼續投資讓 Bun 成為所有 JavaScript 開發者的首選

### 歷史參照

**成功案例：Microsoft 收購 GitHub**
- 收購後繼續開源友善
- 投入更多資源
- 社群反而受益

**失敗案例：某些被收購的開源專案**
- 逐漸商業化
- 社群流失
- 最終消亡

Bun 會是哪一種？時間會告訴我們答案。

---

## 從工具到平台的進化

這次併購最深層的意義是：**AI 編碼工具正在從單一工具進化為完整平台。**

### 第一代 AI 編碼工具（2023-2024）

**競爭焦點：**
- 誰的程式碼補全更準確？
- 誰能支援更多語言？
- 誰的 AI 更聰明？

**本質：**
輔助工具，幫開發者寫程式碼

### 第二代 AI 編碼平台（2025-）

**競爭焦點：**
- 從寫程式到執行，誰的體驗更順暢？
- 誰能控制整個技術棧？
- 誰能提供企業級的完整解決方案？

**本質：**
完整平台，取代傳統開發流程

**Anthropic 的佈局：**
- **模型層**：Claude 系列
- **應用層**：Claude Code、Claude Agent SDK
- **基礎設施層**：Bun（NEW）

這是完整的技術棧。

---

## 三個被低估的細節

### 細節 1：Bun 早就在用了

Anthropic 在公告中提到：「Bun 的合作對 Claude Code 團隊的快速執行至關重要，直接推動了 Claude Code native installer 的推出。」

這句話透露：**Bun 不是被收購後才整合，而是早就在深度合作。**

收購只是把關係正式化。

### 細節 2：Jarred Sumner 的背景

高中輟學，Thiel Fellowship，Stripe 兩次，用 Zig 語言寫 runtime。

這種創辦人是科技巨頭最想要的：
- 深厚技術能力
- 執行力強
- 有清晰願景

**人才可能比技術更重要。**

### 細節 3：Vercel 的尷尬

Vercel 創辦人 Guillermo Rauch 是 Bun 的早期投資者。

Vercel 的 Next.js 是 JavaScript 生態系統的重要玩家。

現在 Bun 被 Anthropic 收購了,Vercel 的感覺可能很複雜：
- 投資回報可能不錯 ✅
- 但 Bun 現在是「競爭對手的技術」❓

**科技圈的關係總是這麼微妙。**

---

## 給創業者的三個啟示

### 啟示 1：開源專案可以是退出策略

**傳統開源創業路徑：**
開源專案 → 商業版 → SaaS → 獲利 → IPO 或被收購

**Bun 的路徑：**
開源專案 → 建立社群 → 被大公司收購 → 繼續開源

對於基礎設施類專案，第二種路徑可能更快、風險更低。

### 啟示 2：性能永遠有價值

在 AI、雲端、前端框架瘋狂發展的年代，很多人覺得「底層優化」已經不重要了。

Bun 證明：**快永遠有價值。**

當別人都在談 AI 能力，Jarred Sumner 專注讓 JavaScript 跑得更快。結果被估值 1,830 億美元的公司收購。

### 啟示 3：找到大客戶的痛點

Claude Code 每週處理 1.95 億行程式碼。

對這種規模的客戶，Node.js 的性能問題被放大了。

Bun 剛好解決這個痛點。

**當你的技術能解決大客戶的關鍵痛點，價值會被顯著放大。**

---

## 競爭對手會怎麼做？

Anthropic 收購 Bun 會引發連鎖反應嗎？

### Microsoft / GitHub Copilot

可能的動作：
- 投資 Node.js 性能改進
- 收購其他開發工具
- 加強 VS Code 生態系統整合

優勢：微軟有完整的開發者工具生態（VS Code、GitHub、Azure）

### Cursor

可能的動作：
- 尋求與其他 runtime 的合作
- 專注於差異化功能
- 或考慮類似的垂直整合

挑戰：資源比不上大公司

### Replit

可能的動作：
- 強化自己的雲端執行環境
- 突出端到端的優勢
- 加快企業市場推進

優勢：已經有完整的開發平台

**一個產業巨頭的策略轉變，往往會逼迫其他玩家跟進或尋找新定位。**

---

## 三個月後見真章

這次併購的成功與否，三個月內就會有初步答案。

### 觀察指標 1：Bun 的更新頻率

如果 Bun 的開發速度加快、新功能持續推出，代表整合順利。

如果更新變慢、社群貢獻減少，可能有問題。

### 觀察指標 2：Claude Code 的性能提升

Anthropic 應該會在近期推出基於 Bun 優化的 Claude Code 版本。

性能提升多少？穩定性如何？用戶反應？

### 觀察指標 3：開源社群的態度

GitHub stars 繼續成長嗎？
Issue 和 PR 保持活躍嗎？
開發者還願意貢獻嗎？

**開源專案被收購後，社群的反應最誠實。**

---

## 寫在最後：速度即權力

從 Anthropic 併購 Bun 這件事，最核心的一個洞察是：

**在 AI 時代，速度不只是性能指標，更是戰略資產。**

Claude Code 每週處理 1.95 億行程式碼。當你達到這個規模：
- 快 1 秒 = 節省數百萬美元成本
- 快 1 秒 = 更好的用戶體驗
- 快 1 秒 = 更多企業願意採用

**速度創造複利效應。**

Jarred Sumner 用 4 年時間，把「讓 JavaScript 跑更快」這個簡單目標，變成了被 AI 巨頭收購的基礎設施。

這提醒我們：
- 專注解決一個問題
- 把它做到極致
- 找到真正在乎的客戶

**有時候，最簡單的價值主張，反而最有力量。**

對 Anthropic 來說，這是首次併購，也是宣示：我們要建立從模型到 runtime 的完整技術棧。

對 Bun 社群來說，這是機會也是考驗：能否在被大公司收購後，繼續保持開源活力？

對整個 AI 編碼市場來說，這是信號：**競爭進入下半場，完整技術棧的爭奪開始了。**

接下來三到六個月，我們會看到這次併購的真正影響。

但可以確定的是：**AI 編碼工具的戰爭，已經從 AI 能力延伸到底層基礎設施。**

掌控技術棧底層的公司，將在下一輪競爭中佔據優勢。

---

## 關鍵數據一覽

**Claude Code 成長軌跡：**
- 2025 年 4 月：$17.5M ARR
- 2025 年 7 月：$400M ARR
- 2025 年 11 月：$1B run-rate revenue
- 成長倍數：57x（7 個月）
- 活躍開發者：115,000
- 每週處理程式碼：1.95 億行

**Bun 的數據：**
- 創立時間：2021 年
- 創辦人：Jarred Sumner（高中輟學,Thiel Fellowship）
- 月下載量：700 萬
- GitHub stars：82,000
- 融資：$26M（Kleiner Perkins、Vercel 創辦人）
- 性能優勢：比 Node.js 快 2-4 倍

**Anthropic 的佈局：**
- 估值：$183B（2025 年 11 月）
- 2025 年預估營收：$3.3B
- Claude Code 貢獻：$1B+
- 首次併購標的：Bun
- 戰略：垂直整合完整技術棧

**AI 編碼市場（2025）：**
- 主要玩家：GitHub Copilot、Cursor、Claude Code、Replit、v0.dev
- 競爭焦點：從 AI 能力轉向完整平台體驗
- 趨勢：垂直整合、企業市場、開源併購

---

## 參考資料

1. [Bun is joining Anthropic | Bun Blog](https://bun.com/blog/bun-joins-anthropic)
2. [Anthropic acquires Bun as Claude Code reaches $1B milestone](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone)
3. [Claude Code revenue jumps 5.5x | VentureBeat](https://venturebeat.com/ai/anthropic-adds-usage-tracking-to-claude-code-as-enterprise-ai-spending-surges)
4. [Bun vs Node.js 2025: Performance Comparison | Strapi](https://strapi.io/blog/bun-vs-nodejs-performance-comparison-guide)
5. [Jarred Sumner interview | InfoWorld](https://www.infoworld.com/article/2338698/interview-with-jarred-sumner-buns-creator-talks-tech-funding-and-startups.html)
6. [Anthropic acquires Bun | Hacker News](https://news.ycombinator.com/item?id=46124267)

---

## 更新記錄

- **2025-12-03：** 建立社群版本文章，以商業周刊風格改寫 Anthropic 併購 Bun 分析

---

*最後更新：2025-12-03*
