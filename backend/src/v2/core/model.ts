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

export type SolutionCompanyDetails = {
    name: string;
    ceo: string;
    address: string;
    tel: string;
    fax: string;
    website: string;
}

export type SolutionCompany = {
    companyId: string;
    ko: SolutionCompanyDetails;
    en: SolutionCompanyDetails;
}

export type SolutionItemDetails = {
    title: string;
    summary: string;
    abstract: string;
    feature: string;
    composition: string;
}

export type SolutionItem = {
    solutionId: string;
    companyId: string;
    superCategoryId: number;
    mainCategoryId: number;
    subCategoryId: number;
    ko: SolutionItemDetails;
    en: SolutionItemDetails;
}