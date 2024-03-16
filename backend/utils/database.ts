import Koa from "koa";
import mongoose, { ConnectOptions } from "mongoose";
import env from "../env";

async function connectDB() {
    const mongoURI = env.mongoURI;

    mongoose.connect(mongoURI).then(async () => {
        const collections = await mongoose.connection.db.listCollections().toArray();

        let exist = collections.findIndex((coll) => coll.name === "GeneralArticles");
        if (exist === -1) {
            await mongoose.connection.db.createCollection("GeneralArticles");
        }

        exist = collections.findIndex((coll) => coll.name === "Files");
        if (exist === -1) {
            await mongoose.connection.db.createCollection("Files");
        }
        
        exist = collections.findIndex((coll) => coll.name === "Users");
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