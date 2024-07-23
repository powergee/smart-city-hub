"use client";

import Container from "@components/container";
import SubmitButton from "@components/submit-button";

import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <Container className="h-full flex items-center justify-center">
      <div className="flex-1 my-8 max-w-96">
        <form className="border rounded p-8">
          <p className="mb-4">
            회원가입을 하시려면 아래의 양식을 채워주십시오. 관리자 승인 후 로그인이 가능할 수
            있습니다.
          </p>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              {t("이름")}
            </label>
            <input
              className="border rounded w-full py-2 px-3 transition focus:outline-hone focus:ring"
              id="name"
              name="name"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="userid">
              {t("아이디")}
            </label>
            <input
              className="border rounded w-full py-2 px-3 transition focus:outline-hone focus:ring"
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
              className="border rounded w-full py-2 px-3 transition focus:outline-hone focus:ring"
              id="plainpw"
              name="plainpw"
              type="password"
            />
          </div>
          <SubmitButton
            text={t("회원가입")}
            pendingText={t("전송중") + "..."}
            className="mt-4 bg-uos-blue hover:bg-uos-signiture-blue disabled:bg-uos-signiture-blue transition text-white py-2 px-4 rounded focus:outline-none focus:ring"
          />
        </form>
      </div>
    </Container>
  );
}
