import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cookie from "koa-cookie";
import authParser from "./middleware/auth-parser";
import zodErrorResolver from "./middleware/zod-error-resolver";

import { UserRepository } from "./core/repository";

import { UserMongoRepo } from "./repository/user-mongo";
import { UserService } from "./service/user.service";
import { UserAuthService } from "./service/auth.service";

import { UserRouter } from "./router/user.route";
import { AuthRouter } from "./router/auth.route";

import dotenv from "dotenv";
dotenv.config();

// Repository Dependency Inversion & Injection
const userRepo: UserRepository = new UserMongoRepo();

// Service Dependency Injection
const userServ = new UserService(userRepo);
const userAuthServ = new UserAuthService(
  {
    tokenSecret: process.env.ACCESS_SECRET_KEY!,
    defaultExpiresIn: "12h",
  },
  { userRepo }
);

// Main Router
const mainRouter = new Router({
  prefix: "/v2",
});
mainRouter.use(bodyParser());
mainRouter.use(cookie());
mainRouter.use(authParser({ userAuthServ, cookieName: "accessToken" }));
mainRouter.use(zodErrorResolver());

new UserRouter({ di: { userServ } }).injectTo(mainRouter);
new AuthRouter({ di: { userAuthServ }, options: { cookieName: "accessToken" } }) //
  .injectTo(mainRouter);

export default mainRouter;
