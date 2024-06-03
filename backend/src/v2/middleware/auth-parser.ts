import Koa from "koa";
import { UserRepository } from "../core/repository";
import { UserAuthService } from "../service/auth.service";

/**
 * 해당 미들웨어는 JWT 토큰을 파싱하여 ctx.state.auth에 JWT payload를 저장합니다.
 * JWT 토큰을 저장하는데 cookie, authorization header, ... 등 여러 방법이 있지만,
 * 이후에 오는 미들웨어는 이를 알 필요가 없도록 해당 미들웨어에서 처리하도록 합니다.
 * (해당 미들웨어에서는 authorization header를 이용하여 JWT 토큰을 파싱)
 *
 * JWT 토큰이 유효하고 활성화된 사용자이면 ctx.state.auth.user에 User 모델을 저장하고,
 * 그렇지 않다면 ctx.state.auth.user에 undefined을 저장하고, ctx.state.auth.error에 에러를 저장합니다.
 *
 * 결국, 이후에 오는 미들웨어는 ctx.state.auth.user 유무를 파악하여 로그인이 필요한 서비스에 접근하지 못하도록 할 수 있습니다.
 * @returns Koa.Middleware
 */
export default function authParser(params: {
  userAuthServ: UserAuthService;
  userRepo: UserRepository;
}): Koa.Middleware {
  return async (ctx, next) => {
    ctx.state.auth = {} as any;

    // authorization 헤더를 이용한 JWT 토큰 파싱
    const token = ctx.header.authorization?.split(" ")[1];
    if (!token) {
      ctx.state.auth.error = new Error("인증 토큰이 없습니다.");
      return await next();
    }

    try {
      // JWT 토큰 검증
      const user = await params.userAuthServ.verifyToken(token);
      ctx.state.auth.user = user;
    } catch (err) {
      ctx.state.auth.error = err as Error;
    }

    await next();
  };
}
