import { SolutionItemLocalized } from "core/model";
import Link from "next/link";

type SolutionWithCompany = SolutionItemLocalized & { companyName?: string };

export default function SolutionItemCard({ solution, lang }: { solution: SolutionWithCompany, lang: string }) {  
  // Link format: /hub/detail/company/[companyId]/solution/[solutionId]
  const href = `/${lang}/hub/detail/company/${solution.companyId}/solution/${solution.solutionId}`;

  // Localized item is already flat
  const content = solution;

  return (
    <Link href={href} className="block group">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm group-hover:shadow-md group-hover:border-uos-blue transition-all duration-200 h-full flex flex-col">
        {/* Company Name Badge */}
        {solution.companyName && (
          <div className="mb-2">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {solution.companyName}
            </span>
          </div>
        )}
        
        <h4 className="font-bold text-xl text-uos-blue mb-3 group-hover:text-uos-signiture-blue transition-colors">
          {content.title}
        </h4>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {content.summary}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
           <span className="text-sm font-medium text-uos-blue ml-2">
             View Details &rarr;
           </span>
        </div>
      </div>
    </Link>
  );
}
