/* interfaces */
import { GeneralArticleThumbnailHrefGetter } from "core/model";
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

/* utils */
import { getAccessToken } from "./utils";

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
const generalArticle: GeneralArticleRepository = new GeneralArticleBackendRepo({
  baseUrl: "http://localhost:4000",
  authTokenGetter: getAccessToken,
});
const attachmentFile: AttachmentFileRepository = new AttachmentFileBackendRepo({
  baseUrl: "http://localhost:4000",
  authTokenGetter: getAccessToken,
});
const authTokenIDPW: AuthTokenIDPWRepository = new AuthTokenIDPWBackendRepo({
  baseUrl: "http://localhost:4000",
});
const getArticleThumbnailHref: GeneralArticleThumbnailHrefGetter = (
  articleId: number,
  type: "img" | "pdf"
) => {
  return `http://localhost:4000/v2/article/${articleId}/thumbnail?from=${
    type === "img" ? "img" : "attachment"
  }`;
};

/* export */
export const repo = {
  aseanBanner,
  solution,
  projectRecord,
  generalArticle,
  attachmentFile,
  authTokenIDPW,
};

export const util = {
  getArticleThumbnailHref,
};
