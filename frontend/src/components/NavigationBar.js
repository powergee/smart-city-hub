import React from 'react'
import './NavigationBar.scss'
import logo from "../images/hub-logo.png";
import { useHistory } from "react-router-dom";

export default function NavigationBar() {
    const uosURL = "https://www.uos.ac.kr/";
    const dummyLink = "javascript:void(0);";
    const history = useHistory();

    function getLinkHandler(url) {
        return () => {
            history.push(url);
        }
    }

    return (
        <header className="navbar-root">
            <div className="header-background">
                <div className="header">
                    <div className="header-left header-button-container">
                        <ul>
                            <li><a href={uosURL}>서울시립대학교</a></li>
                        </ul>
                    </div>

                    <div className="header-right header-button-container">
                        <ul>
                            <li><a href={dummyLink}>로그인</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="menu-background">
                <div className="menu">
                    <a onClick={getLinkHandler("/")}><img src={logo}></img></a>

                    <div className="menu-primary">
                        <ul>
                            <li><a className="menu-small" onClick={getLinkHandler("/introduction")}>센터소개</a></li>
                            <li><a className="menu-large" onClick={getLinkHandler("/projects")}>연구{" & "}사업</a></li>
                            <li><a className="menu-large" onClick={getLinkHandler("/publish")}>Issue Paper</a></li>
                            <li><a className="menu-small" onClick={getLinkHandler("/community")}>커뮤니티</a></li>
                            <li><a className="menu-large font-small" onClick={getLinkHandler("/hub")}>스마트도시수출 거점HUB</a></li>

                            <div class="menu-dropdown">
                                <ul>
                                    <li className="menu-small">
                                        <a onClick={getLinkHandler("/introduction/greeting")}>인사말</a>
                                        <a onClick={getLinkHandler("/introduction/researchers")}>연구진</a>
                                        <a onClick={getLinkHandler("/introduction/contact")}>연락처</a>
                                    </li>
                                    <li className="menu-large">
                                        <a onClick={getLinkHandler("/projects/summary")}>총괄 연구 {" & "} 사업</a>
                                        <a onClick={getLinkHandler("/projects/withhs")}>인문사회연구소</a>
                                        <a onClick={getLinkHandler("/projects/smtdstpre")}>스마트재난안전</a>
                                        <a onClick={getLinkHandler("/projects/etc")}>기타</a>
                                    </li>
                                    <li className="menu-large">
                                        <a href={dummyLink}>Issue Paper</a>
                                    </li>
                                    <li className="menu-small">
                                        <a href={dummyLink}>세미나</a>
                                        <a href={dummyLink}>워크숍</a>
                                    </li>
                                    <li className="menu-large">
                                        <a class="font-small" href={dummyLink}>거점HUB로 이동하기</a>
                                    </li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
