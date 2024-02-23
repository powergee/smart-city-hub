import "@/globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { locales } from "core/model";

import { initTranslation, TranslationProvider } from "@locales";
import Header from "./header";
import Footer from "./footer";

// TODO: 아래의 메타데이터를 repository로부터 가져올 수 있어야 할 것(센터 소개 내용 동적 변경에 대비해야 함)
export const metadata: Metadata = {
  title: "국제도시 및 인프라 연구센터",
  description:
    "국제도시 및 인프라 연구센터는 4차 산업혁명시대에 도시, 교통, 환경, 재난 등 사람을 위한 연구를 추진하고 있습니다.",
};

const font = localFont({
  src: "../_resources/fonts/NotoSansKR-VariableFont_wght.ttf",
  display: "swap",
});

export async function generateStaticParams() {
  // 언어별로 정적 페이지 생성
  return locales.map((lang) => ({ lang }));
}

/**
 * 전체 웹 페이지의 뼈대가 되는 레이아웃입니다.
 * 각 디렉터리에 위치한 page.tsx의 페이지 컴포넌트를 해당 레이아웃과 함께 `{children}` 위치에 렌더링합니다.
 */
export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { lang: string };
  }>
) {
  const lang = props.params.lang;
  const { t } = await initTranslation(lang);

  return (
    <html lang={lang}>
      <body className={font.className}>
        <TranslationProvider lang={lang}>
          <Header />
          <div>{props.children}</div>
          <Footer className="mt-8" t={t} />
        </TranslationProvider>
      </body>
    </html>
  );
}
