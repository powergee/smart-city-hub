import React, { useEffect, useState } from 'react'
import { ContentHeader, ArticlePreview } from "../components"
import { getArticles, countArticles } from "../shared/BackendRequests";
import Pagination from '@material-ui/lab/Pagination';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import getToken from "../shared/GetToken";
import { withCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import "./GeneralArticleList.scss"

function GeneralArticleList(props) {
    const { superTitle, title, superCaption, caption, link, kind } = props;

    const [page, setPage] = useState(undefined);
    const [total, setTotal] = useState(undefined);
    const [perPage, setPerPage] = useState(undefined);
    const [articles, setArticles] = useState(undefined);
    const history = useHistory();

    const sections = [
        {
            title: superTitle,
            link: link,
            caption: superCaption
        },
        {
            title: title,
            link: link,
            caption: caption
        }
    ];

    useEffect(() => {
        if (total !== undefined) {
            return;
        }

        // 처음 시작할 때, 게시물의 총 개수를 가져온다.
        countArticles(kind)
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

        getArticles(kind, page, perPage)
            .then((res) => {
                setArticles(res);
            })
            .catch((err) => {
                alert("게시글을 가져올 수 없습니다.. 잠시 뒤에 다시 시도하십시오: " + err);
                history.push("/");
            });
    }, [page, perPage]);

    function handlePageChange(_, value) {
        setArticles(undefined);
        setPage(value);
    }

    function handleArticleClick(article) {
        history.push(link + "/" + article.articleId);
    }

    function handleArticleCreate() {
        history.push(link + "/writer");
    }

    return (
        <ContentHeader sections={sections}>
            {articles === undefined ? (
                <h2 className="list-fetching">게시글을 가져오는 중입니다..!</h2>
            ) : (
                    <React.Fragment>
                        {
                            getToken(props.cookies) &&
                            <Button
                                variant="contained"
                                color="primary"
                                className="list-create"
                                startIcon={<CreateIcon />}
                                onClick={handleArticleCreate}
                            >새 게시글 만들기</Button>
                        }
                        <p className="list-total-info">{total} 건의 게시물이 검색되었습니다.</p>
                        <div className="list-container">
                            {articles.map((element, index) => <ArticlePreview number={total - (index + perPage*(page-1))} article={element} onClick={handleArticleClick}></ArticlePreview>)}
                        </div>
                        <div className="list-pagination">
                            <Pagination count={Math.floor(total / perPage) + (total % perPage > 0 ? 1 : 0)} page={page} onChange={handlePageChange}></Pagination>
                        </div>
                    </React.Fragment>
                )}
        </ContentHeader>
    )
}

export default withCookies(GeneralArticleList)