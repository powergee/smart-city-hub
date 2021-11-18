import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';
import GeneralArticleWriter from './GeneralArticleWriter';
import "./Publish.scss"

import pubImage from "../images/page-pics/publish.jpeg";

function IssuePaper() {
    return (
        <ContentContainer currentPath={"/publish/issue-paper"} title="발간물" image={pubImage} imageOffset={0.5} subtitle="Issue Paper">
            <Switch>
                <Route exact path="/publish/issue-paper"
                    render={() => <GeneralArticleList link="/publish/issue-paper" kind="issue-paper"></GeneralArticleList>}></Route>
                <Route exact path="/publish/issue-paper/writer"
                    render={() => <GeneralArticleWriter link="/publish/issue-paper" kind="issue-paper"></GeneralArticleWriter>}></Route>
                <Route path="/publish/issue-paper/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} link="/publish/issue-paper" kind="issue-paper"></GeneralArticleWriter>}></Route>
                <Route exact path="/publish/issue-paper/:articleId"
                    render={(props) => <GeneralArticleView {...props} listLink="/publish/issue-paper" kind="issue-paper"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function ArchSouthern() {
    return (
        <ContentContainer currentPath={"/publish/archive/southern"} title="발간물" image={pubImage} imageOffset={0.5} description={"신남방 & 스마트도시 기술 리포트"} subtitle="아카이브">
            <Switch>
                <Route exact path="/publish/archive"
                    render={() => <GeneralArticleList link="/publish/archive" kind="archive*"></GeneralArticleList>}></Route>
                <Route exact path="/publish/archive/writer"
                    render={() => <GeneralArticleWriter link="/publish/archive" kind="archive"></GeneralArticleWriter>}></Route>
                <Route path="/publish/archive/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} link="/publish/archive" kind="archive"></GeneralArticleWriter>}></Route>
                <Route exact path="/publish/archive/:articleId"
                    render={(props) => <GeneralArticleView {...props} listLink="/publish/archive"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

export default function Publish() {
    return (
        <Switch>
            <Route path="/publish/issue-paper" component={IssuePaper}></Route>
            <Route path="/publish/archive" component={ArchSouthern}></Route>
        </Switch>
    )
}