#!/usr/bin/env node
/**
 * 自動為現有 Markdown 文章加入 YAML frontmatter
 * 解析現有的「元資料」區塊並轉換為標準 frontmatter
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename, dirname } from 'path';

const DOCS_DIR = join(process.cwd(), 'docs');

// 需要處理的目錄（排除已有 frontmatter 的 index 頁面）
const TARGET_DIRS = ['articles', 'company-research'];

// 解析現有元資料區塊
function parseMetadata(content) {
  const metadata = {
    date: null,
    tags: [],
    description: null
  };

  // 嘗試匹配元資料區塊
  const metaBlockMatch = content.match(/## 元資料\s*\n([\s\S]*?)(?=\n---|\n## )/);
  if (!metaBlockMatch) return metadata;

  const metaBlock = metaBlockMatch[1];

  // 解析建立日期
  const dateMatch = metaBlock.match(/\*\*建立日期[：:]\*\*\s*(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    metadata.date = dateMatch[1];
  }

  // 解析標籤
  const tagsMatch = metaBlock.match(/\*\*標籤[：:]\*\*\s*([^\n]+)/);
  if (tagsMatch) {
    metadata.tags = tagsMatch[1]
      .split(/[#,]/)
      .map(t => t.trim())
      .filter(t => t.length > 0);
  }

  return metadata;
}

// 從標題提取描述
function extractDescription(content) {
  // 嘗試從 blockquote 提取
  const blockquoteMatch = content.match(/^#[^\n]+\n\n>\s*([^\n]+)/m);
  if (blockquoteMatch) {
    return blockquoteMatch[1].trim();
  }
  return null;
}

// 從文件名提取日期和 slug
function parseFilename(filename) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  if (match) {
    return { date: match[1], slug: match[2] };
  }
  return { date: null, slug: filename.replace('.md', '') };
}

// 檢查是否已有 frontmatter
function hasFrontmatter(content) {
  return content.startsWith('---\n');
}

// 提取標題
function extractTitle(content) {
  const match = content.match(/^#\s+(.+)/m);
  return match ? match[1].trim() : null;
}

// 根據目錄決定分類
function getCategory(dir) {
  switch (dir) {
    case 'articles': return 'articles';
    case 'company-research': return 'companies';
    case 'topic-research': return 'topics';
    default: return 'articles';
  }
}

// 處理單個文件
function processFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  const filename = basename(filepath);
  const parentDir = basename(dirname(filepath));

  // 跳過已有 frontmatter 的文件
  if (hasFrontmatter(content)) {
    console.log(`⏭️  已有 frontmatter: ${filename}`);
    return false;
  }

  // 跳過 index 和 README 文件
  if (filename === 'index.md' || filename === 'README.md') {
    console.log(`⏭️  跳過 index 文件: ${filename}`);
    return false;
  }

  // 解析資料
  const title = extractTitle(content);
  const description = extractDescription(content);
  const metadata = parseMetadata(content);
  const fileInfo = parseFilename(filename);
  const category = getCategory(parentDir);

  // 優先使用元資料中的日期，否則使用文件名中的日期
  const date = metadata.date || fileInfo.date || new Date().toISOString().split('T')[0];

  // 建立 frontmatter
  const frontmatter = [
    '---',
    `title: "${title ? title.replace(/"/g, '\\"') : filename}"`,
    description ? `description: "${description.replace(/"/g, '\\"')}"` : null,
    `date: ${date}`,
    metadata.tags.length > 0 ? `tags: [${metadata.tags.map(t => `"${t}"`).join(', ')}]` : null,
    `category: ${category}`,
    '---',
    ''
  ].filter(Boolean).join('\n');

  // 寫入文件
  const newContent = frontmatter + content;
  writeFileSync(filepath, newContent, 'utf-8');
  console.log(`✅ 已處理: ${filename}`);
  return true;
}

// 遞迴處理目錄
function processDirectory(dirPath) {
  const entries = readdirSync(dirPath);
  let processed = 0;

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      processed += processDirectory(fullPath);
    } else if (entry.endsWith('.md')) {
      if (processFile(fullPath)) {
        processed++;
      }
    }
  }

  return processed;
}

// 主程式
console.log('🚀 開始處理 Markdown 文件...\n');

let total = 0;
for (const dir of TARGET_DIRS) {
  const dirPath = join(DOCS_DIR, dir);
  console.log(`\n📁 處理目錄: ${dir}`);
  total += processDirectory(dirPath);
}

console.log(`\n✨ 完成！共處理 ${total} 個文件`);
