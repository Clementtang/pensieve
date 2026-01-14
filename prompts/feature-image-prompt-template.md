# Feature Image Prompt Template

> 用於生成文章 Feature Image 的 Prompt 模板，配合 Google Gemini Nano Banana Pro 使用。

**版本：** 1.1.0
**建立日期：** 2026-01-13
**更新日期：** 2026-01-15
**目標模型：** gemini-3-pro-image-preview (Nano Banana Pro)

---

## 視覺品牌定義

### 核心視覺語言

| 元素     | 規範                                         |
| -------- | -------------------------------------------- |
| **風格** | 現代商業插畫、科技感、專業質感               |
| **色調** | 琥珀金色為主調 (#f59e0b)、深黑背景 (#0a0a0f) |
| **構圖** | 中央主體、簡潔背景、平衡呼吸感               |
| **氛圍** | 專業、前瞻、科技未來感                       |

### 一致性關鍵詞

每個 prompt 應包含以下基礎風格描述：

```
modern business illustration, clean professional design,
amber gold accent (#f59e0b) on deep dark background (#0a0a0f),
minimalist composition, high-quality digital art,
tech-forward aesthetic with warm golden highlights,
16:9 aspect ratio
```

---

## Category 視覺指南

### Articles（時事評論）

**視覺方向：** 新聞感、時事性、動態感

**風格關鍵詞：**

```
editorial illustration style, news magazine aesthetic,
dynamic composition, conceptual visual metaphor,
contemporary feel, thought-provoking imagery
```

**典型元素：**

- 抽象概念視覺化
- 趨勢箭頭、數據圖形
- 科技符號、連結節點

---

### Company Research（企業研究）

**視覺方向：** 企業識別、品牌暗示、分析質感

**風格關鍵詞：**

```
corporate analysis aesthetic, strategic consulting feel,
subtle brand reference (without using logos),
data visualization elements, business intelligence imagery
```

**典型元素：**

- 建築/辦公室抽象形狀
- 財務圖表元素
- 產業象徵物件

---

### Topic Research（議題研究）

**視覺方向：** 深度研究感、系統化、全局觀

**風格關鍵詞：**

```
research report cover aesthetic, systematic study feel,
interconnected concepts, industry landscape visualization,
academic yet accessible, comprehensive overview
```

**典型元素：**

- 產業地圖/生態系統圖
- 多層次結構
- 時間軸元素

---

## Prompt 結構模板

### 標準格式

```
[SCENE]: {場景描述 - 從文章標題提取核心概念}

[STYLE]: modern business illustration, clean professional design,
amber gold accent (#f59e0b) on deep dark background (#0a0a0f),
minimalist composition, high-quality digital art,
tech-forward aesthetic with warm golden highlights

[COMPOSITION]: centered focal point, 16:9 aspect ratio,
balanced composition with visual breathing room

[MOOD]: {從文章情緒選擇: professional, innovative, analytical,
forward-looking, transformative, disruptive}

[SPECIFIC ELEMENTS]: {從標籤和內容提取 2-3 個視覺元素}

[AVOID]: text, words, letters, logos, realistic human faces,
cluttered composition, company branding
```

---

## 範例 Prompts

### 範例 1：併購分析文章

**文章標題：** Workday 併購 Pipedream：強化「可行動 AI」布局
**文章描述：** 企業 AI 從「洞察」邁向「行動」的關鍵突破
**標籤：** Workday, Pipedream, AI, 併購, 企業軟體, 自動化

**生成 Prompt：**

```
[SCENE]: Abstract visualization of two corporate entities merging,
represented by geometric shapes coming together, with flowing
connection lines symbolizing integration and data flow between systems

[STYLE]: modern business illustration, clean professional design,
amber gold accent (#f59e0b) on deep dark background (#0a0a0f),
minimalist composition, high-quality digital art,
tech-forward aesthetic with warm golden highlights

[COMPOSITION]: centered focal point showing merger concept,
16:9 aspect ratio, balanced composition with visual breathing room

[MOOD]: transformative, strategic, forward-looking

[SPECIFIC ELEMENTS]: interconnected nodes representing API connections,
subtle AI neural network patterns, corporate building silhouettes
abstractly merging

[AVOID]: text, words, letters, logos, realistic human faces,
cluttered composition, company branding
```

---

### 範例 2：AI 商務競爭文章

**文章標題：** AI 購物大戰開打：Google 與 OpenAI 爭奪你的錢包
**文章描述：** Google UCP 與 OpenAI/Stripe ACP 兩大代理商務協議的競爭
**標籤：** AI, 代理商務, Google, OpenAI, 電子商務

**生成 Prompt：**

```
[SCENE]: Two powerful tech titans represented as abstract geometric
figures facing each other across a digital commerce battlefield,
with flowing data streams and commerce symbols between them

[STYLE]: modern business illustration, clean professional design,
amber gold accent (#f59e0b) on deep dark background (#0a0a0f),
with purple tech accents, minimalist composition,
high-quality digital art, tech-forward aesthetic

[COMPOSITION]: centered focal point showing competition concept,
16:9 aspect ratio, balanced composition with visual breathing room

[MOOD]: competitive, transformative, forward-looking

[SPECIFIC ELEMENTS]: AI neural network patterns connecting to
shopping cart icons, two distinct protocol symbols facing each other,
e-commerce flow visualization with payment streams

[AVOID]: text, words, letters, logos, realistic human faces,
Google logo, OpenAI logo, company branding, cluttered composition
```

---

### 範例 3：企業研究

**文章標題：** Airwallex 企業研究：跨境支付的破壞者
**文章描述：** 深度分析 Airwallex 的商業模式與成長策略
**標籤：** Airwallex, 金融科技, 跨境支付

**生成 Prompt：**

```
[SCENE]: Abstract global financial network visualization,
showing interconnected currency flows across a stylized world map,
with emphasis on cross-border connections and fintech innovation

[STYLE]: modern business illustration, corporate analysis aesthetic,
amber gold accent (#f59e0b) on deep dark background (#0a0a0f),
clean professional design, minimalist composition,
high-quality digital art

[COMPOSITION]: centered focal point with global network,
16:9 aspect ratio, balanced composition with visual breathing room

[MOOD]: analytical, global, disruptive

[SPECIFIC ELEMENTS]: stylized currency symbols flowing between regions,
abstract globe with connection points, fintech circuit patterns,
growth trajectory visualization

[AVOID]: text, words, letters, logos, company branding,
realistic human faces, cluttered composition
```

---

## 使用指南

### Step 1: 提取文章資訊

從文章 frontmatter 提取：

- `title`: 核心概念來源
- `description`: 情緒和角度
- `tags`: 視覺元素關鍵詞
- `category`: 決定視覺風格方向

### Step 2: 選擇視覺方向

根據 category 選擇對應的視覺風格關鍵詞。

### Step 3: 組合 Prompt

使用標準格式，填入：

1. 從標題提取的場景概念
2. 對應 category 的風格描述
3. 2-3 個從標籤轉化的視覺元素
4. 適合的情緒關鍵詞

### Step 4: 生成與調整

在 Gemini 中執行 prompt，根據結果進行 1-2 輪迭代優化。

---

## 技術規格

### Nano Banana Pro 參數建議

| 參數                  | 建議值                     |
| --------------------- | -------------------------- |
| **Model**             | gemini-3-pro-image-preview |
| **Aspect Ratio**      | 16:9                       |
| **Resolution**        | 2K (2048×1152) 或 4K       |
| **Response Modality** | IMAGE                      |

### 輸出規格

| 用途                     | 尺寸      | 格式     |
| ------------------------ | --------- | -------- |
| **部落格 Feature Image** | 1200×675  | PNG/WebP |
| **社群分享 (OG)**        | 1200×630  | PNG      |
| **高解析度備份**         | 2048×1152 | PNG      |

---

## 常見問題

### Q: 如何避免生成帶有文字的圖片？

在 `[AVOID]` 區塊明確加入 `text, words, letters, typography, writing`。

### Q: 如何處理特定公司的研究文章？

不要嘗試生成公司 logo 或品牌元素，改用抽象的產業象徵或商業概念視覺化。

### Q: 生成結果太複雜怎麼辦？

在 `[STYLE]` 強調 `minimalist, clean, simple composition, lots of negative space`。

---

_最後更新：2026-01-15_
