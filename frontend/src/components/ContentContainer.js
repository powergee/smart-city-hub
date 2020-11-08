import React from 'react'
import "./ContentContainer.scss";

export default function ContentContainer(props) {
    return (
        <div className="content-background">
            <div className="content-root">
                <div className="content-primary-title">
                    <h1>{props.primaryTitle}</h1>
                </div>
                <div className="content-secondary-title">
                    <h3>{props.secondaryTitle}</h3>
                    <div>
                        <caption>홈</caption>
                        
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    )
}
