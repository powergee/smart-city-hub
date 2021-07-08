import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { dateToString } from '../shared/DateToString'
import { useHistory } from 'react-router-dom';
import kindTable from "../shared/ArticleKindTable.json";
import "./DocumentPreview.scss";

export default function DocumentPreview(props) {
    const { article } = props;
    const history = useHistory();

    function getArticlePath(articleId, kind) {
        return `${kindTable[kind].path}/${articleId}`;
    }

    function getPreviewSrc(fileId) {
        return `/v1/files/pdf-preview/${fileId}`;
    }

    function showArticle() {
        history.push(getArticlePath(article.articleId, article.kind));
    }

    return (
        <div className="preview-root">
            <Paper className="preview-card" square onClick={showArticle}>
                <img className="preview-image" alt={article.title} src={getPreviewSrc(article.files[0])}></img>
            </Paper>
            <Typography className="preview-title" gutterBottom variant="subtitle2" onClick={showArticle}>{article.title}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {dateToString(article.meta.createdAt)}
            </Typography>
        </div>
    );
}