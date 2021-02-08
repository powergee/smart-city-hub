import React, { useState, useEffect } from 'react'
import "./NoticeBoard.scss"
import { Paper, Button } from '@material-ui/core'
import { getArticles, countArticles } from "../shared/BackendRequests"
import ArticlePreview from './ArticlePreview';
import { useHistory } from 'react-router-dom';

export default function NoticeBoard() {
    const [selected, setSelected] = useState("notices");
    const [articles, setArticles] = useState({
        "notices": [],
        "events": [],
        "smart-news": []
    });
    const [counts, setCounts] = useState({
        "notices": 0,
        "events": 0,
        "smart-news": 0
    });
    const history = useHistory();

    useEffect(() => {
        let promises = [];
        promises.push(getArticles("notices", 1, 3));
        promises.push(getArticles("events", 1, 3));
        promises.push(getArticles("smart-news", 1, 3));
        promises.push(countArticles("notices"));
        promises.push(countArticles("events"));
        promises.push(countArticles("smart-news"));

        Promise.all(promises).then((results) => {
            setArticles({
                "notices": results[0],
                "events": results[1],
                "smart-news": results[2]
            })

            setCounts({
                "notices": results[3],
                "events": results[4],
                "smart-news": results[5]
            })
        });
    }, [])

    function handleArticleClick(article) {
        history.push("/news/" + article.kind + "/" + article.articleId);
    }

    function moveToList() {
        history.push("/news/" + selected);
    }

    const getButtonHandler = (kind) => () => {
        setSelected(kind);
    }

    return (
        <Paper className="board-paper">
            <div className="board-header">
                <Button onClick={getButtonHandler("notices")} color={(selected === "notices" ? "primary" : "default")} size="large">공지사항</Button>
                <Button onClick={getButtonHandler("smart-news")} color={(selected === "smart-news" ? "primary" : "default")} size="large">스마트 뉴스</Button>
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
