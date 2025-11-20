# 欢迎使用 Pensieve 写作仓库

> 这是一个示例文章，展示如何使用 Pensieve 仓库进行写作。

## 元数据

- **创建日期：** 2025-11-20
- **更新日期：** 2025-11-20
- **标签：** #写作 #指南 #Pensieve
- **状态：** 已发布
- **字数：** 约 800 字

---

## 引言

欢迎来到 Pensieve！这是一个专门为与 Claude AI 协作写作而设计的仓库。通过规范的文件组织和写作标准，你可以高效地创建、管理和发布各类内容。

**本文将介绍：**
- Pensieve 仓库的基本结构
- 如何开始第一篇文章
- 与 Claude 协作的最佳实践

---

## Pensieve 是什么？

Pensieve 是一个写作管理系统，它结合了：

- **📁 清晰的文件组织** - 草稿、文章、笔记分门别类
- **📝 统一的写作规范** - 确保内容质量和一致性
- **🤖 AI 协作支持** - 与 Claude 无缝配合
- **🔄 版本控制** - 使用 Git 追踪所有变更

---

## 快速开始

### 第 1 步：选择模板

根据你的写作类型选择合适的模板：

```bash
# 技术文章
cp templates/article-template.md drafts/2025-11-20-my-article.md

# 学习笔记
cp templates/note-template.md drafts/2025-11-20-my-note.md

# 教程指南
cp templates/tutorial-template.md drafts/2025-11-20-my-tutorial.md
```

### 第 2 步：开始写作

在 `drafts/` 目录中编辑你的文章。遵循 `WRITING_GUIDE.md` 中的规范：

- ✅ 使用清晰的标题层级
- ✅ 保持段落简洁
- ✅ 添加代码示例（如果需要）
- ✅ 包含元数据信息

### 第 3 步：请 Claude 审阅

你可以这样请求 Claude：

```
"请根据 WRITING_GUIDE.md 审阅我的草稿：drafts/2025-11-20-my-article.md"
```

### 第 4 步：发布文章

完成后，将文章移动到正式目录：

```bash
mv drafts/2025-11-20-my-article.md docs/articles/
```

---

## 与 Claude 协作的技巧

### 1. 明确指示

```
✅ "请帮我创建一篇关于 TypeScript 泛型的文章，使用 article-template"
✅ "检查这篇文章的标题层级是否合理"
✅ "帮我改进这段代码示例的说明"
```

### 2. 利用规范

所有规范都在仓库中，Claude 可以参考：
- `WRITING_GUIDE.md` - 写作规范
- `README.md` - 仓库说明
- 模板文件 - 文章结构

### 3. 迭代改进

```
"这篇文章的引言是否足够吸引人？能否改进？"
"帮我添加更多实际例子"
"检查文章是否符合命名规范"
```

---

## 文件命名最佳实践

### 好的命名示例

```
✅ 2025-11-20-typescript-generics-guide.md
✅ 2025-11-20-react-hooks-tutorial.md
✅ 2025-11-20-productivity-tips.md
```

### 避免的命名

```
❌ My Article.md (包含空格和大写)
❌ article_01.md (使用下划线，缺少日期)
❌ 2025-11-20-Article.md (包含大写字母)
```

---

## 内容组织建议

### 文章类型分类

- **技术深度文章** → `docs/articles/`
- **快速笔记和要点** → `docs/notes/`
- **进行中的内容** → `drafts/`

### 使用标签

通过标签分类文章：

```markdown
**标签：** #编程 #JavaScript #最佳实践
```

这样便于后续搜索和整理。

---

## 版本控制

定期提交你的更改：

```bash
# 添加更改
git add .

# 提交
git commit -m "添加关于 TypeScript 的新文章"

# 推送到远程
git push
```

---

## 总结

Pensieve 提供了一个结构化的写作环境：

1. **模板** 帮助快速开始
2. **规范** 确保质量一致
3. **Claude** 提供智能协助
4. **Git** 管理版本历史

开始你的写作之旅吧！

---

## 延伸阅读

- [WRITING_GUIDE.md](../../WRITING_GUIDE.md) - 完整的写作规范
- [README.md](../../README.md) - 仓库使用说明

---

## 参考资料

1. GitHub 文档管理最佳实践
2. Markdown 写作指南
3. 技术写作规范

---

*最后更新：2025-11-20*
