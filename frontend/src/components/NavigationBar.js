import React from 'react'
import './NavigationBar.scss'
import logo from "../images/hub-logo.png";

export default function NavigationBar() {
    const dummyLink = "javascript:void(0);";

    return (
        <div className="navbar-root">
            <div className="header-background">
                <div className="header">
                    <div className="header-left header-button-container">
                        <ul>
                            <li><a href={dummyLink}>서울시립대학교</a></li>
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
                            <li><a href={dummyLink}>연구소소개</a></li>
                            <li><a href={dummyLink}>주요사업</a></li>
                            <li><a href={dummyLink}>학술행사</a></li>
                            <li><a href={dummyLink}>커뮤니티</a></li>

                            {/* <div className="menu-dropdown">
                                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
                            </div> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
