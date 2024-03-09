"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Container from "@components/container";
import { useSlideAnimation } from "@components/slide-animation";
import { FormalHeader2 } from "@components/typography";
import { getPageCoverImage } from "@resources/images/page-covers";
import { NavigationItem, getNavigationList, getTitleFromPathname } from "@/navigation";
import { useTranslation } from "react-i18next";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const navigationList = getNavigationList({ langPrefix: i18n.language });
  const pathname = usePathname();
  const [title, subTitle] = getTitleFromPathname(pathname);
  const coverImage = getPageCoverImage(title);

  return (
    <>
      <header className="relative h-48 md:h-72 border-b">
        <Image
          className="w-full h-full object-cover"
          src={coverImage}
          alt="Page Cover Image"
          height={288}
        />
        <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full text-white bg-uos-gray/50">
          <h1 className="font-bold text-4xl md:text-6xl">{t(title)}</h1>
        </div>
      </header>
      <Container className="flex mt-8">
        <nav className="hidden md:block w-[244px] flex-none mr-8 border rounded-md divide-y">
          {navigationList.map((item) => (
            <NavAccordionItem item={item} key={item.href} />
          ))}
        </nav>
        <main className="flex-1">
          <FormalHeader2 className="mb-4 flex items-center">
            {t(title)}
            <span className="w-6 mx-1">
              <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
              </svg>
            </span>
            {t(subTitle)}
          </FormalHeader2>
          {children}
        </main>
      </Container>
    </>
  );
}

function NavAccordionItem(props: { item: NavigationItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnimation = useSlideAnimation(0);
  const { t } = useTranslation();
  const pathname = usePathname();

  const isMainNavActive = pathname.startsWith(props.item.href);
  useEffect(() => {
    setIsOpen(isMainNavActive);
  }, [pathname]);
  slideAnimation.toggle(isOpen);

  return (
    <ul>
      <li className={isOpen ? "border-b" : ""}>
        <button
          className="w-full text-left p-3 flex items-center"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 mr-2">
            {isOpen ? (
              // 위쪽 화살표 아이콘
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
              </svg>
            ) : (
              // 아래쪽 화살표 아이콘
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
              </svg>
            )}
          </div>
          <span className="font-medium">{t(props.item.text)}</span>
        </button>
      </li>
      <li
        className="h-0 overflow-hidden bg-uos-gray-mist/40"
        ref={(ref) => slideAnimation.setTarget(ref)}
      >
        <ul className="px-6 py-2">
          {props.item.subNav &&
            props.item.subNav.map((subItem) => (
              <li
                className={`py-1 ${
                  isMainNavActive && pathname.startsWith(subItem.href)
                    ? "text-uos-signiture-blue font-semibold"
                    : ""
                }`}
                key={subItem.href}
              >
                <Link className="block w-full hover:underline" href={subItem.href}>
                  {t(subItem.text)}
                </Link>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
}
