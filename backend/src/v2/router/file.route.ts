import fs from "fs";
import Koa from "koa";
import koaBody from "koa-body";
import formidable from "formidable";
import { KoaRouterWrapper } from "../utils/router-wrapper";

import { FileItemRepository } from "../core/repository";

export class FileRouter extends KoaRouterWrapper {
  private readonly fileItemRepo: FileItemRepository;

  constructor(params: {
    di: { fileItemRepo: FileItemRepository };
    options?: { prefix?: string; maxFileSize?: number };
  }) {
    super({ prefix: params.options?.prefix || "/file" });
    this.fileItemRepo = params.di.fileItemRepo;

    this.router.post(
      "/upload",
      this.uploadErrorHandler,
      koaBody({
        multipart: true,
        formidable: { maxFileSize: params.options?.maxFileSize, maxFiles: 1, keepExtensions: true },
      }),
      this.upload()
    );
    this.router.get("/download/:fileId", this.download());
  }

  private uploadErrorHandler = async (ctx: Koa.Context, next: Koa.Next) => {
    return next().catch((err) => {
      if (err.code === formidable.errors.biggerThanMaxFileSize) {
        ctx.throw(413, "File size is too large.");
      } else {
        ctx.throw(500, "Internal server error.");
      }
    });
  };

  private upload = (): Koa.Middleware => {
    return async (ctx) => {
      if (ctx.state.auth.user?.privilege !== "manager") {
        // only manager can upload files
        return ctx.throw(401, "Unauthorized");
      }

      const file = ctx.request.files?.file as formidable.File;
      if (!(file && file.originalFilename)) {
        return ctx.throw(400, "There is no file data.");
      }

      const fileItem = await this.fileItemRepo.put(file.originalFilename, file.filepath);
      ctx.body = fileItem;
    };
  };

  private download = (): Koa.Middleware => {
    return async (ctx) => {
      const fileId = parseInt(ctx.params.fileId);

      if (isNaN(fileId)) {
        return ctx.throw(400, "fileId must be a number.");
      }

      const fileItem = await this.fileItemRepo.get(fileId);
      if (fileItem === null) {
        return ctx.throw(404, "file not found.");
      }

      ctx.attachment(fileItem.name);
      ctx.body = fs.createReadStream(fileItem.localPath);
    };
  };
}
