import { Binary } from 'mongodb';
import { IGeneralArticle } from './v1/models/generalArticleModel';
import { IMeta } from "./v1/models/meta";

export interface ICollectionInfo {
    name: string,
    type: string,
    options: Record<string, unknown>,
    info: {
        readOnly: boolean,
        uuid: Binary,
    },
    idIndex: {
        v: number,
        key: Record<string, unknown>,
        name: string,
    },
}

/* GET /v1/salt */
// Request
export interface ISaltRequest {
    userId: string
}

// Response
export interface ISaltResponse {
    userPwSalt: string
}


/* POST /v1/login */
// Request
export interface ILoginRequest {
    userId: string,
    userPwHash: string
}

// Response (API의 응답으로도 쓰이고, 토큰의 데이터 타입으로도 쓰임.)
export interface ITokenData {
    userId: string,
    userName: string,
    isManager: boolean,
    isAllowed: boolean
}


/* GET /v1/articles */
// Request
export interface IArticlesGetRequest {
    page: number,
    perPage: number,
    kindRegex: string,
    contentsRegex: string,
    titleRegex: string,
    createdByRegex: string,
    summary: boolean,
}

// Response
export interface IArticlesGetResponse {
    [index: number]: IGeneralArticle
}


/* GET /v1/articles/count */
// Request
export interface IArticlesCountGetRequest {
    kind: string
}

// Response
export interface IArticlesCountGetResponse {
    articleCount: number
}


/* POST /v1/articles */
// Request
export interface IArticlesPostRequest {
    articleId?: number,
    title: string,
    contents: string,
    images: [number],
    files: [number],
    kind: string,
    isPublic: boolean
    createdAt?: Date,
}

// Response
// IGeneralArticle과 같으므로 생략.


/* DELETE /v1/articles/:articleId */
// Request와 Response 모두 body가 없음.


/* POST /v1/register */
// Request
// Hash와 Salt를 프론트엔드에서 생성해 전송한다는 점에서 보안상 위험함.
// 연구실 서버에서 HTTPS를 사용할 수 있게 되면 즉시 구현을 수정할 것.
export interface IRegisterPostRequest {
    userId: string,
    userName: string,
    userPwHash: string,
    userPwSalt: string,
}

// Response
export interface IRegisterPostResponse {
    userId: string,
    userName: string,
    isAllowed: boolean
}

/* GET /v1/files/info/:fileId */
// Response
export interface IFilesInfoGetResponse {
    fileId: number,
    originalName: string,
    parentArticleId: number,
    meta: IMeta
}