import { Paper, Grid } from '@material-ui/core';
import React from 'react'
import { Route } from 'react-router-dom';
import { ContentContainer, ContentHeader, MarkdownViewer, ProjectTable } from "../components"

// 총괄 사업
function Summary() {
    const primary = {
        title: "주요 사업",
        link: "/projects"
    };

    const secondary = {
        title: "총괄 사업",
        link: "/projects/summary"
    };

    return (
        <ContentHeader primary={primary} secondary={secondary}>
        </ContentHeader>
    )
}

// 인문사회연구소 지원 사업
function WithHumanism() {
    const primary = {
        title: "주요 사업",
        link: "/projects"
    };

    const secondary = {
        title: "인문사회연구소 지원 사업",
        link: "/projects/withhs"
    };

    return (
        <ContentHeader primary={primary} secondary={secondary}>
        </ContentHeader>
    )
}

// 스마트 재난안전 관련 사업
function SmartDisasterPrep() {
    const primary = {
        title: "주요 사업",
        link: "/projects"
    };

    const secondary = {
        title: "스마트 재난안전 관련 사업",
        link: "/projects/smtdstpre"
    };

    return (
        <ContentHeader primary={primary} secondary={secondary}>
        </ContentHeader>
    )
}

function EtcProjects() {
    const primary = {
        title: "주요 사업",
        link: "/projects"
    };

    const secondary = {
        title: "기타 사업",
        link: "/projects/etc"
    };

    return (
        <ContentHeader primary={primary} secondary={secondary}>
        </ContentHeader>
    )
}

export default function Projects() {
    return (
        <ContentContainer>
            <Route exact path="/projects" component={Summary}></Route>
            <Route exact path="/projects/summary" component={Summary}></Route>
            <Route exact path="/projects/withhs" component={WithHumanism}></Route>
            <Route exact path="/projects/smtdstpre" component={SmartDisasterPrep}></Route>
            <Route exact path="/projects/etc" component={EtcProjects}></Route>
        </ContentContainer>
    )
}
