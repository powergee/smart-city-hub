import React from 'react'
import "./ContentHeader.scss";
import { useHistory } from "react-router-dom";

function ContentHeader({ sections, showSecondary = true, children }) {
    const history = useHistory();

    function getLinkHandler(url) {
        return () => {
            history.push(url);
        }
    }

    return (
        <div className="header-root">
            <div className="header-pair">
                <div className="header-primary">
                    <h1>{sections[0].title}</h1>
                    {sections[0].caption && (
                        <h3>{" (" + sections[0].caption + ")"}</h3>
                    )}
                </div>
                {sections.length > 1 && showSecondary ? (
                    <div className="header-secondary">
                        <div className="header-left">
                            <h3>{sections[1].title}</h3>
                            {sections[1].caption && (
                                <h3 className="thin">{" (" + sections[1].caption + ")"}</h3>
                            )}
                        </div>
                        <div className="header-right">
                            <a href onClick={getLinkHandler("/")}>홈</a>
                            <caption>{" > "}</caption>
                            <a href onClick={getLinkHandler(sections[0].link)}>{sections[0].title}</a>
                            <caption>{" > "}</caption>
                            <a href onClick={getLinkHandler(sections[1].link)}>{sections[1].title}</a>
                        </div>
                    </div>
                ) : undefined}
            </div>

            {children}
        </div>
    )
}

export default ContentHeader;