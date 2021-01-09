import Koa from "koa";
import Router from "koa-router";
import Logger from "koa-logger";
import cors from "@koa/cors";
import db from "./database";

const app = new Koa();

const corsOption = {
    origin: "http://localhost:3000",
    credentials: true
};

app.use(cors(corsOption));

app.use(db.prepareDBMiddleware);

export default app;