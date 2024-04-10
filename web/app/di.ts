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
  PrimaryArticleRepository,
} from "core/repository";

/* repositories */
import AseanBannerTextRepo from "repository/asean/asean-banner-text";
import SolutionTextRepo from "repository/solution/solution-text";
import ProjectRecordImportedJson from "repository/project-record/project-record-imported-json";
import GeneralArticleBackendRepo from "repository/general-article/general-article-backend";
import AttachmentFileBackendRepo from "repository/attachment-file/attachment-file-backend";
import AuthTokenIDPWBackendRepo from "repository/auth-token/auth-token-idpw-backend";
import PrimaryArticleFsRepo from "repository/primary-article/primary-article-fs";

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
  baseUrl: process.env.BACKEND_API_URL!,
  authTokenGetter: getAccessToken,
});
const attachmentFile: AttachmentFileRepository = new AttachmentFileBackendRepo({
  apiUrl: process.env.BACKEND_API_URL!,
  publicUrl: process.env.BACKEND_PUBLIC_URL!,
  authTokenGetter: getAccessToken,
});
const authTokenIDPW: AuthTokenIDPWRepository = new AuthTokenIDPWBackendRepo({
  baseUrl: process.env.BACKEND_API_URL!,
});
const primaryArticle: LocaleFacade<PrimaryArticleRepository> = new LocaleFacade({
  ko: new PrimaryArticleFsRepo({
    storagePath: `${process.env.PA_DATA_PATH}/ko`,
  }),
  en: new PrimaryArticleFsRepo({
    storagePath: `${process.env.PA_DATA_PATH}/en`,
  }),
});

/* utils */
const getArticleThumbnailHref: GeneralArticleThumbnailHrefGetter = (
  articleId: number,
  type: "img" | "pdf"
) => {
  return `${process.env.BACKEND_PUBLIC_URL!}/v2/article/${articleId}/thumbnail?from=${
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
  primaryArticle,
};

export const util = {
  getArticleThumbnailHref,
};
