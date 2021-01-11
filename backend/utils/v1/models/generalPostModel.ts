import Mongoose from "mongoose"
import { IMeta, MetaSchemaDefinition } from "./meta"
import AutoIncrement from 'mongoose-sequence';

export interface IGeneralPost extends Mongoose.Document {
    postId: number,
    contents: string,
    images: number[],
    files: number[],
    kind: string,
    meta: IMeta
}

const generalPostSchema = new Mongoose.Schema({
    postId: {
        type: Number,
        unique: true
    },
    contents: String,
    images: [Number],
    files: [Number],
    kind: String,
    meta: MetaSchemaDefinition
});

generalPostSchema.plugin(AutoIncrement, {inc_field: 'postId'});
export const GeneralPostModel:Mongoose.Model<IGeneralPost> = Mongoose.model("GeneralPost", generalPostSchema);