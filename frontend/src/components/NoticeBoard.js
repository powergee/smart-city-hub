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
        "smart-news": [],
        "archive": []
    });
    const [counts, setCounts] = useState({
        "notices": 0,
        "community": 0,
        "smart-news": 0,
        "archive": 0
    });
    const history = useHistory();

    const associatedKinds = {
        "notices": ["notices"],
        "community": ["seminar", "workshop", "readings"],
        "smart-news": ["smart-news"],
        "archive": ["archive-southern", "archive-smart", "archive-etc"],
    }

    useEffect(() => {
        const artProms = [];
        const cntProms = [];

        Object.entries(associatedKinds).forEach(([key, kinds]) => {
            kinds.forEach((kind) => {
                artProms.push(getArticles(kind, 1, 3));
                cntProms.push(countArticles(kind));
            });
        });

        Promise.all(artProms).then((res) => {
            const newArticles = {};
            let keyIndex = 0;

            Object.entries(associatedKinds).forEach(([key, kinds]) => {
                newArticles[key] = [];
                let kindIndex = 0;

                kinds.forEach(() => {
                    newArticles[key].push(res[keyIndex][kindIndex++]);
                });
                ++keyIndex;
            });

            Object.keys(newArticles).forEach((key) => {
                newArticles[key] = newArticles[key].sort((a, b) => {
                    return b.meta.createdAt - a.meta.createdAt;
                }).slice(0, 3);
            });

            setArticles(newArticles);
        });

        Promise.all(cntProms).then((res) => {
            const newCounts = {};
            let index = 0;

            Object.entries(associatedKinds).forEach(([key, kinds]) => {
                newCounts[key] = 0;
                kinds.forEach(() => {
                    newCounts[key] += res[index++];
                });
            });

            setCounts(counts);
        })
    }, []);

    function handleArticleClick(article) {
        if (article.kind == "notices" || article.kind == "smart-news") {
            history.push("/news/" + article.kind + "/" + article.articleId);
        } else if (article.kind == "archive-southern" || article.kind == "archive-smart" || article.kind == "archive-etc") {
            history.push("/publish/archive/" + article.articleId);
        } else {
            history.push("/community/" + article.kind + "/" + article.articleId);
        }
    }

    function moveToList() {
        if (selected == "notices" || selected == "smart-news") {
            history.push("/news/" + selected);
        } else if (selected == "archive-southern" || selected == "archive-smart" || selected == "archive-etc") {
            history.push("/publish/archive");
        } else {
            history.push("/community");
        }
    }

    const getButtonHandler = (kind) => () => {
        setSelected(kind);
    }

    return (
        <Paper variant="outlined" className="board-paper">
            <div className="board-header">
                <Button onClick={getButtonHandler("notices")} color={(selected === "notices" ? "primary" : "default")} size="large">공지사항</Button>
                <Button onClick={getButtonHandler("smart-news")} color={(selected === "smart-news" ? "primary" : "default")} size="large">스마트 뉴스</Button>
                <Button onClick={getButtonHandler("community")} color={(selected === "community" ? "primary" : "default")} size="large">커뮤니티</Button>
                <Button onClick={getButtonHandler("archive")} color={(selected === "archive" ? "primary" : "default")} size="large">아카이브</Button>
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
