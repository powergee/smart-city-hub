import { locales } from "core/model";

export type NavigationItem = {
  text: string;
  href: string;
  subNav?: NavigationItem[];
};

const navigationList: NavigationItem[] = [
  {
    text: "소개",
    href: "/introduction",
    subNav: [
      { text: "인사말", href: "/introduction/greeting" },
      { text: "설립배경 및 목적", href: "/introduction/goal" },
      { text: "연구진", href: "/introduction/researchers" },
    ],
  },
  {
    text: "연구 & 사업",
    href: "/projects",
    subNav: [
      { text: "총괄 연구 & 사업", href: "/projects/summary" },
      { text: "인문사회연구소", href: "/projects/withhs" },
      { text: "스마트재난안전", href: "/projects/smtdstpre" },
      { text: "기타", href: "/projects/etc" },
    ],
  },
  {
    text: "발간물",
    href: "/publish",
    subNav: [
      { text: "Issue Paper", href: "/publish/issue-paper" },
      { text: "아카이브", href: "/publish/archive" },
    ],
  },
  {
    text: "소식",
    href: "/news",
    subNav: [
      { text: "공지사항", href: "/news/notices" },
      { text: "스마트 뉴스", href: "/news/smart-news" },
      { text: "연구실적", href: "/news/research" },
      { text: "세미나", href: "/news/seminar" },
    ],
  },
  {
    text: "스마트도시수출 거점HUB",
    href: "/hub",
    subNav: [
      { text: "거점HUB", href: "/hub" },
      { text: "스마트도시 솔루션", href: "/solution" },
      { text: "아세안 국가 정보", href: "/asean" },
    ],
  },
];

export function getNavigationList(options?: {
  langPrefix?: string;
  rootUrl?: string;
}): NavigationItem[] {
  let { rootUrl = "", langPrefix: lang } = options || {};
  if (lang === "ko") lang = undefined;

  const prefix = rootUrl + (lang ? `/${lang}` : "");

  return navigationList.map((item) => ({
    text: item.text,
    href: `${prefix}${item.href}`,
    subNav: item.subNav
      ? item.subNav.map((subItem) => ({
          text: subItem.text,
          href: `${prefix}${subItem.href}`,
        }))
      : undefined,
  }));
}

// href to text map
const navigationHrefMap = navigationList.reduce((acc, item) => {
  acc[item.href] = [item.text];

  if (item.subNav) {
    item.subNav.forEach((subItem) => {
      acc[subItem.href] = [item.text, subItem.text];
    });
  }
  return acc;
}, {} as Record<string, string[]>);

export function getTitleFromPathname(pathname: string): string[] {
  for (const lang of locales) {
    if (pathname.startsWith(`/${lang}`)) {
      pathname = pathname.slice(1 + lang.length);
      break;
    }
  }
  return navigationHrefMap[pathname] || "";
}
