import IndonesiaFlag from "../asean-data/flags/indonesia.gif";
import PhillippinsFlag from "../asean-data/flags/phillippins.gif";
import VietnamFlag from "../asean-data/flags/vietnam.gif";
import SingaporeFlag from "../asean-data/flags/singapore.gif";
import ThailandFlag from "../asean-data/flags/thailand.gif";
import MyanmarFlag from "../asean-data/flags/myanmar.gif";
import CambodiaFlag from "../asean-data/flags/cambodia.jpg";
import MalaysiaFlag from "../asean-data/flags/malaysia.gif";
import LaosFlag from "../asean-data/flags/laos.gif";
import BruneiFlag from "../asean-data/flags/brunei.gif";

const countries = [
  {
    name: "인도네시아",
    nameEng: "Indonesia",
    flag: IndonesiaFlag,
    pdf: "/asean-contents/indonesia.pdf",
    sections: {
      overview: [[1, 1000]],
      constTrends: [
        [2, 1340],
        [3, 920],
        [4, 990],
        [5, 970],
      ],
      urbanTrends: [[6, 680]],
      smartCityStatus: [
        [7, 1040],
        [8, 1365],
        [9, 875],
        [10, 1060],
        [11, 340],
      ],
      adoptionDemand: [[12, 350]],
      example: [
        [13, 690],
        [14, 820],
      ],
    },
  },
  {
    name: "필리핀",
    nameEng: "Phillippins",
    flag: PhillippinsFlag,
    pdf: "/asean-contents/phillippins.pdf",
    sections: {
      overview: [[1, 1030]],
      constTrends: [
        [2, 1355],
        [3, 800],
      ],
      urbanTrends: [
        [4, 1350],
        [5, 470],
      ],
      smartCityStatus: [
        [6, 1370],
        [7, 0],
        [8, 250],
      ],
      adoptionDemand: [[9, 730]],
      example: [[10, 1230]],
    },
  },
  {
    name: "베트남",
    nameEng: "Vietnam",
    flag: VietnamFlag,
    pdf: "/asean-contents/vietnam.pdf",
    sections: {
      overview: [[1, 950]],
      constTrends: [
        [2, 0],
        [3, 730],
        [4, 1150],
      ],
      urbanTrends: [[5, 690]],
      smartCityStatus: [
        [6, 1180],
        [7, 1150],
      ],
      adoptionDemand: [[8, 980]],
      example: [
        [9, 1150],
        [10, 830],
        [11, 1070],
      ],
    },
  },
  {
    name: "싱가포르",
    nameEng: "Singapore",
    flag: SingaporeFlag,
    pdf: "/asean-contents/singapore.pdf",
    sections: {
      overview: [[1, 910]],
      constTrends: [
        [2, 0],
        [3, 0],
      ],
      urbanTrends: [
        [4, 1015],
        [5, 340],
      ],
      smartCityStatus: [
        [6, 1020],
        [7, 1155],
        [8, 1060],
        [9, 670],
      ],
      adoptionDemand: [[10, 420]],
      example: [[11, 1100]],
    },
  },
  {
    name: "태국",
    nameEng: "Thailand",
    flag: ThailandFlag,
    pdf: "/asean-contents/thailand.pdf",
    sections: {
      overview: [[1, 1120]],
      constTrends: [
        [2, 700],
        [3, 1050],
        [4, 1120],
        [5, 780],
      ],
      urbanTrends: [
        [6, 760],
        [7, 1250],
      ],
      smartCityStatus: [
        [8, 1390],
        [9, 930],
        [10, 1030],
        [11, 1010],
        [12, 1050],
        [13, 1030],
        [14, 1130],
      ],
      adoptionDemand: [[15, 1230]],
      example: [[16, 710]],
    },
  },
  {
    name: "미얀마",
    nameEng: "Myanmar",
    flag: MyanmarFlag,
    pdf: "/asean-contents/myanmar.pdf",
    sections: {
      overview: [[1, 1030]],
      constTrends: [
        [2, 970],
        [3, 1280],
      ],
      urbanTrends: [[4, 360]],
      smartCityStatus: [
        [5, 1100],
        [6, 1360],
        [7, 100],
      ],
      adoptionDemand: [[8, 260]],
      example: [[9, 930]],
    },
  },
  {
    name: "캄보디아",
    nameEng: "Cambodia",
    flag: CambodiaFlag,
    pdf: "/asean-contents/cambodia.pdf",
    sections: {
      overview: [[1, 1060]],
      constTrends: [
        [2, 1090],
        [3, 1000],
        [4, 890],
      ],
      urbanTrends: [
        [5, 1080],
        [6, 760],
        [7, 1200],
        [8, 660],
        [9, 990],
      ],
      smartCityStatus: [
        [10, 990],
        [11, 1120],
        [12, 610],
        [13, 1020],
      ],
      adoptionDemand: [[14, 540]],
      example: [[15, 980]],
    },
  },
  {
    name: "말레이시아",
    nameEng: "Malaysia",
    flag: MalaysiaFlag,
    pdf: "/asean-contents/malaysia.pdf",
    sections: {
      overview: [[1, 1130]],
      constTrends: [
        [2, 1180],
        [3, 1110],
        [4, 1160],
        [5, 610],
      ],
      urbanTrends: [[6, 760]],
      smartCityStatus: [
        [7, 900],
        [8, 1040],
        [9, 1040],
        [10, 1020],
        [11, 1250],
      ],
      adoptionDemand: [[12, 840]],
      example: [[13, 1240]],
    },
  },
  {
    name: "라오스",
    nameEng: "Laos",
    flag: LaosFlag,
    pdf: "/asean-contents/laos.pdf",
    sections: {
      overview: [[1, 1070]],
      constTrends: [
        [2, 910],
        [3, 990],
        [4, 840],
      ],
      urbanTrends: [[5, 1010]],
      smartCityStatus: [
        [6, 1000],
        [7, 1030],
      ],
      adoptionDemand: [[8, 250]],
      example: [[9, 620]],
    },
  },
  {
    name: "브루나이",
    nameEng: "Brunei",
    flag: BruneiFlag,
    pdf: "/asean-contents/brunei.pdf",
    sections: {
      overview: [[1, 960]],
      constTrends: [[2, 740]],
      urbanTrends: [
        [3, 790],
        [4, 1070],
        [5, 550],
      ],
      smartCityStatus: [[6, 0]],
      adoptionDemand: [[7, 0]],
      example: [[8, 0]],
    },
  },
];

export default countries;
