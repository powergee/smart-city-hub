import React, { useEffect, useState } from 'react'
import { ContentHeader } from "../components"
import { getArticles, countArticles, getFileInfo, downloadFile } from "../shared/BackendRequests";
import { dateToString } from '../shared/DateToString';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Pagination from '@material-ui/lab/Pagination';
import CreateIcon from '@material-ui/icons/Create';
import { Button, IconButton, Tooltip } from '@material-ui/core';
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
    const [fileInfo, setFileInfo] = useState({});
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
                setPerPage(15);
                setPage(1);
            });
    }, [total, kind]);

    useEffect(() => {
        if (page === undefined || perPage === undefined) {
            return;
        }

        setArticles(undefined);
        getArticles(page, perPage, kind)
            .then((res) => {
                setArticles(res);

                const promises = [];
                res.forEach((article) => {
                    article.files.forEach((fileId) => {
                        promises.push(getFileInfo(fileId));
                    });
                });

                Promise.all(promises).then((infoArr) => {
                    const fetchedInfo = {};
                    infoArr.forEach((info) => {
                        fetchedInfo[info.fileId] = info;
                    });
                    setFileInfo(fetchedInfo);
                })
            })
            .catch((err) => {
                alert("게시글을 가져올 수 없습니다.. 잠시 뒤에 다시 시도하십시오: " + err?.response?.status);
                history.push("/");
            });
    }, [page, perPage, kind, history]);

    function handlePageChange(_, value) {
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
                            <table width="100%" border="0">
                                <colgroup>
                                    <col width="10%"></col>
                                    <col width="65%"></col>
                                    <col width="15%"></col>
                                    <col width="10%"></col>
                                    <col width="10%"></col>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">번호</th>
                                        <th scope="col">제목</th>
                                        <th scope="col">작성 날짜</th>
                                        <th scope="col">조회수</th>
                                        <th scope="col">첨부파일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles.map((element, index) => (
                                        <tr className="list-row">
                                            <td>{total - (index + perPage*(page-1))}</td>
                                            <td className="list-title">
                                                <Tooltip title={element.title}>
                                                    <h3 onClick={() => handleArticleClick(element)}>{element.title}</h3>
                                                </Tooltip>
                                            </td>
                                            <td>{dateToString(element.meta.createdAt)}</td>
                                            <td>{element.views}</td>
                                            <td>{
                                                element.files.map((id) => (
                                                    <Tooltip title={fileInfo[id]?.originalName}>
                                                        <IconButton size="small" onClick={() => downloadFile(id)}>
                                                            <AttachFileIcon fontSize="inherit"></AttachFileIcon>
                                                        </IconButton>
                                                    </Tooltip>
                                                ))
                                            }</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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