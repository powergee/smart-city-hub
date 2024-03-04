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
    createdAt: Date;
    modifiedAt: Date;
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
    if (query?.kindRegex) searchParams.append("kindRegex", query.kindRegex);
    if (query?.contentsRegex) searchParams.append("contentsRegex", query.contentsRegex);
    if (query?.titleRegex) searchParams.append("titleRegex", query.titleRegex);

    const res = await fetch(`${this.BASE_URL}/v1/articles?${searchParams.toString()}`, {
      cache: "no-store",
    });
    const articles = (await res.json()) as GeneralArticleDTO[];

    return articles.map((article) => ({
      id: article.articleId,
      title: article.title,
      kind: article.kind,
      contents: article.contents,
      files: article.files,
      isPublic: article.isPublic,
      modifiedBy: article.lastModifiedBy,
      modifiedAt: article.meta.modifiedAt,
    }));
  }

  async getCountByKind(kind: string): Promise<number> {
    const res = await fetch(`${this.BASE_URL}/v1/articles/count?kind=${kind}`);

    return (await res.json()).articleCount;
  }

  async getById(id: number): Promise<GeneralArticle> {
    // use fetch function
    const res = await fetch(`${this.BASE_URL}/v1/articles/${id}`);
    const article = (await res.json()) as GeneralArticleDTO;

    return {
      id: article.articleId,
      title: article.title,
      kind: article.kind,
      contents: article.contents,
      files: article.files,
      isPublic: article.isPublic,
      modifiedBy: article.lastModifiedBy,
      modifiedAt: article.meta.modifiedAt,
    };
  }

  async post(article: GeneralArticle): Promise<GeneralArticle> {
    throw new Error("Not implemented");
  }

  async delete(id: number): Promise<GeneralArticleMeta> {
    throw new Error("Not implemented");
  }
}
