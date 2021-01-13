import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';

function Seminar() {
    return (
        <ContentContainer>
            <Route exact path="/community/seminar"
                render={() => <GeneralArticleList superTitle="커뮤니티" title="세미나" link="/community/seminar" kind="seminar"></GeneralArticleList>}></Route>
            <Route exact path="/community/seminar/:articleId"
                render={(props) => <GeneralArticleView {...props} superTitle="커뮤니티" title="세미나" listLink="/community/seminar" kind="seminar"></GeneralArticleView>}></Route>
        </ContentContainer>
    )
}

function Workshop() {
    return (
        <ContentContainer>
            <Route exact path="/community/workshop"
                render={() => <GeneralArticleList superTitle="커뮤니티" title="워크숍" link="/community/workshop" kind="workshop"></GeneralArticleList>}></Route>
            <Route exact path="/community/workshop/:articleId"
                render={(props) => <GeneralArticleView {...props} superTitle="커뮤니티" title="워크숍" listLink="/community/workshop" kind="workshop"></GeneralArticleView>}></Route>
        </ContentContainer>
    )
}

function Readings() {
    return (
        <ContentContainer>
            <Route exact path="/community/readings"
                render={() => <GeneralArticleList superTitle="커뮤니티" title="추천 도서" link="/community/readings" kind="readings"></GeneralArticleList>}></Route>
            <Route exact path="/community/readings/:articleId"
                render={(props) => <GeneralArticleView {...props} superTitle="커뮤니티" title="추천 도서" listLink="/community/readings" kind="readings"></GeneralArticleView>}></Route>
        </ContentContainer>
    )
}

export default function Community() {
    return (
        <ContentContainer>
            <Route path="/community/seminar" component={Seminar}></Route>
            <Route path="/community/workshop" component={Workshop}></Route>
            <Route path="/community/readings" component={Readings}></Route>
        </ContentContainer>
    )
}
