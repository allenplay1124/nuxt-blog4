---
title: 開發環境工具介紹-環境篇
summary: 記錄自已在網站開發時，常用的工具
image: /images/articles/2022-04-27-develop-tool/cover.png
status: true
pubDate: 2022-04-27 12:00:00
category: software
tags:
  - software
---
## Docker

有別於傳統虛擬機以作業系統為中心，Docker 則是以應用程式為中心，在達成虛擬化，並不需要完整載入完整的 Guest OS，而只要啟用應用層級程式及相關函式，因此其優勢，不需完整安裝 Guest OS 節省硬碟資源，另外啟用速度快，也是其最大優勢。

官網：[Home - Docker](https://www.docker.com/)

## Laradock

這應該在 Docker 上最完整的 PHP 開發環境。支持各版本 PHP 切換，支援主流資料庫，如 MySQL、Postgres、MariaDB及各種常用伺服器服務。

官網： [https://laradock.io/](https://laradock.io/)

## Visual Studio Code

微軟開發的開源文字編器，相當受社群歡迎，支援 Windows、MacOS、Linux 三大主流作業系統。另外有各種插件可使用，功能不輸需要付費的IDE。

官網：[Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)

## Postman

相當知名的 Rest API 測試工具，支援各種API認證、常用的 http method，及常用 Http 的 Authorizing

官網：[Postman API Platform | Sign Up for Free](https://www.postman.com/)

## Git

是一個免費且開源的版控軟體，是目前最主流的版控軟體，支援MacOS、Ｗindows、Linux多平台

官網：[Git (git-scm.com)](https://git-scm.com/)

## GitHub Desktop

Git 知名的原始碼代管服務平台，所發行 Git GUI 免費軟體，目前提供 Windows 和 MacOS，介面相當友善， 對 Git 的功能支援的相當完整，很適合 Git 初心者使用。

官網：[GitHub Desktop | Simple collaboration from your desktop](https://desktop.github.com/)

## zsh Command Line + oh my zsh

開發網站時常要用到 Command Line，雖然 `MacOS` 和 `Linux` 都支援 `bash`，但更喜歡 zsh + oh my zsh 各種插件，針對 git 優化，指令提醒功能，甚致可以顯示CPU、記憶體使用量等潮到爆的功能，你也可自訂佈景，讓你的 Command Line 呈現簡約風格。

官綱：[Oh My zsh官網](https://ohmyz.sh/)
