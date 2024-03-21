"use server";

import { UserItem } from "core/model";
import { repo } from "@/di";
import { getAccessToken, setAccessToken } from "@/utils";

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
