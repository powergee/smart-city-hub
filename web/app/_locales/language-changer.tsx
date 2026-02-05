"use client";

import { locales } from "core/model";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

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
  preserveUrl?: boolean;
}) {
  const router = useRouter();
  const currentPathname = usePathname();

  const setLocaleCookie = (newLocale: string) => {
    // set cookie for next-i18n-router
    const expires = new Date();
    expires.setTime(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires.toUTCString()};path=/`;
  };

  const component = React.cloneElement(props.component as React.ReactElement<any>, {
    onClick: (e: any) => {
      e.preventDefault();
      setLocaleCookie(props.lang);

      let targetPath = "/";
      if (props.preserveUrl) {
        // TODO: Query String 보존되도록 수정
        targetPath = removePrefixes(
          currentPathname,
          locales.map((lang) => `/${lang}`)
        );
      }
      // refresh current page(automatically redirect to new locale page)
      router.push(targetPath);
      router.refresh();
    },
  });

  return component;
}
