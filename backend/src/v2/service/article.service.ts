import { GeneralArticle, User, ImageResizer, ThumbnailGenerator } from "../core/model";
import { FileItemRepository, GeneralArticleRepository } from "../core/repository";

type Thumbnail = {
  data: Buffer | string;
  article: GeneralArticle;
};
type ThumbnailCache = {
  data: Buffer | string;
  cachedAt: Date;
};

export class ArticleService {
  readonly generalArticleRepo: GeneralArticleRepository;
  readonly fileItemRepo: FileItemRepository;
  readonly imageResizer: ImageResizer;
  readonly thumbnailGenerator: ThumbnailGenerator;

  readonly contentThumbnailCache: Map<number, ThumbnailCache>;
  readonly attachmentThumbnailCache: Map<number, ThumbnailCache>;

  constructor(params: {
    di: { generalArticleRepo: GeneralArticleRepository; fileItemRepo: FileItemRepository };
    options?: {
      imageResizer?: ImageResizer;
      thumbnailGenerator?: ThumbnailGenerator;
    };
  }) {
    this.generalArticleRepo = params.di.generalArticleRepo;
    this.fileItemRepo = params.di.fileItemRepo;

    this.imageResizer = params.options?.imageResizer || ((buffer) => Promise.resolve(buffer));
    this.thumbnailGenerator = params.options?.thumbnailGenerator || (() => Promise.resolve(null));

    this.contentThumbnailCache = new Map();
    this.attachmentThumbnailCache = new Map();
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
        attachments: article.attachments ?? [],
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

      const updatedArticle: Partial<GeneralArticle> = {
        ...article,
        /**
         * 인자로 받은 article 객체의 필드 중 값이 있는 것들만 업데이트한다.
         * 그리고 이 또한 문서의 수정 메타데이터는 서버에서 설정하도록 하고, 그 외의 메타데이터는 외부에서 설정할 수 있도록 한다.
         */
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
   * 게시글의 미리보기 이미지를 가져온다.
   * img 태그에 대해서는, 첫 번째로 나타나는 이미지에 대해 미리보기를 생성한다.
   * 1. src 속성이 URL이라면, 해당 URL을 그대로 반환한다.
   * 2. src 속성이 base64로 인코딩된 이미지라면, 해당 이미지 버퍼를 반환한다.
   * @param articleId
   */
  async getContentsThumbnail(articleId: number): Promise<Thumbnail | null> {
    const article = await this.generalArticleRepo.find(articleId);
    if (!article) {
      return null;
    }

    // 미리보기 이미지 캐시 불러오기
    if (this.contentThumbnailCache.has(articleId)) {
      const cache = this.contentThumbnailCache.get(articleId)!;
      if (cache.cachedAt.getTime() > article.modifiedAt.getTime()) {
        return { article, data: cache.data };
      }
    }

    let thumbnail: Buffer | string | null = null;
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
      thumbnail = await this.imageResizer(buffer);
    } else if (imgSrcUrl.startsWith("http")) {
      /**
       * URL 이미지인 경우
       */
      thumbnail = imgSrcUrl;
    }

    if (!thumbnail) {
      return null;
    }

    this.contentThumbnailCache.set(articleId, { data: thumbnail, cachedAt: new Date() }); // 캐시 저장
    return { article, data: thumbnail };
  }

  async getAttachmentThumbnail(articleId: number): Promise<Thumbnail | null> {
    const article = await this.generalArticleRepo.find(articleId);
    if (!article) {
      return null;
    }

    // 미리보기 이미지 캐시 불러오기
    if (this.attachmentThumbnailCache.has(articleId)) {
      const cache = this.attachmentThumbnailCache.get(articleId)!;
      if (cache.cachedAt.getTime() > article.modifiedAt.getTime()) {
        return { article, data: cache.data };
      }
    }

    if (article.attachments.length < 1) {
      return null;
    }
    const fileItem = await this.fileItemRepo.get(article.attachments[0]);
    if (!fileItem) {
      return null;
    }
    let thumbnail = await this.thumbnailGenerator(fileItem);
    if (!thumbnail) {
      return null;
    }
    thumbnail = await this.imageResizer(thumbnail);

    this.attachmentThumbnailCache.set(articleId, { data: thumbnail, cachedAt: new Date() }); // 캐시 저장
    return { article, data: thumbnail };
  }
}
