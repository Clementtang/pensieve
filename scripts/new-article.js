#!/usr/bin/env node

/**
 * Pensieve 新文章初始化腳本
 *
 * 功能：
 * 1. 從模板建立新文章
 * 2. 自動生成檔名（含日期）
 * 3. 預填 frontmatter（date, author, status）
 * 4. 放入 drafts/ 目錄
 *
 * 使用方式：
 *   node scripts/new-article.js --type <type> --title "標題" [--slug slug]
 *
 * 範例：
 *   node scripts/new-article.js --type article --title "AI 趨勢分析"
 *   node scripts/new-article.js --type company --title "Tesla 研究" --slug tesla-research
 *   node scripts/new-article.js --type note --title "會議筆記"
 *
 * 可用類型：
 *   article   - 一般文章
 *   note      - 筆記
 *   tutorial  - 教學
 *   company   - 企業研究
 *   industry  - 產業研究
 *   topic     - 議題研究（完整版）
 *   topic-lite - 議題研究（精簡版）
 *   memo      - 研究備忘錄
 */

const fs = require('fs');
const path = require('path');

// 路徑設定
const PENSIEVE_ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(PENSIEVE_ROOT, 'templates');
const DRAFTS_DIR = path.join(PENSIEVE_ROOT, 'drafts');

// 模板對應表
const TEMPLATE_MAP = {
  'article': {
    file: 'article-template.md',
    category: 'articles',
    description: '一般文章'
  },
  'note': {
    file: 'note-template.md',
    category: 'note',
    description: '筆記'
  },
  'tutorial': {
    file: 'tutorial-template.md',
    category: 'tutorial',
    description: '教學'
  },
  'company': {
    file: 'company-research-template.md',
    category: 'company-research',
    description: '企業研究'
  },
  'industry': {
    file: 'industry-research-template.md',
    category: 'topic-research',
    description: '產業研究'
  },
  'topic': {
    file: 'topic-research-template.md',
    category: 'topic-research',
    description: '議題研究（完整版）'
  },
  'topic-lite': {
    file: 'topic-research-lite-template.md',
    category: 'topic-research',
    description: '議題研究（精簡版）'
  },
  'memo': {
    file: 'research-memo-template.md',
    category: 'memo',
    description: '研究備忘錄'
  }
};

// 預設作者
const DEFAULT_AUTHOR = 'Clement Tang';

/**
 * 解析命令列參數
 */
function parseArgs(args) {
  const result = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--type' && args[i + 1]) {
      result.type = args[i + 1];
      i++;
    } else if (args[i] === '--title' && args[i + 1]) {
      result.title = args[i + 1];
      i++;
    } else if (args[i] === '--slug' && args[i + 1]) {
      result.slug = args[i + 1];
      i++;
    } else if (args[i] === '--help' || args[i] === '-h') {
      result.help = true;
    }
  }

  return result;
}

/**
 * 顯示使用說明
 */
function showHelp() {
  console.log(`
📝 Pensieve 新文章初始化腳本

使用方式：
  node scripts/new-article.js --type <type> --title "標題" [--slug slug]

必要參數：
  --type <type>     模板類型
  --title "標題"    文章標題

可選參數：
  --slug <slug>     自訂檔名（預設從標題生成）
  --help, -h        顯示此說明

可用類型：
`);

  for (const [type, config] of Object.entries(TEMPLATE_MAP)) {
    console.log(`  ${type.padEnd(12)} - ${config.description}`);
  }

  console.log(`
範例：
  node scripts/new-article.js --type article --title "AI 趨勢分析"
  node scripts/new-article.js --type company --title "Tesla 研究" --slug tesla-research
  node scripts/new-article.js --type memo --title "專案備忘"
`);
}

/**
 * 從標題生成 slug
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff-]/g, '') // 保留中文、英文、數字、空格、連字號
    .replace(/\s+/g, '-')                   // 空格轉連字號
    .replace(/-+/g, '-')                    // 多個連字號合併
    .replace(/^-|-$/g, '')                  // 移除首尾連字號
    .substring(0, 50);                      // 限制長度
}

/**
 * 取得今天日期 (YYYY-MM-DD)
 */
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 更新 frontmatter
 */
function updateFrontmatter(content, title, category, date) {
  // 檢查是否有 frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    // 沒有 frontmatter，新增一個
    const frontmatter = `---
title: "${title}"
description: ""
date: ${date}
author: "${DEFAULT_AUTHOR}"
tags: []
category: ${category}
status: draft
---

`;
    return frontmatter + content;
  }

  // 有 frontmatter，更新欄位
  let frontmatterStr = match[1];
  const body = content.slice(match[0].length);

  // 更新 title
  if (frontmatterStr.includes('title:')) {
    frontmatterStr = frontmatterStr.replace(/title:.*/, `title: "${title}"`);
  }

  // 更新 date
  if (frontmatterStr.includes('date:')) {
    frontmatterStr = frontmatterStr.replace(/date:.*/, `date: ${date}`);
  }

  // 更新 author
  if (frontmatterStr.includes('author:')) {
    frontmatterStr = frontmatterStr.replace(/author:.*/, `author: "${DEFAULT_AUTHOR}"`);
  }

  // 更新 category
  if (frontmatterStr.includes('category:')) {
    frontmatterStr = frontmatterStr.replace(/category:.*/, `category: ${category}`);
  }

  // 更新 status
  if (frontmatterStr.includes('status:')) {
    frontmatterStr = frontmatterStr.replace(/status:.*/, `status: draft`);
  }

  return `---\n${frontmatterStr}\n---${body}`;
}

/**
 * 更新內容中的標題
 */
function updateContentTitle(content, title) {
  // 替換第一個 H1 標題
  return content.replace(/^# .+$/m, `# ${title}`);
}

/**
 * 主程式
 */
function main() {
  const args = parseArgs(process.argv.slice(2));

  // 顯示說明
  if (args.help || Object.keys(args).length === 0) {
    showHelp();
    process.exit(0);
  }

  // 驗證參數
  if (!args.type) {
    console.error('❌ 錯誤：請指定 --type 參數');
    console.log('使用 --help 查看可用類型');
    process.exit(1);
  }

  if (!args.title) {
    console.error('❌ 錯誤：請指定 --title 參數');
    process.exit(1);
  }

  // 驗證類型
  const templateConfig = TEMPLATE_MAP[args.type];
  if (!templateConfig) {
    console.error(`❌ 錯誤：未知的類型 "${args.type}"`);
    console.log('可用類型：' + Object.keys(TEMPLATE_MAP).join(', '));
    process.exit(1);
  }

  // 生成檔名
  const today = getToday();
  const slug = args.slug || generateSlug(args.title);
  const filename = `${today}-${slug}.md`;
  const destPath = path.join(DRAFTS_DIR, filename);

  // 檢查檔案是否已存在
  if (fs.existsSync(destPath)) {
    console.error(`❌ 錯誤：檔案已存在：${filename}`);
    process.exit(1);
  }

  // 讀取模板
  const templatePath = path.join(TEMPLATES_DIR, templateConfig.file);
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ 錯誤：找不到模板：${templateConfig.file}`);
    process.exit(1);
  }

  let content = fs.readFileSync(templatePath, 'utf-8');

  // 更新內容
  content = updateFrontmatter(content, args.title, templateConfig.category, today);
  content = updateContentTitle(content, args.title);

  // 確保 drafts 目錄存在
  if (!fs.existsSync(DRAFTS_DIR)) {
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  }

  // 寫入檔案
  fs.writeFileSync(destPath, content);

  console.log(`✅ 已建立新文章：drafts/${filename}`);
  console.log(`   類型：${templateConfig.description}`);
  console.log(`   標題：${args.title}`);
  console.log('');
  console.log('下一步：');
  console.log(`  編輯檔案：vim drafts/${filename}`);
  console.log(`  完成後移動：mv drafts/${filename} docs/${templateConfig.category === 'note' ? 'notes' : templateConfig.category === 'memo' ? 'notes' : templateConfig.category}/`);
}

main();
