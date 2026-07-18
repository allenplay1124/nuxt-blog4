---
title: 告別 AI 幻覺！用 Context7 MCP 讓 Opencode 即時讀取最新官方文件
summary: Context7 這款 MCP 應用，它能讓 Opencode 在編碼時即時讀取最新版本的官方文件，而非僅依賴過時的訓練記憶，從而大幅減少 AI 幻覺並提升回答的準確性。
image: /images/articles/2026-05-15-opencode-context7-mcp/cover.png
pubDate: 2026-05-15 14:44:00
status: true
category: ai
tags:
    - AI
    - opencode
    - 開源
    - 開發工具
---

## 何為  MCP

全名為 Model Context Protocol（模型上下文協定），它是一種讓 AI 可以「連接外部工具、資料、服務」的標準協定。由 [Anthropic](https://www.anthropic.com?utm_source=chatgpt.com) 在 2024 年提出。

簡單的說讓AI模型與外部工具互通的協定， 摡念就像是不同設備間，可以用 USB 這個通訊協定來互傳資料

## MCP 可以做什麼？
它能讓AI模型做以下事情，甚致更多，只要應用服務商提供 MCP 接口，就可以讓 AI 模型操作各種服務

- 讀檔案
- 查資料庫
- 操作 GitHub
- 控制 Docker
- 查官方文件
- 執行 Shell
- 發 Slack
- 查 Notion
- 存取 PostgreSQL
- 操作 Browser

## 何謂 Context7

Context7 是 MCP 中很出名的應用服務，它可以讓 AI 模型在 coding 時，可以即時讀取**最新版本的官方文件**，讓 AI 模型在進行回答或 Vibe Coding 時，可以即時查詢官方文件，來回答問題，而非僅靠訓練記憶，更可大幅減少 AI 幻覺。


如可在opencode 中設定 Context7 MCP

1. 在 [Context 7 官網](https://context7.com/) 註冊帳號
2. 在命令列執行以下指令：

```bash
npx ctx7 setup --opencode
```
此指令將會幫你取得 Context7 API key，建議先入 [Context 7 官網](https://context7.com/)

安裝成功會出現以下訊息：

```bash
✔ Context7 setup complete

  OpenCode
    + MCP server configured with API Key
      /Users/user/.config/opencode/opencode.json
    + Rule installed
      /Users/user/.config/opencode/AGENTS.md
    + Skill installed
      /Users/user/.agents/skills/context7-mcp/SKILL.md
```

## 驗證安裝

在 `opencode` 命令列中，輪入 `/mcps` 在列表中看見 `context7 connected` 資訊表示安裝成功

![Opencode MCP List](/images/articles/2026-05-15-opencode-context7-mcp/opencode-mcp.png)

## 結論 

MCP 協定的出現讓 AI 從單純的「知識庫」轉變為能操作工具的「代理人」。而 Context7 則解決了 AI 最令人頭痛的「過時資訊」問題。將其設定在 Opencode 中後，AI 能夠在即時對接官方文件的基礎上進行編碼，讓開發體驗更加流暢且可靠。
