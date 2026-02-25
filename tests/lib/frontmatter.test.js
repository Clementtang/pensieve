import { describe, it, expect } from "vitest";
import {
  parseFrontmatter,
  generateFrontmatter,
} from "../../scripts/lib/frontmatter.js";

describe("parseFrontmatter", () => {
  it("should parse basic frontmatter fields", () => {
    const content = `---
title: My Article
date: 2026-01-01
status: published
category: articles
---

# Hello World`;

    const result = parseFrontmatter(content);

    expect(result.hasFrontmatter).toBe(true);
    expect(result.parseError).toBeNull();
    expect(result.frontmatter.title).toBe("My Article");
    expect(result.frontmatter.date).toBe("2026-01-01");
    expect(result.frontmatter.status).toBe("published");
    expect(result.frontmatter.category).toBe("articles");
    expect(result.body).toBe("# Hello World");
  });

  it("should return hasFrontmatter false when no frontmatter", () => {
    const content = "# Just a heading\n\nSome content.";

    const result = parseFrontmatter(content);

    expect(result.hasFrontmatter).toBe(false);
    expect(result.parseError).toBeTruthy();
    expect(result.frontmatter).toEqual({});
  });

  it("should parse single-line arrays", () => {
    const content = `---
tags: ["AI", "Claude", "automation"]
---

Content here.`;

    const result = parseFrontmatter(content);

    expect(result.hasFrontmatter).toBe(true);
    expect(result.frontmatter.tags).toEqual(["AI", "Claude", "automation"]);
  });

  it("should parse multiline arrays", () => {
    const content = `---
tags: ["AI",
"Claude",
"automation"]
---

Content here.`;

    const result = parseFrontmatter(content);

    expect(result.hasFrontmatter).toBe(true);
    expect(result.frontmatter.tags).toEqual(["AI", "Claude", "automation"]);
  });

  it("should handle multiline arrays with trailing comma", () => {
    const content = `---
tags: ["AI",
"Claude",
"automation",]
---

Content here.`;

    const result = parseFrontmatter(content);

    expect(result.hasFrontmatter).toBe(true);
    expect(result.frontmatter.tags).toEqual(["AI", "Claude", "automation"]);
  });

  it("should handle array on next line after empty key value", () => {
    const content = `---
title: Test
tags:
["AI", "Claude"]
---

Content.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter.tags).toEqual(["AI", "Claude"]);
  });

  it("should strip double quotes from string values", () => {
    const content = `---
title: "My Quoted Title"
---

Content.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter.title).toBe("My Quoted Title");
  });

  it("should strip single quotes from string values", () => {
    const content = `---
title: 'My Quoted Title'
---

Content.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter.title).toBe("My Quoted Title");
  });

  it("should parse boolean values", () => {
    const content = `---
publish: true
draft: false
---

Content.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter.publish).toBe(true);
    expect(result.frontmatter.draft).toBe(false);
  });

  it("should handle empty frontmatter (single empty line)", () => {
    const content = `---

---

Content.`;

    const result = parseFrontmatter(content);

    expect(result.hasFrontmatter).toBe(true);
    expect(result.frontmatter).toEqual({});
    expect(result.body).toBe("Content.");
  });

  it("should not match frontmatter with no newline between delimiters", () => {
    const content = `---
---

Content.`;

    const result = parseFrontmatter(content);

    // The regex ^---\n([\s\S]*?)\n--- requires content between delimiters
    // ---\n--- has no \n between the two ---, so it won't match
    expect(result.hasFrontmatter).toBe(false);
  });

  it("should handle values containing colons", () => {
    const content = `---
description: "This is a test: with colons"
---

Content.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter.description).toBe("This is a test: with colons");
  });

  it("should handle empty value keys as empty strings", () => {
    const content = `---
title: Test
author:
date: 2026-01-01
---

Content.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter.title).toBe("Test");
    expect(result.frontmatter.author).toBe("");
    expect(result.frontmatter.date).toBe("2026-01-01");
  });

  it("should handle key with empty value at end of frontmatter", () => {
    const content = `---
title: Test
author:
---

Content.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter.title).toBe("Test");
    expect(result.frontmatter.author).toBe("");
  });

  it("should skip lines without colons", () => {
    const content = `---
title: Test
this line has no colon
date: 2026-01-01
---

Content.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter.title).toBe("Test");
    expect(result.frontmatter.date).toBe("2026-01-01");
  });

  it("should call logError on single-line array parse failure", () => {
    const errors = [];
    const content = `---
tags: [not, valid, json]
---

Content.`;

    parseFrontmatter(content, {
      logError: (file, type, msg, details) => {
        errors.push({ file, type, msg, details });
      },
      filePath: "test.md",
    });

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].type).toBe("YAML_PARSE");
  });

  it("should call logError on multiline array parse failure", () => {
    const errors = [];
    const content = `---
tags: [not valid,
json content]
---

Content.`;

    parseFrontmatter(content, {
      logError: (file, type, msg, details) => {
        errors.push({ file, type, msg, details });
      },
      filePath: "test.md",
    });

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].type).toBe("YAML_PARSE");
  });

  it("should trim body content", () => {
    const content = `---
title: Test
---

  Content with surrounding whitespace.  `;

    const result = parseFrontmatter(content);

    expect(result.body).toBe("Content with surrounding whitespace.");
  });
});

describe("generateFrontmatter", () => {
  it("should generate basic frontmatter", () => {
    const fm = {
      title: "My Article",
      date: "2026-01-01",
      status: "published",
    };

    const result = generateFrontmatter(fm);

    expect(result).toBe(
      `---\ntitle: My Article\ndate: 2026-01-01\nstatus: published\n---`,
    );
  });

  it("should serialize arrays as JSON", () => {
    const fm = {
      title: "Test",
      tags: ["AI", "Claude"],
    };

    const result = generateFrontmatter(fm);

    expect(result).toContain('tags: ["AI","Claude"]');
  });

  it("should quote strings containing colons", () => {
    const fm = {
      description: "This is: a test",
    };

    const result = generateFrontmatter(fm);

    expect(result).toContain('description: "This is: a test"');
  });

  it("should quote strings containing double quotes", () => {
    const fm = {
      title: 'Said "hello"',
    };

    const result = generateFrontmatter(fm);

    expect(result).toContain('title: "Said "hello""');
  });

  it("should handle boolean values", () => {
    const fm = {
      publish: true,
      draft: false,
    };

    const result = generateFrontmatter(fm);

    expect(result).toContain("publish: true");
    expect(result).toContain("draft: false");
  });

  it("should handle empty object", () => {
    const result = generateFrontmatter({});

    expect(result).toBe("---\n---");
  });

  it("should roundtrip basic frontmatter", () => {
    const original = {
      title: "Roundtrip Test",
      date: "2026-02-25",
      status: "published",
      category: "articles",
      tags: ["AI", "test"],
    };

    const generated = generateFrontmatter(original);
    const parsed = parseFrontmatter(generated + "\n\nBody content.");

    expect(parsed.frontmatter.title).toBe(original.title);
    expect(parsed.frontmatter.date).toBe(original.date);
    expect(parsed.frontmatter.status).toBe(original.status);
    expect(parsed.frontmatter.category).toBe(original.category);
    expect(parsed.frontmatter.tags).toEqual(original.tags);
  });
});
