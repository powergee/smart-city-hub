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
import './Home.scss'

export default function Home() {
    const [archOpen, setArchOpen] = useState(false);

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
                    <h2>국제도시 및 인프라 연구 센터</h2>
                    <p>서울시립대학교 국제도시 및 인프라 연구 센터에 오신 것을 환영합니다!</p>
                </div>
            </div>

            <div className="board-background">
                <div className="board-container">
                    <NoticeBoard></NoticeBoard>

                    <div className="board-root">
                        <div className="board-table">
                            <div className="board-row">
                                <div className="board-cell">
                                    <Paper>
                                        <ButtonBase className="board-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <AccountBalanceIcon className="board-icon" color="primary"></AccountBalanceIcon>
                                                <h4>메뉴 1</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="board-cell">
                                    <Paper>
                                        <ButtonBase className="board-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <BusinessIcon className="board-icon" color="primary"></BusinessIcon>
                                                <h4>메뉴 2</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="board-cell">
                                    <Paper>
                                        <ButtonBase className="board-button" onClick={viewArchive}>
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <ArchiveIcon className="board-icon" color="primary"></ArchiveIcon>
                                                <h4>아카이브</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                            </div>
                            <div className="board-row">
                                <div className="board-cell">
                                    <Paper>
                                        <ButtonBase className="board-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <ImportContactsIcon className="board-icon" color="primary"></ImportContactsIcon>
                                                <h4>메뉴 4</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="board-cell">
                                    <Paper>
                                        <ButtonBase className="board-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <LocationCityIcon className="board-icon" color="primary"></LocationCityIcon>
                                                <h4>메뉴 5</h4>
                                            </Grid>
                                        </ButtonBase>
                                    </Paper>
                                </div>
                                <div className="board-cell">
                                    <Paper>
                                        <ButtonBase className="board-button">
                                            <Grid container direction="column" justify="center" alignItems="center">
                                                <BookIcon className="board-icon" color="primary"></BookIcon>
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
                <Paper className="modal-content">
                    
                </Paper>
            </Modal>
        </React.Fragment>
    )
}
