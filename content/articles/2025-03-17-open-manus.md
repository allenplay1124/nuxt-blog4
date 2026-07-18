---
title: 使用 OpenManus 在本地端玩轉 AI Agent
summary: 最近的 Manus 爆紅的 AI 工具，但需要邀請碼，而 OpenManus 則是開源版，且可以在本地配合 ollama 使用
image: /images/articles/2025-03-17-open-manus/cover.png
pubDate: 2025-03-17 14:38:00
status: true
category: ai
tags:
    - AI
---

## 簡介

OpenManus 是一個開源的通用型 AI Agent，是 Manus 的替代方案，無需等待昂貴的激活碼即可使用。以下是 OpenManus 的使用教學，希望能幫助你快速上手：

## 環境需求

- **作業系統**：`Linux` / `Windows` / `MacOS`
- **Python**：版本 `3.10` 以上


## 專案網址

https://github.com/mannaandpoem/OpenManus

## 使用 Conda 安裝

### 建立新的 Conda 環境

```bash
conda create -n open_manus python=3.12
conda activate open_manus
```

### Clone 儲存庫

```bash
git clone https://github.com/mannaandpoem/OpenManus.git
cd OpenManus
```

### 安裝相依套件

```bash
pip install -r requirements.txt
```

## 使用 uv 安裝

### 安裝 uv 環境

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Clone 儲存庫

```bash
git clone https://github.com/mannaandpoem/OpenManus.git
cd OpenManus
```

### 建立新的虛擬環境並啟動它

```bash
uv venv --python 3.12
source .venv/bin/activate  # On Unix/macOS
# Or on Windows:
# .venv\Scripts\activate
```

### 安裝相依套件

```bash
uv pip install -r requirements.txt
```

## 設定

### 建立設定檔

```bash
cp config/config.example.toml config/config.toml
```

### 編輯設定檔

```bash
# [llm] #AZURE OPENAI:
# api_type= 'azure'
# model = "YOUR_MODEL_NAME" #"gpt-4o-mini"
# base_url = "{YOUR_AZURE_ENDPOINT.rstrip('/')}/openai/deployments/{AZURE_DEPOLYMENT_ID}"
# api_key = "AZURE API KEY"
# max_tokens = 8096
# temperature = 0.0
# api_version="AZURE API VERSION" #"2024-08-01-preview"

 [llm] #OLLAMA:
 api_type = 'ollama'
 model = "llama3"
 base_url = "http://127.0.0.1:11434/v1"
 api_key = "ollama"
 max_tokens = 4096
 temperature = 0.0

# Optional configuration for specific LLM models
#[llm.vision]
# model = "claude-3-7-sonnet"    # The vision model to use
# base_url = "https://api.openai.com/v1"    # API endpoint URL for vision model
# api_key = "sk-..."    # Your API key for vision model
# max_tokens = 8192     # Maximum number of tokens in the response
# temperature = 0.0     # Controls randomness for vision model

[llm.vision] #OLLAMA VISION:
api_type = 'ollama'
model = "llama3.2-vision:latest"
base_url = "http://127.0.0.1:11434/v1"
api_key = "ollama"
max_tokens = 4096
temperature = 0.0

# Optional configuration for specific browser configuration
# [browser]
# Whether to run browser in headless mode (default: false)
#headless = false
# Disable browser security features (default: true)
#disable_security = true
# Extra arguments to pass to the browser
#extra_chromium_args = []
# Path to a Chrome instance to use to connect to your normal browser
# e.g. '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
#chrome_instance_path = ""
# Connect to a browser instance via WebSocket
#wss_url = ""
# Connect to a browser instance via CDP
#cdp_url = ""

# Optional configuration, Proxy settings for the browser
# [browser.proxy]
# server = "http://proxy-server:port"
# username = "proxy-username"
# password = "proxy-password"

# Optional configuration, Search settings.
# [search]
# Search engine for agent to use. Default is "Google", can be set to "Baidu" or "DuckDuckGo".
engine = "Google"
```

其中 `[llm]` 的 ollama model 並非所有 model 著支援，目前只支援 [ollama tool 模型](https://ollama.com/search?c=tools)

而 `[llm.vision]` 的 ollama model 則必需支援[視覺的模型](https://ollama.com/search?c=vision)



## 瀏覽器安裝

在使用 `OpenManus` 時，有時需要使用網路爬蟲時，會要求你安裝 `Chromium` 瀏覽器，你可以事先透過下列指令進行安裝

```bash
playwright install
```

## 啟用服務

上面安裝完成後，就可以啟用服務

```bash
python main.py
```

## 啟用服務的畫面 

```bash
INFO     [browser_use] BrowserUse logging setup complete with level info
INFO     [root] Anonymized telemetry enabled. See https://docs.browser-use.com/development/telemetry for more information.
Enter your prompt:
```

在終端機輸入你的需求提示詞

如：請從網路上搜尋 近期熱門的 LLM 大語言模型的介紹，並以繁體中文整理成一篇文章，以 markdown 格式輸出 "LLM_大語言模型介紹.md"

執行結果會儲存在 `OpenManus/workspace` 資料夾



## 結論

總而言之，OpenManus 提供了一個無需等待邀請碼、即可在本地端體驗 AI Agent 功能的開源方案。透過搭配 Ollama，使用者可以輕鬆地利用各種大型語言模型和視覺模型，執行從網路資訊蒐集到文章撰寫等多種任務。儘管目前 Ollama 對於 `tool` 模型和視覺模型的支援仍在發展中，OpenManus 仍然為對 AI Agent 技術感興趣的使用者提供了一個方便且彈性的實驗平台。隨著專案的持續發展和更多模型的支援，OpenManus 有望成為本地端 AI 應用的重要工具之一。
