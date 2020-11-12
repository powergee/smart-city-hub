import React, { useState } from 'react'
import "./NoticeBoard.scss"
import { Paper, Button } from '@material-ui/core'

export default function NoticeBoard() {
    const NOTICE = 0, EVENT = 1, NEWS = 2;
    const [selected, setSelected] = useState(0);

    const getButtonHandler = (num) => () => {
        setSelected(num);
    }

    return (
        <Paper>
            <div className="board-header">
                <Button onClick={getButtonHandler(NOTICE)} color={(selected === NOTICE ? "primary" : "default")} size="large">공지사항</Button>
                <Button onClick={getButtonHandler(EVENT)} color={(selected === EVENT ? "primary" : "default")} size="large">학술행사</Button>
                <Button onClick={getButtonHandler(NEWS)} color={(selected === NEWS ? "primary" : "default")} size="large">스마트뉴스</Button>
            </div>
            <div className="board-contents">
                <ul>
                    <li>서울연구원 『작은연구 좋은서울』지원사업 공모 안내</li>
                    <li>2020년 서울시립대학교 도시인문학연구소 인문사회연구소지원사업 연구교수 신규(공개)채용 공고</li>
                    <li>『도시인문학연구』 12-2 논문 투고 안내(마감일 연장)</li>
                    <li>'제64차 도시인문학포럼-집합도시' 개최 안내</li>
                    <li>도시인문학연구소 인문사회연구소지원사업 연구보조원 모집 공고</li>
                </ul>
            </div>
        </Paper>
    )
}
