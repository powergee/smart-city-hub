import { ProjectRecordItem } from "core/model";
import { ProjectRecordRepository } from "core/repository";

import koProjects from "./projects.ko.json";
import enProjects from "./projects.en.json";

export default class ProjectRecordImportedJson implements ProjectRecordRepository {
  private readonly projects: ProjectRecordItem[];

  constructor(lang: "ko" | "en") {
    if (lang === "ko") {
      this.projects = koProjects as ProjectRecordItem[];
    } else if (lang === "en") {
      this.projects = enProjects as ProjectRecordItem[];
    } else {
      throw new Error("Invalid language");
    }
  }

  async setItemList(items: ProjectRecordItem[]): Promise<ProjectRecordItem[]> {
    throw new Error("Cannot set items to imported JSON");
  }

  async getItemList(primary?: boolean): Promise<ProjectRecordItem[]> {
    let items = this.projects.slice();
    if (primary) {
      items = items.filter((item) => item.isPrimary);
    }

    return items;
  }
}
