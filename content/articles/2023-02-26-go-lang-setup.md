---
title: 《Go 學習筆記1》開發環境建置
summary: Go語言開發環境建置
image: /images/articles/2023-02-26-go-lang-setup/cover.png
status: true
pubDate: 2023-02-26 22:07:00
category: program
tags:
    - go
---
>這是自學 Go lang 的筆記，若內容有誤，請留言區提醒，我會儘快改正，謝謝

先從安裝開發環境

## Go 語言官網

https://go.dev/

## 官網下載頁

https://go.dev/dl/

![alt Go語言下載][def]

[def]: /articles/2023-02-26-go-lang-setup/Pasted-image-20230124103550.png

基本上 Windows 和 MacOS 只要下載相對應的的版本，然後依安裝精靈，一步一步安裝裝即可。

也可以用指令安裝

## Windows 指令安裝

在 Windows 環境下，要透過指令安裝，可以用安裝 [chocolate](https://chocolatey.org/) 後，以下面指令安裝

```bash
choco install golang
```

## MacOS 指令安裝

在 MacOS 環境下，則可透過 [Homebrew](https://brew.sh/index_zh-tw) 這個套件管理工具，進行安裝，指令如下：

```bash
brew install go
```

## Linux 指令安裝

**一般 Linux**

 1. 下載

```bash
wget https://dl.google.com/go/go<版本號>linux-amd64.tar.gz
```

* 版本號：可至 [官網下載頁](https://go.dev/dl/) 查詢可安裝的版本號

2. 解壓縮

```bash
   sudo tar -xvf go<版本號>linux-amd64.tar.gz
   sudo mv go /usr/local
```

3. 設定環境變數
   在 `~/.profile` 最後一行加上

```bash
   export PATH=$PATH:/usr/local/go/bin
```

**Ubuntu 指令安裝**

```bash
sudo add-apt-repository ppa:longsleep/golang-backports
sudo apt update
sudo apt install golang-go
```


## 安裝環境測試

使用下列指令，即可知道安裝環境是否成功，亦可知曉安裝版本號

```bash
go version
```
**執行結果**

```bash
go version go1.20.1 darwin/arm64
```
