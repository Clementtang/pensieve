# Pensieve 專案審查（2026-06-29）

Profile: tech（PM / 架構師 / 程式設計師三角色輪替）
Target: 整個 Pensieve 專案現況（無單一決策文件，故採 standalone review file）
Scope: 工作區狀態、發布管線程式碼、驗證 gate、內容檔案治理

---

## 1. 根目錄孤兒檔案 `路易莎咖啡_LOUISA_COFFEE_公司研究報告.md`

> **架構師**：作者假設這份路易莎研究報告「放著就好」，但它同時違反專案三條既定慣例，且落在所有自動化 gate 之外。
>
> **反證**：
>
> - 檔名為中文 — 直接違反使用者自己的 `~/.claude/rules/coding-style.md`：「All filenames must be in English — no Chinese or other non-ASCII characters」。其餘 11 份 company-research 全部是 `YYYY-MM-DD-english-slug.md`（如 `docs/company-research/2025-11-28-luckin-coffee-research.md`）。
> - 位置在 repo 根目錄，而非 `docs/company-research/`。`publish-to-multivac.yml` 的 `paths` 只含 `docs/articles/**`、`docs/company-research/**`、`docs/topic-research/**` — 此檔永遠不會被發布。
> - 檔案開頭是 `# 路易莎咖啡...` 加 `>` blockquote，**沒有 YAML frontmatter**。若搬進 `docs/`，`validate-article.js:129` 會直接判 error。
> - `npm run lint` glob 為 `docs/**` + `drafts/**`，`npm run validate` 只跑 `docs/` — 根目錄此檔同時逃過 lint 與 validate 兩道 gate。
>
> **影響**：違反「Pensieve 是唯一編輯來源 + 單一管線發布」的核心架構原則 — 出現一份既不受治理、也無法發布、檔名又破壞 terminal 工具相容性的內容。每個 reviewer / 未來的自己看到根目錄這個檔都得重新判斷它是什麼狀態。
>
> **修法**：補上 frontmatter（title/description/date/category: company-research/status），改名為 `docs/company-research/2025-12-02-louisa-coffee-research.md`，或若不打算發布則移入 `private/`（已 gitignore）。三選一，但別留在根目錄。
>
> **Severity**: HIGH

---

## 2. 工作區未提交的刪除與已發布 CHANGELOG 矛盾

> **PM**：作者假設工作區那 6 個 `D drafts/2026-05-*-phpbb-restore-*.md` 刪除是「之後再說」的暫存狀態，但它與已釋出的 v1.8.0 CHANGELOG 直接矛盾。
>
> **反證**：CHANGELOG `## [1.8.0]` 明列「**phpBB Restore 系列納入版控**：outline + 5 篇草稿進 `drafts/`」（已 release、已打 tag v1.8.0）。但 `git status` 顯示 outline + 5 篇全部 `D`（已從工作區刪除、未提交），`drafts/` 現在只剩 `memo-gemini-spark.md` 與 `README.md`。`## [Unreleased]` 完全沒提到這次移除。
>
> **影響**：(a) 髒工作區跨 session 被攜帶，下次任何 `git add -A` 會把刪除一起帶進不相關的 commit；(b) 已發布版本宣稱存在的內容在 HEAD 工作區消失，狀態說不清是「刻意下架」還是「誤刪未還原」；(c) reviewer 看 diff 會誤判系列文還在。
>
> **修法**：先決定意圖 —— 若刻意移除，`git rm` 後在 `## [Unreleased] > Removed` 記一筆並 commit；若誤刪，`git checkout -- drafts/2026-05-*phpbb*`。不要讓它無限期掛在工作區。
>
> **Severity**: HIGH

---

## 3. 手刻 YAML parser 的 round-trip 損壞風險

> **程式設計師**：作者假設 `scripts/lib/frontmatter.js` 這套自製 parser「夠用就好、不必引 js-yaml」，但 generate 端有一個會默默產出非法 YAML 的真實 bug。
>
> **反證**：`frontmatter.js:181-186` —— 當字串值含 `"` 時，程式用雙引號包起來卻**不轉義內部引號**：值 `say "hi"` 會被輸出成 `key: "say "hi""`，這是非法 YAML。回讀時 `parseFrontmatter:125-130` 只剝外層引號，round-trip 後資料毀損。`--fix` 模式（`validate-article.js:291`）與發布管線都會呼叫 `generateFrontmatter` 重寫檔案，等於把這個風險埋在「自動修復」路徑上。此外此 parser 不支援巢狀物件、`#` 註解、多行字串 —— 約 150 行手刻邏輯重造了 js-yaml/gray-matter 既有的輪子。
>
> **影響**：description / title 含引號（中文研究報告引用名言、產品名很常見）時，`--fix` 或發布重寫會悄悄破壞 frontmatter，而現有 25 個 frontmatter 測試未涵蓋「含雙引號值的 generate round-trip」，CI 不會擋。
>
> **修法**：短期 —— 在 `generateFrontmatter` 對含 `"` 的值改用單引號或轉義，並補一個 round-trip 測試（parse(generate(x)) === x，x 值含引號）。中期 —— 評估換成 `gray-matter`（devDep 仍可保持精簡），刪掉手刻 parser。
>
> **Severity**: MEDIUM

---

## 4. 驗證 gate 的覆蓋落差

> **架構師**：作者假設「lint + validate + test 三道 CI gate」已覆蓋所有內容，但 glob 範圍其實留了兩個洞。
>
> **反證**：
>
> - `validate.yml` 只跑 `npm run validate -- docs/`，**不含 `drafts/`**；但 lint 同時涵蓋 `docs/**` 與 `drafts/**`（`package.json:10`）。drafts 的 frontmatter 從沒被 validate 檢查過，直到搬進 docs 才第一次受檢。
> - 根目錄 `.md`（含第 1 項的路易莎檔）不在任何 glob 內。
>
> **影響**：草稿階段的 frontmatter 錯誤（缺 status、date 格式錯）累積到搬進 docs 那一刻才爆，而那通常正是要發布的時候 —— gate 在最不該失敗的時點失敗。
>
> **修法**：對 drafts 增設較寬鬆的 validate（或至少 `validate -- drafts/ --quiet` 不阻擋只警告）；根目錄若不該有內容檔，加一個 CI 檢查擋掉 `*.md`（白名單 README/CHANGELOG/CONTRIBUTING/WRITING_GUIDE）。
>
> **Severity**: MEDIUM

---

## 5. 兩份 category 常數清單不一致

> **程式設計師**：作者假設 `validate-article.js` 裡 category 的「合法值」與「目錄推斷」兩張表是同步的，實際上對不齊。
>
> **反證**：`VALID_CATEGORIES`（L32-39）= articles, company-research, topic-research, tutorial, **note**, **memo**。`DIR_CATEGORY_MAP`（L62-68）key = articles, company-research, topic-research, **notes**, tutorial。差異：(a) valid 用 `note`，map 的目錄名是 `notes`；(b) `memo` 是 valid category 但 map 完全沒有對應目錄 → 放在任何目錄的 memo 都無法被 `--fix` 自動補 category。
>
> **影響**：`--fix` 的「從路徑推斷 category」對 memo 類永遠失效，使用者得手動補；兩張表各自演化，未來新增類別時極易再次漏改一邊（DRY 違反）。
>
> **修法**：以單一 source of truth 定義 `category → 目錄名` 對應，VALID_CATEGORIES 由它推導；補上 memo 的目錄對應或從 valid 清單移除。
>
> **Severity**: LOW

---

## 6. 其他低風險整理項

> **PM**：以下不阻擋任何流程，但屬於「乾淨度」債務，順手處理可降低長期雜訊。
>
> **反證 / 清單**：
>
> - `docs/company-research/.DS_Store` 等實體存在於工作目錄（已被 gitignore、未追蹤，無害但雜亂）。
> - `.github/workflows/claude-code-review.yml` 保留大段註解掉的 template 區塊（paths / author filter），純 boilerplate 噪音。
> - `## [Unreleased]` 目前只記錄 tag 與 compare 連結補齊；第 2 項的 drafts 變動若確定，應一併入帳。
>
> **影響**：累積的小雜訊讓 `git status`、CI 設定檔、CHANGELOG 的訊噪比下降，review 時得多花心力辨識「這是不是重要的」。
>
> **修法**：清掉 workflow 註解 boilerplate；`.DS_Store` 已忽略可不管或 `find . -name .DS_Store -delete`。
>
> **Severity**: LOW

---

## 審查摘要（2026-06-29）

測試現況：`npm test` 109 passed（3 檔），CI gate 結構健全 —— 以下為結構與治理面，非測試失敗。

### 最高風險 TOP 3

| #   | 項目                                        | Severity | 一句話說明                                                            |
| --- | ------------------------------------------- | -------- | --------------------------------------------------------------------- |
| 1   | 根目錄中文檔名孤兒檔 `路易莎...報告.md`     | HIGH     | 違反 English-filename 規則、無 frontmatter、逃過所有 gate、永不可發布 |
| 2   | phpBB drafts 未提交刪除 vs 已發布 CHANGELOG | HIGH     | 髒工作區跨 session 攜帶，且與 v1.8.0 宣稱內容矛盾                     |
| 3   | 手刻 YAML parser round-trip 損壞            | MEDIUM   | 含引號的值經 `--fix`/發布重寫會默默產出非法 YAML，測試未覆蓋          |

### 建議刪除或簡化

| 項目                                     | 建議                                        | 節省資源                                    |
| ---------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `scripts/lib/frontmatter.js` 手刻 parser | 評估換 `gray-matter`，刪 ~150 行            | 移除自製 parser 的長期維護與 edge-case 風險 |
| 根目錄路易莎檔                           | 移入 `docs/company-research/` 或 `private/` | 消除孤兒內容、恢復單一來源原則              |
| workflow 註解 boilerplate                | 刪掉 commented-out 區塊                     | 降低設定檔噪音                              |

### 建議調整的執行順序

1. 先處理工作區髒狀態（第 2 項）—— 決定 phpBB drafts 去留並 commit，讓 `git status` 乾淨後再動其他。
2. 處置路易莎孤兒檔（第 1 項）—— 改名 + 補 frontmatter 搬進 docs，或移入 private。
3. 修 `generateFrontmatter` 引號 bug + 補 round-trip 測試（第 3 項）—— 低成本、擋住自動修復路徑的資料損壞。
4. 收斂 category 兩張表為單一 source of truth（第 5 項），順手補 drafts validate 與根目錄 gate（第 4 項）。
5. 最後做低風險整理（第 6 項）。
