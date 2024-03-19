import Koa from "koa";
import { z } from "zod";
import { KoaRouterWrapper } from "../utils/router-wrapper";

import { UserService } from "../service/user.service";

export class UserRouter extends KoaRouterWrapper {
  private userServ: UserService;

  constructor(params: { di: { userServ: UserService }; options?: { prefix?: string } }) {
    super({ prefix: params.options?.prefix || "/user" });
    this.userServ = params.di.userServ;

    this.router.post("/register", this.register());
  }

  private register = (): Koa.Middleware => {
    const bodySchema = z.object({
      userId: z.string(),
      plainPw: z.string(),
      name: z.string(),
    });

    return async (ctx) => {
      const body = bodySchema.parse(ctx.request.body);
      const { userId, name, plainPw } = body;

      const res = await this.userServ.createUser(userId, plainPw, name);
      ctx.status = 204;
    };
  };
}
