import Mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { IMeta, MetaSchemaDefinition } from "./meta";
/*eslint-disable */
const AutoIncrement = require("mongoose-sequence")(Mongoose);
/*eslint-enable */

export interface IGeneralArticle {
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
export const GeneralArticleModel = model<IGeneralArticle>("GeneralArticle", generalArticleSchema);