---
title: 如何取得 Telegram Bot 所有的 Chat ID
summary: 在開發 Telegram Bot 時,有時候我們需要獲取所有與 Bot 互動過的 Chat ID,無論是私人對話還是群組對話。取得這些 Chat ID 對於發送廣播消息或管理會話非常有用。本文將詳細介紹如何透過 Telegram Bot API 獲取所有的 Chat ID。
image: /images/articles/2024-05-01-telegram-bot-get-chat-id/cover.png
status: true
pubDate: 2023-10-04 18:34:00
category: program
tags:
    - Telegram
    - php 
---

## 步驟1: 創建 Telegram Bot 並獲取 API Token
首先,我們需要透過 Telegram 的 @BotFather 創建一個新的 Bot,並獲取該 Bot 的 API Token。API Token 是一個類似於 "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" 的字串,用於向 Telegram 的 API 服務器進行身份驗證。

## 步驟2: 使用 getUpdates 方法獲取更新
接下來,我們可以在瀏覽器中訪問以下 URL,將 <token> 替換為你的 API Token:

`https://api.telegram.org/bot<token>/getUpdates`

這將返回一個 JSON 格式的數據,包含了最近的更新。

## 步驟3: 從更新中提取 Chat ID

在返回的 JSON 數據中,查找 "result" 數組。每個元素代表一個更新,其中包含 "message" 或 "channel_post" 對象。在這些對象中,可以找到 "chat" 對象,其 "id" 字段就是該會話的 Chat ID。
對於私人會話,Chat ID 為正整數。對於群組,Chat ID 為負數,需要在前面加 "-100"。

## 步驟4: 儲存所有 Chat ID
遍歷所有更新的 "chat" 對象,獲取並儲存所有的 Chat ID。需要注意的是,`getUpdates` 只能獲取最近的更新,如果要獲取所有的 Chat ID,可能需要多次調用該方法。

## 在 PHP 語言中，如何快速取得

可使用 [php-telegram-bot/core](https://github.com/php-telegram-bot/core) 這個套件處理。

透過 Webhook 方式，使用 `getupdates` 函式來取得 chat id, 可參考 [官方教學](https://github.com/php-telegram-bot/core?tab=readme-ov-file#getupdates-installation)


