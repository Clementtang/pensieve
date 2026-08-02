import { describe, it, expect, afterEach } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  reviewDrafts,
  daysSince,
  parseCliArgs,
  DEFAULT_DAYS,
} from "../scripts/review-drafts.js";

const tempDirs = [];

afterEach(() => {
  for (const dir of tempDirs) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  tempDirs.length = 0;
});

function makeDraftsDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pensieve-drafts-"));
  tempDirs.push(dir);
  return dir;
}

function writeDraft(dir, name, content, mtimeMs) {
  const filePath = path.join(dir, name);
  fs.writeFileSync(filePath, content);
  if (mtimeMs != null) {
    const atime = new Date();
    const mtime = new Date(mtimeMs);
    fs.utimesSync(filePath, atime, mtime);
  }
  return filePath;
}

describe("daysSince", () => {
  it("should return whole days between mtime and now", () => {
    const now = new Date("2026-08-02T12:00:00Z");
    const mtime = new Date("2026-07-03T12:00:00Z");
    expect(daysSince(mtime, now)).toBe(30);
  });
});

describe("parseCliArgs", () => {
  it("should default days and json", () => {
    expect(parseCliArgs([])).toEqual({
      days: DEFAULT_DAYS,
      json: false,
      help: false,
    });
  });

  it("should parse --days and --json", () => {
    expect(parseCliArgs(["--days", "14", "--json"])).toEqual({
      days: 14,
      json: true,
      help: false,
    });
  });

  it("should throw on invalid --days", () => {
    expect(() => parseCliArgs(["--days", "x"])).toThrow(/非負數字/);
  });
});

describe("reviewDrafts", () => {
  const sampleFm = (title, status = "draft") => `---
title: "${title}"
description: "desc"
date: 2026-01-01
category: memo
status: ${status}
---

# ${title}
`;

  it("should list drafts and skip README", () => {
    const dir = makeDraftsDir();
    writeDraft(dir, "README.md", "# drafts");
    writeDraft(dir, "2026-01-01-note.md", sampleFm("Note A"));

    const now = new Date("2026-08-02T00:00:00Z");
    const report = reviewDrafts({
      draftsDir: dir,
      daysThreshold: 30,
      now,
    });

    expect(report.drafts).toHaveLength(1);
    expect(report.drafts[0].file).toBe("2026-01-01-note.md");
    expect(report.drafts[0].title).toBe("Note A");
    expect(report.drafts[0].status).toBe("draft");
  });

  it("should mark drafts older than threshold as stale", () => {
    const dir = makeDraftsDir();
    const oldMs = new Date("2026-06-01T00:00:00Z").getTime();
    const freshMs = new Date("2026-07-28T00:00:00Z").getTime();
    writeDraft(dir, "old.md", sampleFm("Old"), oldMs);
    writeDraft(dir, "fresh.md", sampleFm("Fresh", "in-progress"), freshMs);

    const now = new Date("2026-08-02T00:00:00Z");
    const report = reviewDrafts({
      draftsDir: dir,
      daysThreshold: 30,
      now,
    });

    const byFile = Object.fromEntries(report.drafts.map((d) => [d.file, d]));
    expect(byFile["old.md"].stale).toBe(true);
    expect(byFile["old.md"].ageDays).toBeGreaterThanOrEqual(30);
    expect(byFile["fresh.md"].stale).toBe(false);
    expect(report.staleCount).toBe(1);
  });

  it("should return empty when directory missing", () => {
    const report = reviewDrafts({
      draftsDir: path.join(os.tmpdir(), "pensieve-no-such-dir-xyz"),
    });
    expect(report.drafts).toEqual([]);
    expect(report.staleCount).toBe(0);
  });

  it("should sort by age descending", () => {
    const dir = makeDraftsDir();
    writeDraft(
      dir,
      "newer.md",
      sampleFm("N"),
      new Date("2026-07-20T00:00:00Z").getTime(),
    );
    writeDraft(
      dir,
      "older.md",
      sampleFm("O"),
      new Date("2026-05-01T00:00:00Z").getTime(),
    );
    const report = reviewDrafts({
      draftsDir: dir,
      now: new Date("2026-08-02T00:00:00Z"),
    });
    expect(report.drafts[0].file).toBe("older.md");
    expect(report.drafts[1].file).toBe("newer.md");
  });
});
