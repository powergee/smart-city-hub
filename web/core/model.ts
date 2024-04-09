export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export type AseanBannerItem = {
  countryName: string;
  description: string[]; // for multiple lines
  buttonPosition: [x: number, y: number];
};

export type ProjectRecordItem = {
  year: [start: number, end: number];
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

export type AuthTokenGetter = () => string | null;
export type AuthTokenSetter = (token: string | null) => void;

export type UserPrivilege = "manager" | "user";
export type UserItem = {
  id: string;
  name: string;
  privilege: UserPrivilege;
};

export type PrimaryArticleKind = "greeting" | "goal";

export type PrimaryArticle = {
  kind: PrimaryArticleKind;
  contents: string;
  modifiedBy: string;
  modifiedAt: Date;
};
