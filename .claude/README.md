# Claude Code 整合設定

> 本目錄包含 Pensieve 專案的 Claude Code 整合設定，包括 Subagents、Hooks 和權限配置。

**最後更新：** 2026-07-05
**版本：** 1.1.0
**相關優化項目：** P1-014

---

## 目錄結構

```
.claude/
├── README.md                 # 本文件
├── settings.local.json       # 本地設定（權限、MCP、Hooks）
├── agents/                   # 專案 subagents
│   ├── editor.md             # 編輯兼發布審核（sonnet）
│   ├── researcher.md         # 深度研究：企業分析、PESTEL（opus）
│   └── writer.md             # 寫作助手：草稿、結構編排（sonnet）
└── hooks/
    └── validate-on-write.js  # 寫入後驗證 Hook
```

---

## Subagents

| Agent        | Model  | 用途                                |
| ------------ | ------ | ----------------------------------- |
| `editor`     | sonnet | 用詞校正、格式檢查、發布前完整驗證  |
| `researcher` | opus   | 企業分析、議題研究、PESTEL 框架分析 |
| `writer`     | sonnet | 內容創作、文章結構編排、草稿撰寫    |

派工判準與 model 選擇原則見全域 `~/.claude/playbook/model-dispatch.md`。

---

## Hooks 機制

### 已配置的 Hooks

#### PostToolUse: Write

**觸發時機**：Claude 使用 Write 工具寫入檔案後

**執行腳本**：`hooks/validate-on-write.js`

**功能**：

- 檢測寫入的檔案是否為 `docs/` 目錄下的 Markdown 文章
- 自動驗證 frontmatter 必填欄位
- 在 Claude Code 中顯示警告提醒

**配置位置**：`settings.local.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/validate-on-write.js"
          }
        ]
      }
    ]
  }
}
```

---

## validate-on-write.js

### 功能說明

當 Claude 寫入 `docs/` 目錄下的 Markdown 檔案時，自動執行以下驗證：

1. **必填欄位檢查**：title, description, date, category, status
2. **Status 值驗證**：確認為有效值
3. **日期格式驗證**：確認為 YYYY-MM-DD

### 設計特點

- **非阻塞式**：驗證失敗只顯示警告，不阻止寫入
- **選擇性執行**：只針對 `docs/` 目錄下的 `.md` 檔案
- **靜默失敗**：腳本錯誤不會影響主流程

### 跳過的檔案

- `index.md`、`README.md`
- 非 `docs/` 目錄下的檔案
- 非 `.md` 結尾的檔案

---

## settings.local.json

### 配置說明

```json
{
  "permissions": {
    "allow": [...]                    // 允許的工具呼叫
  },
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": [...],     // 啟用的 MCP 伺服器
  "hooks": {
    "PostToolUse": [...]              // 工具使用後的 Hooks
  }
}
```

### 權限設定（摘要）

目前允許：檔案操作（`mkdir`、`mv`）、git 日常操作（`add`/`commit`/`push`/`pull`/`fetch`/`checkout`）、`WebSearch`、發布腳本（`node scripts/publish-to-multivac.js`）。完整清單以 `settings.local.json` 為準。

### MCP 伺服器

啟用：`github`、`context7`、`memory`

---

## 新增 Hook 指南

### 步驟 1：建立 Hook 腳本

在 `hooks/` 目錄下建立新腳本（從 stdin 讀 JSON context，`console.log` 輸出、`process.exit(0)` 結束；參考 `validate-on-write.js`）。context 包含 `tool_name`、`tool_input`、`tool_output`（PostToolUse）。

### 步驟 2：配置 settings.local.json

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "ToolName",
        "hooks": [
          { "type": "command", "command": "node .claude/hooks/your-hook.js" }
        ]
      }
    ]
  }
}
```

### Matcher 語法

| 模式            | 說明                |
| --------------- | ------------------- |
| `"Write"`       | 精確匹配 Write 工具 |
| `"Edit\|Write"` | 匹配多個工具        |
| `"*"`           | 匹配所有工具        |

---

## 故障排除

### Hook 未執行

```bash
# 檢查 JSON 語法
cat .claude/settings.local.json | python3 -m json.tool

# 檢查腳本是否存在
ls -la .claude/hooks/

# 手動測試腳本
echo '{"tool_name":"Write","tool_input":{"file_path":"test.md"}}' | node .claude/hooks/validate-on-write.js
```

### Hook 輸出未顯示

確保腳本使用 `console.log()` 輸出並以 `process.exit(0)` 結束（`exit(1)` 會被視為失敗）。

---

## 相關文件

- [腳本工具說明](../scripts/README.md)
- [發布工作流程](../docs/guides/publishing-workflow.md)
- [優化 Backlog](../docs/roadmap/optimization-backlog.md)
- 發布管線與 lint gate 細節：project memory `reference_publish_pipeline.md`
