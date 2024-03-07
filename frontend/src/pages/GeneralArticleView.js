import React, { useEffect, useState } from "react";
import {
  getArticle,
  getFileInfo,
  downloadFile,
  deleteArticle as deleteArticleFromBack,
} from "../shared/BackendRequests";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import LockIcon from "@material-ui/icons/Lock";
import { IconButton, Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import "./GeneralArticleView.scss";
import { dateToString } from "../shared/DateToString";
import getToken from "../shared/GetToken";

export default function GeneralArticleView(props) {
  const { listLink } = props;
  const articleId = props.match.params.articleId;

  const [article, setArticle] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [cookies] = useCookies();
  const history = useHistory();

  useEffect(() => {
    getArticle(articleId)
      .then((res) => {
        setArticle(res);
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 400 || status === 404) {
          alert("게시글 번호가 올바르지 않습니다. 다시 확인해주세요.");
        } else if (status === 401) {
          alert("비공개 게시글입니다. 확인하려면 로그인해주세요.");
        } else {
          alert("알 수 없는 오류입니다. 잠시 뒤에 다시 시도하십시오: " + err);
        }
        history.push(listLink);
      });
  }, [articleId, listLink, history]);

  useEffect(() => {
    if (article === undefined) {
      return;
    }

    let promises = [];
    article.files.forEach((element) => {
      promises.push(getFileInfo(element));
    });

    Promise.all(promises)
      .then((res) => {
        setFiles(res);
      })
      .catch(() => {
        alert("파일 정보를 얻는데 실패하였습니다.");
      });
  }, [article]);

  const getFileDownloader = (fileId) => () => {
    downloadFile(fileId);
  };

  function editArticle() {
    history.push(listLink + "/writer/" + article.articleId);
  }

  function deleteArticle() {
    if (
      window.confirm(
        "이 게시글을 정말 삭제하시겠습니까? (제목: " + article.title + ")"
      )
    ) {
      deleteArticleFromBack(articleId);
      history.push(listLink);
    }
  }

  return (
    <React.Fragment>
      {article === undefined ? (
        <h2 className="article-fetching">게시글을 가져오는 중입니다..!</h2>
      ) : (
        <React.Fragment>
          <h2 className="article-title">{article.title}</h2>
          <div className="article-props">
            {!article.isPublic && <LockIcon></LockIcon>}
            <div className="article-prop-pair">
              <strong>작성 날짜 :</strong>
              <span>{dateToString(article.meta.createdAt)}</span>
            </div>
            <div className="article-prop-pair">
              <strong>조회수 :</strong>
              <span>{article.views}</span>
            </div>
          </div>

          <div
            className="article-contents ck-content"
            dangerouslySetInnerHTML={{ __html: article.contents }}
          ></div>

          <div className="article-files">
            {files.length > 0 ? (
              <React.Fragment>
                <strong>{files.length}</strong>
                <strong>개의 첨부파일이 있습니다.</strong>
              </React.Fragment>
            ) : undefined}
            {files.map((element) => (
              <div>
                <li>{element.originalName}</li>
                <IconButton
                  size="small"
                  onClick={getFileDownloader(element.fileId)}
                >
                  <SaveAltIcon fontSize="inherit"></SaveAltIcon>
                </IconButton>
              </div>
            ))}
          </div>

          {getToken(cookies) && (
            <>
              <div style={{ lineHeight: '2px' }}>
                <p>아래의 내용은 관리자에게만 보입니다.</p>
                <p>최초 작성자: {article.createdBy}, 작성 일시(UTC, 변경 가능): {article.meta.createdAt}</p>
                <p>마지막으로 수정한 사람: {article.lastModifiedBy}, 마지막으로 수정한 일시(UTC): {article.meta.modifiedAt}</p>
              </div>
              <div className="article-edit">
                <Button
                  variant="contained"
                  color="primary"
                  className="list-create"
                  startIcon={<CreateIcon />}
                  onClick={editArticle}
                >
                  이 게시글 수정하기
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="list-create"
                  startIcon={<DeleteIcon />}
                  onClick={deleteArticle}
                >
                  이 게시글 삭제하기
                </Button>
              </div>
            </>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
