"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const GeneralArticleEditorPage = dynamic(() => import("@pages/general-article-editor-page"), {
  ssr: false,
});

export default function BoardArticleEditor(props: { params: { kind: string } }) {
  const router = useRouter();
  return (
    <GeneralArticleEditorPage
      kind={props.params.kind}
      afterSubmit={(article) => {
        router.push(`/publish/${article.kind}/${article.id}`);
      }}
      afterDelete={(article) => {
        router.push(`/publish/${article.kind}`);
      }}
    />
  );
}
