import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cookie from "koa-cookie";
import authParser from "./middleware/auth-parser";
import zodErrorResolver from "./middleware/zod-error-resolver";

import { GeneralArticleRepository, UserRepository, FileItemRepository } from "./core/repository";

import { UserMongoRepo } from "./repository/user-mongo";
import { GeneralArticleMongoRepo } from "./repository/general-article-mongo";
import { FileItemMongoRepo } from "./repository/file-item-mongo";
import { UserService } from "./service/user.service";
import { UserAuthService } from "./service/auth.service";
import { ArticleService } from "./service/article.service";

import { UserRouter } from "./router/user.route";
import { AuthRouter } from "./router/auth.route";
import { ArticleRouter } from "./router/article.route";
import { FileRouter } from "./router/file.route";

import { mongodb_v1 } from "./utils/mongodb";
import { createImageResizer, createThumbnailGenerator } from "./utils/thumbnail";

import dotenv from "dotenv";
dotenv.config();

// Repository Dependency Inversion & Injection
const userRepo: UserRepository = new UserMongoRepo({
  db: mongodb_v1,
  collectionName: "user",
});
const articleRepo: GeneralArticleRepository = new GeneralArticleMongoRepo({
  db: mongodb_v1,
  collectionName: "generalarticle",
});
const fileItemRepo: FileItemRepository = new FileItemMongoRepo({
  db: mongodb_v1,
  collectionName: "file",
  baseDir: process.env.FILE_BASE_DIR!,
});

// Service Dependency Injection
const userServ = new UserService(userRepo);
const userAuthServ = new UserAuthService(
  {
    tokenSecret: process.env.ACCESS_SECRET_KEY!,
    defaultExpiresIn: "12h",
  },
  { userRepo }
);
const articleServ = new ArticleService({
  di: { generalArticleRepo: articleRepo, fileItemRepo },
  options: {
    imageResizer: createImageResizer({ width: 480 }),
    thumbnailGenerator: createThumbnailGenerator(),
  },
});

// Main Router
const mainRouter = new Router({
  prefix: "/v2",
});
mainRouter.use(bodyParser());
mainRouter.use(cookie());
mainRouter.use(authParser({ userAuthServ, userRepo }));
mainRouter.use(zodErrorResolver());

new UserRouter({ di: { userServ } }).injectTo(mainRouter);
new AuthRouter({ di: { userAuthServ } }).injectTo(mainRouter);
new ArticleRouter({ di: { articleServ } }).injectTo(mainRouter);
new FileRouter({
  di: { fileItemRepo },
  options: {
    maxFileSize: process.env.FILE_UPLOAD_LIMIT
      ? parseInt(process.env.FILE_UPLOAD_LIMIT)
      : 16 * 1024 * 1024, // default: 16MB
  },
}).injectTo(mainRouter);

export default mainRouter;
