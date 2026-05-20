---
title: "Research Memo: Gemini Spark 與開源 AI Agent 比較"
description: "Google I/O 2026 發布的個人 AI agent Gemini Spark 深度研究，並與開源 agent OpenClaw、Hermes Agent 對照分析"
date: 2026-05-19
author: "Clement Tang"
tags: ["research-memo"]
category: memo
status: draft
---

# Research Memo: Gemini Spark 與開源 AI Agent 比較

> 輕量級研究備忘錄，用於 Web↔CLI 工作流交接

## 會話資訊

| 欄位 | 內容 |
|------|------|
| **日期** | 2026-05-19 |
| **平台** | Web |
| **目標輸出** | Article（深度分析文章） |
| **預計字數** | 2,500-3,500 字 |

---

## 研究摘要

### 核心問題

> Google 在 I/O 2026 發布的 Gemini Spark 代表 AI agent 走向什麼樣的未來？當科技巨頭用分發通路把 agent 直接塞進數十億使用者手中，與草根爆紅的開源 agent（OpenClaw、Hermes Agent）相比，封閉託管與開源自架兩條路線各自的優勢、風險與資安隱憂是什麼？

### 關鍵發現

1. **Gemini Spark 是 Google 把 agent 產品化的第一步，核心賣點是「雲端 24/7 自主執行」**
   - Spark 跑在 Google Cloud 的專屬虛擬機（dedicated VM）上，由 Gemini 3.5 Flash 加上 Google Antigravity harness 驅動，可執行「長時程任務」（long-horizon tasks）。使用者關機、鎖屏後它仍在背景運作，這是與一般聊天機器人 session 最大的差異。官方定位語為「你在 Gemini app 裡的個人 AI agent，幫你打理數位生活、在你的指示下代你採取行動」。

2. **Google 的真正武器是分發通路，而非技術領先**
   - Spark 深度整合 Gmail、Docs、Slides 等 Workspace 工具，並透過 MCP 接上 Canva、OpenTable、Instacart。Gemini 月活已達 9 億、AI Overviews 觸及 25 億使用者。Google 把 agent 直接內建進既有產品，等於免去開源 agent 最難跨越的「使用者取得」門檻。TechCrunch 形容 Google「把下一波 AI 賭在 agent，而非 chatbot」。

3. **隱私與安全爭議是 Spark 最大的軟肋**
   - 洩漏的 onboarding 細則出現「Gemini Spark 可能會做出像是分享你的資訊或未經詢問就採購之類的事」這類措辭，被分析師形容為「Google 在消費性 AI 產品上發出過最大聲的警語」。Spark 同時要求使用者「務必監督」並「不要倚賴它提供醫療、法律、財務建議」。自主 agent 代你讀信、動帳單，放大了 indirect prompt injection（間接提示注入）的攻擊面。

4. **開源 agent 走的是相反路線：本機掌控、零訂閱費，但資安風險更裸露**
   - OpenClaw（2026 年 1 月底發布）本機執行、透過通訊軟體操作，GitHub star 從 1 月底破 10 萬衝到 3 月初逾 25 萬，超越 React 成為史上最多星的開源專案。但 1 月底的安全審計揪出 512 個漏洞、8 個重大漏洞，預設關閉驗證、憑證明文儲存，Kaspersky 等廠商直接建議「不要部署在有敏感資料的機器上」。

5. **Hermes Agent 帶來「自我學習」這個新維度，並已是 OpenRouter 用量第一**
   - Nous Research 的 Hermes Agent（2 月 25 日發布）內建「學習迴圈」，每完成任務會自動萃取可重用的「Skills」、累積跨 session 記憶，越用越快（內部數據稱累積 20+ skills 後同類任務快 40%）。5 月 10 日其每日 token 用量達 2,240 億，超越 OpenClaw 的 1,860 億，成為 OpenRouter 上用量最大的 AI 應用。

### 關鍵數據

| 指標 | 數值 | 來源 | 日期 |
|------|------|------|------|
| Gemini Spark 驅動模型 | Gemini 3.5 Flash + Antigravity harness | blog.google、TechCrunch | 2026-05 |
| Gemini Spark 可用性 | 本週給 trusted testers，下週 beta 給美國 Google AI Ultra 訂閱者 | blog.google、CNBC | 2026-05 |
| Google AI Ultra 價格 | 新增 100 美元/月開發者方案；頂級方案由 250 美元降為 200 美元/月 | Engadget、9to5Google | 2026-05 |
| Gemini 月活躍使用者 | 約 9 億；AI Overviews 觸及約 25 億 | 多家媒體彙整 | 2026-05 |
| Gemini 3.5 Flash 定價 | 1.50 / 9 美元 每百萬 token，1M token 脈絡視窗 | llm-stats、TechCrunch | 2026-05-19 |
| Gemini Spark Mac app | macOS app 今日開放下載，Spark 與語音功能今夏推出 | 多家媒體 | 2026-05-19 |
| OpenClaw 發布日 | 2026-01-25（前身 Clawdbot/Moltbot） | Wikipedia、openclaw.ai | 2026-01 |
| OpenClaw GitHub star | 1 月底破 10 萬；3 月 3 日逾 25 萬，超越 React | byteiota、The New Stack | 2026-03 |
| OpenClaw 安全審計 | 1 月底審計揪出 512 個漏洞、8 個重大；CVE-2026-25253（CVSS 8.8）可一鍵 RCE | Kaspersky | 2026-01 |
| Hermes Agent 發布日 | 2026-02-25 | GitHub、媒體 | 2026-02 |
| Hermes Agent GitHub star | 發布七週後約 9.5 萬至 15.8 萬（來源分歧，見備註） | GitHub、TokenMix | 2026-05 |
| Hermes Agent OpenRouter 用量 | 5 月 10 日每日 2,240 億 token，超越 OpenClaw 的 1,860 億 | MarkTechPost、媒體彙整 | 2026-05-10 |

### 重要引述

> 「Gemini Spark 是你在 Gemini app 裡的個人 AI agent，幫你打理數位生活、在你的指示下代你採取行動。它跑在 Google Cloud 的專屬虛擬機上、全天候 24/7 可用，你不需要一直開著筆電。」
> — Google 官方部落格 blog.google，I/O 2026 keynote 說明，2026-05-19
>
> 「Gemini Spark 是 3.5 模型與 Antigravity 共同造就的第一個體驗，讓我們有了加速使命、把產品變得更有幫助的新方式。」
> — Sundar Pichai，Google I/O 2026 opening keynote，2026-05-19
>
> 「Gemini Spark 可能會做出像是分享你的資訊、或未經詢問就採購之類的事⋯⋯請務必監督 Gemini Spark，不要倚賴它提供醫療、法律、財務或其他專業協助。」
> — Gemini Spark onboarding 細則（媒體引述的洩漏／beta 畫面），2026-05
>
> 「即使是最具抵抗力的模型（Opus 4.6），在資料被下毒的情況下，受害率仍超過其 10.0% 基準值的三倍，證明這個弱點是結構性的，而非單一模型的問題。」
> — arXiv 論文〈Your Agent, Their Asset: A Real-World Safety Analysis of OpenClaw〉，2026
>
> 「Hermes Agent 是唯一內建學習迴圈的 agent，它從經驗中創造技能、在使用中改進技能，並跨 session 建立對你越來越深的理解。」
> — Nous Research，Hermes Agent 官方說明，2026

---

## 內容大綱

建議文章主軸放在 Gemini Spark，OpenClaw 與 Hermes 作為對照組，凸顯 Google 的路線抉擇。建議章節架構如下。

### 1. 開場：2026 年 5 月 19 日，agent 之年的引爆點

- 以 I/O 2026 keynote 現場破題，Sundar Pichai 宣布 Gemini Spark，Google 正式進入「agentic Gemini 時代」。
- 帶出全文主軸：當 agent 從開源社群的玩具，變成科技巨頭塞進數十億人手中的產品，路線之爭正式開打。

### 2. Gemini Spark 是什麼：一個會在雲端替你過日子的 agent

- 官方定位與核心承諾：個人 AI agent、24/7、在你的指示下行動。
- 技術架構：Gemini 3.5 Flash + Antigravity harness、Google Cloud 專屬 VM、長時程任務、跨裝置接續（手機開始、筆電接手）。
- 具體能力範例：解析信用卡帳單找隱藏費用、監控小孩學校信件並產生每日摘要、彙整跨信件與聊天的會議筆記成 Google Docs 並起草 email。
- 生態整合清單：Workspace（Gmail/Docs/Slides）、Canva、OpenTable、Instacart、MCP 擴充、今夏的 Mac app 與子 agent、瀏覽器操作。

### 3. Google 的真正武器：分發通路與生態鎖定

- 9 億 Gemini 月活、25 億 AI Overviews 觸及、Android 數十億裝置。
- 「把 agent 塞進既有產品」的分發優勢，對比開源 agent 必須一個一個說服使用者安裝。
- 定價與可用性策略：Google AI Ultra 新分級（100 美元開發者方案、頂級降至 200 美元）、先美國、先 trusted testers。
- 訂閱制的商業意涵：agent 成為高價訂閱的錨點功能。

### 4. 風險的另一面：當 agent 代你動帳單、讀信件

- 隱私爭議：onboarding 細則「未經詢問就採購」的措辭、官方要求「務必監督」。
- prompt injection：自主 agent 放大攻擊面，Google DeepMind 的 defense-in-depth 與 Agent Gateway/DLP 防線。
- 「保留人類審核」與「自主執行」之間的張力，對比 Anthropic Claude Cowork 在政策層直接禁止自主採購。

### 5. 對照組一：OpenClaw，草根爆紅的本機 agent

- 出身與爆紅：Clawdbot/Moltbot 改名史、Peter Steinberger、1 月底發布、超越 React 的 star 紀錄。
- 部署與能力：本機執行、透過 WhatsApp/Telegram/Slack/Signal 操作、shell/瀏覽器/email/檔案。
- 安全現實：512 個漏洞、明文憑證、ClawHub 惡意 skill，社群推薦搭 Claude Opus 4.6 抗注入。

### 6. 對照組二：Hermes Agent，會自我進化的 agent

- Nous Research、2 月底發布、內建學習迴圈與 Skills 系統。
- 自架伺服器、24/7、可從 5 美元 VPS 跑到 serverless。
- 用量登頂 OpenRouter（每日 2,240 億 token），代表「自我學習型 agent」這個新典範。

### 7. 三方對照：八個維度看清路線之爭

- 用一張對照表收斂（見下方對照表），逐維度點評。

### 8. 結語：分發通路 vs 草根擴散，封閉託管 vs 開源自架

- Google 用通路換規模，開源用透明與掌控換信任。
- 自主 agent 浪潮的共同隱憂：prompt injection 是結構性問題，誰都還沒解決。
- 拋給讀者的問題：你願意把數位生活交給一個 24/7 替你行動的 agent 嗎？交給誰？

### 三方對照表（供寫作者直接取用或改寫）

| 維度 | Gemini Spark | OpenClaw | Hermes Agent |
|------|--------------|----------|--------------|
| 部署模式 | 雲端託管（Google Cloud 專屬 VM） | 本機自架（local-first，Gateway） | 自架伺服器（5 美元 VPS 到 serverless 皆可） |
| 自主性與 24/7 | 雲端 24/7，關機照跑 | 本機 cron/heartbeat 排程，機器需開機 | 24/7，serverless 閒置時休眠 |
| 安全與 prompt injection | Agent Gateway + DLP、defense-in-depth；自主採購爭議 | 風險裸露，512 漏洞、明文憑證、惡意 skill | 指令核可、容器隔離；prompt injection 仍為結構性風險 |
| 隱私與資料掌控 | 資料在 Google 雲，整合最深也最受質疑 | 資料留本機（記憶為 Markdown 檔），掌控度最高 | 跑在自己伺服器，掌控度高 |
| 定價 | 訂閱制（綁 Google AI Ultra） | 免費開源（MIT） | 免費開源（MIT） |
| 生態鎖定 | 高（綁 Google 帳號與 Workspace） | 低（多模型供應商、多通訊軟體） | 低（200+ 模型、可全用開源模型） |
| 目標使用者 | 深度使用 Google 生態的一般消費者 | 想自己掌控的開發者與 tinkerer | 想要會累積技能的長期 agent 的進階使用者 |
| 記憶與自我學習 | 連結個人 Google 資料，無公開「自我進化」機制 | 持久記憶（Markdown），無自動技能學習 | 核心差異：學習迴圈，自動產生並改進 Skills |

---

## 資料來源

- [Google I/O 2026: Sundar Pichai's opening keynote — blog.google](https://blog.google/innovation-and-ai/sundar-pichai-io-2026/) - Google 官方 keynote，Spark 定位原話
- [The Gemini app becomes more agentic — blog.google](https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/) - Gemini app 官方公告，Spark 詳述
- [Everything new in our Google AI subscriptions — blog.google](https://blog.google/products-and-platforms/products/google-one/google-ai-subscriptions/) - AI Ultra/Pro 訂閱與定價
- [I/O 2026 developer highlights: Antigravity — blog.google](https://blog.google/innovation-and-ai/technology/developers-tools/google-io-2026-developer-highlights/) - Antigravity harness
- [Google introduces Gemini Spark — TechCrunch](https://techcrunch.com/2026/05/19/google-introduces-gemini-spark-a-24-7-agentic-assistant-with-gmail-integration/) - Spark 發布報導
- [With Gemini 3.5 Flash, Google bets its next AI wave on agents — TechCrunch](https://techcrunch.com/2026/05/19/with-gemini-3-5-flash-google-bets-its-next-ai-wave-on-agents-not-chatbots/) - 策略框架
- [Google unveils AI model Gemini 3.5 and AI agent Gemini Spark — CNBC](https://www.cnbc.com/2026/05/19/google-ai-ultra-gemini-spark-omni.html) - 發布與可用性
- [Gemini app now has compute-based usage limits as AI Ultra now starts at $100 — 9to5Google](https://9to5google.com/2026/05/19/google-ai-ultra-100/) - 定價分級
- [The Google AI Ultra plan now starts at $100 a month — Engadget](https://www.engadget.com/2176060/the-google-ai-ultra-plan-now-starts-at-100-a-month/) - 定價
- [Google unveils Gemini Spark — a '24/7 personal AI agent' — Tom's Guide](https://www.tomsguide.com/ai/google-gemini/google-unveils-gemini-spark-a-24-7-personal-ai-agent-that-could-be-a-game-changer-for-agentic-ai) - 評測與分析
- [Google announces Gemini Spark to quietly run your digital life — Android Authority](https://www.androidauthority.com/google-gemini-spark-3668600/) - 能力與整合
- [Google's new AI agent can draft your emails... and eventually spend your money — VentureBeat](https://venturebeat.com/technology/googles-new-ai-agent-can-draft-your-emails-monitor-your-inbox-and-eventually-spend-your-money) - 採購爭議
- [Google's new Gemini Spark is an always-on AI agent — SiliconANGLE](https://siliconangle.com/2026/05/19/google-unveils-gemini-spark-always-ai-agent-daily-digital-tasks/) - 架構（Agent Gateway/DLP）
- [Advancing Gemini's security safeguards — Google DeepMind](https://deepmind.google/blog/advancing-geminis-security-safeguards/) - prompt injection 防禦
- [Lessons from Defending Gemini Against Indirect Prompt Injections — arXiv](https://arxiv.org/html/2505.14534v1) - 間接提示注入研究
- [GitHub - openclaw/openclaw](https://github.com/openclaw/openclaw) - OpenClaw 官方 repo
- [OpenClaw - Wikipedia](https://en.wikipedia.org/wiki/OpenClaw) - 沿革與發布日
- [New OpenClaw AI agent found unsafe for use — Kaspersky](https://www.kaspersky.com/blog/openclaw-vulnerabilities-exposed/55263/) - 512 漏洞安全分析
- [OpenClaw rocks to GitHub's most-starred status, but is it safe? — The New Stack](https://thenewstack.io/openclaw-github-stars-security/) - star 數與安全
- [Your Agent, Their Asset: A Real-World Safety Analysis of OpenClaw — arXiv](https://arxiv.org/pdf/2604.04759) - Opus 4.6 抗注入評測
- [GitHub - nousresearch/hermes-agent](https://github.com/nousresearch/hermes-agent) - Hermes 官方 repo
- [Hermes Agent — Nous Research 官方站](https://hermes-ai.net/) - 學習迴圈定位
- [OpenClaw vs Hermes Agent — MarkTechPost](https://www.marktechpost.com/2026/05/10/openclaw-vs-hermes-agent-why-nous-researchs-self-improving-agent-now-leads-openrouters-global-rankings/) - OpenRouter 用量對比

---

## 交接備註

### 研究狀態

- [x] 資料收集完成
- [x] 大綱確定
- [x] 可開始撰寫

### 待補充項目

1. **Hermes Agent 的 GitHub star 數來源分歧。** 不同來源差距很大：有報導稱發布七週後約 9.5 萬（TokenMix），GitHub repo 頁面當下顯示約 15.8 萬，任務初始事實提到「三個月內破 14 萬」。撰文時建議寫「截至 2026 年 5 月約 15 萬星（來源數字不一）」，並以官方 GitHub 為準。
2. **Gemini Spark 的採購 guardrail 說法相互矛盾。** Google 一方面稱「設計上會要求使用者確認後才代為採購」，另一方面 onboarding 細則出現「可能未經詢問就採購」。此為「來源分歧」，撰文時務必並陳兩種說法、標明這是爭議點，不要單取一方。
3. **「Gemini Spark 由 Antigravity 打造」措辭。** 多數報導指 Spark 由 Gemini 3.5 Flash + Antigravity harness 驅動；另有來源提及前身代號為「Remy」。代號屬未完全查證資訊，建議文章不採用或標「待查證」。
4. **OpenClaw 即時 star 數。** 官方 repo 當下顯示約 37 萬星，遠高於 3 月的 25 萬，數字成長極快。撰文時引用「3 月初逾 25 萬、超越 React」此一有明確日期的里程碑較穩妥，並可補一句「之後持續攀升」。
5. **部分權威媒體（TechCrunch、blog.google、Android Authority、The Verge）的全文 WebFetch 被擋（HTTP 403），本 memo 內容以 WebSearch 摘要彙整為主。** CLI 端撰文若需逐字引述官方原話，建議再以可用工具核對 blog.google 兩篇官方公告全文。

### 續接建議

- **續接平台：** CLI
- **建議模板：** `templates/article-template.md`（深度分析文章）
- **特別注意：** 主軸務必放 Gemini Spark，OpenClaw 與 Hermes 為對照組，篇幅勿喧賓奪主。遵守 WRITING_GUIDE：用台灣繁體中文用語（軟體、伺服器、資料、使用者、最佳化等）、避免破折號、避免「不是 X 而是 Y」句型、當代人物用英文原名（Sundar Pichai、Peter Steinberger）。安全爭議與「來源分歧」處務必如實標註，不可為求順暢而擇一。
