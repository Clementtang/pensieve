---
title: "讓 Claude Code 幫你設計專案專屬的 Agents"
description: "分享如何讓 Claude Code 分析本地專案，客製化設計 subagents 工作流程的方法"
date: 2026-01-27
category: articles
status: published
tags: [Claude Code, AI, subagents, workflow, automation, 開發工具]
author: Clement Tang
---

# 讓 Claude Code 幫你設計專案專屬的 Agents

## 元資料

- **建立日期：** 2026-01-27
- **標籤：** #Claude-Code #AI #subagents #workflow #automation #開發工具
- **狀態：** 草稿
- **字數：** 約 2,500 字

---

管理多個不同技術棧的專案時，我一直在思考如何讓 Claude Code 的 subagents 更貼合每個專案的實際需求。

社群裡有不少 agent 模板集合，像是 VoltAgent/awesome-claude-code-subagents 收錄了上百個預設 agents。這些模板涵蓋各種場景：code reviewer、security auditor、documentation writer 等等。我試用了幾個，確實能快速上手，但總覺得缺了什麼。

問題在於：通用模板假設一種標準化的工作流程，但每個專案的技術棧、團隊慣例、發布流程都不同。一個 React + Flask 的股票看板，和一個純 Python 的 Gmail 分類工具，需要的 agents 組合怎麼會一樣？

後來我換了個思路：與其從模板出發去適應專案，何不讓 Claude Code 直接分析專案，再基於分析結果設計 agents？

## 方法概述

做法其實很直接。我請 Claude Code 掃描本地專案的結構、讀取關鍵設定檔（package.json、requirements.txt、CLAUDE.md 等），然後基於對專案的理解，建議應該建立哪些 subagents。

這個過程產出的 agents 會包含專案特定的資訊：檔案路徑、常用指令、技術棧細節、團隊慣例。這些是通用模板無法預先知道的。

在設計過程中，我採用了分層策略：

**User-level agents**（放在 `~/.claude/agents/`）處理通用能力，像是程式碼審查的方法論、安全審計的檢查項目。這些能力跨專案通用，不需要重複定義。

**Project-level agents**（放在各專案的 `.claude/agents/`）則專注於專案知識：這個專案的測試怎麼跑、部署流程是什麼、有哪些特殊的程式碼慣例。

這樣的分層讓通用 agents 可以透過讀取專案的 CLAUDE.md 來獲取 context，同時專案特定的知識也有地方存放。

## 實際案例

我分析了手邊四個專案，讓 Claude Code 針對每個專案的特性設計 agents。

| 專案      | 類型           | 技術棧                   |
| --------- | -------------- | ------------------------ |
| MarketVue | 全端股票看板   | React 19 + Flask + Redis |
| Pensieve  | 知識管理系統   | Node.js CLI + Markdown   |
| M42       | 個人網站       | VitePress + Vue 3        |
| Mentat    | Gmail 分類工具 | Python + Gmail API       |

**MarketVue** 是前後端分離的專案，自然需要 frontend-dev 和 backend-dev 兩個 agents。frontend-dev 專注於 React 19 的新特性和 TanStack Query 的使用模式；backend-dev 則熟悉 Flask 路由和 yfinance 資料處理。這兩個 agents 各自了解自己負責的程式碼區塊，不會互相干擾。

**Pensieve** 的情況比較特別。這是一個內容管理系統，主要工作流程是：研究議題、撰寫文章、編輯審核、發布到網站。我設計了 researcher、writer、editor 三個 agents，對應這個工作流程的三個階段。這個設計經歷了一次調整，後面會詳細說明。

**Mentat** 功能單純，就是根據規則分類 Gmail 郵件。我只建立了一個 classifier agent，專門用來除錯分類規則。因為任務明確且規則導向，這個 agent 使用 Haiku 模型就足夠，成本也低。

至於 **M42**，它主要是 Pensieve 的發布目的地，內容更新都從 Pensieve 觸發，所以沒有建立專屬 agents。

## 設計決策的思考過程

### 共用還是獨立？

一開始我考慮過讓每個專案都有完整獨立的 agents 組合，但很快發現這樣會有大量重複。程式碼審查的核心原則（可讀性、效能、安全性）在所有專案都適用，沒必要每個專案各寫一份。

最後的結論是：能力層共用，知識層獨立。

User-level 放了 code-reviewer、security-auditor、architect、test-runner 這些通用能力型 agents。它們知道「怎麼做」，但不知道「在這個專案要做什麼」（後者透過讀取專案的 CLAUDE.md 補齊）。

Project-level 的 agents 則相反，它們知道這個專案的一切細節：檔案結構、指令參數、團隊偏好，但不需要重複定義審查方法論這類通用知識。

### 模型怎麼選？

不同任務對模型能力的需求差異很大。我的選擇邏輯是：

| 任務類型           | 模型   | 理由               |
| ------------------ | ------ | ------------------ |
| 複雜架構決策       | Opus   | 需要深度推理和權衡 |
| 深度研究分析       | Opus   | 品質優先           |
| 一般開發工作       | Sonnet | 平衡成本與品質     |
| 測試驗證、規則執行 | Haiku  | 規則導向，速度優先 |

例如 Pensieve 的 researcher 用 Opus，因為研究品質直接影響文章價值；Mentat 的 classifier 用 Haiku，因為分類規則除錯就是反覆執行和檢查結果，不需要複雜推理。

### Writer 和 Editor 的職責分離

Pensieve 的 writer 和 editor 設計經歷了一次調整。最初的設計是：

- Writer：建立文章內容 + 驗證 frontmatter 格式
- Editor：檢查用詞和格式

問題很快浮現：兩者都在檢查 frontmatter，職責重疊了。Writer 驗證完一次，Editor 又驗證一次，既浪費又容易造成混亂。如果兩邊標準不一致怎麼辦？

調整後的設計把驗證工作全部集中到 Editor：

- Writer：純內容創作，不做任何驗證
- Editor：品質審核 + 格式驗證 + 發布確認

工作流程變成：`researcher → writer → editor → 發布`。每個環節職責清晰，researcher 研究、writer 創作、editor 把關。發布動作也整合到 editor 裡，審核通過後詢問確認，同意就直接執行發布指令。

這個調整省去了手動執行發布指令的步驟，同時保留了人工確認的安全機制。

## 與社群做法的比較

社群裡常見的做法有幾種：

第一種是手動建立，根據需求直接寫 agent 設定檔。優點是完全客製化，缺點是需要對 subagents 運作方式有足夠了解，也比較花時間。

第二種是使用模板集合，像 awesome-claude-code-subagents 這類資源，提供大量預設 agents 供選用。優點是快速上手，缺點是通用性和專案特定需求之間的 gap。

第三種是 Claude Code 內建的自動生成功能，透過 `/agents` 指令讓 Claude 生成建議。這介於手動和模板之間，但生成結果通常還是偏通用。

我這個做法的差異點在於：起點是專案實際需求。Claude Code 先分析專案，理解技術棧和工作流程，再基於這些理解設計 agents。產出的 agents 包含專案路徑、指令、慣例這些具體資訊，不只是通用框架。

另一個差異是跨專案的統一規劃。同時分析多個專案，可以更清楚看出哪些能力該共用（放 user-level）、哪些知識該獨立（放 project-level），避免重複定義也避免遺漏。

## 結論與建議

這個方法適合幾種情境：

手邊有多個技術棧差異大的專案，需要統一管理 agents 配置。或是專案有特定的工作流程和慣例，通用模板無法完全滿足需求。又或是想要更系統化地思考 agents 的職責分工，避免重疊和遺漏。

如果你想嘗試這個做法，建議從一個專案開始。請 Claude Code 掃描專案結構，說明你的工作流程，讓它建議適合的 agents 組合。過程中會有很多設計決策需要討論：這個 agent 該用什麼模型？職責邊界怎麼畫？要放 user-level 還是 project-level？這些討論本身就很有價值，會讓你更清楚自己的需求。

有了第一個專案的經驗後，再擴展到其他專案就順多了。而且跨專案比較時，常常會發現可以進一步改進的地方，例如哪些能力其實可以抽出來共用、哪些專案特定知識需要獨立維護。

最後提醒一點：agents 設計是會演化的。隨著專案發展、工作流程調整，原本的設計可能需要修改。像 Pensieve 的 writer/editor 職責分離，就是用了一段時間後才發現問題並調整。定期檢視 agents 的使用狀況，根據實際經驗持續改進，比一開始就追求完美設計來得實際。

---

## 參考資料

- [Claude Code 官方文件 - Subagents](https://code.claude.com/docs/en/sub-agents)
- [Anthropic - Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)
