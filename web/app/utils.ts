import { AuthTokenGetter, AuthTokenSetter } from "core/model";
import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE_NAME = "ACCESS_TOKEN";

export const getAccessToken: AuthTokenGetter = () => {
  const token = cookies().get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  return token || null;
};

export const setAccessToken: AuthTokenSetter = (token: string | null) => {
  if (token) {
    cookies().set(ACCESS_TOKEN_COOKIE_NAME, token, { httpOnly: true });
  } else {
    cookies().delete(ACCESS_TOKEN_COOKIE_NAME);
  }
};
