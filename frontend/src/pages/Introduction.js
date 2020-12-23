import { Paper, Grid } from '@material-ui/core';
import React from 'react'
import { Route } from 'react-router-dom';
import { ContentContainer, ContentHeader, MarkdownViewer, ProjectTable } from "../components"
import jobs from "../shared/Jobs.json";
import getResearchers from "../shared/Researchers.js";
import "./Introduction.scss"

function Greeting() {
    const primary = {
        title: "센터소개",
        link: "/introduction"
    };

    const secondary = {
        title: "인사말",
        link: "/introduction/greeting"
    };

    return (
        <ContentHeader primary={primary} secondary={secondary}>
            <div className="introduction-contents">
                <h3>국제도시 및 인프라 연구센터는 4차 산업혁명시대에 도시, 교통, 환경, 재난 등 사람을 위한 연구를 추진하고 있습니다.</h3>

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

function Researchers() {
    const primary = {
        title: "센터소개",
        link: "/introduction"
    };

    const secondary = {
        title: "연구진",
        link: "/introduction/researchers"
    };

    const resInfo = getResearchers();

    return (
        <ContentHeader primary={primary} secondary={secondary}>
            {
                resInfo.map((res) => (
                    <Paper elevation={3} className="researchers-paper">
                        <Grid className="researchers-grid" container direction="row">
                            <img src={res.image}></img>
                            <Grid item>
                                <h2>{res.name}</h2>
                                <ul>
                                    {
                                        res.details.map((d) => (
                                            <li>{d}</li>
                                        ))
                                    }
                                </ul>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            }
        </ContentHeader>
    )
}

function Contact() {
    const primary = {
        title: "센터소개",
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
            <Route exact path="/introduction/researchers" component={Researchers}></Route>
            <Route exact path="/introduction/contact" component={Contact}></Route>
        </ContentContainer>
    )
}
