#!/usr/bin/env node
/**
 * 修復 frontmatter 格式 - 確保 --- 後有正確的換行
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DOCS_DIR = join(process.cwd(), 'docs');
const TARGET_DIRS = ['articles', 'company-research'];

function fixFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');

  // 只處理有 frontmatter 的文件
  if (!content.startsWith('---\n')) return false;

  // 檢查是否有格式問題: ---# 或 ---後面沒有換行再接內容
  const match = content.match(/^---\n([\s\S]*?)---([^\n])/);
  if (!match) return false;

  // 修復：在第二個 --- 後加入換行
  const fixed = content.replace(/^(---\n[\s\S]*?---)([^\n])/, '$1\n\n$2');

  if (fixed !== content) {
    writeFileSync(filepath, fixed, 'utf-8');
    console.log(`✅ 修復: ${filepath.split('/').pop()}`);
    return true;
  }
  return false;
}

function processDir(dir) {
  const entries = readdirSync(dir);
  let count = 0;

  for (const entry of entries) {
    const path = join(dir, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      count += processDir(path);
    } else if (entry.endsWith('.md')) {
      if (fixFile(path)) count++;
    }
  }
  return count;
}

console.log('🔧 修復 frontmatter 格式...\n');

let total = 0;
for (const dir of TARGET_DIRS) {
  total += processDir(join(DOCS_DIR, dir));
}

console.log(`\n✨ 完成！修復了 ${total} 個文件`);
