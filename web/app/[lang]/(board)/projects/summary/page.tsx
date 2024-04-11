import { Locale } from "core/model";
import { repo } from "@/di";
import { initTranslation } from "@locales";
import { SecretLink } from "@components/secret-components";

export default async function ProjectSummaryPage(props: {
  params: { lang: Locale };
  searchParams: { sort: string };
}) {
  const projects = await repo.projectRecord.pickLocale(props.params.lang).getItemList();
  const { t } = await initTranslation(props.params.lang);

  const { sort } = props.searchParams;
  if (sort) {
    sort === "desc" && projects.reverse();
  } else {
    projects.reverse();
  }

  return (
    <>
      <article>
        <table>
          <colgroup>
            <col width="10%"></col>
            <col width="20%"></col>
            <col width="70%"></col>
          </colgroup>
          <thead>
            <tr className="[&>th]:p-2 [&>th]:border-y [&>th]:font-medium [&>th]:bg-global-gray-soft">
              <th>{t("기간")}</th>
              <th>{t("발주처")}</th>
              <th>{t("사업명")}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((item) => (
              <tr className="[&>td]:p-2 [&>td]:border-y" key={item.title}>
                <td>
                  {item.year[0]}
                  {item.year[1] && "~" + item.year[1]}
                </td>
                <td>{item.client}</td>
                <td className={item.isPrimary ? "font-bold" : ""}>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <SecretLink className="btn btn-primary mt-4" href="/projects/summary/editor">
        내용 수정
      </SecretLink>
    </>
  );
}
