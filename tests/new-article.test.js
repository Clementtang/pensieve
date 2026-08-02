import { describe, it, expect, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  TEMPLATE_MAP,
  DEFAULT_AUTHOR,
  parseArgs,
  generateSlug,
  getToday,
  updateFrontmatter,
  updateContentTitle,
  createArticle,
} from "../scripts/new-article.js";

const tempDirs = [];

afterEach(() => {
  for (const dir of tempDirs) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  tempDirs.length = 0;
});

function makeTempDir(prefix = "pensieve-new-") {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
}

describe("parseArgs", () => {
  it("should parse type, title, and slug", () => {
    expect(
      parseArgs([
        "--type",
        "article",
        "--title",
        "AI 趨勢",
        "--slug",
        "ai-trend",
      ]),
    ).toEqual({
      type: "article",
      title: "AI 趨勢",
      slug: "ai-trend",
    });
  });

  it("should set help for --help and -h", () => {
    expect(parseArgs(["--help"]).help).toBe(true);
    expect(parseArgs(["-h"]).help).toBe(true);
  });

  it("should return empty object for empty args", () => {
    expect(parseArgs([])).toEqual({});
  });
});

describe("generateSlug", () => {
  it("should slugify English title", () => {
    expect(generateSlug("Hello World")).toBe("hello-world");
  });

  it("should keep Chinese characters", () => {
    expect(generateSlug("AI 趨勢分析")).toBe("ai-趨勢分析");
  });

  it("should collapse multiple hyphens and trim edges", () => {
    expect(generateSlug("  foo -- bar  ")).toBe("foo-bar");
  });

  it("should limit length to 50", () => {
    const long = "a".repeat(80);
    expect(generateSlug(long).length).toBe(50);
  });
});

describe("getToday", () => {
  it("should return YYYY-MM-DD format", () => {
    expect(getToday()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("updateFrontmatter", () => {
  it("should fill title, date, author, category, status when frontmatter exists", () => {
    const template = `---
title: "文章標題"
description: "desc"
date: YYYY-MM-DD
author: "Someone"
tags: []
category: articles
status: published
---

# 文章標題
`;
    const result = updateFrontmatter(
      template,
      "新標題",
      "company-research",
      "2026-08-02",
    );
    expect(result).toContain('title: "新標題"');
    expect(result).toContain("date: 2026-08-02");
    expect(result).toContain(`author: "${DEFAULT_AUTHOR}"`);
    expect(result).toContain("category: company-research");
    expect(result).toContain("status: draft");
  });

  it("should prepend frontmatter when missing", () => {
    const result = updateFrontmatter("# Only body", "Title", "articles", "2026-01-01");
    expect(result.startsWith("---\n")).toBe(true);
    expect(result).toContain('title: "Title"');
    expect(result).toContain("# Only body");
  });
});

describe("updateContentTitle", () => {
  it("should replace first H1", () => {
    const content = "# Old\n\n## Section\n";
    expect(updateContentTitle(content, "New")).toBe("# New\n\n## Section\n");
  });
});

describe("TEMPLATE_MAP", () => {
  it("should map article type to articles category", () => {
    expect(TEMPLATE_MAP.article.category).toBe("articles");
    expect(TEMPLATE_MAP.company.category).toBe("company-research");
    expect(TEMPLATE_MAP.industry.category).toBe("topic-research");
    expect(TEMPLATE_MAP.memo.category).toBe("memo");
  });
});

describe("createArticle", () => {
  const templatesDir = path.join(process.cwd(), "templates");

  it("should create draft file with prefilled frontmatter from template", () => {
    const draftsDir = makeTempDir();
    const { destPath, filename, content, category } = createArticle({
      type: "article",
      title: "Test Article",
      slug: "test-article",
      draftsDir,
      templatesDir,
      date: "2026-08-02",
    });

    expect(filename).toBe("2026-08-02-test-article.md");
    expect(destPath).toBe(path.join(draftsDir, filename));
    expect(fs.existsSync(destPath)).toBe(true);
    expect(category).toBe("articles");
    expect(content).toContain('title: "Test Article"');
    expect(content).toContain("date: 2026-08-02");
    expect(content).toContain("status: draft");
    expect(content).toContain("category: articles");
    expect(content).toMatch(/^# Test Article/m);
  });

  it("should use custom slug when provided", () => {
    const draftsDir = makeTempDir();
    const { filename } = createArticle({
      type: "company",
      title: "Tesla 研究",
      slug: "tesla-research",
      draftsDir,
      templatesDir,
      date: "2026-08-02",
    });
    expect(filename).toBe("2026-08-02-tesla-research.md");
  });

  it("should throw when type is unknown", () => {
    const draftsDir = makeTempDir();
    expect(() =>
      createArticle({
        type: "unknown",
        title: "X",
        draftsDir,
        templatesDir,
      }),
    ).toThrow(/未知的類型/);
  });

  it("should throw when destination already exists", () => {
    const draftsDir = makeTempDir();
    const opts = {
      type: "article",
      title: "Dup",
      slug: "dup",
      draftsDir,
      templatesDir,
      date: "2026-08-02",
    };
    createArticle(opts);
    expect(() => createArticle(opts)).toThrow(/檔案已存在/);
  });

  it("should throw when title missing", () => {
    expect(() =>
      createArticle({ type: "article", draftsDir: makeTempDir(), templatesDir }),
    ).toThrow(/title/);
  });
});
