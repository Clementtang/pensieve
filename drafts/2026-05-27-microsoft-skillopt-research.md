---
title: "當 AI 開始自己寫筆記：Microsoft SkillOpt 如何讓語言模型的技能像神經網路一樣可訓練"
description: "深入解析 Microsoft 在 2026 年 5 月發布的 SkillOpt 專案，看它如何用一份 Markdown 檔案改寫 LLM agent 技能訓練的遊戲規則，並對照 Voyager、Reflexion、TextGrad、GEPA 等相關研究。"
date: 2026-05-27
author: "Clement Tang"
tags: ["AI", "LLM", "Agent", "Microsoft", "技術解析", "Prompt Engineering"]
category: articles
status: published
---

# 當 AI 開始自己寫筆記：Microsoft SkillOpt 如何讓語言模型的技能像神經網路一樣可訓練

> 2026 年 5 月，Microsoft Research 釋出 SkillOpt，一個能像訓練神經網路那樣訓練 AI agent「技能文件」的開源工具。它不動模型權重，卻在 52 項評測中拿下 52 勝。

## 元資料

| 項目         | 內容                                                  |
| ------------ | ----------------------------------------------------- |
| **建立日期** | 2026-05-27                                            |
| **更新日期** | 2026-05-27                                            |
| **標籤**     | #AI #LLM #Agent #Microsoft #技術解析 #PromptEngineering |
| **狀態**     | 草稿                                                  |
| **字數**     | 約 3200 字                                            |

---

## The Big Picture

2026 年 5 月 22 日，Microsoft Research 在 GitHub 上靜悄悄地推出一個名為 SkillOpt 的開源專案。短短幾天，這個 repo 累積超過一千顆星。它不像 GPT-5.5 那樣是個更大的模型，也不像 Claude Code 那樣是個能寫程式的助理，它要解決的是一個更底層、卻長期沒被好好處理的問題：當我們用同一個大型語言模型（LLM, Large Language Model）面對不同任務時，到底該怎麼「教」它變得更厲害？

過去兩年，業界對這個問題的答案大概可以分成兩派。一派主張「微調」（fine-tuning），用任務資料重新訓練模型權重；另一派主張「提示工程」（prompt engineering），靠資深工程師手寫 prompt，反覆試錯。前者昂貴，動輒上萬筆資料、數張 GPU、好幾天的訓練時間；後者便宜，但全靠經驗，難以系統化、難以驗證、難以擴大規模。

SkillOpt 提出第三條路。它把模型權重「凍結」（frozen），改去訓練一份名為 `best_skill.md` 的 Markdown 檔案。沒錯，就是一份你我都看得懂、改得動的純文字檔。這份檔案會記錄做特定任務該注意什麼、該用什麼工具、怎麼驗證答案，然後 SkillOpt 用一套類似神經網路訓練的迴圈（epoch、batch size、learning rate、validation gate）持續對它進行最佳化。當訓練結束，你拿到的是一份幾百字到幾千字、人類可讀、可審計、可在不同模型之間搬移的「技能說明書」，而不是模型權重。

這件事的意義超越單一專案。當 Anthropic 的 Claude Code、OpenAI 的 Codex 都開始支援「agent skills」這種以文件形式存在的能力包，誰能系統化地產出最好的 skill 檔案，誰就掌握了下一波 AI agent 的競爭優勢。

---

## Why It Matters

對資工系、資管系，或對 AI 有興趣的學生而言，SkillOpt 之所以值得認識，是因為它示範了一種正在崛起的工程典範：把自然語言當作可最佳化的程式。

從應用角度看，這代表一件事：未來你不必擁有訓練 GPT-5.5 的資源，也能讓它在你的任務上贏過業界最強的對手。你只需要一份好的 skill 文件，加上一台能跑 API 的筆電。實驗結果顯示，把 SkillOpt 訓練出來的 skill 套用在 GPT-5.5 上，直接聊天模式可以把平均準確率拉高 23.5 個百分點，在 Codex agentic loop 中提升 24.8 個百分點，在 Claude Code 中也有 19.1 個百分點的進步。這幾乎是過去你需要一支研究團隊微調模型才能做到的事。

從學習角度看，SkillOpt 把幾個原本散落在不同論文裡的概念（Voyager 的 skill library、Reflexion 的口語強化學習、TextGrad 的文字梯度、GEPA 的反思式提示演化）整合成一個可重複、可驗證的訓練流程。讀懂它，等於同時讀懂 LLM agent 領域過去三年的主要進展。

而從產業角度看，當「技能文件」變成可訓練、可交易的資產，AI 公司的競爭重心也會跟著移動。誰擁有最好的 skill 庫，誰就能在不換模型的情況下持續提升服務品質。這對台灣的軟體公司是個好消息：你不需要打造下一個 OpenAI，但你可以為自己的垂直領域打造世界級的 skill 檔案。

---

## 主要內容

### 一切從一個簡單的問題開始：什麼是 agent skill

要理解 SkillOpt，得先理解「agent skill」這個概念。

過去幾年我們熟悉的 LLM 應用，大致是這樣的模式：使用者輸入一段 prompt，模型回一段答案。但 2024 年之後，AI 開始進入 agent 時代。所謂 agent，是指能自主執行多步任務的程式，它會呼叫工具（搜尋網頁、執行程式碼、讀寫檔案）、觀察結果、再決定下一步該怎麼做。Claude Code、OpenAI Codex、Microsoft Copilot 都是這類 agent 的代表。

當 agent 要面對複雜任務（譬如「幫我審 100 行 Python 程式碼」或「從一份財報 PDF 抽出關鍵指標」），單一 prompt 已經不夠用了。它需要一套流程：先做什麼、再做什麼、遇到 X 情況怎麼辦、輸出格式長什麼樣。Anthropic 在 2025 年提出 agent skills 的概念，把這套流程寫成一份 Markdown 檔，放在特定資料夾裡。當 agent 接到任務，它會先讀這份 skill 檔，再開始動作。

問題來了：誰來寫這份 skill 檔？目前的答案大多是「資深工程師手寫」，或者「丟給 LLM 一次生成」。前者耗時，後者品質不穩。SkillOpt 把問題重新定義為：既然 skill 檔本身就是一段文字，那它能不能被「訓練」？

### SkillOpt 的核心比喻：把神經網路的訓練語言搬到文字空間

SkillOpt 的設計靈感，來自深度學習的訓練迴圈。任何修過機器學習課的人都會背：神經網路的訓練包含 forward pass（前向傳播）、loss computation（計算損失）、backward pass（反向傳播）、parameter update（參數更新），整個過程要跑很多 epoch（訓練輪數），每次取一個 mini-batch（小批次資料），用 learning rate（學習率）控制更新幅度，並用 validation set（驗證集）防止過擬合。

SkillOpt 把這套詞彙整套搬到自然語言上。每一輪訓練，它讓「目標模型」（target model，譬如 GPT-5.5）拿著當前版本的 skill 檔，去執行一批任務（這對應於 forward pass）。執行過程會留下完整的軌跡（trajectory）：模型講了什麼、呼叫了什麼工具、得到什麼回應、最終分數多少。接著，一個獨立的「最佳化模型」（optimizer model，通常是另一個強力 LLM）會閱讀這些軌跡，反思失敗的原因，這個反思過程就像 backward pass，作者稱之為「語言層級的反向傳播」。

最佳化模型不會直接重寫整份 skill，而是提出有限度的「增、刪、改」編輯，每一輪只能動幾段，這就是 SkillOpt 的「文字學習率」（textual learning rate）。如果學習率太大，文件會在每一輪劇烈變動，學到的東西很容易失去；學習率太小，進步又太慢。

最關鍵的設計叫做「validation gate」（驗證閘）。每一筆編輯送進來時，SkillOpt 會把新版 skill 拿到驗證集上跑一次，只有當驗證分數嚴格優於上一版時，這筆編輯才會被接受；否則就丟回「拒絕編輯緩衝區」（rejected-edit buffer），留作下次反思的負例。這個機制直接對應神經網路訓練中的 early stopping 與正則化，目的是避免技能文件「死記」訓練資料、卻在沒看過的任務上崩盤。

這個比喻聽起來很巧妙，但它真正了不起的地方是：所有的最佳化都發生在文字層，沒有任何梯度、沒有任何模型權重被更新。當訓練完成，剩下的只是一份幾百字到幾千字的 Markdown 檔，任何人類工程師都看得懂，也可以手動微調。

### 那份 best_skill.md 長什麼樣

SkillOpt 訓練的最終產物，叫做 `best_skill.md`，這是整個訓練過程中驗證分數最高的版本。重要的是，這份檔案不會無限膨脹，它會被限制在幾百字到幾千字之間，方便人類在幾分鐘內審閱。

實際內容通常包含：任務的核心目標、解題的步驟流程、何時該呼叫哪個工具、驗證答案的標準、常見錯誤與如何避免。一份好的 skill 檔案，讀起來像是某個資深前輩寫給新人的工作手冊。

部署時更簡單：把這份 `.md` 檔丟進 Claude Code 的 `~/.claude/skills/` 資料夾，或者放進 Codex 專案的特定路徑，agent 就會在執行任務時自動參考它。不需要重新部署模型、不增加任何推論成本。

這就是 SkillOpt 在 GitHub README 上自豪宣稱的那句話：「在部署時零額外推論呼叫」（zero inference-time model calls at deployment）。

### 實驗結果：52 比 0 的全面勝利

SkillOpt 團隊用了一套相當嚴謹的評測。六個 benchmark（SearchQA、ALFWorld、DocVQA、LiveMathematicianBench、SpreadsheetBench、OfficeQA），七個目標模型，三種執行環境（直接聊天、Codex agentic loop、Claude Code），總共構成 52 個「模型 × 評測 × 環境」的格子。

對手陣容也很豪華：人類手寫的 skill、用 LLM 一次性生成的 skill，加上四個學界已知的最佳化方法：Trace2Skill（從軌跡挖經驗）、TextGrad（用文字梯度最佳化）、GEPA（反思式遺傳演化）、EvoSkill（演化式 skill 最佳化）。

結果是 SkillOpt 在所有 52 格都取得最佳或並列最佳的成績。平均而言，它比最強的基線方法還多出 5.4 個百分點。在 GPT-5.5 上，直接聊天的準確率從沒有 skill 的基準提升了 23.5 個百分點，套上 Codex 提升 24.8 個百分點，套上 Claude Code 提升 19.1 個百分點。

這幾乎是教科書等級的「乾淨勝利」。

### 站在巨人的肩膀上：四個必須認識的前輩

要客觀理解 SkillOpt 的貢獻，得把它放回過去三年 LLM agent 研究的脈絡裡。它並非橫空出世，而是站在好幾個重要先驅之上。

**Voyager（2023，NVIDIA 與加州理工）** 是第一個 LLM 驅動的「終身學習」agent。它在 Minecraft 裡靠 GPT-4 自我探索，建立一個會不斷成長的「技能庫」（skill library），每個技能是一段可執行的 JavaScript 程式碼。Voyager 強調技能的「組合性」（compositional），複雜技能可以由簡單技能拼起來。它與 SkillOpt 的最大差異在於：Voyager 的技能是「程式碼」，是給特定環境用的工具；SkillOpt 的技能是「文件」，是給語言模型參考的操作指引。Voyager 強的是探索與累積，SkillOpt 強的是收斂與驗證。

**Reflexion（2023，東北大學）** 提出了「口語強化學習」（verbal reinforcement learning）的概念。agent 嘗試一個任務、失敗了、用自然語言寫下反省，下一輪把反省加進 context 重試。Reflexion 是 SkillOpt 反思機制的直接前身。差別在於 Reflexion 的反省只存在於單次 episode 的記憶裡，沒有持久化的 skill 檔案，也沒有驗證閘來篩選哪些反省值得保留。SkillOpt 等於把 Reflexion 的口語反省工程化、可累積化、可審計化。

**TextGrad（2024，Stanford）** 把 PyTorch 的 autograd 概念搬到文字空間，提出「文字梯度」（textual gradient）。它讓 LLM 互相問「這個輸入該怎麼改才能讓輸出變好」，產生自然語言形式的「梯度訊號」，去最佳化 prompt、程式碼、甚至分子結構。TextGrad 是 SkillOpt 反向傳播比喻的理論基礎。SkillOpt 借用了 TextGrad 的思路，但聚焦在一個更具體的工件（skill 文件）上，並加上 validation gate 這個防呆機制。

**GEPA（2025，將在 ICLR 2026 口頭發表）** 結合反思式提示演化與 Pareto 前沿選擇，在某些任務上甚至超越強化學習（RL）。它用 400 到 1200 次 rollout 就達到 RL 需要 24000 次以上的效果，大幅降低訓練成本。GEPA 與 SkillOpt 共享反思式最佳化的精神，但 GEPA 最佳化的是 prompt 程式裡的多個模組，SkillOpt 則專注於單一的 skill 文件並加上學習率與拒絕緩衝區。

除了學術界，業界也有相關的工具。Stanford 的 **DSPy**（2023）讓開發者用 Python 程式碼定義 LLM 流程，框架會自動最佳化提示。**Agent Workflow Memory**（2024）則讓 agent 從過去的執行軌跡中提煉可重複使用的工作流程記憶。Microsoft 自家的 **AutoGen** 是多 agent 對話框架，正逐步併入 Microsoft Agent Framework。

把這些放在一起看，SkillOpt 的位置很清楚：它是把多條線索整合成一個「工程化、可驗證、零部署成本」的完整方案，而非開創某個全新方向。這正是業界產品團隊最需要的那種研究成果。

### 一個值得記住的金句

如果要用一句話概括 SkillOpt 的精神，我會說：當神經網路的時代教我們訓練權重，agent 的時代要教我們訓練文件。

當「技能」變成可訓練、可版本控制、可在不同模型之間轉移的純文字檔，AI 的工程化路徑就被重新打開了。你不再需要 H100 集群，你需要的是一個會反思的最佳化模型，加上一套設計良好的驗證指標。

---

## What's Next

SkillOpt 開了一扇門，但門後還有許多沒被回答的問題。

第一個問題是「skill 的可組合性」。目前 SkillOpt 訓練的是單一 skill 檔，但真實任務常常需要多個 skill 協作（譬如「先做網頁搜尋、再寫程式分析」）。Voyager 那種把多個技能組合起來的能力，還沒被 SkillOpt 完全納入。

第二個問題是「跨模型遷移」。實驗顯示 SkillOpt 訓練出的 skill 在不同模型之間有不錯的遷移性，但這個遷移性有沒有極限？當 GPT-5.5 訓練出的 skill 搬到 GPT-6 或 Claude 5 上，會不會仍然有效？這對企業導入是關鍵。

第三個問題是「最佳化模型本身的成本」。SkillOpt 的訓練過程仰賴一個強力的 optimizer model 來生成編輯，這個模型本身要花錢呼叫 API。當 skill 訓練變成像跑 RL 那樣大規模時，這筆帳會怎麼算？

**值得關注的發展：**

- Claude Code、Codex 等主流 agent 平台是否會把 SkillOpt 整合進工作流程
- 學界與業界是否會出現針對特定領域（醫療、法律、金融）的「skill 市集」
- SkillOpt 的方法論能不能擴展到多模態 agent（視覺、語音）的技能訓練
- Microsoft 是否會把 SkillOpt 整合進 Copilot 產品線，或併入 Microsoft Agent Framework

**給讀者的建議：**

- 如果你是學生，動手 clone 一份 SkillOpt 跑跑看，這是理解 agent 訓練最快的方式
- 如果你寫過 prompt，試著把你最常用的 prompt 寫成 skill 檔，再用 SkillOpt 訓練看看會不會被改進
- 關注 GEPA、DSPy 等相關專案，理解「文字空間最佳化」這個正在成形的新典範
- 思考自己的工作中有哪些「流程性知識」可以被寫成 skill 檔案，這可能是未來最有價值的個人資產

---

## 參考資料

- [microsoft/SkillOpt GitHub Repository](https://github.com/microsoft/SkillOpt) - SkillOpt 官方 repo 與 README
- [SkillOpt Project Page](https://microsoft.github.io/SkillOpt/) - Microsoft 官方專案頁面
- [SkillOpt: Executive Strategy for Self-Evolving Agent Skills (arXiv:2605.23904)](https://arxiv.org/abs/2605.23904) - SkillOpt 論文（Yifan Yang 等，2026）
- [Microsoft SkillOpt 52 Out of 52 Wins 分析](https://pasqualepillitteri.it/en/news/3452/skillopt-microsoft-text-space-optimizer-agent-skills-en) - 第三方技術解析
- [Voyager: An Open-Ended Embodied Agent (arXiv:2305.16291)](https://arxiv.org/abs/2305.16291) - NVIDIA 的 Minecraft skill library 經典論文
- [Reflexion: Language Agents with Verbal Reinforcement Learning (arXiv:2303.11366)](https://arxiv.org/abs/2303.11366) - 口語強化學習開創之作
- [TextGrad: Automatic Differentiation via Text (arXiv:2406.07496)](https://arxiv.org/abs/2406.07496) - Stanford 的文字梯度框架
- [GEPA: Reflective Prompt Evolution (arXiv:2507.19457)](https://arxiv.org/abs/2507.19457) - 反思式提示演化，ICLR 2026 口頭論文
- [Agent Workflow Memory (arXiv:2409.07429)](https://arxiv.org/abs/2409.07429) - LLM agent 工作流程記憶研究
- [DSPy: Stanford NLP 的 LLM 程式化框架](https://github.com/stanfordnlp/dspy) - 程式而非提示的 LLM 框架
- [Anthropic Agent Skills 官方介紹](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) - Claude 平台的 agent skills 設計

---

_最後更新：2026-05-27_
