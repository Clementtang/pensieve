---
title: "YC 開源 QM：為整家公司設計的 multiplayer agent harness"
description: "Y Combinator 於 2026-07-31 以 MIT 開源內部使用的 QM。scope 隔離、harness 中立、雙層治理與自架部署，重新定義「公司級 agent」的產品形狀。"
date: 2026-08-02
author: "Clement Tang"
tags: ["Y Combinator", "QM", "AI Agent", "開源", "Slack", "企業協作"]
category: articles
status: published
related:
  - "docs/articles/2026-05-19-gemini-spark-vs-openclaw-hermes.md"
---

# YC 開源 QM：為整家公司設計的 multiplayer agent harness

> Y Combinator 把自家用了好幾代的 agent harness 以 MIT 授權丟上 GitHub。名字叫 QM，全名 quartermaster：船上負責後勤協調的人。雖然常見敘事把新 agent 產品都想成「再一個個人 coding agent」，QM 卻設計成每個員工與每個專案都能配一個、還能在 Slack 與網頁一起用的多玩家系統。

2026 年 7 月 31 日，Y Combinator 官方帳號宣布開源 [QM](https://github.com/yc-software/qm)。官網 [qm.ycombinator.com](https://qm.ycombinator.com/) 寫得很直白：這是 YC 內部在用的 agent harness，會計、法務、活動、工程（含開發 QM 自己）都有用；每位員工與每個專案可各配一個 agent。開源後數日，GitHub 星數已逾五千，fork 近六百，討論也快速出現在 Hacker News 與社群。

若把 2026 年上半年的 agent 敘事粗分兩條線：一邊是個人端、本機或託管的 coding／生活助理（OpenClaw、Hermes、Gemini Spark 等）；另一邊是「公司能不能安全地同時跑一整艦隊 agent」。QM 站在第二條線，而且是**開源、自架、無官方計費**的那一種。

## 名字與起源

QM 是 **quartermaster** 的縮寫：船上下層艙間的協調者，負責讓東西各得其所、流程不亂。官方敘事裡，YC 自己走過幾代實驗：

1. **早期**：Ruby 寫的基本 agent loop，掛一些能讀內部資料的工具。第一天就能用，但能力天花板低。後來補了 cron、webhook trigger，仍不夠。
2. **中期**：為員工 individually 開了五十多個 Hermes 類個人助理。單點靈活，艦隊一變大就難管。
3. **現在的 QM**：目標是「像 Hermes 一樣可客製」，同時「像最初那套一樣好管」，而且**要自己擁有、自己託管**。

也就是：個人助理的靈活度，加上組織治理與隔離，再扣掉「整隊 agent 失控」的管理地獄。

## 它解決的產品問題

README 開宗明義：多數 agent 是個人助理思維。硬塞進整家公司會很快變複雜。QM 的設計假設是**新創與小型組織**：

- 每個人有自己的隔離工作區，互不踩線
- 又能在頻道、群組、專案裡**一起**跟 agent 協作
- 同一身份與設定在 **Slack 與 Web** 之間延續

一句話：**個人 scope 與協作 room 都是一級公民**，不是事後硬加的權限補丁。

### 能做什麼（官方使用情境）

- 一起搜內部筆記、email、文件、資料庫與公開網
- 從「company brain」取資料
- 建內部 web app、只發佈給該看的人、並維持資料更新
- 學使用者過往寫信語氣，排程分信、貼標、起草回覆
- 在既有 repo 裡跑測試、開 PR、盯 CI、查 log
- 在共用頻道追專案，貼更新與 follow-up

這清單幾乎全是「工作」，看不到「寫一段 demo code」這類展示項目。

## 核心概念：scope

隔離單位叫 **scope**，主要有兩種平行存在（不是嚴格階層樹）：

| 類型         | 典型對應             | 各自擁有                                                        |
| ------------ | -------------------- | --------------------------------------------------------------- |
| Person-scope | 個別員工             | 記憶、檔案、keychain 視圖、權限、cron、web app、durable sandbox |
| Room-scope   | Slack 頻道或專案空間 | 同上，屬該協作空間                                              |

關鍵設計：

- 同一 principal 跨 Slack 與 web 延續
- 協作空間是**自己的隔離邊界**，這與掛在個人帳號底下的資料夾不同
- Agent 以「被服務者本人」的憑證與權限行動，並全程審計

這與「一個 org 共用一個巨型 bot」或「每人一台筆電 agent、沒有組織記憶邊界」都不同。

## 架構速寫

官方架構可壓成三層：

1. **Headless core**（TypeScript on Node、HTTP 用 Fastify）：API、身份、policy、scheduler、agent loop
2. **Postgres**：session、memory、queue 等需讀回的狀態
3. **Per-scope sandbox**：檔案、工具、已登入服務；loop 透過固定工具面（含 `execute`）在 sandbox 裡跑指令

可選表面（surface）掛在 core HTTP API 上：

- Slack（Bolt，進程內 plugin）
- Web UI（Vite + Lit）
- Admin、portal

Core 本身是**通用**的。公司差異（org config、自訂工具與 skill、sandbox 映像、基礎設施）放在 **deployment directory**，由 `qm` CLI 驗證與部署。Harness、session store、sandbox、memory 等 substrate 都坐在介面之後，換實作靠 wiring。

Repo 版號仍是早期的 `0.1.0`，runtime 要求 Node ≥ 24.15、npm ≥ 11.10。Sandbox 後端可見 local、Docker、AWS microVM、Sprites 等多路實作，顯示「隔離電腦」是一等問題，不是附屬功能。

## Harness 中立：四套驅動、同一 core

QM 宣稱 Pi、OpenCode、Codex、Claude Code 都能驅動**同一個 core**，部署時以環境／設定選定 harness，避免綁死單一 vendor。原始碼裡可看到對應的 `pi-harness`、`opencode-harness`、`codex-harness`、`claude-harness` 與 router。

需要講清楚的限制：

- 這是**部署期選擇**，不是執行中熱切換
- 代價是維護多套適配與測試面
- 中立的是 harness 介面；模型、金鑰、供應商政策仍由營運者負責

對「我只想先穩定一條 runtime」的團隊，這是可選槓桿，不是必做作業。對「不想把整家公司的 agent 平台鎖在一家模型或一家 CLI 產品」的團隊，這是架構宣言。

## 安全：雙層治理

### 第一層：組織安全姿態（可調）

組織選定一種 posture，**更窄的 scope 只能收緊、不能放寬**：

| 姿態             | 行為摘要                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------- |
| **Strict**       | 幾乎每個 harness tool call 都要人工核准（僅少數無副作用的結束類例外）                    |
| **Auto**（預設） | 以 classifier 篩查帶來源標註的外部資料與工具結果，再進模型；部署可接自有 screening proxy |
| **Dangerous**    | 不做內容篩查、tool call 之間不暫停                                                       |

### 第二層：預宣告 command policy（全姿態生效）

即使選 Dangerous，預先宣告的命令政策仍在。`src/policy/command-policy.ts` 裡的 org 底線規則示例包括：

- 遞迴刪除（`rm -r` 等）→ 需核准
- `git push --force` → 需核准
- `DROP`/`TRUNCATE TABLE` → 需核准
- `mkfs`、fork bomb 形態 → 直接 deny
- `curl … | sh` → 需核准

政策可 compose：org floor + scope 規則；mode 支援 denylist / allowlist。

### 官方自己講的限制（讀 SECURITY.md 很重要）

QM 明確說自己是**早期實驗軟體**，不是認證過的多租戶公有雲邊界。已知限制包括：

- Command policy 是「減速帶」：編碼、包進腳本再執行等可繞過；**不是**完整 sandbox 邊界
- Browser 內動作不重入部分 core gate
- Sandbox 內憑證使用時為明文
- Auto 篩查不完整、偏啟發式
- 管理員可讀敏感內容（有審計、無逐次同意）
- 部分 durable 資料與 artifact 生命週期仍粗
- 預設假設是**單一組織、已驗證內部使用者**；訪客與公開多租戶不在主場景

這份誠實度反而提高參考價值：開源 agent 平台最容易在 marketing 裡假裝「已企業級」，QM 選擇把威脅模型攤開。

## Skill 與 plugin：治理式擴充

**Skill**：scope 持有 → 以 grant 分享 → admin 核准後才推廣到全 org；並可從 git repo 匯入 skill pack。預設私有、明示分享、管理員升級，形成「小範圍驗證再放大」的漏斗。

**Plugin**：獨立套件，原則上不 import core。例外是官方 `plugins/chassis`：plugin 與 core 之間簽章認證、通訊管線等**唯一容許的共享接線**。邊界清楚：擴充走認可介面，避免每個 plugin 私自伸進核心。

## 部署與客製：自架，沒有官方 SaaS 帳單

定位是**營運者自己的雲帳號裡跑**：

```bash
npm exec --yes --package=@yc-software/qm@latest -- \
  qm init . --org <slug> --target <fly-or-aws>
```

- 目標可選 Fly.io 或 AWS
- 初始化可走 email-gated web onboarding：內建 `auth` broker 寄 magic link（Resend 或 SMTP）；也可改外接 IdP
- 官方 repo **不附**生產部署 CI；初始化也不自動幫你開部署流水線
- 無商業計費、無 GTM 定價：使用者自付雲端與 model API

需要把公司專屬設定與 core 放在同一棵樹上時，文件建議 **private fork**（普通 clone 鏡像成私有庫，**不要**用 GitHub 的 Fork 按鈕，以免無法私有化且 commit 仍可從公有側被 SHA 取回）。組織專屬內容放 `deploy/layers/<org>/`，core 保持與 upstream 位元組一致，再用 `update-qm` / `upstream-pr` 技能雙向同步。

### 貢獻文化也很「YC 內部工具」

`CONTRIBUTING.md` 路徑是：人類用文字寫想改什麼，放進 `adrs/`，由專案方實作；**不收直接丟 code 的 PR 文化**（至少官方敘事如此）。漏洞走私密 Security 通報。`AGENTS.md` 還規定：零註解風格、修 bug 要全 repo 掃同模式、**任何事後要讀回的狀態必須進 durable store（Postgres）**，RAM 只能當 cache。Blue-green／多實例下，in-memory Map 會在部署時被抹掉。這條工程鐵律對所有自架 agent 平台都值得抄作業。

## 和「個人 agent」浪潮怎麼並排理解

不需要把 QM 說成誰的替代品。比較有用的座標是：

| 問題           | 個人助理型 agent            | QM 這類組織 harness         |
| -------------- | --------------------------- | --------------------------- |
| 誰的記憶與檔案 | 多半是單一使用者            | person + room 雙 scope      |
| 協作           | 弱或靠外部工具              | Slack／專案一級公民         |
| 治理           | 個人設定為主                | org 姿態 + 不可繞過 policy  |
| 部署           | 本機、託管 SaaS、或個人 VPS | 組織自架、private layer     |
| 商業           | 訂閱、用量、開源免費都有    | 目前：開源免費 + 自付 infra |

OpenClaw／Hermes 解決的是「個人如何把 agent 用到飛起」；QM 解決的是「公司如何讓很多人同時用、又不共享成一團漿糊」。兩者可以並存於同一家公司的工具箱。

## 仍不清楚或需自測的點

研究日（開源後數日）仍建議保留這些問號：

1. **Auto 姿態 classifier** 的誤擋率、延遲、是否可完全換成自建 proxy 而不犧牲體驗
2. **Sandbox 生命週期**：每 scope 常駐的資源成本、回收、冷啟動
3. **YC 是否會出 hosted 或商業支援**：目前公開管道是 `labs@ycombinator.com`，無官方定價路線圖
4. **生產就緒度**：SECURITY.md 的限制清單很長；適合當內部平台骨架與實驗床，不宜假設「clone 完即可合規上線」

星數與討論熱度變很快，引用時請以當日 GitHub 與文件為準。

## 結語

多一個能寫 code 的 bot 不算新鮮事，QM 真正的看點在於 YC 把**自己內部已經在用的組織級 harness** 以 MIT 開源，並把產品語言釘在：

- **Scope**（人與房間的隔離）
- **Harness 中立 core**
- **雙層安全（可調姿態 + 全姿態 command policy）**
- **Skill／plugin 的治理邊界**
- **自架 + private layer，無多租戶 SaaS 帳單**

目標是設計公司內部的 agent 平台時，QM 的 README、SECURITY.md 與 `src/policy`、`src/harness` 值得當成一份可讀的活規格，比起個人的第二個 CLI 助理或一張 star 截圖更有參考價值。

## 延伸閱讀

- 同題個人端路線：[Gemini Spark 是什麼？Google 24/7 AI Agent 與 OpenClaw、Hermes 路線之爭](./2026-05-19-gemini-spark-vs-openclaw-hermes.md)

## 參考資料

1. [yc-software/qm（GitHub README）](https://github.com/yc-software/qm)
2. [QM 官網說明（qm.ycombinator.com）](https://qm.ycombinator.com/)
3. [SECURITY.md（威脅模型與已知限制）](https://github.com/yc-software/qm/blob/main/SECURITY.md)
4. [AGENTS.md（工程規範、durable store、plugin chassis）](https://github.com/yc-software/qm/blob/main/AGENTS.md)
5. [docs/getting-started.md（部署與 onboarding）](https://github.com/yc-software/qm/blob/main/docs/getting-started.md)
6. [src/policy/command-policy.ts（org 底線命令規則）](https://github.com/yc-software/qm/blob/main/src/policy/command-policy.ts)
7. [Y Combinator 開源公告（X）](https://x.com/ycombinator/status/2083243960684908768)
8. [Hacker News 討論：qm – Multiplayer agent harness for work](https://news.ycombinator.com/item?id=49126604)
