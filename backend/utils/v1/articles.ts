import Router from "koa-router";
import Koa from 'koa';
import BodyParser from "koa-bodyparser"
import Cookie from "koa-cookie";
import { IArticlesGetRequest, IArticlesGetResponse } from "../types";
import { IArticlesCountGetRequest, IArticlesCountGetResponse } from "../types";
import { IArticlesPostRequest } from "../types";
import { GeneralArticleModel, IGeneralArticle } from "./models/generalArticleModel";
import { FileModel } from "./models/fileModel"
import validateToken from "./validateAuth";

const router = new Router();

router.use(BodyParser({ jsonLimit: '64mb' })); // TODO: set jsonLimit by environment variable
router.use(Cookie());

router.get("/", async (ctx: Koa.Context) => {
    const body:IArticlesGetRequest = {
        page: Number(ctx.query.page),
        perPage: Number(ctx.query.perPage),
        kindRegex: ctx.query.kindRegex,
        contentsRegex: ctx.query.contentsRegex,
        titleRegex: ctx.query.titleRegex,
        createdByRegex: ctx.query.createdByRegex,
        summary: ctx.query.summary === 'true'
    };

    if (body.page === undefined || body.perPage === undefined || isNaN(body.page) || isNaN(body.perPage) ||
        body.page < 1 || body.perPage < 1) {
        ctx.throw(400, "At least one parameter is not valid. The query was: " + JSON.stringify(ctx.query));
    }

    let cursor = GeneralArticleModel.find();
    
    if (body.kindRegex) {
        const kindRegex = new RegExp(body.kindRegex);
        cursor = cursor.where("kind").equals(kindRegex);
    }
    if (body.titleRegex) {
        const titleRegex = new RegExp(body.titleRegex);
        cursor = cursor.where("title").equals(titleRegex);
    }
    if (body.contentsRegex) {
        const contentsRegex = new RegExp(body.contentsRegex);
        cursor = cursor.where("contents").equals(contentsRegex);
    }
    if (body.createdByRegex) {
        const createdByRegex = new RegExp(body.createdByRegex);
        cursor = cursor.where("createdByRegex").equals(createdByRegex);
    }

    // 현재 manager 계정으로 로그인 되어 있다면 공개된 게시글은 물론 비공개된 게시글도 반환해야 한다.
    // 하지만 그 외 모든 경우에는 공개된 게시글만 반환한다.
    const token = validateToken(ctx);
    if (token === undefined || !token.isManager) {
        cursor = cursor.where("isPublic").equals(true);
    }

    if (body.summary) {
        cursor = cursor.select("-contents");
    }
    
    cursor = cursor.sort({ articleId: -1 });
    cursor = cursor.skip((body.page - 1) * body.perPage);
    cursor = cursor.limit(body.perPage);

    const res:IArticlesGetResponse = await cursor.exec();
    ctx.response.body = res;
});

router.get("/count", async (ctx: Koa.Context) => {
    const body:IArticlesCountGetRequest = ctx.query;
    
    if (body.kind === undefined) {
        ctx.throw(400, "kind is not valid. The body was: " + JSON.stringify(ctx.query));
    }

    const kindRegex = new RegExp(body.kind);
    // 현재 manager 계정으로 로그인 되어 있다면 공개된 게시글은 물론 비공개된 게시글도 세야 한다.
    const token = validateToken(ctx);
    let count = await GeneralArticleModel.countDocuments({ kind: kindRegex, isPublic: true }).exec();
    if (token !== undefined && token.isManager) {
        count += await GeneralArticleModel.countDocuments({ kind: kindRegex, isPublic: false }).exec();
    }

    const res:IArticlesCountGetResponse = {
        articleCount: count
    };

    ctx.response.body = res;
});

router.get("/:articleId", async (ctx: Koa.Context) => {
    const articleId = Number(ctx.params.articleId);

    if (articleId === undefined || isNaN(articleId)) {
        ctx.throw(400, "articleId is not valid. The parameter was " + JSON.stringify(ctx.params));
    }

    const res:IGeneralArticle|null = await GeneralArticleModel.findOne({ articleId: articleId }).exec();

    if (res === null) {
        ctx.throw(404, "There's no article with articleId = " + ctx.params.articleId);
    }

    const token = validateToken(ctx);
    if ((token === undefined || !token.isManager) && !res.isPublic) {
        // 글이 비공개 상태인데 manager 권한이 없다면 글을 확인할 수 없다.
        ctx.throw(401, "It is unauthorized.");
    } else {
        // 현재 manager 계정으로 로그인 되어 있다면 공개된 게시글은 물론 비공개된 게시글도 확인할 수 있다.
        // 조회수를 1 증가시킨다.
        res.views += 1;
        res.save();
        ctx.response.body = res;
    }
});

router.get("/thumbnail/:articleId", async (ctx: Koa.Context) => {
    // get thumbnail image from GeneralArticle.contents
    // using img tag with src attribute
    // if it is encoded in base64, decode it and send it as a response(with proper content-type)
    // if it is just a link, send it as a response(with proper content-type)
    // if it is not found, send 404

    const articleId = Number(ctx.params.articleId);

    if (articleId === undefined || isNaN(articleId)) {
        ctx.throw(400, "articleId is not valid. The parameter was " + JSON.stringify(ctx.params));
    }

    const res = await GeneralArticleModel.findOne({ articleId }).exec() as IGeneralArticle;
    if (res === null) {
        ctx.throw(404, "There's no article with articleId = " + ctx.params.articleId);
    }

    const token = validateToken(ctx);
    if (!res.isPublic && (token === undefined || !token.isManager)) {
        ctx.throw(401, "It is unauthorized.");
    }

    const imgRegex = /<img(.|\n)*?src="(.*?)"/;
    const imgRegexExec = imgRegex.exec(res.contents);
    if (imgRegexExec === null) {
        ctx.throw(404, "There's no image in the article with articleId = " + ctx.params.articleId);
    }

    const imgSrc = imgRegexExec[2];
    if (imgSrc.startsWith("data:image")) {
        const base64 = imgSrc.split(",")[1];
        const buffer = Buffer.from(base64, "base64");
        ctx.response.body = buffer;

        const type = imgSrc.split(":")[1].split(';')[0]; // data:image/png;base64,~~~
        ctx.response.type = type;
    }

    if (imgSrc.startsWith("http")) {
        ctx.response.redirect(imgSrc);
    }
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

        const saved = await newArticle.save();

        saved.files.forEach((element: number) => {
            FileModel.findOneAndUpdate({ fileId: element }, { parentArticleId: saved.articleId });
        });

        saved.images.forEach((element: number) => {
            FileModel.findOneAndUpdate({ fileId: element }, { parentArticleId: saved.articleId });
        });

        ctx.response.body = saved;
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
        if (body.createdAt) {
            prevArticle.meta.createdAt = new Date(body.createdAt);
        }
        const saved = await prevArticle.save();

        saved.files.forEach((element: number) => {
            FileModel.findOneAndUpdate({ fileId: element }, { parentArticleId: saved.articleId });
        });

        saved.images.forEach((element: number) => {
            FileModel.findOneAndUpdate({ fileId: element }, { parentArticleId: saved.articleId });
        });

        ctx.response.body = saved;
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