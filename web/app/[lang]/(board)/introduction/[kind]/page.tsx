import { Locale } from "core/model";
import { repo } from "@/di";
import { SecretLink } from "@components/secret-components";

export default async function IntroductionPage(props: { params: { lang: Locale; kind: string } }) {
  const { lang, kind } = props.params;
  const article = await repo.primaryArticle.pickLocale(lang).get(kind);

  return (
    <>
      <article
        className="ck ck-content mt-2 p-2"
        role="article"
        dangerouslySetInnerHTML={{ __html: article.contents }}
      ></article>
      <SecretLink className="btn btn-primary" href={`/introduction/${kind}/editor`}>
        내용 수정
      </SecretLink>
    </>
  );
}
