---
title: FFmpeg 新手入門：從安裝到常用指令實戰
summary: FFmpeg 是一個跨平台的開源多媒體工具組，用來處理音樂與影片。
image: /images/articles/2025-11-16-ffmpeg-getting-started/cover.png
pubDate: 2025-11-16 16:54:00
status: true
category: software
tags:
    - video
    - software
    - 開源
---

## 簡介

FFmpeg 是一套以命令列為主的開源多媒體處理工具，支援幾乎所有常見的音訊與影像格式（編碼/封裝）。
對開發者、系統工程師與內容創作者而言，FFmpeg 是自動化轉檔、批次處理、串流轉封裝與影音後製流程中不可或缺的工具。
本文以實務為導向，示範安裝步驟與常用命令（轉檔、壓縮、截圖、合併、裁切等），並說明常見選項與應用場景，協助你快速在專案或腳本中整合 FFmpeg。

## 安裝

一、在 MacOS 安裝 ffmpeg

```bash
brew install ffmpeg
```

二、在終端機輸入以下指令，可取得 ffmpeg 版本號和相關設定資訊

```bash
ffmpeg -version
```

## 轉檔

一、基本轉檔

   ```bash
   ffmpeg -i input.mov output.mp4
   ```

二、更換影片和音訊的編碼
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -c:a aac output.mp4
   ```
   - `-c:v libx264`：指定使用 H.264 編碼器進行影片編碼。
   - `-c:a aac`： 指定使用 AAC 編碼器進行音頻編碼。

三、影片轉成序列圖片檔

   ```bash
   ffmpeg -i input.mp4 video/output_%04d.png
   ```

四、影片轉成音訊檔

   ```bash
   ffmpeg -i input.mp4 music/output.mp3
   ```

五、序列圖片轉成影片檔

  ```bash
  ffmpeg -framerate 30 -i video/output_%04d.png -c:v libx264 output.mp4
  ```
- `framerate`：影格率（fps）
- `-i`：輸入
- `-c:v libx264`：使用 H264 編碼

## 剪裁

一、時間裁切（截取片段）

```bash
ffmpeg -ss - -i input.mp4 -t 10 -c copy output_trim.mp4
```

- `-ss`： 開始時間
- `-i`：輸入
- `-t`：截取時間(秒)
- `-c copy`：不進行重新編碼-
## 合併

一、合併影片檔和聲音檔

```bash
ffmpeg -i input.mp4 -i audio.wav -c:v copy -c:a aac -b:a 192k -shortest output.mp4
```

- `-c:v copy`：複製原影片，不重新編碼（保留畫質、速度快）
- `-c:a aac -b:a 192k`： 把音訊編成 AAC，192 kbps 常見且相容性好。
- `-shortest`：以較短的軌為準，避免多出黑畫面或靜音尾巴

二、合併圖片

- 建立影像清單 `filelist.txt`
	```text
	file 'part1.mp4'
	file 'part2.mp4'
	file 'part3.mp4'
	```

- 串連輸出
  
  ```bash
  ffmpeg -f concat -safe 0 -i filelist.txt -c copy output_concat.mp4
  ```

**注意：所有影片片段編碼參數需相同，否則會有導致音畫不同步，或是合併失敗**

## 結論

總結來說，FFmpeg 是一個功能強大的影音處理工具，只是功能對一般人來說複雜，而本文整理常用的使用情境，期望讓使用快速上手，若要更詳細的功能使用，可以參考[官方文件](https://ffmpeg.org/ffmpeg.html)，希望這份指南能幫助你更好地利用 FFmpeg，打造更完美的影音作品！