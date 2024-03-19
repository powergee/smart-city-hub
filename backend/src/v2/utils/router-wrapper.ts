import Router from "koa-router";

export class KoaRouterWrapper {
  protected readonly router = new Router();

  constructor(options?: Router.IRouterOptions) {
    this.router = new Router(options);
  }

  public getRouterMiddleware() {
    return this.router.routes();
  }

  public injectTo(router: Router) {
    router.use(this.router.routes());
  }
}
