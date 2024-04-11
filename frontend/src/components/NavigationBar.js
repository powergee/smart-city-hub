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
          </ul>
        </div>
      </div>

      <div className="header-gnb">
        <a href="https://global.urbanscience.uos.ac.kr">
          <img alt="Main Logo" src={logo} />
        </a>

        <div className="menu-primary">
          <ul>
            <li>
              <a href="https://global.urbanscience.uos.ac.kr/introduction">{t("센터소개")}</a>
            </li>
            <li>
              <a href="https://global.urbanscience.uos.ac.kr/projects">{t("연구 & 사업")}</a>
            </li>
            <li>
              <a href="https://global.urbanscience.uos.ac.kr/publish/issue-paper">{t("발간물")}</a>
            </li>
            <li>
              <a href="https://global.urbanscience.uos.ac.kr/news/notices">{t("소식")}</a>
            </li>
            <li>
              <a href="https://global.urbanscience.uos.ac.kr/news/seminar">{t("세미나")}</a>
            </li>
            <li>
              <Link to="/hub">{t("스마트도시수출 거점HUB")}</Link>
            </li>

            <div class="menu-dropdown">
              <ul>
                <li className="menu-small">
                  <a href="https://global.urbanscience.uos.ac.kr/introduction/greeting">{t("인사말")}</a>
                  <a href="https://global.urbanscience.uos.ac.kr/introduction/goal">{t("설립배경 및 목적")}</a>
                  <a href="https://global.urbanscience.uos.ac.kr/introduction/researchers">{t("연구진")}</a>
                </li>
                <li className="menu-large">
                  <a href="https://global.urbanscience.uos.ac.kr/projects/summary">{t("총괄 연구 & 사업")}</a>
                  <a href="https://global.urbanscience.uos.ac.kr/projects/withhs">{t("인문사회연구소")}</a>
                  <a href="https://global.urbanscience.uos.ac.kr/projects/smtdstpre">{t("스마트재난안전")}</a>
                  <a href="https://global.urbanscience.uos.ac.kr/projects/etc">{t("기타")}</a>
                </li>
                <li className="menu-large">
                  <a href="https://global.urbanscience.uos.ac.kr/publish/issue-paper">{t("Issue Paper")}</a>
                  <a href="https://global.urbanscience.uos.ac.kr/publish/archive">{t("아카이브")}</a>
                </li>
                <li className="menu-small">
                  <a href="https://global.urbanscience.uos.ac.kr/news/notices">{t("공지사항")}</a>
                  <a href="https://global.urbanscience.uos.ac.kr/news/smart-news">{t("스마트 뉴스")}</a>
                  <a href="https://global.urbanscience.uos.ac.kr/news/research">{t("연구실적")}</a>
                </li>
                <li className="menu-small">
                  <a href="https://global.urbanscience.uos.ac.kr/news/seminar">{t("세미나")}</a>
                  <a href="/community/workshop">{t("기관 및 기업 소개")}</a>
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
