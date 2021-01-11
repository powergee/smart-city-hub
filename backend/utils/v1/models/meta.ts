import Mongoose from "mongoose"

export interface IMeta extends Mongoose.Document {
    createdAt: Date,
    modifiedAt: Date
}

export const MetaSchemaDefinition = {
    createdAt: { type: Date, default: new Date() },
    modifiedAt: { type: Date, default: new Date() }
};