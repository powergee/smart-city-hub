import { GeneralArticleModel, IGeneralArticle } from "./utils/v1/models/generalArticleModel";

export function executeLine(line: string): void {
    const tokens = line.trim().split(" ");
    if (tokens.length == 0) {
        return;
    }

    if (tokens[0] === "article") {
        handleArticles(tokens.slice(1));
    } else {
        process.stdout.write(`executeLine: Invalid token, '${tokens[0]}'\n`);
    }
}

async function handleArticles(tokens: Array<string>) {
    if (tokens.length === 0) {
        process.stdout.write("article: No sub commands are added.\n");
    } else if (tokens[0] === "list") {
        const res:Array<IGeneralArticle> = await GeneralArticleModel.find().exec();
        process.stdout.write(`${res.length} articles are found.\n`);

        res.forEach((article:IGeneralArticle) => {
            process.stdout.write(`${article.articleId}: ${article.title} (kind: ${article.kind})\n`);
        })
    } else if (tokens[0] === "details") {
        if (tokens.length == 1) {
            process.stdout.write("chdate: articleId must be added.\n");
            return;
        }

        const res:IGeneralArticle = await GeneralArticleModel.findOne({ articleId: Number(tokens[1]) }).exec();
        process.stdout.write(String(res));
        process.stdout.write("\n");
    } else if (tokens[0] === "regdate") {
        if (tokens.length != 5) {
            process.stdout.write("regdate: Usage 'article regdate {kind} {start year} {start month} {unit count}'\n");
            return;
        }

        const kind = tokens[1];
        let year = Number(tokens[2]);
        let month = Number(tokens[3])-1;
        const count = Number(tokens[4]);

        const res:Array<IGeneralArticle> = await GeneralArticleModel.find()
            .where("kind").equals(kind).sort({ articleId: 1 }).exec();

        let half = true;
        let changed = 0;
        res.forEach(article => {
            article.meta.createdAt.setHours(12);
            article.meta.createdAt.setDate(1);
            article.meta.createdAt.setFullYear(year);
            article.meta.createdAt.setMonth(month);

            if (half) {
                article.meta.createdAt.setDate(15);
            } else {
                article.meta.createdAt.setDate(new Date(year, month+1, 0).getDate());
            }

            let current = new Date();
            current.setDate(current.getDate()-1)
            if (current.getTime() < article.meta.createdAt.getTime()) {
                article.meta.createdAt = current;
            }

            process.stdout.write(String(article.meta.createdAt) + "\n");
            article.markModified("meta");
            article.save();

            ++changed;
            if (changed % count === 0) {
                if (!half) {
                    if (++month === 12) {
                        ++year;
                        month = 0;
                    }
                }
                half = !half;
            }
        });
    } else if (tokens[0] === "chdate") {
        if (tokens.length != 5) {
            process.stdout.write("regdate: Usage 'article chdate {article id} {year} {month} {day}'\n");
            return;
        }

        const articleId = Number(tokens[1]);
        const year = Number(tokens[2]);
        const month = Number(tokens[3])-1;
        const day = Number(tokens[4]);

        const res:IGeneralArticle = await GeneralArticleModel.findOne({ articleId: articleId }).exec();

        res.meta.createdAt.setHours(12);
        res.meta.createdAt.setFullYear(year);
        res.meta.createdAt.setMonth(month);
        res.meta.createdAt.setDate(day);
        res.markModified("meta")
        res.save();
        process.stdout.write("OK\n");
    } else {
        process.stdout.write(`article: Invalid token, '${tokens[0]}'\n`);
    }
}