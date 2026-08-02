# Research Memo：Web↔CLI 工作流

> 用手機端快速蒐集與結構化，桌機端擴寫成正式文章。對應 backlog **P1-007**。

**最後更新：** 2026-08-02  
**版本：** 1.0.0  
**相關：** [research-memo-template](../../templates/research-memo-template.md)、[發布流程](./publishing-workflow.md)

---

## 目標

| 階段 | 環境 | 產出 | 字數量級 |
|------|------|------|----------|
| 研究交接 | Claude Code Web（手機） | `drafts/YYYY-MM-DD-memo-*.md` | 約 1,000–3,000 字（結構化備忘，非成稿） |
| 正式撰寫 | Claude Code CLI（桌機） | `docs/{articles\|company-research\|topic-research}/` | 依模板（文章 2–5k、議題研究可更長） |
| 發布 | push `main` | Multivac42 | `status: published` + CI |

Memo **不是**要直接上線的文章，而是可交接的研究包：問題、發現、數據、引述、大綱、來源。

---

## 端到端流程

```
手機 Web
  │  建立 memo（templates/research-memo-template.md）
  │  status: draft，放 drafts/
  ▼
git commit / push（或本機同步）
  │
桌機 CLI
  │  讀 memo + 目標模板 + WRITING_GUIDE
  │  擴寫成完整文 → docs/...
  │  status: published
  ▼
push main → publish-to-multivac CI → 驗證 Vercel READY + 頁面 200
  │
底稿處置
  │  memo status → archived
  │  related 指到正式文路徑
  ▼
npm run review-drafts（archived 不計過期告警）
```

---

## 步驟 1：手機建立 Memo

### 建議 prompt

```
我正在為 [主題] 進行 [文章 / 企業研究 / 議題研究] 的前期研究。

請：
1. 搜尋並核對關鍵事實（標日期與來源）
2. 依 templates/research-memo-template.md 建立 Research Memo
3. 寫入 drafts/，檔名 YYYY-MM-DD-memo-[english-slug].md
4. frontmatter：category: memo、status: draft、tags 含 research-memo
5. 保持可交接：核心問題、關鍵發現、數據表、引述、章節大綱、資料來源、交接備註

不要寫成完整成稿；字數以交接為主。
```

### 檢查清單（Web 結束前）

- [ ] 檔名英文 kebab-case，含日期前綴
- [ ] 必填 frontmatter：`title` `description` `date` `category` `status`
- [ ] 「目標輸出」寫明要長成 article / company-research / topic-research
- [ ] 來源用 markdown 連結，勿 bare URL（MD034）
- [ ] 待補充項目有列，方便 CLI 續寫

---

## 步驟 2：桌機擴寫

### 建議 prompt

```
請讀取 drafts/[memo 檔名]。

依交接備註的建議模板（templates/...）與 WRITING_GUIDE.md 撰寫完整 [文章/研究]。
- 台灣繁體中文用語
- description 約 20–160 字
- 正式文 status: published，放 docs/ 對應目錄
- 內部連結與參考資料格式符合專案規範
- 完成後：將 memo 的 status 改 archived，並在 related 加上正式文路徑
```

### 注意

1. **不要**把 memo 本體改 `published` 後塞進 `docs/`（`category: memo` 不在 M42 發布掃描目錄）。
2. 正式文與 memo 同主題時，memo 只當底稿；避免再發一篇高度重疊的公開文。
3. 發布後驗證見 [publishing-workflow.md](./publishing-workflow.md) 步驟 4（Vercel `READY` + 頁面 200）。

---

## 實測案例（2026）

| Memo 底稿 | 正式產出 | 處置 |
|-----------|----------|------|
| `drafts/2026-05-19-memo-gemini-spark.md` | `docs/articles/2026-05-19-gemini-spark-vs-openclaw-hermes.md` | memo → `archived` + related |
| `drafts/2026-04-21-memo-hitachi-nojima-acquisition.md` | `docs/topic-research/2026-04-21-japan-home-appliance-industry-decline.md` | memo → `archived` + related |

摩擦點與對策：

| 摩擦 | 對策 |
|------|------|
| Memo 無 frontmatter，逃過 validate 習慣 | 模板必填；hook 只掃 `docs/`，drafts 靠 `npm run validate -- drafts/` |
| 檔名 `memo-topic.md` 缺日期 | 一律 `YYYY-MM-DD-memo-slug.md` |
| 誤以為 memo 要再 publish 一次 | 流程寫死：公開文是擴寫結果，memo 歸檔 |
| 參考資料 bare URL 讓 lint 紅 | 寫成 `[標題](url)` |
| 草稿堆積 | `npm run review-drafts`；`archived` 不計過期 |

---

## 常用指令

```bash
# 從模板開 memo（類型 memo）
node scripts/new-article.js --type memo --title "主題" --slug memo-topic-slug

# 驗證草稿 frontmatter
node scripts/validate-article.js drafts/

# 過期草稿
npm run review-drafts

# 正式文驗證與發布（push main 後由 CI 處理）
node scripts/validate-article.js docs/articles/YYYY-MM-DD-slug.md
```

---

## 與其他文件的關係

- 模板欄位：`templates/research-memo-template.md`
- 寫作與 description：`WRITING_GUIDE.md`
- 上線與 CI：`docs/guides/publishing-workflow.md`
- 優化追蹤：`docs/roadmap/optimization-backlog.md`（P1-007）
