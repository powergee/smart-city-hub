import Koa from "koa";
import { z } from "zod";
import { KoaRouterWrapper } from "../utils/router-wrapper";

import { UserAuthService } from "../service/auth.service";

export class AuthRouter extends KoaRouterWrapper {
  private readonly userAuthServ: UserAuthService;
  private readonly cookieName: string;

  constructor(params: {
    di: { userAuthServ: UserAuthService };
    options?: { prefix?: string; cookieName?: string };
  }) {
    super({ prefix: params.options?.prefix || "/auth" });
    this.userAuthServ = params.di.userAuthServ;
    this.cookieName = params.options?.cookieName || "accessToken";

    this.router.post("/login", this.login());
    this.router.get("/logout", this.logout());
    this.router.get("/whoami", this.whoami());
  }

  private login = (): Koa.Middleware => {
    const bodySchema = z.object({
      userid: z.string(),
      plainpw: z.string(),
    });

    return async (ctx) => {
      const body = bodySchema.parse(ctx.request.body);

      const token = await this.userAuthServ.issueToken(body.userid, body.plainpw);
      if (token === null) {
        ctx.status = 401;
        ctx.cookies.set(this.cookieName, null);
        return;
      }

      ctx.cookies.set(this.cookieName, token, { httpOnly: true });
      ctx.status = 204;
    };
  };

  private logout = (): Koa.Middleware => {
    return async (ctx) => {
      ctx.cookies.set(this.cookieName, null);
      ctx.status = 204;
    };
  };

  private whoami = (): Koa.Middleware => {
    return async (ctx) => {
      const userId = ctx.state.auth.user?.userId;

      if (userId) {
        ctx.body = { userId };
      } else {
        ctx.body = ctx.state.auth.error?.message;
        ctx.status = 401;
      }
    };
  };
}
