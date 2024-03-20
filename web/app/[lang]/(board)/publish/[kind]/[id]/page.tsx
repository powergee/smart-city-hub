import { GeneralArticleView } from "@components/general-article-view";
import { repo } from "@/di";

export default async function PublishArticleView(props: { params: { id: string } }) {
  const article = await repo.generalArticle.getById(parseInt(props.params.id));
  const attachments = await Promise.all(
    article.files.map((file) => repo.attachmentFile.getInfo(file))
  );

  return (
    <GeneralArticleView
      id={article.id || -1}
      title={article.title}
      contents={article.contents}
      createdAt={article.createdAt?.toLocaleDateString() || ""}
      viewCount={article.views || -1}
      attachments={attachments.map((att) => ({ name: att.name, href: att.href! }))}
    />
  );
}
