import React, { useState } from 'react'
import "./ContentContainer.scss";

export default function ContentContainer(props) {
    return (
        <div className="content-background">
            <div className="content-root">
                {props.children}
            </div>
        </div>
    )
}
