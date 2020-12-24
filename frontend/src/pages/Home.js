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

    const archMenu = [
        {
            link: "http://www.nsp.go.kr/",
            image: nspLogo,
            title: "신남방정책특별위원회",
            description: "신남방정책특별위원회의 홈페이지입니다."
        },
        {
            link: "https://shinnambang-economy.co.kr/",
            image: econLogo,
            title: "신남방 경제 연구회",
            description: "신남방 경제 연구회의 홈페이지입니다."
        },
        {
            link: "https://smartcity.go.kr/",
            image: sckoreaLogo,
            title: "스마트시티 종합포털",
            description: "스마트시티 종합포털의 홈페이지입니다."
        },
        {
            link: "https://www.smartcity.or.kr/",
            image: scassoLogo,
            title: "스마트도시협회",
            description: "스마트도시협회의 홈페이지입니다."
        },
        {
            link: "https://www.safemap.go.kr/",
            image: saftyMapLogo,
            title: "생활안전지도",
            description: "생활안전지도의 홈페이지입니다."
        },
        {
            link: "http://www.nsp.go.kr/news/news_list.do?board_id=2",
            image: nspLogo,
            title: "신남방정책특별위원회 보도자료",
            description: "신남방정책특별위원회의 보도자료를 확인하실 수 있습니다."
        },
        {
            link: "https://www.innogov.go.kr/ucms/digital/task/taskList.do?pageIndex=1&menuNo=300145",
            image: innogovLogo,
            title: "디지털정부혁신자료실",
            description: "디지털정부혁신자료실의 콘텐츠를 조회하실 수 있습니다."
        },
        {
            link: "https://www.kird.re.kr/",
            image: kirdLogo,
            title: "국가과학기술인력개발원",
            description: "국가과학기술인력개발원의 홈페이지입니다."
        },
        {
            link: "https://www.korea.kr/special/policyCurationView.do?newsId=148863564",
            image: scwikiLogo,
            title: "스마트시티 정책 위키",
            description: "정책 위키의 스마트시티 항목을 확인합니다."
        },
    ];

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
                    <CardBoard variant="small" menuList={archMenu}></CardBoard>
                </div>
            </Modal>
        </React.Fragment>
    )
}
