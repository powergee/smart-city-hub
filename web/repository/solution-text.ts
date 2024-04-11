import { Locale } from "core/model";
import { SolutionRepository } from "core/repository";

const superCategoryData: { [key: string]: [ko: string, en: string] } = {
  건설: ["건설", "Construction"],
  고용노동: ["고용노동", "Labor employment"],
  공장: ["공장", "Factory"],
  관광: ["관광", "Tourism"],
  교육: ["교육", "Education"],
  교통: ["교통", "Traffic"],
  그린에너지: ["그린·에너지", "Green·Energy"],
  금융: ["금융", "Finance"],
  농업: ["농업", "Agriculture"],
  문화예술: ["문화예술", "Culture and art"],
  물관리: ["물관리", "Water management"],
  물류: ["물류", "Logistic"],
  방범: ["방범", "Crime prevention"],
  방재: ["방재", "Disaster Prevention"],
  복지: ["복지", "Welfare"],
  비즈니스: ["비즈니스", "Business"],
  시민참여: ["시민참여", "Citizen participation"],
  쓰레기처리: ["쓰레기처리", "Refuse disposal"],
  의료보건: ["의료·보건", "Medical·Health"],
  전자정부: ["전자정부", "E-goverment"],
  통신기술: ["통신기술", "Communication technology"],
};

export default class SolutionTextRepo implements SolutionRepository {
  private lang: Locale;

  constructor(lang: Locale) {
    this.lang = lang;
  }

  async getSuperCategoryNameAll() {
    return Object.entries(superCategoryData).map(([id, name]) => {
      return { id, name: this.lang === "ko" ? name[0] : name[1] };
    });
  }
}
