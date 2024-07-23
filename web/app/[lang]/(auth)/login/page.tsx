"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTranslation } from "react-i18next";
import Container from "@components/container";
import SubmitButton from "@components/submit-button";
import { useLoginState } from "@components/login-context";

import { doLogin } from "@/actions";
import { useFormState } from "react-dom";

export default function LoginPage() {
  const [state, formAction] = useFormState(doLogin, {});
  const { setLoginUser } = useLoginState();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (state.token) {
      setLoginUser(state.user || null);
      router.push("/");
    }
  }, [state]);

  return (
    <Container className="h-full flex items-center justify-center">
      <div className="flex-1 my-8 max-w-96">
        <form className="border rounded p-8" action={formAction}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="userid">
              {t("아이디")}
            </label>
            <input
              className="border rounded w-full py-2 px-3 transition focus:outline-none focus:ring"
              id="userid"
              name="userid"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="plainpw">
              {t("비밀번호")}
            </label>
            <input
              className="border rounded w-full py-2 px-3 transition focus:outline-none focus:ring"
              id="plainpw"
              name="plainpw"
              type="password"
            />
          </div>
          {state.error && (
            <p className="mb-4 text-sm text-red-500" aria-live="polite">
              {state.error}
            </p>
          )}
          {state.token ? (
            <p className="mb-4 text-sm text-blue-500" alia-live="polite">
              로그인에 성공하였습니다.
            </p>
          ) : (
            <div className="mt-8 flex items-center justify-between">
              <SubmitButton
                text={t("로그인")}
                pendingText={t("로그인 중") + "..."}
                className="bg-uos-blue hover:bg-uos-signiture-blue disabled:bg-uos-signiture-blue transition text-white py-2 px-4 rounded focus:outline-none focus:ring"
              />
              <Link
                className="inline-block align-baseline text-uos-blue hover:underline transition"
                href="/register"
              >
                {t("회원가입")}
              </Link>
            </div>
          )}
        </form>
      </div>
    </Container>
  );
}
