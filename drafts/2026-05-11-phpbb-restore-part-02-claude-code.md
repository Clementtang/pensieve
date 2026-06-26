---
title: "PM × Claude Code，6 週救活公會論壇紀實"
description: "一個 PM 怎麼用 AI pair programming 完成原本超出能力範圍的全棧搬遷工程。能委託什麼、必須親自做什麼，以及這個專案怎麼意外長出 /seer skill。"
date: 2026-05-11
author: "Clement Tang"
tags:
  ["claude-code", "pair-programming", "phpbb", "self-hosting", "blog-series"]
category: articles
status: draft
series: "phpBB Restore Series"
seriesPart: 2
---

# PM × Claude Code，6 週救活公會論壇紀實

> 一個 PM 怎麼用 AI pair programming 完成原本超出能力範圍的全棧搬遷工程。能委託什麼、必須親自做什麼，以及這個專案怎麼意外長出 `/seer` skill。系列文 5 篇之 #2。

## 從動機到開工那天

[#1 那篇](2026-05-09-phpbb-restore-part-01-why)寫完了「為什麼救」。決定救之後下一個問題是，一個 PM 怎麼自己做這件事？

老實講我自己的工程能力是有天花板的，2004 年大學時期自己架過 phpBB 2.0、WordPress 1.4 跑個人網站，會寫 HTML、CSS，但僅止於「腳本程度」的工程，PM 軌道走了十幾年（飛資得三年、91APP 十年），跟工程師合作而不是親自寫，沒練起來工程肌肉。把一個 23 年舊論壇從 phpBB 2 升到 3.3、把 WordPress 從 1.5 升到 6.9、上 VPS、配 SMTP、設備份 cron，這些事的工程深度完全超過我的個人能力。

放在 9 年前，這個專案要嘛找 freelancer 報價（預算下不去），要嘛無限期延後（事實上就是延後了 11 年）。Claude Code 這類 AI pair programming 工具讓第三條路變可能，自己學、自己決定、自己驗收，工程深度由 AI 補足。這篇文章想記錄的就是這條第三條路的實際長相，包括能委託什麼、必須親自做什麼，以及一個沒料到的副產品，這個專案後來意外長出了 `/seer` skill。

## 一個 PM 的工程能力天花板

技術素養和工程能力是兩回事，前者是「我懂這個技術在做什麼」，後者是「我能寫出 production-ready 的實作」，我屬於前者，後者沒練起來。

具體一點，我能做的事情其實很有限。HTML、CSS 我寫得來，看得懂簡單的 SQL（SELECT、INSERT、JOIN 那種程度）、看 phpBB 的 ACP 設定畫面我知道每個欄位對應後端哪張 table，這些都還可以。但 Dockerfile 我老實讀不懂，docker-compose.yaml 沒有 AI 在旁邊我大概不想碰，SQL migration 腳本要看半天加 Google 才能拼湊出在做什麼，Nginx config 我從來沒實際設定過。Traefik、Let's Encrypt、systemd unit、cron timezone 這些東西，我聽過名字、知道大概用途，但要動手寫的話腦袋一片空白。

這個落差就是所謂技術素養和工程能力的縫，過去十幾年沒收起來，主要原因是它的 ROI 不值得。我的本職是 PM，把工程能力練起來不會讓我升職、不會讓我做更好的產品決策，反而會吃掉本來該花在商業判斷、市場研究、stakeholder 溝通的時間。Side project 偶爾跑一下，但要把一個 23 年舊論壇救起來這種規模的專案，自己練到能做的程度大概要兩三年。

Claude Code 改變的就是這件事，我不需要練到能寫 production code，只需要保留讀得懂、判斷得出對錯、能驗收這個層級就夠了，剩下的執行交給 AI。

## 為什麼是 Claude Code

2026 年 AI 寫程式的工具已經有十幾種，從 GitHub Copilot 補完式、Cursor IDE 整合式，到 Devin、Manus 這種號稱 autonomous 的 agent。我選 Claude Code 主要有三個原因。

第一是工作節奏。Claude Code 是 CLI 工具，跑在 terminal 裡，每一步它都會跟我確認，看到了什麼、要做什麼、預期結果是什麼，這跟我作為 PM 跟工程師合作的節奏非常像。autonomous agent 那種給目標讓它跑的模式我也試過，速度快但失控感強，對 phpbb-restore 這種資料完整性比速度重要的專案不適合。

第二是 context 控制。Claude Code 直接在 local repo 工作，我可以用 `.claude/` 目錄把專案的計畫文件、決策紀錄、memory 都放進去，每次新 session 它都讀得到。這對長專案很重要，phpbb-restore 跨了一個多月、中間幾百次 session，每次都要它記得 eq2 用 `phpbb3_` prefix、eq 用 `phpbb_` prefix 這類細節，沒有 persistent memory 的工具每次都要重新 onboarding，效率差太多。

第三是模型品質。phpbb-restore 中遇到的問題很多是 niche 老技術，phpBB 2 的 BIG5 編碼處理、WordPress 4.2 的 utf8mb4 轉換、PHP 5.6 在 arm64 上的相容性，這類問題需要的是廣度知識和耐心 debug，Claude 在這方面表現比其他模型穩。

預算上 Claude Code 月費可預期，比 freelancer 計時收費可控；學習價值上，每一步技術決策我都在現場，看 AI 怎麼挖、怎麼比對、怎麼下結論，整個專案做完之後 Docker、Traefik、phpBB 內部結構、WordPress 升級鏈這些東西我都摸熟了。

## Phase 0 到 7 的實際工作分解

整個專案分成 8 個 phase，從 4 月初開始到 5 月中段大致跑完，後段 Bluehost 退場規畫拖到 6 月。

**Phase 0 與 0.5** 是資料保全和環境準備，先 SSH 進 Bluehost cPanel home 把 phpBB 兩站的所有檔案、資料庫 dump 全部下載到本機，然後在 Mac 上用 Colima 跑 x86_64 emulation，建立 PHP 5.6 加 MySQL 5.7 的環境。

**Phase 1** 是 phpBB 核心升級鏈，eq2 站照官方升級路徑跑 3.0.14 → 3.1.12 → 3.2.11 → 3.3.15 最後切到 PHP 8.1，eq 站體量小可以直接 3.0 跳 3.3。

**Phase 2 與 2.5** 是樣式和語言包，公會原本用一套叫 tsm 的子樣式要遷移到 3.3 的子樣式系統，語言包另外從官方繁中包補進缺失的 1,800 多個 key 到 zh_cmn_hant，做 12 路徑佔位符掃描確認 0 漏翻，順手清掉 24 個 orphan lang 檔加 102 個 macOS 隱藏檔。

**Phase 3 與 4** 是 extension 與內容調整，原本 phpBB 2 時代用過幾套 MOD（Calendar、Application Form、ALTT、WP United）到 phpBB 3.3 全部要重寫成 extension 才能跑，Calendar 改成唯讀版、Application Form 寫成獨立 extension、ALTT 評估後直接放棄，另外做了一個 sunmoon/pages 的 extension 處理退役頁面。

**Phase 5 加上 5.7 加固** 是 VPS 部署，DigitalOcean SGP1 開一台 1 GB droplet 配 Traefik v3 加 Let's Encrypt SSL，本機開發 docker-compose 跟 production docker-compose 是兩份檔案。加固環節做了專用 phpbb MySQL user 不用 root、chown 改 www-data 加 chmod 755、加每日 mysqldump cron 保留 30 天、Dockerfile 補 GD 加 opcache、給 VPS 加 2 GB swap 防 OOM。

**Phase 6** 是前端打磨，header 重構、navbar 整理、社群連結補回、ACP 的 orphan module rows 清理，Calendar 加 nav-main 連結。

**Phase 7** 是退場相關工程，7a 從 2015 dump 還原 14 篇 publish post 加 12 users 並走 4 段 WordPress schema 升級鏈 4.8 → 5.0 → 6.0 → 6.9，7b 是 EQDKP 退役改純存檔，7e 是 email 設定走 Resend SMTP relay。

每個 phase 都有對應的計畫文件、break-point 備份、驗收 gate，文件主要由 Claude Code 寫，我做最終 review 與決策。

## 能委託什麼，必須親自做什麼

整個專案的工作內容大致分成兩類，能委託 AI 做的、必須我親自做的，這個邊界對任何想用 AI pair programming 做嚴肅專案的人都很重要。

能委託的事情有很多。各種 debug 是大宗，phpBB 升級鏈跑出來的錯誤訊息、PHP 8 的 deprecation warning、MySQL 8 的 collation 衝突、Docker layer caching 失效，AI 比我快得多。SQL schema 比對與 migration 撰寫，給它兩份 dump 它能準確找出 schema diff 寫出正確的 ALTER TABLE。Docker compose 的 service 定義、volume 掛載、network 配置，給規格給範例它寫得出來。跨檔案的 search and replace、整理兩站差異、把專案 plan 整理成 markdown 文件，這些都很適合委託。

但有些事我必須親自做。第一類是涉及秘密的動作，SSH key 認證需要 1Password 桌面 app 的 Touch ID 批准我親自按指紋，密碼明文絕對不進對話 context，要塞進 .env 檔的密碼一律由我從 1Password 複製貼上，不讓 AI 看到。第二類是不可逆的決策按鈕，production cutover 的最後一步、CF DNS 切換、Bluehost cPanel 取消訂閱這種按下去就回不來的動作，都是我親自確認與執行。第三類是重大架構決策，WordPress 用獨立 DB instance 還是共用 phpBB DB（最後決定獨立避免單點故障）、EQDKP 走完整 migration 還是純存檔（決定純存檔），這些是產品判斷不是技術判斷，AI 可以給選項但拍板要我自己來。

這個邊界跟我作為 PM 在公司的工作邊界很像，工程師可以實作任何技術方案，但啟動、停止、切換這類牽動利害關係人或不可逆的動作，PM 要在現場拍板。Claude Code 的角色非常接近一個資深工程師，差別在於它沒有公司政治顧慮，但也沒有對外溝通能力。

## 6 週的時間是怎麼擠出來的

整個專案從 4 月初到 5 月中段這段是 6 週，但 6 週說的是時間跨度不是工時。

我白天還是 91APP 的本職工作，會議、報告、跨團隊協作，phpbb-restore 完全進不去白天的時段。家庭與私人生活也要顧，週末有家事與小孩活動，所以實際工時主要塞在平日晚上 21:30 到 24:00、週末傍晚等空檔，每週大概 18 到 22 小時，6 週累計 110 到 130 小時。

這個工時量級放在 freelancer 報價角度，大概對應 60K 到 80K 台幣（中段 senior 工程師 700 到 1000 元/小時計）。但對我來說，這 110 個小時換到的不只是論壇救回來，還有對 Docker、Traefik、phpBB 內部結構、WordPress 升級鏈、SMTP 配置這些技術的紮實熟悉度，這個學習價值不該歸零計算。

## 副產品 /seer skill 的誕生

這個專案最沒料到的副產品，是讓我發展出一套 dev session 與 review session 分離的工作方法，後來結晶成一個叫 `/seer` 的 Claude Code skill。

起點是 Phase 5.7 加固那個階段。當時我請 Claude Code 做一輪部署審查找出可能的安全漏洞、效能瓶頸、運維風險，它確實找出了不少問題，但麻煩的是它一邊找一邊就動手修，一份 review 文件還沒寫完它已經把 Dockerfile 改了、把 deploy.sh 改了。Review 跟 implement 混在一起的結果是，剩下的問題要嘛被遺漏要嘛被埋進已經改過的程式碼裡，後續很難回溯。

我那次明確跟 Claude Code 說，請只擔任 reviewer 把建議寫到文件，由我另開 session 用 coding agent 接手執行。產出乾淨的 review 文件之後，implement 階段我開新 session、把 review 文件當 input、一條一條處理，整個流程效率高很多。

抽象來看是這樣的，Reviewer 和 implementer 應該是不同的 session，因為 context 會污染判斷。一個剛寫完 100 行程式碼的 session，要它客觀 review 自己寫的東西沉沒成本會偏倚，把 review 拉到 fresh session 用 new context 進場才能拿到沒被作者邏輯感染的判斷。

兩天之後我把這個方法寫成 `/seer` skill，名字取自 Frank Herbert《沙丘》的 Truthsayer，能看穿表象的角色。`/seer` 後來反過來用回 phpbb-restore，Phase 7 的 Bluehost 退場文件、Phase 7a 的 WordPress 方案決策都先用 `/seer` 跑一輪 devil's advocate review，抓出計畫裡的盲點與檢驗 gate 的不一致。

這個 skill 是 phpbb-restore 的副產品，但它解決的問題遠超過 phpbb-restore 本身，所有大計畫文件先 review 再執行的場景都用得上。

## 我踩過的 AI 協作雷

整個專案中我自己踩過的雷可以分四類，值得記下來。

**過度信任** 是最大的雷。Claude Code 給的答案 80% 是對的，但剩下 20% 錯得很自然，看起來合理但跑下去會壞。早期我把它的輸出直接 copy 到 production 出過幾次包，後來建立了一個原則，凡是會動到 production 的指令一律先在 staging 跑、跑通才上線，staging 環境不嫌麻煩。

**Context 不足** 是第二類雷。我有時候請它改 phpBB 的東西沒先告訴它兩站 prefix 不同（eq2 用 `phpbb3_`、eq 用 `phpbb_`），它就按預設 `phpbb_` 寫 SQL 跑下去 eq2 站 0 row affected。後來這個 prefix 差異我寫進 memory，但更早幾次都是事後才發現，背景知識要前置給足。

**幻覺資訊不驗證** 是第三類雷。AI 會編資訊，特別是涉及具體 fact 的時候（人名、日期、版本號、歷史背景）會幻覺得理所當然。寫這個系列 #1 的開頭，AI 一開始就把公會背景幾項基礎事實全部猜錯，但寫得有模有樣，要我親自指出才修得回來。所有跟 fact 有關的內容，AI 給的版本一律當作 unverified，跟原始來源比對之後才能用。

**角色邊界混亂** 就是 `/seer` 那段提到的問題，dev session 跟 review session 不分。後來只要意識到當下需要的是 review 不是 dev，我就會主動切到新 session 用 `/seer`。

這四類雷不只是 phpbb-restore 的問題，是任何用 AI pair programming 做嚴肅專案都會遇到的，值得在工作流程裡建立對應的安全網。

## 接下來

決定救之後是怎麼自己做，怎麼自己做之後下一個問題是技術上怎麼真的把這些事接起來。系列文 #3「資料復原」會處理 phpBB 與 WordPress 的多代升級鏈、中文編碼、3,159 個附件對齊驗證，那是這 6 週裡 debug 量最大的一塊。

---

_天地日月公會論壇現在站在 [eq2.3d-olg.net/community](https://eq2.3d-olg.net/community/) 與 [eq.3d-olg.net](https://eq.3d-olg.net/)。系列文 5 篇之 #2，下一篇 #3 進技術 deep dive。_
