# Pensieve 發布工作流程

> 本文件說明如何將 Pensieve 中的文章發布到 Multivac42 網站。

**最後更新：** 2026-01-13
**版本：** 1.0.0
**相關優化項目：** P0-005, P1-008, P1-018

---

## 目錄

- [概覽](#概覽)
- [文章生命週期](#文章生命週期)
- [發布前準備](#發布前準備)
- [發布流程](#發布流程)
- [進階用法](#進階用法)
- [故障排除](#故障排除)

---

## 概覽

### 系統架構

```
┌─────────────┐     發布腳本     ┌──────────────┐
│   Pensieve  │ ──────────────▶ │  Multivac42  │
│  (私有倉庫)  │                 │  (公開網站)   │
└─────────────┘                 └──────────────┘
     │                                │
     │ status: published              │ VitePress
     │ category: xxx                  │ 靜態網站
     ▼                                ▼
  本地撰寫                         公開發布
```

### 設計原則

1. **單一來源**：所有內容在 Pensieve 撰寫與管理
2. **狀態驅動**：以 `status` 欄位控制發布流程
3. **自動分類**：根據 `category` 欄位決定目標位置
4. **格式轉換**：發布時自動移除私有內容（元資料區塊等）

---

## 文章生命週期

### 狀態流轉

```
draft ──▶ in-progress ──▶ published ──▶ archived
  │            │              │
  │            │              └── 已發布，可更新
  │            └── 撰寫中
  └── 草稿，未開始
```

### 狀態說明

| 狀態 | 說明 | 會發布？ |
|------|------|---------|
| `draft` | 草稿，尚未開始或暫停 | 否 |
| `in-progress` | 撰寫中，持續更新 | 否 |
| `published` | 已完成，可發布 | 是 |
| `archived` | 已歸檔，不再更新 | 否 |

### 典型工作流程

```bash
# 1. 建立新文章（自動設為 draft）
node scripts/new-article.js --type article --title "我的文章"

# 2. 開始撰寫，將 status 改為 in-progress
# 3. 完成撰寫，將 status 改為 published

# 4. 驗證文章
node scripts/validate-article.js drafts/2026-01-13-我的文章.md

# 5. 移動到正確目錄
mv drafts/2026-01-13-我的文章.md docs/articles/

# 6. 發布到 M42
node scripts/publish-to-multivac.js --validate --auto-commit

# 7. 推送到 M42 遠端
cd ~/multivac42 && git push
```

---

## 發布前準備

### Frontmatter 必填欄位

發布文章必須包含以下 frontmatter 欄位：

```yaml
---
title: "文章標題"
description: "1-2 句話的摘要說明"
date: 2026-01-13
category: articles
status: published
---
```

### 欄位說明

| 欄位 | 類型 | 說明 | 範例 |
|------|------|------|------|
| `title` | string | 文章標題 | `"ESL 零售科技趨勢"` |
| `description` | string | 摘要說明（SEO 用） | `"探討電子貨架標籤..."` |
| `date` | date | 建立日期 | `2026-01-13` |
| `category` | string | 文章分類 | `articles` |
| `status` | string | 發布狀態 | `published` |

### 有效的 Category 值

| Category | 說明 | M42 目標目錄 |
|----------|------|-------------|
| `articles` | 時事評論、分析文章 | docs/articles/ |
| `company-research` | 企業深度研究 | docs/company-research/{company}/ |
| `topic-research` | 產業/議題研究 | docs/topic-research/ |

### 檔名規範

檔名必須符合格式：`YYYY-MM-DD-slug.md`

```
✅ 正確：2026-01-13-esl-retail-tech.md
✅ 正確：2026-01-13-airwallex-research.md
❌ 錯誤：esl-retail-tech.md（缺少日期）
❌ 錯誤：2026/01/13-article.md（日期格式錯誤）
```

---

## 發布流程

### 標準發布流程

#### 步驟 1：驗證文章

```bash
node scripts/validate-article.js docs/articles/2026-01-13-my-article.md
```

確認輸出為 ✅，無錯誤。

#### 步驟 2：查看同步狀態

```bash
node scripts/publish-to-multivac.js --status
```

確認要發布的文章清單正確。

#### 步驟 3：執行發布

```bash
node scripts/publish-to-multivac.js --validate
```

#### 步驟 4：提交變更

```bash
cd ~/multivac42
git add -A
git commit -m "發布文章：ESL 零售科技趨勢"
git push
```

### 一鍵發布流程

使用 `--auto-commit` 可簡化步驟 3-4：

```bash
# 驗證 + 發布 + 自動 commit
node scripts/publish-to-multivac.js --validate --auto-commit

# 只需手動 push
cd ~/multivac42 && git push
```

---

## 進階用法

### Dry Run 模式

預覽發布操作，不實際執行：

```bash
node scripts/publish-to-multivac.js --dry-run
```

輸出範例：
```
   處理：ESL 零售科技趨勢
   來源：docs/articles/2026-01-10-esl-retail-tech.md
   目標：docs/articles/2026-01-10-esl-retail-tech.md
   ⏸️  跳過（dry-run）
```

### Verbose 模式

顯示詳細處理過程，適合除錯：

```bash
node scripts/publish-to-multivac.js --verbose
```

輸出範例：
```
   [詳細] 處理檔案：docs/articles/2026-01-10-esl-retail-tech.md
   [詳細] 讀取來源檔案...
   [詳細] 轉換內容格式...
   [詳細] 寫入目標檔案...
```

### 批次驗證

驗證特定目錄下所有文章：

```bash
# 驗證所有文章目錄
node scripts/validate-article.js docs/articles/
node scripts/validate-article.js docs/company-research/
node scripts/validate-article.js docs/topic-research/

# 靜默模式（只顯示錯誤）
node scripts/validate-article.js docs/ --quiet
```

### 組合選項

```bash
# 完整流程：驗證 + 詳細輸出 + 自動 commit
node scripts/publish-to-multivac.js --validate --verbose --auto-commit

# 預覽完整流程
node scripts/publish-to-multivac.js --validate --verbose --dry-run
```

---

## 故障排除

### 驗證失敗

**問題**：`缺少必填欄位：description`

**解決**：在 frontmatter 中補充 description 欄位：
```yaml
---
title: "文章標題"
description: "補充這裡的摘要說明"
---
```

### 日期格式錯誤

**問題**：`date 格式錯誤：應為 YYYY-MM-DD`

**解決**：確保日期格式正確：
```yaml
---
date: 2026-01-13    # ✅ 正確
date: "2026-01-13"  # ✅ 正確
date: 2026/01/13    # ❌ 錯誤
date: Jan 13, 2026  # ❌ 錯誤
---
```

### 找不到 Multivac42 目錄

**問題**：`找不到 Multivac42 目錄`

**解決**：確認 M42 倉庫位置正確：
```bash
# 預設路徑：~/multivac42
ls ~/multivac42

# 如需修改，編輯 scripts/publish-to-multivac.js 中的 MULTIVAC_ROOT
```

### Git Commit 失敗

**問題**：`Git commit 失敗`

**可能原因**：
1. M42 目錄不是 git 倉庫
2. 沒有變更需要 commit
3. Git 未設定使用者資訊

**解決**：
```bash
cd ~/multivac42
git status  # 檢查狀態
git config user.name "Your Name"
git config user.email "your@email.com"
```

### 文章未出現在發布清單

**問題**：文章設為 `status: published` 但未出現在發布清單

**可能原因**：
1. 文章不在來源目錄（docs/articles, docs/company-research, docs/topic-research）
2. Frontmatter 解析失敗
3. 檔名為 index.md 或 README.md（會被跳過）

**解決**：
```bash
# 使用 verbose 模式檢查
node scripts/publish-to-multivac.js --verbose --status
```

---

## 相關文件

- [腳本工具說明](../../scripts/README.md)
- [寫作規範](../../WRITING_GUIDE.md)
- [Frontmatter 欄位規範](../../WRITING_GUIDE.md#frontmatter-欄位規範)
- [標籤分類法](../taxonomy.md)
