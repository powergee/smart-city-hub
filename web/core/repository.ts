import {
  AseanBannerItem,
  ProjectRecordItem,
  Locale,
  GeneralArticle,
  AttachmentFile,
  UserItem,
  PrimaryArticle,
  PrimaryArticleKind,
  SolutionItem,
  SolutionCompany,
} from "core/model";

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

export interface SolutionRepository {
  getCompaniesByCategory: (params: {
    mainCategoryId: number;
    subCategoryId?: number;
  }) => Promise<SolutionCompany[]>;

  getSolutionsByCompany: (params: {
    companyId: number;
    mainCategoryId: number;
    subCategoryId?: number;
  }) => Promise<SolutionItem[]>;
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
  get: (kind: PrimaryArticleKind) => Promise<PrimaryArticle>;
  set: (kind: PrimaryArticleKind, contents: string) => Promise<PrimaryArticle>;
}
