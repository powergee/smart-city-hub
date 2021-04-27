import db from "./utils/database";
import app from "./utils/app";
import env from "./env"
import readline from "readline";
import { executeLine } from "./interact";

db.prepareDB();

if (process.argv[process.argv.length-1] === "-i") {
    process.stdout.write("You're in Interactive Mode.\n");

    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    reader.on("line", (line) => {
        executeLine(line);
    });
    reader.on("close", () => {
        reader.close();
        process.exit();
    })
} else {
    const port = env.port || 4000;

    app.listen(port, () => {
        console.log("Listening to http://0.0.0.0:" + port);
    });
}