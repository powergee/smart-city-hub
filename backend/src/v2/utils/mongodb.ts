import mongoose from "mongoose";

/* config */
export const mongodb_v1 = mongoose.createConnection("mongodb://db/smarthub");
export const mongodb_v2 = mongoose.createConnection("mongodb://db/smarthub-v2");
