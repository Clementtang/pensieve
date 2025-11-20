# Pensieve - 个人写作仓库

这是一个用于存储和管理个人写作内容的仓库，配合 Claude AI 助手进行写作。

## 📁 仓库结构

```
pensieve/
├── docs/                    # 已发布的文档
│   ├── articles/           # 正式文章
│   └── notes/              # 笔记和简短内容
├── drafts/                 # 草稿文件夹
├── templates/              # 文章模板
├── WRITING_GUIDE.md        # 写作规范指南
└── README.md               # 本文件
```

## 🎯 使用方式

### 创建新文章

1. 从 `templates/` 目录复制模板文件到 `drafts/`
2. 按照 [WRITING_GUIDE.md](./WRITING_GUIDE.md) 中的规范进行写作
3. 完成后移动到 `docs/articles/` 或 `docs/notes/`

### 文件命名规则

- 使用小写字母
- 单词之间用连字符 `-` 分隔
- 格式：`YYYY-MM-DD-标题关键词.md`
- 示例：`2025-11-20-claude-writing-guide.md`

### 与 Claude 协作

可以直接在 Claude 中请求：
- 创建新文章
- 审阅和改进现有文章
- 根据主题生成文章大纲
- 检查文章是否符合写作规范

## 📖 文档规范

详细的写作规范请参阅 [WRITING_GUIDE.md](./WRITING_GUIDE.md)

## 🔍 快速查找

- 所有已发布文章：`docs/articles/`
- 所有笔记：`docs/notes/`
- 进行中的草稿：`drafts/`

## 📝 常用命令

```bash
# 查找特定主题的文章
grep -r "关键词" docs/

# 列出所有文章（按时间排序）
ls -lt docs/articles/

# 统计文章数量
find docs/ -name "*.md" | wc -l
```

## 🤖 AI 辅助写作

本仓库设计用于与 Claude AI 协作：
- Claude 可以根据规范帮助创建、编辑和优化内容
- 所有规范文档都存储在仓库中，确保一致性
- 使用 Git 版本控制追踪所有更改

## 📌 注意事项

- 定期提交更改到 Git
- 保持文件命名的一致性
- 遵循 WRITING_GUIDE.md 中的格式规范
- 草稿完成后及时移动到正式目录
