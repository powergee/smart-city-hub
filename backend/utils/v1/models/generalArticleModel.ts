import Mongoose from "mongoose";
import { Model, Document, Schema, model } from "mongoose";
import { IMeta, MetaSchemaDefinition } from "./meta";
const AutoIncrement = require("mongoose-sequence")(Mongoose);

export interface IGeneralArticle extends Document {
    articleId: number,
    title: string,
    contents: string,
    images: number[],
    files: number[],
    kind: string,
    views: number,
    isPublic: boolean,
    createdBy: string,
    lastModifiedBy: string,
    meta: IMeta
}

const generalArticleSchema = new Schema({
    articleId: {
        type: Number,
        unique: true
    },
    title: String,
    contents: String,
    images: [Number],
    files: [Number],
    kind: String,
    views: Number,
    isPublic: Boolean,
    createdBy: String,
    lastModifiedBy: String,
    meta: MetaSchemaDefinition
});

generalArticleSchema.plugin(AutoIncrement, {inc_field: 'articleId'});
export const GeneralArticleModel:Model<IGeneralArticle> = model("GeneralArticle", generalArticleSchema);