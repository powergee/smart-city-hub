"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { locales } from "core/model";

function removePrefixes(str: string, prefixes: string[]) {
  for (const prefix of prefixes) {
    if (str.startsWith(prefix)) {
      return str.substring(prefix.length);
    }
  }
  return str;
}

export default function LanguageChanger(props: {
  lang: string;
  component: React.ReactElement;
}) {
  const router = useRouter();
  const currentPathname = usePathname();

  const setLocaleCookie = (newLocale: string) => {
    // set cookie for next-i18n-router
    const expires = new Date();
    expires.setTime(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires.toUTCString()};path=/`;

    // refresh current page(automatically redirect to new locale page)
    const targetPath = removePrefixes(
      currentPathname,
      locales.map((lang) => `/${lang}`)
    );
    router.push(targetPath + "/");
    router.refresh();
  };

  const component = React.cloneElement(props.component, {
    onClick: () => setLocaleCookie(props.lang),
  });

  return component;
}
