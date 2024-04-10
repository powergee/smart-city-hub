import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

interface IEnv {
  port: string;
  mongoURI: string;
  accessTokenKey: string;
  filesDirectory: string;
}

if (process.env.PORT === undefined) process.env.PORT = "4000";

if (process.env.MONGO_URI === undefined) {
  throw new Error("MONGO_URI is not set.");
}

if (process.env.ACCESS_SECRET_KEY_FILE) {
  process.env.ACCESS_SECRET_KEY = fs.readFileSync(process.env.ACCESS_SECRET_KEY_FILE).toString();
}

if (process.env.ACCESS_SECRET_KEY === undefined) {
  throw new Error("ACCESS_SECRET_KEY is not set.");
}

if (process.env.FILES_DIRECTORY === undefined) {
  throw new Error("FILES_DIRECTORY is not set.");
}

const env: IEnv = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  accessTokenKey: process.env.ACCESS_SECRET_KEY,
  filesDirectory: process.env.FILES_DIRECTORY,
};

export default env;
