import { GeneralArticle, GeneralArticleMeta, AuthTokenGetter, AuthTokenSetter } from "core/model";
import { cookies } from "next/headers";

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

const ACCESS_TOKEN_COOKIE_NAME = "ACCESS_TOKEN";

export const getAccessToken: AuthTokenGetter = () => {
  const token = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  return token || null;
};

export const setAccessToken: AuthTokenSetter = (token: string) => {
  cookies().set(ACCESS_TOKEN_COOKIE_NAME, token, { httpOnly: true });
};
