import { AseanBannerItem } from "core/model";

export interface AseanBannerRepository {
  getItemAll: () => AseanBannerItem[];
}
