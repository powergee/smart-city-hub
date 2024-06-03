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
    this.router.get("/list", this.list());
    this.router.post("/privilege", this.privilege());
    this.router.post("/enabled", this.enabled());
  }

  /**
   * 사용자를 등록한다.
   */
  private register = (): Koa.Middleware => {
    const bodySchema = z.object({
      userid: z.string(),
      plainpw: z.string(),
      name: z.string(),
    });

    return async (ctx) => {
      const body = bodySchema.parse(ctx.request.body);
      const { userid, name, plainpw } = body;

      try {
        const res = await this.userServ.createUser(userid, plainpw, name);
      } catch (err) {
        ctx.throw(400, (err as Error).message);
      }
      ctx.status = 204;
    };
  };

  /**
   * 사용자 목록을 조회한다.
   */
  private list = (): Koa.Middleware => {
    return async (ctx) => {
      if (ctx.state.auth.user?.privilege !== "manager") {
        // **권한 확인, manager만 가능**
        ctx.throw(403, "접근 권한이 없습니다.");
      }

      const res = await this.userServ.listUsers();
      ctx.body = res;
    };
  };

  /**
   * 사용자의 권한을 변경한다.
   */
  private privilege = (): Koa.Middleware => {
    const querySchema = z.object({
      userid: z.string(),
      privilege: z.enum(["user", "manager"]),
    });

    return async (ctx) => {
      if (ctx.state.auth.user?.privilege !== "manager") {
        // **권한 확인, manager만 가능**
        ctx.throw(403, "접근 권한이 없습니다.");
      }

      const query = querySchema.parse(ctx.query);
      const { userid, privilege } = query;

      try {
        const res = await this.userServ.setPrivilege(userid, privilege);
      } catch (err) {
        ctx.throw(400, (err as Error).message);
      }
      ctx.status = 204;
    };
  };

  /**
   * 사용자 계정 활성화 여부를 변경한다.
   */
  private enabled = (): Koa.Middleware => {
    const querySchema = z.object({
      userid: z.string(),
      enabled: z.string().transform((val) => val === "true"),
    });

    return async (ctx) => {
      if (ctx.state.auth.user?.privilege !== "manager") {
        // **권한 확인, manager만 가능**
        ctx.throw(403, "접근 권한이 없습니다.");
      }

      const query = querySchema.parse(ctx.query);
      const { userid, enabled } = query;

      try {
        const res = await this.userServ.setEnabled(userid, enabled);
      } catch (err) {
        ctx.throw(400, (err as Error).message);
      }
      ctx.status = 204;
    };
  };
}
