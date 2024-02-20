import { AseanBannerItem, Locale } from "core/model";

export interface AseanBannerRepository {
  getItemAll: (lang: Locale) => AseanBannerItem[];
}
