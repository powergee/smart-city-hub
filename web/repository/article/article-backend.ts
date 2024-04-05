import { Article, AuthTokenGetter } from "core/model";
import { ArticleRepository } from "core/repository";

export class ArticleBackendRepo implements ArticleRepository {
  private readonly baseUrl: string;
  private readonly getAccessToken: AuthTokenGetter;

  constructor(params: { baseUrl: string; authTokenGetter: AuthTokenGetter }) {
    this.baseUrl = params.baseUrl;
    this.getAccessToken = params.authTokenGetter;
  }

  private convertToArticle(article: any): Article {
    return {
      id: article.articleId as number,
      title: article.title as string,
      kind: article.kind as string,
      contents: article.contents as string,
      attachmentIds: article.attachments as number[],
      published: article.published as boolean,
      views: article.views as number,
      createdBy: article.createdBy as string,
      createdAt: new Date(article.createdAt),
      modifiedBy: article.modifiedBy as string,
      modifiedAt: new Date(article.modifiedAt),
    };
  }

  private fetchArticle(
    method: "GET" | "POST" | "DELETE",
    endpoint?: string,
    request?: {
      headers?: HeadersInit;
      body?: BodyInit;
    }
  ) {
    const accessToken = this.getAccessToken();

    return fetch(`${this.baseUrl}/v2/article${endpoint}`, {
      method,
      headers: {
        ...request?.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: request?.body,
    });
  }

  async getList(page: number, perPage: number, kind: string | string[]) {
    if (Array.isArray(kind)) {
      kind = kind.join(",");
    }

    const res = await this.fetchArticle("GET", `?perPage=${perPage}&page=${page}&kind=${kind}`);
    const body = await res.json();

    return body.map(this.convertToArticle);
  }

  async getCountByKind(kind: string | string[]) {
    if (Array.isArray(kind)) {
      kind = kind.join(",");
    }

    const res = await this.fetchArticle("GET", `/count?kind=${kind}`);
    const body = await res.text();

    return parseInt(body);
  }

  async post(article: Partial<Article>) {
    const res = await this.fetchArticle("POST", "", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    if (!res.ok) {
      throw new Error(`Failed to post article: ${await res.text()}`);
    }
    const body = await res.json();

    return this.convertToArticle(body);
  }

  async get(articleId: number) {
    const res = await this.fetchArticle("GET", `/${articleId}`);
    if (!res.ok) {
      throw new Error(`Failed to get article: ${await res.text()}`);
    }
    const body = await res.json();

    return this.convertToArticle(body);
  }

  async delete(articleId: number) {
    const res = await this.fetchArticle("DELETE", `/${articleId}`);
    if (!res.ok) {
      throw new Error(`Failed to delete article: ${await res.text()}`);
    }
    const body = await res.json();

    return this.convertToArticle(body);
  }
}
