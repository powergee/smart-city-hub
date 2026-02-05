export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export type AseanBannerItem = {
  id: string;
  countryName: string;
  description: string[]; // for multiple lines
  buttonPosition: [x: number, y: number];
};

export type ProjectRecordItem = {
  year: [start: number, end?: number];
  client: string;
  title: string;
  isPrimary: boolean;
};

export type GeneralArticle = {
  readonly id: number;
  title: string;
  kind: string;
  contents: string;
  attachmentIds: number[];
  published: boolean;
  views: number;
  createdBy: string;
  createdAt: Date;
  readonly modifiedBy: string;
  readonly modifiedAt: Date;
};

export type GeneralArticleThumbnailHrefGetter = (articleId: number, type: "img" | "pdf") => string;

export type AttachmentFile = {
  readonly id: number;
  readonly href: string;
  name: string;
};

export type AuthTokenGetter = () => Promise<string | null>;
export type AuthTokenSetter = (token: string | null) => Promise<void>;

export type UserPrivilege = "manager" | "user";
export type UserItem = {
  id: string;
  name: string;
  privilege: UserPrivilege;
};

export type PrimaryArticle = {
  kind: string;
  contents: string;
  modifiedBy: string;
  modifiedAt: Date;
};

export type SolutionCompany = {
  companyId: string;
  ko: {
    name: string;
    ceo: string;
    address: string;
    tel: string;
    fax: string;
    website: string;
  };
  en: {
    name: string;
    ceo: string;
    address: string;
    tel: string;
    fax: string;
    website: string;
  };
};

export type SolutionItemDetails = {
  title: string;
  summary: string;
  abstract: string;
  feature: string;
  composition: string;
};

export type SolutionItem = {
  solutionId: string;
  companyId: string;
  superCategoryId: number;
  mainCategoryId: number;
  subCategoryId: number;
  ko: SolutionItemDetails;
  en: SolutionItemDetails;
};

// Localized View
export type SolutionCompanyLocalized = {
  companyId: string;
  name: string;
  ceo: string;
  address: string;
  tel: string;
  fax: string;
  website: string;
};

export type SolutionItemLocalized = {
  solutionId: string;
  companyId: string;
  mainCategoryId: number;
  subCategoryId: number;
  title: string;
  summary: string;
  abstract: string;
  feature: string;
  composition: string;
};
