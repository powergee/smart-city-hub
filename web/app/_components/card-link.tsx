import Link from "next/link";

export default function CardLink(props: {
  href: string;
  imgSrc: string;
  imgHeight?: string | number;
  title: string;
  meta?: string;
}) {
  return (
    <Link className="group" href={props.href}>
      <div className="overflow-hidden border rounded-md" style={{ height: props.imgHeight }}>
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition"
          src={props.imgSrc}
          alt={props.title}
          loading="lazy"
        />
      </div>
      <div className="mt-2 font-medium break-keep group-hover:underline">{props.title}</div>
      {props.meta && <div className="mt-1 text-sm text-gray-500">{props.meta}</div>}
    </Link>
  );
}
