import db from "./utils/database";
import app from "./utils/app";
import env from "./env"

db.prepareDB();

const port = env.port || 4000;

app.listen(port, () => {
    console.log("Listening to http://0.0.0.0:" + port)
});