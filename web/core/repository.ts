import { AseanBannerItem, ProjectRecordItem, Locale } from "core/model";

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
