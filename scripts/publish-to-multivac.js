#!/usr/bin/env node

/**
 * Pensieve → Multivac42 發布腳本
 *
 * 功能：
 * 1. 掃描 publish: true 的文章
 * 2. 格式轉換（移除元資料區塊等）
 * 3. 複製到 Multivac42（公司研究依公司分類）
 * 4. 同步狀態檢查
 *
 * 使用方式：
 *   node scripts/publish-to-multivac.js [--dry-run] [--status]
 *
 * 選項：
 *   --dry-run  只顯示會執行的操作，不實際複製
 *   --status   只顯示同步狀態，不執行發布
 *
 * M42 目錄結構：
 *   docs/articles/           - 時事評論（平面結構）
 *   docs/company-research/   - 公司研究（依公司分類）
 *     ├── airwallex/
 *     ├── manus-ai/
 *     └── ...
 *   docs/topic-research/     - 產業研究（平面結構）
 */

const fs = require('fs');
const path = require('path');

// 路徑設定
const PENSIEVE_ROOT = path.resolve(__dirname, '..');
const MULTIVAC_ROOT = path.resolve(PENSIEVE_ROOT, '..', 'multivac42');

// 來源目錄設定
// type: 'flat' = 平面結構, 'by-company' = 依公司分類
const SOURCE_DIRS = [
  { src: 'docs/articles', dest: 'docs/articles', type: 'flat' },
  { src: 'docs/company-research', dest: 'docs/company-research', type: 'by-company' },
  { src: 'docs/topic-research', dest: 'docs/topic-research', type: 'flat' }
];

// 公司名稱對應表（檔名關鍵字 → 資料夾名稱）
// 若產品名知名度大於公司名，使用產品名
const COMPANY_MAPPING = {
  'airwallex': 'airwallex',
  'manus': 'manus-ai',
  'luckin': 'luckin-coffee',
  'toast': 'toast',
  'hotai': 'hotai',
  'REDACTED': 'REDACTED',
  'REDACTED': 'REDACTED'  // REDACTED也對應到 REDACTED
};

// 預設作者
const DEFAULT_AUTHOR = 'Clement Tang';

// 解析命令列參數
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const statusOnly = args.includes('--status');

/**
 * 解析 YAML frontmatter
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };

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

  return { frontmatter, body };
}

/**
 * 生成 YAML frontmatter
 */
function generateFrontmatter(fm) {
  let yaml = '---\n';

  for (const [key, value] of Object.entries(fm)) {
    if (Array.isArray(value)) {
      yaml += `${key}: ${JSON.stringify(value)}\n`;
    } else if (typeof value === 'string' && (value.includes(':') || value.includes('"'))) {
      yaml += `${key}: "${value}"\n`;
    } else {
      yaml += `${key}: ${value}\n`;
    }
  }

  yaml += '---';
  return yaml;
}

/**
 * 移除 ## 元資料 區塊
 */
function removeMetadataSection(body) {
  // 匹配 ## 元資料 區塊（到下一個 ## 或 --- 為止）
  const pattern = /## 元資料\n\n[\s\S]*?(?=\n---|\n## |$)/;
  return body.replace(pattern, '').trim();
}

/**
 * 移除文末的 *最後更新：...*
 */
function removeLastUpdated(body) {
  return body.replace(/\n\*最後更新：.*\*\s*$/, '').trim();
}

/**
 * 轉換文章格式
 */
function transformArticle(content, filePath) {
  const { frontmatter, body } = parseFrontmatter(content);

  // 確保必要欄位
  if (!frontmatter.author) {
    frontmatter.author = DEFAULT_AUTHOR;
  }

  // 補充 lastModified（使用檔案修改時間）
  if (!frontmatter.lastModified) {
    const stats = fs.statSync(filePath);
    const mtime = stats.mtime;
    frontmatter.lastModified = mtime.toISOString().split('T')[0];
  }

  // 轉換內容
  let transformedBody = body;
  transformedBody = removeMetadataSection(transformedBody);
  transformedBody = removeLastUpdated(transformedBody);

  // 組合最終內容
  const newFrontmatter = generateFrontmatter(frontmatter);
  return `${newFrontmatter}\n\n${transformedBody}\n`;
}

/**
 * 取得檔案的修改時間
 */
function getFileModTime(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.getTime();
  } catch {
    return 0;
  }
}

/**
 * 掃描目錄中的 Markdown 檔案
 */
function scanMarkdownFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md' && entry.name !== 'README.md') {
      files.push(path.join(dir, entry.name));
    }
  }

  return files;
}

/**
 * 從檔名推測公司名稱
 */
function getCompanyFromFilename(filename) {
  const lowerFilename = filename.toLowerCase();

  for (const [keyword, companyFolder] of Object.entries(COMPANY_MAPPING)) {
    if (lowerFilename.includes(keyword)) {
      return companyFolder;
    }
  }

  // 如果找不到對應，嘗試從檔名提取（移除日期後的第一個單詞）
  const match = filename.match(/^\d{4}-\d{2}-\d{2}-([a-z]+)/i);
  if (match) {
    return match[1].toLowerCase();
  }

  return 'misc';  // 無法識別的放入 misc
}

/**
 * 計算目標路徑
 */
function getDestPath(filePath, srcDir, destDir, dirType) {
  const fileName = path.basename(filePath);

  if (dirType === 'by-company') {
    const company = getCompanyFromFilename(fileName);
    return path.join(MULTIVAC_ROOT, destDir, company, fileName);
  }

  return path.join(MULTIVAC_ROOT, destDir, fileName);
}

/**
 * 主程式
 */
function main() {
  console.log('🧠 Pensieve → Multivac42 發布腳本\n');

  // 檢查 Multivac42 目錄
  if (!fs.existsSync(MULTIVAC_ROOT)) {
    console.error(`❌ 找不到 Multivac42 目錄：${MULTIVAC_ROOT}`);
    process.exit(1);
  }

  const toPublish = [];      // 要發布的文章
  const needsUpdate = [];    // 已發布但有更新的文章
  const notPublished = [];   // 標記 publish: true 但尚未發布的文章

  // 掃描所有來源目錄
  for (const { src, dest, type } of SOURCE_DIRS) {
    const srcDir = path.join(PENSIEVE_ROOT, src);

    const files = scanMarkdownFiles(srcDir);

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter } = parseFrontmatter(content);

      if (frontmatter.publish !== true) continue;

      const destPath = getDestPath(filePath, src, dest, type);

      const srcModTime = getFileModTime(filePath);
      const destModTime = getFileModTime(destPath);

      const article = {
        srcPath: filePath,
        destPath: destPath,
        title: frontmatter.title || path.basename(filePath),
        relativeSrc: path.relative(PENSIEVE_ROOT, filePath),
        relativeDest: path.relative(MULTIVAC_ROOT, destPath)
      };

      if (destModTime === 0) {
        // 目標不存在，需要發布
        notPublished.push(article);
        toPublish.push(article);
      } else if (srcModTime > destModTime) {
        // 來源較新，需要更新
        needsUpdate.push(article);
        toPublish.push(article);
      }
    }
  }

  // 顯示狀態
  console.log('📊 同步狀態：\n');

  if (notPublished.length > 0) {
    console.log(`📝 新文章待發布 (${notPublished.length} 篇)：`);
    for (const a of notPublished) {
      console.log(`   - ${a.title}`);
    }
    console.log();
  }

  if (needsUpdate.length > 0) {
    console.log(`🔄 已修改待更新 (${needsUpdate.length} 篇)：`);
    for (const a of needsUpdate) {
      console.log(`   - ${a.title}`);
    }
    console.log();
  }

  if (toPublish.length === 0) {
    console.log('✅ 所有文章都已是最新狀態！\n');
    return;
  }

  // 如果只是查看狀態，到此結束
  if (statusOnly) {
    console.log(`共 ${toPublish.length} 篇文章需要處理。\n`);
    console.log('使用 node scripts/publish-to-multivac.js 執行發布。');
    return;
  }

  // 執行發布
  console.log('---\n');

  if (isDryRun) {
    console.log('🔍 Dry Run 模式（不會實際複製檔案）\n');
  }

  console.log(`📤 開始發布 ${toPublish.length} 篇文章...\n`);

  for (const article of toPublish) {
    console.log(`   處理：${article.title}`);
    console.log(`   來源：${article.relativeSrc}`);
    console.log(`   目標：${article.relativeDest}`);

    if (!isDryRun) {
      // 確保目標目錄存在
      const destDir = path.dirname(article.destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // 讀取、轉換、寫入
      const content = fs.readFileSync(article.srcPath, 'utf-8');
      const transformed = transformArticle(content, article.srcPath);
      fs.writeFileSync(article.destPath, transformed);

      console.log(`   ✅ 完成`);
    } else {
      console.log(`   ⏸️  跳過（dry-run）`);
    }

    console.log();
  }

  console.log('---\n');
  console.log(`✅ 發布完成！共處理 ${toPublish.length} 篇文章。\n`);

  if (!isDryRun) {
    console.log('下一步：');
    console.log('  cd ~/multivac42');
    console.log('  git add -A');
    console.log('  git commit -m "發布/更新文章"');
    console.log('  git push');
  }
}

main();
