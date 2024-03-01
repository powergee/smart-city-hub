"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import anime from "animejs";

import { getNavigationList } from "@/navigation";
import { Translate, LanguageChanger } from "@locales";
import Container from "@components/container";

import logoImage from "@resources/images/logo.png";

export default function Header(props: { className?: string }) {
  const headerHeight = 96;

  const { t } = useTranslation();
  const slideAnimation = useSlideAnimation(headerHeight);

  const navigationList = getNavigationList({
    rootUrl: "https://global.urbanscience.uos.ac.kr",
  });

  return (
    <header
      className={`overflow-hidden sticky top-0 w-full z-50 backdrop-blur-lg bg-white/85 border-b ${
        props.className ?? ""
      }`}
      style={{
        // anime.js의 애니메이션을 위한 초기 높이 설정
        height: headerHeight,
        minHeight: headerHeight,
      }}
      ref={slideAnimation.targetRef}
      onMouseEnter={() => slideAnimation.forward()}
      onMouseLeave={() => slideAnimation.backward()}
      onFocus={() => slideAnimation.forward()}
    >
      <Container className="relative">
        <ThinHeader className="absolute top-0 w-full" t={t} />
      </Container>
      <Container className="md:flex md:justify-between py-4">
        <div className="flex justify-between shrink-0 md:mr-8">
          <Link href="/">
            <Image
              src={logoImage}
              alt="Global Urban & Infrastructure Research Center"
              height={72}
              className="h-[72px] object-contain object-center pointer-events-none"
            />
          </Link>
          <button
            className="md:hidden mt-4 mx-3"
            type="button"
            onClick={() => slideAnimation.toggle()}
          >
            <HambergerIcon className="block w-8 -mb-2 fill-black hover:fill-uos-gray" />
            <span className="text-xs font-medium">{t("메뉴")}</span>
          </button>
        </div>
        <nav className="mt-4 md:mt-2 md:flex md:w-full 2xl:max-w-screen-lg">
          {navigationList.map((item, idx) => (
            <ul
              key={idx}
              className="text-left mb-4 md:mb-0 md:flex-1 md:text-center break-keep group"
            >
              <li className="mb-2 md:mb-0 md:h-[72px] md:flex md:justify-center md:items-center">
                <Link
                  href={item.href}
                  className="before:content-['❏'] before:mr-1 text-uos-signiture-blue md:before:content-none md:text-black font-medium text-lg leading-tight"
                >
                  {t(item.text)}
                </Link>
              </li>
              <li>
                <ul className="grid grid-cols-3 gap-2 md:grid-cols-1 md:py-6 md:border-t-2 md:border-uos-gray-mist/50 md:group-hover:border-uos-blue">
                  {item.subNav?.map((item, idx) => (
                    <li key={idx}>
                      <Link className="block hover:text-uos-blue hover:underline" href={item.href}>
                        {t(item.text)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </nav>
      </Container>
    </header>
  );
}

function ThinHeader(props: { t: Translate; className?: string }) {
  const { t, className } = props;

  return (
    <div className={`flex justify-end ${className ?? ""}`}>
      <a className="font-normal text-sm mr-4 py-1" href="https://uos.ac.kr/main.do">
        {t("서울시립대학교")}
      </a>
      <LanguageChanger
        lang="ko"
        component={
          <button className="font-normal text-sm mr-2 py-1" type="button">
            KOR
          </button>
        }
      />
      <LanguageChanger
        lang="en"
        component={
          <button className="font-normal text-sm mr-4 py-1" type="button">
            ENG
          </button>
        }
      />
      <button
        className="bg-uos-signiture-blue text-white font-normal text-sm px-4 py-1"
        type="button"
      >
        {t("로그인")}
      </button>
    </div>
  );
}

function useSlideAnimation(initialHeight: number) {
  const targetRef = useRef<HTMLElement | null>(null);
  let reversedState: boolean = true;
  let reverseTarget: boolean = false;
  let animeInstance: anime.AnimeInstance | null = null; // null일 경우, 애니메이션이 끝난 상태를 의미
  let hoverTimer: ReturnType<typeof setTimeout>;

  const createSlideAnimeInstance = (handleComplete?: (anim: anime.AnimeInstance) => void) => {
    if (!targetRef.current) {
      throw new Error("targetRef.current is null");
    }

    const targetHeight = targetRef.current.scrollHeight;

    return anime({
      targets: targetRef.current,
      height: [initialHeight, targetHeight],
      easing: "easeOutCubic",
      duration: 250,
      complete: handleComplete,
      autoplay: false,
    });
  };

  const toggle = (backward?: boolean) => {
    reverseTarget = backward ?? !reversedState;
    if (reverseTarget === reversedState) {
      return; // 애니메이션이 이미 목표 상태에 도달한 경우, 애니메이션 실행하지 않음
    }

    if (animeInstance === null) {
      // 애니메이션이 끝난 상태일 경우, 새로운 애니메이션 인스턴스를 생성
      animeInstance = createSlideAnimeInstance((anim) => {
        reversedState = anim.reversed; // 애니메이션 종료 후의 상태 저장

        if (reversedState === reverseTarget) {
          animeInstance = null; // 애니메이션이 끝난 상태로 변경
        } else {
          anim.reverse();
          anim.restart();
        }
      });

      if (reverseTarget) {
        animeInstance.reverse();
      }
      animeInstance.restart();
    }
  };

  const forward = () => {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      toggle(false);
    }, 100);
  };
  const backward = () => {
    clearTimeout(hoverTimer);
    toggle(true);
  };

  return { targetRef, forward, backward, toggle };
}

const HambergerIcon = (props: { className?: string }) => {
  return (
    <svg viewBox="0 0 32 32" className={props.className ?? ""}>
      <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
    </svg>
  );
};
