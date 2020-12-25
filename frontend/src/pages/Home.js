import React, { useState } from 'react'
import { NoticeBoard, CardBoard } from '../components'
import { Slide } from 'react-slideshow-image';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BusinessIcon from '@material-ui/icons/Business';
import ArchiveIcon from '@material-ui/icons/Archive';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BookIcon from '@material-ui/icons/Book';
import { Paper, ButtonBase, Grid, Modal } from '@material-ui/core'
import 'react-slideshow-image/dist/styles.css'
import slide1 from "../images/slide-sample-1.png";
import slide2 from "../images/slide-sample-2.png";
import getArchives from "../shared/Archives.js";
import './Home.scss'

import econLogo from "../images/archive-pics/econ-logo.png";
import innogovLogo from "../images/archive-pics/innogov-logo.png";
import kirdLogo from "../images/archive-pics/kird-logo.png";
import nspLogo from "../images/archive-pics/nsp-logo.png";
import saftyMapLogo from "../images/archive-pics/saftymap-logo.jpeg";
import scassoLogo from "../images/archive-pics/scasso-logo.jpg";
import sckoreaLogo from "../images/archive-pics/sckorea-logo.png";
import scwikiLogo from "../images/archive-pics/scwiki-logo.png";

export default function Home() {
    const [archOpen, setArchOpen] = useState(false);

    const archMenu = getArchives();

    function viewArchive() {
        setArchOpen(true);
    }

    return (
        <React.Fragment>
            <Slide easing="ease" className="slide-container">
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${slide1})` }}>
                        <span>예시 슬라이드 1</span>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${slide2})` }}>
                        <span>예시 슬라이드 2</span>
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
                    <NoticeBoard></NoticeBoard>

                    <div className="menu-root">
                        <div className="menu-table">
                            <div className="menu-row">
                                <div className="menu-cell">
                                    <Paper>
                                        <ButtonBase className="menu-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <AccountBalanceIcon className="menu-icon" color="primary"></AccountBalanceIcon>
                                                <h4>메뉴 1</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper>
                                        <ButtonBase className="menu-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <BusinessIcon className="menu-icon" color="primary"></BusinessIcon>
                                                <h4>메뉴 2</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper>
                                        <ButtonBase className="menu-button" onClick={viewArchive}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <ArchiveIcon className="menu-icon" color="primary"></ArchiveIcon>
                                                <h4>아카이브</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                            </div>
                            <div className="menu-row">
                                <div className="menu-cell">
                                    <Paper>
                                        <ButtonBase className="menu-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <ImportContactsIcon className="menu-icon" color="primary"></ImportContactsIcon>
                                                <h4>메뉴 4</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper>
                                        <ButtonBase className="menu-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <LocationCityIcon className="menu-icon" color="primary"></LocationCityIcon>
                                                <h4>메뉴 5</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="menu-cell">
                                    <Paper>
                                        <ButtonBase className="menu-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <BookIcon className="menu-icon" color="primary"></BookIcon>
                                                <h4>메뉴 6</h4>
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
                    <h2>나가려면 화면의 바깥쪽을 클릭하세요.</h2>

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
