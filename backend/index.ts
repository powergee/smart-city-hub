import Koa = require("koa");
import Router = require("koa-router");
import env = require("dotenv");
import db from "./utils/database"

db.connectDB();
env.config();

const app = new Koa();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("Listening to http://0.0.0.0:4000")
});