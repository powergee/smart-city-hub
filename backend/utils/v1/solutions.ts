import Koa from "koa";
import Router from "koa-router";
import BodyParser from "koa-bodyparser";
import mime from "mime-types";

import {
  SolutionCompany,
  SolutionCompanyModel,
} from "./models/solutionCompanyModel";
import { Solution, SolutionModel } from "./models/solutionModel";
import { FilterQuery } from "mongoose";

const router = new Router();
router.use(BodyParser());

/**
 * GET /solutions/companies/
 * 등록된 모든 회사 정보를 가져옵니다.
 * 이때, 회사 이름, 영문 이름 및 요약 정보만을 가져옵니다.
 */
router.get("/companies", async (ctx: Koa.Context) => {
  const companies = await SolutionCompanyModel.find({}, "name nameEng summary");
  ctx.body = companies;
});

router.get("/companies/:id", async (ctx: Koa.Context) => {
  const id = ctx.params.id;
  const company = await SolutionCompanyModel.findById(id);

  if (!company) {
    ctx.throw(404, "No document according to given id");
  }

  ctx.body = company;
});

/**
 * POST /solutions/companies/
 * 새 회사를 추가합니다.
 * _id 필드가 제공되면 해당 Document를 수정합니다.
 */
router.post("/companies", async (ctx: Koa.Context) => {
  const data = { ...ctx.request.body };

  let company: SolutionCompany;

  if (!data._id) {
    // create new document
    company = new SolutionCompanyModel(data);
  } else {
    // find and modify existing document
    company = await SolutionCompanyModel.findById(data._id);

    if (!company) {
      ctx.throw(404, "No document according to given id");
    }

    // replace current fields with requested fields
    Object.keys(data).forEach((key) => {
      company.set(key, data[key]);
    });
  }

  ctx.body = await company.save();
});

/**
 * DELETE /companies/:id
 * id에 해당하는 회사 Document를 삭제합니다.
 * 해당 회사에 등록돼 있는 솔루션이 있는 경우, 해당 요청은 실패합니다.
 */
router.delete("/companies/:id", async (ctx: Koa.Context) => {
  const id = ctx.params.id;
  // TODO: 해당 회사에 솔루션이 등록돼 있는지 확인하고, 없는 경우에만 삭제 수행
  const company = await SolutionCompanyModel.findByIdAndDelete(id);
  ctx.body = company;
});

/**
 * POST /solutions/cat2com
 * 본문의 카테고리 문자열 배열을 통해 해당 카테고리의 솔루션을
 * `solutions`라는 필드와 함께 간단한 회사 정보를 포함하여 응답합니다.
 *
 * <요청 본문>
 * categoryTag 문자열 배열
 * 예: ["스마트 건설", "스마트 빌딩"]
 */
router.post("/cat2com", async (ctx: Koa.Context) => {
  const categoryTag: string[] = ctx.request.body;

  if (categoryTag) {
    // 예외 처리: categoryTag가 배열이 아닌 경우
    if (!Array.isArray(categoryTag)) {
      ctx.throw(400, "categoryTag must be array of strings");
    }
  }

  // 먼저, categoryTag에 속한 solution 문서들을 가져온다.
  const solutions: Solution[] = await SolutionModel.find(
    { categoryTag: { $in: categoryTag } },
    "companyId title summary categoryTag"
  );

  const res: {
    company: SolutionCompany;
    solutions: Solution[];
  }[] = [];

  for (let i = 0; i < solutions.length; i++) {
    const { companyId } = solutions[i];

    // Solution에 맞는 SolutionCompany 찾기
    let index = -1;
    for (let j = 0; j < res.length; j++) {
      if (companyId.equals(res[j].company._id)) {
        index = j;
        break;
      }
    }

    // Solution에 맞는 SolutionCompany가 없으면 쿼리하여 추가
    if (index === -1) {
      index = res.length;
      res.push({
        company: await SolutionCompanyModel.findById(
          companyId,
          "name nameEng summary"
        ),
        solutions: [],
      });
    }

    // Solution 추가
    res[index].solutions.push(solutions[i]);
  }

  ctx.body = res;
});

/**
 * GET /solutions/
 * 모든 솔루션 정보를 `detail` 필드를 제외하고 가져옵니다.
 *
 * <사용 가능한 쿼리>
 * `companyId`: companyId에 해당하는 솔루션 회사의 솔루션만 가져옵니다.
 */
router.get("/", async (ctx: Koa.Context) => {
  const filter: FilterQuery<Solution> = {};

  // 쿼리 처리
  const { companyId } = ctx.request.query;
  if (companyId && companyId !== "") {
    filter.companyId = companyId;
  }

  ctx.body = await SolutionModel.find(
    filter,
    "companyId title summary categoryTag"
  );
});

router.get("/poster/:id", async (ctx: Koa.Context) => {
  const id = ctx.params.id;
  const solution: Solution = await SolutionModel.findById(id, "mainImage");

  if (!solution) {
    ctx.throw(404, "No document according to given id");
  }

  if (!solution.mainImage) {
    ctx.throw(404, "No poster was founded");
  }

  const base64Data = solution.mainImage.split(",");
  const imageData = Buffer.from(base64Data[1], "base64");

  const match = base64Data[0].match(/data:([^;]+);base64/i);
  let mimeType = "application/octet-stream";
  if (match) {
    mimeType = match[1];
  }

  // 파일 응답 설정
  ctx.set(
    "Content-Disposition",
    `attachment; filename=${id}.${mime.extension(mimeType)}`
  ); // 다운로드할 파일 이름 설정
  ctx.set("Content-Type", mimeType); // 파일의 MIME 타입 설정
  ctx.body = imageData; // base64 데이터를 response body에 할당
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

export default router;
