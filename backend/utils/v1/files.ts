import Router from "koa-router";
import Koa from 'koa';
import KoaBody from "koa-body"
import Cookie from "koa-cookie";
import fs from "fs";
import path from "path";
import env from "../../env"
import { FileModel, IFile } from "./models/fileModel";
import { IFilesInfoGetResponse } from "../types"
import validateToken from "./validateAuth";

const router = new Router();

const koaBodyConfig = {
    formLimit: '1mb',
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024, // 최대 200MB 까지 허용
        keepExtensions: true,
    }
};

router.use(Cookie());

router.post("/upload", KoaBody(koaBodyConfig), async (ctx: Koa.Context) => {
    const token = validateToken(ctx);

    // 관리자 계정이 아니라면 업로드 권한 없음.
    if (token === undefined || !token.isManager) {
        ctx.throw(401, "It is unauthorized.");
    }

    if (ctx.request.files === undefined) {
        ctx.throw(400, "There's no file data.");
    }

    const file = ctx.request.files.file as any;

    const dest = path.join(env.filesDirectory, path.basename(file.path));
    fs.copyFileSync(file.path, dest)

    const newFile = new FileModel();
    newFile.originalName = file.name;
    newFile.localPath = dest;
    newFile.parentArticleId = -1;
    const saved = await newFile.save();

    ctx.response.body = saved.fileId;
});

router.get("/download/:fileId", async (ctx: Koa.Context) => {
    const fileId = Number(ctx.params.fileId);

    if (fileId === undefined || isNaN(fileId)) {
        ctx.throw(400, "fileId is not valid. The parameter was " + JSON.stringify(ctx.params));
    }

    const res:IFile = await FileModel.findOne({ fileId: fileId }).exec();

    if (res === null) {
        ctx.throw(404, "There's no file with fileId = " + ctx.params.fileId);
    }

    const src = fs.createReadStream(res.localPath);
    ctx.attachment(res.originalName);
    ctx.body = src;
});

router.get("/info/:fileId", async (ctx: Koa.Context) => {
    const fileId = Number(ctx.params.fileId);

    if (fileId === undefined || isNaN(fileId)) {
        ctx.throw(400, "fileId is not valid. The parameter was " + JSON.stringify(ctx.params));
    }

    const res:IFile = await FileModel.findOne({ fileId: fileId }).exec();

    if (res === null) {
        ctx.throw(404, "There's no file with fileId = " + ctx.params.fileId);
    }
    
    const result:IFilesInfoGetResponse = {
        fileId: res.fileId,
        originalName: res.originalName,
        parentArticleId: res.parentArticleId,
        meta: res.meta
    };

    ctx.response.body = result;
});

export default router