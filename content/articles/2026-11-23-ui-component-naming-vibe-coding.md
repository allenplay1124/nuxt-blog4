---
title: 別再描述「那個框框」：UI 元件命名術，讓 AI 精準產出介面
summary: Vibe Coding 時，一句「幫我做一個彈出視窗」往往讓 AI 猜錯元件。本文整理最常用的 UI 元件名稱與分類，並示範如何用精準詞彙下 prompt，讓 AI 直接產出你心裡想的介面，減少來回修改。
image: /images/articles/2026-11-23-ui-component-naming-vibe-coding/cover.png
pubDate: 2026-11-23 10:00
status: true
category: frontend
tags:
    - AI
    - Vibe Coding
    - UI 元件
    - 前端開發
    - Prompt
---

# 別再描述「那個框框」：UI 元件命名術，讓 AI 精準產出介面

Vibe Coding 的日常：你對 AI 說「幫我做一個跳出的小視窗，上面有確認和取消」，AI 給你一個全螢幕遮罩；你說「做一個可以收合的列表」，AI 做出一個 Accordion；你說「做一個小標籤」，AI 交出 Badge，你其實想要 Tag。

問題不在 AI 不聰明，而在於 **你描述的是外觀，AI 猜的是元件**。兩者的詞彙系統不同，溝通自然失準。

> 在 AI 時代，UI 元件名稱就是一種「介面契約」。你叫得出名字，AI 就知道要產出什麼；叫不出名字，就只能靠 AI 猜。

---

## 為什麼「叫得出名字」這麼重要

AI 模型在訓練時大量接觸了 Material Design、Ant Design、shadcn/ui、Radix 等設計系統的文件與程式碼。這些文件用的都是標準元件名稱：Modal、Drawer、Popover、Toast、Skeleton……

當你 prompt 裡出現這些名稱，模型會直接對應到它在訓練資料中看過的實作模式，包含：

- 正確的 HTML 結構（`role="dialog"`、`aria-labelledby` 等 a11y 屬性）
- 合理的預設樣式與動畫
- 常見的互動行為（點擊遮罩關閉、ESC 鍵關閉、focus trap）

反過來，如果你只說「一個彈出來的框」，模型必須自己決定要用 Modal 還是 Popover 還是 Drawer——每次決定都可能不同，結果就是介面風格不一致、行為缺漏。

一句話：**元件名稱 = 把需求從「描述外觀」升級為「指定契約」。**

---

## 介面拆解：五大類元件速查表

介面可以拆成五類。先把這張表存起來，Vibe Coding 時直接引用。

### 1. 版面與結構（Layout & Structure）

控制整體頁面結構與排版的基礎元件。

| 名稱 | 說明 |
|---|---|
| Layout / Container | 控制整體頁面結構與最大寬度，限制內容不超出可讀範圍 |
| Grid / Flex | 多欄式排版與對齊系統，負責響應式斷點下的欄位分布 |
| Card | 將相關資訊、圖片與操作包成獨立區塊，常作為內容的最小單位 |
| Divider | 區隔內容或列表區塊，強化視覺層級 |
| Drawer | 從側邊滑出的面板，常用於選單或附加設定，不中斷主畫面 |

### 2. 導覽（Navigation）

協助使用者在網站或應用中移動、定位與切換內容。

| 名稱 | 說明 |
|---|---|
| Navbar / Header | 網站主導覽與品牌標誌區，通常固定於頂部 |
| Sidebar / Menu | 多層級功能或頁面切換選單，適合功能密集的應用 |
| Tabs | 在同一區域切換不同類別的內容，避免頁面跳轉 |
| Breadcrumb | 顯示目前所在的階層路徑，幫助使用者回溯 |
| Pagination | 將大量資料分成多頁切換瀏覽 |
| Stepper | 顯示多步驟流程的進度與目前步驟，常見於註冊、結帳流程 |

### 3. 表單與輸入（Data Entry / Form）

蒐集使用者輸入與觸發動作的元件。

| 名稱 | 說明 |
|---|---|
| Button | 觸發動作或送出表單，需區分主要 / 次要 / 危險等視覺層級 |
| Input / TextField | 輸入單行或多行文字、數字或密碼 |
| Select / Dropdown | 從多個選項中單選或多選 |
| Checkbox / Radio | 勾選多項或擇一勾選 |
| Switch / Toggle | 切換開啟 / 關閉或真 / 假狀態 |
| DatePicker / TimePicker | 選擇日期、區間或時間 |
| Slider | 在數值範圍內拖曳取值 |
| Upload | 選擇或拖曳檔案上傳 |
| Form | 整合欄位驗證、送出與重設邏輯的容器 |

### 4. 資料展示（Data Display）

呈現資料與內容的元件。

| 名稱 | 說明 |
|---|---|
| Table | 呈現結構化二維資料，常搭配排序與篩選 |
| List | 垂直排列同質性項目 |
| Avatar | 顯示使用者或實體圖片、縮寫或預設圖示 |
| Badge / Tag / Chip | Badge 常用於數字或狀態角標；Tag 標示分類；Chip 常用於篩選條件或可互動標籤 |
| Collapse / Accordion | 點擊展開或收合內容區塊 |
| Carousel | 橫向切換圖片、橫幅或卡片內容 |
| Timeline | 依時間順序呈現事件歷程 |
| Empty | 無資料時顯示的提示畫面 |

### 5. 回饋與彈窗（Feedback & Overlay）

提供操作結果回饋與覆蓋層互動的元件。

| 名稱 | 說明 |
|---|---|
| Modal / Dialog | 覆蓋在畫面上方，要求使用者確認或處理重要資訊 |
| Popover / Tooltip | Hover 或點擊時在元件旁顯示補充說明或小工具 |
| Alert | 在頁面中顯示狀態訊息或操作提醒 |
| Toast / Snackbar | 短暫出現在角落或底部，不中斷目前操作 |
| Progress / Spinner / Skeleton | 表示資料載入或處理進度 |

---

## 同一個需求，兩種 prompt 的差別

來看實際案例。假設你要做一個「刪除確認」流程。

**模糊版（AI 猜）：**

> 幫我做一個刪除商品的確認視窗，有取消和刪除按鈕，點背景可以關掉。

AI 可能給你全螢幕 Modal、也可能給你 Popover，按鈕顏色、遮罩透明度、關閉行為每次都不一樣。

**精準版（AI 知道）：**

> 用 shadcn/ui 的 AlertDialog 做刪除商品確認：標題「確定刪除？」、描述「此操作無法復原」、取消按鈕（outline）與刪除按鈕（destructive），點遮罩不關閉，ESC 可關閉。

第二種 prompt 直接把元件、變體、行為都鎖定，AI 幾乎一次到位。

再看另一個常見誤區：

| 你說的 | AI 可能產出 | 你其實想要 |
|---|---|---|
| 「小標籤」 | Badge（數字角標） | Tag（分類標籤） |
| 「滑出選單」 | Dropdown（下拉） | Drawer（側邊抽屜） |
| 「提示訊息」 | Alert（頁內） | Toast（浮動通知） |
| 「載入中」 | Spinner | Skeleton（骨架屏） |
| 「小說明」 | Tooltip（hover） | Popover（點擊） |

這些差異在設計系統裡有明確分類，但在日常口語裡全部被「那個東西」取代。Vibe Coding 時，把詞彙對齊，溝通成本立刻下降。

---

## 三個立刻可用的 Vibe Coding 技巧

1. **先問 AI「這個東西叫什麼」**  
   不知道名稱時，先描述功能讓 AI 命名：「有一個從側邊滑出、不中斷主畫面的面板，通常放設定，這叫什麼？」AI 會回答 Drawer。拿到名字後，下一個 prompt 直接用。

2. **指定設計系統**  
   「用 shadcn/ui 的 …」「用 Ant Design 的 …」比「做一個漂亮的 …」有效十倍。設計系統名稱本身就是一組元件詞彙的集合，AI 知道每個名稱對應的實作。

3. **把元件名稱寫進檔案結構**  
   元件檔名用 `ModalConfirmDelete.tsx`、`DrawerSettings.tsx`，而不是 `Popup.tsx`、`SlidePanel.tsx`。AI 讀到檔名就知道職責，後續修改也更精準。

---

## 小結

Vibe Coding 的瓶頸很少是「AI 不會寫程式」，而是「人與 AI 說的不是同一種語言」。UI 元件名稱就是那本共同字典：Modal 不是 Popover，Tag 不是 Badge，Skeleton 不是 Spinner。

把這張表收進你的 prompt 工具箱，下次 Vibe Coding 時先叫出元件的名字——你會發現，AI 給你的第一版，已經接近你心裡的最終版。

---

## 相關資源

- [component.gallery：60 種 UI 元件字典與各設計系統實作](http://component.gallery)
- [Material Design Components](https://m3.material.io/components)
- [Ant Design 元件總覽](https://ant.design/components/overview)
- [shadcn/ui 元件](https://ui.shadcn.com/docs/components)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
