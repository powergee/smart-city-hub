import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ko from "./ko.json";
import en from "./en.json";
import koResearchers from "./ko-researchers.js";
import enResearchers from "./en-researchers.js";
import professors from "./professors.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      ko: { translation: ko, researchers: koResearchers(), professors },
      en: { translation: en, researchers: enResearchers() },
    },
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
