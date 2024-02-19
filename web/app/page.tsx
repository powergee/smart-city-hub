import AseanBanner from "@components/home/asean-banner";
import { repo } from "repository";

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <AseanBanner
        linkProps={repo.aseanBanner.getItemAll().map((item, idx) => ({
          top: item.buttonPosition[1],
          left: item.buttonPosition[0],
          title: item.country.name,
          description: item.description.join("\n"),
          // href: `/asean/${item.country.nameEng}`,
          href: `https://global.urbanscience.uos.ac.kr/asean/${idx}`,
        }))}
      />
    </div>
  );
}
