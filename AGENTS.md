# nuxt-blog3

Nuxt 4 + Nuxt Content v3 的個人部落格，使用 Yarn v1。

## 開發環境

確認開發環境 node.js 版本
```bash
nvm use 22
```

## 開發指令

```bash
yarn dev        # 啟動 dev server，預設 http://localhost:3000
yarn build      # 正式建置
yarn generate   # 靜態生成
yarn preview    # 預覽 production build
```

無測試、無 lint、無 typecheck 腳本（Nuxt 內建處理，不需額外工具）。

## 架構重點

- **入口頁面**：`app/pages/[...slug].vue` — catch-all 路由，使用 `queryCollection('content').path(route.path).first()`（Nuxt Content v3 API，非 v2 的 `queryContent`）
- **內容設定**：`content.config.ts` — 單一 collection `content`，source `**`，type `page`
- **內容目錄**：`content/articles/` 為主要文章區，`content/docs/` 為靜態頁面
- **內容語言**：多為繁體中文
- **tsconfig.json** 引用 `.nuxt/` 下的 generated config（`.nuxt/` 已 gitignore）
- **內容資料庫**：`better-sqlite3`（Nuxt Content v3 內建）

## 內容規範

- **文章檔名**：`YYYY-MM-DD-slug.md`
- **Frontmatter 欄位**：`title`, `summary`, `image`, `pubDate`, `status`, `category`, `tags`
- **MDC 元件**：可在 Markdown 中使用 `::alert` 和 `::counter`

## 注意事項

- **無 CI/CD**、無環境變數檔（`.env` 已 gitignore 但不存在）、無 Docker
- **無 devDependencies**：所有工具鏈由 Nuxt 內建提供
