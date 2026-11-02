---
title: Orca 教學：用 ADE 同時駕馭多個 AI 編碼 Agent
summary: Orca 是一套開源的 Agent Development Environment（ADE），讓 Claude Code、Codex、OpenCode、Cursor CLI 等終端 Agent 各自跑在獨立的 git worktree 中，並在同一介面統一監控、審閱與合併。本文從安裝、第一個三 Agent 工作階段、worktree 管理、diff 審閱到 Orca CLI 與 orchestration，完整整理 Orca 的使用方式。
image: /images/articles/2026-11-01-orca-tutorial/cover.png
pubDate: 2026-11-01 10:00
status: true
category: ai
tags:
    - AI
    - AI Agent
    - Orca
    - 開發工具
    - 開源
---
# Orca 教學：用 ADE 同時駕馭多個 AI 編碼 Agent

當一個 Agent 不夠用時，真正的痛點不是模型不夠聰明，而是**沒有人統一指揮與對帳**。Orca（[stablyai/orca](https://github.com/stablyai/orca)，官網 [onorca.dev](https://www.onorca.dev/)）就是為了解決這一段而生：它是一套開源的 **ADE（Agent Development Environment，Agent 開發環境）**，讓多個終端 Agent 各自跑在獨立的 git worktree 裡，並在同一介面統一監控、審閱與合併。

它不賣模型、不吃 token，用的是你自己的訂閱。

> Orca 的定位是「指揮塔」而非 IDE：不寫程式、不生成程式碼，負責隔離、監控、審閱、合併多個 Agent 的產出。

---

## 什麼是 ADE？Orca 與既有工具的差異

Orca 刻意替自己取了一個新品類名字，跟三種既有工具劃清界線：


| 對照對象                   | 它是什麼                  | Orca 的差異                       |
| ---------------------- | --------------------- | ------------------------------ |
| IDE（VS Code、JetBrains） | 給「人」寫程式，一次盯一個檔案       | ADE 是給「人 + Agent 艦隊」的工作台       |
| Agent 框架（LangChain 等）  | 幫你「組出一個 Agent」的積木     | Orca 不管怎麼造 Agent，只管怎麼同時看住一群    |
| 終端 multiplexer（tmux）   | 把畫面切開，但不理解 Agent 在做什麼 | Orca 懂 Agent 狀態、會隔離改動、能審閱 diff |


> [!note] 名稱澄清
> 這裡指的是 AI 編碼工具 Orca。同名容易混淆的有：GNOME 桌面閱讀器 `orca`（Linux 上的 `/usr/bin/orca`）、Plotly 的 `orca` cask（Homebrew 裸名指的是這個），以及智源的 RoboBrain Orca 模型。安裝時務必用完整名稱 `stablyai/orca/orca`。

---

## 核心機制：Parallel Worktrees

git worktree 讓同一個 repo 檢出多個工作目錄，各自對應不同分支、共享 `.git` 物件庫。對多 Agent 場景意味著：

- Agent A 在 `feat/login-fix` 改認證邏輯
- Agent B 在 `feat/perf-ci` 優化流水線
- Agent C 用另一家 Agent 嘗試第二種實作

三者檔案變更物理隔離，不會互相覆蓋，也不用一直 `git stash`。官方典型用法是「Fan one prompt across five agents」——同一條 prompt 給五個 Agent，比對結果後合併勝出者，等於把「模型選型」從事前猜測變成事後 A/B 測試。

Orca 的 worktree 是**真實的 git worktree**，不是自訂沙盒：在終端裡 `git status`、`git rebase`、`git cherry-pick` 都照常運作，Orca 也能偵測你自己用 `git worktree add` 建的 worktree。

---

## 安裝 Orca

```bash
# macOS（Homebrew，必須用完整名稱）
brew install --cask stablyai/orca/orca
brew upgrade --cask stablyai/orca/orca

# Arch Linux (AUR)
yay -S stably-orca-bin
```

也可從 [onorca.dev/download](https://onorca.dev/download) 或 GitHub Releases 取得 macOS（Apple Silicon / Intel）、Windows、Linux AppImage 安裝檔。授權為 MIT。

安裝後可在 **Settings → General → Orca CLI** 註冊 `orca` 指令，並用以下方式驗證：

```bash
command -v orca
orca status --json
```

> [!tip] Linux 注意
> Linux 上裸名 `orca` 可能解析成 GNOME 螢幕閱讀器；在 Orca 管理的終端裡，Orca 會把自己放在 PATH 最前，但外部 shell 請確認 `command -v orca` 指向正確執行檔。

---

## 你的第一個三 Agent 工作階段

這是文件中最重要的一頁，五分鐘內就能讓三個 Agent 並行。

1. **加入 repo**：點側邊欄 **Add Repo**，指向本地 checkout。Orca 讀取 repo 的 git 狀態，把預設分支當作 **base ref**（之後所有新 worktree 都從這裡分支）。
2. **建立 worktree**：點 repo 名稱旁的 **+**，輸入任務名稱（例如 `fix-login-race`，留空會用海洋生物名稱自動命名）。建立對話框會開 **agent combobox**，挑選 Claude Code、Codex、Cursor CLI 或任一支援的 Agent；Orca 會以正確的工作目錄啟動該 CLI 並轉發你的訂閱憑證。
3. **重複兩次**，你就有了三個 worktree：
   - `fix-login-race` → Claude Code
   - `fix-login-race-2` → Codex
   - `fix-login-race-3` → Cursor CLI
4. **貼同一條 prompt** 給三個 Agent。三條分支、三個 diff、同一個 prompt，讓它們各自工作。
5. **拖曳 worktree 分頁**到 pane 右側或下方分割，就能同時觀察三個 Agent。
6. **選出勝者**：打開每個 worktree 的 diff view，用 Annotate AI Diff 留下 inline 註解送回 Agent 修改，最後 commit / push / 開 PR；另外兩個 worktree 一鍵刪除，分支也會跟著清掉。

建立 worktree 是背景執行的：送出對話框後立即關閉，`git fetch` 與 `git worktree add` 在背景繼續，新 worktree 會以進度列出現在側邊欄，你可以切到其他 worktree 繼續工作，完成後也不會把你拉走。

---

## Worktree 管理重點

- **Start-from picker**：建立時的 **Branch from** 可選 repo 的 base ref（最快路徑）、另一條本地分支（方便疊 PR）、特定 commit SHA、或遠端分支（Orca 會 fetch 並 checkout）。
- **共享依賴與 gitignored 檔案**：全新 worktree 是乾淨 checkout，Orca 用三種方式補足：
  1. **Worktree Shared Paths**（per repo，Settings → Repository）：路徑從主 checkout materialize 到每個新 worktree（macOS 優先 APFS clone-copy，否則 symlink）。
  2. **`worktree.sharedDirectories` in `orca.yaml`**：repo 內登记的 gitignored 目錄清單（symlink/share，非 copy），適合 `node_modules`、`.cache` 這類可重建的大樹。
  3. **`.worktreeinclude`**：列出要 **copy**（非 symlink）進每個 worktree 的 gitignored 檔案/目錄，例如 `.env`、`.vscode/settings.json`。
- **命名分支**：預設從 workspace 名稱或連結的 PR/Issue 衍生；展開 Advanced drawer 可手動輸入 **Branch name**；從 Linear issue 建立時會用 Linear 自己的 branch name。
- **父子 worktree**：Advanced drawer 可選同一 repo 的 active worktree 作 Parent workspace，只影響側邊欄巢狀分組，不改變 Git 歷史。

---

## 統一監控、Diff 審閱與交付

- **Annotate AI Diffs**：在 diff 任一行寫 Markdown 批註，批次送回 Agent 修改，可同時看 CI、解衝突、開 PR。
- **GitHub / Linear / Jira / GitLab 原生整合**：應用內瀏覽 PR、Issue、看板；從任務一鍵開 worktree，Review 與 Approve 不必跳出 Orca。
- **Design Mode**：每個 worktree 可掛獨立 Chromium 視窗，點選頁面任一 UI 元素，Orca 自動抓取該元素的 HTML、CSS 與裁剪截圖，直接注入 Agent prompt。做前端微調不必再用文字描述「左上角那個藍色按鈕」。
- **Commit &amp; push / 開 PR**：全部在 Orca 內完成。

---

## Orca CLI：把工作流腳本化

Orca 除了 GUI，還提供 `orca` CLI，能建立 worktree、驅動終端、操作內建瀏覽器，甚至讓 Agent 反過來驅動 Orca；`orca serve` 可跑在無介面的 Linux 伺服器上。

常用指令：

```bash
# 確認連上執行中的 Orca
orca status --json

# Worktree
orca worktree ps --json
orca worktree create --repo id:<repoId> --name my-task --issue 123 --json
orca worktree current --json
orca worktree rm --worktree id:<id> --force --json

# 終端
orca terminal list --json
orca terminal read --json
orca terminal send --text "continue" --enter --json
orca terminal wait --for tui-idle --timeout-ms 30000 --json

# 檔案與 diff
orca file open src/App.tsx
orca file diff src/App.tsx --staged

# 內建瀏覽器（snapshot → click → 再 snapshot）
orca goto --url https://example.com --json
orca snapshot --json          # 回傳 @e1、@e3 之類的 ref
orca click --element @e3 --json
orca fill --element @e1 --value "user@example.com" --json
```

需要追蹤完成狀態或 DAG 時，改用 orchestration 而不是單純 `terminal send`。

---

## Orchestration：結構化多 Agent 協作

Orca 的結構化多 Agent 層，由五個概念組成：


| 概念                | 作用                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **Run**           | 持久命名空間與 coordinator 收件匣，本身不派工                                                             |
| **Task**          | 工作項，含 spec、依賴與狀態（`pending` / `ready` / `dispatched` / `completed` / `failed` / `blocked`） |
| **Dispatch**      | 某個 task 在某個終端上的一次嘗試，是 `worker_done` 與 heartbeat 的權威來源                                     |
| **Message**       | 收件匣訊息：`status`、`dispatch`、`worker_done`、`escalation`、`question`、`heartbeat` 等             |
| **Decision gate** | 由 coordinator 持有、會阻塞 task 的待決問題                                                           |


偏好使用的監督式迴圈：

```bash
orca orchestration run-create --objective "Split checkout QA" --json
orca orchestration task-create --spec "Audit billing settings" --task-title "Billing audit" --json
orca orchestration worker-start --task <taskId> --worktree new-child --name billing-audit --agent codex --setup run --json
orca orchestration check --wait --types worker_done,escalation,question --timeout-ms 900000 --json
```

Worker 完成回報（從 worker pane，帶入注入的 ID）：

```bash
orca orchestration send \
  --type worker_done \
  --subject "Completed mobile audit" \
  --body "Fixed footer overlap; no follow-ups." \
  --task-id <taskId> \
  --dispatch-id <dispatchId> \
  --outcome succeeded \
  --files-modified "src/app/settings/Billing.tsx" \
  --json
```

Heartbeat 預設 5 分鐘，可在 **Settings → Agent Orchestration** 調整（1–60 分鐘）。

---

## 支援的 Agent

原則很簡單：**能在終端跑的就能進 Orca**。官方預置並文件化的包括 Claude Code、Codex、OpenCode、Cursor CLI、GitHub Copilot、Grok、Pi、oh-my-pi、Goose、Cline、Continue、Kimi、Qwen Code、Mistral Vibe、Rovo Dev、Devin、Amp、Antigravity、Hermes 等 25+ 種。

Orca 也支援 **Account Switcher &amp; Usage Tracking**：查看 Claude / Codex 用量與 rate-limit 重置時間，並熱切換帳號而不必重新登入。

---

## 終端體驗與 SSH Worktrees

- **終端體驗（Ghostty 級）**：WebGL 渲染、無限分屏、重啟後恢復 scrollback、全文搜尋。Agent 本質上是 TUI 程式，Orca 選擇把終端做深而不是只包一層 GUI。
- **SSH Worktrees**：在遠端高規機器上跑 Agent，本地保留檔案編輯、Git 與終端體驗，支援自動重連與端口轉發。適合筆電算力不足、或想長時間跑重任務。
- **手機端**：iOS / Android 伴侶 App 可查看進度、接收完成通知、回覆 Agent 提問、切換工作模式。

---

## 與其他做法的差異


| 維度       | Orca（ADE）        | VS Code + Agent 插件 | 終端多 Tab / tmux |
| -------- | ---------------- | ------------------ | -------------- |
| 並行 Agent | 原生支援，worktree 隔離 | 通常一次一個             | 要自己手動管理        |
| 統一監控     | 一個 dashboard 全看到 | 只看得到當前 Agent       | 分散在各視窗         |
| 手機端      | 可監控、可介入          | 沒有                 | 沒有             |
| Agent 來源 | 任何 CLI Agent     | 綁定特定插件             | 任何都行           |
| 成本       | 用你自己的訂閱          | 看插件而定              | 用你自己的          |


挑選多 Agent 工具時可對的五個問題：

1. **費用歸誰？** 吃自己的訂閱，還是要另買它的 API、再被抽 token？
2. **怎麼隔離？** 用 worktree、用分支，還是要自己開 tab 硬記？
3. **看得到全局嗎？** 有沒有一個地方同時看所有 Agent 的進度？
4. **離開電腦能不能管？** 有沒有手機端？
5. **它成熟了嗎？** 看開放 issue 數量與更新頻率。

---

## 適用與不適用

**適合**

- 日常同時跑 3 個以上 CLI Agent 的開發者
- 已訂閱 Claude Code + Codex（或 OpenCode），想交叉比對產出
- 重度使用 GitHub / Linear、需要 worktree 隔離的 Git 工作流
- 想要開源、可自架（headless）且跨三平臺

**不適合**

- 只偶爾用 AI 補全、單一會話問答 → 現有 IDE 插件就夠
- 只做單一 Agent、單分支開發 → worktree 編排只是額外複雜度
- 團隊已深度綁定某家閉源 IDE 且不願切換

---

## 風險與限制

- **還很新、穩定性仍在收斂**：2026-07 時開放 issue 約 750 個、PR 約 1,000 個；踩到未修坑的機率比成熟工具高，關鍵流程前先拿自己的專案跑一輪。
- **Electron 吃記憶體**：同時掛多個 Agent 時，RAM 很可能變成瓶頸。
- **它是協調層，不是 Agent 本身**：不會讓程式寫得更好，只解決「同時管很多 Agent」的痛。
- **並行成本不會消失**：多個 Agent 並行 = 多份訂閱消耗 + 多份本地／遠端資源佔用；Orca 降低的是管理複雜度，不是 token 帳單。
- **ADE 品類未定**：這個名字目前基本是 Orca 自己在推；把它當「好用的多 Agent 指揮工具」比當「下一個標準」務實。
- **遙測**：README 提及匿名使用資料收集，提供 opt-out，企業部署前應先讀隱私說明。

> [!tip] 需要人為拆任務
> Orca 不會自動幫你拆解工作。並行要跑得順，仍得自己定義「完成標準」、劃分任務邊界，並指定誰負責最終合併——否則只是同時製造更多 diff。

---

## 總結

Orca 把「多 Agent 並行」從手動切 tab、自己記分支，變成有 worktree 隔離、統一監控、diff 審閱與手機端介入的完整工作流。如果你日常同時跑 3 個以上 CLI Agent，且已經訂閱 Claude Code / Codex / OpenCode，Orca 值得一試；如果你只用單一 Agent，現有的 IDE 插件或終端多 tab 反而更輕。

---

## 相關資源

- [Orca 官網](https://www.onorca.dev/)
- [Orca Docs](https://www.onorca.dev/docs)
- [Worktrees 文件](https://www.onorca.dev/docs/model/worktrees)
- [Orca CLI Overview](https://www.onorca.dev/docs/cli/overview)
- [Orchestration 文件](https://www.onorca.dev/docs/cli/orchestration)
- [GitHub：stablyai/orca](https://github.com/stablyai/orca)
- [下載頁](https://www.onorca.dev/download)