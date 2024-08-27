"use client";

import { Locale } from "core/model";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const PrimaryArticleEditorPage = dynamic(() => import("@pages/primary-article-editor-page"), {
  ssr: false,
});

export default function AseanEditor(props: { params: { lang: Locale; country: string } }) {
  const { lang, country } = props.params;
  const router = useRouter();

  return (
    <PrimaryArticleEditorPage
      lang={lang}
      kind={`asean-${country}`}
      afterSubmit={() => {
        router.push(`/asean/${country}`);
      }}
    />
  );
}
