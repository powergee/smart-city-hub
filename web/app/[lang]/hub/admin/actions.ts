"use server";

import { repo } from "@/di";
import { SolutionCompany, SolutionItem } from "core/model";
import { revalidatePath } from "next/cache";

export async function getBilingualCompany(companyId: string) {
    try {
        const company = await repo.solution.getCompany(companyId);
        return company as SolutionCompany;
    } catch (e) {
        // console.error("Failed to fetch bilingual company", e);
        return null;
    }
}

export async function getBilingualSolution(solutionId: string) {
    try {
        const solution = await repo.solution.getSolution(solutionId);
        return solution as SolutionItem;
    } catch (e) {
        // console.error("Failed to fetch bilingual solution", e);
        return null;
    }
}

export async function createCompany(company: SolutionCompany, lang: string) {
  try {
    await repo.solution.createCompany(company);
    revalidatePath(`/${lang}/hub/admin`);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to create company" };
  }
}

export async function updateCompany(company: Partial<SolutionCompany> & { companyId: string }, lang: string) {
  try {
    await repo.solution.updateCompany(company);
    revalidatePath(`/${lang}/hub/admin`);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to update company" };
  }
}

export async function deleteCompany(companyId: string, lang: string) {
  try {
    await repo.solution.deleteCompany(companyId);
    revalidatePath(`/${lang}/hub/admin`);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to delete company" };
  }
}

export async function createSolution(solution: SolutionItem, lang: string) {
  try {
    await repo.solution.createSolution(solution);
    revalidatePath(`/${lang}/hub/admin`);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to create solution" };
  }
}

export async function deleteSolution(solutionId: string, lang: string) {
  try {
      await repo.solution.deleteSolution(solutionId);
      revalidatePath(`/${lang}/hub/admin`);
      return { success: true };
  } catch (e) {
      console.error(e);
      return { success: false, message: "Failed to delete solution" };
  }
}

export async function updateSolution(solution: Partial<SolutionItem> & { solutionId: string }, lang: string) {
    try {
      await repo.solution.updateSolution(solution);
      revalidatePath(`/${lang}/hub/admin`);
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: "Failed to update solution" };
    }
}
