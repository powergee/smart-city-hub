import { repo, util } from "@/di";
import CardLink from "@components/card-link";
import { redirect } from "next/navigation";
import { Pagination } from "@components/general-article-view";
import { SecretLink } from "@components/secret-components";

const availableKinds = ["archive", "issue-paper"];

export default async function PublishPage(props: {
  params: { kind: string };
  searchParams?: { page?: string };
}) {
  const { kind } = props.params;
  if (!availableKinds.includes(kind)) {
    redirect("/not-found");
  }

  const totalCount = await repo.generalArticle.getCountByKind(kind);
  const perPage = 6;
  const page = parseInt(props.searchParams?.page || "1");

  const articles = await repo.generalArticle.getList(page, perPage, {
    kindRegex: kind,
  });

  return (
    <div>
      <p>총 {totalCount}개의 게시글이 있습니다.</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 my-4">
        {articles.map((article) => (
          <CardLink
            href={`/publish/${kind}/${article.id}`}
            imgSrc={util.getArticleThumbnailHref(article.id, "pdf")}
            title={article.title}
            key={article.id}
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
      <SecretLink className="mt-2 btn btn-primary" href={`/publish/${kind}/editor`}>
        새 게시글 작성
      </SecretLink>
    </div>
  );
}
