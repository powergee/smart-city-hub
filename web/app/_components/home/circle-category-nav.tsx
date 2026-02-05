import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type CircleCategoryNavLinkProps = {
  title: string;
  href: string;
  imgSrc: StaticImageData;
  className?: string;
};

function CircleCategoryNavLink(props: CircleCategoryNavLinkProps) {
  const { title, href, imgSrc, className } = props;
  return (
    <Link className={`group ${className ?? ""}`} href={href}>
      <div className="relative overflow-hidden rounded-full aspect-square w-full border-2 border-white shadow-xl transition-transform duration-300 group-hover:scale-105">
        <Image
          className="object-cover object-center w-full h-full brightness-75 group-hover:brightness-100 transition-all duration-300 group-hover:scale-110"
          src={imgSrc}
          alt={title}
          fill
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span className="text-white font-bold text-lg md:text-xl lg:text-2xl drop-shadow-lg text-center break-keep">
            {title}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CircleCategoryNav(props: {
  linkProps: CircleCategoryNavLinkProps[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 lg:gap-16 ${props.className ?? ""}`}
    >
      {props.linkProps.map((props, idx) => {
        return <CircleCategoryNavLink key={idx} {...props} />;
      })}
    </div>
  );
}
