import {
  AseanBannerItem,
  AttachmentFile,
  GeneralArticle,
  Locale,
  PrimaryArticle,
  ProjectRecordItem,
  SolutionCompany,
  SolutionCompanyLocalized,
  SolutionItem,
  SolutionItemLocalized,
  UserItem
} from "core/model";
// ... (lines 13-30 omitted)

export interface SolutionRepository {
  // Public (Localized)
  getCompaniesByCategory: (params: {
    mainCategoryId: number;
    subCategoryId?: number;
    lang?: string;
  }) => Promise<SolutionCompanyLocalized[]>;

  getAllCompanies: (page?: number, perPage?: number) => Promise<{ items: SolutionCompany[]; total: number }>;
  
  getSolutionsByCompany: (params: {
    companyId: string;
    mainCategoryId: number;
    subCategoryId?: number;
    lang?: string;
  }) => Promise<SolutionItemLocalized[]>;

  getSolutionsByCompanyId: (companyId: string, lang?: string) => Promise<SolutionItem[]>; // Admin usually? Or public? User said "Admin/Edit uses Entity". If this is for admin list, might need entity. If public profile, localized. Let's check usage. Admin uses it for list? "getSolutionsByCompany" vs "getSolutionsByCompanyId". 
  // Wait, `getSolutionsByCompanyId` is usually for Admin list in backend route. Public usually filters by category.
  // Exception: Public detail page might need other solutions?
  // Let's assume:
  // getCompaniesByCategory -> Public (Localized)
  // getAllCompanies -> Admin list? (Localized is fine for list usually, but Admin might want full? User said "Admin uses Entity". So maybe Entity?)
  // User said: "Admin and Edit uses Entity... create/update".
  // "Public places... use localizedDTO".
  
  // Refined plan:
  // getCompaniesByCategory -> Localized (Used in Hub)
  // getSolutionsByCompany -> Localized (Used in Hub)
  // search -> Localized (Used in Search)
  // 
  // getCompany -> Entity (For Edit)
  // getSolution -> Entity (For Edit)
  // 
  // getAllCompanies -> Admin uses this for table. Probably Localized is enough for table columns (name/ceo etc)? But if we want to show both languages... 
  // Backend `getAllCompanies` returns `Localized` now based on language. 
  // If admin needs BOTH names, we might need a separate API or just fetch one lang. 
  // For now, let's stick to Localized for lists to match backend refactor.
  
  // Admin Create/Update -> Entity
  createCompany: (company: SolutionCompany) => Promise<SolutionCompany>;
  updateCompany: (company: Partial<SolutionCompany> & { companyId: string }) => Promise<SolutionCompany | null>;
  deleteCompany: (companyId: string) => Promise<boolean>;

  createSolution: (solution: SolutionItem) => Promise<SolutionItem>;
  updateSolution: (solution: Partial<SolutionItem> & { solutionId: string }) => Promise<SolutionItem | null>;
  deleteSolution: (solutionId: string) => Promise<boolean>;

  // Getters
  getCompany: (companyId: string) => Promise<SolutionCompany | null>; // Admin Edit
  getSolution: (solutionId: string) => Promise<SolutionItem | null>; // Admin Edit

  // Search
  search: (query: string, lang?: string) => Promise<SolutionItemLocalized[]>;
}

type LocaleRepositoryMapper<R> = { [key in Locale]: R };

export class LocaleFacade<R> {
  private localeInstances: LocaleRepositoryMapper<R>;

  constructor(localeInstances: LocaleRepositoryMapper<R>) {
    this.localeInstances = localeInstances;
  }

  pickLocale(lang: Locale): R {
    return this.localeInstances[lang];
  }
}

export interface AseanBannerRepository {
  getItemAll: (lang: Locale) => AseanBannerItem[];
}



export interface ProjectRecordRepository {
  setItemList: (items: ProjectRecordItem[]) => Promise<ProjectRecordItem[]>;
  getItemList: (primary?: boolean) => Promise<ProjectRecordItem[]>;
}

export interface GeneralArticleRepository {
  getList: (
    page: number,
    perPage: number,
    query?: {
      kindRegex?: string;
      contentsRegex?: string;
      titleRegex?: string;
    }
  ) => Promise<Omit<GeneralArticle, "contents">[]>;
  getCountByKind: (kind: string | string[]) => Promise<number>;

  post: (article: Partial<GeneralArticle>) => Promise<GeneralArticle>;
  getById: (articleId: number) => Promise<GeneralArticle>;
  delete: (articleId: number) => Promise<GeneralArticle>;
}

export interface AttachmentFileRepository {
  upload(file: File): Promise<AttachmentFile>;
  delete(id: number): Promise<AttachmentFile>;
  getInfo(id: number): Promise<AttachmentFile>;
}

export interface AuthTokenIDPWRepository {
  issue: (auth: { id: string; pw: string }) => Promise<string>;
  whoami: (token: string) => Promise<UserItem | null>;
}

export interface PrimaryArticleRepository {
  get: (kind: string) => Promise<PrimaryArticle>;
  set: (kind: string, contents: string) => Promise<PrimaryArticle>;
}
