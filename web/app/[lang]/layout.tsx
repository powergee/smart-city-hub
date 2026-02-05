import "@/globals.css";
import "ckeditor-tailwind-reset/ckeditor-tailwind-reset.css";
import "ckeditor5-custom-build/build/styles.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { LoginStateProvider } from "@components/login-context";
import { initTranslation, TranslationProvider } from "@locales";
import Footer from "./footer";
import Header from "./header";

// TODO: 아래의 메타데이터를 repository로부터 가져올 수 있어야 할 것(센터 소개 내용 동적 변경에 대비해야 함)
export const metadata: Metadata = {
  title: "국제도시 및 인프라 연구센터",
  description:
    "국제도시 및 인프라 연구센터는 4차 산업혁명시대에 도시, 교통, 환경, 재난 등 사람을 위한 연구를 추진하고 있습니다.",
};

const font = localFont({
  src: [
    { path: "../_resources/fonts/NotoSans-Light.woff2", weight: "300" },
    { path: "../_resources/fonts/NotoSans-Regular.woff2", weight: "400" },
    { path: "../_resources/fonts/NotoSans-Medium.woff2", weight: "500" },
    { path: "../_resources/fonts/NotoSans-Bold.woff2", weight: "700" },
  ],
  display: "swap",
});

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
  const lang = (await props.params).lang;
  const { t } = await initTranslation(lang);

  return (
    <html lang={lang} className="h-full">
      <body className={`flex flex-col h-full ${font.className}`}>
        <TranslationProvider lang={lang}>
          <LoginStateProvider>
            <Header />
            <main className="flex-auto" style={{ marginTop: 96 }}>
              {props.children}
            </main>
            <Footer className="flex-none mt-8" t={t} />
          </LoginStateProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
