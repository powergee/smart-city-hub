import React, { useState, useEffect } from 'react'
import { NoticeBoard, CardBoard, DocumentPreview } from '../components'
import { Paper, ButtonBase, Modal, Typography } from '@material-ui/core'
import { Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core'
import { Fade } from 'react-slideshow-image';
import { getArticles, getFileInfo } from '../shared/BackendRequests'
import { dateToString } from '../shared/DateToString'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import kindTable from "../shared/ArticleKindTable.json";
import currProj from "../shared/CurrentProjects.json";
import hubJson from "../hub-data/generated/domestic-parsed.json"
import categoryImage from '../shared/CategoryImage';
import cateToEng from "../hub-data/cateToEng.json"
import getArchives from "../shared/Archives.js";
import bannerImage from "../images/banner.svg"
import videoImage from "../images/video-image.jpg"
import { useHistory } from 'react-router-dom';

import 'react-slideshow-image/dist/styles.css'
import './Home.scss'

export default function Home() {
    const [archOpen, setArchOpen] = useState(false);
    const [imageCards, setImageCards] = useState([]);
    const [issuePaperPreview, setIssuePaperPreview] = useState([]);
    const [archivePreview, setArchivePreview] = useState([]);
    const [currProjSlides, setCurrProjSlides] = useState(undefined);
    const [hubPreviewRows, setHubPreviewRows] = useState([]);
    const history = useHistory();
    const archMenu = getArchives();

    useEffect(() => {
        updateDocumentPreviews();
        updateProjectSlides();
        updateHubPreviews();
    }, []);

    function updateDocumentPreviews() {
        function extractSrc(html) {
            const tempElement = document.createElement("div");
            tempElement.innerHTML = html;
            return tempElement.querySelector("img").getAttribute("src");
        }

        function getArticlePath(articleId, kind) {
            return `${kindTable[kind].path}/${articleId}`;
        }

        function getLinkHandler(element) {
            return () => {
                history.push(getArticlePath(element.articleId, element.kind));
            }
        }

        function checkExtension(fileName, ext) {
            const target = "." + ext;
            return fileName.substring(Math.max(0, fileName.length-target.length)) === target;
        }

        async function hasPDF(article) {
            const promises = [];
            article.files.forEach((fileId) => {
                promises.push(getFileInfo(fileId));
            });

            try {
                const infoArr = await Promise.all(promises);

                let result = false;
                infoArr.some((info) => {
                    if (checkExtension(info.originalName, "pdf")) {
                        result = true;
                    }
                    return result;
                });
                return result;
            } catch (e) {
                return false;
            }
        }

        getArticles(1, 2, undefined, "[.\r\n]*<img.*src.*>[.\r\n]*", undefined, undefined)
            .then((res) => {
                const imCards = [];
                res.forEach(element => {
                    const src = extractSrc(element.contents);
                    imCards.push(
                        <Card className="menu-card-root" variant="outlined">
                            <CardActionArea onClick={getLinkHandler(element)}>
                                <CardMedia
                                    image={src}
                                    title={element.title}
                                    className="menu-card-media"
                                />
                                <CardContent>
                                    <Typography className="menu-card-title" gutterBottom variant="subtitle1">
                                        {element.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {`${kindTable[element.kind].text} · ${dateToString(element.meta.createdAt)}`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                });
                setImageCards(imCards);
            });

        getArticles(1, 10, "issue-paper", undefined, undefined, undefined)
            .then(async (res) => {
                const ipPrev = [];
                for (let i = 0; i < res.length; ++i) {
                    const element = res[i];
                    if (await hasPDF(element)) {
                        ipPrev.push(
                            <DocumentPreview article={element}></DocumentPreview>
                        );
                    }
                    if (ipPrev.length === 2) {
                        break;
                    }
                }
                setIssuePaperPreview(ipPrev);
            });

        getArticles(1, 10, "archive", undefined, undefined, undefined)
            .then(async (res) => {
                const archPrev = [];
                for (let i = 0; i < res.length; ++i) {
                    const element = res[i];
                    if (await hasPDF(element)) {
                        archPrev.push(
                            <DocumentPreview article={element}></DocumentPreview>
                        );
                    }
                    if (archPrev.length === 2) {
                        break;
                    }
                }
                setArchivePreview(archPrev);
            });
    }

    function updateProjectSlides() {
        const projSlides = [];
        let singleSlide = [];
        currProj.forEach((proj) => {
            singleSlide.push((
                <div className="comment-each">
                    <h2>{proj.title}</h2>
                    <h5>{`${proj.client} [${proj.when}]`}</h5>
                </div>
            ));
            if (singleSlide.length === 3) {
                projSlides.push((
                    <div className="comment-background">
                        <div className="comment-container">
                            {singleSlide}
                        </div>
                    </div>
                ));
                singleSlide = [];
            }
        });
        if (singleSlide.length) {
            projSlides.push((
                <div className="comment-background">
                    <div className="comment-container">
                        {singleSlide}
                    </div>
                </div>
            ));
        }
        setCurrProjSlides(projSlides);
    }

    function updateHubPreviews() {
        function getClickHandler(index) {
            return () => {
                history.push(`/hub/${index}`)
            }
        }

        const buttons = [];
        hubJson.firstCate.forEach((title, index) => {
            buttons.push(
                <Paper
                    className="hub-preview-paper"
                    elevation={4}
                    style={{
                        background: `url(${categoryImage[title]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >
                    <ButtonBase className="hub-preview-button" onClick={getClickHandler(index)}>
                        <span className="hub-preview-text">{title}</span>
                        <span className="hub-preview-text">{cateToEng[title]}</span>
                    </ButtonBase>
                </Paper>
            );
        });

        setHubPreviewRows([
            buttons.slice(0, 6),
            buttons.slice(7, 13),
            buttons.slice(14, 20),
        ]);
    }

    return (
        <React.Fragment>
            <div className="banner-root">
                <div className="banner-layout">
                    <div className="banner-row">
                        <div className="notice-layout">
                            <NoticeBoard rowCount={4}></NoticeBoard>
                        </div>
                        <div className="hub-preview-layout">
                            <Paper className="hub-preview-header" square variant="outlined">
                                <h4>스마트도시수출 거점HUB 플랫폼 {"&"} Smart City Export HUB Platform</h4>
                            </Paper>

                            <div className="hub-preview-table">
                                {hubPreviewRows.map(row => (
                                    <div className="hub-preview-row">{row}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="slide-container">
                <Fade>
                    {currProjSlides}
                </Fade>
            </div>

            <div className="board-background board-puple">
                <div className="board-column-container">
                    <h3 className="board-title">미디어로 보는 최근 소식</h3>
                    <div className="menu-card-layout">
                        {/* 
                            대표 영상 이미지는 아래와 같이 하드코딩하였음.
                            바람직한 구현은 아니므로, 추후 개선이 필요.
                         */}
                         <a onClick={() => { history.push("/news/notices/141"); }}>
                            <Paper className='menu-card-video'>
                                <div className='menu-card-video-thumb' style={{ backgroundImage: `url(${videoImage})` }}></div>
                                <div className='menu-card-video-overlay'>
                                    <PlayCircleOutlineIcon color="action"></PlayCircleOutlineIcon>
                                </div>
                                <div className='menu-card-video-bottom'>
                                    <strong>차세대 메타버스 플랫폼 제페토에 서울시립대학교 중앙도서관이 문을 열었습니다.</strong>
                                    <span>공지사항 · 2021-10-14</span>
                                </div>
                            </Paper>
                        </a>
                        {imageCards}
                    </div>
                </div>
            </div>

            <div className="board-background board-puple">
                <div className="board-row-container board-row-inner-sep">
                    <div className="board-half">
                        <h3 className="board-title">최신 Issue Paper</h3>
                        <div className="preview-layout">
                            {issuePaperPreview}
                        </div>
                    </div>
                    <div className="board-half">
                        <h3 className="board-title">최신 신남방 &amp; 스마트도시 기술 리포트</h3>
                        <div className="preview-layout">
                            {archivePreview}
                        </div>
                    </div>
                </div>
            </div>

            <div className="board-background bottom-banner board-light-puple">
                <div className="board-column-container">
                    <div><h3 className="board-title">한-아세안 스마트도시수출 거점HUB 플랫폼</h3></div>
                </div>
                <div className="board-banner-container">
                    <img src={bannerImage}></img>
                </div>
            </div>

            <Modal open={archOpen} className="modal" onClose={() => setArchOpen(false)}>
                <div className="modal-content">
                    <h2>나가려면 화면의 좌우 바깥쪽을 클릭하세요.</h2>

                    <div className="modal-section">
                        <div className="modal-title">
                            <h1>정부</h1>
                        </div>
                        <div className="modal-menu">
                            <CardBoard variant="small" menuList={archMenu.goverment}></CardBoard>
                        </div>
                    </div>

                    <div className="modal-section">
                        <div className="modal-title">
                            <h1>신남방</h1>
                        </div>
                        <div className="modal-menu">
                            <CardBoard variant="small" menuList={archMenu.newSouthern}></CardBoard>
                        </div>
                    </div>

                    <div className="modal-section">
                        <div className="modal-title">
                            <h1>스마트도시</h1>
                        </div>
                        <div className="modal-menu">
                            <CardBoard variant="small" menuList={archMenu.smartCity}></CardBoard>
                        </div>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    )
}
