import Image from "next/image";
import Link from "next/link";

import { repo } from "@/di";
import Container from "@components/container";
import SolutionBanner from "@components/hub/solution-banner";
import { FormalHeader2 } from "@components/typography";
import { initTranslation } from "@locales";
import {
  getSolutionCoverById,
  getSolutionInnerCoverById,
  getSolutionInnerCoverByIndex,
} from "@resources/images/solution-covers";
import { Locale } from "core/model";
import { getSolutionCategory, getSuperCategory } from "../../../../categories";
import CompanyBox from "./company-box";

export default async function Page(props: {
  params: Promise<{
    lang: Locale;
    superCategoryId: string;
    mainCategoryId: string;
    subCategoryId: string;
  }>;
}) {
  const { lang, superCategoryId, mainCategoryId, subCategoryId } = await props.params;
  const { t } = await initTranslation(lang);

  const superId = parseInt(superCategoryId);
  const mainId = parseInt(mainCategoryId);
  const subId = parseInt(subCategoryId);

  const superCategory = getSuperCategory(superId);
  const mainCategory = getSolutionCategory(mainId);
  const subCategory = mainCategory.subCategories[subId];
  const rawMainCategoryName = mainCategory.name;

  const firstMainCatId = superCategory.categoryIds[0];
  const firstMainCategory = getSolutionCategory(firstMainCatId);
  const coverImage = getSolutionCoverById(firstMainCategory.name) || getSolutionCoverById("건설");

  const bannerLinks = superCategory.categoryIds.map((catId) => {
    const catData = getSolutionCategory(catId);
    return {
      title: t(catData.name),
      imgSrc: getSolutionCoverById(catData.name),
      href: `/hub/categories/${superId}/${catId}/0`,
      isActive: catId === mainId,
    };
  });

  const companies = await repo.solution.getCompaniesByCategory({
    mainCategoryId: mainId,
    subCategoryId: subId,
    lang,
  });

  return (
    <>
      {/* Super Category Header */}
      <header className="relative h-48 md:h-64 border-b">
        <Image
          className="w-full h-full object-cover"
          src={coverImage}
          alt="Page Cover Image"
          height={288}
        />
        <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full text-white bg-uos-gray/50">
          <h1 className="font-bold text-4xl md:text-6xl">{t(superCategory.name)}</h1>
          <h2 className="font-medium text-2xl mt-3">{t(superCategory.description)}</h2>
        </div>
      </header>

      <Container className="flex flex-col mt-8 mb-12">
        <section className="w-full">
          {/* Main Category Banner & Content */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/5 shrink-0">
              <SolutionBanner type="sidebar" className="my-4 top-24" linkProps={bannerLinks} />
            </div>

            <div className="w-full md:w-4/5 flex flex-col items-center my-4">
              <div className="border rounded-lg w-[1024px] bg-gray-50">
                {/* 
                It seems like legacy(english description is not supported)
                <div className="p-6">
                  {mainCategory.desc.map((desc, idx) => (
                    <p className="mb-1 text-sm font-medium text-center" key={idx}>
                      {t(desc)}
                    </p>
                  ))}
                </div> */}
                <p className="text-center font-bold mb-8">
                  {lang === "ko"
                    ? `아래의 소분류를 선택해서 ${t(mainCategory.name)} 분야의 국내 기업들을 확인해보세요.`
                    : `Select a subcategory below to see domestic companies in the ${t(mainCategory.name)} field.`}
                </p>
                <div className="relative">
                  <Image
                    className="w-full"
                    src={
                      getSolutionInnerCoverById(rawMainCategoryName) ||
                      getSolutionInnerCoverByIndex(0)
                    }
                    alt="Page Cover Image"
                    width={1024}
                  />

                  {mainCategory.subCategories.map((sub, idx) => (
                    <Link
                      key={idx}
                      className={`absolute px-4 py-2 min-w-48 rounded-full font-medium text-sm text-center transition-all ${
                        idx === subId
                          ? "bg-uos-blue text-white shadow-lg scale-105 hover:bg-uos-signiture-blue"
                          : "bg-white/70 hover:bg-white hover:underline"
                      }`}
                      style={{
                        left: `${sub.buttonPosition[0]}%`,
                        top: `${sub.buttonPosition[1]}%`,
                      }}
                      href={`/hub/categories/${superId}/${mainId}/${idx}`}
                    >
                      {t(sub.name)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sub Category Content */}
          <div className="my-4">
            <FormalHeader2 className="mb-4 flex items-center">
              {t(mainCategory.name)}
              <span className="w-6 mx-1">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
                </svg>
              </span>
              {t(subCategory.name)}
            </FormalHeader2>
            <div className="w-full mb-8">
              {companies.map((company) => (
                <CompanyBox
                  company={company}
                  mainCategoryId={mainId}
                  subCategoryId={subId}
                  key={company.companyId}
                />
              ))}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
