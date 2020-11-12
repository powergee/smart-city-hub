import { Paper } from '@material-ui/core';
import React from 'react'
import { Route } from 'react-router-dom';
import { ContentContainer, ContentHeader, MarkdownViewer } from "../components"
import "./Introduction.scss"

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

                {jobs.map((j) => (
                    <Paper elevation={3} className="introduction-paper">
                        <p>{j}</p>
                    </Paper>))}

                
            </div>
        </ContentHeader>
    )
}

function Professors() {
    const primary = {
        title: "연구실소개",
        link: "/introduction"
    };

    const secondary = {
        title: "교수진 소개",
        link: "/introduction/professors"
    };

    return (
        <React.Fragment>
            <ContentHeader primary={primary} secondary={secondary}></ContentHeader>
        </React.Fragment>
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

export default function Introduction() {
    return (
        <ContentContainer>
            <Route exact path="/introduction" component={Greeting}></Route>
            <Route exact path="/introduction/greeting" component={Greeting}></Route>
            <Route exact path="/introduction/professors" component={Professors}></Route>
            <Route exact path="/introduction/projects" component={Projects}></Route>
        </ContentContainer>
    )
}
