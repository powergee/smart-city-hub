"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

import Container from "@components/container";
import SubmitButton from "@components/submit-button";

import { authByIdPw } from "./action";
import { useFormState } from "react-dom";

export default function LoginPage() {
  const [state, formAction] = useFormState(authByIdPw, {});

  if (state.token) {
    redirect("/");
  }

  return (
    <Container className="h-full flex items-center justify-center">
      <div className="flex-1 my-8 max-w-96">
        <form className="border rounded p-8" action={formAction}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="userid">
              아이디
            </label>
            <input
              className="border rounded w-full py-2 px-3 transition focus:outline-none focus:ring"
              id="userid"
              name="userid"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="userid">
              비밀번호
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
          <div className="mt-8 flex items-center justify-between">
            <SubmitButton
              text="로그인"
              pendingText="로그인 중..."
              className="bg-uos-blue hover:bg-uos-signiture-blue disabled:bg-uos-signiture-blue transition text-white py-2 px-4 rounded focus:outline-none focus:ring"
            />
            <Link
              className="inline-block align-baseline text-uos-blue hover:text-uos-signiture-blue hover:underline transition"
              href="/register"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
