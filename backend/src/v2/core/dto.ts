import { SolutionCompany, SolutionItem } from "./model";

export type SolutionCompanyDTO = SolutionCompany;
export type SolutionItemDTO = SolutionItem;

/**
 * Localized view of a SolutionCompany.
 * Used for listing and display purposes where a specific language is selected.
 */
export type SolutionCompanyLocalizedDTO = {
    companyId: string;
    name: string;
    ceo: string;
    address: string;
    tel: string;
    fax: string;
    website: string;
}

/**
 * Localized view of a SolutionItem.
 * Used for listing and display purposes where a specific language is selected.
 */
export type SolutionItemLocalizedDTO = {
    solutionId: string;
    companyId: string;
    mainCategoryId: number;
    subCategoryId: number;
    title: string;
    summary: string;
    abstract: string;
    feature: string;
    composition: string;
    // Optional: Include company name if joined
    companyName?: string;
}