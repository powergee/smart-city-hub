# DB 스키마

## 공통 메타 데이터

모든 스키마는 아래 데이터를 meta로 포함한다. (아래에 있는 Date는 모두 UTC 시간이다.)

```json
{
    createAt: Date,
    modifiedAt: Date
}
```

## 유저 정보

```json
{
    userId: string,
    userName: string,
    userPwHash: string,
    isAllowed: boolean,
    isManager: boolean,
    meta: {
        createAt: Date,
        modifiedAt: Date
    }
}
```

## 이미지 및 파일 메타데이터

실제 파일 데이터는 로컬 파일로 저장되고, 그에 대한 메타 데이터는 아래와 같이 저장.

```json
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

```json
{
    postId: number,
    contents: string,
    images: [number],
    files: [number],
    additionalFields: {
        key: [string],
        value: [string]
    },
    meta: {
        createAt: Date,
        modifiedAt: Date
    }
}
```