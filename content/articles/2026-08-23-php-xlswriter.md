---
title: PHP 高效處理 XLSX 檔案：xlswriter 安裝與實戰教學
summary: 當 PHP 需要匯出或讀取大量 Excel 資料時，xlswriter 能以 C 擴充套件提供低記憶體、高效率的 XLSX 處理方式。本文整理安裝流程、基本讀寫與大檔案實務。
image: /images/articles/2026-08-23-php-xlswriter/cover.png
status: true
pubDate: 2026-08-23 16:34:00
category: program
tags:
    - php
    - xlsx
    - excel
---

## 簡介

系統匯出報表時，資料量一大，常常會遇到記憶體不足或等待時間太久的問題。`PhpSpreadsheet` 功能完整，但它以純 PHP 建立整份活頁簿物件；若要處理數十萬筆以上資料，記憶體成本會很高。

[`xlswriter`](https://github.com/viest/php-ext-xlswriter) 是以 C 實作的 PHP 擴充套件，底層使用 `libxlsxwriter`，專門處理 Excel 2007 以上的 XLSX 格式。除了文字與數字，也支援公式、圖片、圖表、合併儲存格、自動篩選與樣式等功能。

官方的百萬列基準測試顯示，xlswriter 在速度與記憶體使用上都很適合大量資料匯出。不過實際結果仍會依照硬體、資料欄位數、字串長度與樣式複雜度而改變，建議以自己的正式環境測試為準。

## xlswriter 適合哪些情境？

- 後台需要匯出大量訂單、會員或交易明細。
- 需要逐列讀取大型 XLSX，避免一次載入所有資料。
- 要產生具備公式、格式、篩選或多工作表的 Excel 報表。
- 伺服器的 PHP 記憶體限制較嚴格。

若只要處理少量資料，或部署環境無法安裝 PHP 擴充套件，使用 Composer 安裝的 `PhpSpreadsheet` 仍會較方便；但大量資料匯出時，xlswriter 的固定記憶體模式更合適。

## 安裝

### 安裝 zlib 相依套件

xlswriter 編譯時需要 zlib 的開發檔案。先依作業系統安裝：

```bash
# Debian / Ubuntu
apt-get install -y zlib1g-dev

# Alpine
apk add zlib-dev

# RHEL / CentOS / Fedora
yum install -y zlib-devel

# macOS
brew install zlib
```

### 使用 PECL 安裝

```bash
pecl install xlswriter
```

安裝過程中若需要讀取 XLSX，請在提示時啟用 reader。完成後在 `php.ini` 加入：

```ini
extension=xlswriter.so
```

最後確認擴充套件已被載入：

```bash
php -m | grep xlswriter
```

也可以使用 PIE 安裝：

```bash
pie install --auto-install-build-tools viest/xlswriter
```

Windows 使用者可從 [GitHub Releases](https://github.com/viest/php-ext-xlswriter/releases) 下載符合 PHP 版本、執行緒安全設定與架構的 DLL，再於 `php.ini` 啟用。

## 建立第一份 XLSX 報表

以下範例建立一張「銷售報表」工作表，先寫入欄位標題，再加入資料。

```php
<?php declare(strict_types=1);

$excel = new \Vtiful\Kernel\Excel([
    'path' => './tmp',
]);

$filePath = $excel->fileName('sales-report.xlsx', '銷售報表')
    ->header(['品項', '金額', '數量'])
    ->data([
        ['租金', 10000, 1],
        ['水電', 2500, 1],
        ['辦公用品', 3000, 5],
        ['交通費', 1200, 10],
    ])
    ->output();

echo "檔案已儲存至：{$filePath}\n";
```

`path` 是輸出目錄；Web 專案通常可先輸出至暫存目錄，再透過框架的下載回應將檔案交給使用者。請勿直接把使用者輸入當成檔名或路徑，以免產生路徑穿越風險。

## 大量資料匯出：固定記憶體模式

大量報表最值得使用的是 `constMemory()`。這個模式會逐列處理資料，記憶體不會隨著工作表資料量持續增加。

```php
<?php declare(strict_types=1);

$excel = new \Vtiful\Kernel\Excel([
    'path' => './tmp',
]);

// 開啟固定記憶體模式 (參數：檔名, 工作表名稱)
$file = $excel->constMemory('large_data.xlsx', 'Sheet1');

// 寫入表頭
$file->header(['ID', '姓名', '數值']);

// 迴圈逐行寫入大批量數據
for ($i = 1; $i <= 1000000; $i++) {
    $file->insertText($i - 1, 0, $i);
    $file->insertText($i - 1, 1, "使用者 {$i}");
    $file->insertText($i - 1, 2, rand(1, 100));
}

// 輸出儲存檔案
$file->output();
```

固定記憶體模式的取捨是：資料寫入後不能回頭修改已寫入的儲存格。因此欄位順序、樣式與計算方式要先規劃好；若報表需要任意回寫或重複調整，則使用一般 `fileName()` 模式。

> `fetchReportRows()` 代表可逐筆或分批取得資料的 Generator。例如資料庫查詢應避免一次 `fetchAll()`，才能真正降低整體記憶體用量。

## 讀取 XLSX 檔案

小型檔案可直接取得工作表全部資料：

```php
<?php declare(strict_types=1);

$excel = new \Vtiful\Kernel\Excel([
    'path' => './tmp',
]);

$data = $excel->openFile('sales-report.xlsx')
    ->openSheet()
    ->getSheetData();

print_r($data);
```

如果上傳檔案可能很大，改用游標逐列讀取。這樣可以一筆一筆驗證與寫入資料庫，不必將整個檔案放進記憶體。

```php
<?php declare(strict_types=1);

$excel = new \Vtiful\Kernel\Excel([
    'path' => './tmp',
]);

$excel->openFile('large_data.xlsx')
    ->openSheet()
    ->setSkipRows(1); // 略過標題列

while ($row = $excel->nextRow()) {
    [$id, $name, $amount] = $row;

    // 在此驗證資料並分批寫入資料庫
}
```

若檔案有多張工作表，可先取得清單：

```php
$sheetList = $excel->openFile('sales-report.xlsx')->sheetList();

print_r($sheetList);
```

## 常用 Excel 功能

### 加入公式與數字格式

`insertFormula()` 可寫入 Excel 公式；數字格式可交給 `insertText()` 的最後一個參數處理。

```php
$file = $excel->fileName('expense-report.xlsx')
    ->header(['品項', '金額']);

$file->data([
    ['租金', 10000],
    ['水電', 2500],
    ['辦公用品', 3000],
])
    ->insertText(4, 0, '總計')
    ->insertFormula(4, 1, '=SUM(B2:B4)')
    ->insertText(5, 1, 1234567.89, '#,##0.00')
    ->output();
```

常用格式包括：

- `#,##0`：千分位整數
- `#,##0.00`：千分位與兩位小數
- `0.00%`：百分比
- `yyyy-mm-dd`：日期

### 凍結標題列與自動篩選

這兩個功能很適合明細型報表，使用者捲動資料時仍可看見欄位名稱，也能直接在 Excel 篩選。

```php
$excel->fileName('employee-report.xlsx')
    ->header(['姓名', '部門', '薪資'])
    ->data([
        ['王小明', '工程部', 60000],
        ['李小華', '行銷部', 55000],
        ['陳美玲', '人資部', 58000],
    ])
    ->freezePanes(1, 0)
    ->autoFilter('A1:C4')
    ->output();
```

### 多個工作表

一份檔案需要不同分類資料時，可使用 `addSheet()` 新增工作表。

```php
$file = $excel->fileName('monthly-report.xlsx', '一月')
    ->header(['品項', '金額'])
    ->data([['服務收入', 50000]]);

$file->addSheet('二月')
    ->header(['品項', '金額'])
    ->data([['服務收入', 62000]])
    ->output();
```

## 結論

xlswriter 很適合 PHP 專案中「大量資料匯出、低記憶體讀取」的需求。一般報表可從 `fileName()`、`header()` 與 `data()` 開始；資料量上來後，再改用 `constMemory()` 配合逐筆或分批資料來源。

更多樣式、圖片、圖表、條件格式與資料驗證的使用方式，可參考 [xlswriter 官方文件](https://xlswriter-docs.viest.me/) 與 [GitHub 專案說明](https://github.com/viest/php-ext-xlswriter)。
