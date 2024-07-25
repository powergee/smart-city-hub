/**
 * 구현의 편의를 위해 서비스 레이어를 사용하지 않고 라우터에서 바로 레포지토리를 호출하도록 구현
 */
import Koa from "koa";
import { z } from "zod";
import { KoaRouterWrapper } from "../utils/router-wrapper";

import { SolutionItem, SolutionCompany } from "../core/model";
import { SolutionRepository } from "../core/repository";

import { v4 as uuid } from "uuid";

export class SolutionRouter extends KoaRouterWrapper {
  private solutionRepo: SolutionRepository;

  constructor(params: { di: { solutionRepo: SolutionRepository }; options?: { prefix?: string } }) {
    super({ prefix: params.options?.prefix || "/solution" });
    this.solutionRepo = params.di.solutionRepo;

    this.router.get("/", this.findSolutions());
    this.router.get("/company", this.findCompanies());
    this.router.get("/company/category", this.findCompaniesByCategory());
    this.router.post("/", this.insertSolution());
    this.router.get("/:solutionId", this.findSolutionById());
    this.router.delete("/:solutionId", this.deleteSolution());
    this.router.post("/company", this.insertCompany());
    this.router.get("/company/:companyId", this.findCompanyById());
    this.router.delete("/company/:companyId", this.deleteCompany());
  }

  private findSolutions = (): Koa.Middleware => {
    const querySchema = z.object({
      page: z.string().transform(Number).pipe(z.number()),
      perPage: z.string().transform(Number).pipe(z.number()),
      companyId: z.string().optional(),
      mainCategory: z.string().optional(),
      subCategory: z.string().optional(),
      titleRegex: z.string().optional(),
      contentsRegex: z.string().optional(),
    });

    return async (ctx) => {
      const query = querySchema.parse(ctx.query);
      const { page, perPage, companyId, mainCategory, subCategory, titleRegex, contentsRegex } =
        query;

      const res = await this.solutionRepo.findSolutions({
        page,
        perPage,
        companyId,
        mainCategory,
        subCategory,
        titleRegex,
        contentsRegex,
      });
      ctx.body = res;
    };
  };

  private findCompanies = (): Koa.Middleware => {
    const querySchema = z.object({
      page: z.string().transform(Number).pipe(z.number()),
      perPage: z.string().transform(Number).pipe(z.number()),
    });

    return async (ctx) => {
      const query = querySchema.parse(ctx.query);
      const { page, perPage } = query;

      const res = await this.solutionRepo.findCompanies({ page, perPage });
      ctx.body = res;
    };
  };

  private findCompaniesByCategory = (): Koa.Middleware => {
    const querySchema = z.object({
      page: z.string().transform(Number).pipe(z.number()),
      perPage: z.string().transform(Number).pipe(z.number()),
      mainCategory: z.string(),
      subCategory: z.string().optional(),
    });

    return async (ctx) => {
      const query = querySchema.parse(ctx.query);
      const { page, perPage, mainCategory, subCategory } = query;

      const res = await this.solutionRepo.findCompaniesByCategory({
        page,
        perPage,
        mainCategory,
        subCategory,
      });
      ctx.body = res;
    };
  };

  private insertSolution = (): Koa.Middleware => {
    const bodySchema = z.object({
      solutionId: z.string().optional(),
      companyId: z.string(),
      title: z.string(),
      mainImage: z.string(),
      mainCategory: z.string(),
      subCategory: z.string(),
      summary: z.string(),
      contents: z.string(),
      createdByAi: z.boolean(),
    });

    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        ctx.throw(401, "Unauthorized");
      }

      const body = bodySchema.parse(ctx.request.body);
      const solutionItem: SolutionItem = {
        ...body,
        solutionId: body.solutionId || uuid(),
        createdAt: new Date(),
      };
      const res = await this.solutionRepo.insertSolution(solutionItem);
      ctx.body = res;
    };
  };

  private findSolutionById = (): Koa.Middleware => {
    const paramsSchema = z.object({
      solutionId: z.string(),
    });

    return async (ctx) => {
      const params = paramsSchema.parse(ctx.params);
      const { solutionId } = params;

      const res = await this.solutionRepo.findSolutionById(solutionId);
      if (!res) {
        ctx.throw(404, "Not Found");
      }
      ctx.body = res;
    };
  };

  private deleteSolution = (): Koa.Middleware => {
    const paramsSchema = z.object({
      solutionId: z.string(),
    });

    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        ctx.throw(401, "Unauthorized");
      }

      const params = paramsSchema.parse(ctx.params);
      const { solutionId } = params;

      const res = await this.solutionRepo.deleteSolution(solutionId);
      if (!res) {
        ctx.throw(404, "Not Found");
      }
      ctx.body = res;
    };
  };

  private insertCompany = (): Koa.Middleware => {
    const bodySchema = z.object({
      companyId: z.string().optional(),
      name: z.string(),
      logoImage: z.string(),
      address: z.string(),
      contact: z.string(),
      website: z.string(),
      category: z.string(),
      year: z.string().transform(Number).pipe(z.number()),
    });

    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        ctx.throw(401, "Unauthorized");
      }

      const body = bodySchema.parse(ctx.request.body);
      const solutionCompany: SolutionCompany = {
        ...body,
        companyId: body.companyId || uuid(),
      };
      const res = await this.solutionRepo.insertCompany(solutionCompany);
      ctx.body = res;
    };
  };

  private findCompanyById = (): Koa.Middleware => {
    const paramsSchema = z.object({
      companyId: z.string(),
    });

    return async (ctx) => {
      const params = paramsSchema.parse(ctx.params);
      const { companyId } = params;

      const res = await this.solutionRepo.findCompanyById(companyId);
      if (!res) {
        ctx.throw(404, "Not Found");
      }
      ctx.body = res;
    };
  };

  private deleteCompany = (): Koa.Middleware => {
    const paramsSchema = z.object({
      companyId: z.string(),
    });

    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        ctx.throw(401, "Unauthorized");
      }

      const params = paramsSchema.parse(ctx.params);
      const { companyId } = params;

      const res = await this.solutionRepo.deleteCompany(companyId);
      if (!res) {
        ctx.throw(404, "Not Found");
      }
      ctx.body = res;
    };
  };
}
