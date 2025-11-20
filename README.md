# Pensieve - 個人寫作儲存庫

這是一個用於儲存和管理個人寫作內容的儲存庫，配合 Claude AI 助理進行寫作。

## 📁 儲存庫結構

```
pensieve/
├── docs/                    # 已發布的文件
│   ├── articles/           # 正式文章
│   └── notes/              # 筆記和簡短內容
├── drafts/                 # 草稿資料夾
├── templates/              # 文章模板
├── WRITING_GUIDE.md        # 寫作規範指南
└── README.md               # 本檔案
```

## 🎯 使用方式

### 建立新文章

1. 從 `templates/` 目錄複製模板檔案到 `drafts/`
2. 按照 [WRITING_GUIDE.md](./WRITING_GUIDE.md) 中的規範進行寫作
3. 完成後移動到 `docs/articles/` 或 `docs/notes/`

### 檔案命名規則

- 使用小寫字母
- 單詞之間用連字號 `-` 分隔
- 格式：`YYYY-MM-DD-標題關鍵詞.md`
- 範例：`2025-11-20-claude-writing-guide.md`

### 與 Claude 協作

可以直接在 Claude 中請求：
- 建立新文章
- 審閱和改進現有文章
- 根據主題產生文章大綱
- 檢查文章是否符合寫作規範

## 📖 文件規範

詳細的寫作規範請參閱 [WRITING_GUIDE.md](./WRITING_GUIDE.md)

## 🔍 快速查找

- 所有已發布文章：`docs/articles/`
- 所有筆記：`docs/notes/`
- 進行中的草稿：`drafts/`

## 📝 常用指令

```bash
# 查找特定主題的文章
grep -r "關鍵詞" docs/

# 列出所有文章（按時間排序）
ls -lt docs/articles/

# 統計文章數量
find docs/ -name "*.md" | wc -l
```

## 🤖 AI 輔助寫作

本儲存庫設計用於與 Claude AI 協作：
- Claude 可以根據規範幫助建立、編輯和最佳化內容
- 所有規範文件都儲存在儲存庫中，確保一致性
- 使用 Git 版本控制追蹤所有變更

## 📌 注意事項

- 定期提交變更到 Git
- 保持檔案命名的一致性
- 遵循 WRITING_GUIDE.md 中的格式規範
- 草稿完成後及時移動到正式目錄
