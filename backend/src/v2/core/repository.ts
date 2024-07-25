import { User, Password, GeneralArticle, FileItem, SolutionItem, SolutionCompany } from "./model";

export interface UserRepository {
  create(user: User, password: Password): Promise<User>;
  findAll(): Promise<User[]>;
  findByUserId(userId: string): Promise<User | null>;
  findPasswordByUserId(userId: string): Promise<Password | null>;
  update(user: User, password?: Password): Promise<User | null>;
  delete(userId: string): Promise<User | null>;
}

export interface GeneralArticleRepository {
  create(article: Partial<GeneralArticle>): Promise<GeneralArticle>;
  query(
    query: {
      page: number;
      perPage: number;
      titleRegex?: string;
      contentRegex?: string;
      kindRegex?: string;
      publishedOnly?: boolean;
    },
    options?: { summary?: boolean }
  ): Promise<GeneralArticle[]>;
  find(articleId: number): Promise<GeneralArticle | null>;
  update(article: Partial<GeneralArticle>): Promise<GeneralArticle | null>;
  delete(articleId: number): Promise<GeneralArticle | null>;
  count(kindRegex: string, publishedOnly?: boolean): Promise<number>;
}

export interface FileItemRepository {
  put(title: string, filePath: string): Promise<FileItem>;
  get(fileId: number): Promise<FileItem | null>;
  rm(fileId: number): Promise<boolean>;
}

export interface SolutionRepository {
  /**
   * 특정 회사, 특정 대분류, 특정 중분류에 속하는 솔루션을 가져온다.
   * 그리고 이름과 내용에 대해 검색하여 매치되는 솔루션들을 가져온다.
   */
  findSolutions(query: {
    page: number;
    perPage: number;
    companyId?: string;
    mainCategory?: string;
    subCategory?: string;
    titleRegex?: string;
    contentsRegex?: string;
  }): Promise<Omit<SolutionItem, "contents" | "mainImage">[]>;

  findCompanies(query: { page: number; perPage: number }): Promise<SolutionCompany[]>;

  /**
   * 특정 대분류, 중분류에 속하는 솔루션을 보유하고 있는 회사들을 가져온다.
   */
  findCompaniesByCategory(query: {
    page: number;
    perPage: number;
    mainCategory: string;
    subCategory?: string;
  }): Promise<SolutionCompany[]>;

  insertSolution(solution: SolutionItem): Promise<SolutionItem>;
  findSolutionById(solutionId: string): Promise<SolutionItem | null>;
  deleteSolution(solutionId: string): Promise<SolutionItem | null>;

  insertCompany(company: SolutionCompany): Promise<SolutionCompany>;
  findCompanyById(companyId: string): Promise<SolutionCompany | null>;
  deleteCompany(companyId: string): Promise<SolutionCompany | null>;
}
