---
title: "Claude Code 專案導向 Agent 設計方法"
description: "記錄如何讓 Claude Code 分析本地專案，設計客製化的 subagents 工作流程"
date: 2026-01-27
category: articles
status: draft
tags: [Claude Code, AI, subagents, workflow, automation]
author: Clement Tang
---

# Claude Code 專案導向 Agent 設計方法

> **Research Memo** — 保存完整對話脈絡，待整理成正式文章

## 背景與動機

在使用 Claude Code 時，發現可以讓它直接掃描本地專案，基於專案的技術棧和工作流程，客製化建議應該建立哪些 subagents。這個做法比使用通用模板更精準。

## 實驗專案

分析了 4 個本地專案：

| 專案      | 類型           | 技術棧                   |
| --------- | -------------- | ------------------------ |
| MarketVue | 全端股票看板   | React 19 + Flask + Redis |
| Pensieve  | 知識管理系統   | Node.js CLI + Markdown   |
| M42       | 個人網站       | VitePress + Vue 3        |
| Mentat    | Gmail 分類工具 | Python + Gmail API       |

## 設計決策過程

### 1. 共用 vs 獨立 Agents

**問題**：專案間應該共用 agents 還是各自獨立？

**結論**：混合策略

- **User-level（~/.claude/agents/）**：通用能力層（code-reviewer, architect, security-auditor）
- **Project-level（.claude/agents/）**：專案知識層（含專案路徑、指令、慣例）

**理由**：

- 通用能力（審查方法論）不需要重複
- 專案知識（路徑、指令）需要客製化
- 通用 agent 可透過讀取專案 CLAUDE.md 獲取 context

### 2. 模型選擇

| 任務類型     | 模型   | 理由             |
| ------------ | ------ | ---------------- |
| 複雜架構決策 | Opus   | 需要深度推理     |
| 深度研究     | Opus   | 高品質分析       |
| 一般開發     | Sonnet | 平衡成本/品質    |
| 測試/驗證    | Haiku  | 規則導向，成本低 |

### 3. Pensieve 的 Writer vs Editor 職責分離

**問題**：Writer 和 Editor 會重工嗎？

**原本設計**：

- Writer：建立文章 + 驗證 frontmatter
- Editor：用詞 + 格式

**問題**：frontmatter 檢查重疊

**調整後**：

- **Writer**：純內容創作（不驗證）
- **Editor**：品質審核 + 發布前驗證 + 執行發布

**工作流程**：

```
researcher → writer → editor → 發布
  研究        創作      審核     （經確認後執行）
```

### 4. 整合發布流程到 Editor

**問題**：發布需要手動執行指令，能否整合到 editor？

**解決方案**：

1. Editor 完成所有檢查
2. 產出審核報告
3. 詢問使用者確認
4. 使用者同意後，editor 執行 `npm run publish -- --auto-commit`
5. 回報發布結果

**安全機制**：必須經過使用者明確同意才發布

## 最終 Agents 配置

### User-level（通用）

| Agent              | Model  | 職責                 |
| ------------------ | ------ | -------------------- |
| code-reviewer      | Sonnet | 通用程式碼審查       |
| security-auditor   | Opus   | 深度安全審計         |
| architect          | Opus   | 系統架構決策         |
| test-runner        | Haiku  | 測試執行回報         |
| frontend-developer | Sonnet | 通用前端開發（原有） |

### MarketVue

| Agent        | Model  | 職責                      |
| ------------ | ------ | ------------------------- |
| frontend-dev | Sonnet | React 19 + TanStack Query |
| backend-dev  | Sonnet | Flask + yfinance          |

### Pensieve

| Agent      | Model  | 職責                |
| ---------- | ------ | ------------------- |
| researcher | Opus   | 深度研究分析        |
| writer     | Sonnet | 內容創作            |
| editor     | Sonnet | 審核 + M42 發布驗證 |

### Mentat

| Agent      | Model | 職責         |
| ---------- | ----- | ------------ |
| classifier | Haiku | 分類規則除錯 |

## 與社群做法的比較

### 社群常見做法

1. **手動建立**：基於需求直接寫 agent 設定
2. **使用模板集合**：如 VoltAgent/awesome-claude-code-subagents（100+ agents）
3. **Claude 自動生成**：`/agents` → "Generate with Claude"

### 本方法的獨特之處

| 面向       | 傳統做法 | 本方法                       |
| ---------- | -------- | ---------------------------- |
| 起點       | 通用模板 | 專案實際需求                 |
| 分析深度   | 無       | 深入理解架構                 |
| 客製化程度 | 低       | 高（含專案路徑、指令、慣例） |
| 職責分工   | 通用     | 基於專案工作流程設計         |

### 本方法的價值

1. **跨專案視角**：一次分析多個專案，統一規劃 user-level vs project-level
2. **職責分離設計**：不只建立 agents，還設計工作流程
3. **避免重工**：刻意討論職責邊界
4. **整合發布流程**：把 CI/CD 概念融入 agent 設計

## 參考資源

- [Claude Code 官方文件 - Subagents](https://code.claude.com/docs/en/sub-agents)
- [Anthropic - Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [PubNub - Best Practices for Subagents](https://www.pubnub.com/blog/best-practices-for-claude-code-sub-agents/)
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
- [wshobson/agents](https://github.com/wshobson/agents)

## 待整理成文章的重點

1. **為什麼要專案導向**：通用模板 vs 客製化的 trade-off
2. **如何請 Claude Code 分析專案**：prompt 範例
3. **職責分離的思考過程**：避免重工的設計
4. **模型選擇策略**：Opus/Sonnet/Haiku 的使用時機
5. **實際配置範例**：完整的 agent 檔案內容

---

_此 memo 保存了完整的對話脈絡和決策過程，可作為撰寫正式文章的素材。_
