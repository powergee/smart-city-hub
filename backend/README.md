# Backend Server for Smart City Hub

## 개요

node.js와 koa 프레임워크로 구현된 Smart City Hub 백엔드 서버이다. 주로 사용자 인증이나 게시글에 대한 CRUD를 수행한다.

## 환경 변수

백엔드가 실행되기 위해서는 적절한 환경 변수가 설정되어야 한다. 환경 변수는 시스템에 직접 정의하거나, dotenv 패키지의 도움을 받아 프로젝트의 루트 디렉터리에 `.env` 파일에 환경 변수를 정의해도 된다. 꼭 필요한 환경 변수는 아래와 같다.

1. `PORT`: Listen할 포트 번호
2. `MONGO_URI`: MongoDB의 Database에 접근하기 위한 URI (ex. mongodb://localhost/smarthub)
3. `ACCESS_SECRET_KEY`: Access Token 생성에 필요한 개인키
   - `ACCESS_SECRET_KEY_FILE`: 해당 문자열을 담고 있는 파일을 해당 환경변수로 지정하여 `ACCESS_SECRET_KEY`를 설정할 수 있다.
4. `FILES_DIRECTORY`: 파일과 이미지를 저장하기 위한 디렉토리 경로

아래는 환경 변수(또는 `.env` 파일)의 예시이다.

```
PORT=4000
MONGO_URI=mongodb://localhost/smarthub
ACCESS_SECRET_KEY=랜덤으로_사전에_생성한_문자열
FILES_DIRECTORY=/home/user/smart-hub-files
```

## 주요 파일

- [model.ts](./src/v2/core/model.ts) - 엔티티들을 정의해 두었다.
- [repository.ts](./src/v2/core/repository.ts) - 엔티티에 대한 연산을 수행하는 인터페이스를 정의해 두었다.
- [mongodb 스키마와 v1 API 명세](./utils/v1/models/README.md)
