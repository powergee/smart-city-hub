import { locales } from "core/model";

export type NavigationItem = {
  readonly text: string;
  readonly href: string;
  readonly subNav?: NavigationItem[];
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
    text: "프로젝트",
    href: "/projects",
    subNav: [
      { text: "총괄 연구 & 사업", href: "/projects/summary" },
      { text: "인문사회연구소", href: "/projects/withhs" },
      { text: "스마트재난안전", href: "/projects/smtdstpre" },
      { text: "UBC", href: "https://ubc.urbanscience.uos.ac.kr/" },
      { text: "CRMT", href: "https://crmt.urbanscience.uos.ac.kr/" },
      { text: "기타", href: "/projects/etc" },
    ],
  },
  {
    text: "국가·기술협력",
    href: "/hub",
    subNav: [
      { text: "아세안 국가 정보", href: "/asean" },
      { text: "스마트 인프라·환경", href: "/hub/categories/0/0/0" },
      { text: "스마트 경제·산업", href: "/hub/categories/1/6/0" },
      { text: "스마트 안전·행정", href: "/hub/categories/2/13/0" },
      { text: "스마트 생활·복지", href: "/hub/categories/3/17/0" },
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
];

export function getNavigationList(options?: {
  langPrefix?: string; // 언어 접두사 (예: 'en', 'ko')
  rootUrl?: string; // 루트 URL (예: 'https://example.com')
}): NavigationItem[] {
  // 옵션 기본값 설정
  const rootUrl = options?.rootUrl || "";
  let lang = options?.langPrefix;

  const getPrefixedUrl = (url: string) => {
    // 외부 링크인 경우 접두사 없음
    if (url.startsWith("http")) {
      return url;
    }

    // 한국어인 경우 접두사 없음
    if (lang === "ko") {
      return url;
    }

    // 외부 링크가 아니고 한국어가 아닌 경우 언어 접두사 추가
    return `/${lang}${url}`;
  };

  // 네비게이션 목록의 각 항목에 접두사 추가
  return navigationList.map((item) => {
    // 메인 항목 URL에 접두사 추가
    const mainItem = {
      text: item.text,
      href: getPrefixedUrl(item.href),
    };

    // 서브 네비게이션이 있는 경우 처리
    if (item.subNav) {
      return {
        ...mainItem,
        subNav: item.subNav.map((subItem) => ({
          text: subItem.text,
          href: getPrefixedUrl(subItem.href),
        })),
      };
    }

    // 서브 네비게이션이 없는 경우
    return mainItem;
  });
}

export function getTitleFromPathname(pathname: string): string[] {
  // 1. 언어 코드 제거
  for (const lang of locales) {
    const localePrefix = `/${lang}`;
    if (pathname.startsWith(localePrefix)) {
      pathname = pathname.slice(localePrefix.length);
      break;
    }
  }

  // 2. 얕은 경로를 따라 탐색하면서 매칭되는 타이틀을 찾아 배열에 추가
  const title: string[] = [];
  const pathEntries = pathname.split("/");

  for (let i = 1, subItem = navigationList; i < pathEntries.length; i++) {
    const path = pathEntries.slice(0, i + 1).join("/");
    const item = subItem.find((k) => k.href == path);

    if (!item) break;
    title.push(item.text);
    subItem = item.subNav || [];
  }
  return title;
}
