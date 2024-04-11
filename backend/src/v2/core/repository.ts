import { User, Password, GeneralArticle, FileItem } from "./model";

export interface UserRepository {
  create(user: User, password: Password): Promise<User>;
  findAll(): Promise<User[]>;
  findByUserId(userId: string): Promise<User | null>;
  findPasswordByUserId(userId: string): Promise<Password | null>;
  update(user: User, password?: Password): Promise<User | null>;
  delete(userId: string): Promise<User | null>;
}

export interface GeneralArticleRepository {
  create(article: Partial<GeneralArticle>): Promise<GeneralArticle>;
  query(
    query: {
      page: number;
      perPage: number;
      titleRegex?: string;
      contentRegex?: string;
      kindRegex?: string;
      publishedOnly?: boolean;
    },
    options?: { summary?: boolean }
  ): Promise<GeneralArticle[]>;
  find(articleId: number): Promise<GeneralArticle | null>;
  update(article: Partial<GeneralArticle>): Promise<GeneralArticle | null>;
  delete(articleId: number): Promise<GeneralArticle | null>;
  count(kindRegex: string, publishedOnly?: boolean): Promise<number>;
}

export interface FileItemRepository {
  put(title: string, filePath: string): Promise<FileItem>;
  get(fileId: number): Promise<FileItem | null>;
  rm(fileId: number): Promise<boolean>;
}
