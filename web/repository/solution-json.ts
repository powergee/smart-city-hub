import solutionDB from "./solution_db_20240704.json";
import companyDB from "./solution_company_db_20240826.json";

import { SolutionItem, SolutionCompany } from "core/model";
import { SolutionRepository } from "core/repository";

export default class SolutionJsonRepo implements SolutionRepository {
  async getCompaniesByCategory(params: {
    mainCategoryId: number;
    subCategoryId?: number;
  }): Promise<SolutionCompany[]> {
    const { mainCategoryId, subCategoryId } = params;

    // First, find the matching solutions
    const filteredSolutions = solutionDB.filter(
      (solution) =>
        solution.mainCategoryId === mainCategoryId &&
        (subCategoryId === undefined || solution.subCategoryId === subCategoryId)
    );

    // Second, find the companies that own the solutions
    const companyIds = filteredSolutions.map((solution) => solution.companyId);
    const companies = companyDB.filter((company) => companyIds.includes(company.companyId));

    return Promise.resolve(companies);
  }

  async getSolutionsByCompany(params: {
    companyId: number;
    mainCategoryId: number;
    subCategoryId?: number;
  }): Promise<SolutionItem[]> {
    const solutions = solutionDB.filter(
      (solution) =>
        solution.companyId === params.companyId &&
        solution.mainCategoryId === params.mainCategoryId &&
        (params.subCategoryId === undefined || solution.subCategoryId === params.subCategoryId)
    );

    return Promise.resolve(solutions);
  }
}
