import React, { useState, useEffect } from 'react'
import "./NoticeBoard.scss"
import { Paper, Button } from '@material-ui/core'
import { getArticles, countArticles } from "../shared/BackendRequests"
import ArticlePreview from './ArticlePreview';
import { useHistory } from 'react-router-dom';

export default function NoticeBoard() {
    // 현재 NoticeBoard 에서는 소식(news), 커뮤니티(community) 분야의 글을 다루고 있음.
    const [selected, setSelected] = useState("notices");
    const [articles, setArticles] = useState({
        "notices": [],
        "community": [],
        "smart-news": []
    });
    const [counts, setCounts] = useState({
        "notices": 0,
        "community": 0,
        "smart-news": 0
    });
    const history = useHistory();

    useEffect(() => {
        let promises = [];
        promises.push(getArticles("notices", 1, 3));
        promises.push(getArticles("seminar", 1, 3));
        promises.push(getArticles("workshop", 1, 3));
        promises.push(getArticles("readings", 1, 3));
        promises.push(getArticles("smart-news", 1, 3));
        promises.push(countArticles("notices"));
        promises.push(countArticles("seminar"));
        promises.push(countArticles("workshop"));
        promises.push(countArticles("readings"));
        promises.push(countArticles("smart-news"));

        // 공지사항 탭: kind가 notices인 것들에서 최근 3개 글을 표시
        // 스마트뉴스 탭: kind가 smart-news인 것들에서 최근 3개 글을 표시
        // 커뮤니티 탭: 커뮤니티에 포함되는 소분류는 세미나, 워크숍, 추천 도서가 있으므로,
        //      그것들 각각에서 3개를 가져온 뒤 시간순으로 정렬하여 상위 3개를 표시
        Promise.all(promises).then((results) => {
            setArticles({
                "notices": results[0],
                "community": results[1].concat(results[2], results[3]).sort((a, b) => {
                    return b - a;
                }).slice(0, 3),
                "smart-news": results[4]
            })

            setCounts({
                "notices": results[5],
                "community": results[6] + results[7] + results[8],
                "smart-news": results[9]
            })
        });
    }, [])

    function handleArticleClick(article) {
        if (article.kind == "notices" || article.kind == "smart-news") {
            history.push("/news/" + article.kind + "/" + article.articleId);
        } else {
            history.push("/community/" + article.kind + "/" + article.articleId);
        }
    }

    function moveToList() {
        if (selected == "notices" || selected == "smart-news") {
            history.push("/news/" + selected);
        } else {
            history.push("/community");
        }
    }

    const getButtonHandler = (kind) => () => {
        setSelected(kind);
    }

    return (
        <Paper className="board-paper">
            <div className="board-header">
                <Button onClick={getButtonHandler("notices")} color={(selected === "notices" ? "primary" : "default")} size="large">공지사항</Button>
                <Button onClick={getButtonHandler("smart-news")} color={(selected === "smart-news" ? "primary" : "default")} size="large">스마트 뉴스</Button>
                <Button onClick={getButtonHandler("community")} color={(selected === "community" ? "primary" : "default")} size="large">커뮤니티</Button>
            </div>
            <div className="board-contents">
                {articles[selected].map(element => <ArticlePreview article={element} onClick={handleArticleClick}></ArticlePreview>)}
            </div>
            <div className="board-footer">
                <a href onClick={moveToList}>{counts[selected] + "개의 게시물이 있습니다."}</a>
            </div>
        </Paper>
    )
}
