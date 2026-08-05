---
title: "Meta 終於下場了：Muse Code 用「持久背景代理」挑戰 Claude Code 與 Codex"
description: "2026 年 8 月 5 日，Meta 正式釋出首款終端機編碼 Agent Muse Code（beta），搭配編碼專精的 Muse Spark 1.2。價格、長時程執行與並行子代理，是它想突圍的三張牌。"
date: 2026-08-06
author: "Clement Tang"
tags: ["社群貼文", "AI", "Meta", "編碼", "Agent"]
category: articles
status: draft
---

# Meta 終於下場了：Muse Code 用「持久背景代理」挑戰 Claude Code 與 Codex

> 2026 年 8 月 5 日，Mark Zuckerberg 親自在 X 宣布：Meta 的終端機編碼 Agent Muse Code（beta）正式上線，背後是編碼專精模型 Muse Spark 1.2。這是 Meta 正式進入「寫完整功能、跨大型 repo、長時程自主執行」這場戰爭的第一槍。

## 元資料

| 項目         | 內容                              |
| ------------ | --------------------------------- |
| **日期**     | 2026-08-06                        |
| **原始研究** | 本篇為即時新聞整理與觀點            |
| **目標平台** | X / Threads / Facebook / LinkedIn |

---

## 版本 1：完整版（Facebook / LinkedIn / Threads）

**目標字數：** 約 1,800–2,200 字

2026 年 8 月 5 日，科技圈的編碼 Agent 戰場又多了一位重量級玩家。

Meta 正式釋出 **Muse Code（beta）**，一款跑在終端機的 AI 編碼代理，由最新的 **Muse Spark 1.2** 驅動。Mark Zuckerberg 在 X 上親自發文，語氣很直白：它能在大型 repo 上完成完整的軟體工程任務，包括規劃變更、撰寫程式碼、驗證結果。

這不是「幫你補幾行程式碼」的聊天助手，而是被定位成能獨立扛長時程、多步驟工程任務的 Agent。

### 為什麼這次值得注意？

過去一年，Anthropic 的 Claude Code 與 OpenAI 的 Codex 幾乎定義了「終端機裡的 AI 工程師」這個品類。Meta 在模型層面一直有 Llama 的開源影響力，但在「可安裝、可付費、可長期跑」的封閉 Agent 產品上，相對慢半拍。這次 Muse Code 的釋出，等於正式宣示：Meta Superintelligence Labs（由 Alexandr Wang 領軍）要把產品化腳步加快。

官方部落格與 Zuckerberg 的說明，反覆強調幾個設計選擇：

**1. 持久的非同步背景代理（Async Background Agents）**

多數競爭產品是「每個任務再生一個 helper」。Muse Code 的做法不同：它在整個 session 期間維持一組專門的背景代理持續運作。這些代理會主動蒐集資訊、推進下一步，再把結果回傳給主代理。官方宣稱這能降低延遲、減少重複探索，也讓多步驟任務比較不需要人類一直盯著「接下來該怎麼做」。

**2. 可重播、可重啟的 Runtime**

每一次模型呼叫、工具執行、核准與編輯，都會寫進本地的 event log。這個 log 被當成單一真相來源。系統如果中途崩潰，Agent 可以從 log 精確接續，而不是從頭再來。對於可能跑上數小時甚至一整天的任務，這不是小細節，而是「能不能真的放手讓它跑」的前提。

**3. 模型與 Agent 一起訓練**

Muse Spark 1.2 不是「通用模型再套一層 harness」。Meta 明確說它與 Muse Code 共同訓練（co-trained），用 rejection sampling 的 harness 軌跡、目標條件化、context compaction 與子代理工具集一起優化。目的很單純：讓模型在搭配自家 Agent 時表現最好。

官方還展示了一個相當硬核的案例：把 Muse Spark 1.2 丟去優化 NVIDIA Hopper 上的 GPU kernel（KDA 與 MLA），讓它在禁止直接 import 特定第三方庫的前提下，自行迭代超過 1,000 次工具呼叫，跑了長達 24 小時，仍持續找到比基準實作更好的結果。

### 價格：標準價與「貢獻者方案」的雙軌

定價策略可能是這次最常被討論的點。

- **標準方案**：每百萬 input token $1.25、output $4.25（與 Muse Spark 1.1 一致），且明確表示不會用這層的資料訓練模型。
- **貢獻者方案（Contributor）**：大幅降價到約 $0.10 / $0.20（input/output），代價是允許 Meta 用你的 prompt 與 completion 訓練未來模型。官方與報導都指出，這比標準方案便宜十倍以上。

安裝後預設會走較便宜的貢獻者方案。對個人開發者與原型實驗，門檻確實低；對有專有程式碼的企業，就必須主動切到標準方案，避免資料被拿去訓練。

Alexandr Wang 在接受媒體訪問時也強調成本優勢：「對很多工作流與使用情境，這會是非常好的選擇，尤其從成本角度來看。」

### 與 Claude Code、Codex 的定位差異

目前公開的第三方基準（如 Terminal-Bench、DeepSWE）顯示，Muse Spark 1.2 + Muse Code 仍略落後 Claude Opus 系列與部分 GPT 配置，但已進入同一競爭區間。Meta 顯然不想只靠「再高一點的分數」取勝，而是用：

- 較積極的價格（尤其貢獻者方案）
- 長時程、可重啟的 runtime
- 並行子代理與隔離 worktree（Zuckerberg 提到測試中曾同時為一款遊戲開發六個功能，互不碰撞）

來創造差異。

安裝方式也很直接（macOS / Linux）：

```bash
curl -fsSL https://dev.meta.ai/install.sh | bash
```

目前仍是 beta，沒有獨立桌面 App，主打終端機體驗。

### 這代表什麼？

第一，編碼 Agent 的戰場已經從「誰的模型分數最高」擴展到「誰能讓開發者真的敢把長任務丟進去跑、誰能用價格搶到早期使用者與軌跡資料」。

第二，Meta 的策略很清楚：用極低的貢獻者方案快速累積真實 agentic 使用資料，再回頭強化模型與 harness。這與它過去用開源 Llama 換生態的邏輯一脈相承，只是這次改成「用便宜閉源換資料」。

第三，對台灣與亞洲的開發者、新創來說，多一個可負擔、可安裝的選項，短期有助於降低實驗成本；中長期則要評估資料隱私與供應商鎖定的風險。

Muse Code 現在才剛進場。真正的考驗不在發布日的 demo，而在接下來三到六個月：真實大型 repo 的穩定性、企業願不願意付標準價、以及它能不能在「長時程自主完成」這件事上，讓開發者產生「敢放手」的信任。

**你怎麼看？價格優先，還是隱私與可控性優先？歡迎留言。**

**建議 Hashtags：** #Meta #MuseCode #AI #CodingAgent #ClaudeCode #Codex #AgenticAI

---

## 版本 2：精簡版（Threads / 較短社群）

**目標字數：** 約 600–800 字

Meta 終於把編碼 Agent 產品化了。

2026 年 8 月 5 日，Muse Code（beta）上線，由 Muse Spark 1.2 驅動。它不是聊天補程式碼的工具，而是跑在終端機、能規劃、實作、驗證大型 repo 變更的 Agent。

三個設計重點值得記：

1. **持久背景代理**：session 期間一直活著的專門代理，而不是每個任務重新生一個，減少重複探索與人類介入。
2. **可重播 Runtime**：所有動作寫進本地 event log，崩潰後可精確接續，適合長時程任務。
3. **模型與 Agent 共同訓練**：不是通用模型再套 harness，而是一起優化。

價格走雙軌：標準方案約 $1.25/$4.25（input/output per M tokens），貢獻者方案便宜十倍以上，但允許用資料訓練。安裝預設走後者。

目前仍落後 Claude Code 與部分 Codex 配置一截，但 Meta 用價格與長時程執行能力切入。對個人開發者門檻低，對企業則要先想清楚資料要不要被拿去訓練。

安裝（macOS/Linux）：
`curl -fsSL https://dev.meta.ai/install.sh | bash`

編碼 Agent 的戰爭，從分數競賽進入「誰敢放手、誰付得起、誰敢把資料交出去」的階段。

你會先試哪一個？

#Meta #MuseCode #AI #CodingAgent

---

## 版本 3：極簡版 / X 適用（可拆成 Thread）

**目標字數：** 單則建議控制在可讀長度；以下提供可直接貼的 Thread 結構。

**1/5**
Meta 正式進場編碼 Agent。

8/5 釋出 Muse Code（beta）+ Muse Spark 1.2。
終端機工具，主打大型 repo 的完整工程任務：規劃、寫 code、驗證結果。
Zuckerberg 親自宣布。

**2/5**
核心設計差異：

• 持久非同步背景代理（不是每個任務重開 helper）
• 本地 event log → 崩潰可精確接續
• 模型與 Agent 共同訓練

官方案例：在 Hopper 上優化 GPU kernel，跑 1,000+ 工具呼叫、長達 24 小時仍持續改進。

**3/5**
定價雙軌：

標準：$1.25 / $4.25（input/output per M tokens）
貢獻者：約 $0.10 / $0.20（便宜 10x+），但允許用你的資料訓練

安裝預設走貢獻者方案。個人實驗便宜，企業要主動切標準方案。

**4/5**
目前基準仍略落後 Claude Code / 部分 Codex，但 Meta 用「價格 + 長時程可重啟」搶市場與軌跡資料。

策略很清楚：先用低價換真實 agentic 使用資料，再回頭強化模型。

**5/5**
安裝（macOS/Linux）：
curl -fsSL https://dev.meta.ai/install.sh | bash

編碼 Agent 戰場已從「分數」轉成「敢不敢放手、付不付得起、願不願意交資料」。

你會先試 Muse Code，還是繼續 Claude Code / Codex？

#Meta #MuseCode #AI

---

## 發布指南

### 最佳發布時間

| 平台     | 建議時段            |
| -------- | ------------------- |
| X        | 週一至週五 9-12 時  |
| Threads  | 週一至週五 12-14 時 |
| Facebook | 週三至週五 12-15 時 |
| LinkedIn | 週二至週四 8-10 時  |

### 搭配素材建議

- 官方安裝指令截圖或 Zuckerberg 原推截圖
- 官方 blog 連結：https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2
- 安裝頁：https://dev.meta.ai

### 互動設計

- **結尾問題**：你會先試 Muse Code，還是繼續 Claude Code / Codex？價格優先還是隱私優先？
- **行動呼籲**：歡迎留言分享實際試用感受或顧慮。

---

## 參考資料

1. [Meta AI Research〈Introducing Muse Code and Muse Spark 1.2〉](https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1-2)
2. [Reuters〈Meta launches new AI coding tool powered by Muse Spark 1.2〉](https://www.reuters.com/technology/meta-launches-new-ai-coding-tool-powered-by-muse-spark-12-2026-08-05/)
3. [TechCrunch〈Meta launches Muse Code, an AI agent for large code bases〉](https://techcrunch.com/2026/08/05/meta-launches-muse-code-an-ai-agent-for-large-code-bases/)
4. [CNBC〈Meta debuts Muse Code to take on Anthropic and OpenAI〉](https://www.cnbc.com/2026/08/05/meta-debuts-muse-code-to-take-on-anthropic-and-openai-.html)
5. [VentureBeat 定價與架構說明](https://venturebeat.com/orchestration/meta-enters-the-ai-coding-wars-with-muse-spark-1-2-and-muse-code-with-persistent-async-background-agents)
6. Mark Zuckerberg（@finkd）與 AI at Meta（@AIatMeta）2026-08-05 公開貼文

---

_最後更新：2026-08-06_
