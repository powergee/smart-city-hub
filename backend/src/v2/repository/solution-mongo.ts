/* eslint-disable @typescript-eslint/no-explicit-any */

import { SolutionItem, SolutionCompany } from "../core/model";
import { SolutionRepository } from "../core/repository";
import mongoose from "mongoose";

export class SolutionMongoRepo implements SolutionRepository {
  static readonly solutionItemSchema = new mongoose.Schema({
    solutionId: { type: String, unique: true },
    companyId: String,
    title: String,
    mainImage: String,
    mainCategory: String,
    subCategory: String,
    summary: String,
    contents: String,
    createdAt: { type: Date, default: Date.now },
    createdByAi: Boolean,
  });
  readonly SolutionItemModel;

  static readonly solutionCompanySchema = new mongoose.Schema({
    companyId: { type: String, unique: true },
    name: String,
    logoImage: String,
    address: String,
    contact: String,
    website: String,
    category: String,
    year: Number,
  });
  readonly SolutionCompanyModel;

  constructor(params: { db: mongoose.Connection }) {
    this.SolutionItemModel = params.db.model("SolutionItem", SolutionMongoRepo.solutionItemSchema);
    this.SolutionCompanyModel = params.db.model(
      "SolutionCompany",
      SolutionMongoRepo.solutionCompanySchema
    );
  }

  private convertToSolutionItem(document: any): SolutionItem {
    return {
      solutionId: document.solutionId,
      companyId: document.companyId,
      title: document.title,
      mainImage: document.mainImage,
      mainCategory: document.mainCategory,
      subCategory: document.subCategory,
      summary: document.summary,
      contents: document.contents,
      createdAt: document.createdAt,
      createdByAi: document.createdByAi,
    };
  }

  async findSolutions(query: {
    page: number;
    perPage: number;
    companyId?: string;
    mainCategory?: string;
    subCategory?: string;
    titleRegex?: string;
    contentsRegex?: string;
  }): Promise<Omit<SolutionItem, "contents" | "mainImage">[]> {
    let cursor = this.SolutionItemModel.find();

    if (query.companyId) {
      cursor = cursor.where("companyId").equals(query.companyId);
    }
    if (query.mainCategory) {
      cursor = cursor.where("mainCategory").equals(query.mainCategory);
    }
    if (query.subCategory) {
      cursor = cursor.where("subCategory").equals(query.subCategory);
    }
    if (query.titleRegex) {
      cursor = cursor.where("title").regex(new RegExp(query.titleRegex));
    }
    if (query.contentsRegex) {
      cursor = cursor.where("contents").regex(new RegExp(query.contentsRegex));
    }

    const documents = await cursor
      .skip((query.page - 1) * query.perPage)
      .limit(query.perPage)
      .select("-contents -mainImage");

    return documents.map(this.convertToSolutionItem);
  }

  async findCompanies(query: { page: number; perPage: number }): Promise<SolutionCompany[]> {
    const documents = await this.SolutionCompanyModel.find()
      .skip((query.page - 1) * query.perPage)
      .limit(query.perPage);
    return documents.map(this.convertToSolutionCompany);
  }

  async findCompaniesByCategory(query: {
    page: number;
    perPage: number;
    mainCategory: string;
    subCategory?: string;
  }): Promise<SolutionCompany[]> {
    let cursor = this.SolutionItemModel.find({
      mainCategory: query.mainCategory,
    });
    if (query.subCategory) {
      cursor = cursor.where("subCategory").equals(query.subCategory);
    }
    const companyIds = (await cursor).map((document) => document.companyId);
    const companyCursor = await this.SolutionCompanyModel.find({
      companyId: { $in: companyIds },
    })
      .skip((query.page - 1) * query.perPage)
      .limit(query.perPage);
    return companyCursor.map(this.convertToSolutionCompany);
  }

  async insertSolution(solution: SolutionItem): Promise<SolutionItem> {
    let document = await this.SolutionItemModel.findOne({ solutionId: solution.solutionId });
    if (document) {
      document.set({ ...solution });
      await document.save();
      return this.convertToSolutionItem(document);
    }

    document = await this.SolutionItemModel.create({ ...solution });
    return this.convertToSolutionItem(document);
  }

  async findSolutionById(solutionId: string): Promise<SolutionItem | null> {
    const document = await this.SolutionItemModel.findOne({ solutionId: solutionId });
    if (!document) return null;
    return this.convertToSolutionItem(document);
  }

  async deleteSolution(solutionId: string): Promise<SolutionItem | null> {
    const document = await this.SolutionItemModel.findOneAndDelete({ solutionId: solutionId });
    if (!document) return null;
    return this.convertToSolutionItem(document);
  }

  private convertToSolutionCompany(document: any): SolutionCompany {
    return {
      companyId: document.companyId,
      name: document.name,
      logoImage: document.logoImage,
      address: document.address,
      contact: document.contact,
      website: document.website,
      category: document.category,
      year: document.year,
    };
  }

  async insertCompany(company: SolutionCompany): Promise<SolutionCompany> {
    let document = await this.SolutionCompanyModel.findOne({ companyId: company.companyId });
    if (document) {
      document.set({ ...company });
      await document.save();
      return this.convertToSolutionCompany(document);
    }

    document = await this.SolutionCompanyModel.create({ ...company });
    return this.convertToSolutionCompany(document);
  }

  async findCompanyById(companyId: string): Promise<SolutionCompany | null> {
    const document = await this.SolutionCompanyModel.findOne({ companyId: companyId });
    if (!document) return null;
    return this.convertToSolutionCompany(document);
  }

  async deleteCompany(companyId: string): Promise<SolutionCompany | null> {
    const document = await this.SolutionCompanyModel.findOneAndDelete({ companyId: companyId });
    if (!document) return null;
    return this.convertToSolutionCompany(document);
  }
}
