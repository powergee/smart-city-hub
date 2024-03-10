import { repo } from "repository";

export default async function NewsArticlePage(props: { params: { id: string } }) {
  const article = await repo.generalArticle.getById(parseInt(props.params.id));

  return (
    <div>
      <article dangerouslySetInnerHTML={{ __html: article.contents }}></article>
    </div>
  );
}
