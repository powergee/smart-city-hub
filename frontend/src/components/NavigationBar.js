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
        <div className="navbar-root">
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
                            <li><a className="menu-small" onClick={getLinkHandler("/introduction")}>연구소소개</a></li>
                            <li><a className="menu-small" onClick={getLinkHandler("/events")}>학술행사</a></li>
                            <li><a className="menu-small" onClick={getLinkHandler("/community")}>커뮤니티</a></li>
                            <li><a className="menu-large" onClick={getLinkHandler("/hub")}>스마트도시수출 거점HUB</a></li>

                            <div class="menu-dropdown">
                                <ul>
                                    <li className="menu-small">
                                        <a onClick={getLinkHandler("/introduction/greeting")}>인사말</a>
                                        <a onClick={getLinkHandler("/introduction/researchers")}>연구진 소개</a>
                                        <a onClick={getLinkHandler("/introduction/projects")}>주요 사업</a>
                                        <a onClick={getLinkHandler("/introduction/contact")}>연락처</a>
                                    </li>
                                    <li className="menu-small">
                                        <a href={dummyLink}>Item 3-1</a>
                                        <a href={dummyLink}>Item 3-2</a>
                                        <a href={dummyLink}>Item 3-3</a>
                                        <a href={dummyLink}>Item 3-4</a>
                                    </li>
                                    <li className="menu-small">
                                        <a href={dummyLink}>Item 4-1</a>
                                        <a href={dummyLink}>Item 4-2</a>
                                        <a href={dummyLink}>Item 4-3</a>
                                        <a href={dummyLink}>Item 4-4</a>
                                    </li>
                                    <li className="menu-large">
                                        <a href={dummyLink}>거점HUB로 이동하기</a>
                                    </li>
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
