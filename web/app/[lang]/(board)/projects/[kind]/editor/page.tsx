"use client";

import { Locale } from "core/model";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const PrimaryArticleEditorPage = dynamic(() => import("@pages/primary-article-editor-page"), {
  ssr: false,
});

export default async function ProjectsEditor(props: { params: { lang: Locale; kind: string } }) {
  const { lang, kind } = props.params;
  const router = useRouter();

  return (
    <PrimaryArticleEditorPage
      lang={lang}
      kind={kind}
      afterSubmit={() => {
        router.push(`/projects/${kind}`);
      }}
    />
  );
}
