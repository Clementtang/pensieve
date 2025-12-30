# 歡迎使用 Pensieve 寫作儲存庫

> 這是一個範例文章，展示如何使用 Pensieve 儲存庫進行寫作。

## 元資料

- **建立日期：** 2025-11-20
- **更新日期：** 2025-11-20
- **標籤：** #寫作 #指南 #Pensieve
- **狀態：** 已發布
- **字數：** 約 800 字

---

## 引言

歡迎來到 Pensieve！這是一個專門為與 Claude AI 協作寫作而設計的儲存庫。透過規範的檔案組織和寫作標準，你可以高效地建立、管理和發布各類內容。

**本文將介紹：**
- Pensieve 儲存庫的基本結構
- 如何開始第一篇文章
- 與 Claude 協作的最佳實踐

---

## Pensieve 是什麼？

Pensieve 是一個寫作管理系統，它結合了：

- **📁 清晰的檔案組織** - 草稿、文章、筆記分門別類
- **📝 統一的寫作規範** - 確保內容品質和一致性
- **🤖 AI 協作支援** - 與 Claude 無縫配合
- **🔄 版本控制** - 使用 Git 追蹤所有變更

---

## 快速開始

### 第 1 步：選擇模板

根據你的寫作類型選擇合適的模板：

```bash
# 技術文章
cp templates/article-template.md drafts/2025-11-20-my-article.md

# 學習筆記
cp templates/note-template.md drafts/2025-11-20-my-note.md

# 教學指南
cp templates/tutorial-template.md drafts/2025-11-20-my-tutorial.md
```

### 第 2 步：開始寫作

在 `drafts/` 目錄中編輯你的文章。遵循 `WRITING_GUIDE.md` 中的規範：

- ✅ 使用清晰的標題層級
- ✅ 保持段落簡潔
- ✅ 新增程式碼範例（如果需要）
- ✅ 包含元資料資訊

### 第 3 步：請 Claude 審閱

你可以這樣請求 Claude：

```
"請根據 WRITING_GUIDE.md 審閱我的草稿：drafts/2025-11-20-my-article.md"
```

### 第 4 步：發布文章

完成後，將文章移動到正式目錄：

```bash
mv drafts/2025-11-20-my-article.md docs/articles/
```

---

## 與 Claude 協作的技巧

### 1. 明確指示

```
✅ "請幫我建立一篇關於 TypeScript 泛型的文章，使用 article-template"
✅ "檢查這篇文章的標題層級是否合理"
✅ "幫我改進這段程式碼範例的說明"
```

### 2. 利用規範

所有規範都在儲存庫中，Claude 可以參考：
- `WRITING_GUIDE.md` - 寫作規範
- `README.md` - 儲存庫說明
- 模板檔案 - 文章結構

### 3. 迭代改進

```
"這篇文章的引言是否足夠吸引人？能否改進？"
"幫我新增更多實際例子"
"檢查文章是否符合命名規範"
```

---

## 檔案命名最佳實踐

### 好的命名範例

```
✅ 2025-11-20-typescript-generics-guide.md
✅ 2025-11-20-react-hooks-tutorial.md
✅ 2025-11-20-productivity-tips.md
```

### 避免的命名

```
❌ My Article.md (包含空格和大寫)
❌ article_01.md (使用底線，缺少日期)
❌ 2025-11-20-Article.md (包含大寫字母)
```

---

## 內容組織建議

### 文章類型分類

- **技術深度文章** → `docs/articles/`
- **快速筆記和要點** → `docs/notes/`
- **進行中的內容** → `drafts/`

### 使用標籤

透過標籤分類文章：

```markdown
**標籤：** #程式設計 #JavaScript #最佳實踐
```

這樣便於後續搜尋和整理。

---

## 版本控制

定期提交你的變更：

```bash
# 新增變更
git add .

# 提交
git commit -m "新增關於 TypeScript 的新文章"

# 推送到遠端
git push
```

---

## 總結

Pensieve 提供了一個結構化的寫作環境：

1. **模板** 幫助快速開始
2. **規範** 確保品質一致
3. **Claude** 提供智慧協助
4. **Git** 管理版本歷史

開始你的寫作之旅吧！

---

## 延伸閱讀

- WRITING_GUIDE.md - 完整的寫作規範（位於專案根目錄）
- README.md - 儲存庫使用說明（位於專案根目錄）

---

## 參考資料

1. GitHub 文件管理最佳實踐
2. Markdown 寫作指南
3. 技術寫作規範

---

*最後更新：2025-11-20*
