import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ko from "./translation.ko.json";
import en from "./translation.en.json";
import { koResearchers, enResearchers } from "./researchers";
import professors from "./professors.people.json";
import projectsKo from "./projects.ko.json";
import projectsEn from "./projects.en.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      ko: {
        translation: ko,
        researchers: koResearchers(),
        professors: {
          people: professors,
        },
        projects: projectsKo,
      },
      en: {
        translation: en,
        researchers: enResearchers(),
        projects: projectsEn,
      },
    },
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
