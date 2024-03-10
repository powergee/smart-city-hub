import { GeneralArticle, GeneralArticleMeta } from "core/model";
import { GeneralArticleRepository } from "core/repository";

type GeneralArticleDTO = {
  articleId: number;
  title: string;
  contents: string;
  images: number[];
  files: number[];
  kind: string;
  views: number;
  isPublic: boolean;
  createdBy: string;
  lastModifiedBy: string;
  meta: {
    createdAt: string;
    modifiedAt: string;
  };
};

export default class GeneralArticleBackendRepo implements GeneralArticleRepository {
  private readonly BASE_URL = "https://global.urbanscience.uos.ac.kr";

  async getList(
    page: number,
    perPage: number,
    query?: { kindRegex?: string; contentsRegex?: string; titleRegex?: string }
  ): Promise<GeneralArticleMeta[]> {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page.toString());
    searchParams.append("perPage", perPage.toString());
    searchParams.append("summary", "true");
    if (query?.kindRegex) searchParams.append("kindRegex", query.kindRegex);
    if (query?.contentsRegex) searchParams.append("contentsRegex", query.contentsRegex);
    if (query?.titleRegex) searchParams.append("titleRegex", query.titleRegex);

    const res = await fetch(`${this.BASE_URL}/v1/articles?${searchParams.toString()}`);
    const articles = (await res.json()) as GeneralArticleDTO[];

    return articles.map((article) => ({
      id: article.articleId,
      title: article.title,
      kind: article.kind,
      files: article.files,
      views: article.views,
      isPublic: article.isPublic,
      createdAt: new Date(article.meta.createdAt),
      createdBy: article.createdBy,
      modifiedAt: new Date(article.meta.modifiedAt),
      modifiedBy: article.lastModifiedBy,
    }));
  }

  async getCountByKind(kind: string): Promise<number> {
    const res = await fetch(`${this.BASE_URL}/v1/articles/count?kind=${kind}`);

    return (await res.json()).articleCount;
  }

  async getById(id: number): Promise<GeneralArticle> {
    // use fetch function
    const res = await fetch(`${this.BASE_URL}/v1/articles/${id}`, { cache: "no-store" });
    const article = (await res.json()) as GeneralArticleDTO;

    return {
      id: article.articleId,
      title: article.title,
      kind: article.kind,
      contents: article.contents,
      files: article.files,
      views: article.views,
      isPublic: article.isPublic,
      createdAt: new Date(article.meta.createdAt),
      createdBy: article.createdBy,
      modifiedAt: new Date(article.meta.modifiedAt),
      modifiedBy: article.lastModifiedBy,
    };
  }

  async post(article: GeneralArticle): Promise<GeneralArticle> {
    throw new Error("Not implemented");
  }

  async delete(id: number): Promise<GeneralArticleMeta> {
    throw new Error("Not implemented");
  }
}
