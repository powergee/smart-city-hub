import React from "react";
import "./NavigationBar.scss";
import logo from "../images/hub-logo.png";
import { Link } from "react-router-dom";
import getToken from "../shared/GetToken";
import { useCookies } from "react-cookie";
import { tryLogout } from "../shared/BackendRequests";
import { useTranslation } from "react-i18next";

export default function NavigationBar(props) {
  const { className } = props;
  const [cookies] = useCookies();
  const token = getToken(cookies);
  const [t, i18n] = useTranslation();

  async function logout() {
    await tryLogout();
    alert("로그아웃되었습니다.");
    window.location.reload();
  }

  const locale = i18n.resolvedLanguage;

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
                href="/"
                className="header-lng"
                onClick={(e) => {
                  e.preventDefault();
                  if (locale === "ko") {
                    i18n.changeLanguage("en");
                  } else if (locale === "en") {
                    i18n.changeLanguage("ko");
                  }
                }}
              >
                <b>{locale === "en" ? "한국어" : "English"}</b>
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
        <Link to="/">
          <img alt="Main Logo" src={logo} />
        </Link>

        <div className="menu-primary">
          <ul>
            <li>
              <Link to="/introduction">{t("센터소개")}</Link>
            </li>
            <li>
              <Link to="/projects">{t("연구 & 사업")}</Link>
            </li>
            <li>
              <Link to="/publish/issue-paper">{t("발간물")}</Link>
            </li>
            <li>
              <Link to="/news/notices">{t("소식")}</Link>
            </li>
            <li>
              <Link to="/community/seminar">{t("커뮤니티")}</Link>
            </li>
            <li>
              <Link to="/hub">{t("스마트도시수출 거점HUB")}</Link>
            </li>

            <div class="menu-dropdown">
              <ul>
                <li className="menu-small">
                  <Link to="/introduction/greeting">{t("인사말")}</Link>
                  <Link to="/introduction/goal">{t("설립배경 및 목적")}</Link>
                  <Link to="/introduction/researchers">{t("연구진")}</Link>
                </li>
                <li className="menu-large">
                  <Link to="/projects/summary">{t("총괄 연구 & 사업")}</Link>
                  <Link to="/projects/withhs">{t("인문사회연구소")}</Link>
                  <Link to="/projects/smtdstpre">{t("스마트재난안전")}</Link>
                  <Link to="/projects/etc">{t("기타")}</Link>
                </li>
                <li className="menu-large">
                  <Link to="/publish/issue-paper">{t("Issue Paper")}</Link>
                  <Link to="/publish/archive">{t("아카이브")}</Link>
                </li>
                <li className="menu-small">
                  <Link to="/news/notices">{t("공지사항")}</Link>
                  <Link to="/news/smart-news">{t("스마트뉴스")}</Link>
                  <Link to="/news/research">{t("연구실적")}</Link>
                </li>
                <li className="menu-small">
                  <Link to="/community/seminar">{t("세미나")}</Link>
                  <Link to="/community/workshop">{t("기관 및 기업 소개")}</Link>
                </li>
                <li className="menu-large">
                  <Link to="/hub">{t("거점HUB")}</Link>
                  <Link to="/solution">{t("스마트도시 솔루션")}</Link>
                  <Link to="/asean">{t("아세안 국가 정보")}</Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
}
