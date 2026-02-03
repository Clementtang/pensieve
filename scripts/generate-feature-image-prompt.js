#!/usr/bin/env node

/**
 * Feature Image Prompt Generator
 *
 * 從文章 frontmatter 自動生成 Nano Banana Pro 圖像生成 prompt
 *
 * 使用方式：
 *   node scripts/generate-feature-image-prompt.js <article-path>
 *   node scripts/generate-feature-image-prompt.js docs/articles/2025-11-19-workday-acquires-pipedream.md
 *
 * 選項：
 *   --copy      將 prompt 複製到剪貼簿（macOS only）
 *   --output    輸出 prompt 到檔案
 *   --json      以 JSON 格式輸出
 *
 * 輸出：
 *   適用於 Google Gemini Nano Banana Pro (gemini-3-pro-image-preview) 的結構化 prompt
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { parseFrontmatter } = require("./lib/frontmatter");

// 解析命令列參數
const args = process.argv.slice(2);
const copyToClipboard = args.includes("--copy");
const jsonOutput = args.includes("--json");
const outputIndex = args.indexOf("--output");
const outputPath = outputIndex !== -1 ? args[outputIndex + 1] : null;
const articlePath = args.find(
  (arg) => arg.endsWith(".md") && !arg.startsWith("--"),
);

// Category 對應的視覺風格
const CATEGORY_STYLES = {
  articles: {
    styleKeywords:
      "editorial illustration style, news magazine aesthetic, dynamic composition, conceptual visual metaphor, contemporary feel, thought-provoking imagery",
    mood: ["professional", "innovative", "forward-looking", "transformative"],
    typicalElements: [
      "abstract concept visualization",
      "trend arrows",
      "tech symbols",
      "connection nodes",
    ],
  },
  "company-research": {
    styleKeywords:
      "corporate analysis aesthetic, strategic consulting feel, subtle brand reference (without using logos), data visualization elements, business intelligence imagery",
    mood: ["analytical", "strategic", "professional", "insightful"],
    typicalElements: [
      "abstract building shapes",
      "financial chart elements",
      "industry symbols",
      "growth visualization",
    ],
  },
  "topic-research": {
    styleKeywords:
      "research report cover aesthetic, systematic study feel, interconnected concepts, industry landscape visualization, academic yet accessible, comprehensive overview",
    mood: ["analytical", "comprehensive", "systematic", "forward-looking"],
    typicalElements: [
      "industry ecosystem map",
      "multi-layer structure",
      "timeline elements",
      "interconnected nodes",
    ],
  },
};

// 基礎視覺風格（M42 品牌色：琥珀金 #f59e0b + 深黑 #0a0a0f）
const BASE_STYLE = `modern business illustration, clean professional design,
amber gold accent (#f59e0b) on deep dark background (#0a0a0f),
minimalist composition, high-quality digital art,
tech-forward aesthetic with warm golden highlights`;

// 避免元素
const AVOID_ELEMENTS =
  "text, words, letters, logos, realistic human faces, cluttered composition, bright garish colors, company branding";

// parseFrontmatter 已移至 ./lib/frontmatter.js

/**
 * 從標題提取核心概念，轉化為視覺場景
 */
function extractSceneConcept(title, description, tags) {
  // 關鍵詞對應的視覺概念
  const conceptMappings = {
    // 動作類
    併購: "two corporate entities merging, represented by geometric shapes coming together",
    收購: "acquisition visualization with flowing integration patterns",
    合併: "merger concept with converging paths and unified structure",
    發布: "product launch visualization with radiating impact waves",
    推出: "new release concept with emerging innovation elements",

    // 技術類
    AI: "artificial intelligence visualization with neural network patterns",
    人工智慧: "AI brain concept with interconnected processing nodes",
    自動化: "automation workflow with seamless process flows",
    機器學習: "machine learning concept with evolving data patterns",
    雲端: "cloud computing visualization with distributed nodes",

    // 商業類
    支付: "payment flow visualization with secure transaction paths",
    金融科技: "fintech innovation with digital currency flows",
    電商: "e-commerce ecosystem with shopping and fulfillment visualization",
    零售: "retail transformation with omnichannel connectivity",

    // 策略類
    策略: "strategic planning visualization with interconnected objectives",
    成長: "growth trajectory with ascending patterns and expansion",
    轉型: "transformation journey with evolution visualization",
    創新: "innovation concept with breakthrough and disruption elements",
  };

  let sceneElements = [];

  // 從標題和描述中提取概念
  const combinedText = `${title} ${description}`;

  for (const [keyword, concept] of Object.entries(conceptMappings)) {
    if (combinedText.includes(keyword)) {
      sceneElements.push(concept);
    }
  }

  // 從標籤中提取補充元素
  if (Array.isArray(tags)) {
    for (const tag of tags) {
      if (
        conceptMappings[tag] &&
        !sceneElements.includes(conceptMappings[tag])
      ) {
        sceneElements.push(conceptMappings[tag]);
      }
    }
  }

  // 如果沒有匹配到，使用通用概念
  if (sceneElements.length === 0) {
    sceneElements.push(
      "abstract business concept visualization with modern tech elements",
    );
  }

  return sceneElements.slice(0, 2).join(", with ");
}

/**
 * 選擇適合的情緒關鍵詞
 */
function selectMood(description, category) {
  const moodKeywords = {
    突破: "transformative",
    創新: "innovative",
    分析: "analytical",
    策略: "strategic",
    成長: "growth-oriented",
    挑戰: "dynamic",
    未來: "forward-looking",
    領先: "pioneering",
  };

  const selectedMoods = [];

  for (const [keyword, mood] of Object.entries(moodKeywords)) {
    if (description && description.includes(keyword)) {
      selectedMoods.push(mood);
    }
  }

  // 加入 category 預設情緒
  const categoryStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES.articles;
  if (selectedMoods.length < 2 && categoryStyle.mood) {
    selectedMoods.push(categoryStyle.mood[0]);
  }

  return selectedMoods.slice(0, 3).join(", ") || "professional, innovative";
}

/**
 * 從標籤生成視覺元素
 */
function generateVisualElements(tags, category) {
  const tagToVisual = {
    AI: "subtle AI neural network patterns",
    併購: "corporate merger symbolism",
    金融科技: "fintech circuit patterns",
    電商: "e-commerce flow visualization",
    自動化: "automation workflow elements",
    企業軟體: "enterprise software interface hints",
    跨境支付: "global currency flow patterns",
    數位轉型: "digital transformation pathways",
    零售科技: "retail technology integration",
    語音助手: "voice wave patterns",
  };

  const elements = [];

  if (Array.isArray(tags)) {
    for (const tag of tags) {
      if (tagToVisual[tag]) {
        elements.push(tagToVisual[tag]);
      }
    }
  }

  // 加入 category 典型元素
  const categoryStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES.articles;
  if (elements.length < 2 && categoryStyle.typicalElements) {
    elements.push(categoryStyle.typicalElements[0]);
  }

  return (
    elements.slice(0, 3).join(", ") ||
    "abstract tech elements, modern business imagery"
  );
}

/**
 * 生成完整的圖像 prompt
 */
function generatePrompt(frontmatter) {
  const { title, description, tags, category } = frontmatter;
  const categoryKey = category || "articles";
  const categoryStyle =
    CATEGORY_STYLES[categoryKey] || CATEGORY_STYLES.articles;

  const scene = extractSceneConcept(title, description, tags);
  const mood = selectMood(description, categoryKey);
  const elements = generateVisualElements(tags, categoryKey);

  const prompt = `[SCENE]: ${scene}

[STYLE]: ${BASE_STYLE},
${categoryStyle.styleKeywords}

[COMPOSITION]: centered focal point, 16:9 aspect ratio,
balanced composition with visual breathing room

[MOOD]: ${mood}

[SPECIFIC ELEMENTS]: ${elements}

[AVOID]: ${AVOID_ELEMENTS}`;

  return prompt;
}

/**
 * 複製到剪貼簿（使用 execFileSync 避免 shell injection）
 */
function copyToClipboardMac(text) {
  try {
    execFileSync("pbcopy", [], { input: text, encoding: "utf-8" });
    return true;
  } catch {
    return false;
  }
}

/**
 * 主程式
 */
function main() {
  if (!articlePath) {
    console.log("🖼️  Feature Image Prompt Generator\n");
    console.log("使用方式：");
    console.log(
      "  node scripts/generate-feature-image-prompt.js <article-path>\n",
    );
    console.log("選項：");
    console.log("  --copy     複製 prompt 到剪貼簿（macOS）");
    console.log("  --output   輸出到指定檔案");
    console.log("  --json     以 JSON 格式輸出\n");
    console.log("範例：");
    console.log(
      "  node scripts/generate-feature-image-prompt.js docs/articles/2025-11-19-workday-acquires-pipedream.md",
    );
    console.log(
      "  node scripts/generate-feature-image-prompt.js docs/articles/2025-11-19-workday-acquires-pipedream.md --copy",
    );
    process.exit(0);
  }

  // 解析文章路徑
  const fullPath = path.isAbsolute(articlePath)
    ? articlePath
    : path.resolve(process.cwd(), articlePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ 找不到檔案：${fullPath}`);
    process.exit(1);
  }

  // 讀取並解析文章
  const content = fs.readFileSync(fullPath, "utf-8");
  const { frontmatter, hasFrontmatter } = parseFrontmatter(content);

  if (!hasFrontmatter) {
    console.error("❌ 無法解析文章 frontmatter");
    process.exit(1);
  }

  // 生成 prompt
  const prompt = generatePrompt(frontmatter);

  // 輸出處理
  if (jsonOutput) {
    const output = {
      article: path.basename(fullPath),
      title: frontmatter.title,
      category: frontmatter.category || "articles",
      model: "gemini-3-pro-image-preview",
      aspectRatio: "16:9",
      prompt: prompt,
    };
    console.log(JSON.stringify(output, null, 2));
  } else {
    console.log("🖼️  Feature Image Prompt Generator\n");
    console.log("─".repeat(60));
    console.log(`📄 文章：${frontmatter.title}`);
    console.log(`📁 Category：${frontmatter.category || "articles"}`);
    console.log(
      `🏷️  Tags：${Array.isArray(frontmatter.tags) ? frontmatter.tags.join(", ") : "N/A"}`,
    );
    console.log("─".repeat(60));
    console.log("\n📝 Generated Prompt for Nano Banana Pro:\n");
    console.log(prompt);
    console.log("\n" + "─".repeat(60));
    console.log("📋 使用說明：");
    console.log("   1. 複製上方 prompt");
    console.log("   2. 前往 Google AI Studio 或 Gemini API");
    console.log("   3. 選擇 gemini-3-pro-image-preview 模型");
    console.log("   4. 設定 aspect ratio 為 16:9");
    console.log("   5. 貼上 prompt 並生成圖像");
    console.log("─".repeat(60));
  }

  // 複製到剪貼簿（macOS）
  if (copyToClipboard) {
    if (copyToClipboardMac(prompt)) {
      console.log("\n✅ Prompt 已複製到剪貼簿！");
    } else {
      console.log("\n⚠️  無法複製到剪貼簿（僅支援 macOS）");
    }
  }

  // 輸出到檔案
  if (outputPath) {
    try {
      fs.writeFileSync(outputPath, prompt);
      console.log(`\n✅ Prompt 已儲存至：${outputPath}`);
    } catch (err) {
      console.error(`\n❌ 無法寫入檔案：${err.message}`);
    }
  }
}

main();
