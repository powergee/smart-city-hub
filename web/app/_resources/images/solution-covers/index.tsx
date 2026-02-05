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

import agricultureInner from "./inner/agriculture.png";
import businessInner from "./inner/business.png";
import citizenInner from "./inner/citizenparticipation.png";
import communicationInner from "./inner/communicationtechnology.png";
import constructionInner from "./inner/construction.png";
import crimeInner from "./inner/crimeprevention.png";
import cultureInner from "./inner/cultureandart.png";
import disasterInner from "./inner/disasterprevention.png";
import educationInner from "./inner/education.png";
import egovermentInner from "./inner/egoverment.png";
import factoryInner from "./inner/factory.png";
import financeInner from "./inner/finance.png";
import greenInner from "./inner/greenenergy.png";
import laborInner from "./inner/laberemployment.png";
import logisticInner from "./inner/logistic.png";
import medicalInner from "./inner/medicalhealth.png";
import refuseInner from "./inner/refusedisposal.png";
import tourismInner from "./inner/tourism.png";
import trafficInner from "./inner/traffic.png";
import waterInner from "./inner/watermanagement.png";
import welfareInner from "./inner/welfare.png";

const solutionCovers: { [key: string]: StaticImageData } = {
  건설: construction,
  고용노동: labor,
  공장: factory,
  관광: tourism,
  교육: education,
  교통: traffic,
  그린·에너지: green,
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
  의료·보건: medical,
  전자정부: egoverment,
  통신기술: communication,
};

const solutionInnerCovers: { [key: string]: StaticImageData } = {
  건설: constructionInner,
  고용노동: laborInner,
  공장: factoryInner,
  관광: tourismInner,
  교육: educationInner,
  교통: trafficInner,
  그린·에너지: greenInner,
  금융: financeInner,
  농업: agricultureInner,
  문화예술: cultureInner,
  물관리: waterInner,
  물류: logisticInner,
  방범: crimeInner,
  방재: disasterInner,
  복지: welfareInner,
  비즈니스: businessInner,
  시민참여: citizenInner,
  쓰레기처리: refuseInner,
  의료·보건: medicalInner,
  전자정부: egovermentInner,
  통신기술: communicationInner,
};

export function getSolutionCoverById(id: string): StaticImageData {
  return solutionCovers[id];
}

export function getSolutionCoverByIndex(index: number): StaticImageData {
  return Object.values(solutionCovers)[index];
}

export function getSolutionInnerCoverByIndex(index: number): StaticImageData {
  return Object.values(solutionInnerCovers)[index];
}

export function getSolutionInnerCoverById(id: string): StaticImageData {
  return solutionInnerCovers[id];
}
