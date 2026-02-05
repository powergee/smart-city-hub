import { StaticImageData } from "next/image";

import introductionCover from "./introduction.png";
import newsCover from "./news.jpeg";
import projectsCover from "./projects.jpeg";
import publishCover from "./publish.jpeg";

export function getPageCoverImage(title: string): StaticImageData {
  switch (title) {
    case "소개":
      return introductionCover;
    case "프로젝트":
      return projectsCover;
    case "발간물":
      return publishCover;
    case "소식":
      return newsCover;
    default:
      return introductionCover;
  }
}
