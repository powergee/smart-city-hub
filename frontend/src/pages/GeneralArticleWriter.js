import React, { useEffect, useState } from 'react';
import { ArticleEditor } from '../components';
import getToken from "../shared/GetToken";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { Button, IconButton, TextField, FormControlLabel, Switch } from '@material-ui/core';
import path from "path";
import { withCookies } from "react-cookie";
import "./GeneralArticleWriter.scss";
import { Prompt, useHistory } from 'react-router-dom';
import { uploadFile, postArticle, getArticle, getFileInfo } from "../shared/BackendRequests";

function GeneralArticleWriter(props) {
    const { link, kind } = props;
    const articleId = props?.match?.params?.articleId;

    const history = useHistory();
    const [editor, setEditor] = useState(null);
    const [initContents, setInitContents] = useState("");
    const [contents, setContents] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedFilesInfo, setUploadedFilesInfo] = useState({});
    const [uploadedImages, setUploadedImages] = useState([]);
    const [title, setTitle] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [saveButtonText, setSaveButtonText] = useState("저장하기");
    const [saveButtonColor, setSaveButtonColor] = useState("primary");
    const [routeToMove, setRouteToMove] = useState(undefined);

    useEffect(() => {
        const token = getToken(props.cookies);
        if (!token || !token.isManager) {
            alert("글을 작성할 권한이 없습니다. 관리자 계정으로 로그인해주세요.");
            history.push(link);
        }

        if (articleId) {
            getArticle(articleId)
                .then((article) => {
                    // 게시글 내용 설정
                    setContents(article.contents);
                    setInitContents(article.contents);
                    if (editor) {
                        editor.setData(article.contents);
                    }

                    setUploadedFiles(article.files)
                    setUploadedImages(article.images)
                    setTitle(article.title)
                    setIsPublic(article.isPublic)

                    const promises = [];
                    article.files.forEach((fileId) => {
                        promises.push(getFileInfo(fileId));
                    });
                    Promise.all(promises).then((res) => {
                        const infoDict = {};
                        res.forEach((info) => {
                            infoDict[info.fileId] = info;
                        });
                        setUploadedFilesInfo(infoDict);
                    })
                })
                .catch((ex) => {
                    alert("글을 가져올 수 없었습니다. 정상적인 경로로 접근했는지 확인해주세요.");
                    history.push(link);
                })
        }
    }, [articleId, editor, history, link, props.cookies]);

    useEffect(() => {
        if (routeToMove === undefined) {
            return;
        }
        history.push(routeToMove);
    }, [routeToMove, history]);

    useEffect(() => {
        if (editor && initContents) {
            editor.setData(initContents);
        }
    }, [initContents, editor])

    function onContentsChange(_, editor) {
        const data = editor.getData();
        setContents(data);
    }

    function onEditorReady(editor) {
        setEditor(editor);
        if (contents) {
            editor.setData(contents);
        }
    }

    function onFileInputChange(e) {
        let oldFiles = [...selectedFiles];
        e.target.files.forEach(element => {
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

    const getSelectedFileRemover = (toRemove) => () => {
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

    const getUploadedFileRemover = (toRemove) => () => {
        const newFiles = [];
        let removed = false;
        uploadedFiles.forEach(element => {
            if (!removed && element === toRemove) {
                removed = true;
            } else {
                newFiles.push(element);
            }
        });
        setUploadedFiles(newFiles);

        const newInfo = {};
        removed = false;
        Object.keys(uploadedFilesInfo).forEach((key) => {
            if (!removed && key === toRemove.fileId) {
                removed = true;
            } else {
                newInfo[key] = uploadedFilesInfo[key];
            }
        });
        setUploadedFilesInfo(newInfo);
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

            let article = {
                title: title,
                contents: contents,
                images: uploadedImages,
                files: uploadedFiles.concat(fileIds.map(element => Number(element))),
                kind: kind,
                isPublic: isPublic
            };

            // 이미 생성된 글을 수정하는 것이라면,
            if (articleId) {
                article.articleId = articleId;
            }

            const uploaded = await postArticle(article);
            setRouteToMove(link + "/" + uploaded.articleId);
        } catch {
            alert("파일 또는 게시글을 업로드하는데 실패하였습니다. 다시 시도해주세요.");
            setSaveButtonText("저장하기");
            setSaveButtonColor("primary");
        }
    }

    return (
        <React.Fragment>
            <Prompt when={routeToMove === undefined} message="아직 작성중인 게시글을 저장하지 않았습니다. 정말 나가시겠습니까?"></Prompt>

            <div className="writer-props">
                <TextField className="writer-title" id="title" label="게시글 제목" required rows={1} rowsMax={10} onChange={onTitleChange} value={title}></TextField>

                <FormControlLabel
                    value="start"
                    control={<Switch color="primary" checked={isPublic} onChange={onPublicChange} />}
                    label="공개로 설정"
                    labelPlacement="start"
                />
            </div>

            <ArticleEditor
                onChange={onContentsChange}
                onReady={onEditorReady}
                ref={editor}
            />

           {selectedFiles.length > 0 ? (<strong className="writer-caption">새로 업로드될 파일:</strong>) : (undefined)}

            <div className="writer-uploading">
                {
                    selectedFiles.map(element => (
                        <div>
                            <span>{path.basename(element.name)}</span>
                            <IconButton size="small" onClick={getSelectedFileRemover(element)}>
                                <BackspaceIcon fontSize="inherit"></BackspaceIcon>
                            </IconButton>
                        </div>
                    ))
                }
            </div>

            {uploadedFiles.length > 0 ? (<strong className="writer-caption">과거에 업로드한 파일:</strong>): (undefined)}

            <div className="writer-uploading">
                {
                    Object.keys(uploadedFilesInfo).length > 0 ? (
                        uploadedFiles.map(element => (
                            <div>
                                <span>{uploadedFilesInfo[element].originalName}</span>
                                <IconButton size="small" onClick={getUploadedFileRemover(element)}>
                                    <BackspaceIcon fontSize="inherit"></BackspaceIcon>
                                </IconButton>
                            </div>
                        ))
                    ) : (undefined)
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
        </React.Fragment>
    )
}

export default withCookies(GeneralArticleWriter)