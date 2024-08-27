import Link from "next/link";
import Image from "next/image";
import * as cheerio from "cheerio";

import { Locale } from "core/model";
import { repo } from "@/di";
import { SecretLink } from "@components/secret-components";
import { aseanFlags } from "@resources/images/asean-flags";

import { initTranslation } from "@locales";

export default async function AseanPage(props: { params: { lang: Locale; country: string } }) {
  const { lang, country } = props.params;
  const { t } = await initTranslation(lang);
  const article = await repo.primaryArticle.pickLocale(lang).get(`asean-${country}`);

  const $ = cheerio.load(article.contents, {}, false);
  const tocItems: { id: string; text: string }[] = [];

  $("h2, .pa-main-header").each((idx, elem) => {
    const id = `section${idx + 1}`;
    $(elem).attr("id", id);

    tocItems.push({
      id,
      text: $(elem).text(),
    });
  });

  return (
    <>
      <div className="lg:flex">
        <aside>
          <ul className="sticky top-32 left-0 w-full lg:w-72 mr-8 mb-8 border rounded-md divide-y">
            <li className="flex items-center font-semibold p-3 bg-slate-50">
              <Image
                src={aseanFlags[country]}
                alt="country flag"
                width={32}
                height={32}
                className="rounded-full border w-8 mr-2"
              />
              {t(country)}
            </li>
            {tocItems.map((item) => (
              <li className="flex items-center w-full text-left font-medium p-3" key={item.id}>
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                  <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"></path>
                </svg>
                <Link className="hover:underline" href={`#${item.id}`}>
                  {item.text}
                </Link>
              </li>
            ))}
            <li className="p-2">
              <SecretLink className="btn btn-primary" href={`/asean/${country}/editor`}>
                내용 수정
              </SecretLink>
            </li>
          </ul>
        </aside>
        <article
          className="flex-1 ck ck-content"
          role="article"
          dangerouslySetInnerHTML={{ __html: $.html() }}
        ></article>
      </div>
    </>
  );
}
