#!/usr/bin/env node

/**
 * Markdown 參考連結檢查
 *
 * 掃描指定路徑下的 .md，抽出 markdown 連結與 bare URL，
 * 可選對 http(s) 做 HEAD/GET 探測。
 *
 * 使用方式：
 *   node scripts/check-links.js <file|directory> [--check] [--timeout 8000]
 *
 * 選項：
 *   --check     實際發 HTTP 請求驗證（預設只列出）
 *   --timeout   單一連線逾時毫秒（預設 8000）
 *   --json      JSON 輸出
 */

const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");

const MD_LINK_RE = /\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;
const BARE_URL_RE = /(?<!\]\()(?<!\]:\s)(https?:\/\/[^\s<>\]\)"']+)/g;

/**
 * 從 markdown 內文抽出連結
 * @returns {{ text: string, url: string, kind: 'markdown'|'bare', line: number }[]}
 */
function extractLinks(content) {
  const links = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;

    // 略過 fenced code 簡易處理：以 ``` 切段時不完美，夠用即可
    if (line.trim().startsWith("```")) continue;

    let m;
    const mdRe = new RegExp(MD_LINK_RE.source, "g");
    while ((m = mdRe.exec(line)) !== null) {
      links.push({
        text: m[1],
        url: m[2],
        kind: "markdown",
        line: lineNo,
      });
    }

    const bareRe = new RegExp(BARE_URL_RE.source, "g");
    while ((m = bareRe.exec(line)) !== null) {
      // 已包在 markdown 連結內的 URL 會被 markdown 規則先抓；bare 再抓時略過同一位置
      const url = m[1].replace(/[.,;:!?)]+$/, "");
      const already = links.some(
        (l) => l.line === lineNo && l.url === url && l.kind === "markdown",
      );
      if (!already) {
        links.push({ text: "", url, kind: "bare", line: lineNo });
      }
    }
  }

  return links;
}

/**
 * HEAD 優先，失敗再 GET；回傳 statusCode 或 error
 */
function probeUrl(url, timeoutMs = 8000) {
  return new Promise((resolve) => {
    let settled = false;
    const done = (result) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    let parsed;
    try {
      parsed = new URL(url);
    } catch (err) {
      done({ ok: false, status: null, error: `invalid URL: ${err.message}` });
      return;
    }

    const lib = parsed.protocol === "http:" ? http : https;
    const req = lib.request(
      url,
      {
        method: "HEAD",
        timeout: timeoutMs,
        headers: { "User-Agent": "pensieve-check-links/1.0" },
      },
      (res) => {
        // 部分站不支援 HEAD（405）時改 GET
        if (res.statusCode === 405) {
          res.resume();
          const getReq = lib.request(
            url,
            {
              method: "GET",
              timeout: timeoutMs,
              headers: { "User-Agent": "pensieve-check-links/1.0" },
            },
            (getRes) => {
              getRes.resume();
              const code = getRes.statusCode || 0;
              done({
                ok: code >= 200 && code < 400,
                status: code,
                error: null,
              });
            },
          );
          getReq.on("error", (e) =>
            done({ ok: false, status: null, error: e.message }),
          );
          getReq.on("timeout", () => {
            getReq.destroy();
            done({ ok: false, status: null, error: "timeout" });
          });
          getReq.end();
          return;
        }
        res.resume();
        const code = res.statusCode || 0;
        done({
          ok: code >= 200 && code < 400,
          status: code,
          error: null,
        });
      },
    );

    req.on("error", (e) => done({ ok: false, status: null, error: e.message }));
    req.on("timeout", () => {
      req.destroy();
      done({ ok: false, status: null, error: "timeout" });
    });
    req.end();
  });
}

function collectMarkdownFiles(target) {
  const resolved = path.resolve(target);
  if (!fs.existsSync(resolved)) {
    throw new Error(`路徑不存在：${resolved}`);
  }
  const stat = fs.statSync(resolved);
  if (stat.isFile()) {
    return resolved.endsWith(".md") ? [resolved] : [];
  }
  const out = [];
  const walk = (dir) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name.startsWith(".")) continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (ent.name.endsWith(".md") && ent.name !== "README.md") {
        out.push(full);
      }
    }
  };
  walk(resolved);
  return out;
}

function parseArgs(argv) {
  const result = {
    target: null,
    check: false,
    json: false,
    timeout: 8000,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--check") result.check = true;
    else if (argv[i] === "--json") result.json = true;
    else if (argv[i] === "--help" || argv[i] === "-h") result.help = true;
    else if (argv[i] === "--timeout" && argv[i + 1]) {
      result.timeout = Number(argv[i + 1]);
      i++;
    } else if (!argv[i].startsWith("-")) {
      result.target = argv[i];
    }
  }
  return result;
}

/**
 * 檢查一組檔案
 */
async function checkLinksInFiles(files, options = {}) {
  const { check = false, timeout = 8000 } = options;
  const report = {
    files: [],
    bareCount: 0,
    linkCount: 0,
    failCount: 0,
  };

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    // 跳過 frontmatter 內的 URL 也可檢查；整檔掃即可
    const links = extractLinks(content);
    const entry = {
      file,
      links: [],
    };

    for (const link of links) {
      report.linkCount++;
      if (link.kind === "bare") report.bareCount++;

      const item = { ...link, status: null, ok: null, error: null };
      if (check && link.url.startsWith("http")) {
        const result = await probeUrl(link.url, timeout);
        item.ok = result.ok;
        item.status = result.status;
        item.error = result.error;
        if (!result.ok) report.failCount++;
      }
      entry.links.push(item);
    }
    report.files.push(entry);
  }

  return report;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.target) {
    console.log(`
Markdown 連結檢查

使用方式：
  node scripts/check-links.js <file|directory> [--check] [--timeout 8000] [--json]

  --check    實際 HTTP 探測（預設只列出）
  --timeout  逾時毫秒
  --json     JSON 輸出
`);
    process.exit(args.help ? 0 : 1);
  }

  let files;
  try {
    files = collectMarkdownFiles(args.target);
  } catch (err) {
    console.error(`❌ ${err.message}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.error("未找到 .md 檔案");
    process.exit(1);
  }

  const report = await checkLinksInFiles(files, {
    check: args.check,
    timeout: args.timeout,
  });

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(
      `掃描 ${files.length} 檔，連結 ${report.linkCount}（bare ${report.bareCount}）\n`,
    );
    for (const f of report.files) {
      if (f.links.length === 0) continue;
      console.log(path.relative(process.cwd(), f.file));
      for (const l of f.links) {
        const kind = l.kind === "bare" ? "BARE" : "md  ";
        let status = "";
        if (args.check) {
          status = l.ok
            ? ` OK ${l.status || ""}`
            : ` FAIL ${l.status || l.error || ""}`;
        }
        console.log(`  L${l.line} [${kind}] ${l.url}${status}`);
      }
      console.log("");
    }
    if (args.check) {
      console.log(
        `---\n探測失敗：${report.failCount} / ${report.linkCount}`,
      );
    } else {
      console.log("提示：加 --check 可實際探測 URL 是否可達");
    }
  }

  if (args.check && report.failCount > 0) {
    process.exit(1);
  }
  if (report.bareCount > 0 && !args.check) {
    // bare URL 與 markdownlint MD034 對齊：列出時 exit 0，僅提示
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  extractLinks,
  probeUrl,
  checkLinksInFiles,
  collectMarkdownFiles,
  parseArgs,
};
