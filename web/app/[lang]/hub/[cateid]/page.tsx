import Link from "next/link";
import Image from "next/image";
import { repo } from "@/di";

import { Locale } from "core/model";
import { FormalHeader2 } from "@components/typography";
import SolutionBanner from "@components/home/solution-banner";
import CompanyBox from "./company-box";
import {
  getSolutionCoverByIndex,
  getSolutionInnerCoverByIndex,
} from "@resources/images/solution-covers";
import { getSolutionCategory, getSolutionCategoryAll } from "./categories";

function parseCateId(cateid: string): [number, number | undefined] {
  const cate = cateid.split("-");
  if (cate.length === 1) {
    return [parseInt(cate[0]), undefined];
  }
  return [parseInt(cate[0]), parseInt(cate[1])];
}

export default async function Page(props: { params: { lang: Locale; cateid: string } }) {
  const { lang, cateid } = props.params;
  const [cateMain, cateSub] = parseCateId(cateid);

  const category = getSolutionCategory(cateMain, lang);
  const subCategory = cateSub !== undefined ? category.subCategories[cateSub] : undefined;

  const companies = await repo.solution.getCompaniesByCategory({
    mainCategoryId: cateMain,
    subCategoryId: cateSub,
  });

  return (
    <div className={`flex ${subCategory ? "flex-col-reverse" : "flex-col"}`}>
      <SolutionBanner
        className="my-4"
        linkProps={getSolutionCategoryAll(lang).map(({ name }, idx) => ({
          title: name,
          imgSrc: getSolutionCoverByIndex(idx),
          href: `/hub/${idx}`,
        }))}
      />
      <div className="w-full flex flex-col items-center my-4">
        <div className="border rounded-lg w-[1024px]">
          <div className="p-6">
            {category.desc.map((desc, idx) => (
              <p className="mb-1 text-sm font-medium text-center" key={idx}>
                {desc}
              </p>
            ))}
          </div>
          <p className="text-center font-bold mb-8">
            {lang === "ko"
              ? `아래의 소분류를 선택해서 ${category.name} 분야의 국내 기업들을 확인해보세요.`
              : `Select a subcategory below to see domestic companies in the ${category.name} field.`}
          </p>
          <div className="relative">
            <Image
              className="w-full"
              src={getSolutionInnerCoverByIndex(cateMain)}
              alt="Page Cover Image"
              width={1024}
            />
            {category.subCategories.map((subCategory, idx) => (
              <Link
                key={idx}
                className="absolute px-4 py-2 min-w-48 bg-white/70 rounded-full font-medium text-sm text-center hover:bg-white hover:underline transition-all"
                style={{
                  left: `${subCategory.buttonPosition[0]}%`,
                  top: `${subCategory.buttonPosition[1]}%`,
                }}
                href={`/hub/${cateMain}-${idx}`}
              >
                {subCategory.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="my-4">
        <FormalHeader2 className="mb-4 flex items-center">
          {category.name}
          {subCategory && (
            <>
              <span className="w-6 mx-1">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
                </svg>
              </span>
              {subCategory.name}
            </>
          )}
        </FormalHeader2>
        <div className="w-full mb-8">
          {companies.map((company) => (
            <CompanyBox
              company={company}
              mainCategoryId={cateMain}
              subCategoryId={cateSub}
              key={company.companyId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
