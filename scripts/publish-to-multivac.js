#!/usr/bin/env node

/**
 * Pensieve → Multivac42 發布腳本
 *
 * 功能：
 * 1. 掃描 status: published 的文章
 * 2. 根據 frontmatter category 欄位決定目標目錄
 * 3. 格式轉換（移除元資料區塊等）
 * 4. 複製到 Multivac42（公司研究依公司分類）
 * 5. 同步狀態檢查
 *
 * 使用方式：
 *   node scripts/publish-to-multivac.js [--dry-run] [--status] [--validate] [--verbose]
 *
 * 選項：
 *   --dry-run      只顯示會執行的操作，不實際複製
 *   --status       只顯示同步狀態，不執行發布
 *   --validate     發布前驗證必填欄位（title, description, date, category）
 *   --verbose      顯示詳細的處理過程與錯誤資訊
 *   --auto-commit  發布後自動在 M42 執行 git add + commit（不會 push）
 *
 * 分類邏輯（根據 frontmatter category 欄位）：
 *   category: articles        → docs/articles/（平面結構）
 *   category: company-research → docs/company-research/（依公司分類）
 *   category: topic-research  → docs/topic-research/（平面結構）
 *
 * M42 目錄結構：
 *   docs/articles/           - 時事評論（平面結構）
 *   docs/company-research/   - 公司研究（依公司分類）
 *     ├── airwallex/
 *     ├── manus-ai/
 *     └── ...
 *   docs/topic-research/     - 產業研究（平面結構）
 */

const fs = require("fs");
const path = require("path");

// 路徑設定
const PENSIEVE_ROOT = path.resolve(__dirname, "..");
const MULTIVAC_ROOT = path.resolve(PENSIEVE_ROOT, "..", "multivac42");

// 來源目錄設定（掃描這些目錄下的所有 .md 檔案）
const SOURCE_DIRS = [
  "docs/articles",
  "docs/company-research",
  "docs/topic-research",
];

// Category 對應的目標目錄與處理方式
// type: 'flat' = 平面結構, 'by-company' = 依公司分類
const CATEGORY_CONFIG = {
  articles: { dest: "docs/articles", type: "flat" },
  "company-research": { dest: "docs/company-research", type: "by-company" },
  "topic-research": { dest: "docs/topic-research", type: "flat" },
};

// 公司名稱對應表（檔名關鍵字 → 資料夾名稱）
// 若產品名知名度大於公司名，使用產品名
const COMPANY_MAPPING = {
  airwallex: "airwallex",
  manus: "manus-ai",
  luckin: "luckin-coffee",
  toast: "toast",
  hotai: "hotai",
  wixtar: "wixtar",
  xingyi: "wixtar", // 興藝昕也對應到 wixtar
};

// 預設作者
const DEFAULT_AUTHOR = "Clement Tang";

// 解析命令列參數
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const statusOnly = args.includes("--status");
const validateMode = args.includes("--validate");
const verboseMode = args.includes("--verbose");
const autoCommit = args.includes("--auto-commit");

// 錯誤追蹤
const processingErrors = [];

/**
 * 詳細日誌輸出（只在 verbose 模式顯示）
 */
function verbose(message) {
  if (verboseMode) {
    console.log(`   [詳細] ${message}`);
  }
}

/**
 * 記錄錯誤
 */
function logError(filePath, errorType, message, details = null) {
  const error = {
    file: path.relative(PENSIEVE_ROOT, filePath),
    type: errorType,
    message: message,
    details: details,
  };
  processingErrors.push(error);

  if (verboseMode) {
    console.log(`   [錯誤] ${errorType}: ${message}`);
    if (details) {
      console.log(`          ${details}`);
    }
  }
}

// 必填欄位（發布時驗證）
const REQUIRED_FIELDS_FOR_PUBLISH = [
  "title",
  "description",
  "date",
  "category",
];

/**
 * 驗證文章是否符合發布要求
 */
function validateForPublish(frontmatter, filePath) {
  const errors = [];
  const fileName = path.basename(filePath);

  // 檢查必填欄位
  for (const field of REQUIRED_FIELDS_FOR_PUBLISH) {
    if (!frontmatter[field]) {
      errors.push(`缺少必填欄位：${field}`);
    }
  }

  // 檢查日期格式
  if (frontmatter.date) {
    const dateStr = String(frontmatter.date);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      errors.push(`date 格式錯誤：應為 YYYY-MM-DD`);
    }
  }

  // 檢查檔名格式
  if (!/^\d{4}-\d{2}-\d{2}-[\w-]+\.md$/.test(fileName)) {
    errors.push(`檔名格式不符：應為 YYYY-MM-DD-slug.md`);
  }

  return errors;
}

/**
 * 解析 YAML frontmatter
 * @param {string} content - 檔案內容
 * @param {string} filePath - 檔案路徑（用於錯誤報告）
 * @returns {{frontmatter: Object, body: string, parseError: string|null}}
 */
function parseFrontmatter(content, filePath = "unknown") {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {
      frontmatter: {},
      body: content,
      parseError: "檔案缺少 YAML frontmatter（--- 區塊）",
    };
  }

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  const lines = frontmatterStr.split("\n");
  let lineNumber = 0;

  for (const line of lines) {
    lineNumber++;
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      // 空行或無效行，跳過
      if (line.trim() !== "") {
        verbose(`第 ${lineNumber} 行格式不正確，跳過：${line}`);
      }
      continue;
    }

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (!key) {
      verbose(`第 ${lineNumber} 行缺少 key，跳過`);
      continue;
    }

    // 處理字串值（移除引號）
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // 處理陣列
    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        logError(
          filePath,
          "YAML_PARSE",
          `第 ${lineNumber} 行陣列解析失敗`,
          `key: ${key}, value: ${value}`,
        );
        // 保持原值
      }
    }

    // 處理布林值
    if (value === "true") value = true;
    if (value === "false") value = false;

    frontmatter[key] = value;
  }

  return { frontmatter, body, parseError: null };
}

/**
 * 生成 YAML frontmatter
 */
function generateFrontmatter(fm) {
  let yaml = "---\n";

  for (const [key, value] of Object.entries(fm)) {
    if (Array.isArray(value)) {
      yaml += `${key}: ${JSON.stringify(value)}\n`;
    } else if (
      typeof value === "string" &&
      (value.includes(":") || value.includes('"'))
    ) {
      yaml += `${key}: "${value}"\n`;
    } else {
      yaml += `${key}: ${value}\n`;
    }
  }

  yaml += "---";
  return yaml;
}

/**
 * 移除 ## 元資料 區塊
 */
function removeMetadataSection(body) {
  // 匹配 ## 元資料 區塊（到下一個 ## 或 --- 為止）
  const pattern = /## 元資料\n\n[\s\S]*?(?=\n---|\n## |$)/;
  return body.replace(pattern, "").trim();
}

/**
 * 移除文末的 *最後更新：...* 或 _最後更新：..._
 */
function removeLastUpdated(body) {
  // 匹配兩種 Markdown 斜體格式：*...* 或 _..._
  return body.replace(/\n[*_]最後更新：.*[*_]\s*$/, "").trim();
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
    frontmatter.lastModified = mtime.toISOString().split("T")[0];
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
    if (
      entry.isFile() &&
      entry.name.endsWith(".md") &&
      entry.name !== "index.md" &&
      entry.name !== "README.md"
    ) {
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

  return "misc"; // 無法識別的放入 misc
}

/**
 * 從來源路徑推斷 category
 */
function inferCategoryFromPath(srcDirRelative) {
  // docs/articles → articles
  // docs/company-research → company-research
  // docs/topic-research → topic-research
  const parts = srcDirRelative.split("/");
  return parts[parts.length - 1] || "articles";
}

/**
 * 根據 category 計算目標路徑
 */
function getDestPath(filePath, category) {
  const fileName = path.basename(filePath);

  // 取得該 category 的設定，預設為 articles
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG["articles"];
  const { dest, type } = config;

  if (type === "by-company") {
    const company = getCompanyFromFilename(fileName);
    return path.join(MULTIVAC_ROOT, dest, company, fileName);
  }

  return path.join(MULTIVAC_ROOT, dest, fileName);
}

/**
 * 主程式
 */
function main() {
  console.log("🧠 Pensieve → Multivac42 發布腳本\n");

  // 檢查 Multivac42 目錄
  if (!fs.existsSync(MULTIVAC_ROOT)) {
    console.error(`❌ 找不到 Multivac42 目錄：${MULTIVAC_ROOT}`);
    process.exit(1);
  }

  const toPublish = []; // 要發布的文章
  const needsUpdate = []; // 已發布但有更新的文章
  const notPublished = []; // 標記 status: published 但尚未發布的文章
  const validationErrors = []; // 驗證錯誤

  // 掃描所有來源目錄
  for (const srcDirRelative of SOURCE_DIRS) {
    const srcDir = path.join(PENSIEVE_ROOT, srcDirRelative);

    const files = scanMarkdownFiles(srcDir);

    for (const filePath of files) {
      verbose(`處理檔案：${path.relative(PENSIEVE_ROOT, filePath)}`);

      // 讀取檔案（含錯誤處理）
      let content;
      try {
        content = fs.readFileSync(filePath, "utf-8");
      } catch (err) {
        logError(filePath, "FILE_READ", `無法讀取檔案`, err.message);
        continue;
      }

      const { frontmatter, parseError } = parseFrontmatter(content, filePath);

      if (parseError) {
        logError(filePath, "FRONTMATTER", parseError);
        continue;
      }

      if (frontmatter.status !== "published") continue;

      // 根據 frontmatter category 決定目標，若無則根據來源目錄推斷
      const category =
        frontmatter.category || inferCategoryFromPath(srcDirRelative);
      const destPath = getDestPath(filePath, category);

      const srcModTime = getFileModTime(filePath);
      const destModTime = getFileModTime(destPath);

      // 驗證文章（如果啟用驗證模式）
      const errors = validateMode
        ? validateForPublish(frontmatter, filePath)
        : [];

      const article = {
        srcPath: filePath,
        destPath: destPath,
        title: frontmatter.title || path.basename(filePath),
        category: category,
        relativeSrc: path.relative(PENSIEVE_ROOT, filePath),
        relativeDest: path.relative(MULTIVAC_ROOT, destPath),
        validationErrors: errors,
      };

      if (errors.length > 0) {
        validationErrors.push(article);
      }

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
  console.log("📊 同步狀態：\n");

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
    console.log("✅ 所有文章都已是最新狀態！\n");
    return;
  }

  // 顯示驗證錯誤（如果有）
  if (validateMode && validationErrors.length > 0) {
    console.log(`⚠️  驗證錯誤 (${validationErrors.length} 篇)：\n`);
    for (const a of validationErrors) {
      console.log(`   ❌ ${a.title}`);
      for (const err of a.validationErrors) {
        console.log(`      - ${err}`);
      }
    }
    console.log();
    console.log("請修正上述問題後再發布。\n");
    console.log(
      "提示：使用 node scripts/validate-article.js <file> 進行詳細驗證。",
    );
    process.exit(1);
  }

  // 如果只是查看狀態，到此結束
  if (statusOnly) {
    console.log(`共 ${toPublish.length} 篇文章需要處理。\n`);
    console.log("使用 node scripts/publish-to-multivac.js 執行發布。");
    return;
  }

  // 執行發布
  console.log("---\n");

  if (isDryRun) {
    console.log("🔍 Dry Run 模式（不會實際複製檔案）\n");
  }

  console.log(`📤 開始發布 ${toPublish.length} 篇文章...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const article of toPublish) {
    console.log(`   處理：${article.title}`);
    console.log(`   來源：${article.relativeSrc}`);
    console.log(`   目標：${article.relativeDest}`);

    if (!isDryRun) {
      try {
        // 確保目標目錄存在
        const destDir = path.dirname(article.destPath);
        if (!fs.existsSync(destDir)) {
          verbose(`建立目錄：${destDir}`);
          fs.mkdirSync(destDir, { recursive: true });
        }

        // 讀取、轉換、寫入
        verbose(`讀取來源檔案...`);
        const content = fs.readFileSync(article.srcPath, "utf-8");

        verbose(`轉換內容格式...`);
        const transformed = transformArticle(content, article.srcPath);

        verbose(`寫入目標檔案...`);
        fs.writeFileSync(article.destPath, transformed);

        console.log(`   ✅ 完成`);
        successCount++;
      } catch (err) {
        logError(article.srcPath, "PUBLISH", `發布失敗`, err.message);
        console.log(`   ❌ 失敗：${err.message}`);
        failCount++;
      }
    } else {
      console.log(`   ⏸️  跳過（dry-run）`);
    }

    console.log();
  }

  console.log("---\n");

  // 顯示處理摘要
  if (!isDryRun) {
    if (failCount === 0) {
      console.log(`✅ 發布完成！成功處理 ${successCount} 篇文章。\n`);
    } else {
      console.log(`⚠️  發布完成（有錯誤）`);
      console.log(`   成功：${successCount} 篇`);
      console.log(`   失敗：${failCount} 篇\n`);
    }
  } else {
    console.log(`🔍 Dry Run 完成！共 ${toPublish.length} 篇文章待處理。\n`);
  }

  // 顯示錯誤摘要（如果有）
  if (processingErrors.length > 0) {
    console.log(`\n📋 錯誤摘要（共 ${processingErrors.length} 個）：\n`);
    for (const error of processingErrors) {
      console.log(`   ❌ [${error.type}] ${error.file}`);
      console.log(`      ${error.message}`);
      if (error.details) {
        console.log(`      詳細：${error.details}`);
      }
    }
    console.log();
  }

  // 自動 commit（如果有成功發布的文章）
  if (!isDryRun && successCount > 0 && autoCommit) {
    console.log("🔄 執行自動 Git Commit...\n");

    try {
      const { execFileSync } = require("child_process");

      // 切換到 M42 目錄
      process.chdir(MULTIVAC_ROOT);
      verbose(`切換到目錄：${MULTIVAC_ROOT}`);

      // git add（使用 execFileSync 避免 shell injection）
      verbose("執行 git add -A");
      execFileSync("git", ["add", "-A"], { encoding: "utf-8" });

      // 生成 commit 訊息
      const commitMsg =
        successCount === 1
          ? `發布文章：${toPublish[0].title}`
          : `發布/更新 ${successCount} 篇文章`;

      // git commit（使用 execFileSync 避免 shell injection）
      verbose(`執行 git commit -m "${commitMsg}"`);
      execFileSync("git", ["commit", "-m", commitMsg], { encoding: "utf-8" });

      console.log(`   ✅ Git commit 完成：${commitMsg}\n`);
      console.log("下一步：");
      console.log("  cd ~/multivac42");
      console.log("  git push");
    } catch (err) {
      // 檢查是否是 "nothing to commit" 的情況
      if (err.stderr && err.stderr.includes("nothing to commit")) {
        console.log("   ℹ️  沒有變更需要 commit\n");
      } else {
        logError(MULTIVAC_ROOT, "GIT_COMMIT", "Git commit 失敗", err.message);
        console.log(`   ❌ Git commit 失敗：${err.message}\n`);
      }
    }
  } else if (!isDryRun && failCount === 0 && successCount > 0) {
    console.log("下一步：");
    console.log("  cd ~/multivac42");
    console.log("  git add -A");
    console.log('  git commit -m "發布/更新文章"');
    console.log("  git push");
    console.log("\n💡 提示：使用 --auto-commit 可自動執行 git add + commit");
  }

  // 如果有失敗，退出碼為 1
  if (failCount > 0) {
    process.exit(1);
  }
}

main();
