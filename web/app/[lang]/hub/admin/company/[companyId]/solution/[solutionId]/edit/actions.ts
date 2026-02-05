"use server";

import { repo } from "@/di";
import { SolutionItem } from "core/model";
import { redirect } from "next/navigation";

export async function updateSolution(solution: Partial<SolutionItem> & { solutionId: string }, lang: string, companyId: string) {
  try {
    await repo.solution.updateSolution(solution);
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to update solution" };
  }
  
  redirect(`/${lang}/hub/detail/company/${companyId}/solution/${solution.solutionId}`);
}

export async function deleteSolution(solutionId: string, lang: string, companyId: string) {
  try {
    await repo.solution.deleteSolution(solutionId);
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to delete solution" };
  }

  // Redirect to company detail or admin page after deletion
  redirect(`/${lang}/hub/admin`); 
}
