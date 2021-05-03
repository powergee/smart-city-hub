import Mongoose from "mongoose"

export interface IMeta extends Mongoose.Document {
    createdAt: Date,
    modifiedAt: Date
}

export const MetaSchemaDefinition = {
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
};