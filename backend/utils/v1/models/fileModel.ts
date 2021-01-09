import Mongoose from "mongoose"
import metaType from "./meta"

const fileSchema = new Mongoose.Schema({
    fileId: Number,
    originalName: String,
    localPath: String,
    meta: metaType
});

const FileModel = Mongoose.model("File", fileSchema);
export default FileModel