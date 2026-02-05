import Container from "@components/container";
import { initTranslation } from "@locales";
import { Locale } from "core/model";
import SearchHeader from "./_components/search-header";
import SolutionItemCard from "./_components/solution-item";
import { search, SearchOption } from "./search-service";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    option?: string;
    keyword?: string;
  }>;
};

export default async function SearchPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const lang = params.lang as Locale;
  const { t } = await initTranslation(lang);
  
  const option = (searchParams.option as SearchOption) || "all";
  const keyword = searchParams.keyword || "";
  
  const { solutions } = await search(keyword, option, lang);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <SearchHeader 
          keyword={keyword}
        />
        
        <div className="space-y-12">
          {/* Results List */}
          <div className="space-y-6">
            {solutions.map((solution) => (
              <SolutionItemCard key={solution.solutionId} solution={solution} lang={lang} />
            ))}
          </div>

          {solutions.length === 0 && (
             <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search keyword or option.</p>
             </div>
          )}
        </div>
      </Container>
    </div>
  );
}
