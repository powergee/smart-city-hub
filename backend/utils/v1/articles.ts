import Router from "koa-router";
import Koa from 'koa';
import BodyParser from "koa-bodyparser"
import Cookie from "koa-cookie";
import { IArticlesGetRequest, IArticlesGetResponse } from "../types";
import { IArticlesCountGetRequest, IArticlesCountGetResponse } from "../types";
import { IArticlesPostRequest } from "../types";
import { GeneralArticleModel } from "./models/generalArticleModel";
import validateToken from "./validateAuth";

const router = new Router();

router.use(BodyParser());
router.use(Cookie());

router.get("/", async (ctx: Koa.Context) => {
    const body:IArticlesGetRequest = ctx.request.body;

    if (body.page === undefined || body.perPage === undefined || body.kind === undefined ||
        body.page < 1 || body.perPage < 1) {
        ctx.throw(400, "At least one parameter is not valid. The body was: " + JSON.stringify(ctx.request.body));
    }
    
    // 현재 manager 계정으로 로그인 되어 있다면 공개된 게시글은 물론 비공개된 게시글도 반환해야 한다.
    const token = validateToken(ctx);
    if (token !== undefined && token.isManager) {
        const res:IArticlesGetResponse = await GeneralArticleModel.find()
            .where("kind").equals(body.kind)
            .sort({ articleId: -1 })
            .skip((body.page-1)*body.perPage)
            .limit(body.perPage).exec();
        ctx.response.body = res;
    } else {
        const res:IArticlesGetResponse = await GeneralArticleModel.find()
            .where("kind").equals(body.kind)
            .where("isPublic").equals(true)
            .sort({ articleId: -1 })
            .skip((body.page-1)*body.perPage)
            .limit(body.perPage).exec();
        ctx.response.body = res;
    }
});

router.get("/count", async (ctx: Koa.Context) => {
    const body:IArticlesCountGetRequest = ctx.request.body;
    
    if (body.kind === undefined) {
        ctx.throw(400, "kind is not valid. The body was: " + JSON.stringify(ctx.request.body));
    }

    // 현재 manager 계정으로 로그인 되어 있다면 공개된 게시글은 물론 비공개된 게시글도 세야 한다.
    const token = validateToken(ctx);
    let count = await GeneralArticleModel.countDocuments({ kind: body.kind, isPublic: true }).exec();
    if (token !== undefined && token.isManager) {
        count += await GeneralArticleModel.countDocuments({ kind: body.kind, isPublic: false }).exec();
    }

    const res:IArticlesCountGetResponse = {
        articleCount: count
    };

    ctx.response.body = res;
});

router.post("/", async (ctx: Koa.Context) => {
    const token = validateToken(ctx);

    if (token === undefined) {
        ctx.throw(401, "It is unauthorized.");
    }

    const body:IArticlesPostRequest = ctx.request.body;

    if (body.contents === undefined || body.files === undefined || body.title === undefined ||
        body.images === undefined || body.kind === undefined || body.isPublic === undefined) {
        ctx.throw(400, "At least one parameter is not valid. The body was: " + JSON.stringify(ctx.request.body));
    }

    body.files.forEach((element: number) => {
        if (element === undefined) {
            ctx.throw(400, "At least one file number is not valid. The body was: " + JSON.stringify(ctx.request.body));
        }
    });

    body.images.forEach((element: number) => {
        if (element === undefined) {
            ctx.throw(400, "At least one image number is not valid. The body was: " + JSON.stringify(ctx.request.body));
        }
    });

    // articleId가 undefined라면 새로운 글을 추가하고,
    // 그렇지 않다면 기존의 글을 수정한다.

    if (body.articleId === undefined) {
        const newArticle = new GeneralArticleModel();

        body.files.forEach((element: number) => {
            newArticle.files.push(element);
        });

        body.images.forEach((element: number) => {
            newArticle.images.push(element);
        });

        newArticle.title = body.title;
        newArticle.contents = body.contents;
        newArticle.kind = body.kind;
        newArticle.isPublic = body.isPublic;
        newArticle.views = 0;
        newArticle.createdBy = token.userName
        newArticle.lastModifiedBy = "";

        newArticle.save();
        ctx.response.body = newArticle;
    } else {
        const prevArticle = await GeneralArticleModel.findOne({ articleId: body.articleId }).exec();
        if (prevArticle === null) {
            ctx.throw(404, "There's no article with articleId = " + body.articleId);
        }

        prevArticle.files = body.files;
        prevArticle.images = body.images;

        prevArticle.title = body.title;
        prevArticle.contents = body.contents;
        prevArticle.kind = body.kind;
        prevArticle.isPublic = body.isPublic;
        prevArticle.lastModifiedBy = token.userName;
        prevArticle.meta.modifiedAt = new Date();

        prevArticle.save();
        ctx.response.body = prevArticle;
    }
});

router.delete("/:articleId", async (ctx: Koa.Context) => {
    const token = validateToken(ctx);

    if (token === undefined) {
        ctx.throw(401, "It is unauthorized.");
    }

    if (isNaN(Number(ctx.params.articleId))) {
        ctx.throw(400, "articleId must be a number.");
    }

    const existing = await GeneralArticleModel.findOne({ articleId: Number(ctx.params.articleId) }).exec();
    if (existing === null) {
        ctx.throw(404, "There's no article with articleId = " + ctx.params.articleId);
    }

    GeneralArticleModel.deleteOne({ articleId: Number(ctx.params.articleId) }).exec();
    ctx.response.status = 200;
});

export default router