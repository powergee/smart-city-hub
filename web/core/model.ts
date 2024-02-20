export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export type AseanBannerItem = {
  countryName: string;
  description: string[]; // for multiple lines
  buttonPosition: [x: number, y: number];
};
