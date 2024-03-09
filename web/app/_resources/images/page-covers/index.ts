import { StaticImageData } from "next/image";

import introductionCover from "./introduction.png";
import publishCover from "./publish.jpeg";
import projectsCover from "./projects.jpeg";
import newsCover from "./news.jpeg";

export function getPageCoverImage(title: string): StaticImageData {
  switch (title) {
    case "소개":
      return introductionCover;
    case "연구 & 사업":
      return projectsCover;
    case "발간물":
      return publishCover;
    case "소식":
      return newsCover;
    default:
      return introductionCover;
  }
}
