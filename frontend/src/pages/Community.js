import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';
import GeneralArticleWriter from './GeneralArticleWriter';

function Seminar() {
    return (
        <ContentContainer currentPath={"/community/seminar"}>
            <Switch>
                <Route exact path="/community/seminar"
                    render={() => <GeneralArticleList superTitle="커뮤니티" title="세미나" link="/community/seminar" kind="seminar"></GeneralArticleList>}></Route>
                <Route exact path="/community/seminar/writer"
                    render={() => <GeneralArticleWriter superTitle="커뮤니티" pageTitle="세미나" link="/community/seminar" kind="seminar"></GeneralArticleWriter>}></Route>
                <Route path="/community/seminar/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="커뮤니티" pageTitle="세미나" link="/community/seminar" kind="seminar"></GeneralArticleWriter>}></Route>
                <Route exact path="/community/seminar/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="커뮤니티" title="세미나" listLink="/community/seminar" kind="seminar"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function Workshop() {
    return (
        <ContentContainer currentPath={"/community/workshop"}>
            <Switch>
                <Route exact path="/community/workshop"
                    render={() => <GeneralArticleList superTitle="커뮤니티" title="워크숍" link="/community/workshop" kind="workshop"></GeneralArticleList>}></Route>
                <Route exact path="/community/workshop/writer"
                    render={() => <GeneralArticleWriter superTitle="커뮤니티" pageTitle="워크숍" link="/community/workshop" kind="workshop"></GeneralArticleWriter>}></Route>
                <Route path="/community/workshop/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="커뮤니티" pageTitle="워크숍" link="/community/workshop" kind="workshop"></GeneralArticleWriter>}></Route>
                <Route exact path="/community/workshop/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="커뮤니티" title="워크숍" listLink="/community/workshop" kind="workshop"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function Readings() {
    return (
        <ContentContainer currentPath={"/community/readings"}>
            <Switch>
                <Route exact path="/community/readings"
                    render={() => <GeneralArticleList superTitle="커뮤니티" title="추천 도서" link="/community/readings" kind="readings"></GeneralArticleList>}></Route>
                <Route exact path="/community/readings/writer"
                    render={() => <GeneralArticleWriter superTitle="커뮤니티" pageTitle="추천 도서" link="/community/readings" kind="readings"></GeneralArticleWriter>}></Route>
                <Route path="/community/readings/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="커뮤니티" pageTitle="추천 도서" link="/community/readings" kind="readings"></GeneralArticleWriter>}></Route>
                <Route exact path="/community/readings/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="커뮤니티" title="추천 도서" listLink="/community/readings" kind="readings"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

export default function Community() {
    return (
        <Switch>
            <Route path="/community/seminar" component={Seminar}></Route>
            <Route path="/community/workshop" component={Workshop}></Route>
            <Route path="/community/readings" component={Readings}></Route>
        </Switch>
    )
}
