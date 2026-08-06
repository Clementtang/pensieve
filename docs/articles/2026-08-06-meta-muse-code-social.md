---
title: "Meta 終於下場了：Muse Code 用「持久背景代理」挑戰 Claude Code 與 Codex"
description: "2026 年 8 月 5 日，Meta 正式釋出首款終端機 coding agent Muse Code（beta），搭配 Coding 專精的 Muse Spark 1.2。價格、長時程執行與並行子代理是它想突圍的三張牌；同時別忘了幾個月前為訓練 agent 而錄製員工操作的爭議。"
date: 2026-08-06
author: "Clement Tang"
tags: ["社群貼文", "AI", "Meta", "Coding", "Agent"]
category: articles
status: draft
---

# Meta 終於下場了：Muse Code 用「持久背景代理」挑戰 Claude Code 與 Codex

> 2026 年 8 月 5 日，Mark Zuckerberg 親自在 X 宣布：Meta 的終端機 coding agent Muse Code（beta）正式上線，背後是 Coding 專精模型 Muse Spark 1.2。這是 Meta 正式進入「寫完整功能、跨大型 repo、長時程自主執行」這場戰爭的第一槍。而它背後的資料取得邏輯，也值得對照幾個月前那起「錄下員工操作」的內部風暴。

## 元資料

| 項目         | 內容                              |
| ------------ | --------------------------------- |
| **日期**     | 2026-08-06                        |
| **原始研究** | 本篇為即時新聞整理與觀點            |
| **目標平台** | X / Threads / Facebook / LinkedIn |

---

## 版本 1：完整版（Facebook / LinkedIn / Threads）

**目標字數：** 約 2,000–2,400 字

2026 年 8 月 5 日，科技圈的 coding agent 戰場又多了一位重量級玩家。

Meta 正式釋出 **Muse Code（beta）**，一款跑在終端機的 AI coding agent，由最新的 **Muse Spark 1.2** 驅動。Mark Zuckerberg 在 X 上親自發文，語氣很直白：它能在大型 repo 上完成完整的軟體工程任務，包括規劃變更、撰寫程式碼、驗證結果。

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

### 基準數字：Meta 自己公布的成績單

發布當日，Meta 公開了幾組與 Claude Code、Codex 等配置對照的數字（皆為廠商自測、各自 harness）：

| 基準 | Muse Spark 1.2 + Muse Code | Claude Opus 5（Claude Code） | 其他 |
|------|---------------------------|------------------------------|------|
| Terminal-Bench 2.1 | 82.9% | 86.7% | GPT-5.6 Terra / Codex 約 81.8%；Grok Build 約 81.6% |
| DeepSWE 1.1 | 59.3% | 65.0% | GPT-5.6 Terra 約 64.8% |
| Meta 內部 Coding Bench（約 440 個真實 PR） | 70.6% | 79.4% | 仍領先部分 GPT / Gemini 配置 |

解讀很直接：在 Meta 自己選的對照表上，Claude Opus 5 仍全面領先；Muse 穩居「第二梯隊、有競爭力」的位置。長時程 kernel 優化案例則強調「能跑很久、持續改進」，而不是單次生成的分數。

早期動手試用的評論（例如 VentureBeat 在 Mac mini 上的安裝體驗）指出：一行安裝指令可用，但正式跑任務前仍需登入 Meta 帳號並完成付款設定；也有開發者在拆解 CLI 後認為，現階段若已深度使用 Claude Code 且滿意，切換誘因主要在成本，而非能力領先。

### 價格：標準價與「貢獻者方案」的雙軌

定價策略可能是這次最常被討論的點。

- **標準方案**：每百萬 input token $1.25、output $4.25（與 Muse Spark 1.1 一致），且明確表示不會用這層的資料訓練模型。
- **貢獻者方案（Contributor）**：大幅降價到約 $0.10 / $0.20（input/output），代價是允許 Meta 用你的 prompt 與 completion 訓練未來模型。官方與報導都指出，這比標準方案便宜十倍以上（output 端甚至接近 21 倍）。

安裝後預設會走較便宜的貢獻者方案。對個人開發者與原型實驗，門檻確實低；對有專有程式碼的企業，就必須主動切到標準方案，避免資料被拿去訓練。

Alexandr Wang 在接受媒體訪問時也強調成本優勢：「對很多工作流與使用情境，這會是非常好的選擇，尤其從成本角度來看。」

### 別忘了幾個月前：為訓練 Agent 而錄下員工操作的爭議

把 Muse Code 的「用真實軌跡訓練 agent」講清楚，很難不回頭看 2026 年 4 到 6 月的 **Model Capability Initiative（MCI）**。

當時 Meta 在美國員工的公司筆電上部署監控工具，蒐集鍵盤輸入、滑鼠移動與點擊、螢幕內容等「computer use」資料，目標是訓練能像人類一樣操作軟體的 AI agent。公司強調資料不用於績效考核，並稱有隱私防護；但員工無法在工作筆電上完整退出。超過 1,600 名員工連署反對，內部有工程師公開寫道：被刮取螢幕像是隱私被侵犯，也不想活在「把人當訓練資料開採」的世界。

Zuckerberg 在傳出的內部錄音中辯護：AI 模型要向真正聰明的人學習，而 Meta 員工的平均水準高於一般外包承包商。實務上，員工還反映工具吃流量、耗電，分析也顯示其覆蓋超過 200 個應用與網站，並可能連帶抓到程式碼變更、剪貼簿、瀏覽紀錄等。

6 月，內部安全通知揭露：相關資料橫跨約 45,000 個 hive 資料表，曾對公司內部人員可存取，內容包含完整 prompt、逐字稿、私人對話、人員與績效相關資料。Meta 隨後宣布暫停 MCI 並調查，強調「目前沒有跡象顯示資料被不當存取」，但「員工曾警告過的風險變成現實」已成定局。

這段歷史與 Muse Code 的貢獻者方案並非同一件事：前者是對內部員工的強制級 computer-use 蒐集，後者是對外開發者自願用低價換資料。但邏輯一脈相承——**誰掌握真實的長時程操作與 agent 軌跡，誰就更能訓練下一代 agent**。當產品對外用「便宜換資料」搶市場時，內部曾用「為了贏 AI 競賽而錄員工」的做法，會讓外界更敏感於：資料從哪來、同意是否充分、出事時防護是否真的夠。

### 與 Claude Code、Codex 的定位差異

Meta 顯然不想只靠「再高一點的分數」取勝，而是用：

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

第一，coding agent 的戰場已經從「誰的模型分數最高」擴展到「誰能讓開發者真的敢把長任務丟進去跑、誰能用價格搶到早期使用者與軌跡資料」。

第二，Meta 的策略很清楚：用極低的貢獻者方案快速累積真實 agentic 使用資料，再回頭強化模型與 harness。這與它過去用開源 Llama 換生態的邏輯一脈相承，只是這次改成「用便宜閉源換資料」；而 MCI 事件則提醒：同一家公司在內部也曾為了同類資料，走到強制監控與大規模反彈。

第三，對台灣與亞洲的開發者、新創來說，多一個可負擔、可安裝的選項，短期有助於降低實驗成本；中長期則要評估資料隱私、供應商鎖定，以及「便宜方案背後的訓練授權」是否可接受。

Muse Code 現在才剛進場。真正的考驗不在發布日的 demo，而在接下來三到六個月：真實大型 repo 的穩定性、企業願不願意付標準價、以及它能不能在「長時程自主完成」這件事上，讓開發者產生「敢放手」的信任。

**你怎麼看？價格優先，還是隱私與可控性優先？歡迎留言。**

**建議 Hashtags：** #Meta #MuseCode #AI #CodingAgent #ClaudeCode #Codex #AgenticAI

---

## 版本 2：精簡版（Threads / 較短社群）

**目標字數：** 約 700–900 字

Meta 終於把 coding agent 產品化了。

2026 年 8 月 5 日，Muse Code（beta）上線，由 Muse Spark 1.2 驅動。它不是聊天補程式碼的工具，而是跑在終端機、能規劃、實作、驗證大型 repo 變更的 Agent。

三個設計重點值得記：

1. **持久背景代理**：session 期間一直活著的專門代理，而不是每個任務重新生一個，減少重複探索與人類介入。
2. **可重播 Runtime**：所有動作寫進本地 event log，崩潰後可精確接續，適合長時程任務。
3. **模型與 Agent 共同訓練**：不是通用模型再套 harness，而是一起優化。

Meta 自揭基準上，Terminal-Bench 2.1 約 82.9%（Claude Opus 5 約 86.7%），DeepSWE 與內部 PR bench 同樣落後 Opus 一截，但已進入可競爭區間。價格走雙軌：標準約 $1.25/$4.25，貢獻者便宜十倍以上、允許用資料訓練；安裝預設走後者。

值得對照的是 2026 年 4–6 月的 MCI：Meta 在美國員工筆電上錄製鍵盤、滑鼠與螢幕內容以訓練 computer-use agent，超過 1,600 人連署反對；6 月因內部資料表外洩而暫停。對外用「便宜換軌跡」、對內曾用「強制錄員工」，邏輯同源，只是同意機制不同。

安裝（macOS/Linux）：
`curl -fsSL https://dev.meta.ai/install.sh | bash`

coding agent 的戰爭，從分數競賽進入「誰敢放手、誰付得起、誰敢把資料交出去」的階段。

你會先試哪一個？

#Meta #MuseCode #AI #CodingAgent

---

## 版本 3：極簡版 / X 適用（可拆成 Thread）

**1/6**
Meta 正式進場 coding agent。

8/5 釋出 Muse Code（beta）+ Muse Spark 1.2。
終端機工具，主打大型 repo 的完整工程任務：規劃、寫 code、驗證結果。
Zuckerberg 親自宣布。

**2/6**
核心設計差異：

• 持久非同步背景代理（不是每個任務重開 helper）
• 本地 event log → 崩潰可精確接續
• 模型與 Agent 共同訓練

官方案例：在 Hopper 上優化 GPU kernel，跑 1,000+ 工具呼叫、長達 24 小時仍持續改進。

**3/6**
Meta 自揭基準（廠商自測）：

Terminal-Bench 2.1：82.9%（Claude Opus 5：86.7%）
DeepSWE 1.1：59.3%（Opus 5：65.0%）
內部 PR bench：70.6%（Opus 5：79.4%）

能力居第二梯隊；主打價格與長時程。

**4/6**
定價雙軌：

標準：$1.25 / $4.25（input/output per M tokens）
貢獻者：約 $0.10 / $0.20（便宜 10x+），但允許用你的資料訓練

安裝預設走貢獻者方案。個人實驗便宜，企業要主動切標準方案。

**5/6**
別忘了 2026 年 4–6 月的 MCI：
Meta 在美國員工筆電錄鍵盤／滑鼠／螢幕以訓練 agent，1,600+ 人連署反對；6 月因內部資料外洩而暫停。

對外「便宜換軌跡」、對內曾「強制錄員工」——同一家公司、同一條資料邏輯。

**6/6**
安裝（macOS/Linux）：
curl -fsSL https://dev.meta.ai/install.sh | bash

coding agent 戰場已從「分數」轉成「敢不敢放手、付不付得起、願不願意交資料」。

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
5. [VentureBeat 定價、架構與早期安裝體驗](https://venturebeat.com/orchestration/meta-enters-the-ai-coding-wars-with-muse-spark-1-2-and-muse-code-with-persistent-async-background-agents)
6. [BeInCrypto / Decrypt 等對 Meta 自揭基準的整理](https://beincrypto.com/zuckerberg-muse-code-anthropic-benchmarks/)
7. [WIRED〈Meta Exposed Data Internally From Its Controversial Employee-Tracking Program〉](https://www.wired.com/story/meta-accidentally-let-employees-access-each-others-keystroke-data/)
8. [The Guardian〈Meta pauses employee tracker for AI training amid privacy concerns〉](https://www.theguardian.com/technology/2026/jun/24/meta-pauses-employee-tracker-for-ai-training-amid-privacy-concerns)
9. [Reuters〈Meta to start capturing employee mouse movements, keystrokes for AI training data〉](https://www.reuters.com/sustainability/boards-policy-regulation/meta-start-capturing-employee-mouse-movements-keystrokes-for-ai-training-data-2026-04-21/)
10. Mark Zuckerberg（@finkd）與 AI at Meta（@AIatMeta）2026-08-05 公開貼文

---

_最後更新：2026-08-06_
