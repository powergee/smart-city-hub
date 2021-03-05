import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
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
import { Prompt, useHistory } from 'react-router-dom';
import { uploadFile, postArticle, getArticle } from "../shared/BackendRequests";
import packageJson from "../../package.json";

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
                    style={{"max-width": "100%"}}
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
            <img src="${entity.data.src}" style="max-width: 100%"}}/>
        </div>`
    }

    return ''
}

function GeneralArticleWriter(props) {
    const { superTitle, superCation, pageTitle, pageCaption, link, kind } = props;
    const articleId = props?.match?.params?.articleId;

    const history = useHistory();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [title, setTitle] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [saveButtonText, setSaveButtonText] = useState("저장하기");
    const [saveButtonColor, setSaveButtonColor] = useState("primary");
    const [routeToMove, setRouteToMove] = useState(undefined);

    const sections = [
        {
            title: superTitle,
            link: link,
            caption: superCation
        },
        {
            title: pageTitle,
            link: link,
            caption: pageCaption
        }
    ];

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
                    let contentBlock = htmlToDraft(article.contents)
                    let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                    let editorState = EditorState.createWithContent(contentState)
                    setEditorState(editorState)

                    setUploadedFiles(article.files)
                    setUploadedImages(article.images)
                    setTitle(article.title)
                    setIsPublic(article.isPublic)
                })
                .catch(() => {
                    alert("글을 가져올 수 없었습니다. 정상적인 경로로 접근했는지 확인해주세요.");
                    history.push(link);
                })
        }
    }, []);

    useEffect(() => {
        if (routeToMove === undefined) {
            return;
        }
        history.push(routeToMove);
    }, [routeToMove]);

    function onEditorStateChange(editorState) {
        setEditorState(editorState);
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

            console.log(uploadedFiles.concat(fileIds.map(element => Number(element))))
            console.log(uploadedImages)
            let article = {
                title: title,
                contents: htmlSrc,
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

    async function imageUploadCallback(file) {
        try {
            const fileId = await uploadFile(file);

            let newImages = [...uploadedImages];

            newImages.push(fileId);
            setUploadedImages(newImages);

            return { data: { link: packageJson.proxy + "/v1/files/media/" + fileId } };
        } catch {
            alert("이미지를 업로드하는데 실패하였습니다. 다시 시도해주세요.");
        }
    }

    return (
        <ContentHeader sections={sections}>
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
                toolbar={{
                    image: {
                        uploadCallback: imageUploadCallback,
                        previewImage: true,
                        alt: { present: true, mandatory: false },
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',

                    }
                }}
            >
            </Editor>

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