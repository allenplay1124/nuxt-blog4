---
title: 讓 AI Agent 自己管理 AI Agent：Herdr Skills 進階實戰
summary: 上一篇認識 Ghostty 與 Herdr 後，本篇進一步介紹 Herdr Skills。只要將一份 SKILL.md 安裝給編程 Agent，便能讓 Agent 在安全邊界內觀測、分割與協調 Herdr 窗格，打造真正可協作的終端工作流。
image: /images/articles/2026-09-04-herdr-skills/cover.png
pubDate: 2026-09-04 10:45
status: true
category: ai
tags:
    - AI
    - AI Agent
    - Herdr
    - 開發工具
    - 終端機
---

# 讓 AI Agent 自己管理 AI Agent：Herdr Skills 進階實戰

在上一篇〈[AI Agent 時代終端機新選擇：ghostty+herdr](/articles/2026-09-01-ai-agent-ghostty-herdr)〉中，我們介紹了 Herdr 如何在終端機裡管理多個 AI Agent：工作空間、分頁、窗格，以及一眼就能辨識的 Agent 狀態。

但當 Agent 的數量開始增加，真正的瓶頸往往不在「能不能同時開很多窗格」，而在於：

- 哪一個 Agent 正在執行？
- 哪一個 Agent 卡在授權或提問畫面？
- 測試跑完了嗎？
- 我能不能讓一個 Agent 幫我啟動另一個 Agent，或收集它的執行結果？

Herdr 的答案不是再加一層複雜的控制面板，而是把操作能力交給 Agent 本身。這就是 **Herdr Skills** 的用途。

一句話來說：Herdr Skills 是一份提供給 AI Agent 閱讀的操作手冊，讓它知道何時、如何安全地透過 `herdr` CLI 控制 Herdr。

---

## Herdr Skills 是什麼？

Herdr 提供一份可重複使用的 `SKILL.md` 檔案，內容不是應用程式，也不是背景服務，而是專門給 AI Agent 理解的 Markdown 指令。

安裝後，Agent 便能理解 Herdr 的結構與操作規範，例如：

- 查看目前的 workspace、tab、pane 與相鄰 Agent
- 分割窗格，並在背景執行指令
- 讀取其他窗格的近期輸出或日誌
- 等待測試、開發伺服器或其他 Agent 完成
- 在相鄰窗格中啟動協作 Agent
- 根據 `idle`、`working`、`blocked`、`done` 等狀態決定下一步

這讓 Herdr 從「人類管理多個終端」進一步變成「人類與 Agent 一起協調多個 Agent」的工作環境。

> Herdr Skills 的核心不是讓 Agent 任意操控終端，而是讓它在明確的上下文與安全邊界中協作。

---

## Skills 與 Agent Guide：用途並不相同

Herdr 官方同時提供兩種文件，名稱相近，但適用對象不同。

| 文件 | 給誰使用 | 用途 |
|---|---|---|
| `skills/herdr/SKILL.md` | 在 Herdr 窗格內執行的 AI Agent | 讓 Agent 操作 Herdr |
| `agent-guide.md` | 協助人類的 AI Agent | 用來解說、安裝與排除 Herdr 問題 |

這個差異很重要。

如果你的目標是讓 Codex、Claude Code 或其他編程 Agent 幫忙分割窗格、等待測試結果、啟動協作 Agent，應安裝的是 **Herdr Skill**。

如果你的目標是請 AI 教你如何安裝 Herdr、解釋設定或排除問題，則應參考 **Agent Guide**。

---

## 安裝 Herdr Skill

官方建議透過 `npx skills` 安裝：

```bash
npx skills add herdrdev/herdr --skill herdr -g
```

其中 `-g` 代表全域安裝，讓支援 Skills 的 Agent 在不同專案中都能使用。

如果只希望在目前專案使用，可以省略 `-g`：

```bash
npx skills add herdrdev/herdr --skill herdr
```

安裝完成後，Skill 會以 `herdr` 的名稱提供給 Agent 使用。

若你的 Agent 沒有原生 Skills 系統，也可以將官方 [`SKILL.md`](https://github.com/herdrdev/herdr/blob/v0.8.2/skills/herdr/SKILL.md) 的內容放進專案指令或 Agent 的自訂指令中。

---

## 安全關鍵：先確認自己真的在 Herdr 裡

Herdr Skill 的第一條規則非常值得理解：

```bash
test "${HERDR_ENV:-}" = 1
```

只有當 `HERDR_ENV=1` 存在時，Agent 才能使用 `herdr` CLI 操作目前的 Herdr session。

這個環境變數代表：目前的 Agent 正在 Herdr 管理的 pane 裡執行，並且可以安全地與本機 Herdr socket 通訊。

若變數不存在，Skill 要求 Agent 立即停止，並告知使用者自己不在 Herdr 管理的窗格中。

```text
HERDR_ENV=1
       │
       ├── 存在：可安全使用 herdr CLI
       │
       └── 不存在：停止操作，避免誤控其他終端會話
```

這道護欄看起來簡單，實際上非常重要。它避免外部 Agent 因為缺乏正確上下文，而意外控制不屬於自己的終端工作階段。

---

## Agent 如何理解 Herdr 的世界？

要讓 Agent 能夠協作，第一步不是直接分割畫面，而是先讀取目前環境。

```bash
herdr workspace list
herdr tab list --workspace "$HERDR_WORKSPACE_ID"
herdr pane current --current
herdr pane list --workspace "$HERDR_WORKSPACE_ID"
herdr agent list
```

Herdr 的階層可以簡化成：

```text
Workspace
└── Tab
    ├── Pane：執行 shell、測試或服務
    ├── Pane：執行主要 Agent
    └── Pane：執行協作 Agent
```

每一個 workspace、tab、pane 都有穩定的識別 ID。Agent 不應該猜測 ID，也不應該依照畫面順序操作，而是必須從 Herdr 的 JSON 回應中取得正確 ID。

這是自動化最容易被忽略、但最關鍵的原則：**畫面位置會改變，識別 ID 才是可靠的協作介面。**

---

## 實戰一：用 AI agent 控制 herdr

假設主 Agent 正在修改功能，但希望測試在旁邊獨立執行，不干擾目前工作。

它可以先建立一個相鄰分屏：

```bash
herdr pane split --current --direction right --cwd "$PWD" --no-focus
```

這個指令有三個重點：

- `--current`：明確指定以目前 pane 為目標
- `--cwd "$PWD"`：讓新 pane 保持目前專案目錄
- `--no-focus`：不搶走使用者正在看的畫面

接著，從指令回傳結果取得新 pane 的 ID，再執行測試：

```bash
herdr pane run <pane-id> "yarn build"
```

最後等待關鍵輸出：

```bash
herdr pane wait-output <pane-id> --match "Tests:" --timeout 120000
```

需要進一步查看結果時：

```bash
herdr pane read <pane-id> --source recent-unwrapped --lines 120
```

這樣主 Agent 不必把測試塞進自己的互動介面，也不需要讓人類頻繁切換分頁。測試成為一個可觀測、可等待、可讀取的獨立工作單元。

---

## 實戰二：讓多模態 Agent 傳遞圖片分析結果

有些任務的第一步是理解圖片，但後續工作不一定需要多模態能力。例如，先讓一個支援圖片輸入的 Pi Agent 分析介面截圖，再把結構化的文字結果交給另一個成本較低的 Pi Agent 實作功能。Herdr Skills 可以將這兩個階段拆到不同 pane，讓模型能力各自對應到最適合的工作。

先建立兩個相鄰 pane，分別啟動支援多模態的 `Qwen 3.8 MAX`，以及不支援多模態、負責後續工作的 `deepseek-v4-flash`：

```bash
herdr pane split --current --direction right --cwd "$PWD" --no-focus
herdr pane split --current --direction down --cwd "$PWD" --no-focus
```

從兩次指令的回傳結果取得 pane ID 後，啟動兩個 Pi Agent：

```bash
herdr agent start vision --kind pi --model "Qwen 3.8 MAX" --pane <vision-pane-id>
herdr agent start worker --kind pi --model "deepseek-v4-flash" --pane <worker-pane-id>
```

先將圖片與分析要求交給 `vision`。這個 Agent 的責任是辨識圖片內容，並輸出不依賴圖片本身也能理解的文字描述，例如畫面中的元件、文字、狀態與需要處理的問題：

```bash
herdr agent prompt vision "分析 ./screenshots/error.png，整理畫面內容、錯誤訊息、可疑元件與建議處理方向，請只輸出清楚的文字分析。" --wait --timeout 120000
```

接著讀取 `vision` 的輸出，再將分析文字連同原始任務傳給 `worker`。`worker` 不需要直接讀取圖片，只要根據文字上下文完成後續程式修改或其他任務：

```bash
analysis=$(herdr agent read vision --source recent-unwrapped --lines 120)
herdr agent prompt worker "以下是另一個 Agent 對圖片的分析結果：

$analysis

請根據這份分析完成後續任務，檢查現有程式碼，實作必要修改，並回報處理結果。" --wait --timeout 120000
```

這種做法的重點不是讓兩個 Agent 同時工作，而是建立清楚的能力接力：`Qwen 3.8 MAX` 負責將圖片轉換成可靠的文字上下文，`deepseek-v4-flash` 則專注在理解需求、操作程式碼與完成後續工作。每個 Agent 都有可追蹤的名稱，輸出也能被下一個階段明確接收。

![讓多模態 Agent 傳遞圖片分析結果](/images/articles/2026-09-04-herdr-skills/flow-chart-01.png)

---

## 實戰三：規劃、實作、審查的多 Agent 協作迴圈

單一 Agent 可以完成許多工作，但複雜需求通常同時需要架構判斷、程式實作與程式碼審查。把所有階段交給同一個 Agent，雖然方便，卻容易讓規劃與驗證失去獨立性。

這個範例使用 **三個 Herdr pane**。三個 pane 都執行 **Pi Agent**，但各自配置不同的 AI 模型，並承擔不同角色。第一個 pane 是整個流程的主控者，負責分派工作、收集結果與決定是否進入下一輪修正。

| Pane | 角色 | Agent 與模型 | 負責工作 |
|---|---|---|---|
| Pane 1 | 主控／規劃者 | Pi Agent + `GPT-5.6 Sol` | 釐清複雜需求、分析程式碼、產出實作方案，並協調整個流程 |
| Pane 2 | 實作者 | Pi Agent + `Qwen3.8 Flash` | 根據方案實作功能、修正問題與回報結果 |
| Pane 3 | 審查者 | Pi Agent + `Claude Fable 5.1` | 對照需求與實作結果，進行獨立 code review |

這樣規畫目的，將需要高度思考的工作和驗證工作交由旗艦模型，將實作工作交由較便宜模型實作，這樣可以確保程式碼品質，也可省下不少 Token 費用

我們可以透過以下提示詞先建立起我們的開發環境

```text
herdr
1. 在右方建立一個新的分屏
2. 執行 pi agent，並使用 opencode-go 提供的 qwen3.8-flash 模型
3. 在下方建立一個新的分屏
4. 執行 pi agent，並使用 opencode 提供的 claude-fable-5-1 模型
```

執行後會輸以下結果，並成開啟三個分屏，我可以記下代號，作為傳送互傳資訊的代碼

```markdown
佈局（wK:t1）：
      - wK:p1 左上（原始 pane，保持 focus）
      - wK:p5 右方 - 佔滿右半部 41x28
      - wK:p6 下方 - 左下 42x14
```

除了用分屏方式，也可以用分頁的方式進行，這可以由開發者需求自行決定。

```text
herdr
1. 建立新 tab, rename 為「實作」，啟用 pi agent，並使用 opencode-go 提供的 Qwen3.8 Flash 模型
2. 建立新 tab, rename 為「審查」，啟用 pi agent，並使用 opencode 提供的 Claude Fable 5.1 模型 
```

輸出如下：

```markdown
 當前 Tab 列表（wM）：
 - wM:t1 主控 (working)
 - wM:t4 實作 (idle, opencode-go/qwen3.8-flash)
 - wM:t5 審查 (idle, opencode/claude-fable-5-1)
```

### 第一步：由旗艦模型建立實作方案

先在 **Pane 1** 啟動 Pi Agent，並使用 `GPT-5.6 Sol` 模型處理需求分析、規劃與流程協調。這個 pane 是主控 pane；後續將規劃傳給 wK:p5、把審查結果送回 wK:p6 修正，以及在完成後確認任務結案，皆由它負責。

::info-block
建議：若規畫方案比較複雜，可以請 AI agent 將方案輸出成一分 `plan.md`，方便在不同 agent 資訊傳遞
::

範例提示詞：

```text
herdr
請規畫可執行方案，符合以下需求
1.你是一位專業的網頁前端工程師與 Three.js 3D 專家。請幫我寫一個完整的、可獨立運行的 HTML 檔案，內含最新版 Tailwind CSS（用於基本排版）與最新版 Three.js（透過 CDN 導入 three.min.js）。
2. 創建繁忙的城市街景
3. 固定場景：高樓大廈、摩天大樓，行道樹，馬路
4. 動態物件：行人，汽車，公車
5. 右邉選單可以選定飄落物，可項目：無，雪花，櫻花，可設定行人數、汽車數和公車數
6. 滑鼠左鍵可以移動，滑鼠滾輪可以zoom in 和 zoom out
7. 待我確認需求將規畫完交由「實作」分頁，進行實際程式碼開發
8. 將完確認後的規畫輸出至 `plan.md`
9. 「實作」完成後，將修改摘要和diff交給「審查」分頁，進行code review，code review 結果輸出到 `review.md`
10. 若 code review 的結果，請將結果回傳「主導」分頁

```


AI 會規畫完整輪出到 `plan.md`，對交由「實作」分頁

### 第二步：將方案交給 Flash 模型實作

接著在 **實作分頁** 啟動 Pi Agent，並使用 `Qwen3.8 Flash` 模型。由 **主控分頁** 將規劃方案完整傳入 **實作分頁**。

這個 Agent 的責任是完成實作，不是重新定義需求。因此交付時應一併提供原始需求與規劃結果，讓它在遇到細節不一致時能回到需求本身判斷。


### 第三步：由 旗艦模型 進行獨立 code review

再在 **審查分頁** 啟動 Pi Agent，並使用 `Claude Fable 5.1` 模型。**主控分頁** 將原始需求與 **實作分頁** 的實作結果一起送交 **審查分頁**。

由不同 Agent 審查，能降低實作者因熟悉自己的方案而忽略缺陷的機率。審查者應特別檢查：需求是否完整落實、錯誤處理與邊界條件、既有功能是否被破壞，以及程式碼是否符合專案慣例。

### 第四步：未通過就回到實作，通過才通知主控

如果 **審查分頁** 的 Pi Agent（`Claude Fable 5.1`）回報需要修正的問題，**主控分頁** 將審查意見連同原始需求傳回 **實作分頁**  的 Pi Agent（`Qwen3.8 Flash`）：

完成修正後，**主控分頁** 再把新的實作結果交回 **審查分頁** 進行下一輪 review。這個迴圈持續到審查通過，或由人類介入處理架構爭議與高風險決策。

當 **審查分頁** 的 review 通過後，**主控分頁** 會收到完成通知，並確認實作結果是否仍符合原本方案與需求。至此，才算完成一次完整的程式碼實作。

![多 AI Agent 協作流程圖](/images/articles/2026-09-04-herdr-skills/flow-chart-02.png)



---


## 總結

Herdr Skills 讓 AI Agent 不再只是終端中的執行者，也能成為理解工作環境的協作者。

安裝一份 `SKILL.md` 後，Agent 可以在 Herdr 的安全範圍內：

- 掌握 workspace、tab 與 pane 的實際狀態
- 背景執行測試、服務與其他命令
- 啟動並協調專職的協作 Agent
- 讀取輸出、等待結果，並辨識被阻擋的工作
- 保持人類對授權與關鍵決策的最終控制權

如果上一篇的 Ghostty + Herdr 是建立 AI Agent 工作台，那麼 Herdr Skills 就是讓工作台開始具備協作能力的關鍵拼圖。

---

## 相關資源

- [Herdr 智能體技能文件官方說明](https://herdr.dev/zh-cn/docs/agent-skill/)
- [Herdr Skill 原始檔](https://github.com/herdrdev/herdr/blob/v0.8.2/skills/herdr/SKILL.md)
- [Herdr 官方文件](https://herdr.dev/zh-cn/docs/)
- [Herdr GitHub](https://github.com/herdrdev/herdr)
