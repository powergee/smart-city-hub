import Koa from "koa";
import { z } from "zod";
import { KoaRouterWrapper } from "../utils/router-wrapper";

import { ArticleService } from "../service/article.service";

export class ArticleRouter extends KoaRouterWrapper {
  private articleServ: ArticleService;

  constructor(params: { di: { articleServ: ArticleService }; options?: { prefix?: string } }) {
    super({ prefix: params.options?.prefix || "/article" });
    this.articleServ = params.di.articleServ;

    this.router.get("/", this.getArticleList()); // GET / : get articles by page, perPage, kind
    this.router.get("/count", this.getArticleCount()); // GET /count : get the number of articles by kind
    this.router.post("/", this.saveArticle()); // POST / : create or update an article
    this.router.get("/:articleId", this.getArticle()); // GET /:articleId : get an article
    this.router.delete("/:articleId", this.deleteArticle()); // DELETE /:articleId : delete an article
    this.router.get("/:articleId/thumbnail", this.getThumbnail()); // GET /:articleId/thumbnail : get the thumbnail of an article
  }

  private getArticleList = (): Koa.Middleware => {
    const querySchema = z.object({
      page: z.string().transform(Number).pipe(z.number()),
      perPage: z.string().transform(Number).pipe(z.number()),
      kind: z
        .string()
        .transform((value) => value.split(","))
        .pipe(z.string().array()),
    });

    return async (ctx) => {
      const query = querySchema.parse(ctx.query);
      const { page, perPage, kind } = query;

      let publishedOnly = true;
      if (ctx.state.auth.user?.privilege === "manager") {
        /**
         * mananger 권한을 가진 사용자는 unpublished 문서도 열람할 수 있다.
         */
        publishedOnly = false;
      }

      const res = await this.articleServ.getArticleList(page, perPage, kind, publishedOnly);
      ctx.body = res;
    };
  };

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
         * mananger 권한을 가진 사용자는 unpublished 문서도 열람할 수 있다.
         */
        publishedOnly = false;
      }

      const res = await this.articleServ.getArticleCount(kind, publishedOnly);
      ctx.body = res;
    };
  };

  private saveArticle = (): Koa.Middleware => {
    const bodySchema = z.object({
      articleId: z.number().optional(),
      title: z.string().optional(),
      contents: z.string().optional(),
      kind: z.string().optional(),
      views: z.number().optional(),
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
         * manager 권한을 가진 사용자가 아니면, unpublished 문서는 열람할 수 없다.
         */
        return ctx.throw(401, "Unauthorized");
      }

      ctx.body = res;
    };
  };

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

  private getThumbnail = (): Koa.Middleware => {
    const paramsSchema = z.object({
      articleId: z.string().transform(Number).pipe(z.number()),
    });

    return async (ctx) => {
      const params = paramsSchema.parse(ctx.params);
      const { articleId } = params;

      const res = await this.articleServ.getThumbnail(articleId, "img", {
        user: ctx.state.auth.user ?? undefined,
      });
      if (!res) {
        return ctx.throw(404, "Thumbnail not found");
      }

      if (typeof res === "string") {
        ctx.redirect(res);
      } else if (typeof res === "object") {
        ctx.type = "image/webp";
        ctx.body = res;
      }
    };
  };
}
