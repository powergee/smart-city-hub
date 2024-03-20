import Koa from "koa";
import { UserAuthService } from "../service/auth.service";

/**
 * 해당 미들웨어는 JWT 토큰을 파싱하여 ctx.state.auth에 JWT payload를 저장합니다.
 * JWT 토큰을 저장하는데 cookie, authorization header, ... 등 여러 방법이 있지만,
 * 이후에 오는 미들웨어는 이를 알 필요가 없도록 해당 미들웨어에서 처리하도록 합니다.
 *
 * JWT 토큰이 유효하면 ctx.state.auth.user에 payload를 저장하고,
 * 유효하지 않다면 ctx.state.auth.user에 undefined을 저장하고, ctx.state.auth.error에 에러를 저장합니다.
 * @returns Koa.Middleware
 */
export default function authParser(params: { userAuthServ: UserAuthService }): Koa.Middleware {
  return async (ctx, next) => {
    ctx.state.auth = {} as any;

    const token = ctx.header.authorization?.split(" ")[1];
    if (!token) {
      ctx.state.auth.error = new Error("There is no token.");
      return await next();
    }

    try {
      const payload = await params.userAuthServ.verifyToken(token);
      ctx.state.auth.user = payload;
    } catch (err) {
      ctx.state.auth.error = err as Error;
    }

    await next();
  };
}
