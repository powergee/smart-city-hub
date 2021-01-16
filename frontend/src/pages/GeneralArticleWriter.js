import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from "draftjs-to-html"
import { ContentHeader } from '../components';
import getToken from "../shared/GetToken";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { Button, IconButton, TextField, FormControlLabel, Switch } from '@material-ui/core';
import path from "path";
import { withCookies } from "react-cookie";
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./GeneralArticleWriter.scss";
import { useHistory } from 'react-router-dom';
import { uploadFile, postArticle } from "../shared/BackendRequests";

// Editor에서 이미지를 첨부한 뒤 한국어를 입력하면 "Unknown DraftEntity key: null." 에러가 발생하는 버그 존재.
// 아래에 있는 커스텀 렌더러(BlockRenderer)를 사용하여 해결.
// https://github.com/jpuri/react-draft-wysiwyg/issues/979 를 참고하였음.
function BlockRenderer(contentBlock) {
    const type = contentBlock.getType();

    // Convert image type to mediaComponent
    if (type === 'atomic') {
        return {
            component: MediaComponent,
            editable: false,
        };
    }
}

class MediaComponent extends React.Component {
    render() {
        const { block, contentState } = this.props;
        const data = contentState.getEntity(block.getEntityAt(0)).getData();
        const emptyHtml = ' ';

        return (
            <div style={{
                "display": "flex",
                "flex-direction": "row",
                "align-items": "center",
                "justify-content": "center"
            }}>
                {emptyHtml}
                <img
                    src={data.src}
                    alt={data.alt || 'image'}
                />
            </div>
        );
    }
}

function ImgEntityTransform(entity) {
    if (entity.type === "IMAGE") {
        return `
        <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        ">
            <img src="${entity.data.src}" />
        </div>`
    }

    return ''
}

function GeneralArticleWriter(props) {
    const { superTitle, pageTitle, link, kind } = props;
    const history = useHistory();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [title, setTitle] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [saveButtonText, setSaveButtonText] = useState("저장하기");
    const [saveButtonColor, setSaveButtonColor] = useState("primary");

    const primary = {
        title: superTitle,
        link: link
    };

    const secondary = {
        title: pageTitle,
        link: link
    };

    useEffect(() => {
        const token = getToken(props.cookies);
        if (!token || !token.isManager) {
            alert("새 글을 작성할 권한이 없습니다. 관리자 계정으로 로그인해주세요.");
            history.push(link);
        }
    }, []);

    function onEditorStateChange(editorState) {
        setEditorState(editorState);
    }

    function onFileInputChange(e) {
        let oldFiles = [...selectedFiles];
        e.target.files.forEach(element => {
            console.log(element);
            oldFiles.push(element);
        });

        setSelectedFiles(oldFiles);
    }

    function onTitleChange(event) {
        setTitle(event.target.value);
    }

    function onPublicChange(event) {
        setIsPublic(event.target.checked);
    }

    const getFileRemoveHandler = (toRemove) => () => {
        let newFiles = [];
        let removed = false;
        selectedFiles.forEach(element => {
            if (!removed && element === toRemove) {
                removed = true;
            } else {
                newFiles.push(element);
            }
        });

        setSelectedFiles(newFiles);
    }

    async function saveArticle() {
        if (!title) {
            alert("게시글의 제목을 입력해주세요.");
            return;
        }

        setSaveButtonText("저장 중...");
        setSaveButtonColor("secondary");

        let promises = [];
        selectedFiles.forEach(element => {
            promises.push(uploadFile(element));
        });

        try {
            const fileIds = await Promise.all(promises);

            const htmlSrc = draftToHtml(convertToRaw(editorState.getCurrentContent()), null, null, ImgEntityTransform);

            const article = {
                title: title,
                contents: htmlSrc,
                images: uploadedImages,
                files: fileIds.map(element => Number(element)),
                kind: kind,
                isPublic: isPublic
            };

            const uploaded = await postArticle(article);
            history.push(link + "/" + uploaded.articleId);
        } catch {
            alert("파일 또는 게시글을 업로드하는데 실패하였습니다. 다시 시도해주세요.");
            setSaveButtonText("저장하기");
            setSaveButtonColor("primary");
        }
    }

    return (
        <ContentHeader primary={primary} secondary={secondary}>
            <Editor
                wrapperClassName="writer-wrapper"
                editorClassName="writer-editor"
                localization={{
                    locale: 'ko',
                }}
                placeholder="내용을 작성해주세요!"
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                blockRendererFn={BlockRenderer}
            >
            </Editor>

            <div className="writer-props">
                <TextField className="writer-title" id="title" label="게시글 제목" required rows={1} rowsMax={10} onChange={onTitleChange} value={title}></TextField>

                <FormControlLabel
                    value="start"
                    control={<Switch color="primary" checked={isPublic} onChange={onPublicChange} />}
                    label="공개로 설정"
                    labelPlacement="start"
                />
            </div>

            <div className="writer-uploading">
                {
                    selectedFiles.map(element => (
                        <div>
                            <strong>{path.basename(element.name)}</strong>
                            <IconButton size="small" onClick={getFileRemoveHandler(element)}>
                                <BackspaceIcon fontSize="inherit"></BackspaceIcon>
                            </IconButton>
                        </div>
                    ))
                }
            </div>

            <div className="writer-buttons">
                <Button
                    variant="contained"
                    component="label"
                    color="default"
                    startIcon={<CloudUploadIcon />}>
                    업로드할 파일 추가
                    <input type="file" name="file" multiple onChange={onFileInputChange} hidden></input>
                </Button>
                <Button
                    variant="contained"
                    component="label"
                    color={saveButtonColor}
                    startIcon={<SaveIcon />}
                    onClick={saveArticle}>
                    {saveButtonText}
                </Button>
            </div>
        </ContentHeader>
    )
}

export default withCookies(GeneralArticleWriter)