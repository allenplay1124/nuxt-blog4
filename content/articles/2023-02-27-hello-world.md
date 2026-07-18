---
title: 《Go 學習筆記2》不免俗的 Ｈello World
summary: Go語言一些基本操作
image: /images/articles/2023-02-26-go-lang-setup/cover.png
status: true
pubDate: 2023-02-27 22:28:00
category: program
tags:
    - go
---

>這是自學 Go lang 的筆記，若內容有誤，請留言區提醒，我會儘快改正，謝謝

## 建立專案目錄

```bash
mkdir go-test
```

## 建立程式檔

Go lang 的程式檔，會以 `*.go` 為副檔名

```bash
touch hello.go
```

## 編輯程式碼

以文字編輯器或IDE開啟，輸入下列程式碼

```go
/**
這是注解
***/
package main
import "fmt"
func main() {
	fmt.Println("Hello World")
}
```

- `/**/`：為多行註解
- `//` ：為單行注解
- package：是 Go lang 來定義 namespace 的方式，可以用來避免與第三方套件名稱衝突，若所開發為應用程式，則用 `main`，若開發的為函式庫，則由開發者自行命名。
- `import` ：引入函式庫用，包含 Go lang 的標準函式庫或是第三方開發的函式庫，都可以用 `import` 引入，而範例中 `fmt` 為 Go lang 的基本輸入輸出的函式庫
- `func main`：為主程式進入點，程式執行時，會先執行該段程式

## 進行編譯

```bash
go build hello.go
```

## 執行程式

```bash
./hello
```

## 執行結果
```bash
Hello world
```
