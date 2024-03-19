import Router from "koa-router";
import db from "./database";

import articles from "./v1/articles";
import login from "./v1/login";
import logout from "./v1/logout";
import register from "./v1/register";
import salt from "./v1/salt";
import files from "./v1/files";
import solutions from "./v1/solutions";

const router = new Router();

db.prepareDB().then(() => {
  router.use("/v1/articles", articles.routes());
  router.use("/v1/login", login.routes());
  router.use("/v1/logout", logout.routes());
  router.use("/v1/register", register.routes());
  router.use("/v1/salt", salt.routes());
  router.use("/v1/files", files.routes());
  router.use("/v1/solutions", solutions.routes());
});

export default router;
