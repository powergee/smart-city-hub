"use client";

import { Locale, PrimaryArticleKind } from "core/model";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const PrimaryArticleEditorPage = dynamic(() => import("@pages/primary-article-editor-page"), {
  ssr: false,
});

export default async function IntroductionEditor(props: {
  params: { lang: Locale; kind: PrimaryArticleKind };
}) {
  const { lang, kind } = props.params;
  const router = useRouter();

  return (
    <PrimaryArticleEditorPage
      lang={lang}
      kind={kind}
      afterSubmit={() => {
        router.push(`/introduction/${kind}`);
      }}
    />
  );
}
