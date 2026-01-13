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

const fs = require('fs');
const path = require('path');

// 從標準輸入讀取 hook 上下文
let inputData = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const context = JSON.parse(inputData);
    processHook(context);
  } catch (err) {
    // 靜默失敗，不影響主流程
    process.exit(0);
  }
});

/**
 * 處理 hook
 */
function processHook(context) {
  // 檢查是否為 Write 工具
  if (context.tool_name !== 'Write') {
    process.exit(0);
  }

  const filePath = context.tool_input?.file_path;

  // 只處理 docs/ 目錄下的 .md 檔案
  if (!filePath || !filePath.includes('/docs/') || !filePath.endsWith('.md')) {
    process.exit(0);
  }

  // 跳過 index.md 和 README.md
  const fileName = path.basename(filePath);
  if (fileName === 'index.md' || fileName === 'README.md') {
    process.exit(0);
  }

  // 驗證檔案
  const warnings = validateArticle(filePath);

  if (warnings.length > 0) {
    // 輸出提醒訊息（會顯示在 Claude Code 中）
    console.log('\n📋 文章驗證提醒：');
    for (const warning of warnings) {
      console.log(`   ⚠️  ${warning}`);
    }
    console.log('\n提示：使用 node scripts/validate-article.js 進行完整驗證\n');
  }

  process.exit(0);
}

/**
 * 驗證文章
 */
function validateArticle(filePath) {
  const warnings = [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // 檢查 frontmatter
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
      warnings.push('缺少 YAML frontmatter');
      return warnings;
    }

    const frontmatterStr = match[1];
    const frontmatter = parseFrontmatter(frontmatterStr);

    // 必填欄位
    const required = ['title', 'description', 'date', 'category', 'status'];
    for (const field of required) {
      if (!frontmatter[field]) {
        warnings.push(`缺少必填欄位：${field}`);
      }
    }

    // 檢查狀態值
    const validStatus = ['draft', 'in-progress', 'published', 'archived'];
    if (frontmatter.status && !validStatus.includes(frontmatter.status)) {
      warnings.push(`status 值無效：${frontmatter.status}`);
    }

    // 檢查日期格式
    if (frontmatter.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(frontmatter.date))) {
      warnings.push(`date 格式錯誤：應為 YYYY-MM-DD`);
    }

  } catch (err) {
    // 靜默處理錯誤
  }

  return warnings;
}

/**
 * 簡易 frontmatter 解析
 */
function parseFrontmatter(str) {
  const result = {};
  const lines = str.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // 移除引號
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}
