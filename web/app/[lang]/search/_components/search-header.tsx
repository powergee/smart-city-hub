"use client";

import { FormalHeader2 } from "@components/typography";
import { useTranslation } from "react-i18next";

export default function SearchHeader({ 
  keyword, 
}: { 
  keyword: string; 
}) {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <FormalHeader2>"{keyword}" {t("검색 결과")}</FormalHeader2>
    </div>
  );
}
