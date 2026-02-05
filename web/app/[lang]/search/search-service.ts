import { repo } from "@/di";
import { SolutionItemLocalized } from "core/model";

export type SearchOption = "all" | "country" | "solution";

export type SearchResultSolution = SolutionItemLocalized;

export type SearchResult = {
  solutions: SearchResultSolution[];
};

export async function search(keyword: string, option: SearchOption, lang?: string): Promise<SearchResult> {
  const normalizedKeyword = keyword.trim();
  
  if (!normalizedKeyword) {
    return { solutions: [] };
  }

  try {
     const solutions = await repo.solution.search(normalizedKeyword, lang);
     return { solutions };
  } catch (error) {
    console.error("Search failed:", error);
    return { solutions: [] };
  }
}
