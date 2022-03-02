import construction from "../images/second-categories/construction.png";
import employment from "../images/second-categories/laberemployment.png";
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
};
