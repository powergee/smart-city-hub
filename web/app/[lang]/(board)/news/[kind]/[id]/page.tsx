import { GeneralArticleView } from "@components/general-article-view";
import { getGeneralArticle, getAttachmentFileList } from "@/actions";
import { SecretLink } from "@components/secret-components";

export default async function NewsArticlePage(props: { params: { kind: string; id: string } }) {
  const { kind, id } = props.params;
  const article = await getGeneralArticle(parseInt(props.params.id));
  const attachments = await getAttachmentFileList(article);

  return (
    <>
      <GeneralArticleView
        id={article.id}
        title={article.title}
        contents={article.contents}
        createdAt={article.createdAt.toLocaleDateString()}
        viewCount={article.views}
        attachments={attachments.map(({ name, href }) => ({ name, href }))}
      />
      <SecretLink className="mt-2 btn btn-primary" href={`/news/${kind}/${id}/editor`}>
        이 게시글 수정
      </SecretLink>
    </>
  );
}
