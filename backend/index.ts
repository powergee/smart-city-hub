import env from "./env";

import Koa from "koa";
import KoaLogger from "koa-logger";
import v1Router from "./utils/app";
import v2Router from "./src/v2/main";

const port = env.port;

const app = new Koa();
if (!process.env.BACKEND_PRODUCTION) {
  app.use(KoaLogger());
}
app.use(v1Router.routes());
app.use(v2Router.routes());

app.listen(port, () => {
  console.log("Listening to http://0.0.0.0:" + port);
});
