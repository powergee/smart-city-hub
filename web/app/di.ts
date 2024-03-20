/* interfaces */
import {
  AseanBannerRepository,
  LocaleFacade,
  SolutionRepository,
  ProjectRecordRepository,
  GeneralArticleRepository,
  AttachmentFileRepository,
  AuthTokenIDPWRepository,
} from "core/repository";

/* repositories */
import AseanBannerTextRepo from "repository/asean/asean-banner-text";
import SolutionTextRepo from "repository/solution/solution-text";
import ProjectRecordImportedJson from "repository/project-record/project-record-imported-json";
import GeneralArticleBackendRepo from "repository/general-article/general-article-backend";
import AttachmentFileBackendRepo from "repository/attachment-file/attachment-file-backend";
import AuthTokenIDPWBackendRepo from "repository/auth-token/auth-token-idpw-backend";

/* dependency injection */
const aseanBanner: AseanBannerRepository = new AseanBannerTextRepo();
const solution: LocaleFacade<SolutionRepository> = new LocaleFacade({
  ko: new SolutionTextRepo("ko"),
  en: new SolutionTextRepo("en"),
});
const projectRecord: LocaleFacade<ProjectRecordRepository> = new LocaleFacade({
  ko: new ProjectRecordImportedJson("ko"),
  en: new ProjectRecordImportedJson("en"),
});
const generalArticle: GeneralArticleRepository = new GeneralArticleBackendRepo();
const attachmentFile: AttachmentFileRepository = new AttachmentFileBackendRepo();
const authTokenIDPW: AuthTokenIDPWRepository = new AuthTokenIDPWBackendRepo({
  baseUrl: "http://localhost:4000",
});

/* export */
export const repo = {
  aseanBanner,
  solution,
  projectRecord,
  generalArticle,
  attachmentFile,
  authTokenIDPW,
};
