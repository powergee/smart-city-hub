"use server";

import {
  UserItem,
  GeneralArticle,
  AttachmentFile,
  PrimaryArticle,
  ProjectRecordItem,
  Locale,
} from "core/model";
import { repo } from "@/di";
import { getAccessToken, setAccessToken } from "@/utils";
import { revalidatePath } from "next/cache";

export type AuthState = {
  token?: string;
  user?: UserItem;
  error?: string;
};

export async function doLogin(prevState: AuthState, formData: FormData): Promise<AuthState> {
  setAccessToken("");

  const id = formData.get("userid")?.toString();
  const pw = formData.get("plainpw")?.toString();

  if (!id || !pw) {
    return {
      error: "아이디와 비밀번호를 입력해주세요.",
    };
  }

  try {
    const token = await repo.authTokenIDPW.issue({ id, pw });
    const user = await repo.authTokenIDPW.whoami(token);
    setAccessToken(token);
    return { token, user: user || undefined };
  } catch (err) {
    return {
      error: "아이디 또는 비밀번호가 잘못되었습니다.",
    };
  }
}

export async function doLogout(): Promise<void> {
  setAccessToken(null);
}

export async function checkWhoami(): Promise<UserItem | null> {
  const token = getAccessToken();
  if (!token) return null;

  return await repo.authTokenIDPW.whoami(token);
}

export async function getGeneralArticle(id: number): Promise<GeneralArticle> {
  return await repo.generalArticle.getById(id);
}

export async function postGeneralArticle(
  article: Partial<GeneralArticle>
): Promise<GeneralArticle> {
  revalidatePath("/");
  return await repo.generalArticle.post(article);
}

export async function deleteGeneralArticle(id: number): Promise<GeneralArticle> {
  revalidatePath("/");
  return await repo.generalArticle.delete(id);
}

export async function getAttachmentFileList(article: GeneralArticle): Promise<AttachmentFile[]> {
  const { attachmentIds } = article;
  return Promise.all(attachmentIds.map((id) => repo.attachmentFile.getInfo(id)));
}

export async function uploadAttachmentFile(formData: FormData): Promise<AttachmentFile> {
  revalidatePath("/");
  return await repo.attachmentFile.upload(formData.get("file") as File);
}

export async function getPrimaryArticle(locale: Locale, kind: string): Promise<PrimaryArticle> {
  return await repo.primaryArticle.pickLocale(locale).get(kind);
}

export async function setPrimaryArticle(
  locale: Locale,
  kind: string,
  contents: string
): Promise<PrimaryArticle> {
  revalidatePath("/");
  const user = await checkWhoami();
  if (!user || user.privilege !== "manager") {
    throw new Error("Unauthorized");
  }

  return await repo.primaryArticle.pickLocale(locale).set(kind, contents);
}

export async function getProjectRecordList(lang: Locale): Promise<ProjectRecordItem[]> {
  return await repo.projectRecord.pickLocale(lang).getItemList();
}

export async function setProjectRecordList(
  lang: Locale,
  items: ProjectRecordItem[]
): Promise<ProjectRecordItem[]> {
  revalidatePath("/");
  const user = await checkWhoami();
  if (!user || user.privilege !== "manager") {
    throw new Error("Unauthorized");
  }

  return await repo.projectRecord.pickLocale(lang).setItemList(items);
}

export async function getSolutionsByCompany(
  companyId: number,
  mainCategoryId: number,
  subCategoryId?: number
) {
  return Promise.resolve(
    repo.solution.getSolutionsByCompany({
      companyId,
      mainCategoryId,
      subCategoryId,
    })
  );
}
