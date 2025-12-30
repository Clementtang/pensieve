#!/usr/bin/env node
/**
 * 驗證 Markdown 文件的命名規範
 * 規則：YYYY-MM-DD-slug.md（slug 為小寫英文、數字、連字號）
 *
 * 用法：node scripts/validate-filenames.js
 */

import { readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

const DOCS_DIR = join(process.cwd(), 'docs');

// 需要驗證的目錄
const VALIDATE_DIRS = ['articles', 'company-research', 'topic-research'];

// 允許的特殊文件（不需要遵循日期命名規範）
const ALLOWED_FILES = ['index.md', 'README.md'];

// 文件名驗證正則：YYYY-MM-DD-slug.md
const FILENAME_PATTERN = /^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$/;

// 日期驗證
function isValidDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day;
}

const errors = [];
const warnings = [];

function validateDirectory(dirPath, dirName) {
  const entries = readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // 遞迴處理子目錄
      validateDirectory(fullPath, `${dirName}/${entry}`);
      continue;
    }

    // 只檢查 .md 文件
    if (!entry.endsWith('.md')) continue;

    // 跳過允許的特殊文件
    if (ALLOWED_FILES.includes(entry)) continue;

    // 驗證文件名格式
    if (!FILENAME_PATTERN.test(entry)) {
      // 檢查是否只是大小寫問題
      if (/^\d{4}-\d{2}-\d{2}-.+\.md$/.test(entry)) {
        const slug = entry.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '');
        if (slug !== slug.toLowerCase()) {
          errors.push({
            file: `${dirName}/${entry}`,
            issue: `Slug 包含大寫字母：${slug}`,
            suggestion: `建議改為：${entry.replace(slug, slug.toLowerCase())}`
          });
        } else if (/[^a-z0-9-]/.test(slug)) {
          errors.push({
            file: `${dirName}/${entry}`,
            issue: `Slug 包含非法字元`,
            suggestion: `只允許小寫英文、數字、連字號`
          });
        }
      } else {
        errors.push({
          file: `${dirName}/${entry}`,
          issue: `文件名不符合 YYYY-MM-DD-slug.md 格式`,
          suggestion: `例如：2025-01-15-my-article.md`
        });
      }
      continue;
    }

    // 驗證日期是否有效
    const dateStr = entry.substring(0, 10);
    if (!isValidDate(dateStr)) {
      errors.push({
        file: `${dirName}/${entry}`,
        issue: `日期無效：${dateStr}`,
        suggestion: `請使用有效的日期格式 YYYY-MM-DD`
      });
    }

    // 檢查未來日期
    const fileDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (fileDate > today) {
      warnings.push({
        file: `${dirName}/${entry}`,
        issue: `文件日期為未來日期：${dateStr}`
      });
    }
  }
}

console.log('🔍 驗證 Markdown 文件命名規範...\n');

for (const dir of VALIDATE_DIRS) {
  const dirPath = join(DOCS_DIR, dir);
  try {
    validateDirectory(dirPath, dir);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`❌ 無法讀取目錄：${dir}`);
    }
  }
}

// 輸出結果
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ 所有文件命名規範檢查通過！\n');
  process.exit(0);
}

if (warnings.length > 0) {
  console.log(`⚠️  發現 ${warnings.length} 個警告：\n`);
  for (const warning of warnings) {
    console.log(`  📄 ${warning.file}`);
    console.log(`     ${warning.issue}\n`);
  }
}

if (errors.length > 0) {
  console.log(`❌ 發現 ${errors.length} 個錯誤：\n`);
  for (const error of errors) {
    console.log(`  📄 ${error.file}`);
    console.log(`     問題：${error.issue}`);
    console.log(`     建議：${error.suggestion}\n`);
  }
  process.exit(1);
}

process.exit(0);
