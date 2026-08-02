# 草稿目錄

這個目錄存放所有正在進行中的草稿文章。

## 使用方式

1. **建立新草稿：**

   ```bash
   # 從模板複製
   cp templates/article-template.md drafts/2025-11-20-my-new-article.md
   ```

2. **編輯草稿：**
   - 在這個目錄中自由編輯
   - 可以隨時儲存未完成的工作
   - 使用 Git 追蹤版本變化

3. **完成草稿：**

   ```bash
   # 將完成的文章移動到正式目錄
   mv drafts/2025-11-20-my-article.md docs/articles/
   ```

## 檔案組織

- 使用標準檔案命名：`YYYY-MM-DD-主題.md`
- 保持草稿數量合理，定期清理
- 長期未完成的草稿考慮歸檔或刪除

## 草稿狀態（frontmatter `status`）

- `draft`：剛開始
- `in-progress`：積極撰寫中
- `published`：不應長期留在 drafts（應移到 `docs/`）
- `archived`：已結案底稿（例如已擴寫上線的 Research Memo）；`npm run review-drafts` 不計入過期告警

## 生命週期

1. `npm run new` 或複製模板 → `drafts/`
2. 完成後移到 `docs/{articles|company-research|topic-research}/` 並 `status: published`
3. Research Memo 等交接底稿：正式文上線後改 `archived`，`related` 指向正式文
4. 定期：`npm run review-drafts`

詳見 [mobile-research-workflow.md](../docs/guides/mobile-research-workflow.md)。
