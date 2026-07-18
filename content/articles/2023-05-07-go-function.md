---
title: 《Go 學習筆記6》函式
summary: 這篇文章，會介紹 Go 語言中，function 的使用方式
image: /images/articles/2023-02-26-go-lang-setup/cover.png
status: true
pubDate: 2023-04-07 22:34:00
category: program
tags:
    - go
---

>這是自學 Go lang 的筆記，若內容有誤，請留言區提醒，我會儘快改正，謝謝

在 Go 語中，為了可以重復使用某個程式碼片段，我們使用函式 (function) 來進實作。而在 Go 語言中，function 可以輸入多個參數值，也可以回傳多個參數值

##無 return 函式

```go
func 函式名 (參數1 變數型態, 參數2 變數型態, ...) {
	//執行程式片段
}

//呼叫方式
函式名(參數1, 參數2)
```

**範例**

```go
package main
import "fmt"
func main() {
    hello("Allen", 23)
}

func hello(name string, age int8) {
    fmt.Printf("Hello %s\r\n", name)
    fmt.Printf("年紀 %d\r\n", age)
}
```

**執行結果**

```bash
Hello Allen
年紀 23
```

## return 函式

```go
func 函式名  (參數1 變數型態, 參數2 變數型態, ...) 回傳型態 {
	//執行程式片段
	return 回傳值
}
```

**範例**

```go
package main
import "fmt"
func main() {
	total := sum(4, 2, 3)
	fmt.Println(total)
}

func sum(x int, y int, z int) int {
	return x + y + z
}

```

**執行結果**

```bash
9
``` 

## return 多個值

**格式**

```go
func 函式名  (參數1 變數型態, 參數2 變數型態, ...) (回傳型態1, 回傳型態2, 回傳型態3,...) {
	//執行程式片段1
	return 回傳值1, 回傳值2, 回傳值3,...
}
```

**範例**

```go
package main
import "fmt"

func main() {
	var name string
	var sex bool
	var height float32
	var weight float32
	var sexString string
	
	name, sex, height, weight = getPersonData()

	sexString = getSexString(sex)

	fmt.Printf("姓名：%s\r\n", name)
	fmt.Printf("性別：%s\r\n", sexString)
	fmt.Printf("身高：%.2f\r\n", height)
	fmt.Printf("體重：%.2f\r\n", weight)
}


func getPersonData() (string, bool, float32, float32) {
	return "小明", true, 175.0, 60.5
}

func getSexString(sex bool) string {
	if sex == true {
		return "男"
	} else {
		return "女"
    }
}
```

**執行結果**

```bash
姓名：小明
性別：男
身高：175.00
體重：60.50
```
