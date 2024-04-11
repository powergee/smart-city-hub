import Koa from "koa";
import { z } from "zod";

export default function zodErrorResolver() {
  return async (ctx: Koa.BaseContext, next: Koa.Next) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        ctx.status = 400;
        ctx.body = err.errors;
      } else {
        throw err;
      }
    }
  };
}
