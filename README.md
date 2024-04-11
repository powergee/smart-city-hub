# Smart City Hub

서울시립대학교 도시과학연구원의 스마트도시수출 거점 HUB의 소스입니다.

## Deployment Example of docker-compose

```yml
version: "3.8"

services:
  backend:
    build: ./backend
    image: smart-city-hub-backend
    restart: unless-stopped
    environment:
      - MONGO_URI=
      - FILES_DIRECTORY=
      - ACCESS_SECRET_KEY_FILE=
    volumes:
      - ...
    secrets:
      - ...
    links:
      - db

  legacy:
    build: ./frontend
    image: smart-city-hub-legacy
    restart: unless-stopped
    environment:
      - BACKEND_API_URL=

  web:
    build: ./web
    image: smart-city-hub-web
    restart: unless-stopped
    environment:
      - BACKEND_API_URL=http://backend:4000
      - BACKEND_PUBLIC_URL=https://public.backend.example
      - WEB_STORAGE_PATH=
    volumes:
      - ...

  db:
    image: mongo:4.4.3
    restart: unless-stopped
    volumes:
      - ...
    environment:
      MONGO_INITDB_DATABASE: smarthub

secrets:
  ...

# 서비스를 하려는 모든 컨테이너는 아래의 네트워크와 함께 물려있어야 한다.
networks:
  default:
    external: true
    name: nginx-proxy-network
```
