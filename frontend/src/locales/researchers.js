import people from "./researchers.people.json";

export function koResearchers() {
  return {
    lab: "서울시립대학교 국제도시 및 인프라연구센터",
    addresses: {
      연구실: "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
      염춘호: "서울시 동대문구 서울시립대로 163, 법학관 517호",
    },
    people,
  };
}

export function enResearchers() {
  return {
    서울시립대학교: "University of Seoul",
    국제도시과학대학원: "International School of Urban Sciences",
    도시과학연구원: "Institute of Urban Science",
    글로벌건설학과: "Global Construction",
    주임교수: "Professor",
    연구교수: "Research Professor",
    경영학박사: "PhD in Business Administration",
    공학박사: "PhD in Engineering",
    선임연구원: "Senior Researcher",
    연구원: "Researcher",
    전화: "Tel",
    연락처: "Phone",
    이메일: "E-mail",
    lab: "Global Urban & Infrastructure Research Center",
    addresses: {
      연구실:
        "Room 104-1, 21c BLDG, Seoulsiripdae-ro 163, Dongdaemun-gu, Seoul 02504, Korea",
      염춘호:
        "Law School 517, Seoulsiripdae-ro 163, Dongdaemun-gu, Seoul 02504, Korea",
    },
    people,
  };
}
