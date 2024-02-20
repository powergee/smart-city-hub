"use client";

import { useTranslation } from "react-i18next";

export default function Introduction() {
  const { t } = useTranslation();

  return <div>{t("소개")}</div>;
}
