import React from 'react'
import "./ArticlePreview.scss"
import { dateToString } from "../shared/DateToString"

export default function ArticlePreview(props) {
    const { article, onClick } = props

    return (
        <div className="article-prev-root" onClick={onClick}>
            <div className="article-prev-left">
                <h3>{article.title}</h3>
                <div className="article-prev-info">
                    <div>
                        <h5>작성한 날짜 :</h5>
                        <h5>{dateToString(article.meta.createdAt)}</h5>
                    </div>
                    <div>
                        <h5>조회수 :</h5>
                        <h5>{article.views}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
