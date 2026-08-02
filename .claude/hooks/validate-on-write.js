#!/usr/bin/env node

/**
 * Claude Code Hook: 文章寫入後驗證
 *
 * 當 Claude 寫入 docs/ 目錄下的 Markdown 檔案時，
 * 自動執行 frontmatter 驗證並提供反饋。
 *
 * 使用方式：
 *   在 .claude/settings.local.json 中配置：
 *   "hooks": {
 *     "PostToolUse": [{
 *       "matcher": "Write",
 *       "hooks": ["node .claude/hooks/validate-on-write.js"]
 *     }]
 *   }
 */

const path = require("path");
const {
  validateArticle,
} = require("../../scripts/validate-article.js");

// 從標準輸入讀取 hook 上下文
let inputData = "";
process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  inputData += chunk;
});

process.stdin.on("end", () => {
  try {
    const context = JSON.parse(inputData);
    processHook(context);
  } catch {
    // 靜默失敗，不影響主流程
    process.exit(0);
  }
});

/**
 * 處理 hook
 */
function processHook(context) {
  // 檢查是否為 Write 工具
  if (context.tool_name !== "Write") {
    process.exit(0);
  }

  const filePath = context.tool_input?.file_path;

  // 只處理 docs/ 目錄下的 .md 檔案
  if (!filePath || !filePath.includes("/docs/") || !filePath.endsWith(".md")) {
    process.exit(0);
  }

  // 跳過 index.md 和 README.md（validateArticle 也會 skipped，此處早退省讀檔）
  const fileName = path.basename(filePath);
  if (fileName === "index.md" || fileName === "README.md") {
    process.exit(0);
  }

  // 使用與 CLI / CI 相同的驗證邏輯
  let result;
  try {
    result = validateArticle(filePath);
  } catch {
    process.exit(0);
  }

  if (result.skipped) {
    process.exit(0);
  }

  const messages = [
    ...result.errors.map((e) => `錯誤：${e}`),
    ...result.warnings.map((w) => `警告：${w}`),
  ];

  if (messages.length > 0) {
    console.log("\n文章驗證提醒：");
    for (const message of messages) {
      console.log(`   ${message}`);
    }
    console.log(
      "\n提示：使用 node scripts/validate-article.js 進行完整驗證\n",
    );
  }

  process.exit(0);
}
