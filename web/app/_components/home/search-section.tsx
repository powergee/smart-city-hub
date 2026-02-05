"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchSection() {
  const router = useRouter();
  const { t } = useTranslation();
  const [option, setOption] = useState("all");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (!keyword.trim()) return;
    router.push(`/search?option=${option}&keyword=${encodeURIComponent(keyword)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold text-white mb-4">
        {t("search-title")}
      </h2>
      <p className="text-base text-gray-100 mb-10 text-center leading-relaxed whitespace-pre-line">
        {t("search-description")}
      </p>
      <div className="flex w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden border border-uos-gray-soft">
        <select
          className="bg-global-gray-soft px-6 py-4 text-uos-gray font-medium outline-none border-r border-uos-gray-soft hover:bg-gray-100 transition-colors cursor-pointer appearance-none"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="all">{t("integrated-search")}</option>
          <option value="country">{t("country-search")}</option>
          <option value="solution">{t("solution-search")}</option>
        </select>
        <input
          type="text"
          className="flex-1 px-6 py-4 outline-none text-lg text-uos-gray placeholder-uos-gray-light"
          placeholder={t("keyword-placeholder")}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={handleSearch}
          className="bg-uos-blue text-white px-8 py-4 font-bold hover:bg-uos-signiture-blue transition-colors"
        >
          {t("search")}
        </button>
      </div>
    </div>
  );
}
