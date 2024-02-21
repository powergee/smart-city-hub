import { StaticImageData } from "next/image";

import agriculture from "./agriculture.jpg";
import business from "./business.jpg";
import citizen from "./citizen.jpg";
import communication from "./communication.jpg";
import construction from "./construction.jpg";
import crime from "./crime.jpg";
import culture from "./culture.jpg";
import disaster from "./disaster.jpg";
import education from "./education.jpg";
import egoverment from "./egoverment.jpg";
import factory from "./factory.jpg";
import finance from "./finance.jpg";
import green from "./green.jpg";
import labor from "./labor.jpg";
import logistic from "./logistic.jpg";
import medical from "./medical.jpg";
import refuse from "./refuse.jpg";
import tourism from "./tourism.jpg";
import traffic from "./traffic.jpg";
import water from "./water.jpg";
import welfare from "./welfare.jpg";

export const solutionCovers: { [key: string]: StaticImageData } = {
  건설: construction,
  고용노동: labor,
  공장: factory,
  관광: tourism,
  교육: education,
  교통: traffic,
  "그린·에너지": green,
  금융: finance,
  농업: agriculture,
  문화예술: culture,
  물관리: water,
  물류: logistic,
  방범: crime,
  방재: disaster,
  복지: welfare,
  비즈니스: business,
  시민참여: citizen,
  쓰레기처리: refuse,
  "의료·보건": medical,
  전자정부: egoverment,
  통신기술: communication,
};
