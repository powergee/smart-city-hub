import { PrimaryArticle } from "core/model";
import { PrimaryArticleRepository } from "core/repository";
import fs from "fs";
import path from "path";

/**
 * 파일 시스템을 사용하여 PrimaryArticle을 관리한다.
 * storagePath가 인자로 주어지고, 해당 경로에 kind의 이름으로 그 html이 저장된다.
 * 예를 들어, greeting 게시글이면, greeting.html으로 저장되는 형태이다.
 */
export default class PrimaryArticleFsRepo implements PrimaryArticleRepository {
  private readonly storagePath: string;
  private readonly dataPath;

  constructor(params: { storagePath: string }) {
    this.storagePath = params.storagePath;
    this.dataPath = path.join(this.storagePath, "primary-articles");

    if (this.dataPath && !fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }
  }

  async get(kind: string): Promise<PrimaryArticle> {
    const htmlPath = path.join(this.dataPath, `${kind}.html`);

    return new Promise((resolve) => {
      fs.readFile(htmlPath, { encoding: "utf-8" }, (err, data) => {
        if (err) {
          return resolve({
            kind: kind,
            contents: "",
            modifiedBy: "unknown",
            modifiedAt: new Date(),
          });
        }

        const stat = fs.statSync(htmlPath);
        return resolve({
          kind: kind,
          contents: data,
          modifiedBy: "unknown",
          modifiedAt: stat.mtime,
        });
      });
    });
  }

  async set(kind: string, contents: string): Promise<PrimaryArticle> {
    const htmlPath = path.join(this.dataPath, `${kind}.html`);

    return new Promise((resolve) => {
      fs.writeFile(htmlPath, contents, { encoding: "utf-8" }, async (err) => {
        if (err) throw err;
        const article = this.get(kind);
        return resolve(article);
      });
    });
  }
}
