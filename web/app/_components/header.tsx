import Link from "next/link";
import Image from "next/image";
import { initTranslation, Translate } from "@locales";
import LanguageChanger from "@components/language-changer";

import logoImage from "@resources/images/logo.png";

function ThinHeader(props: { t: Translate }) {
  const { t } = props;

  return (
    <div className="flex justify-end max-w-screen-2xl -mb-4 pt-1 lg:w-10/12 lg:mx-auto">
      <a
        className="font-normal text-sm mr-4 py-1"
        href="https://uos.ac.kr/main.do"
      >
        {t("서울시립대학교")}
      </a>
      <LanguageChanger
        lang="ko"
        component={
          <button className="font-normal text-sm mr-2 py-1">KOR</button>
        }
      />
      <LanguageChanger
        lang="en"
        component={
          <button className="font-normal text-sm mr-4 py-1">ENG</button>
        }
      />
      <button className="bg-uos-signiture-blue text-white font-normal text-sm px-4 py-1">
        {t("로그인")}
      </button>
    </div>
  );
}

function NavigationBar(props: { t: Translate }) {
  const { t } = props;

  const NavLinkSeperator = () => (
    <span className="my-auto select-none text-slate-500 xl:px-8">·</span>
  );
  const NavLink = (props: { href: string; children: any }) => {
    const { href, children } = props;
    return (
      <Link href={href} className="font-medium text-lg my-auto">
        {children}
      </Link>
    );
  };

  return (
    <nav className="flex max-w-screen-2xl mx-4 lg:w-10/12 lg:mx-auto">
      <div className="flex-none">
        <Link href="/">
          <Image
            src={logoImage}
            alt="Global Urban & Infrastructure Research Center"
            width={224}
            height={224}
          />
        </Link>
      </div>
      <div className="w-full pt-4 hidden md:flex md:justify-evenly xl:justify-end">
        <NavLink href="/introduction">{t("소개")}</NavLink>
        <NavLinkSeperator />
        <NavLink href="/project">{t("연구 & 사업")}</NavLink>
        <NavLinkSeperator />
        <NavLink href="/publish">{t("발간물")}</NavLink>
        <NavLinkSeperator />
        <NavLink href="/news">{t("소식")}</NavLink>
        <NavLinkSeperator />
        <NavLink href="/hub">{t("스마트도시수출 거점HUB")}</NavLink>
      </div>
    </nav>
  );
}

export default async function Header(props: { lang: string }) {
  const { t } = await initTranslation(props.lang);

  return (
    <header className="sticky top-0 backdrop-blur-md bg-white/80 border-b border-slate-900/10 pb-2 z-50">
      <ThinHeader t={t} />
      <NavigationBar t={t} />
    </header>
  );
}
