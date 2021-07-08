import React, { useState, useEffect } from 'react'
import "./NoticeBoard.scss"
import { Paper, Button } from '@material-ui/core'
import { getArticles, countArticles } from "../shared/BackendRequests"
import ArticlePreview from './ArticlePreview';
import { useHistory } from 'react-router-dom';

import noticeIcon from "../images/menu-icons/notice.svg";
import smartNewsIcon from "../images/menu-icons/smart-news.svg";
import archiveIcon from "../images/menu-icons/archive.svg";
import sitesIcon from "../images/menu-icons/sites.svg";

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

    const kindImageDict = {
        "notices": noticeIcon,
        "smart-news": smartNewsIcon,
        "archive": archiveIcon,
        "community": sitesIcon
    };

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
                artProms.push(getArticles(1, 3, kind));
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

            setCounts(newCounts);
        })
    }, []);

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
        <Paper variant="outlined" className="board-paper">
            <div className="board-table">
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
            </div>

            <img className="board-kind-image" alt="" src={kindImageDict[selected]}></img>
        </Paper>
    )
}
