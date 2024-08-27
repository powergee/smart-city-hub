"use client";

import { Locale, PrimaryArticle } from "core/model";
import { getPrimaryArticle, setPrimaryArticle } from "@/actions";
import { useState, useEffect } from "react";
import { useLoginState } from "@components/login-context";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

export default function PrimaryArticleEditorPage(props: {
  kind: string;
  lang: Locale;
  afterSubmit?: (article: PrimaryArticle) => void;
}) {
  const { kind, lang } = props;
  const [body, setBody] = useState("");

  /**
   * 권한 확인
   */
  const { loginUser: user } = useLoginState();
  if (!user || user.privilege !== "manager") {
    throw new Error("권한이 없습니다.");
  }

  /**
   * 게시글 불러오기
   */
  useEffect(() => {
    if (!lang || !kind) return;

    (async function () {
      const article = await getPrimaryArticle(lang, kind);
      setBody(article.contents);
    })();
  }, [lang, kind]);

  const submit = async (): Promise<PrimaryArticle> => {
    const article = await setPrimaryArticle(lang, kind, body);
    return article;
  };

  return (
    <form className="w-full">
      {/* 본문 필드 */}
      <CKEditor
        editor={Editor}
        data={body}
        onChange={(e, editor) => {
          const data = editor.getData();
          setBody(data);
        }}
      />

      {/* 게시글 작성 버튼 */}
      <button
        onClick={async (e) => {
          e.preventDefault();
          try {
            const article = await submit();
            window.alert("게시글이 성공적으로 작성되었습니다.");
            props.afterSubmit && props.afterSubmit(article);
          } catch (err) {
            window.alert("게시글 작성 중에 오류가 발생했습니다.");
          }
        }}
        className="btn btn-primary mt-4"
      >
        작성
      </button>
    </form>
  );
}
