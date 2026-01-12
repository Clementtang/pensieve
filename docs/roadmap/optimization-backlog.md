# Pensieve 優化 Backlog

> 追蹤 Pensieve 框架的優化項目，目標是建立可重複、可自動化的內容產出流程。

**建立日期：** 2026-01-12
**最後更新：** 2026-01-12
**版本：** 1.0.0

---

## 專案願景

**短期目標：** 半自動化（Claude 輔助）— 人類主導研究方向與品質把關，AI 執行結構化任務
**長期目標：** 全自動化（Agent 驅動）— AI 自主完成從選題到發布的完整流程

---

## 優先級定義

| 等級 | 定義 | 標準 |
|------|------|------|
| **P0** | 阻礙核心工作流 | 不處理會影響日常使用 |
| **P1** | 顯著提升效率 | 處理後可節省重複工作 |
| **P2** | 錦上添花 | 改善體驗但非必要 |

---

## 一、模板與結構

### P0-001：清理目錄結構不一致

**問題描述：**
- `docs/notes/` 在 `docs/README.md` 中提及但目錄不存在
- `docs/business-development/` 為空目錄（僅有 .DS_Store）
- `content/` 目錄用途不明（僅一個檔案）

**影響範圍：** 目錄結構混亂，新內容不知該放哪裡

**建議方案：**
1. 建立 `docs/notes/` 並新增 index.md
2. 決定 `docs/business-development/` 去留（刪除或定義用途）
3. 將 `content/` 的檔案遷移至正確位置後刪除該目錄

**涉及檔案：**
- `docs/README.md`
- `docs/notes/index.md`（新增）
- `docs/business-development/`（待決定）
- `content/`（待遷移）

---

### P1-002：模板使用文件化

**問題描述：**
目前有 8 個模板，但使用時機和選擇邏輯散落各處。

**影響範圍：** 新文章選擇模板時需要翻閱多個文件

**建議方案：**
建立模板決策樹，整合至 `templates/README.md`：

```
新內容類型？
├── 快速記錄（< 1000 字）→ note-template / research-memo-template
├── 教學指南 → tutorial-template
├── 文章分析（一般主題）→ article-template
├── 企業研究（單一公司）→ company-research-template
├── 產業研究（多公司/產業）→ industry-research-template
└── 議題研究（複雜問題）
    ├── 1-2 週 → topic-research-lite-template
    └── 4-8 週 → topic-research-template
```

**涉及檔案：**
- `templates/README.md`

---

### P1-003：README.md 版本資訊過時

**問題描述：**
`README.md` 顯示「寫作規範版本：v1.1.0」，但實際已是 v1.4.0

**影響範圍：** 資訊不一致，降低文件可信度

**建議方案：**
1. 更新版本號至 v1.4.0
2. 更新「最後更新」日期
3. 考慮從 README 移除版本號，改為連結至 CHANGELOG

**涉及檔案：**
- `README.md`

---

### P2-004：private 目錄管理規範

**問題描述：**
`private/` 目錄用於敏感內容但缺乏管理規範。目前有：
- 3 個頂層 .md 檔案
- 1 個 `company-research/` 子目錄

**影響範圍：** 私有內容組織混亂

**建議方案：**
1. 定義 `private/` 的子目錄結構（對應 `docs/` 結構）
2. 建立 `private/README.md` 說明用途與規範
3. 遷移現有檔案至正確子目錄

**涉及檔案：**
- `private/README.md`（新增）
- `private/` 下現有檔案（遷移）

---

## 二、工作流程

### P0-005：發布前驗證機制

**問題描述：**
`publish-to-multivac.js` 僅檢查 `status: published`，不驗證內容品質。

**影響範圍：** 可能發布不完整或格式錯誤的文章

**建議方案：**
新增發布前驗證：
1. Frontmatter 必填欄位檢查（title, description, date, category, status）
2. 檔名格式驗證（YYYY-MM-DD-slug.md）
3. 基本結構檢查（至少有 H1 標題）
4. 可選：字數下限檢查

**涉及檔案：**
- `scripts/publish-to-multivac.js`
- `scripts/validate-article.js`（新增）

---

### P1-006：模板初始化腳本

**問題描述：**
建立新文章需手動複製模板、修改檔名、填寫 frontmatter。

**影響範圍：** 重複性操作，容易出錯

**建議方案：**
建立 CLI 工具：
```bash
node scripts/new-article.js --type article --title "我的文章" --slug my-article
```

功能：
1. 自動選擇模板
2. 生成正確檔名（含日期）
3. 預填 frontmatter（date, author, status: draft）
4. 放入 `drafts/` 目錄

**涉及檔案：**
- `scripts/new-article.js`（新增）

---

### P1-007：Research Memo 工作流驗證

**問題描述：**
README 描述了 Web↔CLI 工作流，但尚未實際驗證流程可行性。

**影響範圍：** 行動端研究流程可能有問題

**建議方案：**
1. 實際測試一次完整流程（手機端建立 memo → CLI 端擴展為完整文章）
2. 記錄遇到的問題與解決方案
3. 更新 README 或建立專門的 workflow 文件

**涉及檔案：**
- `docs/workflows/mobile-research-workflow.md`（新增）

---

### P1-008：M42 同步自動化

**問題描述：**
目前 M42 同步需手動執行腳本 + git 操作。

**影響範圍：** 發布流程繁瑣

**建議方案：**
選項 A：整合 git 操作至腳本
```bash
node scripts/publish-to-multivac.js --auto-commit
```

選項 B：GitHub Actions 自動化
- Pensieve main branch 更新時自動觸發
- 自動同步至 M42

**涉及檔案：**
- `scripts/publish-to-multivac.js`
- `.github/workflows/sync-to-m42.yml`（新增，選項 B）

---

### P2-009：草稿生命週期管理

**問題描述：**
`drafts/` 目錄缺乏清理機制，可能累積過多未完成草稿。

**影響範圍：** 草稿管理混亂

**建議方案：**
1. 建立草稿清理腳本（列出超過 30 天未更新的草稿）
2. 定期提醒機制（可整合至 Claude hooks）

**涉及檔案：**
- `scripts/review-drafts.js`（新增）

---

## 三、品質標準

### P1-010：標籤分類法標準化

**問題描述：**
標籤使用無統一規範，同概念可能有不同寫法。現有文章標籤範例：
- `["零售科技", "電子標籤", "ESL", "數位轉型"]`
- `["企業研究", "Airwallex", "金融科技", "跨境支付"]`

**影響範圍：** 標籤不一致，難以分類和搜尋

**建議方案：**
1. 建立標籤分類法文件 `docs/taxonomy.md`
2. 定義主分類（企業研究、產業研究、技術分析...）
3. 定義標準標籤格式（中文 vs 英文、大小寫）
4. 可選：標籤驗證腳本

**涉及檔案：**
- `docs/taxonomy.md`（新增）
- `WRITING_GUIDE.md`（新增標籤規範章節）

---

### P1-011：Frontmatter 驗證腳本

**問題描述：**
Frontmatter 欄位已標準化（v1.4.0），但缺乏自動驗證。

**影響範圍：** 欄位可能遺漏或格式錯誤

**建議方案：**
建立驗證腳本：
```bash
node scripts/validate-frontmatter.js [file|directory]
```

驗證項目：
1. 必填欄位存在（title, description, date, category, status）
2. 日期格式正確（YYYY-MM-DD）
3. status 值合法（draft/in-progress/published/archived）
4. category 值合法

**涉及檔案：**
- `scripts/validate-frontmatter.js`（新增）

---

### P2-012：內容品質檢查清單

**問題描述：**
WRITING_GUIDE.md 有規範但缺乏可執行的檢查清單。

**影響範圍：** 發布前品質把關依賴人工記憶

**建議方案：**
在 WRITING_GUIDE.md 新增「發布前檢查清單」：
- [ ] Frontmatter 完整
- [ ] 標題層級正確（只有一個 H1）
- [ ] 連結可用
- [ ] 無錯字（建議工具）
- [ ] 遵循台灣用語規範
- [ ] 字數符合模板建議

**涉及檔案：**
- `WRITING_GUIDE.md`

---

### P2-013：Markdown Linting

**問題描述：**
無自動化 Markdown 格式檢查。

**影響範圍：** 格式問題需人工檢查

**建議方案：**
1. 新增 `.markdownlint.yml` 配置
2. 整合至 pre-commit hook 或 CI

**涉及檔案：**
- `.markdownlint.yml`（新增）
- `package.json`（新增 lint 腳本）

---

## 四、自動化潛力

### P1-014：Claude Hooks 整合

**問題描述：**
Claude Code 支援 hooks 機制，可用於自動化品質把關。

**影響範圍：** 可在 AI 協作過程中自動執行檢查

**建議方案：**
設計以下 hooks：
1. **文章完成 hook**：自動執行 frontmatter 驗證
2. **發布前 hook**：檢查必填欄位、格式
3. **提醒 hook**：定期提醒未完成草稿

**涉及檔案：**
- `.claude/hooks/`（新增目錄）
- `.claude/settings.local.json`（更新）

---

### P1-015：研究提示詞模板

**問題描述：**
與 Claude 協作研究時缺乏標準化提示詞。

**影響範圍：** 每次研究需重新構建提示詞

**建議方案：**
建立提示詞模板庫：
- 企業研究起始提示
- 產業分析起始提示
- 競品比較提示
- 財務分析提示

**涉及檔案：**
- `prompts/company-research-prompt.md`（新增）
- `prompts/industry-analysis-prompt.md`（新增）
- `prompts/README.md`（新增）

---

### P2-016：參考資料管理

**問題描述：**
研究文章的參考資料目前以純文字列出，無結構化管理。

**影響範圍：** 難以追蹤引用來源、更新連結

**建議方案：**
1. 定義參考資料格式規範
2. 考慮建立引用資料庫（JSON/YAML）
3. 可選：連結有效性檢查腳本

**涉及檔案：**
- `WRITING_GUIDE.md`（新增參考資料規範）
- `scripts/check-links.js`（新增，可選）

---

### P2-017：內容摘要自動生成

**問題描述：**
description 欄位目前手動撰寫。

**影響範圍：** 可能與內容不符或遺漏

**建議方案：**
- 短期：建立 description 撰寫指南
- 長期：使用 LLM 自動生成建議

**涉及檔案：**
- `WRITING_GUIDE.md`（新增 description 指南）

---

## 五、技術債務

### P1-018：發布腳本錯誤處理強化

**問題描述：**
`publish-to-multivac.js` 錯誤處理較簡單，例如：
- YAML 解析失敗時無詳細錯誤訊息
- 檔案寫入失敗時無 rollback

**影響範圍：** 發布失敗時難以診斷

**建議方案：**
1. 新增詳細錯誤訊息
2. 新增 `--verbose` 模式
3. 新增錯誤摘要報告

**涉及檔案：**
- `scripts/publish-to-multivac.js`

---

### P2-019：測試覆蓋

**問題描述：**
腳本無單元測試。

**影響範圍：** 修改腳本時可能引入 bug

**建議方案：**
1. 建立測試框架（Jest/Vitest）
2. 為 `publish-to-multivac.js` 的核心函數寫測試
3. 新增 CI 執行測試

**涉及檔案：**
- `tests/`（新增目錄）
- `package.json`（新增測試配置）

---

## 執行追蹤

### 已完成

| ID | 項目 | 完成日期 | 備註 |
|----|------|---------|------|
| - | 合併寫作指南 | 2026-01-12 | v1.4.0 |
| - | 統一 Frontmatter | 2026-01-12 | v1.4.0 |
| - | Topic-Research Lite | 2026-01-12 | v1.4.0 |
| P0-001 | 清理目錄結構不一致 | 2026-01-12 | 建立 notes/、遷移 content/、刪除空目錄 |
| P0-005 | 發布前驗證機制 | 2026-01-12 | validate-article.js + publish --validate |

### 進行中

| ID | 項目 | 開始日期 | 負責人 |
|----|------|---------|--------|
| - | - | - | - |

### 待處理

| 優先級 | 數量 |
|-------|------|
| P0 | 0 |
| P1 | 10 |
| P2 | 7 |

---

## 更新記錄

| 日期 | 版本 | 更新內容 |
|------|------|---------|
| 2026-01-12 | 1.0.0 | 初始版本，識別 19 項優化項目 |
| 2026-01-12 | 1.1.0 | 完成 P0-001、P0-005 |

---

*本文件隨專案演進持續更新。*
