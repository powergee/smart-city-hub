import { SolutionCompanyDTO, SolutionCompanyLocalizedDTO, SolutionItemDTO, SolutionItemLocalizedDTO } from "../core/dto";
import { SolutionCompany, SolutionCompanyDetails, SolutionItem, SolutionItemDetails } from "../core/model";
import { SolutionRepository } from "../core/repository";

export class SolutionService {
  private readonly solutionRepo: SolutionRepository;

  constructor(params: { di: { solutionRepo: SolutionRepository } }) {
    this.solutionRepo = params.di.solutionRepo;
  }

  // --- Helpers ---
  private toLocalizedCompany(entity: SolutionCompany, lang: string = 'ko'): SolutionCompanyLocalizedDTO {
    const details: SolutionCompanyDetails = (entity as any)[lang] || entity.ko; // Fallback to ko?
    return {
      companyId: entity.companyId,
      name: details.name,
      ceo: details.ceo,
      address: details.address,
      tel: details.tel,
      fax: details.fax,
      website: details.website,
    };
  }

  private toLocalizedItem(entity: SolutionItem, lang: string = 'ko'): SolutionItemLocalizedDTO {
    const details: SolutionItemDetails = (entity as any)[lang] || entity.ko;
    return {
      solutionId: entity.solutionId,
      companyId: entity.companyId,
      mainCategoryId: entity.mainCategoryId,
      subCategoryId: entity.subCategoryId,
      title: details.title,
      summary: details.summary,
      abstract: details.abstract,
      feature: details.feature,
      composition: details.composition,
    };
  }
  // ----------------

  async getCompaniesByCategory(params: {
    mainCategoryId: number;
    subCategoryId?: number;
    lang?: string;
  }): Promise<SolutionCompanyLocalizedDTO[]> {
    const entities = await this.solutionRepo.getCompaniesByCategory(params);
    return entities.map(e => this.toLocalizedCompany(e, params.lang));
  }

  async getAllCompanies(page?: number, perPage?: number): Promise<{ items: SolutionCompanyDTO[]; total: number }> {
    const { items, total } = await this.solutionRepo.getAllCompanies(page, perPage);
    return {
      items,
      total
    };
  }

  async getCompany(companyId: string): Promise<SolutionCompanyDTO | null> {
    return this.solutionRepo.getCompany(companyId);
  }

  async getSolutionsByCompanyId(companyId: string): Promise<SolutionItemDTO[]> {
    return this.solutionRepo.getSolutionsByCompanyId(companyId);
  }

  async getSolutionsByCompany(params: {
    companyId: string;
    mainCategoryId: number;
    subCategoryId?: number;
    lang?: string;
  }): Promise<SolutionItemLocalizedDTO[]> {
    const entities = await this.solutionRepo.getSolutionsByCompany(params);
    return entities.map(e => this.toLocalizedItem(e, params.lang));
  }

  async getSolution(solutionId: string): Promise<SolutionItemDTO | null> {
    return this.solutionRepo.getSolution(solutionId);
  }

  private generateShortId(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async createCompany(company: SolutionCompany): Promise<SolutionCompanyDTO> {
    if (!company.companyId) {
        let id = this.generateShortId();
        while (await this.solutionRepo.getCompany(id)) {
            id = this.generateShortId();
        }
        company.companyId = id;
    }
    return this.solutionRepo.createCompany(company);
  }

  async updateCompany(company: Partial<SolutionCompany> & { companyId: string }): Promise<SolutionCompanyDTO | null> {
    return this.solutionRepo.updateCompany(company);
  }

  async deleteCompany(companyId: string): Promise<boolean> {
    return this.solutionRepo.deleteCompany(companyId);
  }

  async createSolution(solution: SolutionItem): Promise<SolutionItemDTO> {
     if (!solution.solutionId) {
        let id = this.generateShortId();
        while (await this.solutionRepo.getSolution(id)) {
            id = this.generateShortId();
        }
        solution.solutionId = id;
    }
    return this.solutionRepo.createSolution(solution);
  }

  async updateSolution(solution: Partial<SolutionItem> & { solutionId: string }): Promise<SolutionItemDTO | null> {
    return this.solutionRepo.updateSolution(solution);
  }

  async deleteSolution(solutionId: string): Promise<boolean> {
    return this.solutionRepo.deleteSolution(solutionId);
  }

  async search(query: string, lang: string = 'ko'): Promise<SolutionItemLocalizedDTO[]> {
    const entities = await this.solutionRepo.search(query, lang);
    return entities.map(e => this.toLocalizedItem(e, lang));
  }
}
