import Container from "@components/container";
import { initTranslation } from "@locales";
import { Locale } from "core/model";

import { repo } from "@/di";

type Props = {
  params: Promise<{
    lang: string;
    companyId: string;
    solutionId: string;
  }>;
};

export default async function SolutionDetailPage(props: Props) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const { t } = await initTranslation(lang);

  const solutionId = params.solutionId;
  const companyId = params.companyId;

  // Fetch Entities
  const solution = await repo.solution.getSolution(solutionId);
  const company = await repo.solution.getCompany(companyId);

  if (!solution || !company) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t("솔루션을 찾을 수 없습니다")}</h1>
        </div>
      </Container>
    );
  }

  // Localize for display
  const comp = company[lang] || company.ko;
  const item = solution[lang] || solution.ko;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        {/* Card Container */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          
          {/* Company Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{comp.name}</h1>
            
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
              <div className="flex items-center">
                <span className="bg-gray-100 text-gray-600 font-semibold px-2 py-1 rounded-l-md border border-r-0 border-gray-200">
                  {t("대표")}
                </span>
                <span className="bg-white text-gray-800 px-3 py-1 rounded-r-md border border-gray-200">
                  {comp.ceo}
                </span>
              </div>

              <div className="flex items-center">
                <span className="bg-gray-100 text-gray-600 font-semibold px-2 py-1 rounded-l-md border border-r-0 border-gray-200">
                  {t("주소")}
                </span>
                <span className="bg-white text-gray-800 px-3 py-1 rounded-r-md border border-gray-200">
                  {comp.address}
                </span>
              </div>

              <div className="flex items-center">
                <span className="bg-gray-100 text-gray-600 font-semibold px-2 py-1 rounded-l-md border border-r-0 border-gray-200">
                  {t("전화")}
                </span>
                <span className="bg-white text-gray-800 px-3 py-1 rounded-r-md border border-gray-200">
                  {comp.tel}
                </span>
              </div>

              <div className="flex items-center">
                <span className="bg-gray-100 text-gray-600 font-semibold px-2 py-1 rounded-l-md border border-r-0 border-gray-200">
                  {t("팩스")}
                </span>
                <span className="bg-white text-gray-800 px-3 py-1 rounded-r-md border border-gray-200">
                  {comp.fax}
                </span>
              </div>

              <div className="flex items-center">
                <span className="bg-gray-100 text-gray-600 font-semibold px-2 py-1 rounded-l-md border border-r-0 border-gray-200">
                  {t("웹사이트")}
                </span>
                <span className="bg-white text-gray-800 px-3 py-1 rounded-r-md border border-gray-200">
                  <a href={comp.website} target="_blank" rel="noreferrer" className="text-uos-blue hover:underline">
                    {comp.website}
                  </a>
                </span>
              </div>
            </div>
          </div>

          <hr className="border-gray-100 my-8" />

          {/* Solution Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-uos-signiture-blue mb-2 hover:underline cursor-pointer">
                {item.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center">
                <span className="text-uos-blue mr-1">✓</span> {t("솔루션 개요")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.abstract}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center">
                <span className="text-uos-blue mr-1">✓</span> {t("솔루션 특징")}
              </h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                {item.feature}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center">
                <span className="text-uos-blue mr-1">✓</span> {t("솔루션 구성")}
              </h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                {item.composition}
              </p>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
