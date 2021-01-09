import Mongoose from "mongoose"
import metaType from "./meta"

const userSchema = new Mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    userName: String,
    userPwHash: String,
    isAllowed: Boolean,
    isManager: Boolean,
    meta: metaType
});

const UserModel = Mongoose.model("User", userSchema);
export default UserModel