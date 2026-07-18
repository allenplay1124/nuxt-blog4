---
title: 《Go 學習筆記5》流程控制
summary: 這篇文章，會介紹 Go 語言中，常用的流程控制，包含 if、switch、for 等流程控制
image: /images/articles/2023-02-26-go-lang-setup/cover.png
status: true
pubDate: 2023-03-28 17:34:00
category: program
tags:
    - go
---

>這是自學 Go lang 的筆記，若內容有誤，請留言區提醒，我會儘快改正，謝謝

## if 判斷


**格式**

```go
if 條件1 {
  //若條件1成立，則執行此段程式
} else if 條件2 {
  //若條件2成立，則執行此段程式
} else {
  //若上述條件都位成立，則執行本段程式
}
```

**範例**

```go
package main

import "fmt"

func main() {

	var grade float32
	fmt.Print("請輸入分數：")
	fmt.Scan(&grade)

	if grade >= 80 {
		fmt.Printf("你的成績為：%.2f，成績不錯唷\r\n", grade)
	} else if grade >= 60 {
		fmt.Printf("您的成積為 %.2f ，恭喜你及格了\r\n", grade)
	} else {
		fmt.Printf("您的成績為 %.2f ，不及格~再努力\r\n", grade)
	}
}
```
**執行結果**
```bash
請輸入分數：59.99
您的成績為 59.99 ，不及格~再努力
```

## switch

也是一個判斷語法，會依不用結執行該段程式

**格式**

```go
switch (判斷式) {
	case value1:
		//程式片段1
	case value2:
		//程式片段2
	default:
		//若所有條件都不符合，則執行這個程式片段
}
	
```
**範例**

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()
	week := now.Weekday()
	switch week {
	case 0:
		fmt.Println("星期日")
	case 1:
		fmt.Println("星期一")
	case 2:
		fmt.Println("星期二")
	case 3:
		fmt.Println("星期三")
	case 4:
		fmt.Println("星期四")
	case 5:
		fmt.Println("星期五")
	case 6:
		fmt.Println("星期六")
	}
}
```
**執行結果**

```bash
星期二
```

## for 迴圈

**基本格式**

```go
for 初始執行指令;布林判斷式;後執行指令 {
	//若布林判斷式為 true 則執行程式片段
}
```

**範例**

```go
package main
import "fmt"
func main() {
	// for 循環的基本形式
	for i := 0; i < 5; i++ {
		fmt.Println(i)
	}
}
```


九九乘法

```go
package main
import "fmt"

func main() {
	var x int
	var y int
	for x = 2; x <= 9; x++ {
		for y = 1; y <= 9; y++ {
			var z int = x * y
			fmt.Printf("%d X %d = %d\n", x, y, z)
		}
		fmt.Println("==============")
	}
}
```

**執行結果**

```bash
2 X 1 = 2
2 X 2 = 4
2 X 3 = 6
2 X 4 = 8
2 X 5 = 10
2 X 6 = 12
2 X 7 = 14
2 X 8 = 16
2 X 9 = 18
==============
3 X 1 = 3
3 X 2 = 6
3 X 3 = 9
3 X 4 = 12
3 X 5 = 15
3 X 6 = 18
3 X 7 = 21
3 X 8 = 24
3 X 9 = 27
==============
4 X 1 = 4
4 X 2 = 8
4 X 3 = 12
4 X 4 = 16
4 X 5 = 20
4 X 6 = 24
4 X 7 = 28
4 X 8 = 32
4 X 9 = 36
==============
5 X 1 = 5
5 X 2 = 10
5 X 3 = 15
5 X 4 = 20
5 X 5 = 25
5 X 6 = 30
5 X 7 = 35
5 X 8 = 40
5 X 9 = 45
==============
6 X 1 = 6
6 X 2 = 12
6 X 3 = 18
6 X 4 = 24
6 X 5 = 30
6 X 6 = 36
6 X 7 = 42
6 X 8 = 48
6 X 9 = 54
==============
7 X 1 = 7
7 X 2 = 14
7 X 3 = 21
7 X 4 = 28
7 X 5 = 35
7 X 6 = 42
7 X 7 = 49
7 X 8 = 56
7 X 9 = 63
==============
8 X 1 = 8
8 X 2 = 16
8 X 3 = 24
8 X 4 = 32
8 X 5 = 40
8 X 6 = 48
8 X 7 = 56
8 X 8 = 64
8 X 9 = 72
==============
9 X 1 = 9
9 X 2 = 18
9 X 3 = 27
9 X 4 = 36
9 X 5 = 45
9 X 6 = 54
9 X 7 = 63
9 X 8 = 72
9 X 9 = 81
==============
```

### break

用於跳出整個迴圈，結束迴圈的執行

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {

	var index int

	for index = 0; index < 10; index++ {

		seed := rand.NewSource(time.Now().UnixNano())

		rNum := rand.New(seed)

		num := rNum.Intn(100)

		if num > 60 {
			break
		}

		fmt.Println(index, num)
	}
}
```

**執行結果**

```bash
0 26
1 19
2 59
3 45
4 14
5 25
6 50
7 14
```

### continue

用於跳過當前迴圈的剩餘部分，直接進入下一次迴圈的執行

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

const (
	RED   = "\x1b[31m"
	GREEN = "\x1b[32m"
	RESET = "\x1b[0m"
)

func main() {
	var index int
	for index = 0; index < 10; index++ {
		seed := rand.NewSource(time.Now().UnixNano())
		rNum := rand.New(seed)
		num := rNum.Intn(100)

		if num < 60 {
			fmt.Printf("%d 號學生的分數為 %d %s不及格%s\n", index, num, RED, RESET)
			continue
		}

		fmt.Printf("%d 號學生的分數為 %d，%s恭喜級格了%s\n", index, num, GREEN, RESET)
	}

}
```

**執行結果**

```bash
0 號學生的分數為 38 不及格
1 號學生的分數為 26 不及格
2 號學生的分數為 21 不及格
3 號學生的分數為 37 不及格
4 號學生的分數為 58 不及格
5 號學生的分數為 40 不及格
6 號學生的分數為 44 不及格
7 號學生的分數為 64，恭喜級格了
8 號學生的分數為 93，恭喜級格了
9 號學生的分數為 0 不及格
```

**說明**

從上面範例結果，可以了解 `break` 只是達成條件，就會跳開整個迴圈，而 `continue`，只會跳過此次迴圈。

## goto

`goto` 程式執行時，無條件跳至某行執行，為確保程式邏輯清晰，程式碼易於維護，不建義使用 `goto`

```go
go label

label:
  //程式片段
```

**範例程式**

```go
package main

import "fmt"

func main() {

	i := 0
	for {
		i++
		fmt.Println(i)

		if i >= 10 {
			goto Here
		}
	}

Here:
	fmt.Println("程式結束")
}
```

**執行結果**

```bash
1
2
3
4
5
6
7
8
9
10
和式結束
```

以上是 go 語言中，常用的流程控制，若有遺漏或說明錯誤可以在下留言討論。
