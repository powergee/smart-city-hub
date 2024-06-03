import Koa from "koa";
import { z } from "zod";
import { KoaRouterWrapper } from "../utils/router-wrapper";

import { UserAuthService } from "../service/auth.service";

export class AuthRouter extends KoaRouterWrapper {
  private readonly userAuthServ: UserAuthService;

  constructor(params: { di: { userAuthServ: UserAuthService }; options?: { prefix?: string } }) {
    super({ prefix: params.options?.prefix || "/auth" });
    this.userAuthServ = params.di.userAuthServ;

    this.router.post("/issue", this.issue());
    this.router.get("/whoami", this.whoami());
  }

  private issue = (): Koa.Middleware => {
    const bodySchema = z.object({
      userid: z.string(),
      plainpw: z.string(),
    });

    return async (ctx) => {
      const body = bodySchema.parse(ctx.request.body);

      try {
        const token = await this.userAuthServ.issueToken(body.userid, body.plainpw);
        ctx.response.body = token;
      } catch (err) {
        ctx.throw(400, (err as Error).message);
      }
    };
  };

  /**
   * 미들웨어에서 처리한 인증 정보를 이용해 사용자 정보를 반환합니다.
   * middleware/auth-parser.ts 참조
   */
  private whoami = (): Koa.Middleware => {
    return async (ctx) => {
      const userPayload = ctx.state.auth.user;

      if (userPayload) {
        ctx.body = userPayload;
        ctx.status = 200;
      } else {
        ctx.body = ctx.state.auth.error?.message;
        ctx.status = 401;
      }
    };
  };
}
