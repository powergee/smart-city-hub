import Mongoose from "mongoose";
import { Model, Document, Schema, model } from "mongoose"
import { IMeta, MetaSchemaDefinition } from "./meta"
const AutoIncrement = require("mongoose-sequence")(Mongoose);

export interface IFile extends Document {
    fileId: number,
    originalName: string,
    localPath: string,
    kind: string,
    meta: IMeta
}

const fileSchema = new Schema({
    fileId: {
        type: Number,
        unique: true
    },
    originalName: String,
    localPath: String,
    kind: String,
    meta: MetaSchemaDefinition
});

fileSchema.plugin(AutoIncrement, {inc_field: 'articleId'});
export const FileModel:Model<IFile> = model("File", fileSchema);