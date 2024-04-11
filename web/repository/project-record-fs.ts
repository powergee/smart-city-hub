import { ProjectRecordItem } from "core/model";
import { ProjectRecordRepository } from "core/repository";

import fs from "fs";
import path from "path";

/**
 * 파일 시스템을 사용하여 ProjectRecordItem을 관리한다.
 * storagePath가 인자로 주어지고, 해당 경로에 project-records.json으로 데이터가 저장된다.
 */
export default class ProjectRecordFsRepo implements ProjectRecordRepository {
  private readonly storagePath: string;
  private readonly dataFilename = "project-records.json";

  constructor(params: { storagePath: string }) {
    this.storagePath = params.storagePath;
  }

  async setItemList(items: ProjectRecordItem[]): Promise<ProjectRecordItem[]> {
    const dataPath = path.join(this.storagePath, this.dataFilename);

    // using typescript, there is no need to sanitize the data
    return new Promise((resolve) => {
      fs.writeFile(dataPath, JSON.stringify(items), { encoding: "utf-8" }, (err) => {
        if (err) throw err;
        return resolve(items);
      });
    });
  }

  async getItemList(primary?: boolean): Promise<ProjectRecordItem[]> {
    const dataPath = path.join(this.storagePath, this.dataFilename);
    const data = await new Promise<string>((resolve) => {
      fs.readFile(dataPath, { encoding: "utf-8" }, (err, data) => {
        if (err) resolve("[]");
        return resolve(data);
      });
    });

    const items = JSON.parse(data) as ProjectRecordItem[];
    return primary ? items.filter((item) => item.isPrimary) : items;
  }
}
