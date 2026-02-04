# 🧠 Pensieve - 個人研究與寫作框架

> **儲思盆** - 一個用於系統化研究與寫作的個人知識管理框架，配合 Claude AI 進行協作。

## 💭 關於 Pensieve（儲思盆）

**Pensieve**（儲思盆）的靈感來自 J.K. 羅琳《哈利波特》系列中的魔法物品。在魔法世界中，儲思盆是一個可以儲存、檢視和整理記憶與思想的魔法容器。

就像魔法世界的儲思盆一樣，這個專案旨在：

- 📝 **儲存思想**：保存研究發現與分析洞見
- 🔍 **整理記憶**：有系統地組織文章和研究
- ✨ **回顧反思**：隨時檢視和改進過去的作品
- 🤝 **協作增強**：透過 AI 輔助，讓研究與寫作更有效率

### 著作權聲明

本專案名稱靈感來自《哈利波特》系列，但僅借用概念作為個人寫作工具的隱喻。本專案為開源個人工具，不涉及商業用途，也不包含任何受版權保護的《哈利波特》原作內容。

---

## 📁 儲存庫結構

```
pensieve/
├── docs/                    # 研究內容
│   ├── articles/            # 文章
│   ├── company-research/    # 企業研究
│   ├── topic-research/      # 議題研究
│   ├── notes/               # 筆記
│   ├── guides/              # 使用指南
│   ├── adr/                 # 架構決策記錄
│   └── roadmap/             # 優化追蹤
├── drafts/                  # 草稿資料夾
├── templates/               # 文章模板
├── scripts/                 # 工具腳本
│   ├── lib/                 # 共用模組
│   │   └── frontmatter.js   # Frontmatter 解析
│   ├── new-article.js       # 建立新文章
│   ├── validate-article.js  # 文章驗證
│   ├── generate-feature-image-prompt.js  # 圖像 prompt 生成
│   └── publish-to-multivac.js  # 發布到 M42
├── prompts/                 # 研究提示詞模板
├── .claude/                 # Claude Code 整合
│   ├── hooks/               # 自動化 Hooks
│   └── settings.local.json  # 本地設定
├── CHANGELOG.md             # 變更記錄
├── CONTRIBUTING.md          # 貢獻指南
├── WRITING_GUIDE.md         # 寫作規範（v1.4.0）
└── README.md                # 本檔案
```

---

## 📖 內容分類

### 文章 (Articles)

涵蓋科技趨勢、產業分析、商業觀察的深度文章。從 AI 發展、併購事件到市場分析，記錄對商業世界的觀察與思考。

### 企業研究 (Company Research)

系統化的企業研究報告，運用結構化的分析框架，包含：

- 財務分析
- 競爭策略
- 市場評估
- 估值分析

### 議題研究 (Topic Research)

跨領域的議題探討，針對複雜的「Wicked Problems」進行系統性研究。運用 PESTEL、利害關係人分析、情境規劃等多元分析框架。

---

## 🎯 使用方式

### 快速開始

```bash
# 建立新文章
node scripts/new-article.js --type article --title "我的文章"

# 驗證文章
node scripts/validate-article.js docs/articles/

# 發布到 Multivac42
node scripts/publish-to-multivac.js --validate --auto-commit
```

### 建立新文章

**方式一：使用腳本（推薦）**

```bash
node scripts/new-article.js --type article --title "文章標題"
```

**方式二：手動複製**

1. 從 `templates/` 目錄複製對應模板到 `drafts/`
2. 按照 [WRITING_GUIDE.md](./WRITING_GUIDE.md) 中的規範進行寫作
3. 完成後移動到 `docs/` 對應子目錄

### 檔案命名規則

- 格式：`YYYY-MM-DD-slug.md`
- 範例：`2026-01-13-ai-regulation-analysis.md`
- 使用小寫字母，單詞用連字號 `-` 分隔

### 行動端工作流（Web↔CLI）

使用 Research Memo 模板進行跨平台協作：

**手機（Claude Code Web）：**

```
我正在為 [主題] 進行前期研究。
請建立 Research Memo（參考 templates/research-memo-template.md）
保持 memo 在 1000 字以內。
```

**電腦（Claude Code CLI）：**

```
請讀取 drafts/memo-[topic].md，根據對應模板撰寫完整文章。
遵循 WRITING_GUIDE.md 的台灣用語規範。
```

---

## 📋 寫作規範

詳細的寫作規範請參閱 [WRITING_GUIDE.md](./WRITING_GUIDE.md)

**重點規範：**

- 使用台灣繁體中文用語
- 遵循 `YYYY-MM-DD-slug.md` 命名格式
- 文章需包含 YAML frontmatter 元資料

---

## 🌐 公開發布

精選內容發布於 **Multivac42**：https://multivac42.vercel.app

關於網站分離的決策，請參閱 [ADR-0001](./docs/adr/0001-separate-website-from-research-framework.md)。

---

## 🤝 貢獻指南

如果您想對本專案做出貢獻，請參閱 [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📚 技術文件

| 文件                                                 | 說明                      |
| ---------------------------------------------------- | ------------------------- |
| [腳本工具說明](./scripts/README.md)                  | 所有腳本的完整使用指南    |
| [發布工作流程](./docs/guides/publishing-workflow.md) | 文章發布到 M42 的完整流程 |
| [Claude Code 整合](./.claude/README.md)              | Hooks 與自動化設定        |
| [標籤分類法](./docs/taxonomy.md)                     | 標籤命名規範與分類        |
| [模板使用指南](./templates/README.md)                | 模板選擇與使用說明        |
| [研究提示詞](./prompts/README.md)                    | Claude 協作提示詞模板     |

---

## 📌 版本資訊

- **寫作規範版本：** v1.4.0
- **變更記錄：** [CHANGELOG.md](./CHANGELOG.md)
- **優化追蹤：** [docs/roadmap/optimization-backlog.md](./docs/roadmap/optimization-backlog.md)

---

_最後更新：2026-01-13_
