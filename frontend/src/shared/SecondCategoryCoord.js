import construction from "../images/second-categories/construction.png";
import employment from "../images/second-categories/laberemployment.png";
import factory from "../images/second-categories/factory.png";
import tourism from "../images/second-categories/tourism.png";
import education from "../images/second-categories/education.png";
import traffic from "../images/second-categories/traffic.png";
import greenenergy from "../images/second-categories/greenenergy.png";
import finance from "../images/second-categories/finance.png";
import agriculture from "../images/second-categories/agriculture.png";
import cultureandart from "../images/second-categories/cultureandart.png";
import watermanagement from "../images/second-categories/watermanagement.png";
export default {
  건설: {
    image: construction,
    secondCategory: [
      {
        x: 8.7,
        y: 34.6,
        title: "스마트 건설",
        defaultOpen: "True",
      },
      {
        x: 25.2,
        y: 12,
        title: "스마트 빌딩",
        defaultOpen: "False",
      },
      {
        x: 62.2,
        y: 34.6,
        title: "도시계획 컨설팅",
        defaultOpen: "False",
      },
      {
        x: 54.8,
        y: 69,
        title: "스마트 홈",
        defaultOpen: "False",
      },
    ],
  },
  고용노동: {
    image: employment,
    secondCategory: [
      {
        x: 21.8,
        y: 25.6,
        title: "근무환경 관리",
        defaultOpen: "True",
      },
      {
        x: 61.4,
        y: 11.3,
        title: "스마트 인재관리",
        defaultOpen: "False",
      },
    ],
  },
  공장: {
    image: factory,
    secondCategory: [
      {
        x: 43,
        y: 7.1,
        title: "생산 및 운영 관리시스템",
        defaultOpen: "False",
      },
      {
        x: 7.4,
        y: 32.5,
        title: "작업장 관리 시스템",
        defaultOpen: "True",
      },
      {
        x: 80.3,
        y: 30.4,
        title: "안전 사고 방지",
        defaultOpen: "False",
      },
      {
        x: 54.5,
        y: 53.5,
        title: "설비 관리시스템",
        defaultOpen: "False",
      },
    ],
  },
  관광: {
    image: tourism,
    secondCategory: [
      { x: 5.17, y: 14.1, title: "관광 정보", defaultOpen: "True" },
      { x: 69.1, y: 26.3, title: "스마트 안내", defaultOpen: "False" },
      { x: 34.7, y: 6.6, title: "스마트 관광 단지", defaultOpen: "False" },
    ],
  },
  교육: {
    image: education,
    secondCategory: [
      { x: 48.7, y: 25.8, title: "교육 콘텐츠", defaultOpen: "False" },
      { x: 79.9, y: 12.9, title: "교내 시설 스마트화", defaultOpen: "False" },
      { x: 32.1, y: 29.45, title: "어린이 교육", defaultOpen: "False" },
      { x: 2.15, y: 16.93, title: "스마트 학습 보조", defaultOpen: "True" },
    ],
  },
  교통: {
    image: traffic,
    secondCategory: [
      { x: 5.46, y: 21.81, title: "무인 단속 플랫폼", defaultOpen: "Fasle" },
      { x: 48.79, y: 64.04, title: "스마트 파킹 서비스", defaultOpen: "Fasle" },
      { x: 63.6, y: 51.76, title: "스마트 횡단보도", defaultOpen: "Fasle" },
      {
        x: 3.85,
        y: 85.21,
        title: "도시 공유자동차 서비스",
        defaultOpen: "Fasle",
      },
      {
        x: 19.13,
        y: 8.86,
        title: "교통정보 제공 및 관리",
        defaultOpen: "Fasle",
      },
      {
        x: 42.68,
        y: 37.37,
        title: "운전 경고 알림 서비스",
        defaultOpen: "Fasle",
      },
      {
        x: 79.8,
        y: 35.68,
        title: "교통 안전 관리 시스템",
        defaultOpen: "True",
      },
      {
        x: 25.77,
        y: 20.77,
        title: "자율주행 교통 시스템",
        defaultOpen: "Fasle",
      },
      {
        x: 80.97,
        y: 19.73,
        title: "도시 공유자전거 서비스",
        defaultOpen: "Fasle",
      },
      {
        x: 23.85,
        y: 29512,
        title: "스마트 자동차 제어시스템",
        defaultOpen: "Fasle",
      },
      { x: 63.75, y: 8.75, title: "스마트 항공 시스템", defaultOpen: "Fasle" },
      {
        x: 28.08,
        y: 60.63,
        title: "스마트 대중교통 서비스",
        defaultOpen: "Fasle",
      },
      {
        x: 40.05,
        y: 48.74,
        title: "교통요금 전자결제 서비스",
        defaultOpen: "Fasle",
      },
      {
        x: 47.93,
        y: 19.08,
        title: "스마트 항로표지 서비스",
        defaultOpen: "Fasle",
      },
    ],
  },
  그린·에너지: {
    image: greenenergy,
    secondCategory: [
      {
        x: 9.87,
        y: 3.64,
        title: "대기질 모니터링 서비스",
        defaultOpen: "False",
      },
      { x: 70.55, y: 57.1, title: "에너지 절감 및 활용", defaultOpen: "False" },
      {
        x: 43.13,
        y: 12.93,
        title: "신재생 에너지 생산 및 관리시설",
        defaultOpen: "False",
      },
      {
        x: 81.58,
        y: 35.68,
        title: "도시·시설물·운영관리",
        defaultOpen: "False",
      },
      { x: 6.63, y: 46.8, title: "전기요금 관리 서비스", defaultOpen: "False" },
      { x: 28.55, y: 31.61, title: "전력 생산 및 공급", defaultOpen: "False" },
      { x: 20.83, y: 55.15, title: "전력 판매 및 통신", defaultOpen: "True" },
    ],
  },
  금융: {
    image: finance,
    secondCategory: [
      {
        x: 4.38,
        y: 19.19,
        title: "금융데이터 구축/서비스",
        defaultOpen: "False",
      },
      { x: 79.26, y: 14.36, title: "전자결제시스템", defaultOpen: "True" },
      { x: 79.18, y: 64.43, title: "금융SW/ IT 서비스", defaultOpen: "False" },
      { x: 3.15, y: 62.06, title: "모바일 뱅킹", defaultOpen: "False" },
    ],
  },
  농업: {
    image: agriculture,
    secondCategory: [
      {
        x: 79.65,
        y: 48.49,
        title: "농축산업 정보 제공 시스템",
        defaultOpen: "True",
      },
      { x: 38.96, y: 8.1, title: "스마트 농장", defaultOpen: "False" },
    ],
  },
  문화예술: {
    image: cultureandart,
    secondCategory: [
      { x: 25.38, y: 4.17, title: "영상 전송 시스템", defaultOpen: "False" },
      { x: 3.85, y: 60.62, title: "스마트 콘텐츠 서비스", defaultOpen: "True" },
      { x: 56.85, y: 51.62, title: "인공지능 창작", defaultOpen: "False" },
      { x: 37.81, y: 32.26, title: "게임", defaultOpen: "False" },
      { x: 73.86, y: 37.9, title: "공연장 운영", defaultOpen: "False" },
    ],
  },
  물관리: {
    image: watermanagement,
    secondCategory: [
      {
        x: 7.55,
        y: 36.86,
        title: "스마트 워터 시티 사업",
        defaultOpen: "True",
      },
      {
        x: 59.43,
        y: 7.31,
        title: "실시간 누수 관측 및 제어 시스템",
        defaultOpen: "False",
      },
      { x: 22.91, y: 9.39, title: "물 여과 시스템", defaultOpen: "False" },
      {
        x: 75.71,
        y: 50.18,
        title: "자가진단형 하수처리장 기술",
        defaultOpen: "False",
      },
      {
        x: 40.81,
        y: 65.98,
        title: "스마트 미터링 서비스",
        defaultOpen: "False",
      },
      {
        x: 54.33,
        y: 76.71,
        title: "지능형 정수장 관리시스템",
        defaultOpen: "False",
      },
    ],
  },
};
