import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';
import GeneralArticleWriter from './GeneralArticleWriter';

import commImage from "../images/page-pics/community.jpeg";

function Seminar() {
    return (
        <ContentContainer currentPath={"/community/seminar"} image={commImage} imageOffset={0.35} title="커뮤니티" description="정부·민간기업 등 대상 설명회" subtitle="세미나">
            <Switch>
                <Route exact path="/community/seminar"
                    render={() => <GeneralArticleList link="/community/seminar" kind="seminar"></GeneralArticleList>}></Route>
                <Route exact path="/community/seminar/writer"
                    render={() => <GeneralArticleWriter link="/community/seminar" kind="seminar"></GeneralArticleWriter>}></Route>
                <Route path="/community/seminar/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} link="/community/seminar" kind="seminar"></GeneralArticleWriter>}></Route>
                <Route exact path="/community/seminar/:articleId"
                    render={(props) => <GeneralArticleView {...props} listLink="/community/seminar" kind="seminar"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function Workshop() {
    return (
        <ContentContainer currentPath={"/community/workshop"} image={commImage} imageOffset={0.35} title="커뮤니티" description="기관 및 기업 소개">
            <Switch>
                <Route exact path="/community/workshop"
                    render={() => <GeneralArticleList link="/community/workshop" kind="workshop"></GeneralArticleList>}></Route>
                <Route exact path="/community/workshop/writer"
                    render={() => <GeneralArticleWriter link="/community/workshop" kind="workshop"></GeneralArticleWriter>}></Route>
                <Route path="/community/workshop/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} link="/community/workshop" kind="workshop"></GeneralArticleWriter>}></Route>
                <Route exact path="/community/workshop/:articleId"
                    render={(props) => <GeneralArticleView {...props} listLink="/community/workshop" kind="workshop"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

export default function Community() {
    return (
        <Switch>
            <Route path="/community/seminar" component={Seminar}></Route>
            <Route path="/community/workshop" component={Workshop}></Route>
        </Switch>
    )
}
