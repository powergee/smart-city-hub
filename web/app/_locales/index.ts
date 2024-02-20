import { createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

// dictionaries
import ko from "./default.ko.json";
import en from "./default.en.json";

const resources = {
  ko: { translation: ko },
  en: { translation: en },
};

export type Translate = (key: string, options?: any) => string;

export async function initTranslation(
  lang: string,
  namespaces?: string[],
  i18nInstance?: i18n
) {
  if (!i18nInstance) {
    i18nInstance = createInstance();
  }

  i18nInstance.use(initReactI18next);
  await i18nInstance.init({
    resources,
    lng: lang,
    fallbackLng: false, // (중요) 번역이 없는 경우, t 함수의 인자를 그대로 반환하도록 설정
    ns: namespaces ?? ["translation"],
    defaultNS: namespaces ? namespaces[0] : "translation",
    fallbackNS: namespaces ?? ["translation"],
    returnNull: true,
  });

  const t: Translate = i18nInstance.t;

  return { i18n: i18nInstance, t };
}
