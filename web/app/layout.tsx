import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/globals.css";

import Header from "@components/header";

export const metadata: Metadata = {
  title: "국제도시 및 인프라 연구센터",
  description:
    // TODO: 아래의 설명 문구를 repository로부터 가져올 수 있어야 할 것(센터 소개 내용 동적 변경에 대비해야 함)
    "국제도시 및 인프라 연구센터는 4차 산업혁명시대에 도시, 교통, 환경, 재난 등 사람을 위한 연구를 추진하고 있습니다.",
};

const font = localFont({
  src: "./_resources/fonts/NotoSansKR-VariableFont_wght.ttf",
  display: "swap",
});

/**
 * 전체 웹 페이지의 뼈대가 되는 레이아웃입니다.
 * 각 디렉터리에 위치한 page.tsx의 페이지 컴포넌트를
 * 해당 레이아웃과 함께 `{chilren}` 위치에 렌더링합니다.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={font.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
