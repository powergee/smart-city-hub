import Koa from "koa";
import { z } from "zod";
import { SolutionCompanyDTO, SolutionItemDTO } from "../core/dto";
import { SolutionService } from "../service/solution.service";
import { KoaRouterWrapper } from "../utils/router-wrapper";

const CompanyDetailsSchema = z.object({
  name: z.string().default(""),
  ceo: z.string().default(""),
  address: z.string().default(""),
  tel: z.string().default(""),
  fax: z.string().default(""),
  website: z.string().default(""),
});

const SolutionCompanySchema = z.object({
  companyId: z.string().optional(),
  ko: CompanyDetailsSchema,
  en: CompanyDetailsSchema,
});

const SolutionItemDetailsSchema = z.object({
  title: z.string().default(""),
  summary: z.string().default(""),
  abstract: z.string().default(""),
  feature: z.string().default(""),
  composition: z.string().default(""),
});

const SolutionItemSchema = z.object({
  solutionId: z.string().optional(),
  companyId: z.string().min(1),
  superCategoryId: z.number(),
  mainCategoryId: z.number(),
  subCategoryId: z.number(),
  ko: SolutionItemDetailsSchema,
  en: SolutionItemDetailsSchema,
});

export class SolutionRouter extends KoaRouterWrapper {
  private solutionService: SolutionService;

  constructor(params: { di: { solutionService: SolutionService }; options?: { prefix?: string } }) {
    super({ prefix: params.options?.prefix || "/solution" });
    this.solutionService = params.di.solutionService;

    this.router.get("/companies", this.getCompanies());
    this.router.get("/companies/all", this.getAllCompanies());
    this.router.get("/companies/:companyId", this.getCompany()); // Returns Entity (Full)
    this.router.get("/companies/:companyId/solutions", this.getSolutionsByCompanyId()); // Returns Entity List
    this.router.post("/companies", this.createCompany());
    this.router.patch("/companies/:companyId", this.updateCompany());
    this.router.delete("/companies/:companyId", this.deleteCompany());

    this.router.get("/items", this.getItems());
    this.router.get("/items/:solutionId", this.getItem()); // Returns Entity (Full)
    this.router.post("/items", this.createItem());
    this.router.patch("/items/:solutionId", this.updateItem());
    this.router.delete("/items/:solutionId", this.deleteItem());

    this.router.get("/search", this.search());
  }

  private getCompanies = (): Koa.Middleware => {
    const schema = z.object({
      mainCategoryId: z.string().transform((v) => parseInt(v)),
      subCategoryId: z
        .string()
        .optional()
        .transform((v) => (v ? parseInt(v) : undefined)),
      lang: z.string().optional().default("ko"),
    });

    return async (ctx) => {
      const query = schema.parse(ctx.query);
      const companies = await this.solutionService.getCompaniesByCategory({
        mainCategoryId: query.mainCategoryId,
        subCategoryId: query.subCategoryId,
        lang: query.lang,
      });

      ctx.body = companies;
    };
  };

  private getAllCompanies = (): Koa.Middleware => {
    return async (ctx) => {
      const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1;
      const perPage = ctx.query.perPage ? parseInt(ctx.query.perPage as string) : 10;
      
      const result = await this.solutionService.getAllCompanies(page, perPage);
      ctx.body = result;
    };
  };

  private getSolutionsByCompanyId = (): Koa.Middleware => {
    return async (ctx) => {
      const companyId = ctx.params.companyId;
      const solutions = await this.solutionService.getSolutionsByCompanyId(companyId);
      ctx.body = solutions;
    };
  };

  private getCompany = (): Koa.Middleware => {
    return async (ctx) => {
      const company = await this.solutionService.getCompany(ctx.params.companyId);
      
      if (!company) {
        ctx.status = 404;
        return;
      }
      ctx.body = company;
    };
  };

  private getItems = (): Koa.Middleware => {
    const schema = z.object({
      companyId: z.string(),
      mainCategoryId: z.string().transform((v) => parseInt(v)),
      subCategoryId: z
        .string()
        .optional()
        .transform((v) => (v ? parseInt(v) : undefined)),
      lang: z.string().optional().default("ko"),
    });

    return async (ctx) => {
      const query = schema.parse(ctx.query);
      const solutions = await this.solutionService.getSolutionsByCompany({
        companyId: query.companyId,
        mainCategoryId: query.mainCategoryId,
        subCategoryId: query.subCategoryId,
        lang: query.lang,
      });

      ctx.body = solutions;
    };
  };

  private getItem = (): Koa.Middleware => {
    return async (ctx) => {
      const solution = await this.solutionService.getSolution(ctx.params.solutionId);
      
      if (!solution) {
        ctx.status = 404;
        return;
      }

      ctx.body = solution;
    };
  };

  private createCompany = (): Koa.Middleware => {
    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        return ctx.throw(401, "Unauthorized");
      }
      const dto = SolutionCompanySchema.parse(ctx.request.body);
      const res = await this.solutionService.createCompany(dto as SolutionCompanyDTO);
      ctx.body = res;
    };
  };

  private updateCompany = (): Koa.Middleware => {
    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        return ctx.throw(401, "Unauthorized");
      }
      const companyId = ctx.params.companyId;
      const dto = SolutionCompanySchema.partial().parse(ctx.request.body);
      const res = await this.solutionService.updateCompany({ ...dto, companyId } as any); // Partial entity
      ctx.body = res;
    };
  };

  private deleteCompany = (): Koa.Middleware => {
    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        return ctx.throw(401, "Unauthorized");
      }
      const res = await this.solutionService.deleteCompany(ctx.params.companyId);
      ctx.body = { success: res };
    };
  };

  private createItem = (): Koa.Middleware => {
    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        return ctx.throw(401, "Unauthorized");
      }
      const dto = SolutionItemSchema.parse(ctx.request.body);
      const res = await this.solutionService.createSolution(dto as SolutionItemDTO);
      ctx.body = res;
    };
  };

  private updateItem = (): Koa.Middleware => {
    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        return ctx.throw(401, "Unauthorized");
      }
      const solutionId = ctx.params.solutionId;
      const dto = SolutionItemSchema.partial().parse(ctx.request.body);
      const res = await this.solutionService.updateSolution({ ...dto, solutionId } as any);
      ctx.body = res;
    };
  };

  private deleteItem = (): Koa.Middleware => {
    return async (ctx) => {
      const user = ctx.state.auth.user;
      if (user?.privilege !== "manager") {
        return ctx.throw(401, "Unauthorized");
      }
      const res = await this.solutionService.deleteSolution(ctx.params.solutionId);
      ctx.body = { success: res };
    };
  };

  private search = (): Koa.Middleware => {
    const schema = z.object({
      query: z.string().min(1),
      lang: z.string().optional().default("ko"),
    });

    return async (ctx) => {
      const { query, lang } = schema.parse(ctx.query);
      const solutions = await this.solutionService.search(query, lang);
      ctx.body = solutions;
    };
  };
}
