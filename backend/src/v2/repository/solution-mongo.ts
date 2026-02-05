import mongoose from "mongoose";
import { SolutionCompany, SolutionItem } from "../core/model";
import { SolutionRepository } from "../core/repository";

const { Schema } = mongoose;

const SolutionCompanySchema = new Schema<SolutionCompany>(
  {
    companyId: { type: String, required: true, unique: true },
    ko: {
      name: { type: String, default: "" },
      ceo: { type: String, default: "" },
      address: { type: String, default: "" },
      tel: { type: String, default: "" },
      fax: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    en: {
      name: { type: String, default: "" },
      ceo: { type: String, default: "" },
      address: { type: String, default: "" },
      tel: { type: String, default: "" },
      fax: { type: String, default: "" },
      website: { type: String, default: "" },
    },
  },
  { versionKey: false }
);

const SolutionItemSchema = new Schema<SolutionItem>(
  {
    solutionId: { type: String, required: true, unique: true },
    companyId: { type: String, required: true },
    superCategoryId: { type: Number, required: true },
    mainCategoryId: { type: Number, required: true },
    subCategoryId: { type: Number, required: true },
    ko: {
      title: { type: String, default: "" },
      summary: { type: String, default: "" },
      abstract: { type: String, default: "" },
      feature: { type: String, default: "" },
      composition: { type: String, default: "" },
    },
    en: {
      title: { type: String, default: "" },
      summary: { type: String, default: "" },
      abstract: { type: String, default: "" },
      feature: { type: String, default: "" },
      composition: { type: String, default: "" },
    },
  },
  { versionKey: false }
);

SolutionItemSchema.index({ superCategoryId: 1, mainCategoryId: 1, subCategoryId: 1 });
SolutionItemSchema.index({ companyId: 1 });

export class SolutionMongoRepo implements SolutionRepository {
  private readonly CompanyModel: mongoose.Model<SolutionCompany>;
  private readonly SolutionModel: mongoose.Model<SolutionItem>;

  constructor(params: { db: mongoose.Connection }) {
    this.CompanyModel = params.db.model("SolutionCompany", SolutionCompanySchema);
    this.SolutionModel = params.db.model("SolutionItem", SolutionItemSchema);
  }

  // Helper to remove _id and return clean object if needed, 
  // currently just returning the doc as POJO is sufficient if properly typed.
  private mapCompany(doc: any): SolutionCompany {
    if (!doc) return null as any;
    const { _id, ...rest } = doc;
    return rest as SolutionCompany;
  }

  private mapSolution(doc: any): SolutionItem {
    if (!doc) return null as any;
    const { _id, ...rest } = doc;
    return rest as SolutionItem;
  }

  async getCompaniesByCategory(params: {
    mainCategoryId: number;
    subCategoryId?: number;
    lang?: string;
  }): Promise<SolutionCompany[]> {
    const { mainCategoryId, subCategoryId } = params;

    const solutionQuery: any = { mainCategoryId };
    if (subCategoryId !== undefined) {
      solutionQuery.subCategoryId = subCategoryId;
    }

    // Find companies that have solutions in this category
    // Distinct is useful here
    const companyIds = await this.SolutionModel.distinct("companyId", solutionQuery);

    if (companyIds.length === 0) {
      return [];
    }

    const companies = await this.CompanyModel.find({
      companyId: { $in: companyIds },
    }).lean();

    return companies.map(c => this.mapCompany(c));
  }

  async getAllCompanies(page: number = 1, perPage: number = 10): Promise<{ items: SolutionCompany[]; total: number }> {
    const skip = (page - 1) * perPage;
    const [items, total] = await Promise.all([
      this.CompanyModel.find({}).skip(skip).limit(perPage).lean(),
      this.CompanyModel.countDocuments({}),
    ]);
    return { items: items.map(c => this.mapCompany(c)), total };
  }

  async getCompany(companyId: string, lang?: string): Promise<SolutionCompany | null> {
    const company = await this.CompanyModel.findOne({ companyId }).lean();
    return company ? this.mapCompany(company) : null;
  }

  async getSolutionsByCompany(params: {
    companyId: string;
    mainCategoryId: number;
    subCategoryId?: number;
    lang?: string;
  }): Promise<SolutionItem[]> {
    const { companyId, mainCategoryId, subCategoryId } = params;

    const query: any = { companyId, mainCategoryId };
    if (subCategoryId !== undefined) {
      query.subCategoryId = subCategoryId;
    }

    const solutions = await this.SolutionModel.find(query).lean();
    return solutions.map(s => this.mapSolution(s));
  }

  async getSolution(solutionId: string, lang?: string): Promise<SolutionItem | null> {
    const solution = await this.SolutionModel.findOne({ solutionId }).lean();
    return solution ? this.mapSolution(solution) : null;
  }

  async createCompany(company: SolutionCompany): Promise<SolutionCompany> {
    const newDoc = await this.CompanyModel.create(company);
    return this.mapCompany(newDoc.toObject());
  }

  async getSolutionsByCompanyId(companyId: string, lang?: string): Promise<SolutionItem[]> {
    const solutions = await this.SolutionModel.find({ companyId }).lean();
    return solutions.map(s => this.mapSolution(s));
  }

  async updateCompany(company: Partial<SolutionCompany> & { companyId: string }): Promise<SolutionCompany | null> {
    const { companyId, ...rest } = company;
    const res = await this.CompanyModel.findOneAndUpdate({ companyId }, rest, { new: true }).lean();
    return res ? this.mapCompany(res) : null;
  }

  async deleteCompany(companyId: string): Promise<boolean> {
    const res = await this.CompanyModel.deleteOne({ companyId });
    return res.deletedCount > 0;
  }

  async createSolution(solution: SolutionItem): Promise<SolutionItem> {
    const newDoc = await this.SolutionModel.create(solution);
    return this.mapSolution(newDoc.toObject());
  }

  async updateSolution(solution: Partial<SolutionItem> & { solutionId: string }): Promise<SolutionItem | null> {
    const { solutionId, ...rest } = solution;
    const res = await this.SolutionModel.findOneAndUpdate({ solutionId }, rest, { new: true }).lean();
    return res ? this.mapSolution(res) : null;
  }

  async deleteSolution(solutionId: string): Promise<boolean> {
    const res = await this.SolutionModel.deleteOne({ solutionId });
    return res.deletedCount > 0;
  }

  async search(query: string, lang: string = 'ko'): Promise<SolutionItem[]> {
    // I implemented this search function in a naive way: text-search
    // If you find bottleneck, please refactor this function to use a more efficient search method.

    const regex = new RegExp(query, "i");
    const langPrefix = lang === 'en' ? 'en' : 'ko';

    const aggregation = [
      {
        $lookup: {
          from: "solutioncompanies",
          localField: "companyId", // Join using companyId string
          foreignField: "companyId", // Join using companyId string
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $match: {
          $or: [
            // Solution Fields
            { [`${langPrefix}.title`]: regex },
            { [`${langPrefix}.summary`]: regex },
            { [`${langPrefix}.abstract`]: regex },
            { [`${langPrefix}.feature`]: regex },
            { [`${langPrefix}.composition`]: regex },
            // Company Fields
            { [`company.${langPrefix}.name`]: regex },
            { [`company.${langPrefix}.ceo`]: regex },
            { [`company.${langPrefix}.address`]: regex },
          ],
        },
      },
    ];

    const solutions = await this.SolutionModel.aggregate(aggregation);
    return solutions.map(s => this.mapSolution(s));
  }
}
