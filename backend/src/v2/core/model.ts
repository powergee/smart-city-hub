export type UserPrivilege = "manager" | "user";

export type PasswordMethod = "sha512";
export type Password = {
  hash: string;
  salt: string;
  method: PasswordMethod;
};

export type User = {
  userId: string;
  name: string;
  privilege: UserPrivilege;
  enabled: boolean;
  createdAt: Date;
};

export type UserAuthTokenPayload = {
  userId: string;
  name: string;
  type: "access";
};

export type GeneralArticle = {
  articleId: number;
  title: string;
  contents: string;
  kind: string;
  views: number;
  attachments: number[];
  published: boolean;
  createdBy: string;
  createdAt: Date;
  modifiedBy: string;
  modifiedAt: Date;
};

export type ImageResizer = (buffer: Buffer) => Promise<Buffer>;
export type ThumbnailGenerator = (fileItem: FileItem) => Promise<Buffer | null>;

export type FileItem = {
  fileId: number;
  name: string;
  localPath: string;
};

export type SolutionItem = {
  solutionId: string;
  companyId: string;
  title: string;
  mainImage: string;
  mainCategory: string;
  subCategory: string;
  summary: string;
  contents: string;
  createdAt: Date;
  createdByAi: boolean;
};

export type SolutionCompany = {
  companyId: string;
  name: string;
  logoImage: string;
  address: string;
  contact: string;
  website: string;
  category: string;
  year: number;
};
