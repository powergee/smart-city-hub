import Koa = require("koa");
import mongoose = require("mongoose");
import env = require("dotenv");

env.config();
const { MONGO_URI } = process.env;

const connectDB = async ():Promise<void> => {
    mongoose.connect(MONGO_URI, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        }
    ).then(() => {
        console.log('Database is online.');
    });
};

export default { connectDB }