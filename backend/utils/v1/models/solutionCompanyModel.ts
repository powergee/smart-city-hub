import { Schema, Document, model } from "mongoose";

interface SolutionCompany extends Document {
  name: string;
  nameEng: string;
  representative: string;
  location: string;
  summary: string;
  website: string;
  contact: string;
  logo: string;
  detail: string;
}

const schema = new Schema({
  name: { type: String, required: true },
  nameEng: String,
  representative: String,
  location: String,
  summary: String,
  website: String,
  contact: String,
  logo: String,
  detail: String,
});

const SolutionCompanyModel = model<SolutionCompany>("SolutionCompany", schema);

export { SolutionCompany, SolutionCompanyModel };
