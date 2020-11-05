import React from 'react'
import './NavigationBar.scss'
import logo from "../images/hub-logo.png";

export default function NavigationBar() {
    const uosURL = "https://www.uos.ac.kr/";
    const dummyLink = "javascript:void(0);";

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
                    <a href={dummyLink}><img src={logo}></img></a>

                    <div className="menu-primary">
                        <ul>
                            <li><a className="menu-small" href={dummyLink}>연구소소개</a></li>
                            <li><a className="menu-small" href={dummyLink}>주요사업</a></li>
                            <li><a className="menu-small" href={dummyLink}>학술행사</a></li>
                            <li><a className="menu-small" href={dummyLink}>커뮤니티</a></li>
                            <li><a className="menu-large" href={dummyLink}>스마트도시수출 거점HUB</a></li>

                            <div class="menu-dropdown">
                                <ul>
                                    <li className="menu-small">
                                        <a href={dummyLink}>Item 1-1</a>
                                        <a href={dummyLink}>Item 1-2</a>
                                        <a href={dummyLink}>Item 1-3</a>
                                        <a href={dummyLink}>Item 1-4</a>
                                    </li>
                                    <li className="menu-small">
                                        <a href={dummyLink}>Item 2-1</a>
                                        <a href={dummyLink}>Item 2-2</a>
                                        <a href={dummyLink}>Item 2-3</a>
                                        <a href={dummyLink}>Item 2-4</a>
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
                                        <a href={dummyLink}>Item 5-1</a>
                                        <a href={dummyLink}>Item 5-2</a>
                                        <a href={dummyLink}>Item 5-3</a>
                                        <a href={dummyLink}>Item 5-4</a>
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
