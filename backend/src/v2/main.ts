import bodyParser from "koa-bodyparser";
import cookie from "koa-cookie";
import Router from "koa-router";
import authParser from "./middleware/auth-parser";
import zodErrorResolver from "./middleware/zod-error-resolver";

import {
  FileItemRepository,
  GeneralArticleRepository,
  SolutionRepository,
  UserRepository,
} from "./core/repository";

import { FileItemMongoRepo } from "./repository/file-item-mongo";
import { GeneralArticleMongoRepo } from "./repository/general-article-mongo";
import { SolutionMongoRepo } from "./repository/solution-mongo";
import { UserMongoRepo } from "./repository/user-mongo";
import { ArticleService } from "./service/article.service";
import { UserAuthService } from "./service/auth.service";
import { UserService } from "./service/user.service";

import { ArticleRouter } from "./router/article.route";
import { AuthRouter } from "./router/auth.route";
import { FileRouter } from "./router/file.route";
import { SolutionRouter } from "./router/solution.route";
import { UserRouter } from "./router/user.route";

import { createImageResizer, createThumbnailGenerator } from "./utils/thumbnail";

import dotenv from "dotenv";
import mongoose from "mongoose";
import { SolutionService } from "./service/solution.service";

dotenv.config();
const mongoConn = mongoose.createConnection(process.env.MONGO_URI!);

// Repository Dependency Inversion & Injection
const userRepo: UserRepository = new UserMongoRepo({
  db: mongoConn,
  collectionName: "user",
});
const articleRepo: GeneralArticleRepository = new GeneralArticleMongoRepo({
  db: mongoConn,
  collectionName: "generalarticle",
});
const fileItemRepo: FileItemRepository = new FileItemMongoRepo({
  db: mongoConn,
  collectionName: "file",
  baseDir: process.env.FILES_DIRECTORY!,
});
const solutionRepo: SolutionRepository = new SolutionMongoRepo({
  db: mongoConn,
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
const solutionServ = new SolutionService({
  di: { solutionRepo },
});

// Main Router
const mainRouter = new Router({
  prefix: "/v2",
});
mainRouter.use(
  bodyParser({
    jsonLimit: process.env.JSON_LIMIT || "64mb",
  })
);
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
new SolutionRouter({ di: { solutionService: solutionServ } }).injectTo(mainRouter);

export default mainRouter;
