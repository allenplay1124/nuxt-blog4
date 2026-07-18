---
title: Docker 裡的 Postgresql 的匯入與匯出
summary: 在 Docker 的環境，如何匯入匯出 Postgresql
image: /images/articles/2023-01-17-docker-postgresql-import-export/cover.png
status: true
pubDate: 2023-01-17 11:12:00
category: database
tags:
    - PostgreSQL
    - Docker
---
我們可以用 [Adminer](https://hub.docker.com/_/adminer) 這個資料庫管理工具，來進行匯入匯出，但檔案太大時，用 Adminer 就會顯得力不從心，而我們另外一個選擇，就是透過指令匯入匯出 SQL 檔。

## 匯入

要將 SQL 檔案匯入到 Docker 內的 PostgreSQL 資料庫，您可以使用 `docker exec`指令來執行 SQL 檔案。首先，確保您已經在 Docker 內運行 PostgreSQL 資料庫，並且已經知道資料庫的容器名稱。

而 Postgresql 要匯入 SQL 檔時，我們會使用 `psql` 這個指令

完整指令與參數如下：

```bash
docker exec -i <container_name> psql -U <username> -d <database_name> -n <schema_name> < <sql_file>.sql
```

- `container_name`：PostgreSQL 容器的名稱
- `username`：資料庫中使用的使用者名稱
- `database_name`： 資料庫名稱
- `schema_name`：要匯入 SQL 檔案的 schema 名稱
- `sql_file`：SQL 檔案 路徑

## 匯出

要將 Docker 裡 Postgresql 服務器中的資料匯出時，我們一樣要使用 `docker exec` 這個指令，一樣我們先確認 Docker 內的 Postgresql 資料庫是正常運作。

而 Postgresql 要匯出 SQL 檔時，我們會使用 `pg_dump` 這個指令

完整指令如下：

```bash
docker exec -i <container_name> pg_dump -U <username> -d <username> -n <schema_name> > <sql_path>.sql
```

- `container_name`：PostgreSQL 容器的名稱
- `username`：資料庫中使用的使用者名稱
- `database_name`： 資料庫名稱
- `schema_name`：要匯入 SQL 檔案的 schema 名稱
- `sql_file`：SQL 檔案 路徑

而我們也可以在匯出時，直接匯出 gzip 壓縮檔，只要我們加上 `pipe line gzip` 的指令即可

完整指令如下：

```bash
docker exec -i <container_name> pg_dump -U <username> -d <username> -n <schema_name> | gzip -9 > <zip_path>.sql.gz
```

- `container_name`：PostgreSQL 容器的名稱
- `username`：資料庫中使用的使用者名稱
- `database_name`： 資料庫名稱
- `schema_name`：要匯入 SQL 檔案的 schema 名稱
- `zip_path` ：壓縮檔路徑
- `-9`：為壓縮等級，範圍為 0~9，其中 0 為不壓縮僅打包，9 為最高壓縮等級，這裡也可以不指定壓縮等級，它則會以預設 6 來進行壓縮
