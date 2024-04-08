import { GeneralArticle, AuthTokenGetter } from "core/model";
import { GeneralArticleRepository } from "core/repository";

export default class GeneralArticleBackendRepo implements GeneralArticleRepository {
  private readonly baseUrl: string;
  private readonly getAccessToken: AuthTokenGetter;

  constructor(params: { baseUrl: string; authTokenGetter: AuthTokenGetter }) {
    this.baseUrl = params.baseUrl;
    this.getAccessToken = params.authTokenGetter;
  }

  private convertToArticle(article: any): GeneralArticle {
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
    req?: {
      headers?: HeadersInit;
      body?: BodyInit;
    }
  ) {
    const accessToken = this.getAccessToken();

    return fetch(`${this.baseUrl}/v2/article${endpoint}`, {
      method,
      headers: {
        ...req?.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: req?.body,
    });
  }

  async getList(
    page: number,
    perPage: number,
    query?: {
      kindRegex?: string;
      contentsRegex?: string;
      titleRegex?: string;
    }
  ) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("page", page.toString());
    urlSearchParams.append("perPage", perPage.toString());
    query?.kindRegex && urlSearchParams.append("kindRegex", query.kindRegex);
    query?.contentsRegex && urlSearchParams.append("contentsRegex", query.contentsRegex);
    query?.titleRegex && urlSearchParams.append("titleRegex", query.titleRegex);

    const res = await this.fetchArticle("GET", `?${urlSearchParams.toString()}`);
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

  async post(article: Partial<GeneralArticle>) {
    const res = await this.fetchArticle("POST", "", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId: article.id,
        title: article.title,
        contents: article.contents,
        kind: article.kind,
        views: article.views,
        attachments: article.attachmentIds,
        published: article.published,
        createdBy: article.createdBy,
        createdAt: article.createdAt?.toISOString(),
      }),
    });
    if (!res.ok) {
      throw new Error(`Failed to post article: ${await res.text()}`);
    }
    const body = await res.json();

    return this.convertToArticle(body);
  }

  async getById(articleId: number) {
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
