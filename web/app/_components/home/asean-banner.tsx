"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import aseanBannerImg from "@resources/images/asean-map.svg";
import smartCityImg from "@resources/images/smart-city-1.png";
import { aseanFlags } from "@resources/images/asean-flags";

type AseanBannerLinkProps = {
  top: number;
  left: number;
  title: string;
  description: string;
  href: string;
};

function AseanBannerLink(props: AseanBannerLinkProps) {
  const { top, left, title, description, href } = props;
  const flagImage = aseanFlags[title.toLowerCase()];

  return (
    <Link
      className="flex static md:absolute transition shadow-sm text-left min-w-max rounded border-2 px-2 py-1 z-10 bg-white hover:shadow-lg hover:border-uos-emerald-soft hover:cursor-pointer active:shadow-none"
      href={href}
      style={{
        top,
        left,
      }}
    >
      <div className="mr-2 my-auto">
        <Image
          src={flagImage}
          alt={title}
          className="rounded-full border border-yellow-500 w-10 md:w-12"
          width="48"
        />
      </div>
      <div className="min-w-0">
        <div className="text-uos-emerald-light font-medium text-sm">
          {title}
        </div>
        <div className="text-xs font-light tracking-tighter whitespace-pre-wrap">
          {description}
        </div>
      </div>
    </Link>
  );
}

export default function AseanBanner(props: {
  className?: string;
  linkProps?: AseanBannerLinkProps[];
}) {
  const { linkProps } = props;
  const aseanBanner = useRef<HTMLDivElement>(null);

  const setScrollCenter = (elem: HTMLElement) => {
    elem.scrollLeft = (elem.scrollWidth - elem.clientWidth) / 2;
  };

  useEffect(() => {
    // overflow가 일어났을 때 스크롤을 중앙으로 이동
    window.addEventListener("resize", () => {
      if (aseanBanner.current) {
        setScrollCenter(aseanBanner.current);
      }
    });
    if (aseanBanner.current) {
      setScrollCenter(aseanBanner.current);
    }
  });

  return (
    <div className="relative overflow-x-auto md:-mt-8" ref={aseanBanner}>
      <Image
        src={aseanBannerImg}
        alt="ASEAN map"
        width={1080}
        height={-1}
        className="hidden md:block top-0 left-0 pointer-events-none select-none max-w-none"
      />
      <div className="grid grid-cols-2 gap-2 p-2 md:block">
        {linkProps?.map((props, idx) => (
          <AseanBannerLink key={idx} {...props} />
        ))}
      </div>
      <Image
        src={smartCityImg}
        alt="Smart City"
        width={640}
        height={-1}
        className="absolute right-0 bottom-0 block md:hidden blur-3xl md:blur-none lg:block lg:w-1/3 xl:w-5/12 transition-all pointer-events-none select-none"
      />
    </div>
  );
}
