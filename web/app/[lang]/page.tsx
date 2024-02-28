import Image from "next/image";

import { Locale } from "core/model";
import { repo } from "repository";
import { initTranslation } from "@locales";

import Container from "@components/container";
import { FormalHeader2 } from "@components/typography";
import AseanBanner from "@components/home/asean-banner";
import SolutionBanner from "@components/home/solution-banner";
import Carousel from "@components/carousel";

import { getSolutionCoverById } from "@resources/images/solution-covers";
import urbanCityLandscapeImg from "@resources/images/urban-city-landscape.jpg";

export default async function Home(props: { params: { lang: string } }) {
  const lang = props.params.lang as Locale;
  const { t } = await initTranslation(lang);

  return (
    <>
      <div className="bg-global-gray-light pt-4 pb-8 border-b">
        <Container>
          <FormalHeader2>{t("asean-banner-header")}</FormalHeader2>
        </Container>
        {/* 아세안 국가 바로가기 배너 */}
        <AseanBanner
          className="max-w-screen-2xl mx-auto md:-mt-10"
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
            linkProps={(
              await repo.solution.pickLocale(lang).getSuperCategoryNameAll()
            ).map(({ id, name }, idx) => ({
              title: name,
              imgSrc: getSolutionCoverById(id),
              href: `https://global.urbanscience.uos.ac.kr/hub/${idx}`, // TODO: 링크 수정
            }))}
          />
        </Container>
      </div>
      <div className="relative border-b">
        <Image
          className="absolute -z-10 w-full h-full object-center object-cover"
          src={urbanCityLandscapeImg}
          alt="Urban City Landscape"
          width={720}
        />
        <div className="backdrop-blur-sm bg-uos-gray/60 py-8">
          <Container className="text-white">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
              {/* 총괄 연구 & 사업 배너 */}
              <div className="min-h-72">
                <FormalHeader2
                  className="drop-shadow-md"
                  style={{ borderColor: "#fff" }}
                >
                  {t("research-project-header")}
                </FormalHeader2>
                <Carousel className="h-full" recursive interval={5000}>
                  {(
                    await repo.projectRecord.pickLocale(lang).getItemList(true)
                  ).map((item, idx) => (
                    <div
                      className="px-16 flex flex-col justify-center text-center w-full h-full drop-shadow-md break-keep"
                      key={idx}
                    >
                      <div className="font-medium text-3xl">{item.title}</div>
                      <div className="font-light text-xl mt-4">
                        {item.client} [{item.year[0]}~{item.year[1]}]
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
              {/* 연구센터 소개 배너 */}
              <div className="min-h-72">
                <FormalHeader2
                  className="drop-shadow-md"
                  style={{ borderColor: "#fff" }}
                >
                  {t("research-center-introduction")}
                </FormalHeader2>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <FormalHeader2 className="mt-8">최신 Update</FormalHeader2>
        <FormalHeader2 className="mt-8">최신 Issue Paper</FormalHeader2>
        <FormalHeader2 className="mt-8">
          최신 신남방 & 스마트도시 기술 리포트
        </FormalHeader2>
        <FormalHeader2 className="mt-8">관련 웹페이지</FormalHeader2>
      </Container>
    </>
  );
}
