/* interfaces */
import { AseanBannerRepository } from "core/repository";

/* repositories */
import AseanBannerTextRepo from "repository/asean/asean-banner-text";

/* dependency injection */
const aseanBanner: AseanBannerRepository = new AseanBannerTextRepo();

/* export */
export const repo = {
  aseanBanner,
};
