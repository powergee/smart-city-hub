import { GeneralArticle, User } from "../core/model";
import { GeneralArticleRepository } from "../core/repository";

export class ArticleService {
  readonly generalArticleRepo: GeneralArticleRepository;

  constructor(generalArticleRepo: GeneralArticleRepository) {
    this.generalArticleRepo = generalArticleRepo;
  }

  async getArticleList(
    page: number,
    perPage: number,
    kind: string[],
    publishedOnly: boolean = true
  ): Promise<Omit<GeneralArticle, "contents">[]> {
    const articles = await this.generalArticleRepo.query(
      { page, perPage, kindRegex: kind.map((k) => `^${k}$`).join("|"), publishedOnly },
      { summary: true }
    );

    return articles;
  }

  async getArticleCount(kind: string[], publishedOnly: boolean = true): Promise<number> {
    const count = await this.generalArticleRepo.count(
      kind.map((k) => `^${k}$`).join("|"),
      publishedOnly
    );
    return count;
  }

  async saveArticle(article: Partial<GeneralArticle>, user: User): Promise<GeneralArticle | null> {
    if (!article.articleId) {
      /**
       * articleId가 없으면 새로운 문서를 생성한다.
       */
      if (!article.title || !article.contents || !article.kind) {
        throw new Error("title, contents, and kind are required.");
      }

      const newArticle: Omit<GeneralArticle, "articleId"> = {
        title: article.title,
        contents: article.contents,
        kind: article.kind,
        /**
         * 문서의 수정 메타데이터는 서버에서 설정하도록 하고, 그 외의 메타데이터는 외부에서 설정할 수 있도록 한다.
         * 가령, 글을 게시한 사용자 및 일자를 임의로 설정할 수 있는 것이다.
         */
        views: article.views ?? 0,
        published: article.published ?? false,
        createdBy: article.createdBy ?? user.userId,
        createdAt: article.createdAt ?? new Date(),
        modifiedBy: user.userId, // forced
        modifiedAt: new Date(), // forced
      };

      const saved = await this.generalArticleRepo.create(newArticle);
      return saved;
    } else {
      /**
       * articleId가 있으면 해당 문서를 업데이트한다.
       */
      const prevArticle = await this.generalArticleRepo.find(article.articleId);
      if (!prevArticle) {
        return null;
      }

      const updatedArticle: GeneralArticle = {
        articleId: article.articleId,
        /**
         * 인자로 받은 article 객체의 필드 중 값이 있는 것들만 업데이트한다.
         * 그리고 이 또한 문서의 수정 메타데이터는 서버에서 설정하도록 하고, 그 외의 메타데이터는 외부에서 설정할 수 있도록 한다.
         */
        title: article.title ?? prevArticle.title,
        contents: article.contents ?? prevArticle.contents,
        kind: article.kind ?? prevArticle.kind,
        views: article.views ?? prevArticle.views,
        published: article.published ?? prevArticle.published,
        createdBy: article.createdBy ?? prevArticle.createdBy,
        createdAt: article.createdAt ?? prevArticle.createdAt,
        modifiedBy: user.userId, // forced
        modifiedAt: new Date(), // forced
      };

      const saved = await this.generalArticleRepo.update(updatedArticle);
      return saved;
    }
  }

  async getArticle(articleId: number): Promise<GeneralArticle | null> {
    const article = await this.generalArticleRepo.find(articleId);
    if (!article) {
      return null;
    }

    const countUpArticle: Partial<GeneralArticle> = {
      articleId,
      views: article.views + 1,
    };
    const res = await this.generalArticleRepo.update(countUpArticle);
    if (!res) {
      throw new Error(`Failed to count up views. articleId: ${articleId}`);
    }

    return res;
  }

  async deleteArticle(articleId: number): Promise<GeneralArticle | null> {
    const deleted = await this.generalArticleRepo.delete(articleId);
    return deleted;
  }

  /**
   * 게시글의 미리보기 이미지를 가져온다. 미리보기 이미지는 resize하여 webp 형식으로 반환한다.
   *
   * img 태그에 대해서는, 첫 번째로 나타나는 이미지에 대해 미리보기를 생성한다.
   * 1. src 속성이 URL이라면, 해당 URL을 그대로 반환한다.
   * 2. src 속성이 base64로 인코딩된 이미지라면, 해당 이미지 버퍼를 반환한다.
   *
   * 첨부파일에 대해서는, 첫 번째로 나타나는 파일에 대해 미리보기를 생성한다.
   * 1. pdf 파일이라면, 첫 페이지를 이미지로 변환하여 버퍼로 반환한다.
   * @param articleId
   */
  async getThumbnail(
    articleId: number,
    type: "img" | "attachment",
    options?: {
      user?: User;
      resizer?: (buffer: Buffer) => Promise<Buffer>;
    }
  ): Promise<string | Buffer | null> {
    const article = await this.generalArticleRepo.find(articleId);
    const resize = options?.resizer || ((buffer) => Promise.resolve(buffer));

    if (!article) {
      return null;
    }
    if (article.published === false) {
      if (!options?.user || options.user.privilege !== "manager") {
        throw new Error("Unauthorized access to unpublished article.");
      }
    }

    if (type === "img") {
      /**
       * 게시글의 본문에서 이미지를 찾아 미리보기 이미지를 생성한다.
       */
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const imgSrc = imgRegex.exec(article.contents);
      if (!imgSrc) {
        return null;
      }
      const imgSrcUrl = imgSrc[1];

      if (imgSrcUrl.startsWith("data:image")) {
        /**
         * base64로 인코딩된 이미지인 경우 (data:image/png;base64,~~~)
         */
        const base64 = imgSrcUrl.split(",")[1];
        const buffer = Buffer.from(base64, "base64");
        return await resize(buffer);
      } else if (imgSrcUrl.startsWith("http")) {
        /**
         * URL 이미지인 경우
         */
        return imgSrcUrl;
      } else {
        return null;
      }
    } else if (type === "attachment") {
      return null; // TODO: implement
    } else {
      return null;
    }
  }
}
