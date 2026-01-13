# Claude Code 整合設定

> 本目錄包含 Pensieve 專案的 Claude Code 整合設定，包括 Hooks 和權限配置。

**最後更新：** 2026-01-13
**版本：** 1.0.0
**相關優化項目：** P1-014

---

## 目錄結構

```
.claude/
├── README.md                 # 本文件
├── settings.local.json       # 本地設定（權限、MCP、Hooks）
└── hooks/
    └── validate-on-write.js  # 寫入後驗證 Hook
```

---

## Hooks 機制

### 概述

Claude Code Hooks 允許在特定事件發生時自動執行腳本，用於：
- 自動化品質檢查
- 提供即時反饋
- 強化工作流程

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
        "hooks": ["node .claude/hooks/validate-on-write.js"]
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

### 輸出範例

當寫入的文章缺少必填欄位時：

```
📋 文章驗證提醒：
   ⚠️  缺少必填欄位：description
   ⚠️  缺少必填欄位：category

提示：使用 node scripts/validate-article.js 進行完整驗證
```

### 跳過的檔案

以下檔案會被自動跳過：
- `index.md`
- `README.md`
- 非 `docs/` 目錄下的檔案
- 非 `.md` 結尾的檔案

---

## settings.local.json

### 配置說明

```json
{
  "permissions": {
    "allow": [...]           // 允許的 Bash 命令
  },
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": [...],  // 啟用的 MCP 伺服器
  "hooks": {
    "PostToolUse": [...]     // 工具使用後的 Hooks
  }
}
```

### 權限設定

目前允許的 Bash 命令：
- `mkdir`：建立目錄
- `mv`：移動檔案
- `git add`：暫存變更
- `git commit`：提交變更
- `git push`：推送到遠端

### MCP 伺服器

啟用的 MCP 伺服器：
- `github`：GitHub 整合
- `context7`：文件查詢
- `memory`：記憶功能

---

## 新增 Hook 指南

### 步驟 1：建立 Hook 腳本

在 `hooks/` 目錄下建立新腳本：

```javascript
#!/usr/bin/env node

// 從標準輸入讀取上下文
let inputData = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const context = JSON.parse(inputData);
    // 處理邏輯
    processHook(context);
  } catch (err) {
    process.exit(0);
  }
});

function processHook(context) {
  // context 包含：
  // - tool_name: 工具名稱
  // - tool_input: 工具輸入參數
  // - tool_output: 工具輸出結果（PostToolUse）

  // 輸出會顯示在 Claude Code 中
  console.log('Hook 輸出訊息');

  process.exit(0);
}
```

### 步驟 2：配置 settings.local.json

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "ToolName",
        "hooks": ["node .claude/hooks/your-hook.js"]
      }
    ]
  }
}
```

### 可用的 Hook 事件

| 事件 | 說明 |
|------|------|
| `PreToolUse` | 工具使用前 |
| `PostToolUse` | 工具使用後 |

### Matcher 語法

| 模式 | 說明 |
|------|------|
| `"Write"` | 精確匹配 Write 工具 |
| `"*"` | 匹配所有工具 |

---

## 故障排除

### Hook 未執行

**可能原因**：
1. `settings.local.json` 語法錯誤
2. Hook 腳本路徑錯誤
3. 腳本沒有執行權限

**解決**：
```bash
# 檢查 JSON 語法
cat .claude/settings.local.json | python3 -m json.tool

# 檢查腳本是否存在
ls -la .claude/hooks/

# 手動測試腳本
echo '{"tool_name":"Write","tool_input":{"file_path":"test.md"}}' | node .claude/hooks/validate-on-write.js
```

### Hook 輸出未顯示

**可能原因**：
1. 腳本在檔案不符合條件時提前退出
2. 腳本使用 `process.exit(1)` 結束

**解決**：確保腳本使用 `console.log()` 輸出並以 `process.exit(0)` 結束。

---

## 相關文件

- [腳本工具說明](../scripts/README.md)
- [發布工作流程](../docs/guides/publishing-workflow.md)
- [優化 Backlog](../docs/roadmap/optimization-backlog.md)
