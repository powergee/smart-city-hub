import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom';
import { ContentHeader, ContentContainer, ArticlePreview } from "../components"
import { getArticles, countArticles } from "../shared/BackendRequests";
import Pagination from '@material-ui/lab/Pagination';
import "./IssuePaper.scss"

function IssuePaperList() {
    const [page, setPage] = useState(undefined);
    const [total, setTotal] = useState(undefined);
    const [perPage, setPerPage] = useState(undefined);
    const [articles, setArticles] = useState(undefined);

    const primary = {
        title: "Issue Paper",
        link: "/issue-paper"
    };

    const secondary = {
        title: "목록",
        link: "/issue-paper"
    };

    useEffect(() => {
        if (total !== undefined) {
            return;
        }

        // 처음 시작할 때, 게시물의 총 개수를 가져온다.
        countArticles("issue-paper")
            .then((count) => {
                setTotal(count);
                setPerPage(10);
                setPage(1);
            });
    }, [total]);

    useEffect(() => {
        if (page === undefined || perPage === undefined) {
            return;
        }

        getArticles("issue-paper", page, perPage)
            .then((res) => {
                if (typeof res === "number") {
                    alert("게시물을 가져오는데 실패하였습니다.");
                } else {
                    let articleComps = [];
                    if (res.length) {
                        res.map(element => articleComps.push(<ArticlePreview article={element} onClick={() => alert("Click!")}></ArticlePreview>));
                    } else {
                        articleComps.push(<h4>게시글이 없습니다!</h4>);
                    }

                    setArticles(articleComps);
                }
            });
    }, [page, perPage]);

    function handlePageChange(_, value) {
        setArticles(undefined);
        setPage(value);
    }

    return (
        <ContentHeader primary={primary} secondary={secondary}>
            <div className="list-container">
                {articles === undefined ? (
                    <h2 className="list-fetching">게시글을 가져오는 중입니다..!</h2>
                ) : (
                    articles
                )}
            </div>

            {total !== undefined && page !== undefined &&
                <div className="list-pagination">
                    <Pagination count={total} page={page} onChange={handlePageChange}></Pagination>
                </div>
            }
        </ContentHeader>
    )
}

function IssuePaperView(props) {
    const articleId = props.match.params.articleId

    const primary = {
        title: "Issue Paper",
        link: "/issue-paper"
    };

    const initialSecondary = {
        title: "불러오는 중...",
        link: "/issue-paper/" + articleId
    };

    return (
        <ContentHeader primary={primary} secondary={initialSecondary}>

        </ContentHeader>
    )
}

export default function IssuePaper() {
    return (
        <ContentContainer>
            <Route exact path="/issue-paper" component={IssuePaperList}></Route>
            <Route exact path="/issue-paper/:articleId" component={IssuePaperView}></Route>
        </ContentContainer>
    )
}
