import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type SolutionBannerLinkProps = {
  title: string;
  href: string;
  imgSrc: StaticImageData;
  className?: string;
};

function SolutionBannerLink(props: SolutionBannerLinkProps) {
  const { title, href, imgSrc, className } = props;
  return (
    <Link className={className ?? ""} href={href}>
      <div className="relative overflow-hidden rounded-sm border-1 h-16 shadow-sm transition hover:scale-110">
        <Image
          className="object-cover object-center select-none w-full h-16 pointer-events-none"
          height={96}
          src={imgSrc}
          alt={title}
        />
        <div className="absolute w-full left-0 top-0 h-full transition bg-black/40 hover:backdrop-blur-sm" />
        <div className="absolute w-full left-1/2 top-1/2 p-1 -translate-x-1/2 -translate-y-1/2 text-center text-white pointer-events-none">
          <div className="text-base font-medium">{title}</div>
        </div>
      </div>
    </Link>
  );
}

export default function SolutionBanner(props: {
  linkProps: SolutionBannerLinkProps[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-4 ${
        props.className ?? ""
      }`}
    >
      {props.linkProps.map((props, idx) => {
        return <SolutionBannerLink key={idx} {...props} />;
      })}
    </div>
  );
}
