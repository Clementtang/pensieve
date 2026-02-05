/**
 * Frontmatter 解析與生成共用模組
 *
 * 提供 YAML frontmatter 的解析與生成功能，供所有腳本共用。
 */

/**
 * 解析 YAML frontmatter
 * @param {string} content - 檔案內容
 * @param {Object} options - 選項
 * @param {boolean} options.verbose - 是否輸出詳細日誌
 * @param {Function} options.logError - 錯誤記錄函式
 * @param {string} options.filePath - 檔案路徑（用於錯誤報告）
 * @returns {{frontmatter: Object, body: string, hasFrontmatter: boolean, parseError: string|null}}
 */
function parseFrontmatter(content, options = {}) {
  const { verbose = false, logError = null, filePath = "unknown" } = options;

  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {
      frontmatter: {},
      body: content,
      hasFrontmatter: false,
      parseError: "檔案缺少 YAML frontmatter（--- 區塊）",
    };
  }

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  const lines = frontmatterStr.split("\n");
  let lineNumber = 0;
  let multilineKey = null;
  let multilineBuffer = "";
  let pendingEmptyKey = null;

  for (const line of lines) {
    lineNumber++;
    const trimmed = line.trim();

    // 多行陣列收集中
    if (multilineKey !== null) {
      multilineBuffer += trimmed;
      if (trimmed.endsWith("]")) {
        // 多行陣列結束，移除尾隨逗號後嘗試解析
        const cleaned = multilineBuffer.replace(/,\s*]/g, "]");
        try {
          frontmatter[multilineKey] = JSON.parse(cleaned);
        } catch (e) {
          if (logError) {
            logError(
              filePath,
              "YAML_PARSE",
              `多行陣列解析失敗`,
              `key: ${multilineKey}`,
            );
          }
          frontmatter[multilineKey] = multilineBuffer;
        }
        multilineKey = null;
        multilineBuffer = "";
      }
      continue;
    }

    // 前一行是空值的 key，檢查此行是否為陣列開頭
    if (pendingEmptyKey !== null) {
      if (trimmed.startsWith("[")) {
        multilineKey = pendingEmptyKey;
        multilineBuffer = trimmed;
        pendingEmptyKey = null;
        if (trimmed.endsWith("]")) {
          const cleaned = multilineBuffer.replace(/,\s*]/g, "]");
          try {
            frontmatter[multilineKey] = JSON.parse(cleaned);
          } catch (e) {
            if (logError) {
              logError(
                filePath,
                "YAML_PARSE",
                `陣列解析失敗`,
                `key: ${multilineKey}`,
              );
            }
            frontmatter[multilineKey] = multilineBuffer;
          }
          multilineKey = null;
          multilineBuffer = "";
        }
        continue;
      }
      // 不是陣列，將前一個 key 存為空字串
      frontmatter[pendingEmptyKey] = "";
      pendingEmptyKey = null;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      // 空行或無效行，跳過
      if (trimmed !== "" && verbose) {
        console.log(`   [詳細] 第 ${lineNumber} 行格式不正確，跳過：${line}`);
      }
      continue;
    }

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (!key) {
      if (verbose) {
        console.log(`   [詳細] 第 ${lineNumber} 行缺少 key，跳過`);
      }
      continue;
    }

    // 空值：可能是多行陣列的 key（如 linter 展開格式）
    if (value === "") {
      pendingEmptyKey = key;
      continue;
    }

    // 處理字串值（移除引號）
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // 處理單行陣列
    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        if (logError) {
          logError(
            filePath,
            "YAML_PARSE",
            `第 ${lineNumber} 行陣列解析失敗`,
            `key: ${key}, value: ${value}`,
          );
        }
        // 保持原值
      }
    }
    // 處理多行陣列開頭（同一行有 key: [... ）
    else if (value.startsWith("[") && !value.endsWith("]")) {
      multilineKey = key;
      multilineBuffer = value;
      continue;
    }

    // 處理布林值
    if (value === "true") value = true;
    if (value === "false") value = false;

    frontmatter[key] = value;
  }

  // 處理尾部未解析的空值 key
  if (pendingEmptyKey !== null) {
    frontmatter[pendingEmptyKey] = "";
  }

  return { frontmatter, body, hasFrontmatter: true, parseError: null };
}

/**
 * 生成 YAML frontmatter
 * @param {Object} fm - frontmatter 物件
 * @returns {string} YAML 格式的 frontmatter（含 --- 標記）
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

module.exports = {
  parseFrontmatter,
  generateFrontmatter,
};
