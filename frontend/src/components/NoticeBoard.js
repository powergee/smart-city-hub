import React from 'react'
import "./NoticeBoard.scss"

export default function NoticeBoard() {
    return (
        <div>
            <div className="board-header">
                <ul>
                    <li className="category-enabled">공지사항</li>
                    <li className="category-disabled">학술행사</li>
                    <li className="category-disabled">언론속연구소</li>
                </ul>
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
        </div>
    )
}
