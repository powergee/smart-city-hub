/* interfaces */
import {
  AseanBannerRepository,
  LocaleFacade,
  SolutionRepository,
  ProjectRecordRepository,
} from "core/repository";

/* repositories */
import AseanBannerTextRepo from "repository/asean/asean-banner-text";
import SolutionTextRepo from "repository/solution/solution-text";
import ProjectRecordTextRepo from "repository/project-record/project-record-text";

/* dependency injection */
const aseanBanner: AseanBannerRepository = new AseanBannerTextRepo();
const solution: LocaleFacade<SolutionRepository> = new LocaleFacade({
  ko: new SolutionTextRepo("ko"),
  en: new SolutionTextRepo("en"),
});
const projectRecord: LocaleFacade<ProjectRecordRepository> = new LocaleFacade({
  ko: new ProjectRecordTextRepo("ko"),
  en: new ProjectRecordTextRepo("en"),
});

/* export */
export const repo = {
  aseanBanner,
  solution,
  projectRecord,
};
