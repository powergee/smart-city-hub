import Router from "koa-router";
import Koa from 'koa';
import BodyParser from "koa-bodyparser"
import Cookie from "koa-cookie";
import jwt from "jsonwebtoken";
import { ILoginRequest, ITokenData } from "../types"
import { UserModel } from "./models/userModel"
import env from "../../env"

const router = new Router();

router.use(BodyParser());
router.use(Cookie());

router.post("/", async (ctx: Koa.Context) => {
    const body:ILoginRequest = ctx.request.body;

    if (body.userId === undefined || body.userPwHash === undefined) {
        ctx.throw(400, "userId or userPwHash is undefined.");
    }

    const user = await UserModel.findOne({ userId: body.userId }).exec();
    if (user === null || user.userPwHash !== body.userPwHash) {
        ctx.throw(401, "userId or userPwHash is incorrect.");
    }

    if (!user.isAllowed) {
        ctx.throw(403, "This user is not allowed.");
    }

    const res:ITokenData = {
        userId: user.userId,
        userName: user.userName,
        isAllowed: user.isAllowed,
        isManager: user.isManager
    }

    const accessToken = jwt.sign(res, env.accessTokenKey, { expiresIn: '3h' });
    ctx.cookies.set("access_token", accessToken, { httpOnly: false });

    ctx.response.body = res;
});

export default router