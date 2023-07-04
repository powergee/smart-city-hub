import React, { useState, useEffect } from "react";
import "./NavigationBar.scss";
import logo from "../images/hub-logo.png";
import { useHistory, Link } from "react-router-dom";
import getToken from "../shared/GetToken";
import { useCookies } from "react-cookie";
import { tryLogout } from "../shared/BackendRequests";
import { useTranslation } from "react-i18next";
import { updateLocale } from "../shared/LocalStorage";

export default function NavigationBar(props) {
  const { className } = props;
  const history = useHistory();
  const [cookies] = useCookies();
  const token = getToken(cookies);
  const [t, i18n] = useTranslation();
  const [locale, setLocale] = useState();

  function getLinkHandler(url) {
    return () => {
      history.push(url);
    };
  }

  async function logout() {
    await tryLogout();
    alert("로그아웃되었습니다.");
    window.location.reload();
  }

  useEffect(() => {
    if (!locale) {
      setLocale(updateLocale());
    }

    i18n.changeLanguage(updateLocale(locale));
  }, [locale]);

  return (
    <header className={className}>
      <div className="header-slim-background">
        <div className="header-slim">
          <ul className="header-container header-left">
            <li className="header-item">
              <a href="https://uos.ac.kr" className="header-button">
                {t("서울시립대학교")}
              </a>
            </li>
          </ul>
          <ul className="header-container header-right">
            <li className="header-item">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  if (locale === "en-US") {
                    setLocale("ko-KR");
                  } else if (locale == "ko-KR") {
                    setLocale("en-US");
                  }
                }}
              >
                <b>{locale === "en-US" ? "한국어" : "English"}</b>
              </a>
            </li>
            <li className="header-item">
              {token ? (
                <>
                  <span>
                    <strong>{token.userName}</strong>님, 환영합니다!
                  </span>
                  <a href onClick={logout} className="header-button">
                    {t("로그아웃")}
                  </a>
                </>
              ) : (
                <Link to="/login" className="header-button">
                  {t("로그인")}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="header-gnb">
        <a href onClick={getLinkHandler("/")}>
          <img alt="Main Logo" src={logo}></img>
        </a>

        <div className="menu-primary">
          <ul>
            <li>
              <Link to="/introduction" className="menu-small">
                {t("센터소개")}
              </Link>
            </li>
            <li>
              <Link to="/projects" className="menu-small">
                {t("연구 & 사업")}
              </Link>
            </li>
            <li>
              <Link to="/publish/issue-paper" className="menu-small">
                {t("발간물")}
              </Link>
            </li>
            <li>
              <Link to="/news/notices" className="menu-small">
                {t("소식")}
              </Link>
            </li>
            <li>
              <Link to="/community/seminar" className="menu-small">
                {t("커뮤니티")}
              </Link>
            </li>
            <li>
              <Link to="/hub" className="menu-large">
                {t("스마트도시수출 거점HUB")}
              </Link>
            </li>

            <div class="menu-dropdown">
              <ul>
                <li className="menu-small">
                  <a href onClick={getLinkHandler("/introduction/greeting")}>
                    {t("인사말")}
                  </a>
                  <a href onClick={getLinkHandler("/introduction/goal")}>
                    {t("설립배경 및 목적")}
                  </a>
                  <a href onClick={getLinkHandler("/introduction/researchers")}>
                    연구진
                  </a>
                </li>
                <li className="menu-large">
                  <a href onClick={getLinkHandler("/projects/summary")}>
                    총괄 연구 {" & "} 사업
                  </a>
                  <a href onClick={getLinkHandler("/projects/withhs")}>
                    인문사회연구소
                  </a>
                  <a href onClick={getLinkHandler("/projects/smtdstpre")}>
                    스마트재난안전
                  </a>
                  <a href onClick={getLinkHandler("/projects/etc")}>
                    기타
                  </a>
                </li>
                <li className="menu-large">
                  <a href onClick={getLinkHandler("/publish/issue-paper")}>
                    Issue Paper
                  </a>
                  <a href onClick={getLinkHandler("/publish/archive")}>
                    아카이브
                  </a>
                </li>
                <li className="menu-small">
                  <a href onClick={getLinkHandler("/news/notices")}>
                    공지사항
                  </a>
                  <a href onClick={getLinkHandler("/news/smart-news")}>
                    스마트뉴스
                  </a>
                  <a href onClick={getLinkHandler("/news/research")}>
                    연구실적
                  </a>
                </li>
                <li className="menu-small">
                  <a href onClick={getLinkHandler("/community/seminar")}>
                    세미나
                  </a>
                  <a
                    class="font-small"
                    href
                    onClick={getLinkHandler("/community/workshop")}
                  >
                    기관 및 기업 소개
                  </a>
                </li>
                <li className="menu-large">
                  <a href onClick={getLinkHandler("/hub")}>
                    거점HUB
                  </a>
                  <a
                    class="font-small"
                    href
                    onClick={getLinkHandler("/solution")}
                  >
                    스마트도시 솔루션
                  </a>
                  <a href onClick={getLinkHandler("/asean")}>
                    아세안 국가 정보
                  </a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
}
