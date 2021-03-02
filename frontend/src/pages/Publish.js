import { ButtonBase, Paper } from '@material-ui/core';
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { ContentContainer, ContentHeader } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';
import GeneralArticleWriter from './GeneralArticleWriter';
import "./Publish.scss"

function IssuePaper() {
    return (
        <ContentContainer currentPath={"/publish/issue-paper"}>
            <Switch>
                <Route exact path="/publish/issue-paper"
                    render={() => <GeneralArticleList superTitle="발간물" title="Issue Paper" link="/publish/issue-paper" kind="issue-paper"></GeneralArticleList>}></Route>
                <Route exact path="/publish/issue-paper/writer"
                    render={() => <GeneralArticleWriter superTitle="발간물" pageTitle="Issue Paper" link="/publish/issue-paper" kind="issue-paper"></GeneralArticleWriter>}></Route>
                <Route path="/publish/issue-paper/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="발간물" pageTitle="Issue Paper" link="/publish/issue-paper" kind="issue-paper"></GeneralArticleWriter>}></Route>
                <Route exact path="/publish/issue-paper/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="발간물" title="Issue Paper" listLink="/publish/issue-paper" kind="issue-paper"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function ArchSouthern() {
    return (
        <ContentContainer currentPath={"/publish/archive/southern"}>
            <Switch>
                <Route exact path="/publish/archive/southern"
                    render={() => <GeneralArticleList superTitle="발간물" title="신남방 보고서" link="/publish/archive/southern" kind="archive-southern"></GeneralArticleList>}></Route>
                <Route exact path="/publish/archive/southern/writer"
                    render={() => <GeneralArticleWriter superTitle="발간물" pageTitle="신남방 보고서" link="/publish/archive/southern" kind="archive-southern"></GeneralArticleWriter>}></Route>
                <Route path="/publish/archive/southern/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="발간물" pageTitle="신남방 보고서" link="/publish/archive/southern" kind="archive-southern"></GeneralArticleWriter>}></Route>
                <Route exact path="/publish/archive/southern/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="발간물" title="신남방 보고서" listLink="/publish/archive/southern" kind="archive-southern"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function ArchSmartCity() {
    return (
        <ContentContainer currentPath={"/publish/archive/smart"}>
            <Switch>
                <Route exact path="/publish/archive/smart"
                    render={() => <GeneralArticleList superTitle="발간물" title="스마트 시티 보고서" link="/publish/archive/smart" kind="archive-smart"></GeneralArticleList>}></Route>
                <Route exact path="/publish/archive/smart/writer"
                    render={() => <GeneralArticleWriter superTitle="발간물" pageTitle="스마트 시티 보고서" link="/publish/archive/smart" kind="archive-smart"></GeneralArticleWriter>}></Route>
                <Route path="/publish/archive/smart/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="발간물" pageTitle="스마트 시티 보고서" link="/publish/archive/smart" kind="archive-smart"></GeneralArticleWriter>}></Route>
                <Route exact path="/publish/archive/smart/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="발간물" title="스마트 시티 보고서" listLink="/publish/archive/smart" kind="archive-smart"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function ArchEtc() {
    return (
        <ContentContainer currentPath={"/publish/archive/etc"}>
            <Switch>
                <Route exact path="/publish/archive/etc"
                    render={() => <GeneralArticleList superTitle="발간물" title="기타 보고서" link="/publish/archive/etc" kind="archive-etc"></GeneralArticleList>}></Route>
                <Route exact path="/publish/archive/etc/writer"
                    render={() => <GeneralArticleWriter superTitle="발간물" pageTitle="기타 보고서" link="/publish/archive/etc" kind="archive-etc"></GeneralArticleWriter>}></Route>
                <Route path="/publish/archive/etc/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="발간물" pageTitle="기타 보고서" link="/publish/archive/etc" kind="archive-etc"></GeneralArticleWriter>}></Route>
                <Route exact path="/publish/archive/etc/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="발간물" title="기타 보고서" listLink="/publish/archive/etc" kind="archive-etc"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

export default function Publish() {
    return (
        <Switch>
            <Route path="/publish/issue-paper" component={IssuePaper}></Route>

            <Route exact path="/publish/archive" render={() => <Redirect to="/publish/archive/southern"/>}></Route>
            <Route path="/publish/archive/southern" component={ArchSouthern}></Route>
            <Route path="/publish/archive/smart" component={ArchSmartCity}></Route>
            <Route path="/publish/archive/etc" component={ArchEtc}></Route>
        </Switch>
    )
}