import { describe, it, expect, beforeAll, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The source file inspects process.argv at the top level and calls
// process.exit(0) when no target path is found. Inject a dummy arg so the
// guard is satisfied, then dynamically import the module.
let validateArticle;
let VALID_STATUS;
let VALID_CATEGORIES;
let REQUIRED_FIELDS;

beforeAll(async () => {
  // Temporarily add a dummy arg so the top-level CLI guard in the source
  // file finds a targetPath and skips process.exit(0).
  const originalArgv = [...process.argv];
  process.argv = [...originalArgv, "__vitest_dummy__"];

  const mod = await import("../scripts/validate-article.js");

  validateArticle = mod.validateArticle;
  VALID_STATUS = mod.VALID_STATUS;
  VALID_CATEGORIES = mod.VALID_CATEGORIES;
  REQUIRED_FIELDS = mod.REQUIRED_FIELDS;

  process.argv = originalArgv;
});

const VALID_FRONTMATTER = `---
title: Test Article
description: A test article for validation
date: 2026-01-01
category: articles
status: published
author: Clement
tags: ["test", "validation"]
---

# Test Article

Some content here.`;

/**
 * Create a temporary markdown file with the given content and filename.
 * Returns { filePath, dir } so the caller can clean up.
 */
function createTempArticle(content, filename = "2026-01-01-test-article.md") {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pensieve-test-"));
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, content);
  return { filePath, dir };
}

/** Recursively remove a temp directory */
function removeTempDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

// Track temp dirs so afterEach can clean them all up
const tempDirs = [];

afterEach(() => {
  for (const dir of tempDirs) {
    removeTempDir(dir);
  }
  tempDirs.length = 0;
});

/**
 * Helper that creates a temp article and registers the dir for cleanup.
 */
function makeTempArticle(content, filename) {
  const { filePath, dir } = createTempArticle(content, filename);
  tempDirs.push(dir);
  return filePath;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("validateArticle", () => {
  describe("skipped files", () => {
    it("should return skipped true for index.md", () => {
      const filePath = makeTempArticle("# Index\n\nSome content.", "index.md");
      const result = validateArticle(filePath);

      expect(result.skipped).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.warnings).toEqual([]);
    });

    it("should return skipped true for README.md", () => {
      const filePath = makeTempArticle("# README", "README.md");
      const result = validateArticle(filePath);

      expect(result.skipped).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.warnings).toEqual([]);
    });
  });

  describe("frontmatter presence", () => {
    it("should return an error when file has no YAML frontmatter", () => {
      const content = "# Just a heading\n\nNo frontmatter here.";
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.errors.length).toBeGreaterThanOrEqual(1);
      expect(result.errors.some((e) => e.includes("frontmatter"))).toBe(true);
    });
  });

  describe("required fields", () => {
    it("should return an error for each missing required field", () => {
      const content = `---
title: Only Title
---

# Heading`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      const missingFields = REQUIRED_FIELDS.filter((f) => f !== "title");
      for (const field of missingFields) {
        expect(
          result.errors.some((e) => e.includes(field)),
          `expected error for missing field: ${field}`,
        ).toBe(true);
      }
    });

    it("should return errors for all fields missing when frontmatter is empty", () => {
      const content = `---
placeholder: true
---

# Heading`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      for (const field of REQUIRED_FIELDS) {
        expect(
          result.errors.some((e) => e.includes(field)),
          `expected error for missing field: ${field}`,
        ).toBe(true);
      }
    });
  });

  describe("date format validation", () => {
    it("should return an error when date is not YYYY-MM-DD", () => {
      const content = `---
title: Bad Date
description: Testing date validation
date: 01-01-2026
category: articles
status: published
---

# Heading`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.errors.some((e) => e.includes("date"))).toBe(true);
    });

    it("should accept a valid YYYY-MM-DD date without error", () => {
      const content = `---
title: Good Date
description: Testing date validation
date: 2026-01-01
category: articles
status: published
---

# Heading`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.errors.some((e) => e.includes("date"))).toBe(false);
    });
  });

  describe("status validation", () => {
    it("should return an error when status is not in VALID_STATUS", () => {
      const content = `---
title: Bad Status
description: Testing status validation
date: 2026-01-01
category: articles
status: banana
---

# Heading`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.errors.some((e) => e.includes("status"))).toBe(true);
    });

    it.each(["draft", "in-progress", "published", "archived"])(
      "should accept valid status '%s' without error",
      (status) => {
        const content = `---
title: Valid Status
description: Testing status validation
date: 2026-01-01
category: articles
status: ${status}
---

# Heading`;
        const filePath = makeTempArticle(content);
        const result = validateArticle(filePath);

        expect(result.errors.some((e) => e.includes("status"))).toBe(false);
      },
    );
  });

  describe("category validation", () => {
    it("should return a warning when category is not in VALID_CATEGORIES", () => {
      const content = `---
title: Bad Category
description: Testing category validation
date: 2026-01-01
category: unknown-category
status: published
---

# Heading`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.warnings.some((w) => w.includes("category"))).toBe(true);
      // Category mismatch is a warning, not an error
      expect(result.errors.some((e) => e.includes("category"))).toBe(false);
    });

    it("should accept a valid category without warning", () => {
      const content = `---
title: Good Category
description: Testing
date: 2026-01-01
category: articles
status: published
author: Clement
tags: ["test"]
---

# Heading`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.warnings.some((w) => w.includes("category"))).toBe(false);
    });
  });

  describe("filename validation", () => {
    it("should warn when filename does not match YYYY-MM-DD-slug.md pattern", () => {
      const filePath = makeTempArticle(VALID_FRONTMATTER, "bad-filename.md");
      const result = validateArticle(filePath);

      expect(result.warnings.some((w) => w.includes("檔名格式"))).toBe(true);
    });

    it("should not warn when filename matches YYYY-MM-DD-slug.md pattern", () => {
      const filePath = makeTempArticle(
        VALID_FRONTMATTER,
        "2026-01-15-my-article.md",
      );
      const result = validateArticle(filePath);

      expect(result.warnings.some((w) => w.includes("檔名格式"))).toBe(false);
    });
  });

  describe("H1 heading validation", () => {
    it("should warn when there is no H1 heading in body", () => {
      const content = `---
title: No H1
description: Testing H1 validation
date: 2026-01-01
category: articles
status: published
---

## Only H2 headings here

Some content.`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.warnings.some((w) => w.includes("H1"))).toBe(true);
    });

    it("should warn when there are multiple H1 headings", () => {
      const content = `---
title: Multiple H1
description: Testing multiple H1 validation
date: 2026-01-01
category: articles
status: published
---

# First Heading

Some content.

# Second Heading

More content.`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.warnings.some((w) => w.includes("多個 H1"))).toBe(true);
    });

    it("should not warn when there is exactly one H1 heading", () => {
      const content = `---
title: Single H1
description: One heading
date: 2026-01-01
category: articles
status: published
author: Clement
tags: ["test"]
---

# Single Heading

Some content.`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.warnings.some((w) => w.includes("H1"))).toBe(false);
    });
  });

  describe("optional field warnings", () => {
    it("should warn when author field is missing", () => {
      const content = `---
title: No Author
description: Missing author
date: 2026-01-01
category: articles
status: published
tags: ["test"]
---

# Heading`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.warnings.some((w) => w.includes("author"))).toBe(true);
    });

    it("should warn when tags field is missing", () => {
      const content = `---
title: No Tags
description: Missing tags
date: 2026-01-01
category: articles
status: published
author: Clement
---

# Heading`;
      const filePath = makeTempArticle(content);
      const result = validateArticle(filePath);

      expect(result.warnings.some((w) => w.includes("tags"))).toBe(true);
    });
  });

  describe("valid article", () => {
    it("should return no errors and no warnings for a fully valid article", () => {
      const filePath = makeTempArticle(VALID_FRONTMATTER);
      const result = validateArticle(filePath);

      expect(result.errors).toEqual([]);
      expect(result.warnings).toEqual([]);
      expect(result.skipped).toBeUndefined();
    });
  });

  describe("file read errors", () => {
    it("should return an error when the file does not exist", () => {
      const result = validateArticle("/nonexistent/path/to/file.md");

      expect(result.errors.length).toBe(1);
      expect(result.errors[0]).toContain("無法讀取檔案");
      expect(result.warnings).toEqual([]);
    });
  });
});
