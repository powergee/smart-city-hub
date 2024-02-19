export type Country = {
  name: string;
  nameEng: string;
};

export type AseanBannerItem = {
  country: Country;
  description: string[]; // for multiple lines
  descriptionEng: string[]; // for multiple lines
  buttonPosition: [x: number, y: number];
};
