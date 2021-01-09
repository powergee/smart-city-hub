import Mongoose from "mongoose"
import metaType from "./meta"
import AutoIncrement from 'mongoose-sequence';

const additionalFieldsSchema = new Mongoose.Schema({
    key: [String],
    value: [String]
});

const generalPostSchema = new Mongoose.Schema({
    postId: {
        type: Number,
        unique: true
    },
    contents: String,
    images: [Number],
    files: [Number],
    additionalFields: [additionalFieldsSchema],
    meta: metaType
});

generalPostSchema.plugin(AutoIncrement, {inc_field: 'postId'});
const GeneralPostModel = Mongoose.model("GeneralPost", generalPostSchema);
export default GeneralPostModel