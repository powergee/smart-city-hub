import { Paper, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { ContentContainer, ContentHeader, MarkdownViewer } from "../components"
import jobs from "../shared/Jobs.json";
import getResearchers from "../shared/Researchers.js";
import goalDoc from "../docs/설립 배경 및 목적.md"
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

function Goal() {
    const [source, setSource] = useState("");

    const primary = {
        title: "센터소개",
        link: "/introduction"
    };

    const secondary = {
        title: "설립배경 및 목적",
        link: "/introduction/goal"
    };

    useEffect(() => {
        fetch(goalDoc)
            .then(res => res.text())
            .then(text => setSource(text));
    }, []);

    return (
        <ContentHeader primary={primary} secondary={secondary}>
            <MarkdownViewer source={source}></MarkdownViewer>
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
                            <img alt="" src={res.image}></img>
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

export default function Introduction() {
    return (
        <ContentContainer>
            <Route exact path="/introduction" component={Greeting}></Route>
            <Route exact path="/introduction/greeting" component={Greeting}></Route>
            <Route exact path="/introduction/goal" component={Goal}></Route>
            <Route exact path="/introduction/researchers" component={Researchers}></Route>
        </ContentContainer>
    )
}
