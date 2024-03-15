import Image from "next/image";
import Link from "next/link";

import { Locale } from "core/model";
import { repo } from "repository";
import { initTranslation } from "@locales";
import { getArticleThumbnailHref } from "@/utils";

import Container from "@components/container";
import { FormalHeader2 } from "@components/typography";
import AseanBanner from "@components/home/asean-banner";
import SolutionBanner from "@components/home/solution-banner";
import Carousel from "@components/carousel";
import CardLink from "@components/card-link";

import { getSolutionCoverById } from "@resources/images/solution-covers";
import { quickMenuIcons } from "@resources/images/quick-menu-icons";
import urbanCityLandscapeImg from "@resources/images/urban-city-landscape.jpg";

export default async function Home(props: { params: { lang: string } }) {
  const lang = props.params.lang as Locale;
  const { t } = await initTranslation(lang);

  return (
    <>
      <section className="bg-global-gray-light pt-4 pb-6 border-b">
        <Container>
          <FormalHeader2>{t("asean-banner-header")}</FormalHeader2>
        </Container>
        {/* 아세안 국가 바로가기 배너 */}
        <AseanBanner
          className="max-w-screen-2xl mx-4 md:mx-auto md:-mt-12"
          linkProps={repo.aseanBanner.getItemAll(lang).map((item, idx) => ({
            top: item.buttonPosition[1],
            left: item.buttonPosition[0],
            title: item.countryName.toUpperCase(),
            description: item.description.join("\n"),
            href: `https://global.urbanscience.uos.ac.kr/asean/${idx}`, // TODO: 링크 수정
          }))}
        />
        <Container className="mt-4">
          {/* 솔루션 바로가기 배너 */}
          <SolutionBanner
            linkProps={(await repo.solution.pickLocale(lang).getSuperCategoryNameAll()).map(
              ({ id, name }, idx) => ({
                title: name,
                imgSrc: getSolutionCoverById(id),
                href: `https://global.urbanscience.uos.ac.kr/hub/${idx}`, // TODO: 링크 수정
              })
            )}
          />
        </Container>
      </section>
      <div className="relative border-b">
        <Image
          className="absolute -z-10 w-full h-full object-center object-cover"
          src={urbanCityLandscapeImg}
          alt="Urban City Landscape"
          width={720}
        />
        <div className="backdrop-blur-sm bg-uos-gray/60 text-white py-6">
          <Container className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {/* 총괄 연구 & 사업 배너 */}
            <section className="flex flex-col min-h-64 drop-shadow-md">
              <FormalHeader2 style={{ borderColor: "#fff" }}>
                {t("research-project-header")}
              </FormalHeader2>
              <Carousel className="flex-auto my-4" loop interval={5000}>
                {(await repo.projectRecord.pickLocale(lang).getItemList(true)).map((item, idx) => (
                  <div
                    className="px-12 flex flex-col justify-center text-center w-full h-full break-keep"
                    key={idx}
                  >
                    <div className="font-medium text-3xl">{item.title}</div>
                    <div className="font-light text-xl mt-4">
                      {item.client} [{item.year[0]}~{item.year[1]}]
                    </div>
                  </div>
                ))}
              </Carousel>
            </section>
            {/* 연구센터 소개 배너 */}
            <section className="min-h-48 drop-shadow-md">
              <FormalHeader2 style={{ borderColor: "#fff" }}>
                {t("research-center-introduction")}
              </FormalHeader2>
              <div className="flex items-center w-full h-full">
                <div className="grid grid-cols-4 gap-2 px-4 w-full">
                  {[
                    [quickMenuIcons.greetingIcon.src, t("인사말"), "/introduction/greeting"],
                    [quickMenuIcons.goalIcon.src, t("설립배경 및 목적"), "/introduction/goal"],
                    [quickMenuIcons.groupIcon.src, t("연구진"), "/introduction/researchers"],
                    [quickMenuIcons.noticeIcon.src, t("공지사항"), "/news/notices"],
                  ].map(([icon, text, href], idx) => (
                    <Link className="flex flex-col items-center" key={idx} href={href}>
                      <div
                        className="w-2/3 aspect-square bg-white/75 hover:bg-white"
                        style={{
                          mask: `url(${icon}) no-repeat center / contain`,
                        }}
                      />
                      <div className="text-center break-keep mt-4">{text}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </Container>
        </div>
      </div>
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
                imgSrc={getArticleThumbnailHref(article, "img")}
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
                imgSrc={getArticleThumbnailHref(article, "pdf")}
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
                imgSrc={getArticleThumbnailHref(article, "pdf")}
                title={article.title}
                key={idx}
              />
            ))}
          </div>
        </section>
      </Container>
      <Container className="mt-12">
        <FormalHeader2>관련 웹페이지</FormalHeader2>
      </Container>
    </>
  );
}
