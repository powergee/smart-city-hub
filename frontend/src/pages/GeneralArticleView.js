import React, { useEffect, useState } from 'react'
import { ContentHeader } from "../components"
import { getArticle } from "../shared/BackendRequests";
import { useHistory } from "react-router-dom";
import LockIcon from '@material-ui/icons/Lock';
import "./GeneralArticleView.scss"
import { dateToString } from '../shared/DateToString';

export default function GeneralArticleView(props) {
    const { superTitle, title, listLink } = props;
    const articleId = props.match.params.articleId;
    
    const [article, setArticle] = useState(undefined);
    const history = useHistory();

    const primary = {
        title: superTitle,
        link: listLink
    };

    const secondary = {
        title: title,
        link: listLink + "/" + articleId
    };

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

    return (
        <ContentHeader primary={primary} secondary={secondary}>
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

                        <div dangerouslySetInnerHTML={{__html: article.contents}}></div>
                    </React.Fragment>
                )}
        </ContentHeader>
    )
}