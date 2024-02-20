import { NextRequest } from "next/server";
import { locales } from "core/model";
import { i18nRouter } from "next-i18n-router";
import Negotiator from "negotiator";

function getLocale(acceptLanguage: string) {
  const language = new Negotiator({
    headers: {
      "accept-language": acceptLanguage,
    },
  }).language([...locales]);

  if (language) return language;
  return "en"; // 지원하는 언어가 없으면 무조건 영어 페이지로 설정
}

export function middleware(request: NextRequest) {
  /**
   * 링크 이동 시, 한국어 페이지는 그대로 라우팅을 하고, 그 외의 언어 페이지는 `/${locale}`을 붙여 라우팅한다.
   * 쿠키를 이용하여 언어 정보를 저장하고, 이를 통해 라우팅을 진행하기에, `/${locale}`이 붙은 상태가 유지된다.
   */
  return i18nRouter(request, {
    locales: [...locales],
    defaultLocale: "ko",
    localeDetector: (request, config) => {
      return getLocale(request.headers.get("accept-language") ?? "");
    },
  });
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
