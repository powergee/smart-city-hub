import {
  AseanBannerItem,
  ProjectRecordItem,
  Locale,
  GeneralArticle,
  GeneralArticleMeta,
  AttachmentFileMeta,
  UserItem,
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
  getSuperCategoryNameAll: () => Promise<{ id: string; name: string }[]>;
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
  ) => Promise<GeneralArticleMeta[]>;
  getCountByKind: (kind: string) => Promise<number>;
  getById: (id: number) => Promise<GeneralArticle>;
  post: (article: GeneralArticle) => Promise<GeneralArticle>;
  delete: (id: number) => Promise<GeneralArticleMeta>;
}

export interface AttachmentFileRepository {
  upload(file: File): Promise<AttachmentFileMeta>;
  delete(id: number): Promise<AttachmentFileMeta>;
  getInfo(id: number): Promise<AttachmentFileMeta>;
}

export interface AuthTokenIDPWRepository {
  issue: (auth: { id: string; pw: string }) => Promise<string>;
  whoami: (token: string) => Promise<UserItem | null>;
}
