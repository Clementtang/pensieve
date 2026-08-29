import { describe, it, expect } from "vitest";
import {
  extractLinks,
  parseArgs,
  shouldRetryWithGet,
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
      delay: 1000,
      help: false,
    });
  });
});

describe("shouldRetryWithGet", () => {
  it("should retry bot-blocked and rate-limited responses", () => {
    expect(shouldRetryWithGet(403)).toBe(true);
    expect(shouldRetryWithGet(405)).toBe(true);
    expect(shouldRetryWithGet(429)).toBe(true);
    expect(shouldRetryWithGet(500)).toBe(true);
    expect(shouldRetryWithGet(503)).toBe(true);
  });

  it("should not retry success or definitive failures", () => {
    expect(shouldRetryWithGet(200)).toBe(false);
    expect(shouldRetryWithGet(301)).toBe(false);
    expect(shouldRetryWithGet(404)).toBe(false);
    expect(shouldRetryWithGet(410)).toBe(false);
  });
});

describe("parseArgs --delay", () => {
  it("should default to 1000ms and accept an override", () => {
    expect(parseArgs(["docs/"]).delay).toBe(1000);
    expect(parseArgs(["docs/", "--delay", "2500"]).delay).toBe(2500);
    expect(parseArgs(["docs/", "--delay", "0"]).delay).toBe(0);
  });
});
