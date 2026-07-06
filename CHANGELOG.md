# Changelog

本文件記錄 Pensieve 專案的所有重要變更。

格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
版本號遵循 [語意化版本](https://semver.org/lang/zh-TW/)。

## [Unreleased]

## [1.9.0] - 2026-07-07

### Added

- **發布管線新增文章圖片同步**：`publish-to-multivac.js` 加 `syncImages()`，把 Pensieve `docs/public/images/` 複製到 M42 對應目錄（只增修、不刪 orphan），使圖片也納入 Pensieve 單一來源、不再需手動放 M42。同步獨立於文章變更（early-return 前先跑），`--auto-commit` 下「只改圖」也會 commit（抽出 `commitMultivac()` helper 共用）。phpBB Restore 系列 3 張特色圖已納入 `docs/public/images/posts/phpbb-restore/`。新增 6 個 `syncImages` 測試（新增/覆寫/略過/不刪 orphan/dry-run/來源不存在）。
- **路易莎咖啡研究報告正式發布**：原為根目錄中文檔名、無 frontmatter 的孤兒檔（違反 English-filename 規則且逃過所有 lint/validate gate）。改名為 `docs/company-research/2025-12-02-louisa-coffee-research.md`、補齊 frontmatter（`status: published`）、`markdownlint --fix` 修正 57 處 MD032，經 pipeline 發布到 M42 `company-research/louisa-coffee/`。`COMPANY_MAPPING` 新增 `louisa → louisa-coffee` 使資料夾命名與 `luckin-coffee` 一致。
- **phpBB Restore 系列 5 篇正式上線**：補上 part-01 三張特色圖（M42 `public/images/posts/phpbb-restore/`）、移除 M42 config 的 `srcExclude`、source 端拿掉先前為擋 build 而加的 `draft: true`，經 pipeline 重發。先前因缺圖 build 失敗被 srcExclude + draft 雙重排除，導致線上不顯示；補圖後解除。已本機 build 驗證 exit 0、五篇 `SeriesNav` 排序正常（第 N 篇/共 5 篇、目前閱讀標示）、圖片路徑解析正確。
- **phpBB Restore 系列 5 篇正式發布**：`status: draft → published`，自 `drafts/` 移入 `docs/articles/`（2026-06-18 ~ 06-26），改由 `publish-to-multivac.js` pipeline 發布到 M42。修正先前手動 `mv` 進 M42 造成的問題：(a) 重建 Pensieve 為單一編輯來源；(b) series 導覽欄位由錯誤的 `seriesPart` 改為主題實際讀取的 `seriesTitle` + `seriesIndex`，修好 `SeriesNav` 排序；(c) 透過白名單 strip 掉 M42 不該有的 `status`/`draft` 等內部欄位。outline 留在 `drafts/` 為內部規劃稿（in-progress，不發布）。
- **回溯補打全部版本 git tag（v1.0.0–v1.8.0）**：先前專案從未打 tag，CHANGELOG 底部 compare 連結因此全數指向不存在的 tag。補上 annotated tag 並推送 origin；早期（1.0–1.3）CHANGELOG 為回溯補寫，tag 釘在各版內容對應的實作 commit，1.4.0+ 釘在各自的 Release commit。已驗證 GitHub compare 連結可正常解析。

- **發布管線新增根目錄孤兒 Markdown guard**：`validate.yml` 在 lint/validate 前先擋下散落於 repo 根目錄、未列入白名單（README/CHANGELOG/CONTRIBUTING/WRITING_GUIDE）的 `.md`，防止內容檔逃過 `docs/`、`drafts/` glob（即路易莎孤兒檔的成因）再次發生。

### Changed

- **CI 執行環境升級**：GitHub Actions `actions/checkout` 與 `actions/setup-node` 由 v4 升到 v5（v4 的 action runtime 為 Node 20，被強制跑在 Node 24 上會噴 deprecation annotation；v5 改用 Node 24），共 7 處；測試用 `node-version` 由 20 升到 22（現行 LTS），validate 與 publish 兩個 workflow 皆調整。已實跑確認兩 workflow 綠、Node 20 deprecation 警告消除、119 測試在 Node 22 通過。
- **發布 workflow 觸發路徑補 `docs/public/images/**`**：讓「只改圖、不動 markdown」的 push 也能觸發 CI 圖片同步（配合上述 `syncImages`）。
- **CHANGELOG 版本比較連結補齊**：`[Unreleased]` 指向 `v1.8.0...HEAD`，補回先前漏更新的 1.6.0 / 1.7.0 / 1.8.0 compare 連結。

### Fixed

- **`generateFrontmatter` 含雙引號值的 round-trip 損壞**：先前對含 `"` 的字串值用雙引號包卻不跳脫，產出 `key: "say "hi""` 這種非法 YAML，經 `--fix`／發布重寫會默默毀損 frontmatter。改為含 `"` 時用單引號包、單引號以 `''` 跳脫，`parseFrontmatter` 對應還原；新增 4 個 round-trip 測試（含雙引號、冒號+雙引號、單+雙引號混用、單一單引號），並修正先前把錯誤輸出寫死的測試。

## [1.8.0] - 2026-06-27

### Added

- **發布前多版本社群偵測 gate**：`publish --validate` 新增 `detectMultiVersionSocial()`，偵測「版本 1/2/3、完整版/精簡版/極簡版、短版本/超短版本」多版本段落與「發布指南/使用建議/搭配素材建議」發布輔助段落，命中即 block + exit 1（提示改 status 為 draft/archived 或收斂為單一版本）。門檻設計避免誤報單篇文章與單一敘事社群貼文。
- **phpBB Restore 系列納入版控**：outline + 5 篇草稿（status: draft / in-progress）進 `drafts/`；`drafts/*.html` 預覽產出加入 `.gitignore`

### Changed

- **Fable 軍火管制社群貼文下架**：多版本社群貼文（給自己挑版本用、不適合公開），`status: published → archived` 停止發布並從 M42 移除；公開版為對應的 topic-research 長文 code-as-munitions（保留）

## [1.7.0] - 2026-06-25

### Added

- **發布管線（publish-to-multivac.js）三層強化**
  - 變更偵測由 mtime 改為 content hash（sha256，排除 lastModified），解決 CI checkout 時間失準導致漏發或誤發
  - `rewriteInternalLinks()`：source 維持 Pensieve flat 連結，發布時自動改寫為 M42 by-company 巢狀結構，根治跨類別 dead link
  - `filterFrontmatter()`：依 `MULTIVAC_FRONTMATTER_FIELDS` 白名單只輸出 M42 schema 欄位，strip 掉 status/category/related/version（保留 lastModified）
- **發布前 lint gate**：`--validate` 對每篇 transform 後輸出跑 markdownlint（同 `.markdownlint.yml`），攔截「源檔 lint 過、發布後爆」的問題（如 MD001-after-strip），有違規即 block + exit 1
- **新研究文章（draft，整合自三條 feature branch）**
  - AI 編程工具對 SaaS 產業的顛覆效應分析
  - Timo 越南數位銀行被 Kredivo 收購研究
- **GOOG 投資全景報告**：合併 4 篇重疊草稿為單一報告並發布至 M42（多空論述、美伊衝突、非農下修、技術估值、情境研判、全年展望）

### Changed

- **社群多版本文章清理**：移除「同篇內文寫多平台版本」的不適合 M42 呈現格式
  - Shannon AI Pentester：保留完整敘事版、改寫為散文、去 `-social` 後綴
  - Shopify BFCM 2024、Amazon Leo Ultra：刪除（主文已涵蓋）
- **markdownlint 規則放寬以符合中文內容平台**：停用 MD025/MD036/MD040/MD060，MD049 改 consistent，MD033 允許 a/blockquote

### Fixed

- **CI 紅燈修復（連紅逾一個月）**：lint 1620→0、validate 10→0
  - validate-article.js 加路徑白名單，跳過 ADR/guides/roadmap/taxonomy 等非文章類文件
  - 補齊 3 篇越南企業研究與 welcome 文章的 frontmatter
- **悟空 social 貼文 MD001 標題跳級**：內容區段 h3 → h2，避免發布 strip 元資料後 h1→h3
- **跨類別內部連結 dead link**：SmartOSC、Airwallex、Luckin、Manus 等改用正確的 M42 子目錄相對路徑（後由 transform 自動化取代手改）

### Memory

- 新增專屬 project memory：`project_pensieve`、`reference_vitest_cjs`、`reference_publish_pipeline`（記錄 CI 自動推送、frontmatter 白名單、lint gate 與 MD001-after-strip 陷阱）

## [1.6.0] - 2026-05-11

### Added

- **新文章：阿里巴巴悟空 AI Agent 平台研究**（articles + 社群貼文）
  - 涵蓋 ATH 事業群成立、Token 計費模式、釘釘 AI 2.0 發布會
  - 融入 Q4 財報資訊：市場反應、財務數據、AI 投資代價
- **新文章：AI 財富管理板塊回調分析**（2026-02-13）
  - 涵蓋 Insurify、Altruist Hazel AI 觸發的板塊賣壓與基本面對比
  - 從 drafts/ 升級至 docs/articles/
- **新研究：越南科技與東南亞企業**
  - SmartOSC 越南企業研究
  - 91APP-SmartOSC 合作分析
  - Sun Group 越南企業研究
  - Meta 起訴越南 cloaking 詐騙廣告
- **新研究：Shannon AI Pentester**（topic-research + social）
- **新研究：Stripe/PayPal 收購傳聞分析**（topic-research + social）
- **文章系列導覽 frontmatter（4 系列 9 篇）**
  - Airwallex 跨境支付系列（3 篇）
  - Manus AI 收購案系列（2 篇）
  - 瑞幸咖啡系列（2 篇）
  - PayPal 與支付生態系列（2 篇）

### Changed

- **SEO 優化（3 輪累計 8 篇文章 title/description）**
  - Round 1：Manus AI（173 次曝光）、瑞幸咖啡、Airwallex 重寫，加入具體數據與關鍵字
  - Round 2：越南經濟（78 impressions）、David Marcus（33 impressions），加情緒鉤子
  - 額外 batch：3 篇高曝光文章 title 與 description 優化
- **內部交叉連結：5 篇文章新增 8 條延伸閱讀連結**
  - David Marcus ↔ Stripe 社群、Airwallex 研究
  - 越南經濟 ↔ Meta 越南詐騙（雙向）
  - Airwallex 研究 → Jack Zhang 社群、David Marcus
  - 瑞幸研究 → 瑞幸台灣分析
- **文體規範統一**
  - 減少冒號使用、合併無逗號短句為自然中文段落
  - 移除全文破折號（——），改用句號 / 冒號 / 逗號
  - 加入第一人稱觀點、開場改為更口語的敘事語氣
  - 移除社群貼文 Hashtags

### Fixed

- 批量修復所有已發布文章在 CJK 字元旁 markdown 粗體的渲染問題
- 移除文末 404 的內部研究連結
- 中國用語「大概率」改為台灣用語「高機率」
- 重新套用被 markdown linter 覆蓋的 SEO title/description 優化
- 解決全部 npm audit 漏洞

### Removed

- **棄用 Threads/X 社群版分檔 pattern**
  - 改為單一完整版，移除版本 2（Threads）、版本 3（X）、發布指南段落
  - 刪除舊 Stripe/PayPal 社群版本草稿（pattern 已廢棄）
- 移除 publish script 與測試中的內部公司引用

## [1.5.0] - 2026-02-25

### Security

- **修復 glob 高嚴重性安全漏洞** (GHSA-5j98-mcp5-4vw2)
  - 升級 markdownlint-cli 0.43.0 → 0.47.0
  - 修復命令注入漏洞

### Added

- **社群貼文模板** (`templates/social-post-template.md`)
  - 支援多平台版本：完整版（1,500-2,500 字）、精簡版（500-800 字）、極簡版（280 字）
  - 包含發布指南：最佳時間、Hashtags、互動設計
  - 連結原始研究，實現一次研究多平台發布
- **Feature Image Prompt 自動生成系統**
  - 新增 `scripts/generate-feature-image-prompt.js` 腳本
  - 新增 `prompts/feature-image-prompt-template.md` 設計規範
  - 支援從文章 frontmatter 自動生成 Nano Banana Pro 圖像 prompt
  - 根據 category（articles/company-research/topic-research）選擇對應視覺風格
  - 一致的視覺品牌語言：琥珀金色主調 (#f59e0b)、深黑背景 (#0a0a0f)
  - 支援 `--copy` 複製到剪貼簿、`--json` 格式輸出
- **Feature Image Prompt 模板整合**
  - 7 個文章模板新增 `### Feature Image Prompt` 區塊
  - 整合於 `## 元資料` 區塊內，發布時自動移除
  - 更新模板：article、company-research、industry-research、note、topic-research、topic-research-lite、tutorial
- **腳本單元測試基礎**
  - 新增 Vitest 測試框架
  - `tests/lib/frontmatter.test.js`：Frontmatter 解析與生成測試
  - `tests/validate-article.test.js`：文章驗證邏輯測試
  - `tests/publish-to-multivac.test.js`：發布純函數測試
- **GitHub Actions CI Pipeline** (`.github/workflows/validate.yml`)
  - 自動執行 lint、validate、test
  - Push/PR 至 main 時觸發
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
- **P1-008：M42 同步自動化**
  - 發布腳本新增 `--auto-commit` 選項
  - 自動執行 git add + commit（不 push）
- **P1-011：Frontmatter 驗證腳本完善**
  - `scripts/validate-article.js` 功能完整
  - 驗證必填欄位、日期格式、status 值、category 值
- **P1-014：Claude Hooks 整合**
  - 新增 `.claude/hooks/validate-on-write.js`
  - 寫入文章後自動驗證 frontmatter
- **P1-018：發布腳本錯誤處理強化**
  - 新增 `--verbose` 詳細輸出模式
  - 新增錯誤摘要報告
  - 改進 YAML 解析錯誤訊息
- **技術文件完善**
  - 新增 `scripts/README.md`：完整腳本使用指南
  - 新增 `docs/guides/publishing-workflow.md`：發布流程文件
  - 新增 `.claude/README.md`：Claude Code 整合說明
  - 更新 `README.md`：新增技術文件索引
- **P2-004：private 目錄管理規範**
  - 新增 `private/README.md`
  - 定義目錄結構與管理規範
- **P2-012：內容品質檢查清單**
  - WRITING_GUIDE.md 新增「發布前檢查清單」
  - 涵蓋 Frontmatter、內容、風格、檔名檢查
- **P2-013：Markdown Linting**
  - 新增 `.markdownlint.yml` 配置
  - 新增 `package.json` 含 lint 腳本
  - 執行：`npm run lint` / `npm run lint:fix`

### Changed

- **重構 Frontmatter 解析為共用模組**
  - 新增 `scripts/lib/frontmatter.js` 共用模組
  - 統一 `parseFrontmatter()` 與 `generateFrontmatter()` 實作
  - 移除三個腳本中的重複程式碼（淨減少 ~156 行）
  - 受影響腳本：publish-to-multivac.js、validate-article.js、generate-feature-image-prompt.js
- **模板全面優化**（基於實際使用情況分析）
  - **Article Template 結構重構**
    - 新增 The Big Picture、Why It Matters、What's Next 章節
    - 移除低使用率章節：實作應用、常見問題、延伸閱讀、更新記錄
    - 精簡結構從 138 行至約 84 行
  - **Company Research Template 優化**
    - 星等評分（⭐）改為敘事性評估（強勢/穩健/待觀察/薄弱）
    - 新增「快速評估」區塊：值得關注的理由、主要疑慮、一句話結論
    - SWOT 交叉策略矩陣標記為可選（適用深度研究）
    - 移除附錄 A（詞彙表）、附錄 C（研究方法論）
  - **Topic Research Lite Template 強化**
    - 新增「快速啟動」區塊，時間有限時只填此區塊也可形成完整分析
    - 目標字數調整為 2,000-5,000 字（原 3,000-8,000 字）
    - 推薦作為主要議題研究模板
  - **Topic Research Standard Template 精簡**
    - 移除 0% 使用率框架：系統思考分析、倫理分析框架
    - 多維度分析改為模組化選擇（PESTEL、經濟、社會文化、科技影響）
    - 移除附錄 D（延伸閱讀）、更新記錄、研究方法論說明
    - 新增深度版說明標記
  - **Industry Research Template 優化**
    - 星等評分改為敘事性評估（信心程度：高/中/低）
    - 移除更新記錄、相關研究章節
  - **所有模板統一化**
    - 元資料區塊統一採用表格格式
    - Feature Image Prompt 集中化為引用連結
    - 統一結尾格式，移除獨立更新記錄
- **templates/README.md 更新**
  - 新增 Social Post Template 說明
  - 更新各模板包含結構描述
  - 新增模板使用提示

### Maintenance

- **清理已合併的 Claude Code Web 分支**（2026-02-04）
  - 刪除 27 個已合併至 main 的 `claude/*` 遠端分支
  - 保留 4 個未合併分支供後續處理
- **清理過期草稿**
  - 刪除 `drafts/2026-01-27-claude-code-project-aware-agents.md`（已發布至 docs/articles/）

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

[Unreleased]: https://github.com/Clementtang/pensieve/compare/v1.9.0...HEAD
[1.9.0]: https://github.com/Clementtang/pensieve/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/Clementtang/pensieve/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/Clementtang/pensieve/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/Clementtang/pensieve/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/Clementtang/pensieve/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/Clementtang/pensieve/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/Clementtang/pensieve/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/Clementtang/pensieve/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Clementtang/pensieve/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Clementtang/pensieve/releases/tag/v1.0.0
