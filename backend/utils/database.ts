import Koa from "koa";
import mongoose from "mongoose";
import env from "dotenv";
import { CollectionInfo } from "./types"

async function connectDB() {
    env.config();

    let mongoURI = "";
    if (process.env.MONGO_URI != undefined)
        mongoURI = process.env.MONGO_URI;

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then(async () => {
        const collections = await mongoose.connection.db.listCollections().toArray();
        
        let exist = collections.findIndex((coll: CollectionInfo) => coll.name === "GeneralPosts");
        if (exist === -1) {
            await mongoose.connection.db.createCollection("GeneralPosts");
        }

        exist = collections.findIndex((coll: CollectionInfo) => coll.name === "Files");
        if (exist === -1) {
            await mongoose.connection.db.createCollection("Files");
        }
        
        exist = collections.findIndex((coll: CollectionInfo) => coll.name === "Users");
        if (exist === -1) {
            await mongoose.connection.db.createCollection("Users");
        }

        console.log('Database is online.');
    }).catch((e: Error) => {
        throw e;
    });
}

async function prepareDB(): Promise<void> {
    await connectDB();
}

async function prepareDBMiddleware(ctx: Koa.Context, next: Koa.Next): Promise<any> {
    if (mongoose.connection.readyState == 0) {
        await connectDB();
    }
    return next();
}

export default { prepareDB, prepareDBMiddleware }