import React, { useState } from 'react'
import { NoticeBoard, CardBoard } from '../components'
import { Slide } from 'react-slideshow-image';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArchiveIcon from '@material-ui/icons/Archive';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BookIcon from '@material-ui/icons/Book';
import { Paper, ButtonBase, Grid, Modal, Typography } from '@material-ui/core'
import 'react-slideshow-image/dist/styles.css'
import slide1 from "../images/slide-sample-1.png";
import hubPic from "../images/hub-pic.png";
import getArchives from "../shared/Archives.js";
import './Home.scss'
import { useHistory } from 'react-router-dom';

export default function Home() {
    const [archOpen, setArchOpen] = useState(false);
    const history = useHistory();

    const archMenu = getArchives();

    function viewArchive() {
        setArchOpen(true);
    }

    const getRedirector = (path) => () => {
        history.push(path);
    }

    return (
        <React.Fragment>
            <Slide easing="ease" className="slide-container">
                <div className="campus-slide">
                    <div style={{ 'backgroundImage': `url(${slide1})` }}>
                        <div className="white-filter">
                            <span style={{ 'color': `#282e39` }}>
                                Global Urban &#38; Infrastructure Research Center
                            </span>
                        </div>
                    </div>
                </div>
                <div className="campus-slide">
                    <div style={{ 'backgroundImage': `url(${slide1})` }}>
                        <div className="white-filter">
                            <span style={{ 'color': `#282e39` }}>
                                Global Urban &#38; Infrastructure Research Center
                            </span>
                        </div>
                    </div>
                </div>
            </Slide>

            <div className="comment-background">
                <div className="comment-container">
                    <h2>국제도시 및 인프라 연구센터</h2>
                    <p>서울시립대학교 국제도시 및 인프라 연구센터에 오신 것을 환영합니다!</p>
                </div>
            </div>

            <div className="board-background">
                <div className="board-container">
                    <div className="notice-root">
                        <NoticeBoard></NoticeBoard>
                    </div>

                    <div className="menu-root">
                        <div className="menu-table">
                            <div className="menu-row">
                                <div className="menu-cell">
                                    <Paper className="menu-paper">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/news/notices")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <ImportContactsIcon className="menu-icon" color="primary"></ImportContactsIcon>
                                                <Typography gutterBottom variant="subtitle2">공지사항</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper className="menu-paper">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/publish/issue-paper")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <AssessmentIcon className="menu-icon" color="primary"></AssessmentIcon>
                                                <Typography gutterBottom variant="subtitle2">Issue Paper</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper className="menu-paper">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/news/smart-news")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <LocationCityIcon className="menu-icon" color="primary"></LocationCityIcon>
                                                <Typography gutterBottom variant="subtitle2">스마트뉴스</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                            </div>
                            <div className="menu-row">
                                <div className="menu-cell">
                                    <Paper className="menu-paper">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/hub")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <img alt="Logo of Hub" className="menu-pic" src={hubPic}></img>
                                                <Typography gutterBottom variant="subtitle2">스마트도시수출</Typography>
                                                <Typography gutterBottom variant="subtitle2">거점HUB</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper className="menu-paper">
                                        <ButtonBase className="menu-button" onClick={getRedirector("/publish/archive")}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <ArchiveIcon className="menu-icon" color="primary"></ArchiveIcon>
                                                <Typography gutterBottom variant="subtitle2">아카이브</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper className="menu-paper">
                                        <ButtonBase className="menu-button" onClick={viewArchive}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <BookIcon className="menu-icon" color="primary"></BookIcon>
                                                <Typography gutterBottom variant="subtitle2">관련 사이트</Typography>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                            </div>
                        </div>
                    </div>
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
