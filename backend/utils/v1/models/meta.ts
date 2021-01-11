import Mongoose from "mongoose"

const getUTCDate = ():Date => {
    const current = new Date();
    return new Date(current.getUTCDate())
};

export interface IMeta extends Mongoose.Document {
    createdAt: Date,
    modifiedAt: Date
}

export const MetaSchemaDefinition = {
    createdAt: { type: Date, default: getUTCDate() },
    modifiedAt: { type: Date, default: getUTCDate() }
};