"use client";

import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initTranslation } from "@locales";

export default function TranslationProvider(props: {
  lang: string;
  namespaces?: string[];
  children?: React.ReactNode;
}) {
  const i18n = createInstance();
  initTranslation(props.lang, props.namespaces, i18n);
  return <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>;
}
