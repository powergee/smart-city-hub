import { repo, util } from "@/di";
import CardLink from "@components/card-link";
import { Pagination } from "@components/general-article-view";
import { SecretLink } from "@components/secret-components";

export default async function SeminarListPage(props: { searchParams?: { page?: string } }) {
  const totalCount = await repo.generalArticle.getCountByKind("seminar");
  const perPage = 6;
  const page = parseInt(props.searchParams?.page || "1");

  const articles = await repo.generalArticle.getList(page, perPage, {
    kindRegex: "seminar",
  });

  return (
    <div>
      <p>총 {totalCount}개의 게시글이 있습니다.</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 my-4">
        {articles.map((article) => (
          <CardLink
            href={`/news/seminar/${article.id}`}
            imgSrc={util.getArticleThumbnailHref(article.id, "img")}
            title={article.title}
            key={article.id}
            imgHeight={192}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          count={7}
          maxCount={Math.ceil(totalCount / perPage)}
          current={page}
          hrefBuilder={(num) => `?page=${num}`}
        />
      </div>
      <SecretLink className="mt-2 btn btn-primary" href={`/news/seminar/editor`}>
        새 게시글 작성
      </SecretLink>
    </div>
  );
}
