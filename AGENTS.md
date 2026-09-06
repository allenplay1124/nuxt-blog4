# nuxt-blog3

Nuxt 4 + Nuxt Content v3 的個人部落格，使用 Yarn v1。

## 開發環境

需要確認node.js版本，可以使用 `nvm use 22`

## 開發指令

修改完程式，除非當次指令要求，否則不要執行驗證

```bash
yarn dev        # 啟動 dev server，預設 http://localhost:3000
yarn build      # 正式建置
yarn generate   # 靜態生成
yarn preview    # 預覽 production build
```

無測試、無 lint、無 typecheck 腳本（Nuxt 內建處理，不需額外工具）。

## 部署

push 到 `main` 會觸發 `.github/workflows/deploy.yml`：`yarn generate` 後以 `peaceiris/actions-gh-pages` 將 `.output/public` 發佈到 `allenplay1124/allenplay1124.github.io` 的 `main` branch（GitHub Pages，自訂網域 allenplay.net）。

- 認證方式：SSH Deploy Key（私鑰存於本 repo secret `ACTIONS_DEPLOY_KEY`，公鑰存於 pages repo 的 Deploy keys 並勾選 Allow write access）
- `public/CNAME` 會隨輸出一併發佈，維持自訂網域設定
- action 預設自動加入 `.nojekyll`，不需手動建立

## 架構重點

- **入口頁面**：`app/pages/[...slug].vue` — catch-all 路由，使用 `queryCollection('content').path(route.path).first()`（Nuxt Content v3 API，非 v2 的 `queryContent`）
- **內容設定**：`content.config.ts` — 單一 collection `content`，source `**`，type `page`
- **內容目錄**：`content/articles/` 為主要文章區，`content/docs/` 為靜態頁面
- **內容語言**：多為繁體中文
- **tsconfig.json** 引用 `.nuxt/` 下的 generated config（`.nuxt/` 已 gitignore）
- **內容資料庫**：`better-sqlite3`（Nuxt Content v3 內建）
- **UI組件框架**： `nuxt/ui`，官方文檔：https://ui.nuxtjs.org.cn/docs/

## 內容規範

- **文章檔名**：`YYYY-MM-DD-slug.md`
- **Frontmatter 欄位**：`title`, `summary`, `image`, `pubDate`, `status`, `category`, `tags`
- `pubDate`：請代入系統時間，格式：`YYYY-MM-DD hh:mm`
- **MDC 元件**：可在 Markdown 中使用 `::alert` 和 `::counter`

## 注意事項

- **無 CI/CD**、無環境變數檔（`.env` 已 gitignore 但不存在）、無 Docker
- **無 devDependencies**：所有工具鏈由 Nuxt 內建提供
- **AI AGENT交互**：與 AI 模型交互使用繁體中文
