import { Schema, Document, Types, model } from "mongoose";

interface Solution extends Document {
  companyId: Types.ObjectId;
  title: string;
  summary: string;
  categoryTag: string[];
  detail: string;
}

const schema = new Schema({
  companyId: { type: Types.ObjectId, required: true },
  title: { type: String, required: true },
  summary: String,
  categoryTag: [String],
  detail: String,
});

const SolutionModel = model<Solution>("Solution", schema);

export { Solution, SolutionModel };
