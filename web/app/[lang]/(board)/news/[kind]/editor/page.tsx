"use client";

import React from "react";
import dynamic from "next/dynamic";

const GeneralArticleEditor = dynamic(() => import("@components/general-article-editor"), {
  ssr: false,
});

export default function Page() {
  return <GeneralArticleEditor />;
}
