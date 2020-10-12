import React from 'react'
import './NavigationBar.scss'
import logo from "../images/UOS-logo.gif";

export default function NavigationBar() {
    return (
        <div className="navbar-root">
            <div className="header-background">
                <div className="header">
                    <div className="header-left header-button-container">
                        <ul>
                            <li><a href="#">서울시립대학교</a></li>
                        </ul>
                    </div>

                    <div className="header-right header-button-container">
                        <ul>
                            <li><a href="#">로그인</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="menu-background">
                <div className="menu">
                    <img src={logo}></img>
                </div>
            </div>
        </div>
    )
}
