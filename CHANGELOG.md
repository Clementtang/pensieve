# Changelog

本文件記錄 Pensieve 專案的所有重要變更。

格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
版本號遵循 [語意化版本](https://semver.org/lang/zh-TW/)。

## [Unreleased]

### Added
- VitePress 網站架構
- 自動化 PR 驗證流水線
- Research Memo 行動工作流模板
- **優化 Backlog 追蹤文件** (`docs/roadmap/optimization-backlog.md`)
  - 識別 19 項優化項目（P0: 2, P1: 10, P2: 7）
  - 涵蓋：模板與結構、工作流程、品質標準、自動化潛力、技術債務

- **P0-001：清理目錄結構不一致**
  - 建立 `docs/notes/` 目錄與 index.md
  - 刪除空目錄 `docs/business-development/`
  - 遷移 `content/` 文章至 `docs/articles/`

- **P0-005：發布前驗證機制**
  - 新增 `scripts/validate-article.js` 驗證腳本
  - 整合至發布腳本：`publish-to-multivac.js --validate`
  - 驗證項目：必填欄位、日期格式、檔名格式

- **P1-002：模板使用文件化**
  - `templates/README.md` 新增快速選擇指南
  - 依內容類型與時間預算的決策樹

- **P1-003：更新 README.md**
  - 版本資訊更新至 v1.4.0
  - 目錄結構新增 notes/、roadmap/、scripts/

- **P1-006：模板初始化腳本**
  - 新增 `scripts/new-article.js`
  - 支援 8 種模板類型
  - 自動生成檔名與預填 frontmatter

- **P1-010：標籤分類法標準化**
  - 新增 `docs/taxonomy.md`
  - 定義內容類型、產業、主題、公司標籤分類

- **P1-015：研究提示詞模板**
  - 新增 `prompts/` 目錄
  - 企業研究、新聞分析、社群貼文提示詞模板

## [1.4.0] - 2026-01-12

### Added
- **商業寫作風格章節** (WRITING_GUIDE.md)
  - 敘事性寫作技巧
  - 避免過度使用列點指南
  - 金句與比喻使用建議
  - 段落過渡技巧
  - 商業寫作檢查清單

- **強化句型改寫指引**
  - 新增 5 種具體改寫方式（直述句、轉折句、因果邏輯、讓步轉折、強調主語）
  - 提供更多實際範例

- **統一 Frontmatter 欄位**
  - 所有模板新增 YAML frontmatter
  - 統一使用 `status` 欄位取代 `publish`
  - 狀態值：draft / in-progress / published / archived

- **Topic-Research Lite 模板** (`templates/topic-research-lite-template.md`)
  - 5 部分精簡框架（原 10 部分）
  - 目標字數：3,000-8,000 字（原 15,000-50,000 字）
  - 適合快節奏議題探討和初步研究
  - 新增版本選擇指南（決策樹）

### Removed
- `docs/.writing-guidelines.md`（內容已合併至 WRITING_GUIDE.md）
- `publish` 欄位（由 `status` 取代）

### Changed
- WRITING_GUIDE.md 更新至 v1.4.0
  - 整合 .writing-guidelines.md 的獨特內容
  - 更新 Frontmatter 欄位說明
  - 更新目錄結構

- 發布腳本 (`scripts/publish-to-multivac.js`)
  - 改用 `status: published` 觸發發布（原 `publish: true`）

- 所有模板更新
  - 新增統一 YAML frontmatter
  - 移除 `publish` 欄位，改用 `status`

- 遷移現有文章（19 篇）
  - `publish: true` → `status: published`

## [1.3.0] - 2025-12-31

### Added
- **產業研究模板** (`templates/industry-research-template.md`)
  - 7 大章節結構：市場概況、價值鏈、技術架構、競爭格局、應用案例、商業模式、未來展望
  - 專為產業/技術/市場深度研究設計
  - 目標達到市調/顧問公司研究報告水準

- **發布腳本 category 分類支援**
  - 根據 frontmatter `category` 欄位決定 M42 目標目錄
  - Pensieve 可保持平面結構，發布時自動分類至正確位置
  - 支援三種 category：`articles`、`company-research`、`topic-research`

### Changed
- **WRITING_GUIDE.md** 更新至 v1.3.0
  - 新增「產業研究（Topic Research）」文章類型規範
  - 新增 Category 對應的 M42 目標目錄說明表
  - 區分產業研究（industry-research）與議題研究（topic-research）

- **發布腳本** (`scripts/publish-to-multivac.js`)
  - 重構目標路徑邏輯：從目錄結構改為 category 欄位決定
  - 新增 `inferCategoryFromPath()` 函數作為 fallback
  - 新增 `CATEGORY_CONFIG` 設定物件

- **模板說明** (`templates/README.md`)
  - 新增 `industry-research-template.md` 說明
  - 區分產業研究模板與議題研究模板的適用場景

## [1.2.0] - 2025-12-31

### Added
- **Pensieve → Multivac42 發布系統**
  - 發布腳本 (`scripts/publish-to-multivac.js`)
  - 格式轉換：移除元資料區塊、自動補充 lastModified
  - 公司研究依公司名稱分類、其他類型平面結構
  - 支援 `--dry-run` 和 `--status` 選項

- **Frontmatter 發布欄位規範**
  - `publish: true/false` 控制是否發布
  - `category` 欄位決定文章分類
  - `lastModified` 自動補充

### Changed
- WRITING_GUIDE.md 新增發布到 Multivac42 規範

## [1.1.0] - 2025-12-30

### Added
- 台灣繁體中文用語規範表（18 組詞彙對照）
- 句型避免指南（避免「不是 X，而是 Y」句型）
- 版本化標準文件管理

### Changed
- WRITING_GUIDE.md 新增用語規範章節

## [1.0.0] - 2025-11-20

### Added
- 初始 WRITING_GUIDE.md 寫作規範
- CONTRIBUTING.md 貢獻指南
- 基礎模板系統
  - article-template.md（文章模板）
  - company-research-template.md（企業研究模板）
  - topic-research-template.md（議題研究模板）
  - tutorial-template.md（教學模板）
  - note-template.md（筆記模板）
- GitHub PR 模板
- 專案基礎結構

---

[Unreleased]: https://github.com/Clementtang/pensieve/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/Clementtang/pensieve/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/Clementtang/pensieve/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/Clementtang/pensieve/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Clementtang/pensieve/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Clementtang/pensieve/releases/tag/v1.0.0
