import mongoose from "mongoose";

/* config */
const MONGODB_URI = "mongodb://db/smarthub-v2";

export const db = mongoose.createConnection(MONGODB_URI);
