import React, { useState } from 'react'
import "./ContentHeader.scss";
import { useHistory } from "react-router-dom";

export default function ContentHeader(props) {
    const dummyLink = "javascript:void(0);";
    const history = useHistory();

    function getLinkHandler(url) {
        return () => {
            history.push(url);
        }
    }

    return (
        <div className="header-root">
            <div className="header-primary">
                <h1>{props.primary.title}</h1>
            </div>
            <div className="header-secondary">
                <h3>{props.secondary.title}</h3>
                <div>
                    <a href={dummyLink} onClick={getLinkHandler("/")}>홈</a>
                    <caption>{" > "}</caption>
                    <a href={dummyLink} onClick={getLinkHandler(props.primary.link)}>{props.primary.title}</a>
                    <caption>{" > "}</caption>
                    <a href={dummyLink} onClick={getLinkHandler(props.secondary.link)}>{props.secondary.title}</a>
                </div>
            </div>

            {props.children}
        </div>
    )
}