import React, { useEffect, useState } from 'react'
import { ContentHeader } from "../components"
import { getArticle, getFileInfo, downloadFile, deleteArticle as deleteArticleFromBack } from "../shared/BackendRequests";
import { useHistory } from "react-router-dom";
import { withCookies } from "react-cookie";
import LockIcon from '@material-ui/icons/Lock';
import { IconButton, Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import "./GeneralArticleView.scss"
import { dateToString } from '../shared/DateToString';
import getToken from "../shared/GetToken";

function GeneralArticleView(props) {
    const { superTitle, title, superCaption, caption, listLink } = props;
    const articleId = props.match.params.articleId;
    
    const [article, setArticle] = useState(undefined);
    const [files, setFiles] = useState([]);
    const history = useHistory();

    const sections = [
        {
            title: superTitle,
            link: listLink,
            caption: superCaption
        },
        {
            title: title,
            link: listLink + "/" + articleId,
            caption: caption
        }
    ];

    useEffect(() => {
        getArticle(articleId)
            .then((res) => {
                setArticle(res);
            })
            .catch((err) => {
                if (err === 400 || err === 404) {
                    alert("게시글 번호가 올바르지 않습니다. 다시 확인해주세요.");
                } else if (err === 401) {
                    alert("비공개 게시글입니다. 확인하려면 로그인해주세요.");
                } else {
                    alert("알 수 없는 오류입니다. 잠시 뒤에 다시 시도하십시오: " + err);
                }
                history.push(listLink);
            });
    }, [articleId])

    useEffect(() => {
        if (article === undefined) {
            return;
        }

        let promises = [];
        article.files.forEach(element => {
            promises.push(getFileInfo(element));
        });

        Promise.all(promises)
            .then(res => {
                setFiles(res);
            })
            .catch(() => {
                alert("파일 정보를 얻는데 실패하였습니다.");
            })
    }, [article]);

    const getFileDownloader = (fileId) => () => {
        downloadFile(fileId);
    }

    function editArticle() {
        history.push(listLink + "/writer/" + article.articleId);
    }

    function deleteArticle() {
        if (window.confirm("이 게시글을 정말 삭제하시겠습니까? (제목: " + article.title + ")")) {
            deleteArticleFromBack(articleId)
            history.push(listLink)
        }
    }

    return (
        <ContentHeader sections={sections}>
            {article === undefined ? (
                <h2 className="article-fetching">게시글을 가져오는 중입니다..!</h2>
            ) : (
                    <React.Fragment>
                        <h2 className="article-title">{article.title}</h2>
                        <div className="article-props">
                            {!article.isPublic && <LockIcon></LockIcon>}

                            <div className="article-prop-pair">
                                <strong>최초 작성자 :</strong>
                                <p>{article.createdBy}</p>
                            </div>

                            <div className="article-prop-pair">
                                <strong>최초 작성 시간 :</strong>
                                <p>{dateToString(article.meta.createdAt)}</p>
                            </div>

                            {article.lastModifiedBy && 
                                <React.Fragment>
                                    <div className="article-prop-pair">
                                        <strong>가장 최근에 수정한 사람 :</strong>
                                        <p>{article.lastModifiedBy}</p>
                                    </div>

                                    <div className="article-prop-pair">
                                        <strong>마지막 수정 시간 :</strong>
                                        <p>{dateToString(article.meta.modifiedAt)}</p>
                                    </div>
                                </React.Fragment>}
                            
                            <div className="article-prop-pair">
                                <strong>조회수 :</strong>
                                <p>{article.views}</p>
                            </div>
                        </div>

                        <div className="article-contents" dangerouslySetInnerHTML={{ __html: article.contents }}></div>

                        <div className="article-files">
                            {
                                files.length > 0 ? (
                                    <React.Fragment>
                                        <strong>{files.length}</strong>
                                        <strong>개의 첨부파일이 있습니다.</strong>
                                    </React.Fragment>
                                ) : (undefined)
                            }
                            {
                                files.map(element => (
                                    <div>
                                        <li>{element.originalName}</li>
                                        <IconButton size="small" onClick={getFileDownloader(element.fileId)}>
                                            <SaveAltIcon fontSize="inherit"></SaveAltIcon>
                                        </IconButton>
                                    </div>
                                ))
                            }
                        </div>

                        {
                            getToken(props.cookies) &&
                            <div className="article-edit">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="list-create"
                                    startIcon={<CreateIcon />}
                                    onClick={editArticle}
                                >이 게시글 수정하기</Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="list-create"
                                    startIcon={<DeleteIcon />}
                                    onClick={deleteArticle}
                                >이 게시글 삭제하기</Button>
                            </div>
                        }
                    </React.Fragment>
                )}
        </ContentHeader>
    )
}

export default withCookies(GeneralArticleView)