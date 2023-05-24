# smart-city-hub

서울시립대학교 도시과학연구원의 스마트도시수출 거점 HUB의 소스입니다.

## docker compose example

```yml
version: "3"

services:
  app:
    build: .
    environment:
      - MONGO_URI=mongodb://db:27017/smarthub
      - FILES_DIRECTORY=/app/saved-files
    volumes:
      - ./saved-files:/app/saved-files
    ports:
      - 26001:4000
    links:
      - db

  db:
    image: mongo:4.4.3
    restart: unless-stopped
    volumes:
      - ./db:/data/db
    environment:
      MONGO_INITDB_DATABASE: smarthub
```
