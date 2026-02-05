
import { AuthTokenGetter, SolutionCompany, SolutionCompanyLocalized, SolutionItem, SolutionItemLocalized } from "core/model";
import { SolutionRepository } from "core/repository";

export default class SolutionHttpRepo implements SolutionRepository {
  private readonly baseUrl: string;
  private readonly getAccessToken: AuthTokenGetter;

  constructor(params: { baseUrl: string; authTokenGetter: AuthTokenGetter }) {
    this.baseUrl = params.baseUrl;
    this.getAccessToken = params.authTokenGetter;
  }
  async createCompany(company: SolutionCompany): Promise<SolutionCompany> {
    const accessToken = await this.getAccessToken();
    console.log(accessToken);
    const res = await fetch(`${this.baseUrl}/v2/solution/companies`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: JSON.stringify(company),
    });
    if (!res.ok) throw new Error(`Failed to create company: ${res.statusText}`);
    return res.json();
  }

  async updateCompany(company: Partial<SolutionCompany> & { companyId: string }): Promise<SolutionCompany | null> {
    const accessToken = await this.getAccessToken();
    const res = await fetch(`${this.baseUrl}/v2/solution/companies/${company.companyId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: JSON.stringify(company),
    });
    if (!res.ok) throw new Error(`Failed to update company: ${res.statusText}`);
    return res.json();
  }

  async deleteCompany(companyId: string): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    const res = await fetch(`${this.baseUrl}/v2/solution/companies/${companyId}`, {
        method: "DELETE",
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    });
    if (!res.ok) throw new Error(`Failed to delete company: ${res.statusText}`);
    return (await res.json()).success;
  }

  async createSolution(solution: SolutionItem): Promise<SolutionItem> {
      const accessToken = await this.getAccessToken();
      const res = await fetch(`${this.baseUrl}/v2/solution/items`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: JSON.stringify(solution),
    });
    if (!res.ok) throw new Error(`Failed to create solution: ${res.statusText}`);
    return res.json();
  }

  async updateSolution(solution: Partial<SolutionItem> & { solutionId: string }): Promise<SolutionItem | null> {
    const accessToken = await this.getAccessToken();
    const res = await fetch(`${this.baseUrl}/v2/solution/items/${solution.solutionId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: JSON.stringify(solution),
    });
    if (!res.ok) throw new Error(`Failed to update solution: ${res.statusText}`);
    return res.json();
  }

  async deleteSolution(solutionId: string): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    const res = await fetch(`${this.baseUrl}/v2/solution/items/${solutionId}`, {
        method: "DELETE",
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    });
    if (!res.ok) throw new Error(`Failed to delete solution: ${res.statusText}`);
    return (await res.json()).success;
  }

  async getCompaniesByCategory(params: {
    mainCategoryId: number;
    subCategoryId?: number;
    lang?: string;
  }): Promise<SolutionCompanyLocalized[]> {
    const { mainCategoryId, subCategoryId, lang } = params;
    
    const query = new URLSearchParams({
        mainCategoryId: mainCategoryId.toString(),
    });
    if (subCategoryId !== undefined) {
        query.append("subCategoryId", subCategoryId.toString());
    }
    if (lang) {
        query.append("lang", lang);
    }
    
    const res = await fetch(`${this.baseUrl}/v2/solution/companies?${query.toString()}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch companies: ${res.statusText}`);
    }
    return res.json() as Promise<SolutionCompanyLocalized[]>;
  }

  async getSolutionsByCompany(params: {
    companyId: string;
    mainCategoryId: number;
    subCategoryId?: number;
    lang?: string;
  }): Promise<SolutionItemLocalized[]> {
    const { companyId, mainCategoryId, subCategoryId, lang } = params;

    const query = new URLSearchParams({
        companyId: companyId,
        mainCategoryId: mainCategoryId.toString(),
    });
    if (subCategoryId !== undefined) {
        query.append("subCategoryId", subCategoryId.toString());
    }
    if (lang) {
        query.append("lang", lang);
    }

    const res = await fetch(`${this.baseUrl}/v2/solution/items?${query.toString()}`);
     if (!res.ok) {
        throw new Error(`Failed to fetch solutions: ${res.statusText}`);
    }
    return res.json() as Promise<SolutionItemLocalized[]>;
  }

  async search(query: string, lang?: string): Promise<SolutionItemLocalized[]> {
    const q = new URLSearchParams({ query });
    if (lang) q.append("lang", lang);
    const res = await fetch(`${this.baseUrl}/v2/solution/search?${q.toString()}`);
    if (!res.ok) throw new Error(`Failed to search solutions: ${res.statusText}`);
    return res.json() as Promise<SolutionItemLocalized[]>;
  }

  async getAllCompanies(page: number = 1, perPage: number = 10): Promise<{ items: SolutionCompany[]; total: number }> {
    const query = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
    });
    
    const res = await fetch(`${this.baseUrl}/v2/solution/companies/all?${query.toString()}`);
     if (!res.ok) {
        throw new Error(`Failed to fetch companies: ${res.statusText}`);
    }
    return res.json();
  }

  async getCompany(companyId: string): Promise<SolutionCompany | null> {
    const res = await fetch(`${this.baseUrl}/v2/solution/companies/${companyId}`);
    if (res.status === 404) return null;
    if (!res.ok) {
        throw new Error(`Failed to fetch company: ${res.statusText}`);
    }
    return res.json();
  }

  async getSolutionsByCompanyId(companyId: string, lang?: string): Promise<SolutionItem[]> {
    const query = lang ? `?lang=${lang}` : '';
    const res = await fetch(`${this.baseUrl}/v2/solution/companies/${companyId}/solutions${query}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch company solutions: ${res.statusText}`);
    }
    return res.json();
  }
  async getSolution(solutionId: string): Promise<SolutionItem | null> {
    const res = await fetch(`${this.baseUrl}/v2/solution/items/${solutionId}`);
    if (res.status === 404) return null;
    if (!res.ok) {
        throw new Error(`Failed to fetch solution: ${res.statusText}`);
    }
    return res.json();
  }
}
