---
title: AI Agent 時代終端機新選擇：ghostty+herdr
summary: 在 AI Agent 時代，終端機不僅是開發工具，更是 AI 代理的操盤中心。Ghostty 以 GPU 加速與原生 UI 重新定義終端體驗，Herdr 則為終端帶來 AI 代理多工管理能力。本文將帶你了解這組強大組合如何打造新一代 AI 開發環境。
image: /images/articles/2026-09-01-ai-agent-ghostty-herdr/cover.png
pubDate: 2026-09-01 12:00:00
status: true
category: ai
tags:
    - AI
    - 開發工具
    - 開源
    - software
---

# AI Agent 時代終端機新選擇：ghostty+herdr

在這個大 AI 時代，使用 AI Agent 進行 `Vibe Coding` 已成為工作日常， 而目前各家大廠或開源專案都有提供 `CLI` 工作環境，所以終端機效能變得更重要，這也是我選擇 **ghostty** 的原因，它原生開發且支持 GPU 渲染，在終端機進行複雜渲染時，不必擔心畫面延遲。

而 **Herdr** 更是管理各個 AI Agent CLI 目前最佳解決方案，獨特的 UI 介面可以方便管理工作區、分頁和 Agents，更可以對各 Agents 執行狀態一目了然，更可以透過 `skills` 讓不同 agent 相互協作。

## 為什麼終端機需要重新思考？

傳統的終端機模擬器在 AI Agent 時代面臨了新的挑戰：

- **多代理並行**：一個專案可能同時運行 Claude Code、Codex、OpenCode 等多個代理，傳統終端難以統合管理
- **效能瓶頸**：AI 代理產出大量輸出，CPU 渲染的終端機容易出現卡頓
- **狀態可見性**：哪個代理正在執行？哪個被阻擋？哪個已完成？傳統終端缺乏即時狀態呈現
- **會話持久性**：關閉筆記型電腦後，代理進程隨之消失，無法斷續工作

Ghostty 和 Herdr 分別針對這些痛點提供了解決方案。

---

## Ghostty：GPU 加速的下一代終端機

### 什麼是 Ghostty？

Ghostty 是由 HashiCorp 創辦人 Mitchell Hashimoto 開發的跨平台終端模擬器，使用 Zig 語言構建，並以 GPU 加速渲染為核心特色。2024 年底正式發布 1.0 穩定版（至 2026 年已推進至 1.3+）後，迅速成為開發者社群中最受矚目的終端選擇。

### 核心特色

- **GPU 加速渲染**：透過 OpenGL（Linux）與 Metal（macOS）實現硬體加速，維持約 60fps 的流暢渲染，遠勝 CPU 渲染的傳統終端
- **原生 UI 體驗**：在 macOS 上呈現原生應用外觀，在 Linux 上完美融入 GTK/Qt 環境
- **多視窗、分頁、分割畫面**：內建完整的視窗管理功能，無需依賴 tmux
- **即時熱重載配置**：修改 `~/.config/ghostty/config.ghostty`（1.2.3 前為 `config`，仍相容）後按 `cmd+shift+,`（macOS）/ `ctrl+shift+,`（Linux）即可熱重載，無需重啟
- **連字字體與 Nerd Fonts**：原生支援開發者最愛的程式字體
- **智慧搜尋**：1.3.0 版本新增 scrollback search 與原生捲動條

### 安裝 Ghostty

#### macOS

```bash
brew install --cask ghostty
```

#### Linux

Ghostty 官方僅直接發布 macOS 二進制檔，Linux 請透過發行版套件或社群建置安裝：

```bash
# Arch Linux
pacman -S ghostty

# Ubuntu 26.04+
sudo apt install ghostty

# Debian / 舊版 Ubuntu（社群 .deb）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/mkasberg/ghostty-ubuntu/HEAD/install.sh)"
```

其他發行版請參考 [Ghostty 安裝文件](https://ghostty.org/docs/install/binary)或從 [Ghostty GitHub](https://github.com/ghostty-org/ghostty) 自行編譯。

### 基本配置

Ghostty 的配置文件位於 `~/.config/ghostty/config.ghostty`（相容舊路徑 `~/.config/ghostty/config`)
```ini
# ~/.config/ghostty/config.ghostty

font-family = JetBrains Mono
font-size = 24
font-feature = calt

# 佈景樣式
theme = dark:Catppuccin Mocha,light:Espresso Libre
background-opacity = 0.80
background-blur-radius = 30
window-padding-x = 8
window-padding-y = 8

confirm-close-surface = false
```

---

## Herdr：終端原生 AI 代理多工器

### 什麼是 Herdr？

Herdr 是一個用 Rust 編寫、基於 Ratatui TUI 庫建構的終端原生 AI 代理多工器。與 tmux 類似，它提供會話持久化與分割畫面管理，但額外增加了 **AI 代理狀態感知**——能自動偵測每個分割畫面中運行的 AI 代理，並在側邊欄顯示其狀態。

Herdr 的口號是「one terminal for the whole herd」——一個終端機統管所有 AI 代理。

### 核心特色

- **代理狀態自動追蹤**：側邊欄即時顯示每個代理的狀態——🔴 blocked、🟡 working、🔵 done、🟢 idle，無需手動配置
- **真實 PTY 分割畫面**：每個代理運行在獨立的真實終端分割畫面中，完整支援全螢幕 TUI 介面（如 Claude Code、Codex 的互動模式）
- **會話持久化**：斷開連線後代理繼續運行，重新連線即可恢復，關閉筆電也不會丟失進程
- **Socket API 自動化**：提供 Unix Socket JSON API（詳見 `herdr --help` 與 Socket API 文件，以當前版本為準），代理本身也可以操控 Herdr
- **多代理整合**：支援 Claude Code、Codex、Pi、OpenCode、Cursor 等 15+ 種 AI 編程代理

### 安裝 Herdr

```bash
curl -fsSL https://herdr.dev/install.sh | sh
```

或使用 Homebrew：

```bash
brew install herdr
```

### 快速開始

```bash
# 啟動 Herdr
herdr

# 建立工作空間（以專案為單位）
herdr workspace create --label my-project
```

### 工作空間與分割畫面架構

Herdr 的架構：

![Herdr UI](/images/articles/2026-09-01-ai-agent-ghostty-herdr/herdr-ui.png)

| 層級 | 說明 |
|------|------|
| **Workspace** | 以 Git 儲存庫或 worktree 為單位，對應一個專案 |
| **Tab** | 每個工作空間可包含多個標籤頁 |
| **Pane** | 每個標籤頁可分割為多個真實 PTY 分割畫面，每個運行一個代理 |
| **Agent**| 自動化與觀測層，能識別並追蹤代理人的執行狀態 |




---

## ghostty + herdr：終極 AI Agent 開發組合

### 為什麼這組合特別？

Ghostty 與 Herdr 的結合，形成了一套完整的 AI Agent 開發環境：

> Herdr 為通用終端多工器，可運行於 iTerm2、Kitty、WezTerm 等任意終端；與 Ghostty 搭配時能額外發揮 GPU 加速與原生 UI 的最佳體驗，兩者並非強綁定。

```
┌─────────────────────────────────────────────┐
│                  Ghostty                     │
│  ┌──────────────────────────────────────┐   │
│  │            Herdr TUI                 │   │
│  │  ┌──────────┐ ┌──────────┐ ┌─────┐ │   │
│  │  │ Claude   │ │  Codex   │ │Open │ │   │
│  │  │ 🟢 idle  │ │ 🟡 working│ │Code │ │   │
│  │  └──────────┘ └──────────┘ └─────┘ │   │
│  │  ┌──────────┐ ┌──────────┐ ┌─────┐ │   │
│  │  │   Pi     │ │   Cursor │ │     │ │   │
│  │  │ 🔴 blocked│ │ 🟢 idle  │ │     │ │   │
│  │  └──────────┘ └──────────┘ └─────┘ │   │
│  └──────────────────────────────────────┘   │
│  GPU 加速 · 原生 UI · 分割畫面 · 熱重載      │
└─────────────────────────────────────────────┘
```

### 實際工作流程

#### 1. 啟動環境

```bash
# 啟動 Ghostty
ghostty

# 在 Ghostty 中啟動 Herdr
herdr
```

#### 2. 規劃工作空間

```bash
# 為每個專案建立工作空間
herdr workspace create --label backend-api
herdr workspace create --label frontend-app
```

#### 3. PANE 分配代理

每個分割畫面運行一個專門的 AI 代理：

| 分割畫面 | 代理 | 任務 |
|----------|------|------|
| 左上 | Claude Code | 後端 API 開發 |
| 右上 | OpenCode | 前端組件開發 |
| 下方 | Codex | 測試與除錯 |

#### 4. AGENTS 監控與調度

透過 Herdr 側邊欄一目了然：

- 🟢 **idle**：等待指令
- 🟡 **working**：正在執行任務
- 🔴 **blocked**：需要人工介入
- 🔵 **done**：任務完成

當某個代理被阻擋時，直接點擊對應分割畫面即可介入處理。




---

## 總結

在 AI Agent 時代，終端機不再只是執行指令的工具，而是 AI 代理協作的操盤中心。**Ghostty** 以 GPU 加速與原生 UI 提供了流暢的終端體驗，**Herdr** 則為終端帶來了專業級的 AI 代理多工管理能力。

這組合的核心優勢在於：

1. **真正的終端原生**：不依賴 GUI 或雲端服務，純粹在終端機中完成一切
2. **代理狀態可見性**：側邊欄即時顯示所有代理的狀態，無需切換画面
3. **會話持久化**：斷線重連，長時間任務不再擔心
4. **高度可程式化**：Socket API 讓代理之間可以互相操控，實現真正的 AgentOps

如果你正在尋找一個強大的 AI Agent 開發環境，Ghostty + Herdr 的組合值得立即嘗試。兩者皆為開源專案，安裝簡單，卻能帶來生產力的巨大提升。

---

## 相關資源

- [Ghostty 官方網站](https://ghostty.org)
- [Ghostty GitHub](https://github.com/ghostty-org/ghostty)
- [Herdr 官方網站](https://herdr.dev)
- [Herdr GitHub](https://github.com/herdrdev/herdr)
- [Herdr 文件](https://herdr.dev/docs/)
