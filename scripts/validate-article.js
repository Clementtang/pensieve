#!/usr/bin/env node

/**
 * Pensieve 文章驗證腳本
 *
 * 功能：
 * 1. 驗證 Frontmatter 必填欄位
 * 2. 驗證日期格式 (YYYY-MM-DD)
 * 3. 驗證 status 值
 * 4. 驗證 category 值
 * 5. 驗證檔名格式
 * 6. 檢查是否有 H1 標題
 *
 * 使用方式：
 *   node scripts/validate-article.js <file|directory>
 *   node scripts/validate-article.js docs/articles/2025-01-01-my-article.md
 *   node scripts/validate-article.js docs/articles/
 *
 * 選項：
 *   --fix      自動修復可修復的問題（目前未實作）
 *   --quiet    只顯示錯誤，不顯示成功訊息
 */

const fs = require('fs');
const path = require('path');

// 有效的 status 值
const VALID_STATUS = ['draft', 'in-progress', 'published', 'archived'];

// 有效的 category 值
const VALID_CATEGORIES = [
  'articles',
  'company-research',
  'topic-research',
  'tutorial',
  'note',
  'memo'
];

// 必填欄位
const REQUIRED_FIELDS = ['title', 'description', 'date', 'category', 'status'];

// 日期格式正則
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// 檔名格式正則
const FILENAME_REGEX = /^\d{4}-\d{2}-\d{2}-[\w-]+\.md$/;

// 解析命令列參數
const args = process.argv.slice(2);
const quietMode = args.includes('--quiet');
const targetPath = args.find(arg => !arg.startsWith('--'));

if (!targetPath) {
  console.log('使用方式：node scripts/validate-article.js <file|directory>');
  console.log('');
  console.log('範例：');
  console.log('  node scripts/validate-article.js docs/articles/2025-01-01-my-article.md');
  console.log('  node scripts/validate-article.js docs/articles/');
  console.log('');
  console.log('選項：');
  console.log('  --quiet    只顯示錯誤，不顯示成功訊息');
  process.exit(0);
}

/**
 * 解析 YAML frontmatter
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: null, body: content, hasFrontmatter: false };

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  const lines = frontmatterStr.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // 處理字串值（移除引號）
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // 處理陣列
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        // 保持原值
      }
    }

    // 處理布林值
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    frontmatter[key] = value;
  }

  return { frontmatter, body, hasFrontmatter: true };
}

/**
 * 驗證單一文章
 */
function validateArticle(filePath) {
  const errors = [];
  const warnings = [];
  const fileName = path.basename(filePath);

  // 讀取檔案
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return { errors: [`無法讀取檔案：${err.message}`], warnings: [] };
  }

  // 跳過 index.md 和 README.md
  if (fileName === 'index.md' || fileName === 'README.md') {
    return { errors: [], warnings: [], skipped: true };
  }

  // 1. 驗證檔名格式
  if (!FILENAME_REGEX.test(fileName)) {
    warnings.push(`檔名格式不符：應為 YYYY-MM-DD-slug.md，目前為 ${fileName}`);
  }

  // 2. 解析 frontmatter
  const { frontmatter, body, hasFrontmatter } = parseFrontmatter(content);

  if (!hasFrontmatter) {
    errors.push('缺少 YAML frontmatter（檔案開頭應有 --- 區塊）');
    return { errors, warnings };
  }

  // 3. 驗證必填欄位
  for (const field of REQUIRED_FIELDS) {
    if (!frontmatter[field]) {
      errors.push(`缺少必填欄位：${field}`);
    }
  }

  // 4. 驗證 date 格式
  if (frontmatter.date) {
    const dateStr = String(frontmatter.date);
    if (!DATE_REGEX.test(dateStr)) {
      errors.push(`date 格式錯誤：應為 YYYY-MM-DD，目前為 ${dateStr}`);
    }
  }

  // 5. 驗證 status 值
  if (frontmatter.status && !VALID_STATUS.includes(frontmatter.status)) {
    errors.push(`status 值無效：應為 ${VALID_STATUS.join('/')}, 目前為 ${frontmatter.status}`);
  }

  // 6. 驗證 category 值
  if (frontmatter.category && !VALID_CATEGORIES.includes(frontmatter.category)) {
    warnings.push(`category 值不在建議清單中：${frontmatter.category}（建議：${VALID_CATEGORIES.join(', ')}）`);
  }

  // 7. 檢查 H1 標題
  const h1Match = body.match(/^# .+$/m);
  if (!h1Match) {
    warnings.push('內容中缺少 H1 標題（# 開頭的標題）');
  }

  // 8. 檢查多個 H1 標題
  const h1Matches = body.match(/^# .+$/gm);
  if (h1Matches && h1Matches.length > 1) {
    warnings.push(`內容中有多個 H1 標題（${h1Matches.length} 個），建議只保留一個`);
  }

  // 9. 建議欄位
  if (!frontmatter.author) {
    warnings.push('建議填寫 author 欄位');
  }

  if (!frontmatter.tags || (Array.isArray(frontmatter.tags) && frontmatter.tags.length === 0)) {
    warnings.push('建議填寫 tags 欄位');
  }

  return { errors, warnings };
}

/**
 * 掃描目錄中的 Markdown 檔案
 */
function scanDirectory(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    console.error(`❌ 目錄不存在：${dir}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    } else if (entry.isDirectory() && !entry.name.startsWith('.')) {
      files.push(...scanDirectory(fullPath));
    }
  }

  return files;
}

/**
 * 主程式
 */
function main() {
  const resolvedPath = path.resolve(targetPath);

  let files = [];

  if (fs.statSync(resolvedPath).isDirectory()) {
    files = scanDirectory(resolvedPath);
    if (!quietMode) {
      console.log(`📂 掃描目錄：${resolvedPath}`);
      console.log(`📄 找到 ${files.length} 個 Markdown 檔案\n`);
    }
  } else {
    files = [resolvedPath];
  }

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalPassed = 0;
  let totalSkipped = 0;

  for (const file of files) {
    const relativePath = path.relative(process.cwd(), file);
    const result = validateArticle(file);

    if (result.skipped) {
      totalSkipped++;
      continue;
    }

    if (result.errors.length === 0 && result.warnings.length === 0) {
      totalPassed++;
      if (!quietMode) {
        console.log(`✅ ${relativePath}`);
      }
    } else {
      if (result.errors.length > 0) {
        console.log(`❌ ${relativePath}`);
        for (const error of result.errors) {
          console.log(`   錯誤：${error}`);
          totalErrors++;
        }
      }

      if (result.warnings.length > 0) {
        if (result.errors.length === 0) {
          console.log(`⚠️  ${relativePath}`);
        }
        for (const warning of result.warnings) {
          console.log(`   警告：${warning}`);
          totalWarnings++;
        }
      }
    }
  }

  // 摘要
  console.log('\n---');
  console.log(`📊 驗證摘要：`);
  console.log(`   檔案數：${files.length - totalSkipped}`);
  console.log(`   通過：${totalPassed}`);
  console.log(`   錯誤：${totalErrors}`);
  console.log(`   警告：${totalWarnings}`);
  if (totalSkipped > 0) {
    console.log(`   跳過：${totalSkipped}（index.md / README.md）`);
  }

  // 退出碼
  if (totalErrors > 0) {
    process.exit(1);
  }
}

main();
