import React from 'react'
import "./ContentHeader.scss";
import { useHistory } from "react-router-dom";

export default function ContentHeader(props) {
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
                    <a href onClick={getLinkHandler("/")}>홈</a>
                    <caption>{" > "}</caption>
                    <a href onClick={getLinkHandler(props.primary.link)}>{props.primary.title}</a>
                    <caption>{" > "}</caption>
                    <a href onClick={getLinkHandler(props.secondary.link)}>{props.secondary.title}</a>
                </div>
            </div>

            {props.children}
        </div>
    )
}