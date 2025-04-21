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

secrets: ...

# 서비스를 하려는 모든 컨테이너는 아래의 네트워크와 함께 물려있어야 한다.
networks:
  default:
    external: true
    name: nginx-proxy-network
```

## Project Structure

프로젝트 구조를 살펴보기에 앞서, 이 프로젝트는 2020년부터 시작되어 오랫동안 개발된 프로젝트이며 다양한 사람들에 의해 개발 및 유지보수되었기 때문에 구조적으로 비일관적일 수 있음을 고려해야 한다.

프로젝트에서 가장 혼동될 수 있는 부분은 프론트/백 구조 및 스토리지다.

이 프로젝트는 `backend`와 `web` 두 개의 서비스로 구성되어있는데, `backend`는 일반적인 벡엔드이지만 `web`은 `Next.js`로 구현되어있어 일부 파일시스템 접근 등을 수행하는 복합적인 서비스다.

> 왜 그러한 구조가 되었는지는 궁금해하지 말도록 하자.

이 프로젝트에서 저장될 수 있는 정보들은 다음과 같이 나뉜다.

- 유저 정보
- 일반 게시글
- 파일들 (게시글의 첨부파일 등)
- 연구실에서 진행한 프로젝트 이력
- 주요 페이지(연구원 소개 페이지 등)

이때 이중 `유저 정보`, `일반 게시글`, `파일들`은 모두 백엔드에서 관리되는 데이터다. 반면 `연구실에서 진행한 프로젝트 이력`과 `주요 페이지`는 `web`에서 관리되는 데이터다.
