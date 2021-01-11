import React from 'react'
import ErrorIcon from '@material-ui/icons/Error';
import "./NotFound.scss";

export default function NotFound() {
    return (
        <div className="not-found-root">
            <ErrorIcon></ErrorIcon>
            <h1>요청하신 페이지를 찾을 수 없습니다!</h1>
        </div>
    )
}
