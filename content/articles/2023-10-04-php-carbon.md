---
title: 【PHP】如何利用 nesbot/carbon 處理日期和時間
summary: PHP語言在處理日期和時間時，Carbon 套件是一個非常有用的工具。Carbon 套件繼承了原生的 Datetime，並新增了許多語意化的行為，讓處理時間的難度降低許多。在這篇教學中，將會介紹 Carbon 套件的基本使用方法，以及如何在 PHP 中使用 Carbon 套件來處理日期和時間。
image: /images/articles/2023-10-04-php-carbon/cover.png
status: true
pubDate: 2023-10-04 18:34:00
category: program
tags:
    - php
---

## 安裝

使用 `composer` 安裝 `carbon`

```bash
composer require nesbot/carbon
```

簡易使用範例：

```php
require 'vendor/autoload.php';

use Carbon\Carbon;

printf("Now: %s", Carbon::now());
```

## 日期格式化

* `format($value)`：將日期時間進行格式化輸出，其中格式

## 取得與調整時間

* `now()`：獲得當前的日期與時間
* `today()`：獲得當天的日期
* `tomorrow()`：獲取明天的日期
* `yesterday()`：：獲取昨天的日期
* `addYear($value)` / `subYear($value)`：將年份增加/減少 `$value`
* `addQuarter($value)` / `subQuarter($value)`：將季度增加/減少 `$value`
* `addMonth($value)` / `subMonth($value)`：將月份增加/減少 `$value`
* `addDay($value)` / `subDay($value)`：將天數增加/減少 `$value`
* `addHour($value)` / `subHour($value)`：將小時增加/減少 `$value`
* `addMinute($value)` / `subMinute($value)`：將分鐘增加/減少 `$value`
* `addSecond($value)` / `subSecond($value)`：將秒數增加/減少 `$value`

### 範例

```php
use Carbon\Carbon;

/**
 * ：獲得當前的日期與時間
 */
echo Carbon::now();

//印出結果：2023-10-25 07:12:30

/**
 * 獲得當天的日期
 */
echo Carbon::today()->format("Y-m-d");

//印出結果：2023-10-25

/**
 * 獲取明天的日期
 */

echo Carbon::tomorrow()->format("Y-m-d");

//印出結果：2023-10-26

/**
 * 獲取昨天的日期
 */

echo Carbon::yesterday()->format("Y-m-d");

//印出結果： 2023-10-24

/**
 * 將年份增加/減少 `$value`
 */

echo Carbon::now()->addYear(1)->format("Y-m-d H:i:s");
echo " / ";
echo Carbon::now()->subYear(1)->format("Y-m-d H:i:s");

//印出結果： 2024-10-25 07:30:52 / 2022-10-25 07:30:52

/**
 * 將季度增加/減少 `$value`
 */

echo Carbon::now()->addQuarter(1)->format("Y-m-d H:i:s");
echo " / ";
echo Carbon::now()->subQuarter(1)->format("Y-m-d H:i:s");

//印出結果：2024-01-25 07:31:57 / 2023-07-25 07:31:57

/**
 * 將月份增加/減少 `$value`
 */
echo Carbon::now()->subMonth(1)->format("Y-m-d H:i:s");
echo " / ";
echo Carbon::now()->addMonth(1)->format("Y-m-d H:i:s");

//印出結果：2023-09-25 07:37:37 / 2023-11-25 07:37:37

/**
 * 將天數增加/減少 `$value`
 */
echo Carbon::now()->subDay(1)->format("Y-m-d H:i:s");
echo " / ";
echo Carbon::now()->addDay(1)->format("Y-m-d H:i:s");

//印出結果：2023-10-24 07:38:45 / 2023-10-26 07:38:45

/**
 * 將小時增加/減少 `$value`
 */
echo Carbon::now()->subHour(1)->format("Y-m-d H:i:s");
echo " / ";
echo Carbon::now()->addHour(1)->format("Y-m-d H:i:s");

//印出結果：2023-10-25 06:48:25 / 2023-10-25 08:48:25

/**
 * 將秒數增加/減少 `$value`
 */
echo Carbon::now()->subSecond(1)->format("Y-m-d H:i:s");
echo " / ";
echo Carbon::now()->addSecond(1)->format("Y-m-d H:i:s");

//印出結果：2023-10-25 07:49:58 / 2023-10-25 07:50:00
```

## 比較時間

* `eq($datetime)`：是否等於 `$datetime`，回傳布林值
* `ne($datetime)`：是否不等於 `$datetime`，回傳布林值
* `gt($datetime)`：是否大於 `$datetime`，回傳布林值
* `lt($datetime)`：是否小於 `$datetime`，回傳布林值
* `between($startTime, $endTime)`：是否介於 `$startTime`、`$endTime` 之間，回傳布林值

### 範例

```php
use Carbon\Carbon;

/**
 * 比較兩個時間，是否相等
 */
var_dump(Carbon::today()->eq(Carbon::today()));
//印出結果：bool(true)
var_dump(Carbon::today()->eq(Carbon::now()));
//印出結果：bool(false)

/**
 * 比較兩個時間，是否不相等
 */
var_dump(Carbon::today()->ne(Carbon::today()));
//印出結果：bool(false)
var_dump(Carbon::today()->ne(Carbon::tomorrow()));
//印出結果：bool(true)

/**
 * 比較兩個時間，是否大於
 */
var_dump(Carbon::tomorrow()->gt(Carbon::now()));
//印出結果：bool(true)
var_dump(Carbon::now()->gt(Carbon::tomorrow()));
//印出結果：bool(false)

/**
 * 比較兩個時間，是否小於
 */
var_dump(Carbon::now()->lt(Carbon::tomorrow()));
//印出結果：bool(true)
var_dump(Carbon::tomorrow()->lt(Carbon::now()));
//印出結果：bool(false)

/**
 * 是否介於 `$startTime`、`$endTime` 之間
 */
var_dump(Carbon::now()->between(Carbon::yesterday(), Carbon::tomorrow()));
// 印出結果：bool(true)
var_dump(Carbon::now()->addDay(2)->between(Carbon::yesterday(), Carbon::tomorrow()));
// 印出結果：bool(false)
```
