"use client";

import Image from "next/image";
import Container from "@components/container";
import { Locale } from "core/model";
import { useTranslation } from "react-i18next";

import { getSolutionCoverByIndex } from "@resources/images/solution-covers";
import { getSolutionCategory } from "./categories";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { cateid: string; lang: Locale };
}) {
  const { t } = useTranslation();

  const cateid = parseInt(params.cateid);
  const category = getSolutionCategory(cateid, params.lang);

  return (
    <>
      <header className="relative h-48 md:h-64 border-b">
        <Image
          className="w-full h-full object-cover"
          src={getSolutionCoverByIndex(cateid)}
          alt="Page Cover Image"
          height={288}
        />
        <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full text-white bg-uos-gray/50">
          <h1 className="font-bold text-4xl md:text-6xl">{category.name}</h1>
          <h2 className="font-medium text-2xl mt-3">{t("스마트도시 솔루션")}</h2>
        </div>
      </header>
      <Container className="flex mt-8">
        <section className="w-full">{children}</section>
      </Container>
    </>
  );
}
