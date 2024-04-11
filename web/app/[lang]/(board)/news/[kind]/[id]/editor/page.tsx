"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const GeneralArticleEditorPage = dynamic(() => import("@pages/general-article-editor-page"), {
  ssr: false,
});

export default function BoardArticleEditor(props: { params: { kind: string; id: string } }) {
  const router = useRouter();

  return (
    <GeneralArticleEditorPage
      kind={props.params.kind}
      articleId={parseInt(props.params.id)}
      afterSubmit={(article) => {
        router.push(`/news/${article.kind}/${article.id}`);
      }}
      afterDelete={(article) => {
        router.push(`/news/${article.kind}`);
      }}
    />
  );
}
