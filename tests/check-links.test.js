import { describe, it, expect } from "vitest";
import {
  extractLinks,
  parseArgs,
} from "../scripts/check-links.js";

describe("extractLinks", () => {
  it("should extract markdown links with line numbers", () => {
    const content = `# Title

See [Google](https://www.google.com) for more.

## Refs
1. [Example](https://example.com/path)
`;
    const links = extractLinks(content);
    expect(links).toHaveLength(2);
    expect(links[0]).toMatchObject({
      text: "Google",
      url: "https://www.google.com",
      kind: "markdown",
      line: 3,
    });
    expect(links[1].url).toBe("https://example.com/path");
  });

  it("should extract bare URLs", () => {
    const content = `Source — https://www.nikkei.com/article/123\n`;
    const links = extractLinks(content);
    expect(links.some((l) => l.kind === "bare")).toBe(true);
    expect(links[0].url).toContain("nikkei.com");
  });

  it("should not double-count URL already in markdown link", () => {
    const content = `[Nikkei](https://www.nikkei.com/a)\n`;
    const links = extractLinks(content);
    expect(links).toHaveLength(1);
    expect(links[0].kind).toBe("markdown");
  });
});

describe("parseArgs", () => {
  it("should parse target and flags", () => {
    expect(parseArgs(["docs/articles", "--check", "--timeout", "5000"])).toEqual({
      target: "docs/articles",
      check: true,
      json: false,
      timeout: 5000,
      help: false,
    });
  });
});
