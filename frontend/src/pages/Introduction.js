import { Paper, Grid } from '@material-ui/core';
import React from 'react'
import { Route } from 'react-router-dom';
import { ContentContainer, ContentHeader, MarkdownViewer } from "../components"
import "./Introduction.scss"

import resJYJ from "../images/res-JYJ.jpg";
import resJYS from "../images/res-JYS.jpg";
import resKDI from "../images/res-KDI.jpg";
import resKDW from "../images/res-KDW.jpg";
import resKJY from "../images/res-KJY.jpg";
import resPSC from "../images/res-PSC.jpg";
import resYCH from "../images/res-YCH.jpg";

function Greeting() {
    const primary = {
        title: "연구실소개",
        link: "/introduction"
    };

    const secondary = {
        title: "인사말",
        link: "/introduction/greeting"
    };

    const jobs = [
        "인프라시설의 계획, 설치, 운영에 대한 연구",
        "스마트도시 기술 연구",
        "자연 및 사회재난 관련 대응연구",
        "디지털트윈 기반 연구",
        "고속도로 교통안전 연구",
        "AI기반의 측정장비 개발",
        "도시재생 및 도시축소 대응연구"
    ];

    return (
        <ContentHeader primary={primary} secondary={secondary}>
            <div className="introduction-contents">
                <h3>글로벌인프라연구실은 4차 산업혁명시대에 도시, 교통, 환경, 재난 등 사람을 위한 연구를 추진하고 있습니다.</h3>

                {
                    jobs.map((j) => (
                        <Paper elevation={3} className="introduction-paper">
                            <p>{j}</p>
                        </Paper>
                    ))
                }

                
            </div>
        </ContentHeader>
    )
}

// TODO: Researchers로 바꿀 것.
function Professors() {
    const primary = {
        title: "연구실소개",
        link: "/introduction"
    };

    const secondary = {
        title: "교수진 소개",
        link: "/introduction/professors"
    };

    const resInfo = [
        {
            name: "염춘호",
            image: resYCH,
            details: [
                "서울시립대학교 국제도시과학대학원",
                "글로벌건설학과 주임교수",
                "서울시 동대문구 서울시립대로 163, 법학관 517호",
                "University of Seoul",
                "International School of Urban Sciences",
                "Professor",
                "Law School 517, Seoulsiripdaero 163, Dongdaemun-gu, Seoul 02504 KOREA",
                "전    화: 02-6490-5154",
                "연락처: 010-2969-2504",
                "Email : chunhoy7@uos.ac.kr"
            ]
        },
        {
            name: "고주연",
            image: resKJY,
            details: [
                "서울시립대학교 도시과학연구원 박사/연구교수",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "전    화: 02-6490-5320",
                "이메일: gojy@uos.ac.kr"
            ]
        },
        {
            name: "김대일",
            image: resKDI,
            details: [
                "공학박사/연구교수",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일:  kkim019@uos.ac.kr"
            ]
        },
        {
            name: "김동우",
            image: resKDW,
            details: [
                "공학박사",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일:  dkim166@uos.ac.kr"
            ]
        },
        {
            name: "박성찬 Sungchan Park",
            image: resPSC,
            details: [
                "선임연구원",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일: psc1006@uos.ac.kr"
            ]
        },
        {
            name: "전연수",
            image: resJYS,
            details: [
                "연구원",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일: qkdsiddl1@uos.ac.kr"
            ]
        },
        {
            name: "전유진",
            image: resJYJ,
            details: [
                "연구원",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일: yjjeon6621@gmail.com"
            ]
        },
        {
            name: "Ehab 이합",
            image: undefined,
            details: [
                "연구원",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일: ehab.shahat@gmail.com"
            ]
        },
        {
            name: "유동균",
            image: undefined,
            details: [
                "연구원",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일: yu1211025@gmail.com"
            ]
        },
        {
            name: "권준호",
            image: undefined,
            details: [
                "연구원",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일: unknownpgr@gmail.com"
            ]
        },
        {
            name: "이준영",
            image: undefined,
            details: [
                "연구원",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일: leegwae@gmail.com"
            ]
        },
        {
            name: "김정현",
            image: undefined,
            details: [
                "연구원",
                "서울시립대학교 국제도시 및 인프라연구센터[도시과학연구원]",
                "서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호",
                "이메일: powergee101@gmail.com"
            ]
        },
    ];

    return (
        <ContentHeader primary={primary} secondary={secondary}>
            {
                resInfo.map((res) => (
                    <Paper elevation={3}>
                        <Grid className="">
                            <img src={res.image}></img>
                        </Grid>
                    </Paper>
                ))
            }
        </ContentHeader>
    )
}

function Projects() {
    const primary = {
        title: "연구실소개",
        link: "/introduction"
    };

    const secondary = {
        title: "주요 사업",
        link: "/introduction/projects"
    };

    return (
        <React.Fragment>
            <ContentHeader primary={primary} secondary={secondary}></ContentHeader>
        </React.Fragment>
    )
}

function Contact() {
    const primary = {
        title: "연구실소개",
        link: "/introduction"
    };

    const secondary = {
        title: "연락처",
        link: "/introduction/contact"
    };

    return (
        <React.Fragment>
            <ContentHeader primary={primary} secondary={secondary}></ContentHeader>
        </React.Fragment>
    )
}

export default function Introduction() {
    return (
        <ContentContainer>
            <Route exact path="/introduction" component={Greeting}></Route>
            <Route exact path="/introduction/greeting" component={Greeting}></Route>
            <Route exact path="/introduction/professors" component={Professors}></Route>
            <Route exact path="/introduction/projects" component={Projects}></Route>
            <Route exact path="/introduction/contact" component={Contact}></Route>
        </ContentContainer>
    )
}
