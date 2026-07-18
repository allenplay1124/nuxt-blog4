---
title: nohup 指令：讓程式在登出後繼續執行的秘訣
summary: 在Linux環境下進行長時間運行的任務時，我們常常希望即使用戶登出終端機或連線中斷，任務也能繼續執行。nohup指令正是為此而生！本文將介紹如何使用nohup來執行背景任務，並重定向其輸出，確保您的程序在離線後仍能順利運行。
image: /images/articles/2025-02-05-linux-nohup/cover.png
pubDate: 2025-02-05 14:30:00
status: true
category: dev_ops
tags: 
    - dev_ops
    - Linux
---

## 什麼是 `nohup`？

`nohup` 是Linux系統中的一個命令，用於讓指定的程式在用戶登出或終端機連接斷開後繼續執行。它會忽略SIGHUP（掛起）信號，使程序能夠在背景下不受干擾地運行。

## 基本語法

```bash
nohup [指令] &
```

- `[指令]`：您希望在背景執行的命令。
- `&`：表示將命令放在後台執行

## 使用範例

假設我們有一個簡單的Python腳本 `my_script.py`，它會運行一個耗時的計算任務。我們可以使用 `nohup` 命令來確保該任務即使在登出後仍能繼續執行：

```bash
nohup python my_script.py >> output.log 2>&1 &
```
- `>>` output.log：將標準輸出重定向到output.log文件。
- `2>&1`：將錯誤輸出也重定向到stdout，這樣即使發生錯誤也能被記錄在output.log中。

## 過濾 nohup: ignoring input 訊息

當你使用 `nohup` 執行命令時，它會輸出 nohup: ignoring input，這是因為 nohup 預設會忽略標準輸入 (stdin)，以確保命令不會因等待輸入而中斷。這條訊息通常會寫入 nohup.out 或你指定的 log 檔案。如果你不想讓這行訊息出現在 log 檔案中，可以使用以下方法：

```bash
nohup python my_script.py >> output.log 2>&1 < /dev/null &
```

- `>>` 將標準輸出導向 output.log
- `2>&1` 將錯誤輸出也重定向到stdout，這樣即使發生錯誤也能被記錄在output.log中。
- `< /dev/null` 讓標準輸入 (stdin) 來自空設備，避免 nohup 顯示 ignoring input


## 結論

掌握nohup指令對Linux使用者來說是非常有用的，特別是在需要長時間運行的任務中。利用這個簡單但強大的工具，您可以讓程序在后台無受干擾地執行，從而提高工作效率。

透過本文介紹的範例和技巧，相信您已經能夠自如地使用 `nohup` 指令來管理您的Linux系統上的背景任務了！
