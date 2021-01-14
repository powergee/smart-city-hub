import Mongoose from "mongoose";
import { Model, Document, Schema, model } from "mongoose"
import { IMeta, MetaSchemaDefinition } from "./meta"
const AutoIncrement = require("mongoose-sequence")(Mongoose);

export interface IFile extends Document {
    fileId: number,
    originalName: string,
    localPath: string,
    parentArticleId: number,
    meta: IMeta
}

const fileSchema = new Schema({
    fileId: {
        type: Number,
        unique: true
    },
    originalName: String,
    localPath: String,
    parentArticleId: Number,
    meta: MetaSchemaDefinition
});

fileSchema.plugin(AutoIncrement, {inc_field: 'fileId'});
export const FileModel:Model<IFile> = model("File", fileSchema);