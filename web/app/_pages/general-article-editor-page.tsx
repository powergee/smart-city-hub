"use client";

import { GeneralArticle, AttachmentFile } from "core/model";
import {
  getGeneralArticle,
  postGeneralArticle,
  deleteGeneralArticle,
  getAttachmentFileList,
  uploadAttachmentFile,
} from "@/actions";
import React, { useEffect, useState } from "react";
import { useLoginState } from "@components/login-context";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

type Attachment = {
  name: string;
  file: AttachmentFile | File;
};

function Label(props: JSX.IntrinsicElements["label"]) {
  const { className, children, ...restProps } = props;

  return (
    <label
      className={`block mt-4 mb-2 font-medium${className ? ` ${className}` : ""}`}
      {...restProps}
    >
      {children}
    </label>
  );
}

function Input(props: JSX.IntrinsicElements["input"]) {
  const { className, ...restProps } = props;

  return (
    <input
      className={`border border-zinc-300 rounded-sm w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-inset${
        className ? ` ${className}` : ""
      }`}
      {...restProps}
    />
  );
}

export default function GeneralArticleEditorPage(props: {
  kind: string;
  articleId?: number;
  afterSubmit?: (article: GeneralArticle) => void;
  afterDelete?: (article: GeneralArticle) => void;
}) {
  /**
   * kind만 존재하는 경우는 게시글을 생성하는 경우이고,
   * kind와 articleId가 동시에 존재하는 경우는 게시글을 수정하는 경우이다.
   */
  const { kind, articleId } = props;

  /**
   * 로그인한 사용자 정보 확인
   */
  const { loginUser: user } = useLoginState();
  if (!user) {
    throw new Error("로그인한 사용자 정보가 없습니다.");
  }

  /**
   * Article Editor에서 사용할 데이터를 관리하는 상태들
   */
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [createdBy, setCreatedBy] = useState(user.name);
  const [published, setPublished] = useState(true);

  /**
   * articleId가 존재하는 경우에 게시글을 불러온다.
   */
  useEffect(() => {
    if (!articleId) return;

    (async function () {
      try {
        const article = await getGeneralArticle(articleId);
        const attachmentFiles = await getAttachmentFileList(article);
        setTitle(article.title);
        setBody(article.contents);
        setAttachments(attachmentFiles.map((file) => ({ name: file.name, file })));
        setCreatedAt(article.createdAt);
        setCreatedBy(article.createdBy);
        setPublished(article.published);
      } catch (err) {
        window.alert("게시글을 불러오는 중에 오류가 발생했습니다.");
      }
    })();
  }, [articleId]);

  const submit = async (): Promise<GeneralArticle> => {
    // 첨부 파일을 업로드한다.
    const attachmentIds: number[] = [];
    for (const att of attachments) {
      if (att.file instanceof File) {
        // File 객체인 경우에만 업로드를 수행한다.
        const formData = new FormData();
        formData.set("file", att.file);
        const attachmentFile = await uploadAttachmentFile(formData);
        attachmentIds.push(attachmentFile.id);
      } else {
        // AttachmentFile 객체인 경우에는 이미 업로드된 파일이므로 무시한다.
        attachmentIds.push(att.file.id);
      }
    }

    // 게시글을 생성 또는 수정한다.
    const articleEntity = await postGeneralArticle({
      id: articleId,
      title: title,
      contents: body,
      kind: kind,
      attachmentIds,
      createdAt: createdAt,
      createdBy: createdBy,
      published: published,
    });

    return articleEntity;
  };

  return (
    <form>
      <h2 className="font-bold text-xl mb-4">
        {kind && articleId
          ? `게시글 수정 (kind: ${kind}, articleId: ${articleId})`
          : `게시글 생성 (kind: ${kind})`}
      </h2>

      {/* 제목 필드 */}
      <Label>제목</Label>
      <Input id="text" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      {/* 본문 필드 */}
      <Label>본문</Label>
      <CKEditor
        editor={Editor}
        data={body}
        onChange={(e, editor) => {
          const data = editor.getData();
          setBody(data);
        }}
      />

      {/* 첨부 파일 필드 */}
      <Label>첨부 파일</Label>
      <div className="mb-2">
        {attachments.map((att, idx) => (
          <div className="flex items-center" key={att.name}>
            {idx === 0 ? (
              <svg
                className="w-4 h-4 mr-1 fill-yellow-500"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
            ) : null}
            <span className="mr-2 text-sm">{att.name}</span>
            <button
              className="w-6 h-6 p-1 ml-1 hover:bg-gray-200 transition"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                if (idx === 0) return;
                const newatt = [...attachments];
                [newatt[idx - 1], newatt[idx]] = [newatt[idx], newatt[idx - 1]];
                setAttachments(newatt);
              }}
            >
              <span className="sr-only">첨부파일 순서 올리기</span>
              <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <path d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z"></path>
              </svg>
            </button>
            <button
              className="w-6 h-6 p-1 ml-1 hover:bg-gray-200 transition"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                if (idx === attachments.length - 1) return;
                const newatt = [...attachments];
                [newatt[idx], newatt[idx + 1]] = [newatt[idx + 1], newatt[idx]];
                setAttachments(newatt);
              }}
            >
              <span className="sr-only">첨부파일 순서 내리기</span>
              <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8z"></path>
              </svg>
            </button>
            <button
              className="w-6 h-6 p-1 ml-1 hover:bg-gray-200 transition fill-red-700"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm(`정말로 "${att.name}"을 삭제하시겠습니까?`) === false) return;
                const newatt = [...attachments];
                newatt.splice(idx, 1);
                setAttachments(newatt);
              }}
            >
              <span className="sr-only">첨부파일 삭제</span>
              <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
      <label className="btn btn-sm btn-secondary" htmlFor="file">
        업로드할 파일 추가
      </label>
      <Input
        id="file"
        type="file"
        multiple
        hidden
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            const newatt = Array.from(files).map((file) => ({ name: file.name, file }));
            setAttachments([...attachments, ...newatt]);
          }
        }}
      />

      {/* 작성자, 작성일자 필드 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label>작성자</Label>
          <Input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} />
        </div>
        <div>
          <Label>작성 일자</Label>
          <Input
            type="datetime-local"
            value={new Date(createdAt.getTime() - createdAt.getTimezoneOffset() * 60 * 1000)
              .toISOString()
              .slice(0, 16)}
            onChange={(e) => setCreatedAt(new Date(e.target.value))}
          />
        </div>
      </div>

      {/* 게시 여부 필드 */}
      <div className="flex items-center mb-4">
        <input
          id="published"
          type="checkbox"
          className="mr-1"
          checked={published}
          onChange={() => setPublished(!published)}
        />
        <label htmlFor="published">게시글 공개</label>
      </div>

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
        className="btn btn-primary"
      >
        작성
      </button>

      {/* 게시글 삭제 버튼 */}
      {articleId ? (
        <button
          onClick={async (e) => {
            e.preventDefault();
            if (window.confirm("정말로 게시글을 삭제하시겠습니까?") === false) return;
            try {
              const deletedArticle = await deleteGeneralArticle(articleId);
              window.alert("게시글이 성공적으로 삭제되었습니다.");
              props.afterDelete && props.afterDelete(deletedArticle);
            } catch (err) {
              window.alert("게시글 삭제 중에 오류가 발생했습니다.");
            }
          }}
          className="btn btn-danger ml-2"
        >
          삭제
        </button>
      ) : null}
    </form>
  );
}
