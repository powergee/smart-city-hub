import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';
import GeneralArticleWriter from './GeneralArticleWriter';

import newsImage from "../images/page-pics/news.jpeg";

function Notices() {
    return (
        <ContentContainer currentPath={"/news/notices"} image={newsImage} imageOffset={0.5} title="소식" description="지역연구 관련 정보제공" subtitle="공지사항">
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
        <ContentContainer currentPath={"/news/smart-news"} image={newsImage} imageOffset={0.5} title="소식" subtitle="스마트 뉴스">
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
        <ContentContainer currentPath={"/news/research"} image={newsImage} imageOffset={0.5} title="소식" description={"국제등재학술지 & 국내등재학술지"} subtitle="연구실적">
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
