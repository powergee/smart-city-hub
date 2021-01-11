import Mongoose from "mongoose"
import { IMeta, MetaSchemaDefinition } from "./meta"

export interface IFile extends Mongoose.Document {
    fileId: number,
    originalName: string,
    localPath: string,
    kind: string,
    meta: IMeta
}

const fileSchema = new Mongoose.Schema({
    fileId: Number,
    originalName: String,
    localPath: String,
    kind: String,
    meta: MetaSchemaDefinition
});

export const FileModel:Mongoose.Model<IFile> = Mongoose.model("File", fileSchema);