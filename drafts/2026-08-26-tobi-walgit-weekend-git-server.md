---
title: "Shopify CEO 的週末開源：walgit 如何把 Git 伺服器變成「單一 binary + 物件儲存」"
description: "Tobi Lütke 讀完 Cursor《Git at any scale》後，一個週末實作並開源 walgit——沒有資料庫、沒有 leader、只靠 S3 的 Git 伺服器。"
date: 2026-08-26
author: "Clement Tang"
tags: ["Git", "開源", "Shopify", "Rust", "基礎設施", "Cursor", "monorepo"]
category: articles
status: draft
---

# Shopify CEO 的週末開源：walgit 如何把 Git 伺服器變成「單一 binary + 物件儲存」

> Tobi Lütke 讀完 Cursor 的《Git at any scale》後，用一個週末把核心架構實作成開源專案 walgit。沒有資料庫、沒有 leader、機器可以全部關掉——bucket 本身就是 repository。

## 元資料

| 項目         | 內容                                      |
| ------------ | ----------------------------------------- |
| **建立日期** | 2026-08-26                                |
| **更新日期** | 2026-08-26                                |
| **標籤**     | #Git #開源 #Shopify #Rust #基礎設施 #Cursor |
| **狀態**     | 草稿                                      |
| **字數**     | 約 2,800 字                               |

### Feature Image Prompt

> 暗色調工程風插畫：一台簡約的 Rust 機器人站在巨大的 S3 風格物件儲存桶前，手中拿著單一 binary 檔案，背景隱約可見 Git 分支圖與 packfile 圖示，文字標註「WAL + CAS」與「no database」。乾淨、現代、偏技術視覺。

---

## The Big Picture

2026 年 8 月 24 日，Shopify CEO Tobi Lütke 在 X 上發了一則低調但技術含量極高的貼文。

他寫道：Cursor 的〈Git at any scale〉是他近期讀過最有趣的部落格之一，剛好碰上自己對 Shopify 內部 Git 系統的挫折。於是他決定「當成練習」，用一個週末把這個架構實作成開源專案。

這個專案叫做 **walgit**。

它的核心主張非常極端：

> 一個 Git 伺服器只需要「單一 Rust binary」+「任意 S3 相容物件儲存」。沒有資料庫、沒有 leader、沒有需要協調的本地狀態。每一台執行中的機器都只是 disposable cache，真正的 repository 就是那個 bucket。

在 AI coding agent 大量產生程式碼、monorepo 越來越大、傳統 Git 託管壓力急遽上升的時代，這個「把 Git 當資料庫來設計」的方向，值得認真看待。

---

## Why It Matters

對大多數工程師來說，Git 託管是「理所當然」的基礎設施。GitHub、GitLab、Bitbucket 運作良好，大家很少需要思考底層。

但當規模變成：

- 數十 GB 的 monorepo
- 數千萬個 objects
- 數十萬個 refs
- 同時有人類與大量 agent 在推送與拉取

傳統「把完整 repository 放在本地 NVMe，再用嚴格 replication 保證一致性」的模式就會開始出現摩擦：成本、複雜度、冷啟動時間、以及擴展時的協調成本。

Cursor 在〈Git at any scale〉中提出的 Continuity 架構，核心洞見是：

**把 Write-Ahead Log（WAL）放在物件儲存當 source of truth，本地的 Git repository 只是可重建的 cache。**

Tobi 把這個想法用 Rust 實作成任何人都能跑的單一 binary，並補上「機器比 repository 還小」時需要的額外能力（remote reader、history pack、bundle-uri）。這讓「Git at scale」從大型公司的內部系統，變成任何人都可以實驗的開源元件。

對關心基礎設施、monorepo、或 AI agent 工作流的人來說，這不只是一個有趣的週末專案，而是一次對「Git 託管經濟模型」的重新思考。

---

## 主要內容

### 1. 貼文與背景

Tobi 的原始貼文很短：

> Git at Scale (by cursor) has been one of the most interesting blog posts i've read in a while. It came right when I was frustrated with Shopify's internal git system.
>
> As an exercise, I've implemented it over the weekend as open source. It's a single rust binary that you can point at any S3 type object store. It uses WAL and CAS primitives and requires no other data store.
>
> It also implements bundle-uri so large git repos (like our mono) are very fast to download as a chain of static bundles. Also comes with basic familiar UX.

他同時附上了用自己另一個週末專案 [omasnap](https://github.com/tobi/omasnap)（原生 Wayland 截圖與標註工具）拍的截圖。

這不是第一次 Tobi 用週末寫出實用工具。他長期保持「CEO by day, hacker at night」的節奏，過去也開源過 try、qmd 等專案。但把「Git at scale」這種等級的系統，在週末壓縮成可用的開源 binary，仍舊相當罕見。

### 2. Cursor 的 Continuity 洞見

要理解 walgit，必須先看 Cursor 的原文。

Vicent Martí（前 GitHub 工程師，現在 Cursor）在〈Git at any scale〉中回顧了過去 20 年 Git 託管的演進，特別是 GitHub 內部的 Spokes 系統。Spokes 的成功來自「把真正的 repository 放在本地 NVMe，讓 upstream git 直接工作」，但代價是：

- 需要固定 replica set
- 用 three-phase commit 保證一致性
- 需要資料庫追蹤每個 repository 落在哪幾台機器
- 擴展 replica 數量時推送延遲會上升

Continuity 的轉折點是：**不要把本地磁碟當 source of truth**。

改成：

1. 每次 push 先寫入 S3 上的 immutable WAL entry
2. 用 compare-and-swap（CAS）更新一個極小的 manifest
3. 這個 CAS 就是共識點——沒有選舉、沒有 quorum、沒有 primary
4. 任何 instance 都可以接受 push；兩個同時競爭的 instance 不可能同時成功
5. 讀取時先做一次 conditional GET 確認 manifest 有沒有變（大多是 304）
6. 本地的 pack 與 refs 都只是 cache，可以隨時從 WAL 重建

結果是：讀取可以近乎線性擴展到上百個 replica，而推送吞吐量主要受 S3 延遲限制。Cursor 內部測試顯示，在 S3 Standard 上約可達 120 pushes/s，S3 Express 更高。

### 3. walgit 做了什麼

walgit 是這套架構的 Rust 實作，並針對「機器比 monorepo 還小」的場景補強。

根據官方 README，它提供：

| 能力 | 說明 |
|------|------|
| **smart HTTP** | v0/v2 完整支援（ls-refs、fetch with filter/shallow、receive-pack atomic 等） |
| **bundle-uri** | 依日曆切出 weekly full + daily/hourly chain，clone 時大部分 bytes 直接從 bucket/CDN 下載 |
| **Git LFS** | Batch API + 物件也放在同一個 bucket |
| **Web UI + JSON API** | 內建 React 介面，並提供 dependency-free 的 `repos.js` SDK |
| **Policy** | 每個 repository 可設定 protected refs、fast-forward only 等規則 |
| **Auth** | 支援 token 或任何 OIDC issuer |
| **Maintenance** | checkpoint、compaction、bundle 建置、fsck 全部由單一 maintainer loop 驅動 |

最重要的約束被寫進 `GOAL.md` 與 `AGENTS.md`：

- Object store 是唯一 source of truth
- 沒有 database、沒有 Redis、沒有 gossip、沒有 leader、沒有 node identity
- 關掉所有 instance，只會失去「熱度」，不會失去任何資料
- 成本不能隨 ref 數量在熱路徑上成長，也不能因為 pack 太大而在小機器上崩潰

為了在「幾 GiB tmpfs」的機器上服務「數十 GB monorepo」，walgit 額外做了三件事：

1. **Remote reader**：用 HTTP range request 讀取放不下的 pack
2. **History pack**：只把 commits 與 trees 留在本地，blobs 留在 bucket
3. **Bundle-uri 作為主要傳輸**：新鮮 clone 幾乎不經過應用伺服器

### 4. 部署長什麼樣子

官方範例非常精簡：

```sh
# 1. 準備 bucket 與設定檔
cat > walgit.toml <<'EOF'
[server]
listen = "0.0.0.0:8080"
public_url = "https://git.example.com"
auto_create_on_push = true
[server.auth]
mode = "token"
anonymous_read = false
tokens = [{ principal = "me", token_env = "WALGIT_TOKEN_ME", write = true }]
[store]
backend = "s3"
bucket = "my-walgit"
[store.s3]
endpoint = "https://s3.us-east-1.amazonaws.com"
region = "us-east-1"
EOF

# 2. 啟動
WALGIT_TOKEN_ME=$(openssl rand -hex 24) walgit serve --config walgit.toml

# 3. 推送（新路徑會自動建立 repository）
git -c http.extraHeader="Authorization: Bearer $WALGIT_TOKEN_ME" \
  push https://git.example.com/acme/app.git main
```

多加幾台指向同一個 bucket 的機器，它們會一致地服務相同的 repositories，彼此之間不需要額外協調。

### 5. 與傳統 Git 託管的差異

| 面向 | 傳統（如 GitHub Spokes 風格） | walgit / Continuity 風格 |
|------|------------------------------|---------------------------|
| Source of truth | 本地 NVMe 上的完整 repository | 物件儲存上的 WAL + manifest |
| 一致性機制 | 3PC / quorum | CAS on tiny manifest |
| 擴展讀取 | 受 replica 協調成本限制 | 近乎線性（conditional GET） |
| 機器與 repo 大小 | 機器通常需要能放下完整 pack | 機器可以遠小於 repository |
| 運維模型 | 需要追蹤「哪個 repo 在哪台機器」 | 任何機器都可服務，placement 用設定決定 |
| 冷啟動 | 需要複製完整資料 | 讀 WAL + checkpoint 即可重建 |

這不代表傳統模式已經過時。對大多數中小型 repository，現有託管服務依然極為高效。但當你開始面對「真正的 monorepo + agent 流量」時，這種「object store first」的設計提供了另一條清晰的路徑。

---

## What's Next

**值得關注的發展：**

- walgit 本身還很新（2026 年 8 月下旬公開），後續的 compaction 策略、bundle 排程、以及在真實 monorepo 上的效能數字會更有參考價值。
- Cursor 的 Origin / Continuity 是否會進一步開源或商業化，仍是未知數。目前它仍是內部系統。
- 更多人開始把「Git 託管」重新想成「可水平擴展的版本控制資料庫」，可能會影響下一代 self-hosted 與企業內部方案。

**給讀者的建議：**

- 如果你正在維護大型 monorepo，或開始大量使用 coding agent，值得把 Cursor 原文與 walgit 的 `AGENTS.md` 一起讀完。
- 即使不打算自行部署，理解「WAL in object store」這個模型，也能幫助評估現有 Git 基礎設施的瓶頸。
- 對喜歡週末專案的人來說，Tobi 再次示範了：CEO 也可以把高複雜度系統壓成「一個 binary + 一份設定檔」的可用形態。

---

## 參考資料

1. [Tobi Lütke 原貼文](https://x.com/tobi/status/2091678506992222258)
2. [walgit 官方 repository](https://github.com/tobi/walgit)
3. [Cursor 〈Git at any scale〉](https://cursor.com/blog/git-at-any-scale)
4. [walgit README（架構與部署說明）](https://github.com/tobi/walgit/blob/main/README.md)
5. [walgit GOAL.md（設計目標）](https://github.com/tobi/walgit/blob/main/GOAL.md)
6. [omasnap（Tobi 用來截圖的工具）](https://github.com/tobi/omasnap)

---

_最後更新：2026-08-26_
