---
title: "phpBB Restore 系列文骨架 outline"
description: "5 篇系列文的結構規劃，從人文動機 → AI 協作敘事 → 技術 deep dive → 踩雷集錦"
date: 2026-05-07
author: "Clement Tang"
tags: ["phpbb", "claude-code", "docker", "self-hosting", "blog-series"]
category: articles
status: in-progress
---

# phpBB Restore 系列文骨架 outline

> 救活一個 23 年舊公會論壇的 6 週紀實 — 從 Bluehost 託管、退場倒數、到 DigitalOcean VPS + Docker 自架。系列文 5 篇，從人文動機切入，依序展開 AI 協作敘事、技術 deep dive、踩雷集錦。

## 系列總覽

| 項目       | 內容                                                                                 |
| ---------- | ------------------------------------------------------------------------------------ |
| 篇數       | 5 篇                                                                                 |
| 預估總字數 | 18,000 - 24,000 字                                                                   |
| 發佈平台   | M42 (multivac42.com)                                                                 |
| 草稿來源   | Pensieve `drafts/`                                                                   |
| 發佈節奏   | 每週 1-2 篇，預期 3-4 週發完                                                         |
| 受眾       | 工程社群（深度技術）+ 一般讀者（人文敘事）+ LinkedIn 擴散                            |
| 隱私設定   | 全露：公會名「天地日月 / The Sun Moon」、創會成員、ID「光明元素」、域名 `3d-olg.net` |
| 主視角     | 第一人稱，Clement Tang 親身經歷                                                      |

## 命名規則

- 骨架 outline（本文件）：`2026-05-07-phpbb-restore-series-outline.md`，留在 drafts/
- 5 篇正文 slug：
  - `2026-05-XX-phpbb-restore-part-01-why.md`
  - `2026-05-XX-phpbb-restore-part-02-claude-code.md`
  - `2026-05-XX-phpbb-restore-part-03-data-recovery.md`
  - `2026-05-XX-phpbb-restore-part-04-infrastructure.md`
  - `2026-05-XX-phpbb-restore-part-05-lessons.md`
- 完成後 mv 到 `~/multivac42/docs/articles/`，或用 `~/pensieve/scripts/publish-to-multivac.js` 發佈

---

## #1 — 為什麼我花 33 天救一個 23 年的舊論壇

**Logline:** 一個公會論壇從 EQ1 CEQ 走到 2026 的 23 年，為什麼值得救？

**預估字數:** 3,500 - 4,500

**目標受眾:** 一般讀者 + 老遊戲玩家 + 想了解動機的人

**H2 草稿:**（切角：AI 賦能為動機，Bluehost 退場是順便副作用 — 不是觸發點）

1. 引言：論壇 2015 年就停更了，為什麼 2026 年才動手？
   - 真正的觸發是 AI 工具成熟、不是 Bluehost
   - 2026 年初打開 Claude Code、開始評估
2. 公會的 23 年：從笑傲江湖到 The Sun Moon
   - 笑傲江湖網路版 → 2003-06-13 EQ1 CEQ 歌詠之劍創會（深藍星辰、一丁、瓏瓏 等）
   - 創會後幾天，吉爾斯邀請我以「光明元素」入會
   - 2005-05-10 EQ2 東方版封測創立分部
   - 2005-07-11 開放測試正式創立公會（光明元素、艾德利克、古道、刀王、浪花知音、Mars 等共創）
   - 2006-03 東方版結束 → 移民美版 Najena
   - 伺服器合併史：Najena → Unrest（2010）→ Halls of Fate（2015）
   - 引用 about us 頁面截圖 + 2005-11-09 EQ2 東方版遊戲內截圖
3. 為什麼是 phpBB（而不是 Discord、不是其他）
   - 2003 年的 BBS 時代標準
   - 從 phpBB 2.0 一路用到 3.0.14（2015 停更）
   - 附件、私版（forum_id=6 公會成員友誼廳）、DKP 系統
4. 為什麼是現在 — AI 工具讓「自己做」變可能
   - 過去：找 freelancer 重建一個老論壇成本高、學習機會 0
   - 現在：Claude Code pair programming，預算可控、學技術
5. 順便的副作用：Bluehost 4/25 通知信
   - $214.07/年 vs DO $72/年
   - 退場是節點、不是動機
6. 33 天值不值得：對抗遺忘、保存數位文物

**互引下一篇:** 「決定救之後，下一個問題是：一個 PM 怎麼自己做這件事？」 → #2

**關鍵素材（已收齊）:**

- Image #1：Bluehost 4/25 renew 通知信（$214.07）
- Image #2：phpBB about us 頁面（含 23 年公會中文歷史 quote）
- Image #3：2005-11-09 EQ2 東方版遊戲內公會 panel 截圖
- 待補：EQ1 CEQ 時代老照片（使用者翻 eq/eq2.3d-olg.net 找）

**費用對照表（寫進稿）:**

- Bluehost WordPress Plus Hosting + SiteLock Lite：$214.07/年（含稅）
- DigitalOcean SGP1 1GB Basic Droplet：$6/月 × 12 = $72/年
- 一年差價：$142（約等於 $6 × 24 = 兩年的 VPS）

---

## #2 — PM × Claude Code：6 週救活公會論壇紀實

**Logline:** 一個非工程師 PM 怎麼用 AI pair programming 完成原本超出能力範圍的全棧搬遷。

**預估字數:** 4,000 - 5,000

**目標受眾:** AI 工具使用者 + PM / 非工程師 + LinkedIn 擴散

**H2 草稿:**

1. 引言：33 天倒數開始的那天，我能做什麼？
2. 一個 PM 的工程能力天花板
   - 自架過 phpBB 2.0 / WordPress 1.4 的時代背景
   - 能寫 HTML/CSS、看得懂 SQL、不寫 production code
   - 過去 30 年累積的「技術素養」vs「工程能力」差別
3. 為什麼是 Claude Code（而不是傳統外包 / freelancer）
   - 預算考量
   - 學習機會
   - AI pair programming 的工作節奏
4. Phase 0-7 的工作分解
   - Phase 0：盤點現有資料
   - Phase 1-2：本機重建 phpBB 雙站
   - Phase 3：Docker 化
   - Phase 4-5：上 VPS、HTTPS、加固
   - Phase 6：WP 升級鏈（後來補）
   - Phase 7：Bluehost 退場
5. 能委託什麼、必須親自做什麼
   - 委託：debug、SQL migration、Docker compose、文件整理
   - 親自：SSH key 操作、密碼輸入、最終 production cutover 確認
6. 6 週節奏的實際分配（含週會、家庭時間、白天工作）
7. **副產品：dev session vs review session 的方法論 — /seer skill 的誕生**（700-1000 字）
   - 起點：Phase 5.7 加固期間（2026-04-16）的部署審查
   - 痛點：同一個 session 內 Opus 既要 review 又要動手改，角色邊界混亂
   - 結論：reviewer 純輸出建議到文件、coding agent 接手執行
   - 結晶：2026-04-19 21:56 第一個 truthsayer commit、4 小時 4 個 batch、隔天 04-20 改名 seer
   - 回饋：seer skill 後來反過來用回 phpbb-restore 的 Phase 7 計畫審查
   - 普適性：context cleanliness for unbiased review（fresh session 的價值）
8. AI 協作的 anti-pattern：使用者踩過的坑
   - 過度信任、給 context 不足、忘記補齊背景

**互引前後:** 接 #1（為什麼救）→ 接 #3（怎麼救：資料層）

**關鍵素材:**

- Phase 計畫文件節錄
- Claude Code 對話片段（重點時刻）
- 時程表 / Phase 完成日期表

---

## #3 — 資料復原：phpBB 與 WordPress 的多代升級鏈

**Logline:** 18 年的舊資料、phpBB 五代升級、WP 十代 schema 變遷 — 怎麼證明每個 byte 都對得上？

**預估字數:** 4,500 - 5,500

**目標受眾:** 工程社群、舊系統維護者、SEO 長尾

**H2 草稿:**

1. 引言：兩個資料層、四個 schema 版本、3,159 個附件
2. phpBB 2.0 → 3.3.15 跨大版本 conversion
   - phpBB 2.0 EOL 與 3.x convertor
   - 中文編碼：BIG5 / GBK / UTF-8 的歷史包袱
   - User table 結構差異、attachment 路徑
3. eq2 vs eq 兩站的 prefix 不同（`phpbb3_` vs `phpbb_`）
4. WordPress 1.5 → 6.9 升級鏈
   - 為什麼必須走 4.8 / 5.0 / 6.0 三段跳
   - 每代 image 用 ephemeral wp-core，最終才掛 wp_html volume
   - 中間版本掛最終 volume 會被 6.9 entrypoint 寫壞
5. 一致性 diff：怎麼證明資料沒掉
   - SQL count 對齊（phpbb3_posts、wp_posts publish=14、wp_users=12）
   - 附件數對齊（find ... -type f | wc -l = 3,159）
6. 中文編碼的具體案例（含截圖前後對比）
7. 一個沒料到的細節：phpBB MOD 時代的 user_lang=en_us，要遷移到 en

**互引:** 接 #2（怎麼開始）→ 接 #4（部署架構）

**關鍵素材:**

- before / after 截圖（中文亂碼 → 正常）
- SQL count 結果
- 升級鏈時序圖

---

## #4 — 部署架構：從 Bluehost shared hosting 到 1GB VPS

**Logline:** 為什麼選 DigitalOcean SGP1、Docker Compose 三服務、Traefik 一個 domain 分流到三站。

**預估字數:** 4,500 - 5,500

**目標受眾:** Self-hosting 社群、Docker / Traefik 學習者、SEO 長尾

**H2 草稿:**（2026-05-19 已對齊實際成稿）

1. 引言：1 GB RAM 跑得動嗎，盤點要塞進去的東西
2. 為什麼選 DigitalOcean SGP1
3. Docker Compose 六個 service 的架構
   - phpbb-eq2 + phpbb-eq + WP + 兩個 MySQL instance + Traefik
   - 為什麼 WP 要獨立 DB instance（SPOF 隔離）
   - Volume 設計與備份策略
4. Traefik 一個 domain 怎麼分流到三站
   - phpBB community/ + theme/ priority=100
   - WP priority=1 catch-all
   - image tag 鎖 v3.6（避開 latest 浮動）
5. HTTPS 與 Let's Encrypt 自動續簽
6. SMTP 怎麼在 DigitalOcean 上寄出去
   - Resend SMTP relay + alternate port 2587 STARTTLS
   - SPF / DKIM / DMARC alignment
   - from address 必須是 root domain
7. MySQL 8.4 in-place 升級
   - 升級前 dump + volume snapshot fallback
   - 排在 Bluehost 訂閱失效前最後一週
8. phpBB 該用多大權限的 DB 帳號（Phase 7d D4）
   - reviewer 建議拆 phpbb_app + phpbb_migrate 兩 user
   - 反轉：ACP extension migrator 走 runtime 連線需 DDL
   - 最終單一 phpbb_app + schema-scoped GRANT ALL
   - 呼應 #2 的「審查也要再審查」

**互引:** 接 #3（資料層）→ 接 #5（踩雷集錦）

**關鍵素材:**

- docker-compose.yml 節錄
- traefik labels 設定
- htop / docker stats 截圖
- 訂閱成本對比（Bluehost vs DigitalOcean）

---

## #5 — 6 週踩雷集錦：那些卡了我半天的小事

**Logline:** 每個都是 1-3 小時 debug 的小坑，集合起來才是真實的 6 週體感。

**預估字數:** 3,500 - 4,500

**目標受眾:** 工程社群、SEO 長尾（每個雷一個獨立 query 入口）

**H2 草稿:**（2026-05-19 已對齊實際成稿，每個雷一個 H2）

1. 引言：為什麼要記 debug 過程
2. 雷 1：1Password SSH agent 撞 Bluehost MaxAuthTries=3
3. 雷 2：phpBB 顯示「忘記密碼信已寄出」但根本沒寄
4. 雷 3：sed 解析 .env 撞到密碼含等號
5. 雷 4：phpBB 3.3.15 + PHP 8 + en lang 觸發 DATETIME_FORMAT warning
6. 雷 5：MySQL `init-db/` 多 DB 陷阱
7. 雷 6：Calendar extension 缺一個 en 路徑就 500
8. 雷 7：sunmoon/pages 擴充功能，資料庫說啟用、後台說壞掉
9. 雷 8：Prettier 把 phpBB 模板靜悄悄改壞
10. 系列收尾

**互引:** 接 #4 收尾

**關鍵素材:**

- 每個雷的錯誤訊息原文 / log
- 解決方案 code snippet

---

## 待補資料清單（寫稿前要先收集）

- [ ] Bluehost auto-renew 通知信時間點（2026-04-XX）
- [ ] phpBB about us 頁面 screenshot
- [ ] EQ1/EQ2 早期公會老照片（如有，否則用文字描述）
- [ ] Phase 0-7 計畫文件節錄
- [ ] Claude Code 重點對話片段（要先選哪些有故事性）
- [ ] before/after 中文亂碼截圖
- [ ] SQL count 對齊結果（從 memory 拉）
- [ ] docker-compose.yml 節錄
- [ ] traefik labels
- [ ] DigitalOcean 訂閱費 vs Bluehost 訂閱費
- [ ] 系列特色圖（5 張，每篇一張）— 待生成 prompt

## 互引關係圖

```
#1 為什麼救 ─→ #2 PM × Claude Code ─→ #3 資料復原 ─→ #4 部署架構 ─→ #5 踩雷集錦
   (動機)        (工具與節奏)            (資料層)        (基礎設施)        (lessons)
```

每篇開頭引前一篇，結尾預告下一篇，建立系列黏性。

## 發佈順序與節奏

| 篇                                     | 預計撰寫           | 預計發佈   |
| -------------------------------------- | ------------------ | ---------- |
| #1 為什麼救                            | 2026-05-08         | 2026-05-09 |
| #2 PM × Claude Code（含 /seer 起源段） | 2026-05-09 ~ 05-10 | 2026-05-11 |
| #3 資料復原                            | 2026-05-11 ~ 05-12 | 2026-05-13 |
| #4 部署架構                            | 2026-05-13 ~ 05-14 | 2026-05-15 |
| #5 踩雷集錦                            | 2026-05-15 ~ 05-16 | 2026-05-17 |

緊湊節奏 2 天 1 篇，全部 5 篇在 2026-05-09 ~ 05-17 之間發完。

避開 Bluehost 退場 critical window（2026-06-03 ~ 06-09）— 系列文寫完發完後進入 Phase 7 純觀察期，正好接到專案實際終局。

## 風格與調性原則

- 第一人稱、繁體中文、台灣用語
- 不使用 emoji
- 配合 M42 既有調性「深度分析」，但允許 personal narrative 的私人元素
- 技術段落附 code block + 必要的截圖
- 人文段落輕描淡寫，避免煽情
- Frieren 式語氣可以渲染但不要喧賓奪主（系列文不是日記）
