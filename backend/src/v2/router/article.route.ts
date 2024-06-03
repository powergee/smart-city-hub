import Koa from "koa";
import { z } from "zod";
import { KoaRouterWrapper } from "../utils/router-wrapper";

import { ArticleService } from "../service/article.service";

export class ArticleRouter extends KoaRouterWrapper {
  private articleServ: ArticleService;

  constructor(params: { di: { articleServ: ArticleService }; options?: { prefix?: string } }) {
    super({ prefix: params.options?.prefix || "/article" });

    /**
     * article 서비스 레이어를 외부로부터 주입받아 사용한다.
     * 서비스 로직은 이 레이어에서 처리하지 않고, 서비스 레이어에서 처리하며,
     * 인증, 권한 등의 로직은 해당 라우터와 미들웨어에서 처리한다.
     */
    this.articleServ = params.di.articleServ;

    this.router.get("/", this.getArticleList());
    this.router.get("/count", this.getArticleCount());
    this.router.post("/", this.saveArticle());
    this.router.get("/:articleId", this.getArticle());
    this.router.delete("/:articleId", this.deleteArticle());
    this.router.get("/:articleId/thumbnail", this.getThumbnail());
  }

  /**
   * 게시글 목록을 조회한다.
   * 목록 조회 시 필터링을 위한 query parameter를 사용할 수 있으며, zod를 사용하여 이를 검증하니 아래 schema를 참고한다.
   * 특히, kindRegex는 게시글의 종류를 구분하기 위해 사용되며(예: notices|smart-news|research|seminar),
   * contentsRegex와 titleRegex는 검색 기능을 구현하기 위해 사용된다.
   *
   * 추가적으로, 응답 속도 최적화를 위해 특정 범위의 페이지를 지정해야 하며, 모든 요청에 대해 **게시글의 내용이 포함되지 않는다**.
   */
  private getArticleList = (): Koa.Middleware => {
    const querySchema = z.object({
      page: z.string().transform(Number).pipe(z.number()),
      perPage: z.string().transform(Number).pipe(z.number()),
      kindRegex: z.string().optional(),
      contentsRegex: z.string().optional(),
      titleRegex: z.string().optional(),
    });

    return async (ctx) => {
      const query = querySchema.parse(ctx.query);
      const { page, perPage, kindRegex, contentsRegex, titleRegex } = query;

      let publishedOnly = true;
      if (ctx.state.auth.user?.privilege === "manager") {
        /**
         * 누구나 게시글 목록을 조회할 수 있으나,
         * mananger 권한을 가진 사용자는 unpublished 문서도 열람할 수 있다.
         */
        publishedOnly = false;
      }

      const res = await this.articleServ.getArticleList(page, perPage, {
        kindRegex,
        contentsRegex,
        titleRegex,
        publishedOnly,
      });
      ctx.body = res;
    };
  };

  /**
   * 게시글의 개수를 조회한다.
   * 콤마(,)로 구분된 kind query parameter를 사용하여 특정 종류의 게시글만 조회할 수 있다.
   */
  private getArticleCount = (): Koa.Middleware => {
    const querySchema = z.object({
      kind: z
        .string()
        .transform((value) => value.split(","))
        .pipe(z.string().array()),
    });

    return async (ctx) => {
      const query = querySchema.parse(ctx.query);
      const { kind } = query;

      let publishedOnly = true;
      if (ctx.state.auth.user?.privilege === "manager") {
        /**
         * 누구나 게시글 목록을 조회할 수 있으나,
         * mananger 권한을 가진 사용자는 unpublished 문서도 열람할 수 있다.
         */
        publishedOnly = false;
      }

      const res = await this.articleServ.getArticleCount(kind, publishedOnly);
      ctx.body = res;
    };
  };

  /**
   * 게시글을 저장한다. 게시글을 저장할 때는 아래와 같은 body parameter를 사용한다.
   * manager 권한을 가진 사용자만 글을 작성할 수 있으며,
   * articleId가 주어지면 해당 article을 수정하고, 주어지지 않으면 새로운 article을 생성한다.
   */
  private saveArticle = (): Koa.Middleware => {
    const bodySchema = z.object({
      articleId: z.number().optional(),
      title: z.string().optional(),
      contents: z.string().optional(),
      kind: z.string().optional(),
      views: z.number().optional(),
      attachments: z.array(z.number()).optional(),
      published: z.boolean().optional(),
      createdBy: z.string().optional(),
      createdAt: z
        .string()
        .transform((value) => new Date(value))
        .optional(),
    });

    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        /**
         * manager 권한을 가진 사용자만 글을 작성할 수 있다.
         */
        return ctx.throw(401, "Unauthorized");
      }
      const body = bodySchema.parse(ctx.request.body);

      try {
        const res = await this.articleServ.saveArticle(body, user);
        if (!res) {
          return ctx.throw(404, "Article not found");
        }

        ctx.body = res;
      } catch (err) {
        ctx.throw(400, (err as Error).message);
      }
    };
  };

  /**
   * 게시글의 내용물이 포함된 상태의 특정 게시글을 조회한다.
   * manager 권한을 가진 사용자가 아니면, unpublished 문서는 열람할 수 없다.
   */
  private getArticle = (): Koa.Middleware => {
    const paramsSchema = z.object({
      articleId: z.string().transform(Number).pipe(z.number()),
    });

    return async (ctx) => {
      const params = paramsSchema.parse(ctx.params);
      const { articleId } = params;

      const res = await this.articleServ.getArticle(articleId);
      if (!res) {
        return ctx.throw(404, "Article not found");
      }

      const user = ctx.state.auth.user;
      if (res.published === false && (!user || user.privilege !== "manager")) {
        /**
         * (1) 비공개 게시글인가? (published === false)
         * (2) 그렇다면 권한이 manager인가? (assert(privilege === "manager"))
         *     아니라면, 비공개 게시글은 열람할 수 없다.
         */
        return ctx.throw(401, "Unauthorized");
      }

      ctx.body = res;
    };
  };

  /**
   * 특정 게시글을 삭제한다.
   */
  private deleteArticle = (): Koa.Middleware => {
    const paramsSchema = z.object({
      articleId: z.string().transform(Number).pipe(z.number()),
    });

    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        /**
         * manager 권한을 가진 사용자만 글을 삭제할 수 있다.
         */
        return ctx.throw(401, "Unauthorized");
      }

      const params = paramsSchema.parse(ctx.params);
      const { articleId } = params;

      const res = await this.articleServ.deleteArticle(articleId);
      if (!res) {
        return ctx.throw(404, "Article not found");
      }

      ctx.body = res;
    };
  };

  /**
   * 게시글의 썸네일을 조회한다.
   * [img]
   * 게시글의 썸네일은 이미지 파일이거나, 이미지 파일의 경로일 수 있다.
   * 이미지 파일의 경우, 이미지 파일을 반환하고, 이미지 파일의 경로일 경우, 해당 경로로 리다이렉트한다.
   * [attachment]
   * 게시글의 첨부파일로부터 썸네일을 생성할 수도 있다. 예를 들어 pdf 파일의 첫 페이지를 썸네일로 반환하는 식이다.
   */
  private getThumbnail = (): Koa.Middleware => {
    const paramsSchema = z.object({
      articleId: z.string().transform(Number).pipe(z.number()),
    });
    const querySchema = z.object({
      from: z.enum(["img", "attachment"]),
    });

    return async (ctx) => {
      const params = paramsSchema.parse(ctx.params);
      const query = querySchema.parse(ctx.query);
      const { articleId } = params;

      let thumbnail = null;
      try {
        switch (query.from) {
          case "img":
            thumbnail = await this.articleServ.getContentsThumbnail(articleId);
            break;
          case "attachment":
            thumbnail = await this.articleServ.getAttachmentThumbnail(articleId);
            break;
        }
      } catch (err) {
        return ctx.throw(400, (err as Error).message);
      }

      if (!thumbnail) {
        return ctx.throw(404, "Thumbnail not found");
      }
      if (ctx.state.auth.user?.privilege !== "manager" && thumbnail.article.published === false) {
        // manager 권한을 가진 사용자가 아니면, unpublished 문서의 미리보기 이미지는 열람할 수 없다.
        return ctx.throw(401, "Unauthorized");
      }

      if (typeof thumbnail.data === "string") {
        return ctx.redirect(thumbnail.data);
      }
      ctx.type = "image/webp";
      ctx.body = thumbnail.data;
    };
  };
}
