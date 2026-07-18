---
title: 《Go 學習筆記2》 變數型態
summary: Go語言變數的使用
image: /images/articles/2023-02-26-go-lang-setup/cover.png
status: true
pubDate: 2023-03-01 21:09:00
category: program
tags:
    - go
---

>這是自學 Go lang 的筆記，若內容有誤，請留言區提醒，我會儘快改正，謝謝


## 變數宣告

在 Go lang 變數宣告，可使用 `var` 和 `:=` 兩個關鍵字，進行變數宣告。

```go
var x int =  10
var y float32 = 3.1412
var z string = "Hello World"
```

使用 `:=` 符號變數宣告時，可以省略型態，系統會自動推斷變數的型態

```go
x := 10
y := 3.1412
z := "Hello World"
```

多變數宣告

```go
var x, y, z int
```

## Go 語言的變數型態包括:

- 整數類型: `int`, `int8`, `int16`, `int32`, `int64`, `uint`, `uint8`, `uint16`, `uint32`, `uint64`
- 浮點數類型: `float32`, `float64`
- 字符類型: `string`, `rune`, `byte`
- 布林類型: `bool`

### 整數型態

1. `int` ： 是帶有符號的整數，可表示正數與負數
    | 類型  | 大小       | 範圍           |
   | ----- | ---------- | -------------- |
   | int8  | 8 bits     | -128 ~ 127     |
   | int16 | 16bits     | -2^15 ~ 2^15-1 |
   | int32 | 32bits     | -2^31 ~ 2^31-1 |
   | int64 | 64bits     | -2^63 ~ 2^63-1 |
   | int   | 取決於平台 | 取決於平台     |
2. `unit`：是無符號的整數，只能表示正數
    | 類型   | 大小       | 範圍         |
   | ------ | ---------- | ------------ |
   | unit8  | 8 bits     | 0 ~ 255      |
   | unit16 | 16bits     | 0 ~ 2^16 - 1 |
   | unit32 | 32bits     | 0 ~ 2^31 -1  |
   | unit64 | 64bits     | 0~ 2^63 -1   |
   | unit   | 取決於平台   | 取決於平台    |

### 浮點數型態

1. `float32`：在記憶體佔用 32 位元，並以單精度浮點數格式儲存
2. `float64`：在記憶體佔用 64 位元，並以倍精度浮點數格式儲存

### 字串

在 Go lang 中，可以使用雙引號來宣告如 `"Hello World"` 也可以使用反引號來宣告 \`hello World\`

### 字元

在 Go lang 中，以 `byte` 和 `rune` 來表示字元的變數型態

- `byte`：是 `unit8` 的別名，用來表示一個 8 bits 無符號正整數。它常用來表示 ASCII 碼或 UTF-8 編碼的字元。
- `rune`：是 `int32` 的別名，用來表示一個 `Unicode` 碼點。它常用來表示 UTF-32 編碼的字元。

### 布林值

Go lang 是以 bool 來宣告，其實為 `true` 或 `false`

## 型態轉換

由於 Go lang 是強型別語言，所以它不允許表達式中混合不同型態的變數。例如，我們不同直接將 `int8` 和 `float32` 進行相加。要解決此問題，我們必需將變數型態，改成同一種變數型態，才能進行運算。

```go
package main

import "fmt"

func main() {

	var x int = 10
	
	var y float32 = 3.1412
	
	var z float32 = float32(x) + y
	
	fmt.Println(x, y, z)
}
```

**執行結果**

```bash
10 3.1412 13.1412
```
