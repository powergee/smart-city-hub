import React from "react";
import "./NavigationBar.scss";
import logo from "../images/hub-logo.png";
import { useHistory } from "react-router-dom";
import getToken from "../shared/GetToken";
import { withCookies } from "react-cookie";
import { tryLogout } from "../shared/BackendRequests";

function NavigationBar(props) {
  const uosURL = "https://www.uos.ac.kr/";
  const history = useHistory();
  const token = getToken(props.cookies);

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

  return (
    <header className="navbar-root">
      <div className="header-background">
        <div className="header">
          <div className="header-left header-button-container">
            <ul>
              <li>
                <a href={uosURL}>서울시립대학교</a>
              </li>
            </ul>
          </div>

          <div className="header-right header-button-container">
            {token ? (
              <React.Fragment>
                <strong>{token.userName}</strong>
                <p>님, 환영합니다!</p>
                <ul>
                  <li>
                    <a href onClick={logout}>
                      로그아웃
                    </a>
                  </li>
                </ul>
              </React.Fragment>
            ) : (
              <ul>
                <li>
                  <a href onClick={getLinkHandler("/login")}>
                    로그인
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="menu-background">
        <div className="menu">
          <a href onClick={getLinkHandler("/")}>
            <img alt="Main Logo" src={logo}></img>
          </a>

          <div className="menu-primary">
            <ul>
              <li>
                <a
                  href
                  className="menu-small"
                  onClick={getLinkHandler("/introduction")}
                >
                  센터소개
                </a>
              </li>
              <li>
                <a
                  href
                  className="menu-large"
                  onClick={getLinkHandler("/projects")}
                >
                  연구{" & "}사업
                </a>
              </li>
              <li>
                <a
                  href
                  className="menu-large"
                  onClick={getLinkHandler("/publish/issue-paper")}
                >
                  발간물
                </a>
              </li>
              <li>
                <a
                  href
                  className="menu-small"
                  onClick={getLinkHandler("/news/notices")}
                >
                  소식
                </a>
              </li>
              <li>
                <a
                  href
                  className="menu-small"
                  onClick={getLinkHandler("/community/seminar")}
                >
                  커뮤니티
                </a>
              </li>
              <li>
                <a
                  href
                  className="menu-large font-small"
                  onClick={getLinkHandler("/hub")}
                >
                  스마트도시수출 거점HUB
                </a>
              </li>

              <div class="menu-dropdown">
                <ul>
                  <li className="menu-small">
                    <a href onClick={getLinkHandler("/introduction/greeting")}>
                      인사말
                    </a>
                    <a href onClick={getLinkHandler("/introduction/goal")}>
                      설립배경 및 목적
                    </a>
                    <a
                      href
                      onClick={getLinkHandler("/introduction/researchers")}
                    >
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
                    <a class="font-small" href onClick={getLinkHandler("/hub")}>
                      거점HUB로 이동하기
                    </a>
                    <a
                      class="font-small"
                      href
                      onClick={getLinkHandler("/solution")}
                    >
                      솔루션목록으로 이동하기
                    </a>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withCookies(NavigationBar);
