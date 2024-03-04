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
