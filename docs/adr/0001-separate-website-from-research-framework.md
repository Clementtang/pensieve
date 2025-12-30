---
title: "ADR-0001: 將網站與研究框架分離"
date: 2025-12-30
status: accepted
---

# ADR-0001: 將網站與研究框架分離

## 狀態

已接受 (Accepted)

## 背景

2025 年 12 月 30 日，Pensieve 專案成功部署了 VitePress 網站到 Vercel。然而，在檢視部署後的網站時，意識到幾個根本性問題：

1. **內容適合性**：並非所有 Pensieve 中的內容都適合或想要公開發布
2. **專案定位**：Pensieve 的核心價值在於研究流程、寫作方法和知識管理，網站只是副產品
3. **演進方向**：希望 Pensieve 專注於研究框架的發展，而非網站維護
4. **版權考量**：「Pensieve」一詞源自《哈利波特》，雖為隱喻使用，但作為公開網站名稱可能有風險

## 決策

### 架構分離

```
Pensieve（私有研究框架）    Multivac42（公開網站）
────────────────────────    ─────────────────────
├── 寫作模板                ├── 發布的精選文章
├── 研究流程                ├── 公開的研究報告
├── 草稿區                  └── 關於頁面
├── 寫作指南
└── 所有研究內容
         │
         └──────> 發布精選內容 ──────>
```

### 新網站命名

經過廣泛的名稱探索，最終選擇 **Multivac42**：

| 候選名稱 | 評估結果 |
|---------|---------|
| Arcana, Nexus, Codex | 過於常見或有商標衝突 |
| Grimoire, Lore, Vault | 不夠獨特 |
| The Last Question | 已有多個網站使用 |
| The Beginning | 過於通用 |
| **Multivac42** | ✅ 最終選擇 |

**Multivac42** 的意義：
- **Multivac**：阿西莫夫科幻小說中的超級電腦，首次出現於 1955 年《The Last Question》
- **42**：道格拉斯·亞當斯《銀河便車指南》中「生命、宇宙與萬物的終極答案」
- 向兩位科幻大師致敬，象徵對知識與答案的追求

### 執行方式

1. **建立新倉庫**：`github.com/Clementtang/multivac42`（公開）
2. **部署網站**：`multivac42.vercel.app`
3. **還原 Pensieve**：移除 VitePress 相關配置，回歸純研究框架
4. **內容遷移**：暫不執行，待發布流程確定後再處理

## 還原的變更

以下 commits 將被還原：

| Commit | 說明 |
|--------|------|
| `223743c` | 建立 VitePress 網站架構 |
| `2d196b2` | 完成自動化發布系統設置 |
| `a085c42` | 修復文章列表中的死連結 |

### 移除的檔案

- `.vitepress/` - VitePress 配置目錄
- `docs/index.md` - 網站首頁
- `docs/about.md` - 關於頁面
- `docs/articles/index.md` - 文章列表頁
- `docs/company-research/index.md` - 企業研究列表頁
- `vercel.json` - Vercel 部署配置
- `scripts/validate-filenames.js` - 檔案名驗證腳本（保留於 Multivac42）
- `.markdownlint.yml` - Markdown lint 配置
- `.github/workflows/validate.yml` - CI/CD 工作流

### 保留的內容

- 所有研究文章和報告（`docs/articles/`, `docs/company-research/`, `docs/topic-research/`）
- 寫作模板（`templates/`）
- 寫作指南（`WRITING_GUIDE.md`）
- 變更記錄（`CHANGELOG.md`）
- 貢獻指南（`CONTRIBUTING.md`）

### 需要修改的檔案

- `README.md` - 移除 VitePress/Vercel 相關說明
- `package.json` - 簡化或移除
- `.gitignore` - 移除 VitePress 相關項目
- 文章中的 YAML frontmatter - 保留，未來發布時仍有用

## 後續規劃

1. **發布流程設計**：建立從 Pensieve 發布到 Multivac42 的工作流
2. **內容篩選機制**：決定哪些內容適合公開發布
3. **Pensieve 演進**：專注於研究方法論、工作流程的優化

## 參考資源

- Multivac42 倉庫：https://github.com/Clementtang/multivac42
- Multivac42 網站：https://multivac42.vercel.app
- 阿西莫夫《The Last Question》：1955 年
- 道格拉斯·亞當斯《銀河便車指南》：1979 年

---

*決策日期：2025-12-30*
*決策者：Clement Tang*
