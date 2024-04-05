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
  readonly id?: number;
  title: string;
  kind: string;
  contents: string;
  files: number[];
  readonly views?: number;
  isPublic: boolean;
  readonly createdBy?: string;
  readonly createdAt?: Date;
  modifiedBy?: string;
  modifiedAt?: Date;
};

export type GeneralArticleMeta = Omit<GeneralArticle, "contents">;

export type AttachmentFileMeta = {
  readonly id: number | undefined;
  readonly href: string | undefined;
  name: string;
};

export type Article = {
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

export type PrimaryArticleKind = "ko_greeting" | "en_greeting";

export type AuthTokenGetter = () => string | null;
export type AuthTokenSetter = (token: string | null) => void;

export type UserItem = {
  id: string;
  name: string;
  privilege: "manager" | "user";
};
