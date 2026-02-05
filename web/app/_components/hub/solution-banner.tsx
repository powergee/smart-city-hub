import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type SolutionBannerLinkProps = {
  title: string;
  href: string;
  imgSrc: StaticImageData;
  className?: string;
  isActive?: boolean;
};

function SolutionBannerLink(props: SolutionBannerLinkProps) {
  const { title, href, imgSrc, className, isActive } = props;
  return (
    <Link className={className ?? ""} href={href}>
      <div className={`relative overflow-hidden rounded-md border-1 h-16 ${isActive ? "ring-4 ring-uos-blue" : ""}`}>
        <Image
          className={`object-cover object-center select-none w-full h-16 transition ${
            isActive ? "brightness-100 scale-110" : "brightness-50 hover:brightness-75 hover:scale-110"
          }`}
          height={64}
          src={imgSrc}
          alt={title}
        />
        <div className="font-medium drop-shadow-lg break-keep text-center text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {title}
        </div>
      </div>
    </Link>
  );
}

export default function SolutionBanner(props: {
  linkProps: SolutionBannerLinkProps[];
  className?: string;
  type?: "default" | "sidebar";
}) {
  const gridClass = props.type === "sidebar" 
    ? "grid-cols-2 md:grid-cols-1" 
    : "grid-cols-3 md:grid-cols-7";
    
  return (
    <div className={`grid ${gridClass} gap-2 md:gap-3 ${props.className ?? ""}`}>
      {props.linkProps.map((props, idx) => {
        return <SolutionBannerLink key={idx} {...props} />;
      })}
    </div>
  );
}
