import Router from "koa-router";
import Koa from 'koa';
import BodyParser from "koa-bodyparser"
import { ISaltRequest, ISaltResponse } from "../types"
import { UserModel } from "./models/userModel"

const router = new Router();

router.use(BodyParser());

router.get("/", async (ctx: Koa.Context) => {
    const body:ISaltRequest = ctx.query;

    if (body.userId === undefined) {
        ctx.throw(400, "userId is undefined.");
    }

    const user = await UserModel.findOne({ userId: body.userId }).exec();
    if (user === null) {
        ctx.throw(404, "There's no such ID.");
    }

    const res:ISaltResponse = {
        userPwSalt: user.userPwSalt
    };

    console.log(res);
    ctx.response.body = res;
});

export default router