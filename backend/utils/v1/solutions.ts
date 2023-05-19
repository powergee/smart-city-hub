import Koa from "koa";
import Router from "koa-router";
import BodyParser from "koa-bodyparser";

import {
  SolutionCompany,
  SolutionCompanyModel,
} from "./models/solutionCompanyModel";
import { Solution, SolutionModel } from "./models/solutionModel";

const router = new Router();
router.use(BodyParser());

/**
 * GET /solutions/
 * 모든 솔루션 정보를 `detail` 필드를 제외하고 가져옵니다.
 *
 * <사용 가능한 쿼리>
 * `category`: 원하는 카테고리를 콤마로 지정하여 가져옵니다.
 */
router.get("/", async (ctx: Koa.Context) => {
  let categoryTag: RegExp = /(?:)/;

  // 콤마로 구분된 카테고리 태그 쿼리를 위한 정규표현식 설정
  if (ctx.query.category) {
    const categoryQuery: string = ctx.query.category;

    categoryTag = new RegExp(
      categoryQuery
        .split(",")
        .map((cat) => `(\\b${cat}\\b)`)
        .join("|")
    );
  }

  ctx.body = await SolutionModel.find({ categoryTag }, "-detail");
});

/**
 * GET /solutions/:id
 * id에 해당하는 솔루션 정보를 detail 필드를 포함하여 상세히 가져옵니다.
 */
router.get("/:id", async (ctx: Koa.Context) => {
  const id = ctx.params?.id;
  const solution = await SolutionModel.findById(id);

  if (!solution) {
    ctx.throw(404, "No document according to given id");
  }

  ctx.body = solution;
});

/**
 * POST /solutions/
 * 새 솔루션을 추가합니다.
 * _id 필드가 제공되면 해당 Document를 수정합니다.
 * 이때, 유효한 SolutionCompany Document ID가 필요합니다.
 */
router.post("/", async (ctx: Koa.Context) => {
  const data = { ...ctx.request.body };

  let solution: Solution;

  if (!data._id) {
    // create new document
    solution = new SolutionModel(data);
  } else {
    // find and modify existing document
    solution = await SolutionModel.findById(data._id);

    if (!solution) {
      ctx.throw(404, "No document according to given id");
    }

    // replace current fields with requested fields
    Object.keys(data).forEach((key) => {
      solution.set(key, data[key]);
    });
  }

  const company: SolutionCompany = await SolutionCompanyModel.findById(
    solution.companyId
  );
  if (!company) {
    ctx.throw(406, "No company document was found for companyId.");
  }

  ctx.body = await solution.save();
});

/**
 * DELETE /solutions/:id
 * id에 해당하는 솔루션 Document를 삭제합니다.
 */
router.delete("/:id", async (ctx: Koa.Context) => {
  const id = ctx.params.id;
  const solution = await SolutionModel.findByIdAndDelete(id);
  ctx.body = solution;
});

/**
 * GET /solutions/companies/
 * 등록된 모든 회사 정보를 가져옵니다.
 */
router.get("/companies", async (ctx: Koa.Context) => {
  const companies = await SolutionCompanyModel.find({});
  ctx.body = companies;
});

router.post("/companies", async (ctx: Koa.Context) => {
  const company: SolutionCompany = ctx.request?.body;

  if (!company._id) {
    // create new company document
    const newCompany = new SolutionCompanyModel(company);
    const res = await newCompany.save();

    ctx.body = res;
  } else {
    ctx.throw(400, "_id field is given");
  }
});

export default router;
