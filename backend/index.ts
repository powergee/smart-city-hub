import db from "./utils/database";
import env from "dotenv";
import app from "./utils/app";

db.prepareDB();
env.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("Listening to http://0.0.0.0:4000")
});