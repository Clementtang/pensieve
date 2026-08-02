#!/usr/bin/env node

/**
 * 草稿生命週期檢視
 *
 * 列出 drafts/ 下的草稿年齡，標記超過門檻（預設 30 天）未更新者。
 *
 * 使用方式：
 *   node scripts/review-drafts.js [--days 30] [--json]
 */

const fs = require("fs");
const path = require("path");
const { parseFrontmatter } = require("./lib/frontmatter");

const PENSIEVE_ROOT = path.resolve(__dirname, "..");
const DRAFTS_DIR = path.join(PENSIEVE_ROOT, "drafts");
const DEFAULT_DAYS = 30;

/**
 * 計算與參考日相差的整天數（檔案 mtime 較舊時為正）
 */
function daysSince(mtime, now = new Date()) {
  const ms = now.getTime() - mtime.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

/**
 * 掃描草稿目錄
 * @param {Object} options
 * @param {string} [options.draftsDir]
 * @param {number} [options.daysThreshold=30]
 * @param {Date} [options.now]
 * @returns {{ drafts: Array, staleCount: number, daysThreshold: number }}
 */
function reviewDrafts(options = {}) {
  const {
    draftsDir = DRAFTS_DIR,
    daysThreshold = DEFAULT_DAYS,
    now = new Date(),
  } = options;

  if (!fs.existsSync(draftsDir)) {
    return { drafts: [], staleCount: 0, daysThreshold };
  }

  const entries = fs.readdirSync(draftsDir, { withFileTypes: true });
  const drafts = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    if (entry.name === "README.md" || entry.name === "index.md") continue;

    const filePath = path.join(draftsDir, entry.name);
    const stats = fs.statSync(filePath);
    const ageDays = daysSince(stats.mtime, now);

    let title = null;
    let status = null;
    let date = null;

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const { frontmatter, hasFrontmatter } = parseFrontmatter(content);
      if (hasFrontmatter) {
        title = frontmatter.title || null;
        status = frontmatter.status || null;
        date = frontmatter.date ? String(frontmatter.date) : null;
      }
    } catch {
      // 讀取失敗仍回報檔案基本資訊
    }

    // archived / published 不計入「過期草稿」告警
    const isClosed =
      status === "archived" || status === "published";
    const stale = !isClosed && ageDays >= daysThreshold;

    drafts.push({
      file: entry.name,
      path: filePath,
      title,
      status,
      date,
      mtime: stats.mtime.toISOString(),
      ageDays,
      stale,
      suggestion: isClosed
        ? "已結案（archived/published），可保留作底稿"
        : stale
          ? "超過門檻未更新：考慮完成發布、移入 private、或刪除"
          : "持續撰寫中",
    });
  }

  drafts.sort((a, b) => b.ageDays - a.ageDays);

  return {
    drafts,
    staleCount: drafts.filter((d) => d.stale).length,
    daysThreshold,
  };
}

function parseCliArgs(argv) {
  const result = { days: DEFAULT_DAYS, json: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--days" && argv[i + 1]) {
      const n = Number(argv[i + 1]);
      if (!Number.isFinite(n) || n < 0) {
        throw new Error(`--days 需為非負數字，目前為 ${argv[i + 1]}`);
      }
      result.days = n;
      i++;
    } else if (argv[i] === "--json") {
      result.json = true;
    } else if (argv[i] === "--help" || argv[i] === "-h") {
      result.help = true;
    }
  }
  return result;
}

function showHelp() {
  console.log(`
草稿生命週期檢視

使用方式：
  node scripts/review-drafts.js [--days 30] [--json]

選項：
  --days <n>   超過 n 天未更新視為過期（預設 30）
  --json       以 JSON 輸出
  --help, -h   顯示說明
`);
}

function main() {
  let args;
  try {
    args = parseCliArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }

  if (args.help) {
    showHelp();
    process.exit(0);
  }

  const report = reviewDrafts({ daysThreshold: args.days });

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
    process.exit(0);
  }

  console.log(`📂 drafts/ 草稿檢視（門檻 ${report.daysThreshold} 天）\n`);

  if (report.drafts.length === 0) {
    console.log("（無草稿）");
    process.exit(0);
  }

  for (const d of report.drafts) {
    const mark = d.stale ? "⚠️ " : "  ";
    const title = d.title || "(無 title)";
    const status = d.status || "?";
    console.log(
      `${mark}${d.file}  age=${d.ageDays}d  status=${status}  ${title}`,
    );
    if (d.stale) {
      console.log(`     → ${d.suggestion}`);
    }
  }

  console.log("\n---");
  console.log(
    `共 ${report.drafts.length} 篇，其中 ${report.staleCount} 篇超過 ${report.daysThreshold} 天未更新`,
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  reviewDrafts,
  daysSince,
  parseCliArgs,
  DEFAULT_DAYS,
};
