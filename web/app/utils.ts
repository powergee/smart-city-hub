import { GeneralArticle, GeneralArticleMeta } from "core/model";

export function getArticleThumbnailHref(
  article: GeneralArticle | GeneralArticleMeta,
  type: "img" | "pdf"
): string {
  const BASE_URL = "https://global.urbanscience.uos.ac.kr";

  switch (type) {
    case "img":
      return `${BASE_URL}/v1/articles/thumbnail/${article.id}`;
    case "pdf":
      return `${BASE_URL}/v1/files/pdf-preview/${article.files[0]}`;
  }
}
