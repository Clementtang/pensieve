import { describe, it, expect } from "vitest";
import {
  validateForPublish,
  removeMetadataSection,
  removeLastUpdated,
  getCompanyFromFilename,
  inferCategoryFromPath,
  getDestPath,
  CATEGORY_CONFIG,
  COMPANY_MAPPING,
} from "../scripts/publish-to-multivac.js";

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
