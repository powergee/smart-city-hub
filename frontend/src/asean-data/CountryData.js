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
      overview: [[1, 1024]],
      constTrends: [
        [2, 0],
        [3, 940],
        [4, 1090],
        [5, 950],
      ],
      urbanTrends: [[6, 0]],
      smartCityStatus: [
        [7, 0],
        [8, 0],
        [9, 0],
        [10, 0],
        [11, 0],
      ],
      adoptionDemand: [[12, 0]],
      example: [
        [13, 0],
        [14, 0],
      ],
    },
  },
  {
    name: "필리핀",
    nameEng: "Phillippins",
    flag: PhillippinsFlag,
    pdf: "/asean-contents/phillippins.pdf",
    sections: {
      overview: [[1, 0]],
      constTrends: [
        [2, 0],
        [3, 0],
      ],
      urbanTrends: [
        [4, 0],
        [5, 0],
      ],
      smartCityStatus: [
        [6, 0],
        [7, 0],
        [8, 0],
      ],
      adoptionDemand: [[9, 0]],
      example: [[10, 0]],
    },
  },
  {
    name: "베트남",
    nameEng: "Vietnam",
    flag: VietnamFlag,
    pdf: "/asean-contents/vietnam.pdf",
    sections: {
      overview: [[1, 0]],
      constTrends: [
        [2, 0],
        [3, 0],
        [4, 0],
      ],
      urbanTrends: [[5, 0]],
      smartCityStatus: [
        [6, 0],
        [7, 0],
      ],
      adoptionDemand: [[8, 0]],
      example: [
        [9, 0],
        [10, 0],
        [11, 0],
      ],
    },
  },
  {
    name: "싱가포르",
    nameEng: "Singapore",
    flag: SingaporeFlag,
    pdf: "/asean-contents/singapore.pdf",
    sections: {
      overview: [[1, 0]],
      constTrends: [
        [2, 0],
        [3, 0],
      ],
      urbanTrends: [
        [4, 0],
        [5, 0],
      ],
      smartCityStatus: [
        [6, 0],
        [7, 0],
        [8, 0],
        [9, 0],
      ],
      adoptionDemand: [[10, 0]],
      example: [[11, 0]],
    },
  },
  {
    name: "태국",
    nameEng: "Thailand",
    flag: ThailandFlag,
    pdf: "/asean-contents/thailand.pdf",
    sections: {
      overview: [[1, 0]],
      constTrends: [
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
      ],
      urbanTrends: [
        [6, 0],
        [7, 0],
      ],
      smartCityStatus: [
        [8, 0],
        [9, 0],
        [10, 0],
        [11, 0],
        [12, 0],
        [13, 0],
        [14, 0],
      ],
      adoptionDemand: [[15, 0]],
      example: [[16, 0]],
    },
  },
  {
    name: "미얀마",
    nameEng: "Myanmar",
    flag: MyanmarFlag,
    pdf: "/asean-contents/myanmar.pdf",
    sections: {
      overview: [[1, 0]],
      constTrends: [
        [2, 0],
        [3, 0],
      ],
      urbanTrends: [[4, 0]],
      smartCityStatus: [
        [5, 0],
        [6, 0],
        [7, 0],
      ],
      adoptionDemand: [[8, 0]],
      example: [[9, 0]],
    },
  },
  {
    name: "캄보디아",
    nameEng: "Cambodia",
    flag: CambodiaFlag,
    pdf: "/asean-contents/cambodia.pdf",
    sections: {
      overview: [[1, 0]],
      constTrends: [
        [2, 0],
        [3, 0],
        [4, 0],
      ],
      urbanTrends: [
        [5, 0],
        [6, 0],
        [7, 0],
        [8, 0],
        [9, 0],
      ],
      smartCityStatus: [
        [10, 0],
        [11, 0],
        [12, 0],
        [13, 0],
      ],
      adoptionDemand: [[14, 0]],
      example: [[15, 0]],
    },
  },
  {
    name: "말레이시아",
    nameEng: "Malaysia",
    flag: MalaysiaFlag,
    pdf: "/asean-contents/malaysia.pdf",
    sections: {
      overview: [[1, 0]],
      constTrends: [
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
      ],
      urbanTrends: [[6, 0]],
      smartCityStatus: [
        [7, 0],
        [8, 0],
        [9, 0],
        [10, 0],
        [11, 0],
      ],
      adoptionDemand: [[12, 0]],
      example: [[13, 0]],
    },
  },
  {
    name: "라오스",
    nameEng: "Laos",
    flag: LaosFlag,
    pdf: "/asean-contents/laos.pdf",
    sections: {
      overview: [[1, 0]],
      constTrends: [
        [2, 0],
        [3, 0],
        [4, 0],
      ],
      urbanTrends: [[5, 0]],
      smartCityStatus: [
        [6, 0],
        [7, 0],
      ],
      adoptionDemand: [[8, 0]],
      example: [[9, 0]],
    },
  },
  {
    name: "브루나이",
    nameEng: "Brunei",
    flag: BruneiFlag,
    pdf: "/asean-contents/brunei.pdf",
    sections: {
      overview: [[1, 0]],
      constTrends: [[2, 0]],
      urbanTrends: [
        [3, 0],
        [4, 0],
        [5, 0],
      ],
      smartCityStatus: [[6, 0]],
      adoptionDemand: [[7, 0]],
      example: [[8, 0]],
    },
  },
];

export default countries;
