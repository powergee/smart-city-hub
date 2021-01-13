import React, { useState } from 'react'
import "./NoticeBoard.scss"
import { Paper, Button } from '@material-ui/core'
import ArticlePreview from './ArticlePreview';

export default function NoticeBoard() {
    const NOTICE = 0, EVENT = 1, NEWS = 2;
    const [selected, setSelected] = useState(0);

    const getButtonHandler = (num) => () => {
        setSelected(num);
    }

    const ex1 = {
        title: "디자인 테스트를 위한 글 제목입니다.",
        views: 12,
        meta: {
            createdAt: new Date()
        }
    }

    return (
        <Paper className="board-paper">
            <div className="board-header">
                <Button onClick={getButtonHandler(NOTICE)} color={(selected === NOTICE ? "primary" : "default")} size="large">공지사항</Button>
                <Button onClick={getButtonHandler(EVENT)} color={(selected === EVENT ? "primary" : "default")} size="large">학술행사</Button>
                <Button onClick={getButtonHandler(NEWS)} color={(selected === NEWS ? "primary" : "default")} size="large">스마트뉴스</Button>
            </div>
            <div className="board-contents">
                <ArticlePreview article={ex1}></ArticlePreview>
                <ArticlePreview article={ex1}></ArticlePreview>
                <ArticlePreview article={ex1}></ArticlePreview>
            </div>
        </Paper>
    )
}
