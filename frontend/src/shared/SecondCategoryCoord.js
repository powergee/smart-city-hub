import construction from "../images/second-categories/construction.png";
import employment from "../images/second-categories/laberemployment.png";
import factory from "../images/second-categories/factory.png";
import tourism from "../images/second-categories/tourism.png";
import education from "../images/second-categories/education.png";
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
};
