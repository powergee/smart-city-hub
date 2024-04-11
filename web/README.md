# Web Server for Smart City Hub

## 개요

next.js로 구현된 Smart City Hub 웹 서버이다. 사용자에게 실제로 컨텐츠를 보여주며 데이터를 관리한다.

## 환경 변수

웹 서버가 실행되기 위해서는 적절한 환경 변수가 설정되어야 한다. 환경 변수는 시스템에 직접 정의하거나, 프로젝트의 루트 디렉터리에 `.env.local` 파일에 환경 변수를 정의해도 된다.

1. `BACKEND_API_URL`: Smart City Hub의 백엔드 서버 주소
2. `BACKEND_PUBLIC_URL`: Smart City Hub의 백엔드 서버 주소(API 요청이 아닌 단순 이미지 및 파일 다운로드 등 용도로 사용하는 URL)
3. `WEB_STORAGE_PATH`: 백엔드 서버가 아닌 파일 시스템으로 Next.js가 다루는 데이터 보관 경로(PrimaryArticle 및 ProjectRecordItem 등이 저장됨)

아래는 환경 변수(또는 `.env.local` 파일)의 예시이다.

```
BACKEND_API_URL=http://localhost:4000
BACKEND_PUBLIC_URL=http://localhost:4000
WEB_STORAGE_PATH=../.devcontainer/data
```
