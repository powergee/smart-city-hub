import { GeneralArticle } from "../core/model";
import { GeneralArticleRepository } from "../core/repository";
import mongoose from "mongoose";

export class GeneralArticleMongoRepo implements GeneralArticleRepository {
  static readonly schema = new mongoose.Schema({
    articleId: { type: Number, unique: true },
    title: String,
    contents: String,
    images: [Number],
    files: [Number],
    kind: String,
    views: Number,
    isPublic: Boolean,
    createdBy: String,
    lastModifiedBy: String,
    meta: {
      createdAt: { type: Date, default: Date.now },
      modifiedAt: { type: Date, default: Date.now },
    },
  });
  readonly GeneralArticleModel;

  constructor(params: { db: mongoose.Connection; collectionName: string }) {
    this.GeneralArticleModel = params.db.model(
      params.collectionName,
      GeneralArticleMongoRepo.schema
    );
  }

  private convertToGeneralArticle(article: any): GeneralArticle {
    return {
      articleId: article.articleId,
      title: article.title,
      contents: article.contents,
      kind: article.kind,
      views: article.views,
      attachments: article.files,
      published: article.isPublic,
      createdBy: article.createdBy,
      createdAt: article.meta.createdAt,
      modifiedBy: article.lastModifiedBy,
      modifiedAt: article.meta.modifiedAt,
    };
  }

  async create(article: Omit<GeneralArticle, "articleId">): Promise<GeneralArticle> {
    // 1. first find the max articleId
    const maxArticleId = await this.GeneralArticleModel.findOne().sort({ articleId: -1 });
    const articleId = maxArticleId ? maxArticleId.articleId! + 1 : 1;

    // 2. create a new article
    const res = await this.GeneralArticleModel.create({
      articleId,
      title: article.title,
      contents: article.contents,
      kind: article.kind,
      views: article.views,
      files: article.attachments,
      isPublic: article.published,
      createdBy: article.createdBy,
      lastModifiedBy: article.modifiedBy,
    });

    return this.convertToGeneralArticle(res);
  }

  async query(
    query: {
      page: number;
      perPage: number;
      titleRegex?: string;
      contentRegex?: string;
      kindRegex?: string;
      publishedOnly?: boolean;
    },
    options?: { summary?: boolean }
  ): Promise<GeneralArticle[]> {
    let cursor = this.GeneralArticleModel.find();

    if (query.kindRegex) {
      const kindRegex = new RegExp(query.kindRegex);
      cursor = cursor.where("kind").equals(kindRegex);
    }
    if (query.titleRegex) {
      const titleRegex = new RegExp(query.titleRegex);
      cursor = cursor.where("title").equals(titleRegex);
    }
    if (query.contentRegex) {
      const contentRegex = new RegExp(query.contentRegex);
      cursor = cursor.where("contents").equals(contentRegex);
    }
    if (query.publishedOnly === undefined || query.publishedOnly === true) {
      cursor = cursor.where("isPublic").equals(true);
    }
    if (options?.summary) {
      cursor = cursor.select("-contents");
    }

    cursor = cursor.sort({ "meta.createdAt": -1 });
    cursor = cursor.skip((query.page - 1) * query.perPage);
    cursor = cursor.limit(query.perPage);

    const res = await cursor.exec();
    return res.map(this.convertToGeneralArticle);
  }

  async find(articleId: number): Promise<GeneralArticle | null> {
    const res = await this.GeneralArticleModel.findOne({ articleId });
    return res ? this.convertToGeneralArticle(res) : null;
  }

  async update(article: Partial<GeneralArticle>): Promise<GeneralArticle | null> {
    const prevArticle = await this.GeneralArticleModel.findOne({
      articleId: article.articleId,
    });
    if (!prevArticle) {
      return null;
    }

    /**
     * 인자로 받은 article 객체의 필드 중 값이 있는 것들만 업데이트한다.
     * 백엔드 모델과 데이터베이스 모델이 일대일 대응이 "아니므로" 필드명을 맞춰준다.
     */
    prevArticle.title = article.title ?? prevArticle.title;
    prevArticle.contents = article.contents ?? prevArticle.contents;
    prevArticle.kind = article.kind ?? prevArticle.kind;
    prevArticle.views = article.views ?? prevArticle.views;
    prevArticle.files = article.attachments ?? prevArticle.files;
    prevArticle.isPublic = article.published ?? prevArticle.isPublic;
    prevArticle.createdBy = article.createdBy ?? prevArticle.createdBy;
    prevArticle.lastModifiedBy = article.modifiedBy ?? prevArticle.lastModifiedBy;
    prevArticle.meta!.createdAt = article.createdAt ?? prevArticle.meta!.createdAt;
    prevArticle.meta!.modifiedAt = article.modifiedAt ?? prevArticle.meta!.modifiedAt;

    const newArticle = await prevArticle.save();
    return this.convertToGeneralArticle(newArticle);
  }

  async delete(articleId: number): Promise<GeneralArticle | null> {
    const res = await this.GeneralArticleModel.findOneAndDelete({ articleId });
    return res ? this.convertToGeneralArticle(res) : null;
  }

  async count(kindRegex: string, publishedOnly?: boolean): Promise<number> {
    const query: any = { kind: new RegExp(kindRegex) };
    if (publishedOnly === undefined || publishedOnly === true) {
      query.isPublic = true;
    }

    const count = await this.GeneralArticleModel.countDocuments(query);
    return count;
  }
}
