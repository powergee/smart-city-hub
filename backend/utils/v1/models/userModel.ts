import Mongoose from "mongoose"
import { IMeta, MetaSchemaDefinition } from "./meta"

export interface IUser extends Mongoose.Document {
    userId: string,
    userName: string,
    userPwHash: string,
    userPwSalt: string,
    isManager: boolean,
    meta: IMeta
}

const userSchema = new Mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    userName: String,
    userPwHash: String,
    userPwSalt: String,
    isManager: Boolean,
    meta: MetaSchemaDefinition
});

export const UserModel:Mongoose.Model<IUser> = Mongoose.model("User", userSchema);