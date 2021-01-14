import Koa from "koa";
import Router from "koa-router";
import Logger from "koa-logger";
import cors from "@koa/cors";
import db from "./database";

import articles from "./v1/articles";
import login from "./v1/login";
import logout from "./v1/logout";
import register from "./v1/register";
import salt from "./v1/salt";
import files from "./v1/files";

const app = new Koa();

const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
};

app.use(cors(corsOption));
app.use(Logger());
app.use(db.prepareDBMiddleware);

const router = new Router();
router.use("/v1/articles", articles.routes());
router.use("/v1/login", login.routes());
router.use("/v1/logout", logout.routes());
router.use("/v1/register", register.routes());
router.use("/v1/salt", salt.routes());
router.use("/v1/files", files.routes());

app.use(router.routes());

export default app;