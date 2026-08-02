import { describe, it, expect } from "vitest";
import {
  CATEGORY_STYLES,
  BASE_STYLE,
  AVOID_ELEMENTS,
  extractSceneConcept,
  selectMood,
  generateVisualElements,
  generatePrompt,
} from "../scripts/generate-feature-image-prompt.js";

describe("CATEGORY_STYLES", () => {
  it("should define styles for main published categories", () => {
    expect(CATEGORY_STYLES.articles).toBeDefined();
    expect(CATEGORY_STYLES["company-research"]).toBeDefined();
    expect(CATEGORY_STYLES["topic-research"]).toBeDefined();
    expect(CATEGORY_STYLES.articles.mood.length).toBeGreaterThan(0);
  });
});

describe("extractSceneConcept", () => {
  it("should match keyword concepts from title", () => {
    const scene = extractSceneConcept("Stripe 併購分析", "desc", []);
    expect(scene).toMatch(/merging|acquisition|geometric/i);
  });

  it("should fall back to generic concept when no keyword matches", () => {
    const scene = extractSceneConcept("Random Title", "no keywords here", []);
    expect(scene).toContain("abstract business concept");
  });

  it("should use tag mapping when title has no keyword", () => {
    const scene = extractSceneConcept("Something", "desc", ["AI"]);
    expect(scene).toMatch(/neural|intelligence|AI/i);
  });
});

describe("selectMood", () => {
  it("should pick mood from description keywords", () => {
    const mood = selectMood("這是一場突破性的分析", "articles");
    expect(mood).toMatch(/transformative|analytical/);
  });

  it("should include category default mood when description empty", () => {
    const mood = selectMood("", "company-research");
    expect(mood).toContain("analytical");
  });
});

describe("generateVisualElements", () => {
  it("should map known tags to visual elements", () => {
    const elements = generateVisualElements(["AI", "電商"], "articles");
    expect(elements).toMatch(/neural|e-commerce/i);
  });

  it("should fall back to category typical elements", () => {
    const elements = generateVisualElements([], "topic-research");
    expect(elements).toContain("industry ecosystem map");
  });
});

describe("generatePrompt", () => {
  it("should produce structured prompt with required sections", () => {
    const prompt = generatePrompt({
      title: "AI 併購策略分析",
      description: "創新與成長",
      tags: ["AI", "併購"],
      category: "articles",
    });

    expect(prompt).toContain("[SCENE]:");
    expect(prompt).toContain("[STYLE]:");
    expect(prompt).toContain("[COMPOSITION]:");
    expect(prompt).toContain("[MOOD]:");
    expect(prompt).toContain("[SPECIFIC ELEMENTS]:");
    expect(prompt).toContain("[AVOID]:");
    expect(prompt).toContain(BASE_STYLE.split(",")[0]);
    expect(prompt).toContain(AVOID_ELEMENTS.split(",")[0]);
    expect(prompt).toContain("16:9");
  });

  it("should use company-research style keywords when category matches", () => {
    const prompt = generatePrompt({
      title: "Toast POS 研究",
      description: "策略分析",
      tags: [],
      category: "company-research",
    });
    expect(prompt).toContain(
      CATEGORY_STYLES["company-research"].styleKeywords,
    );
  });

  it("should default to articles style when category missing", () => {
    const prompt = generatePrompt({
      title: "Untitled",
      description: "",
      tags: [],
    });
    expect(prompt).toContain(CATEGORY_STYLES.articles.styleKeywords);
  });
});
