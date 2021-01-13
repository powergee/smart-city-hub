import Router from "koa-router";
import Koa from 'koa';
import BodyParser from "koa-bodyparser"
import { IRegisterPostRequest, IRegisterPostResponse } from "../types";
import { UserModel } from "./models/userModel";

const router = new Router();

router.use(BodyParser());

// Hash와 Salt를 프론트엔드에서 생성해 전송한다는 점에서 보안상 위험함.
// 연구실 서버에서 HTTPS를 사용할 수 있게 되면 즉시 구현을 수정할 것.
router.post("/", async (ctx: Koa.Context) => {
    const body:IRegisterPostRequest = ctx.request.body;

    if (body.userId === undefined || body.userName === undefined || 
        body.userPwHash === undefined || body.userPwSalt === undefined) {
        ctx.throw(400, "At least one parameter is not valid. The body was: " + JSON.stringify(ctx.request.body));
    }

    if (body.userId.length === 0) {
        ctx.throw(400, "userId is empty.");
    } else if (body.userName.length === 0) {
        ctx.throw(400, "userName is empty.");
    }

    const existingUser = await UserModel.findOne({ userId: body.userId }).exec();
    if (existingUser !== null) {
        ctx.throw(409, "userId is already in use.")
    }

    const newUser = new UserModel();

    newUser.userId = body.userId;
    newUser.userName = body.userName;
    newUser.userPwHash = body.userPwHash;
    newUser.userPwSalt = body.userPwSalt;
    // 현재는 회원관리의 목적이 관리자 계정 관리 뿐이기 때문에,
    // 회원을 생성할 때부터 isManager를 true로 기본 설정한다.
    // 추후에 일반 계정이 필요할 때 아래 코드를 수정할 것.
    newUser.isManager = true;
    // 회원 가입을 신청한 시점에는 해당 계정 사용이 허용되지 않고,
    // 서버 관리자가 회원 가입 신청 내역을 확인하여 별도로 승인해야 한다.
    newUser.isAllowed = false;

    newUser.save();

    const res:IRegisterPostResponse = {
        userId: newUser.userId,
        userName: newUser.userName,
        isAllowed: newUser.isAllowed
    };

    ctx.response.body = res;
});

export default router