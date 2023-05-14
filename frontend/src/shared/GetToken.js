import jwt from "jsonwebtoken";

/**
 * 가능한 형태의 쿠키 객체를 받아, 원하는 이름의 쿠키를 반환한다.
 * 2023.05.15. 추가
 * @param {*} cookies Cookies 객체 또는, 순수 Object
 * @param {*} name 쿠키 이름
 * @returns 쿠키 값
 */
function getCookie(cookies, name) {
  if (cookies instanceof Object === false) {
    throw new Error("cookies is not an object.");
  }

  if (cookies.constructor.name === "Cookies") {
    return cookies.get("access_token");
  }

  return cookies[name];
}

export default function getToken(cookies) {
  try {
    const access_token = getCookie(cookies, "access_token");
    const token = jwt.decode(access_token); // 2023.05.15. 지금 보니까 signature가 없다. 위험하다.

    return token;
  } catch (err) {
    return null;
  }
}
