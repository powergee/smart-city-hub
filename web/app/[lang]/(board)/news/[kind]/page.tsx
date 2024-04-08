import { repo } from "@/di";
import { redirect } from "next/navigation";
import { GeneralArticleTable, Pagination } from "@components/general-article-view";
import { SecretLink } from "@components/secret-components";

const availableKinds = ["notices", "smart-news", "research", "seminar"];

export default async function NewsPage(props: {
  params: { kind: string };
  searchParams?: { page?: string };
}) {
  const { kind } = props.params;
  if (!availableKinds.includes(kind)) {
    redirect("/not-found");
  }

  const totalCount = await repo.generalArticle.getCountByKind(kind);
  const perPage = 15;
  const page = parseInt(props.searchParams?.page || "1");

  const articles = await repo.generalArticle.getList(page, perPage, {
    kindRegex: kind,
  });

  return (
    <div>
      <p>총 {totalCount}개의 게시글이 있습니다.</p>
      <GeneralArticleTable
        className="w-full mt-4"
        articles={articles.map((article, idx) => ({
          index: totalCount - (idx + perPage * (page - 1)),
          title: article.title,
          href: `/news/${kind}/${article.id}`,
          createdAt: article.createdAt?.toLocaleDateString() || "",
          viewCount: article.views || -1,
        }))}
      />
      <div className="flex justify-center mt-4">
        <Pagination
          count={7}
          maxCount={Math.ceil(totalCount / perPage)}
          current={page}
          hrefBuilder={(num) => `?page=${num}`}
        />
      </div>
      <SecretLink className="mt-2 btn btn-primary" href={`/news/${kind}/editor`}>
        새 게시글 작성
      </SecretLink>
    </div>
  );
}
