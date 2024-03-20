"use server";

import { repo } from "@/di";
import { setAccessToken } from "@/utils";

export type AuthState = {
  token?: string;
  error?: string;
};

export async function authByIdPw(prevState: AuthState, formData: FormData): Promise<AuthState> {
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
    setAccessToken(token);
    return { token };
  } catch (err) {
    return {
      error: "아이디와 비밀번호를 확인해주세요.",
    };
  }
}
