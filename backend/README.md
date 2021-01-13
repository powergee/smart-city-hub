# DB 스키마

## 공통 메타 데이터

모든 스키마는 아래 데이터를 meta로 포함한다. (아래에 있는 Date는 모두 UTC 시간이다.)

```js
{
    createAt: Date,
    modifiedAt: Date
}
```

## 유저 정보

```js
{
    userId: string,
    userName: string,
    userPwHash: string,
    userPwSalt: string,
    isManager: boolean,
    isAllowed: boolean,
    meta: {
        createAt: Date,
        modifiedAt: Date
    }
}
```

## 이미지 및 파일 메타데이터

실제 파일 데이터는 로컬 파일로 저장되고, 그에 대한 메타 데이터는 아래와 같이 저장.

```js
{
    fileId: number,
    originalName: string,
    localPath: string,
    meta: {
        createAt: Date,
        modifiedAt: Date
    }
}
```

## 일반 게시글

```js
{
    articleId: number,
    contents: string,
    images: [number],
    files: [number],
    kind: string,
    views: number,
    meta: {
        createAt: Date,
        modifiedAt: Date
    }
}
```

# REST API

## POST /v1/login

로그인을 수행한다.

### Request Body

2021년 1월 11일 기준, 연구실 서버에서 HTTPS를 사용할 수 없으므로, 패스워드 평문을 보내는 것이 아니라, 해쉬값을 보내야 한다.

```js
{
    userId: "id",
    userPwHash: "pw"
}
```

### Response

```js
{
    userId: "id",
    userName: "name"
}
```

## POST /v1/logout

로그아웃을 수행한다. 내부적으로 accessToken을 null로 설정한다.

## GET /v1/salt

ID에 해당하는 Salt를 가져온다.

### Query Parameter

```js
{
    userId: "id"
}
```

### Response

```js
{
    userPwSalt: "salt"
}
```

## GET /v1/articles

주어진 조건에 따라 게시글을 쿼리한다.

### Query Parameter

아래 조건에 맞게 쿼리 조건을 지정할 수 있다.

1. page: 목록을 가져올 페이지 번호 (1부터 시작)
2. perPage: 한 페이지 당 표시할 글의 개수 (1 이상이여야 함)
3. kind: 글의 종류

```js
{
    page: pageNumber,
    perPage: countOfElementsInOnePage,
    kind: "Kind of Articles"
}
```

### Response

```js
[
    {
        articleId: number,
        contents: string,
        images: [number],
        files: [number],
        kind: string,
        views: number,
        meta: {
            createAt: Date,
            modifiedAt: Date
        }
    },
    ...
]
```

## GET /v1/articles/count

주어진 kind에 해당하는 글이 몇 개인지 반환한다.

### Query Parameter

```js
{
    kind: "Kind of Articles"
}
```

### Response

```js
{
    articleCount: countOfArticles
}
```

## POST /v1/articles

새로운 글을 추가하거나 수정한다.

### Request Body

articleId가 undefined라면 새로운 글을 추가하고, 그렇지 않다면 기존의 글을 수정한다.

```js
{
    articleId: number | undefined,
    contents: string,
    images: [number],
    files: [number],
    kind: string
}
```

### Response

기존의 일반 게시물의 인터페이스(IGeneralArticle)과 같다.

```js
{
    articleId: number,
    contents: string,
    images: [number],
    files: [number],
    kind: string,
    views: number,
    meta: {
        createAt: Date,
        modifiedAt: Date
    }
}
```

## DELETE

## POST /v1/register

주어진 정보를 바탕으로 회원가입을 신청한다.
DB에 회원 정보가 추가되지만, isAllowed가 false인 상태로 추가되며 /v1/login에서 로그인 시도를 할 때 isAllowed가 true인지 확인하게 된다.

### Request Body

```js
{
    userId: string,
    userName: string,
    userPwHash: string,
    userPwSalt: string,
}
```

### Response

```js
{
    userId: string,
    userName: string,
    userPwHash: string,
    userPwSalt: string,
    isManager: boolean,
    isAllowed: boolean,
    meta: {
        createAt: Date,
        modifiedAt: Date
    }
}
```