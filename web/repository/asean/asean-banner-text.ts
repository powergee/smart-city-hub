import { AseanBannerItem } from "core/model";
import { AseanBannerRepository } from "core/repository";

const items: AseanBannerItem[] = [
  {
    country: { nameEng: "indonesia", name: "인도네시아" },
    description: ["인구 2억 7,380만명", "GDP 1조 1,860억 달러"],
    descriptionEng: ["Pop. 273.8 mil.", "GDP $1.186 tril."],
    buttonPosition: [370, 537],
  },
  {
    country: { nameEng: "philippines", name: "필리핀" },
    description: ["인구 1억 1,390만명", "GDP 3,941억 달러"],
    descriptionEng: ["Pop. 113.9 mil.", "GDP $394.1 bil."],
    buttonPosition: [650, 140],
  },
  {
    country: { nameEng: "vietnam", name: "베트남" },
    description: ["인구 9,747만명", "GDP 3,661억 달러"],
    descriptionEng: ["Pop. 97.47 mil.", "GDP $366.1 bil."],
    buttonPosition: [475, 115],
  },
  {
    country: { nameEng: "singapore", name: "싱가포르" },
    description: ["인구 545만명", "GDP 3,970억 달러"],
    descriptionEng: ["Pop. 5.454 mil.", "GDP $397 bil."],
    buttonPosition: [490, 460],
  },
  {
    country: { nameEng: "thailand", name: "태국" },
    description: ["인구 7,160만명", "GDP 5,059억 달러"],
    descriptionEng: ["Pop. 71.6 mil.", "GDP $505.9 bil."],
    buttonPosition: [170, 370],
  },
  {
    country: { nameEng: "myanmar", name: "미얀마" },
    description: ["인구 5,380만명", "GDP 650억 달러"],
    descriptionEng: ["Pop. 53.8 mil.", "GDP $65.09 bil."],
    buttonPosition: [170, 150],
  },
  {
    country: { nameEng: "cambodia", name: "캄보디아" },
    description: ["인구 1,659만명", "GDP 269억 달러"],
    descriptionEng: ["Pop. 16.59 mil.", "GDP $26.9 bil."],
    buttonPosition: [280, 450],
  },
  {
    country: { nameEng: "malaysia", name: "말레이시아" },
    description: ["인구 3,357만명", "GDP 3,730억 달러"],
    descriptionEng: ["Pop. 33.57 mil.", "GDP $373 bil."],
    buttonPosition: [610, 380],
  },
  {
    country: { nameEng: "laos", name: "라오스" },
    description: ["인구 742만명", "GDP 188억 달러"],
    descriptionEng: ["Pop. 7.42 mil.", "GDP $18.8 bil."],
    buttonPosition: [310, 64],
  },
  {
    country: { nameEng: "brunei", name: "브루나이" },
    description: ["인구 44만명", "GDP 140억 달러"],
    descriptionEng: ["Pop. 440,000", "GDP $14 bil."],
    buttonPosition: [750, 306],
  },
];

/**
 * 아세안 국가를 표시하는 배너의 아이템들을 텍스트로 관리하고,
 * AseanBannerRepository를 구현한 클래스
 */
export default class AseanBannerTextRepo implements AseanBannerRepository {
  getItemAll() {
    return items;
  }
}
