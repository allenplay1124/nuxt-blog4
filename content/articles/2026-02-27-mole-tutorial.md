---
title: Mole 使用教學：macOS 深度清理與優化神器
summary: Mole 是一個開源的全能 macOS 優化工具，結合了 CleanMyMac、AppCleaner、DaisyDisk 和 iStat Menus 的核心功能。本文將帶你一步步掌握 Mole 的各項強大功能，讓你的 Mac 恢復往日的流暢與潔淨。
image: /images/articles/2026-02-27-mole-tutorial/cover.png
pubDate: 2026-02-27 14:15:00
status: true
category: software
tags:
    - MacOS
    - 系統優化
    - 開源
---

## 什麼是 Mole？

[Mole](https://github.com/tw93/Mole) 是一個為 macOS 設計的開源全能工具箱。它的目標是取代多個付費或分散的工具，將 **CleanMyMac**（清理）、**AppCleaner**（解除安裝）、**DaisyDisk**（磁碟分析）以及 **iStat Menus**（實時監控）的核心功能整合進一個單一的二進位檔案中。

Mole 採用終端機介面（TUI），操作流暢且反應迅速，非常適合喜愛簡潔、高效工作的開發者與進階使用者。

**專案網址**：[tw93/Mole](https://github.com/tw93/Mole)

---

## 安裝 Mole

安裝 Mole 極其簡單，你可以選擇透過 Homebrew（推薦）或是官方腳本。

### 使用 Homebrew

```bash
brew install mole
```

### 使用官方腳本

如果你沒有安裝 Homebrew，也可以直接執行安裝腳本：

```bash
curl -fsSL https://raw.githubusercontent.com/tw93/mole/main/install.sh | bash
```

安裝完成後，在終端機輸入 `mo` 即可啟動互動式選單，或直接加上子命令執行特定功能。

---

## 核心功能詳解

### 1. 深度系統清理 (`mo clean`)

這是 Mole 最常用的功能。它會掃描系統中的各種快取、日誌與垃圾檔案，並提供視覺化的清理建議。

- **掃描範疇**：應用程式快取、瀏覽器快取（Chrome, Safari, Firefox）、開發者工具（Xcode, Node.js）、系統日誌、垃圾桶等。
- **預覽模式**：建議先執行 `mo clean --dry-run` 來查看預計清理的內容與風險等級。

```bash
# 執行深度清理
mo clean

# 僅查看預覽，不實際刪除
mo clean --dry-run
```

### 2. 智慧解除安裝 (`mo uninstall`)

普通的刪除應用程式往往會留下許多「殘骸」。`mo uninstall` 會搜尋並清理所有相關的偏好設定、支援檔案、Launch Agents 以及隱藏的殘留物。

```bash
mo uninstall
```
執行後會彈出清單，讓你選擇想要徹底移除的應用程式。

### 3. 系統優化 (`mo optimize`)

當你感覺電腦變慢或網路異常時，`mo optimize` 可以幫助你快速重整系統狀態。

- **功能包括**：重建系統資料庫、重置網路服務、重啟 Finder 與 Dock、清理診斷紀錄、重建 Spotlight 索引等。

```bash
mo optimize
```

### 4. 磁碟空間分析 (`mo analyze`)

類似於 DaisyDisk，這個功能會以視覺化條狀圖顯示各個目錄的空間佔用情況，並讓你輕鬆找出隱藏的大檔案。

- **導覽方式**：支援方向鍵與 Vim 鍵位（h/j/k/l）。
- **外部磁碟**：預設跳過外部磁碟以加快速度，若要分析外接硬碟可指定路徑：`mo analyze /Volumes`。

```bash
mo analyze
```

### 5. 實時系統狀態 (`mo status`)

這是一個精美的實時儀表板，提供 CPU、GPU、記憶體、磁碟 I/O、網路流量以及硬體健康度（如電池循環、溫度、風扇轉速）的完整資訊。

- **Health Score**：根據系統壓力自動計算的健康分數。
- **小彩蛋**：在狀態頁面按下 `k` 可以召喚「太空貓」陪你工作。

```bash
mo status
```

### 6. 專案快取清理 (`mo purge`)

對於開發者來說，硬碟空間常被無數專案的 `node_modules`、`target`、`build` 等資料夾吞噬。`mo purge` 能自動找出並清理這些舊專案的構建產物。

```bash
mo purge
```

---


## 使用技巧與安全性

- **安全第一**：Mole 刪除的檔案通常是永久性的。請務必仔細檢查清理清單，特別是在執行 `mo clean` 或 `mo purge` 時。
- **白名單功能**：如果你希望保護特定的快取不被清理，可以使用 `mo clean --whitelist` 進行設定。
- **日誌追蹤**：所有的檔案操作都會記錄在 `~/.config/mole/operations.log`，方便事後追蹤。

---

## 總結

Mole 不僅是一個清理工具，更是一個讓 Mac 保持最佳狀態的隨身護理師。它開源、輕量且極致快速的原生體驗，使其成為 macOS 平台上非常具有競爭力的開源方案。如果你還在為磁碟空間不足或系統卡頓煩惱，不妨現在就安裝 Mole 體驗一下！

---

