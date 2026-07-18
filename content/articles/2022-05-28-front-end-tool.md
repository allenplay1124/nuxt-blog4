---
title: 2022 前端常用的套件與工具
summary: 這裡收集了我開發前端時，常用的套件與工具
image: /images/articles/2022-06-03-frontend-tool/cover.png
status: true
pubDate: 2022-05-28 11:00:00
category: frontend
tags:
  - javascript
  - html
  - css
---
## nvm

NVM 是 Node Version Manager 的縮寫，主要功能就可以快速切換 Node.js 版本。

使用場景：

1. 維護多個不同時期所開發專案
2. 編譯老舊專案

Linux / MacOS 安裝方式

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

在終端機設定檔 bash 環境下編輯 `~/.bashrc` 或 zsh 環境下編輯 `~/.zshrc`

在文件內加入以下設定：

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

然後執行下面指令

- bash：`source ~/.bashrc`
- zsh: `source ~/.zshrc`

## yarn

是 Facebook 所開發的前端工具，是 Node.js 的套件管理，算是 npm 的替代品，優點是速度較快。

安裝方式：

**使用 npm 安裝**

```bash
npm install -g yarn
```

**MacOS安裝**

```bash
brew install yarn
```

**Ubuntu安裝**

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -  

sudo apt-get update && sudo apt-get install yarn 
```

## Nuxt.js

是一個混合式 Vue 框架，支援 **服務器渲染(SSR)**、**生成靜態頁面**或是**單頁應用程式(SPA)**，並優化了SEO，也支援 TypeScript。

官網：https://nuxtjs.org/

## tailwindcss

是一個近期相當流行的 Utility Framework，也是我近期最用的 UI 構建工具，其特色包含：

1. 快速上手
2. 快速建置
3. 高度客製化

因為以上特色，真得讓人一用就愛上了。

官網：https://tailwindcss.com/

## Bootstrap

相當知名且老牌的 UI component Framework，可以快速透過各種組件的組合建立 Web App，不過其實近期的專案，我已很少用到 Bootstrap 了。

官網：https://getbootstrap.com/

## element UI

這是我也滿喜歡的一個 UI component Framework，相對於 Bootstrap 它的組件更加豐富，特別適合拿來做管理介面。

官網：https://element.eleme.io/

## Moment.js

是一個專門處理日期與時間的Library，功能包含了：

1. 日期時間格式化
2. 日期時間相減運算
3. 相對時間時間
4. 時區轉換
5. 支持多語系

官網：https://momentjs.com/

對於日期時間的處理，Moment.js 幾乎都可以滿足

## Lodash

在用 javascript 做資料處理，Lodash 可以幫我們省去很多時間。

官網：https://lodash.com/

## Apache ECharts

這是一個開源的繪圖工具，當做數據分析時，需要圖表統計時，ECharts 是不錯的選擇

官網：https://echarts.apache.org/
