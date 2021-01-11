import { Model, Document, Schema, model } from "mongoose"
import { IMeta, MetaSchemaDefinition } from "./meta"

export interface IUser extends Document {
    userId: string,
    userName: string,
    userPwHash: string,
    userPwSalt: string,
    isManager: boolean,
    isAllowed: boolean,
    meta: IMeta
}

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true
    },
    userName: String,
    userPwHash: String,
    userPwSalt: String,
    isManager: Boolean,
    isAllowed: Boolean,
    meta: MetaSchemaDefinition
});

export const UserModel:Model<IUser> = model("User", userSchema);