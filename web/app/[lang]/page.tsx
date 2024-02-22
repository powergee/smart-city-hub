import { Locale } from "core/model";
import { repo } from "repository";
import { initTranslation } from "@locales";

import Container from "@components/container";
import { FormalHeader2 } from "@components/typography";
import AseanBanner from "@components/home/asean-banner";
import SolutionBanner from "@components/home/solution-banner";

import { getSolutionCoverById } from "@resources/images/solution-covers";

export default async function Home(props: { params: { lang: string } }) {
  const lang = props.params.lang as Locale;
  const { t } = await initTranslation(lang);

  return (
    <>
      <div className="bg-global-gray-light pt-4 pb-6 border-b">
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
      <Container className="mt-6">
        <FormalHeader2 className="mt-8">총괄연구 & 사업</FormalHeader2>
        <FormalHeader2 className="mt-8">연구센터 소개</FormalHeader2>
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
