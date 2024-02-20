import { AseanBannerItem, Locale } from "core/model";
import { AseanBannerRepository } from "core/repository";

const items: {
  nameKo: string;
  nameEn: string;
  descriptionKo: string[];
  descriptionEn: string[];
  buttonPosition: [number, number];
}[] = [
  {
    nameKo: "인도네시아",
    nameEn: "indonesia",
    descriptionKo: ["인구 2억 7,380만명", "GDP 1조 1,860억 달러"],
    descriptionEn: ["Pop. 273.8 mil.", "GDP $1.186 tril."],
    buttonPosition: [370, 537],
  },
  {
    nameKo: "필리핀",
    nameEn: "philippines",
    descriptionKo: ["인구 1억 1,390만명", "GDP 3,941억 달러"],
    descriptionEn: ["Pop. 113.9 mil.", "GDP $394.1 bil."],
    buttonPosition: [650, 140],
  },
  {
    nameKo: "베트남",
    nameEn: "vietnam",
    descriptionKo: ["인구 9,747만명", "GDP 3,661억 달러"],
    descriptionEn: ["Pop. 97.47 mil.", "GDP $366.1 bil."],
    buttonPosition: [475, 115],
  },
  {
    nameKo: "싱가포르",
    nameEn: "singapore",
    descriptionKo: ["인구 545만명", "GDP 3,970억 달러"],
    descriptionEn: ["Pop. 5.454 mil.", "GDP $397 bil."],
    buttonPosition: [490, 460],
  },
  {
    nameKo: "태국",
    nameEn: "thailand",
    descriptionKo: ["인구 7,160만명", "GDP 5,059억 달러"],
    descriptionEn: ["Pop. 71.6 mil.", "GDP $505.9 bil."],
    buttonPosition: [170, 370],
  },
  {
    nameKo: "미얀마",
    nameEn: "myanmar",
    descriptionKo: ["인구 5,380만명", "GDP 650억 달러"],
    descriptionEn: ["Pop. 53.8 mil.", "GDP $65.09 bil."],
    buttonPosition: [170, 150],
  },
  {
    nameKo: "캄보디아",
    nameEn: "cambodia",
    descriptionKo: ["인구 1,659만명", "GDP 269억 달러"],
    descriptionEn: ["Pop. 16.59 mil.", "GDP $26.9 bil."],
    buttonPosition: [280, 450],
  },
  {
    nameKo: "말레이시아",
    nameEn: "malaysia",
    descriptionKo: ["인구 3,357만명", "GDP 3,730억 달러"],
    descriptionEn: ["Pop. 33.57 mil.", "GDP $373 bil."],
    buttonPosition: [610, 380],
  },
  {
    nameKo: "라오스",
    nameEn: "laos",
    descriptionKo: ["인구 742만명", "GDP 188억 달러"],
    descriptionEn: ["Pop. 7.42 mil.", "GDP $18.8 bil."],
    buttonPosition: [310, 64],
  },
  {
    nameKo: "브루나이",
    nameEn: "brunei",
    descriptionKo: ["인구 44만명", "GDP 140억 달러"],
    descriptionEn: ["Pop. 440,000", "GDP $14 bil."],
    buttonPosition: [750, 306],
  },
];

/**
 * 아세안 국가를 표시하는 배너의 아이템들을 텍스트로 관리하고,
 * AseanBannerRepository를 구현한 클래스
 */
export default class AseanBannerTextRepo implements AseanBannerRepository {
  getItemAll(lang: Locale): AseanBannerItem[] {
    if (lang === "ko") {
      return items.map((item) => ({
        countryName: item.nameKo,
        description: item.descriptionKo,
        buttonPosition: item.buttonPosition,
      }));
    }

    return items.map((item) => ({
      countryName: item.nameEn,
      description: item.descriptionEn,
      buttonPosition: item.buttonPosition,
    }));
  }
}
