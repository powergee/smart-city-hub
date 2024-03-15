import { GeneralArticleView } from "@components/general-article-view";
import { repo } from "repository";

export default async function PublishArticleView(props: { params: { id: string } }) {
  const article = await repo.generalArticle.getById(parseInt(props.params.id));

  return (
    <GeneralArticleView
      id={article.id || -1}
      title={article.title}
      contents={article.contents}
      createdAt={article.createdAt?.toLocaleDateString() || ""}
      viewCount={article.views || -1}
    />
  );
}
