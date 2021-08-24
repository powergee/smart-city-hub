import React, { useState, useEffect } from 'react'
import "./NoticeBoard.scss"
import { Paper } from '@material-ui/core'
import { getArticles, countArticles } from "../shared/BackendRequests"
import ArticlePreview from './ArticlePreview';
import { useHistory } from 'react-router-dom';

export default function NoticeBoard(props) {
    const { rowCount } = props;

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

    useEffect(() => {
        const associatedKinds = {
            "notices": ["notices"],
            "community": ["seminar", "workshop"],
            "smart-news": ["smart-news"],
            "archive": ["archive*"],
            // 'archive'가 아니라 *archive**인 이유는
            // 과거에는 archive가 세분화되어 있어
            // archive-southern, archive-smart 등이 있었으나,
            // 지금은 구분없이 archive로만 글을 작성하기 때문이다.
        }
        const artProms = [];
        const cntProms = [];

        Object.entries(associatedKinds).forEach(([, kinds]) => {
            kinds.forEach((kind) => {
                artProms.push(getArticles(1, rowCount, kind));
                cntProms.push(countArticles(kind));
            });
        });

        Promise.all(artProms).then((res) => {
            const newArticles = {};
            let respIndex = 0;

            Object.entries(associatedKinds).forEach(([key, kinds]) => {
                newArticles[key] = [];
                kinds.forEach(() => {
                    newArticles[key] = newArticles[key].concat(res[respIndex++]);
                });
            });

            Object.keys(newArticles).forEach((key) => {
                newArticles[key] = newArticles[key].sort((a, b) => {
                    return b.meta.createdAt - a.meta.createdAt;
                }).slice(0, rowCount);
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

            setCounts(newCounts);
        })
    }, [rowCount]);

    function handleArticleClick(article) {
        if (article.kind === "notices" || article.kind === "smart-news") {
            history.push("/news/" + article.kind + "/" + article.articleId);
        } else if (article.kind === "archive-southern" || article.kind === "archive-smart" || article.kind === "archive-etc" || article.kind === "archive") {
            history.push("/publish/archive/" + article.articleId);
        } else {
            history.push("/community/" + article.kind + "/" + article.articleId);
        }
    }

    function moveToList() {
        if (selected === "notices" || selected === "smart-news") {
            history.push("/news/" + selected);
        } else if (selected === "archive") {
            history.push("/publish/archive");
        } else {
            history.push("/community");
        }
    }

    const getButtonHandler = (kind) => () => {
        setSelected(kind);
    }

    return (
        <Paper variant="outlined" square className="board-paper">
            <div className="board-header">
                <div
                    onClick={getButtonHandler("notices")}
                    className={"board-header-button board-header-" + (selected === "notices" ? "primary" : "")}>
                    <h4>공지사항</h4>
                </div>
                <div
                    onClick={getButtonHandler("smart-news")}
                    className={"board-header-button board-header-" + (selected === "smart-news" ? "primary" : "")}>
                    <h4>스마트 뉴스</h4>
                </div>
                <div
                    onClick={getButtonHandler("community")}
                    className={"board-header-button board-header-" + (selected === "community" ? "primary" : "")}>
                    <h4>커뮤니티</h4>
                </div>
                <div
                    onClick={getButtonHandler("archive")}
                    className={"board-header-button board-header-" + (selected === "archive" ? "primary" : "")}>
                    <h4>아카이브</h4>
                </div>
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
