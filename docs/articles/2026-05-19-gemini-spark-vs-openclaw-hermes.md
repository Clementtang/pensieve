---
title: "Gemini Spark 是什麼？Google 24/7 AI Agent 與 OpenClaw、Hermes 路線之爭"
description: "Google 在 I/O 2026 發布個人 AI agent Gemini Spark，主打雲端 24/7 自主執行、深度整合 Gmail 與 Workspace。Spark 和爆紅的開源 agent OpenClaw、Hermes Agent 各有什麼能耐？一次看懂 2026 AI agent 之年封閉託管與開源自架的路線之爭。"
date: 2026-05-19
author: "Clement Tang"
tags: ["Google", "Gemini", "AI Agent", "OpenClaw", "AI", "競爭分析"]
category: articles
status: published
---

# Gemini Spark 是什麼？Google 24/7 AI Agent 與 OpenClaw、Hermes 路線之爭

> Google 在 I/O 2026 發布的 Gemini Spark，是一個跑在雲端、24 小時替你打理數位生活的個人 AI agent。它和今年爆紅的開源 agent OpenClaw、Hermes 走的是兩條截然不同的路。

2026 年 5 月 19 日，加州山景城。Sundar Pichai 在 Google I/O 開場 keynote 講到一半，把節奏停了下來。

「我們在 Gemini app 裡放了一個新東西。」他說。

接著，舞台螢幕上亮出一行字「Gemini Spark」。

Google 把它定位為「你在 Gemini app 裡的個人 AI agent」，幫你打理數位生活、在你的指示下代為行動。和過去十幾個月大家熟悉的聊天機器人不同，Spark 跑在 Google Cloud 的專屬虛擬機上，全天候 24/7 運作。你關掉筆電、鎖上手機，它都還在背景替你跑任務。

這個發布之所以重要，是因為它把 AI agent 從一個技術名詞，變成了 9 億 Gemini 月活使用者隨手可得的產品。

但同一時間，開源世界裡兩個爆紅的 agent 也正在重新定義使用者期待什麼樣的 AI 助理。一個叫 OpenClaw，今年 1 月底發布，幾週內就把 GitHub star 衝上 25 萬，超越 React 成為史上最受歡迎的開源專案。另一個叫 Hermes Agent，由 Nous Research 推出，靠著「會自我進化」的學習迴圈，5 月 10 日把 OpenRouter 每日 token 用量推上 2,240 億，超過 OpenClaw 登頂全球第一。

當科技巨頭用分發通路把 agent 直接塞進數十億人手中，當開源社群用透明與本機掌控提供另一條路，AI agent 之年的路線之爭，從今天正式開打。

## Gemini Spark 是什麼

Gemini Spark 是 Google 在 Gemini app 內建的個人 AI agent，由 Gemini 3.5 Flash 加上 Google 自家的 Antigravity harness 驅動，跑在 Google Cloud 的專屬虛擬機（dedicated VM）上。它的設計目標是執行「長時程任務」（long-horizon tasks），可以連續工作幾分鐘、幾小時甚至更久，不需要使用者一直盯著螢幕。

這幾項技術細節背後的意涵，比規格表上的數字更值得細看，因為它們決定了 Spark 究竟是「升級版聊天機器人」還是真正意義上的 agent。

第一，跑在專屬 VM 上代表 Spark 有自己的雲端執行環境，包含瀏覽器、檔案系統、程式執行 sandbox。它真的能上網、能填表單、能執行程式碼，不只是聊天。

第二，24/7 在雲端意味著手機關機、筆電合上，Spark 還在做事。你可以早上在手機上交辦任務，下午在筆電打開時看結果。任務本身會跨裝置接續，不會被中斷。

第三，由 Gemini 3.5 Flash 而非 Pro 驅動，揭露了 Google 的成本與延遲考量。Flash 模型每百萬 token 的價格落在 1.5 至 9 美元、輸出速度比同級前沿模型快 4 倍。讓 agent 用得起、跑得動，比模型分數高一兩分更重要。

Google 在官方說明把 Spark 形容為「3.5 模型與 Antigravity 共同造就的第一個體驗」。換句話說，Spark 不只是一個產品，更像是 Google 接下來把 agent 能力外掛到所有既有產品的範本。

## Spark 能做什麼：三個官方示範任務

Google 在 keynote 給的三個示範，剛好對應現代人最容易卡關的三類雜事。

第一個示範場景是財務雜訊管理，Spark 會自動解析你每個月的信用卡帳單，找出隱藏費用、忘記取消的訂閱、價格偷漲的服務。對於信箱裡躺著二十幾個 SaaS 訂閱通知的中產家庭來說，這個功能省下的不只是錢。

第二個示範場景是家庭資訊統整，Spark 可以監控小孩學校的信件，找出截止日期、活動通知、需要回覆的事項，每天產生一份摘要報告，自動傳給你和另一半。家長最痛的「漏看通知單」問題，被外包給了 AI。

第三個示範場景是工作場景跨工具彙整，Spark 能把跨信件、聊天訊息、行事曆裡的會議脈絡，自動整理成一份 Google Docs，並幫你起草下一封後續 email。這個示範直接踩進了 Notion AI、Glean、Mem 的地盤。

整合面，Spark 一開始就支援 Workspace 全家桶（Gmail、Docs、Slides），並透過 MCP 協定接上 Canva、OpenTable、Instacart 等第三方服務。今年夏天，Spark 會直接整合進 Chrome，扮演「agentic browser」的角色，並推出獨立的 Mac app。

可用性方面，本週先給 trusted testers，下週進 beta 給美國的 Google AI Ultra 訂閱者。Google 同步調整了 AI 訂閱方案，AI Ultra 從原本每月 250 美元降到 200 美元，並新增一個 100 美元的開發者方案。Google 這次很明顯地把 Spark 當成綁定高價訂閱的錨點功能，希望用 agent 把使用者從免費層次拉進付費生態。

## Google 真正的武器：分發通路

要理解 Spark 為什麼是個威脅，得先理解 Google 在 AI 戰場真正的籌碼，而那個籌碼正是通路。

Gemini app 月活已達 9 億，AI Overviews 觸及 25 億搜尋使用者，Chrome、Android、Workspace 各自坐擁數十億規模的安裝基底。Google 不需要說服你下載一個新 app、註冊一個新帳號、學一套新介面。Spark 直接出現在你已經每天打開的 Gmail 側邊欄、Chrome 工具列、Gemini 手機 app 裡。

[我在年初分析 Gmail 導入 Gemini AI 的時候就提過](./2026-01-08-gmail-gemini-ai-platform-competition.md)，Google 真正在做的事，是用通路碾壓所有「寄生在它平台上」的服務。Spark 把這個邏輯從功能層級推到了 agent 層級。

對比一下開源 agent 的處境就清楚了。OpenClaw 今年 1 月底發布，社群口耳相傳，需要使用者願意自己跑 Docker、配 API key、設定通訊軟體 webhook。Hermes Agent 雖然爆紅，但要使用者租一台 VPS、會基本的 server 操作。這些步驟對開發者來說是日常，對 9 億 Gemini 使用者裡的絕大多數來說，是過不了的門檻。

Google 用通路把這個門檻一次拆光。Spark 的使用者不需要懂任何技術，只要訂閱 AI Ultra，打開 Gemini app，agent 就在那裡。

這場仗的勝負，不見得取決於 Spark 的能力是不是世界最強。在分發通路的優勢面前，「夠好就好」往往比「最強」更可怕。

## 風險的另一面：當 agent 開始動你的帳單

把一個 24/7 雲端 agent 接到你的信箱、行事曆、瀏覽器、信用卡，這件事的潛在隱憂不需要太多想像力就能看見。Google 自己也很清楚。

Spark 的 onboarding 細則就出現了一段相當顯眼的措辭。根據媒體在 beta 畫面截到的內容，Google 主動提醒使用者：「Gemini Spark 可能會做出像是分享你的資訊、或未經詢問就採購之類的事。」緊接著補上一段：「請務必監督 Gemini Spark，不要倚賴它提供醫療、法律、財務或其他專業協助。」

VentureBeat 形容這段警語是「Google 在消費性 AI 產品上發出過最大聲的警告」。

有意思的是，Google 在官方說明裡又強調 Spark 在採購類動作上「設計上會要求使用者確認」。兩種說法擺在一起，外界很難不感到困惑。實際上線後 guardrail 怎麼運作，恐怕得等使用者真的拿到 Spark、跑出第一筆爭議案例才會清楚。

更隱性的風險來自資料留存。Spark 會記錄遠端瀏覽器 session 的狀態，包含登入資訊、程式執行結果。如果你授權它去查銀行餘額，那次 session 的狀態會留在 Google 雲端，未來可以從 Gemini 設定裡查看與刪除。便利的代價，是你的數位足跡又多了一個對 Google 透明的層級。

技術圈最擔心的，是 indirect prompt injection（間接提示注入）。Spark 替你讀信、開網頁、執行任務時，攻擊者可以在一封郵件、一個網頁、一份文件裡藏入指令，騙 agent 把錢轉走、把資料外洩。Google DeepMind 為此公開了 defense-in-depth 策略，包含 Agent Gateway、DLP（資料外洩防護）、模型層的對抗訓練。

防守做得多漂亮，這個攻擊面本身依然是結構性的。一篇近期 arXiv 論文評測了多家旗艦模型對間接提示注入的抵抗力，結論並不樂觀，即使社群公認抗注入能力最強的 Claude Opus 4.6，在資料被下毒的情境下受害率仍超過基準值的三倍。這代表 prompt injection 是當前 agent 範式裡所有人都還沒解決的問題，不分封閉與開源。

## 對照組登場：OpenClaw 與 Hermes 走的是另一條路

當 Google 用通路規模做 agent，開源社群走的是截然相反的方向，以透明原則、本機掌控、零訂閱費為核心，建立另一套遊戲規則。

### OpenClaw：本機掌控，但資安裸奔

OpenClaw 由開發者 Peter Steinberger 主導，前身是 2025 年下半年的 Clawdbot 與 Moltbot，2026 年 1 月 25 日改名後正式發布。它的設計哲學和 Spark 完全相反。Agent 跑在你自己的機器上，透過 WhatsApp、Telegram、Slack、Signal 等你已經在用的通訊軟體下指令，可以執行 shell 命令、自動操作瀏覽器、收發 email、管理檔案。資料留在本機，記憶以 Markdown 檔形式存放，使用者完全掌控。

這套設計的吸引力遠超設計者預期，OpenClaw 在 1 月底發布後幾天內 GitHub star 破 10 萬，到 3 月 3 日衝上 25 萬，超越 React 成為 GitHub 史上 star 數最多的開源專案。社群效應幫它解決了 agent 最難的「實際好用」問題，使用者貢獻了上萬個外掛 skill，幾乎每個常見工作流都有人寫過。

然而資安的問題隨即浮現，1 月底 Kaspersky 發布的審計報告揪出 OpenClaw 有 512 個漏洞，其中 8 個被列為重大。最嚴重的 CVE-2026-25253（CVSS 8.8 分）允許攻擊者只要一個 webhook 就能達到遠端命令執行。預設配置不啟用驗證、憑證明文儲存在設定檔，社群外掛市集 ClawHub 上甚至出現過會偷錢包的惡意 skill。Kaspersky 直接建議，不要在有敏感資料的機器上部署 OpenClaw。

社群的回應是推薦搭配抗注入能力較強的模型。Anthropic 的 Claude Opus 4.6 因為長脈絡與較好的對抗訓練，是社群公認跑 OpenClaw 風險最低的選項。但這個建議本身就承認了一件事，OpenClaw 自己的安全機制不夠，得靠模型來救。

### Hermes Agent：會自我進化的 agent

Hermes Agent 是 Nous Research 在 2 月 25 日發布的開源 agent，最大賣點是內建「學習迴圈」。它在每次完成任務後會自動萃取出可重用的「Skills」、累積跨 session 的記憶，使用越久速度與成功率越高。Nous Research 公布的內部資料顯示，累積 20 個以上 Skills 後，同類任務的執行速度可以快上四成。

Hermes 跑在自架伺服器上，從一台 5 美元的 VPS 到 serverless 架構都可以部署，全天候 24/7 運作。發布七週內 GitHub star 從零衝到約 15 萬，5 月 10 日每日 token 用量達 2,240 億，超越 OpenClaw 的 1,860 億，成為 OpenRouter 上用量最大的 AI 應用。

如果 OpenClaw 賣的是「我自己掌控」，Hermes 賣的就是「它跟我一起成長」。這是兩個對「個人 AI agent」截然不同的想像。

## 三方對照：八個維度看路線之爭

把三個 agent 並排放在一起看，路線差異就很清楚了。

| 維度 | Gemini Spark | OpenClaw | Hermes Agent |
|------|--------------|----------|--------------|
| 部署模式 | 雲端託管（Google Cloud 專屬 VM） | 本機自架（local-first） | 自架伺服器（5 美元 VPS 到 serverless） |
| 自主性與 24/7 | 雲端 24/7，關機照跑 | 本機排程，機器需開機 | 24/7，serverless 可閒置休眠 |
| 安全與 prompt injection | Agent Gateway、DLP、defense-in-depth；自主採購爭議 | 512 漏洞、明文憑證、惡意 skill 事件 | 指令核可、容器隔離；prompt injection 仍為結構性風險 |
| 隱私與資料掌控 | 資料留 Google 雲，整合最深也最受質疑 | 資料留本機，掌控度最高 | 跑在自己伺服器，掌控度高 |
| 定價 | 訂閱制（綁 Google AI Ultra） | 免費開源（MIT） | 免費開源（MIT） |
| 生態鎖定 | 高（綁 Google 帳號與 Workspace） | 低（多模型、多通訊軟體） | 低（200+ 模型，可全用開源模型） |
| 目標使用者 | 深度使用 Google 生態的一般消費者 | 想自己掌控的開發者與 tinkerer | 想要 agent 越用越強的進階使用者 |
| 記憶與自我學習 | 連結 Google 個人資料，無公開自我進化機制 | 持久記憶（Markdown），無自動技能學習 | 學習迴圈，自動產生並改進 Skills |

從這張表可以看出幾個關鍵分野，每個維度背後都藏著截然不同的設計哲學與信任取捨。

部署上，Google 走雲端託管的路線，Spark 不需要你安裝任何東西，但所有運算都發生在 Google 的機器上。開源派則把運算拉回本機或自家伺服器，犧牲便利換得掌控。

商業模式上，Spark 是訂閱錨點，把高價方案綁在 agent 上。OpenClaw 與 Hermes 採 MIT 授權免費釋出，靠生態而非訂閱獲利。

自我進化能力上，Hermes 是目前唯一明確內建「越用越強」機制的 agent。Spark 雖然連結了你所有的個人 Google 資料，但並未公開類似的學習迴圈設計。

## 我的觀點：分發換規模，透明換信任

平心而論，Gemini Spark 的能力天花板，今天看不到。Google 把 Gemini 3.5 Flash、Antigravity harness、Workspace 整合、9 億月活的分發通路綁在一起，是過去十年沒人能複製的組合。即使 Spark 1.0 跑得跌跌撞撞，它的成長飛輪幾乎是確定的。

這場仗真正有意思的地方，從來不只是誰跑得快。把它當成一場速度比賽，從一開始就誤解了戰場的本質，真正的競爭軸線是信任。封閉託管把一個 24/7 替你動帳單、讀信件、開瀏覽器的 agent 整碗交給 Google，等於把另一塊個人生活的主控權讓出去。Google 主動標註「可能未經詢問就採購」的警語，誠實得讓人不安。誠實之餘，使用者實際上能做的選擇仍然有限，要不就用、接受這個風險，要不就不用、回到自己手動處理一切的舊世界。

開源自架則把信任的問題換成了執行能力的問題。OpenClaw 用 GitHub 25 萬星證明社群力量驚人，但 512 個漏洞也提醒大家，「開源」不等於「安全」。Hermes 用學習迴圈樹立了新典範，但要使用者租 VPS、配 API key、自己負責 ops，本質上把 Spark 一鍵省下的麻煩，原封不動還給了你。

我自己的判斷是，未來一兩年三條路線會分流。Google 拿走 9 億主流使用者，付出的代價是不斷被質疑「你能信任 Big Tech 嗎」。OpenClaw 與 Hermes 拿走幾百萬開發者與深度使用者，靠透明與掌控建立另一套信任。中間還會出現第三類玩家，企業級託管 agent（例如 Anthropic 的 Claude Cowork 走的路），主打 SOC2、私有部署、自主採購禁令這類保守設計。

至於 prompt injection 這個結構性風險，三條路線都沒有完美答案。即使是社群公認抗注入最強的 Claude Opus 4.6，受害率仍超過基準值的三倍。這代表 2026 年的 agent 浪潮，技術上還在「使用者自負風險」的階段。Google 在 onboarding 寫下警語、Kaspersky 對 OpenClaw 發出警告、Nous Research 用容器隔離 Hermes，都是同一件事的不同表達方式。

寫到這裡，有個樸素的問題繞不開，那就是你願意把 24/7 替你做事的權限，交給誰？

我自己的答案是，現階段沒有任何 agent 值得我把信用卡和銀行 OTP 全交出去。但如果只是「替我讀信件、整理摘要、起草草稿」這類低風險工作，Spark 的便利性確實很難拒絕。差別只是，使用者要意識到，每一次便利的取得，背後都是一次新的信任讓渡。

## 常見問題

**Gemini Spark 什麼時候推出、要多少錢？**

本週開放給 trusted testers，下週進 beta，先給美國的 Google AI Ultra 訂閱者。Google AI Ultra 同步調整為每月 200 美元（原 250 美元），並新增 100 美元的開發者方案。其他地區與更便宜的方案上線時程，Google 尚未公布。

**Gemini Spark 和我現在用的 Gemini 聊天有什麼不同？**

最大差別是「持續性」。一般 Gemini 聊天是一次性的問答，關掉視窗就結束。Spark 跑在 Google Cloud 的專屬虛擬機，可以連續執行數小時的長時程任務，包含代你開瀏覽器、填表單、發信件，並在你回到裝置時把成果交給你。

**Gemini Spark 會不會未經同意就幫我買東西？**

Google 的官方說明強調採購類動作「設計上會要求使用者確認」，但 onboarding 細則也出現了「可能未經詢問就採購」的警語。兩種說法目前並存，建議實際使用時手動關閉採購相關權限、緊盯交易通知，等真實案例累積後再決定要不要授權更多。

**OpenClaw、Hermes Agent 和 Gemini Spark 哪個比較安全？**

沒有絕對答案。Gemini Spark 有 Google 的安全工程支援與 Agent Gateway、DLP 等防線，但你把資料交給 Google。OpenClaw 資料留本機，掌控度最高，但 Kaspersky 揪出 512 個漏洞，預設配置很不安全。Hermes Agent 設計上有容器隔離與指令核可，但跟所有自架方案一樣，安全責任在使用者自己身上。三者共通的結構性風險是 prompt injection，目前任何模型都還沒完全免疫。

**我應該選封閉託管還是開源自架的 AI agent？**

取決於你的技術背景與信任偏好。如果你是 Google 生態深度使用者、不想碰技術細節、能接受訂閱費，Spark 是最低摩擦力的選擇。如果你是開發者、在意資料留在自己手裡、願意自己負責維運，OpenClaw 或 Hermes Agent 是更有掌控力的選項。對大多數人來說，先用 Spark 試水溫、評估自己會用 agent 做什麼、再決定要不要進一步自架，是比較務實的路徑。

## 結語

Gemini Spark 的發布，把 AI agent 這個過去半年的開發者熱詞，正式變成了 9 億人手機裡可以開的功能。

這件事的意義不只在 Google 本身。它意味著 agent 範式已經從技術早期跨進產品化階段。接下來幾年的競爭主軸，會從「誰的模型最強」轉成「誰能讓 agent 在使用者生活裡真正被信任」。

Google 用分發通路換規模，OpenClaw 與 Hermes 用透明與掌控換信任，三條路線同時往前推進。受惠者是使用者，但同時要付的代價，是每個人都得開始思考一個過去不存在的問題，也就是你願意把一台 24/7 替你行動的機器接進你的生活到什麼程度，以及交給誰。

這個問題沒有標準答案。越快開始想，越有機會在 agent 全面普及之前，替自己劃出一條合適的界線。

## 延伸閱讀

- [Gmail 導入 Gemini AI 的平台衝擊分析](./2026-01-08-gmail-gemini-ai-platform-competition.md) 同樣由分發通路驅動的 Google AI 策略，Spark 把 Gmail AI 化的劇本推到了 agent 層級。

## 參考資料

1. [Google I/O 2026: Sundar Pichai's opening keynote | Google Blog](https://blog.google/innovation-and-ai/sundar-pichai-io-2026/)
2. [The Gemini app becomes more agentic | Google Blog](https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/)
3. [Everything new in our Google AI subscriptions | Google Blog](https://blog.google/products-and-platforms/products/google-one/google-ai-subscriptions/)
4. [Google introduces Gemini Spark, a 24/7 agentic assistant with Gmail integration | TechCrunch](https://techcrunch.com/2026/05/19/google-introduces-gemini-spark-a-24-7-agentic-assistant-with-gmail-integration/)
5. [With Gemini 3.5 Flash, Google bets its next AI wave on agents | TechCrunch](https://techcrunch.com/2026/05/19/with-gemini-3-5-flash-google-bets-its-next-ai-wave-on-agents-not-chatbots/)
6. [Google unveils AI model Gemini 3.5 and AI agent Gemini Spark | CNBC](https://www.cnbc.com/2026/05/19/google-ai-ultra-gemini-spark-omni.html)
7. [Gemini app now has compute-based usage limits as AI Ultra now starts at $100 | 9to5Google](https://9to5google.com/2026/05/19/google-ai-ultra-100/)
8. [Google unveils Gemini Spark, a 24/7 personal AI agent | Tom's Guide](https://www.tomsguide.com/ai/google-gemini/google-unveils-gemini-spark-a-24-7-personal-ai-agent-that-could-be-a-game-changer-for-agentic-ai)
9. [Google announces Gemini Spark to quietly run your digital life | Android Authority](https://www.androidauthority.com/google-gemini-spark-3668600/)
10. [Google's new AI agent can draft your emails and eventually spend your money | VentureBeat](https://venturebeat.com/technology/googles-new-ai-agent-can-draft-your-emails-monitor-your-inbox-and-eventually-spend-your-money)
11. [Advancing Gemini's security safeguards | Google DeepMind](https://deepmind.google/blog/advancing-geminis-security-safeguards/)
12. [Lessons from Defending Gemini Against Indirect Prompt Injections | arXiv](https://arxiv.org/html/2505.14534v1)
13. [New OpenClaw AI agent found unsafe for use | Kaspersky](https://www.kaspersky.com/blog/openclaw-vulnerabilities-exposed/55263/)
14. [OpenClaw rocks to GitHub's most-starred status, but is it safe? | The New Stack](https://thenewstack.io/openclaw-github-stars-security/)
15. [OpenClaw vs Hermes Agent: why Nous Research's self-improving agent now leads OpenRouter | MarkTechPost](https://www.marktechpost.com/2026/05/10/openclaw-vs-hermes-agent-why-nous-researchs-self-improving-agent-now-leads-openrouters-global-rankings/)
16. [Hermes Agent | Nous Research](https://hermes-ai.net/)

---

*最後更新：2026-05-19*
