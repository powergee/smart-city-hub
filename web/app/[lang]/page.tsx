import Image from "next/image";

import { repo, util } from "@/di";
import { initTranslation } from "@locales";
import { Locale } from "core/model";

import CardLink from "@components/card-link";
import Container from "@components/container";
import AseanBanner from "@components/home/asean-banner";
import CircleCategoryNav from "@components/home/circle-category-nav";
import { FormalHeader2 } from "@components/typography";

import { getSolutionCoverById } from "@resources/images/solution-covers";
import urbanCityLandscapeImg from "@resources/images/urban-city-landscape.jpg";

import SearchSection from "@components/home/search-section";

import { getSolutionCategory, getSuperCategory, superCategories } from "./hub/categories";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const lang = (await props.params).lang as Locale;
  const { t } = await initTranslation(lang);

  return (
    <>
      <div className="relative border-b">
        <Image
          className="absolute -z-10 w-full h-full object-center object-cover"
          src={urbanCityLandscapeImg}
          alt="Urban City Landscape"
          width={720}
        />
        <div className="backdrop-blur-sm bg-uos-gray/60 text-white py-6">
          <Container>
            {/* 검색 */}
            <SearchSection />
          </Container>
        </div>
      </div>

      <section className="bg-global-gray-light pt-4 pb-6 border-b">
        <Container className="mt-4 mb-24">
          <FormalHeader2>{t("solution-banner-header")}</FormalHeader2>
          {/* 솔루션 바로가기 배너 */}
          <CircleCategoryNav
            className="mt-6 mb-8 px-4 md:px-0"
            linkProps={superCategories.map((_, idx) => {
              const superCatData = getSuperCategory(idx);
              const firstMainCatId = superCatData.categoryIds[0];
              const firstMainCategory = getSolutionCategory(firstMainCatId);
              return {
                title: t(superCatData.name),
                imgSrc: getSolutionCoverById(firstMainCategory.name),
                href: `/hub/categories/${idx}/${firstMainCatId}/0`,
              };
            })}
          />
        </Container>

        {/* 아세안 국가 바로가기 배너 */}
        <Container>
          <FormalHeader2>{t("asean-banner-header")}</FormalHeader2>
        </Container>
        <AseanBanner
          className="max-w-screen-2xl mx-4 md:mx-auto"
          linkProps={repo.aseanBanner.getItemAll(lang).map((item) => ({
            top: item.buttonPosition[1],
            left: item.buttonPosition[0],
            title: item.countryName.toUpperCase(),
            description: item.description.join("\n"),
            href: `/asean/${item.id}`, // TODO: 링크 수정
          }))}
        />
      </section>

      {/* 최신 Update 배너 */}
      <section>
        <Container className="mt-6">
          <FormalHeader2>{t("latest-updates")}</FormalHeader2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {(
              await repo.generalArticle.getList(1, 4, {
                contentsRegex: /<img.*>/.source,
                kindRegex: /notices|smart-news|research|seminar/.source,
              })
            ).map((article, idx) => (
              <CardLink
                href={`/news/${article.kind}/${article.id}`}
                imgSrc={util.getArticleThumbnailHref(article.id, "img")}
                imgHeight={192}
                title={article.title}
                meta={`${t(article.kind)} · ${article.createdAt?.toLocaleDateString()}`}
                key={idx}
              />
            ))}
          </div>
        </Container>
      </section>
      <Container className="mt-12 grid gap-12 grid-cols-1 md:grid-cols-2">
        {/* 최신 Issue Paper 배너 */}
        <section>
          <FormalHeader2>{t("latest-issue-paper")}</FormalHeader2>
          <div className="grid grid-cols-2 gap-8 mt-4">
            {(
              await repo.generalArticle.getList(1, 2, {
                kindRegex: /issue-paper/.source,
              })
            ).map((article, idx) => (
              <CardLink
                href={`/publish/issue-paper/${article.id}`}
                imgSrc={util.getArticleThumbnailHref(article.id, "pdf")}
                title={article.title}
                key={idx}
              />
            ))}
          </div>
        </section>
        {/* 최신 신남방 & 스마트도시 기술 리포트 배너 */}
        <section>
          <FormalHeader2>{t("latest-archive")}</FormalHeader2>
          <div className="grid grid-cols-2 gap-8 mt-4">
            {(
              await repo.generalArticle.getList(1, 2, {
                kindRegex: /archive/.source,
              })
            ).map((article, idx) => (
              <CardLink
                href={`/publish/archive/${article.id}`}
                imgSrc={util.getArticleThumbnailHref(article.id, "pdf")}
                title={article.title}
                key={idx}
              />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
