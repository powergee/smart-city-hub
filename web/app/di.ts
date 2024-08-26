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
import AseanBannerTextRepo from "repository/asean-banner-text";
import SolutionJsonRepo from "repository/solution-json";
import GeneralArticleBackendRepo from "repository/general-article-backend";
import AttachmentFileBackendRepo from "repository/attachment-file-backend";
import AuthTokenIDPWBackendRepo from "repository/auth-token-idpw-backend";
import PrimaryArticleFsRepo from "repository/primary-article-fs";
import ProjectRecordFsRepo from "repository/project-record-fs";

/* utils */
import { getAccessToken } from "./utils";

/* dependency injection */
const aseanBanner: AseanBannerRepository = new AseanBannerTextRepo();
const solution: SolutionRepository = new SolutionJsonRepo();
const projectRecord: LocaleFacade<ProjectRecordRepository> = new LocaleFacade({
  ko: new ProjectRecordFsRepo({
    storagePath: `${process.env.WEB_STORAGE_PATH}/ko`,
  }),
  en: new ProjectRecordFsRepo({
    storagePath: `${process.env.WEB_STORAGE_PATH}/en`,
  }),
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
    storagePath: `${process.env.WEB_STORAGE_PATH}/ko`,
  }),
  en: new PrimaryArticleFsRepo({
    storagePath: `${process.env.WEB_STORAGE_PATH}/en`,
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
