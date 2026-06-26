import { describe, it, expect } from "vitest";
import path from "path";
import {
  validateForPublish,
  removeMetadataSection,
  removeLastUpdated,
  getCompanyFromFilename,
  inferCategoryFromPath,
  getDestPath,
  getContentHash,
  inferCategoryFromAbsPath,
  rewriteInternalLinks,
  filterFrontmatter,
  lintMarkdown,
  detectMultiVersionSocial,
  CATEGORY_CONFIG,
  COMPANY_MAPPING,
  MULTIVAC_FRONTMATTER_FIELDS,
} from "../scripts/publish-to-multivac.js";

// vitest 由 repo 根目錄執行，與腳本內 PENSIEVE_ROOT 一致
const ROOT = process.cwd();
const srcOf = (category, name) => path.join(ROOT, "docs", category, name);

describe("validateForPublish", () => {
  it("should return empty array for valid input", () => {
    const frontmatter = {
      title: "Test Article",
      description: "A test article",
      date: "2026-01-15",
      category: "articles",
    };
    const errors = validateForPublish(
      frontmatter,
      "2026-01-15-test-article.md",
    );
    expect(errors).toEqual([]);
  });

  it("should return errors for all missing required fields", () => {
    const errors = validateForPublish({}, "2026-01-15-test-article.md");
    expect(errors).toContain("缺少必填欄位：title");
    expect(errors).toContain("缺少必填欄位：description");
    expect(errors).toContain("缺少必填欄位：date");
    expect(errors).toContain("缺少必填欄位：category");
  });

  it("should return error for invalid date format", () => {
    const frontmatter = {
      title: "Test",
      description: "Desc",
      date: "Jan 15, 2026",
      category: "articles",
    };
    const errors = validateForPublish(frontmatter, "2026-01-15-test.md");
    expect(errors).toContain("date 格式錯誤：應為 YYYY-MM-DD");
  });

  it("should accept valid YYYY-MM-DD date format", () => {
    const frontmatter = {
      title: "Test",
      description: "Desc",
      date: "2026-01-15",
      category: "articles",
    };
    const errors = validateForPublish(frontmatter, "2026-01-15-test.md");
    expect(errors).not.toContain("date 格式錯誤：應為 YYYY-MM-DD");
  });

  it("should return error for invalid filename format", () => {
    const frontmatter = {
      title: "Test",
      description: "Desc",
      date: "2026-01-15",
      category: "articles",
    };
    const errors = validateForPublish(frontmatter, "bad-filename.md");
    expect(errors).toContain("檔名格式不符：應為 YYYY-MM-DD-slug.md");
  });

  it("should accept filename with full path (uses basename)", () => {
    const frontmatter = {
      title: "Test",
      description: "Desc",
      date: "2026-01-15",
      category: "articles",
    };
    const errors = validateForPublish(
      frontmatter,
      "/some/path/docs/articles/2026-01-15-test-slug.md",
    );
    expect(errors).toEqual([]);
  });
});

describe("removeMetadataSection", () => {
  it("should remove metadata section followed by another heading", () => {
    const body = `## Introduction

Some content.

## 元資料

| Key | Value |
|-----|-------|
| Source | Example |

## References

More content.`;

    const result = removeMetadataSection(body);
    expect(result).toContain("## Introduction");
    expect(result).toContain("## References");
    expect(result).not.toContain("元資料");
    expect(result).not.toContain("Source | Example");
  });

  it("should remove metadata section followed by horizontal rule", () => {
    const body = `## Introduction

Content here.

## 元資料

| Key | Value |
|-----|-------|
| Source | Example |

---

Footer content.`;

    const result = removeMetadataSection(body);
    expect(result).toContain("## Introduction");
    expect(result).not.toContain("元資料");
    expect(result).toContain("Footer content.");
  });

  it("should remove metadata section at end of content", () => {
    const body = `## Introduction

Some content.

## 元資料

| Key | Value |
|-----|-------|
| Source | Example |`;

    const result = removeMetadataSection(body);
    expect(result).toContain("## Introduction");
    expect(result).not.toContain("元資料");
  });

  it("should return unchanged body if no metadata section exists", () => {
    const body = `## Introduction

Some content here.

## Conclusion

Final thoughts.`;

    const result = removeMetadataSection(body);
    expect(result).toBe(body.trim());
  });
});

describe("removeLastUpdated", () => {
  it("should remove asterisk-style last updated line", () => {
    const body = `## Introduction

Some content.

*最後更新：2026-01-15*`;

    const result = removeLastUpdated(body);
    expect(result).toBe("## Introduction\n\nSome content.");
  });

  it("should remove underscore-style last updated line", () => {
    const body = `## Introduction

Some content.

_最後更新：2026-01-15_`;

    const result = removeLastUpdated(body);
    expect(result).toBe("## Introduction\n\nSome content.");
  });

  it("should return unchanged body if no last updated line", () => {
    const body = "## Introduction\n\nSome content.";

    const result = removeLastUpdated(body);
    expect(result).toBe(body);
  });

  it("should handle trailing whitespace after last updated line", () => {
    const body = `## Content

Text here.

*最後更新：2026-02-25*   `;

    const result = removeLastUpdated(body);
    expect(result).toBe("## Content\n\nText here.");
  });
});

describe("getCompanyFromFilename", () => {
  it("should map 'airwallex' keyword to 'airwallex'", () => {
    expect(getCompanyFromFilename("2026-01-15-airwallex-analysis.md")).toBe(
      "airwallex",
    );
  });

  it("should map 'manus' keyword to 'manus-ai'", () => {
    expect(getCompanyFromFilename("2026-01-15-manus-deep-dive.md")).toBe(
      "manus-ai",
    );
  });

  it("should map 'luckin' keyword to 'luckin-coffee'", () => {
    expect(getCompanyFromFilename("2026-01-15-luckin-q4-results.md")).toBe(
      "luckin-coffee",
    );
  });

  it("should extract first word after date for unknown companies", () => {
    expect(getCompanyFromFilename("2026-01-15-newcorp-earnings.md")).toBe(
      "newcorp",
    );
  });

  it("should return 'misc' for unrecognizable filenames", () => {
    expect(getCompanyFromFilename("random-file.md")).toBe("misc");
  });

  it("should be case-insensitive for keyword matching", () => {
    expect(getCompanyFromFilename("2026-01-15-Airwallex-IPO.md")).toBe(
      "airwallex",
    );
  });
});

describe("inferCategoryFromPath", () => {
  it("should infer 'articles' from 'docs/articles'", () => {
    expect(inferCategoryFromPath("docs/articles")).toBe("articles");
  });

  it("should infer 'company-research' from 'docs/company-research'", () => {
    expect(inferCategoryFromPath("docs/company-research")).toBe(
      "company-research",
    );
  });

  it("should infer 'topic-research' from 'docs/topic-research'", () => {
    expect(inferCategoryFromPath("docs/topic-research")).toBe("topic-research");
  });
});

describe("getDestPath", () => {
  it("should produce flat path for articles category", () => {
    const result = getDestPath(
      "/some/path/2026-01-15-test-article.md",
      "articles",
    );
    expect(result).toContain("docs/articles/2026-01-15-test-article.md");
    expect(result).not.toMatch(/docs\/articles\/.+\//);
  });

  it("should produce nested path by company for company-research category", () => {
    const result = getDestPath(
      "/some/path/2026-01-15-airwallex-analysis.md",
      "company-research",
    );
    expect(result).toContain(
      "docs/company-research/airwallex/2026-01-15-airwallex-analysis.md",
    );
  });

  it("should produce flat path for topic-research category", () => {
    const result = getDestPath(
      "/some/path/2026-01-15-ai-trends.md",
      "topic-research",
    );
    expect(result).toContain("docs/topic-research/2026-01-15-ai-trends.md");
  });

  it("should fall back to articles config for unknown category", () => {
    const result = getDestPath(
      "/some/path/2026-01-15-test.md",
      "nonexistent-category",
    );
    expect(result).toContain("docs/articles/2026-01-15-test.md");
  });
});

describe("CATEGORY_CONFIG", () => {
  it("should have articles, company-research, and topic-research keys", () => {
    expect(CATEGORY_CONFIG).toHaveProperty("articles");
    expect(CATEGORY_CONFIG).toHaveProperty("company-research");
    expect(CATEGORY_CONFIG).toHaveProperty("topic-research");
  });

  it("should use flat type for articles and topic-research", () => {
    expect(CATEGORY_CONFIG["articles"].type).toBe("flat");
    expect(CATEGORY_CONFIG["topic-research"].type).toBe("flat");
  });

  it("should use by-company type for company-research", () => {
    expect(CATEGORY_CONFIG["company-research"].type).toBe("by-company");
  });
});

describe("COMPANY_MAPPING", () => {
  it("should contain expected company mappings", () => {
    expect(COMPANY_MAPPING.airwallex).toBe("airwallex");
    expect(COMPANY_MAPPING.manus).toBe("manus-ai");
    expect(COMPANY_MAPPING.luckin).toBe("luckin-coffee");
    expect(COMPANY_MAPPING.toast).toBe("toast");
  });
});

describe("getContentHash", () => {
  const buildContent = (lastModified, body = "Body content.") =>
    `---
title: Test
description: Desc
date: 2026-01-15
category: articles
status: published
lastModified: ${lastModified}
---

${body}`;

  it("should return identical hash when only lastModified differs", () => {
    const a = buildContent("2026-01-15");
    const b = buildContent("2026-06-17");
    expect(getContentHash(a)).toBe(getContentHash(b));
  });

  it("should return different hash when body differs", () => {
    const a = buildContent("2026-01-15", "Original body.");
    const b = buildContent("2026-01-15", "Modified body.");
    expect(getContentHash(a)).not.toBe(getContentHash(b));
  });

  it("should return different hash when non-lastModified frontmatter differs", () => {
    const a = buildContent("2026-01-15");
    const b = a.replace("title: Test", "title: Renamed");
    expect(getContentHash(a)).not.toBe(getContentHash(b));
  });

  it("should return identical hash regardless of trailing whitespace in body", () => {
    const a = buildContent("2026-01-15", "Body content.\n\n");
    const b = buildContent("2026-01-15", "Body content.");
    expect(getContentHash(a)).toBe(getContentHash(b));
  });

  it("should return null for content without valid frontmatter", () => {
    expect(getContentHash("no frontmatter here")).toBe(null);
  });
});

describe("inferCategoryFromAbsPath", () => {
  it("should infer category from docs subdirectory", () => {
    expect(inferCategoryFromAbsPath(srcOf("articles", "x.md"))).toBe(
      "articles",
    );
    expect(inferCategoryFromAbsPath(srcOf("company-research", "y.md"))).toBe(
      "company-research",
    );
    expect(inferCategoryFromAbsPath(srcOf("topic-research", "z.md"))).toBe(
      "topic-research",
    );
  });

  it("should return null for paths outside known docs categories", () => {
    expect(inferCategoryFromAbsPath(path.join(ROOT, "README.md"))).toBe(null);
    expect(
      inferCategoryFromAbsPath(path.join(ROOT, "docs", "guides", "x.md")),
    ).toBe(null);
  });
});

describe("rewriteInternalLinks", () => {
  const linkOf = (body, category, name) =>
    rewriteInternalLinks(
      body,
      srcOf(category, name),
      getDestPath(srcOf(category, name), category),
    );

  it("should rewrite article → company-research link to by-company subdir", () => {
    const body =
      "見 [Airwallex 研究](../company-research/2025-12-10-airwallex-fintech-analysis.md)。";
    const result = linkOf(
      body,
      "articles",
      "2026-02-03-david-marcus-paypal-reflections.md",
    );
    expect(result).toContain(
      "](../company-research/airwallex/2025-12-10-airwallex-fintech-analysis.md)",
    );
  });

  it("should rewrite company-research → article link with extra ../ level", () => {
    const body =
      "延伸 [David Marcus](../articles/2026-02-03-david-marcus-paypal-reflections.md)。";
    const result = linkOf(
      body,
      "company-research",
      "2025-12-10-airwallex-fintech-analysis.md",
    );
    expect(result).toContain(
      "](../../articles/2026-02-03-david-marcus-paypal-reflections.md)",
    );
  });

  it("should rewrite same-dir company-research link across company subdirs", () => {
    const body =
      "參考 [SmartOSC 研究](./2025-11-25-smartosc-vietnam-research.md)。";
    const result = linkOf(
      body,
      "company-research",
      "2025-11-25-91app-smartosc-partnership-analysis.md",
    );
    // 91app-... 落在 misc/，smartosc-... 落在 smartosc/
    expect(result).toContain(
      "](../smartosc/2025-11-25-smartosc-vietnam-research.md)",
    );
  });

  it("should preserve anchor fragments when rewriting", () => {
    const body =
      "見 [第二部分](./2025-11-25-smartosc-vietnam-research.md#第二部分)。";
    const result = linkOf(
      body,
      "company-research",
      "2025-11-25-91app-smartosc-partnership-analysis.md",
    );
    expect(result).toContain(
      "](../smartosc/2025-11-25-smartosc-vietnam-research.md#第二部分)",
    );
  });

  it("should leave external links unchanged", () => {
    const body = "見 [官網](https://example.com/page.md)。";
    const result = linkOf(body, "articles", "2026-02-03-test.md");
    expect(result).toBe(body);
  });

  it("should leave links pointing outside docs categories unchanged", () => {
    const body = "見 [README](../../README.md)。";
    const result = linkOf(body, "articles", "2026-02-03-test.md");
    expect(result).toBe(body);
  });

  it("should return body unchanged when destPath is missing", () => {
    const body =
      "見 [x](../company-research/2025-12-10-airwallex-fintech-analysis.md)。";
    expect(
      rewriteInternalLinks(body, srcOf("articles", "x.md"), undefined),
    ).toBe(body);
  });

  it("should leave same-category flat article links resolvable", () => {
    const body =
      "見 [另一篇](./2026-02-25-stripe-paypal-acquisition-social.md)。";
    const result = linkOf(body, "articles", "2026-02-03-test.md");
    // 同為 articles 平面結構，路徑維持指向同目錄檔案
    expect(result).toContain(
      "](./2026-02-25-stripe-paypal-acquisition-social.md)",
    );
  });
});

describe("filterFrontmatter", () => {
  it("should strip schema-undefined fields (status, category, related, version)", () => {
    const fm = {
      title: "Test",
      description: "Desc",
      date: "2026-03-06",
      tags: ["a", "b"],
      author: "Clement Tang",
      status: "published",
      category: "topic-research",
      related: "https://example.com",
      version: "1.0",
      lastModified: "2026-06-25",
    };
    const result = filterFrontmatter(fm);
    expect(result).not.toHaveProperty("status");
    expect(result).not.toHaveProperty("category");
    expect(result).not.toHaveProperty("related");
    expect(result).not.toHaveProperty("version");
  });

  it("should preserve lastModified (multivac config.ts reads it)", () => {
    const result = filterFrontmatter({
      title: "T",
      lastModified: "2026-06-25",
      status: "published",
    });
    expect(result.lastModified).toBe("2026-06-25");
  });

  it("should preserve all whitelisted multivac fields", () => {
    const fm = {
      title: "T",
      description: "D",
      date: "2026-03-06",
      tags: ["x"],
      author: "Clement Tang",
      cover: "/img.png",
      featured: true,
      draft: false,
      series: "goog",
      seriesTitle: "GOOG 系列",
      seriesIndex: 1,
      lastModified: "2026-06-25",
    };
    const result = filterFrontmatter(fm);
    for (const key of Object.keys(fm)) {
      expect(result).toHaveProperty(key);
    }
  });

  it("should output fields in schema order regardless of input order", () => {
    const result = filterFrontmatter({
      lastModified: "2026-06-25",
      author: "Clement Tang",
      title: "T",
      date: "2026-03-06",
    });
    const keys = Object.keys(result);
    expect(keys).toEqual(["title", "date", "author", "lastModified"]);
  });

  it("should omit whitelisted fields that are absent from input", () => {
    const result = filterFrontmatter({ title: "T", date: "2026-03-06" });
    expect(Object.keys(result)).toEqual(["title", "date"]);
    expect(result).not.toHaveProperty("tags");
  });

  it("MULTIVAC_FRONTMATTER_FIELDS should match multivac schema and exclude status/category", () => {
    expect(MULTIVAC_FRONTMATTER_FIELDS).toContain("lastModified");
    expect(MULTIVAC_FRONTMATTER_FIELDS).toContain("series");
    expect(MULTIVAC_FRONTMATTER_FIELDS).not.toContain("status");
    expect(MULTIVAC_FRONTMATTER_FIELDS).not.toContain("category");
  });
});

describe("lintMarkdown", () => {
  it("should return [] for clean transformed output (h1 → h2)", () => {
    const content = `---
title: Test
---

# 標題

## 第一節

內容。
`;
    expect(lintMarkdown(content)).toEqual([]);
  });

  it("should catch MD001 heading jump (h1 → h3) that appears after metadata strip", () => {
    const content = `---
title: Test
---

# 標題

### 跳級小節

內容。
`;
    const errors = lintMarkdown(content);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.join("\n")).toContain("MD001");
  });

  it("should strip the temp file path prefix from error lines", () => {
    const content = `---
title: Test
---

# 標題

### 跳級

內容。
`;
    const errors = lintMarkdown(content);
    // 暫存檔絕對路徑前綴應已移除：訊息以行號開頭、不含 .md: 路徑片段
    expect(errors[0]).toMatch(/^\d+ error /);
    expect(errors.some((e) => e.includes(".md:"))).toBe(false);
  });
});

describe("detectMultiVersionSocial", () => {
  it("should flag a multi-version social post (版本 1/2/3 + 發布指南)", () => {
    const content = `---
title: 社群貼文
---

# 標題

## 版本 1：完整版（Facebook / LinkedIn）

內容。

## 版本 2：精簡版（Threads）

內容。

## 版本 3：極簡版（Twitter/X）

內容。

## 發布指南

### 最佳發布時間
`;
    const issues = detectMultiVersionSocial(content);
    expect(issues.length).toBeGreaterThan(0);
    expect(issues.join("\n")).toContain("多版本段落");
    expect(issues.join("\n")).toContain("發布輔助段落");
  });

  it("should flag 短版本 / 超短版本 variants", () => {
    const content = `# T

## 貼文內容

x

## 短版本（Twitter/X 適用）

x

## 超短版本（適用 Twitter/X 限制）

x
`;
    expect(detectMultiVersionSocial(content).length).toBeGreaterThan(0);
  });

  it("should flag a 發布指南 section even with one version heading", () => {
    const content = `# T

## 貼文內容

x

## 發布指南

x
`;
    const issues = detectMultiVersionSocial(content);
    expect(issues.join("\n")).toContain("發布輔助段落");
  });

  it("should NOT flag a normal single-version article", () => {
    const content = `---
title: GOOG 投資研究
---

# 標題

## 執行摘要

x

## 多頭論述

x

## 結語

x
`;
    expect(detectMultiVersionSocial(content)).toEqual([]);
  });

  it("should NOT flag a single narrative social post (no version splits)", () => {
    const content = `# 當 AI 把滲透測試從三萬美元降到五十美元

開場。

## 背景

內容。

## 結論

內容。
`;
    expect(detectMultiVersionSocial(content)).toEqual([]);
  });

  it("should not over-trigger on a single 版本 heading alone", () => {
    const content = `# T

## 版本演進史

某產品的版本演進，非多平台社群版本。
`;
    // 只有 1 個「版本」開頭標題且非發布輔助段落 → 不應 block
    expect(detectMultiVersionSocial(content)).toEqual([]);
  });
});
