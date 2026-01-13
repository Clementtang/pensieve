# Pensieve 腳本工具

> 本目錄包含 Pensieve 專案的自動化腳本，用於文章管理、驗證與發布。

**最後更新：** 2026-01-13
**版本：** 1.0.0

---

## 目錄

- [快速開始](#快速開始)
- [腳本總覽](#腳本總覽)
- [new-article.js](#new-articlejs)
- [validate-article.js](#validate-articlejs)
- [publish-to-multivac.js](#publish-to-multivacjs)
- [常見問題](#常見問題)

---

## 快速開始

```bash
# 建立新文章
node scripts/new-article.js --type article --title "我的文章"

# 驗證文章
node scripts/validate-article.js docs/articles/

# 發布到 Multivac42
node scripts/publish-to-multivac.js --validate --auto-commit
```

---

## 腳本總覽

| 腳本 | 用途 | 實作版本 |
|------|------|---------|
| `new-article.js` | 從模板建立新文章 | P1-006 |
| `validate-article.js` | 驗證文章格式與 frontmatter | P0-005, P1-011 |
| `publish-to-multivac.js` | 發布文章到 Multivac42 | P0-005, P1-008, P1-018 |

---

## new-article.js

### 功能說明

從模板建立新文章，自動處理：
- 選擇正確的模板
- 生成符合規範的檔名（`YYYY-MM-DD-slug.md`）
- 預填 frontmatter（date、author、status）
- 放入正確的目錄

### 使用方式

```bash
node scripts/new-article.js --type <類型> --title <標題> [--slug <slug>]
```

### 參數說明

| 參數 | 必填 | 說明 | 範例 |
|------|------|------|------|
| `--type` | 是 | 文章類型 | `article`, `company`, `topic` |
| `--title` | 是 | 文章標題 | `"ESL 產業分析"` |
| `--slug` | 否 | 自訂 slug（預設從標題生成） | `esl-analysis` |

### 支援的文章類型

| 類型 | 模板 | 目標目錄 |
|------|------|---------|
| `article` | article-template.md | drafts/ |
| `note` | note-template.md | drafts/ |
| `memo` | research-memo-template.md | drafts/ |
| `tutorial` | tutorial-template.md | drafts/ |
| `company` | company-research-template.md | drafts/ |
| `industry` | industry-research-template.md | drafts/ |
| `topic` | topic-research-template.md | drafts/ |
| `topic-lite` | topic-research-lite-template.md | drafts/ |

### 使用範例

```bash
# 建立一般文章
node scripts/new-article.js --type article --title "零售科技趨勢"

# 建立企業研究（自訂 slug）
node scripts/new-article.js --type company --title "Airwallex 深度研究" --slug airwallex-research

# 建立快速議題研究
node scripts/new-article.js --type topic-lite --title "AI Agent 市場分析"
```

### 輸出範例

```
📝 建立新文章

類型：article
標題：零售科技趨勢
檔名：2026-01-13-零售科技趨勢.md
路徑：drafts/2026-01-13-零售科技趨勢.md

✅ 文章建立成功！

下一步：
  1. 編輯 drafts/2026-01-13-零售科技趨勢.md
  2. 完成後將 status 改為 in-progress
  3. 發布前將 status 改為 published
```

### 設計考量

- **為何放入 drafts/**：所有新文章預設為草稿狀態，避免誤發布
- **為何自動生成日期**：確保檔名符合規範，便於排序與追蹤
- **slug 生成邏輯**：移除標點、空格轉連字號、轉小寫

---

## validate-article.js

### 功能說明

驗證文章是否符合 Pensieve 規範，檢查項目包括：

1. **Frontmatter 必填欄位**：title, description, date, category, status
2. **日期格式**：YYYY-MM-DD
3. **Status 值**：draft, in-progress, published, archived
4. **Category 值**：articles, company-research, topic-research, tutorial, note, memo
5. **檔名格式**：YYYY-MM-DD-slug.md
6. **H1 標題**：檢查是否存在且唯一

### 使用方式

```bash
node scripts/validate-article.js <檔案或目錄> [選項]
```

### 參數說明

| 參數 | 說明 |
|------|------|
| `<檔案或目錄>` | 要驗證的檔案路徑或目錄 |
| `--quiet` | 只顯示錯誤，不顯示成功訊息 |

### 使用範例

```bash
# 驗證單一檔案
node scripts/validate-article.js docs/articles/2026-01-10-esl-retail-tech.md

# 驗證整個目錄
node scripts/validate-article.js docs/articles/

# 驗證所有文章（靜默模式）
node scripts/validate-article.js docs/ --quiet
```

### 輸出說明

驗證結果分為三種：

| 符號 | 說明 |
|------|------|
| ✅ | 通過所有驗證 |
| ❌ | 有錯誤（阻止發布） |
| ⚠️ | 有警告（建議修正） |

### 輸出範例

```
📂 掃描目錄：/Users/user/pensieve/docs/articles
📄 找到 15 個 Markdown 檔案

✅ docs/articles/2026-01-10-esl-retail-tech.md
❌ docs/articles/2026-01-08-ai-trends.md
   錯誤：缺少必填欄位：description
   錯誤：date 格式錯誤：應為 YYYY-MM-DD，目前為 2026/01/08
⚠️  docs/articles/2026-01-05-fintech-review.md
   警告：建議填寫 author 欄位
   警告：建議填寫 tags 欄位

---
📊 驗證摘要：
   檔案數：15
   通過：13
   錯誤：3
   警告：5
```

### 錯誤與警告定義

**錯誤（阻止發布）：**
- 缺少 YAML frontmatter
- 缺少必填欄位
- 日期格式錯誤
- status 值無效

**警告（建議修正）：**
- 檔名格式不符
- category 值不在建議清單
- 缺少 H1 標題
- 有多個 H1 標題
- 缺少 author 欄位
- 缺少 tags 欄位

### 設計考量

- **錯誤 vs 警告**：錯誤會導致退出碼為 1，可用於 CI/CD 流程
- **跳過檔案**：自動跳過 index.md 和 README.md
- **遞迴掃描**：目錄模式會遞迴掃描所有子目錄

---

## publish-to-multivac.js

### 功能說明

將 Pensieve 中標記為 `status: published` 的文章發布到 Multivac42 網站。

主要功能：
1. 掃描所有 `status: published` 的文章
2. 根據 category 決定目標目錄
3. 格式轉換（移除元資料區塊等）
4. 複製到 Multivac42
5. 可選：自動執行 git commit

### 使用方式

```bash
node scripts/publish-to-multivac.js [選項]
```

### 選項說明

| 選項 | 說明 |
|------|------|
| `--dry-run` | 只顯示會執行的操作，不實際複製 |
| `--status` | 只顯示同步狀態，不執行發布 |
| `--validate` | 發布前驗證必填欄位 |
| `--verbose` | 顯示詳細的處理過程與錯誤資訊 |
| `--auto-commit` | 發布後自動執行 git add + commit |

### 使用範例

```bash
# 查看同步狀態
node scripts/publish-to-multivac.js --status

# 預覽發布操作
node scripts/publish-to-multivac.js --dry-run

# 驗證後發布
node scripts/publish-to-multivac.js --validate

# 完整流程（驗證 + 發布 + commit）
node scripts/publish-to-multivac.js --validate --auto-commit

# 除錯模式
node scripts/publish-to-multivac.js --verbose --dry-run
```

### 分類邏輯

根據 frontmatter 的 `category` 欄位決定目標目錄：

| Category | 目標目錄 | 結構 |
|----------|---------|------|
| `articles` | docs/articles/ | 平面結構 |
| `company-research` | docs/company-research/ | 依公司分類 |
| `topic-research` | docs/topic-research/ | 平面結構 |

### 公司研究分類

公司研究會根據檔名自動分類到對應的公司資料夾：

```
docs/company-research/
├── airwallex/
│   └── 2026-01-05-airwallex-analysis.md
├── manus-ai/
│   └── 2026-01-08-manus-ai-research.md
└── luckin-coffee/
    └── 2026-01-10-luckin-expansion.md
```

### 格式轉換

發布時會自動進行以下轉換：

1. **移除元資料區塊**：刪除 `## 元資料` 章節
2. **移除最後更新標記**：刪除 `*最後更新：...*`
3. **補充 lastModified**：自動填入檔案修改時間
4. **補充 author**：若無則填入預設作者

### 輸出範例

```
🧠 Pensieve → Multivac42 發布腳本

📊 同步狀態：

📝 新文章待發布 (2 篇)：
   - ESL 零售科技趨勢
   - AI Agent 市場分析

🔄 已修改待更新 (1 篇)：
   - Airwallex 深度研究

---

📤 開始發布 3 篇文章...

   處理：ESL 零售科技趨勢
   來源：docs/articles/2026-01-10-esl-retail-tech.md
   目標：docs/articles/2026-01-10-esl-retail-tech.md
   ✅ 完成

   ...

---
✅ 發布完成！成功處理 3 篇文章。

🔄 執行自動 Git Commit...

   ✅ Git commit 完成：發布/更新 3 篇文章

下一步：
  cd ~/multivac42
  git push
```

### 錯誤處理

腳本提供詳細的錯誤追蹤與報告：

```
📋 錯誤摘要（共 2 個）：

   ❌ [FILE_READ] docs/articles/broken-file.md
      無法讀取檔案
      詳細：ENOENT: no such file or directory

   ❌ [FRONTMATTER] docs/articles/no-yaml.md
      檔案缺少 YAML frontmatter（--- 區塊）
```

### 設計考量

- **安全性**：使用 `execFileSync` 而非 `execSync` 避免 shell injection
- **不自動 push**：避免意外推送，讓使用者保留最終確認權
- **錯誤不中斷**：單一檔案失敗不會中斷整個發布流程
- **詳細日誌**：`--verbose` 模式提供完整的處理過程追蹤

---

## 常見問題

### Q: 為什麼發布後需要手動 push？

A: 設計上刻意不自動 push，原因：
1. 讓使用者有機會在 M42 檢視變更
2. 避免意外推送敏感內容
3. 可以在 push 前合併多次發布

### Q: 如何處理發布驗證失敗？

A:
1. 執行 `node scripts/validate-article.js <檔案>` 查看詳細錯誤
2. 修正 frontmatter 中的問題
3. 重新執行發布

### Q: 新文章建立後找不到？

A: 新文章預設放在 `drafts/` 目錄，請檢查該目錄。

### Q: 如何批次驗證所有文章？

A: 執行 `node scripts/validate-article.js docs/ --quiet` 可快速掃描所有文章。

---

## 相關文件

- [發布工作流程](../docs/guides/publishing-workflow.md)
- [寫作規範](../WRITING_GUIDE.md)
- [標籤分類法](../docs/taxonomy.md)
- [優化 Backlog](../docs/roadmap/optimization-backlog.md)
