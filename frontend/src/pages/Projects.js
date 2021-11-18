import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer, MarkdownViewer, ProjectTable, PreparingContents } from "../components"
import projList from "../shared/ProjectList.json"
import humanDoc from "../docs/인문사회연구소지원사업 개요.md"
import smartDoc from "../docs/스마트재난안전관련사업 개요.md"

import projImage from "../images/page-pics/projects.jpeg";

// 총괄 연구 & 사업
function Summary() {
    const sections = [
        {
            title: "연구 & 사업",
            link: "/projects"
        },
        {
            title: "총괄 연구 & 사업",
            link: "/projects/summary"
        },
    ];

    let rows = projList;

    for (let i = 0; i < rows.length; ++i)
        rows[i].no = rows.length - i;

    return (
        <ContentContainer currentPath={sections[1].link} image={projImage} imageOffset={0.7} title={"연구 & 사업"} subtitle={"총괄 연구 & 사업"}>
            <h2 className="projects-subtitle">총괄 연구 & 사업</h2>
            <ProjectTable rows={rows}></ProjectTable>
        </ContentContainer>
    )
}

// 인문사회연구소
function WithHumanism() {
    const [source, setSource] = useState("");

    const sections = [
        {
            title: "연구 & 사업",
            link: "/projects"
        },
        {
            title: "인문사회연구소",
            link: "/projects/withhs"
        }
    ];

    useEffect(() => {
        fetch(humanDoc)
            .then(res => res.text())
            .then(text => setSource(text));
    }, []);

    return (
        <ContentContainer currentPath={sections[1].link} image={projImage} imageOffset={0.7} title={"연구 & 사업"} subtitle="인문사회연구소">
            <MarkdownViewer source={source}></MarkdownViewer>
        </ContentContainer>
    )
}

// 스마트재난안전
function SmartDisasterPrep() {
    const [source, setSource] = useState("");

    const sections = [
        {
            title: "연구 & 사업",
            link: "/projects"
        },
        {
            title: "스마트재난안전",
            link: "/projects/smtdstpre"
        }
    ];

    useEffect(() => {
        fetch(smartDoc)
            .then(res => res.text())
            .then(text => setSource(text));
    }, []);

    return (
        <ContentContainer currentPath={sections[1].link} image={projImage} imageOffset={0.7} title={"연구 & 사업"} subtitle="스마트재난안전">
            <MarkdownViewer source={source}></MarkdownViewer>
        </ContentContainer>
    )
}

function EtcProjects() {
    const sections = [
        {
            title: "연구 & 사업",
            link: "/projects"
        },
        {
            title: "기타",
            link: "/projects/etc"
        }
    ];

    return (
        <ContentContainer currentPath={sections[1].link} image={projImage} imageOffset={0.7} title={"연구 & 사업"} subtitle="기타">
            <PreparingContents></PreparingContents>
        </ContentContainer>
    )
}

export default function Projects() {
    return (
        <Switch>
            <Route exact path="/projects" component={Summary}></Route>
            <Route exact path="/projects/summary" component={Summary}></Route>
            <Route exact path="/projects/withhs" component={WithHumanism}></Route>
            <Route exact path="/projects/smtdstpre" component={SmartDisasterPrep}></Route>
            <Route exact path="/projects/etc" component={EtcProjects}></Route>
        </Switch>
    )
}
