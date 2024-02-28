import fs from "fs";
import { ProjectRecordItem } from "core/model";
import { ProjectRecordRepository } from "core/repository";

export default class ProjectRecordTextRepo implements ProjectRecordRepository {
  private jsonFilePath: string;

  constructor(lang: "ko" | "en") {
    this.jsonFilePath = `./repository/project-record/projects.${lang}.json`;
  }

  async setItemList(items: ProjectRecordItem[]): Promise<ProjectRecordItem[]> {
    throw new Error("Method not implemented.");
  }

  async getItemList(primary?: boolean): Promise<ProjectRecordItem[]> {
    let items: ProjectRecordItem[] = JSON.parse(
      fs.readFileSync(this.jsonFilePath, "utf-8")
    );
    if (primary) {
      items = items.filter((item) => item.isPrimary);
    }

    return items;
  }
}
