import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';
import GeneralArticleWriter from './GeneralArticleWriter';

function Notices() {
    return (
        <ContentContainer currentPath={"/news/notices"}>
            <Switch>
                <Route exact path="/news/notices"
                    render={() => 
                        <GeneralArticleList
                            link="/news/notices"
                            kind="notices"
                        />}>
                </Route>
                <Route exact path="/news/notices/writer"
                    render={() => 
                        <GeneralArticleWriter
                            link="/news/notices"
                            kind="notices"
                        />}>
                </Route>
                <Route path="/news/notices/writer/:articleId"
                    render={(props) => 
                        <GeneralArticleWriter
                            {...props}
                            link="/news/notices"
                            kind="notices"
                        />}>
                </Route>
                <Route exact path="/news/notices/:articleId"
                    render={(props) => 
                        <GeneralArticleView 
                            {...props}
                            listLink="/news/notices"
                            kind="notices"
                        />}>
                </Route>
            </Switch>
        </ContentContainer>
    )
}

function SmartNews() {
    return (
        <ContentContainer currentPath={"/news/smart-news"}>
            <Switch>
                <Route exact path="/news/smart-news"
                    render={() => <GeneralArticleList link="/news/smart-news" kind="smart-news"></GeneralArticleList>}></Route>
                <Route exact path="/news/smart-news/writer"
                    render={() => <GeneralArticleWriter link="/news/smart-news" kind="smart-news"></GeneralArticleWriter>}></Route>
                <Route path="/news/smart-news/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} link="/news/smart-news" kind="smart-news"></GeneralArticleWriter>}></Route>
                <Route exact path="/news/smart-news/:articleId"
                    render={(props) => <GeneralArticleView {...props} listLink="/news/smart-news" kind="smart-news"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function Research() {
    return (
        <ContentContainer currentPath={"/news/research"}>
            <Switch>
                <Route exact path="/news/research"
                    render={() => <GeneralArticleList link="/news/research" kind="research"></GeneralArticleList>}></Route>
                <Route exact path="/news/research/writer"
                    render={() => <GeneralArticleWriter link="/news/research" kind="research"></GeneralArticleWriter>}></Route>
                <Route path="/news/research/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} link="/news/research" kind="research"></GeneralArticleWriter>}></Route>
                <Route exact path="/news/research/:articleId"
                    render={(props) => <GeneralArticleView {...props} listLink="/news/research" kind="research"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

export default function News() {
    return (
        <Switch>
            <Route path="/news/notices" component={Notices}></Route>
            <Route path="/news/smart-news" component={SmartNews}></Route>
            <Route path="/news/research" component={Research}></Route>
        </Switch>
    )
}
