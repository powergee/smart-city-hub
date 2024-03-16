import Mongoose from "mongoose";
import { Schema, model } from "mongoose"
import { IMeta, MetaSchemaDefinition } from "./meta"
/*eslint-disable */
const AutoIncrement = require("mongoose-sequence")(Mongoose);
/*eslint-enable */

export interface IFile {
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
export const FileModel = model<IFile>("File", fileSchema);