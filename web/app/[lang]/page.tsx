import { Locale } from "core/model";
import { repo } from "repository";

import AseanBanner from "@components/home/asean-banner";

export default async function Home(props: { params: { lang: string } }) {
  const lang = props.params.lang;

  return (
    <div className="max-w-screen-2xl mx-auto">
      <AseanBanner
        linkProps={repo.aseanBanner
          .getItemAll(lang as Locale)
          .map((item, idx) => ({
            top: item.buttonPosition[1],
            left: item.buttonPosition[0],
            title: item.countryName.toUpperCase(),
            description: item.description.join("\n"),
            // href: `/asean/${item.country.nameEng}`,
            href: `https://global.urbanscience.uos.ac.kr/asean/${idx}`,
          }))}
      />
    </div>
  );
}
