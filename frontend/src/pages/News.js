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
                            superTitle="소식"
                            superCaption="지역연구 관련 정보제공"
                            title="공지사항"
                            link="/news/notices"
                            kind="notices"
                        />}>
                </Route>
                <Route exact path="/news/notices/writer"
                    render={() => 
                        <GeneralArticleWriter
                            superTitle="소식"
                            superCaption="지역연구 관련 정보제공"
                            pageTitle="공지사항"
                            link="/news/notices"
                            kind="notices"
                        />}>
                </Route>
                <Route path="/news/notices/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="소식" superCaption="지역연구 관련 정보제공" pageTitle="공지사항" link="/news/notices" kind="notices"></GeneralArticleWriter>}></Route>
                <Route exact path="/news/notices/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="소식" superCaption="지역연구 관련 정보제공" title="공지사항" listLink="/news/notices" kind="notices"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

function SmartNews() {
    return (
        <ContentContainer currentPath={"/news/smart-news"}>
            <Switch>
                <Route exact path="/news/smart-news"
                    render={() => <GeneralArticleList superTitle="소식" title="스마트 뉴스" link="/news/smart-news" kind="smart-news"></GeneralArticleList>}></Route>
                <Route exact path="/news/smart-news/writer"
                    render={() => <GeneralArticleWriter superTitle="소식" pageTitle="스마트 뉴스" link="/news/smart-news" kind="smart-news"></GeneralArticleWriter>}></Route>
                <Route path="/news/smart-news/writer/:articleId"
                    render={(props) => <GeneralArticleWriter {...props} superTitle="소식" pageTitle="스마트 뉴스" link="/news/smart-news" kind="smart-news"></GeneralArticleWriter>}></Route>
                <Route exact path="/news/smart-news/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="소식" title="스마트 뉴스" listLink="/news/smart-news" kind="smart-news"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}

export default function News() {
    return (
        <Switch>
            <Route path="/news/notices" component={Notices}></Route>
            <Route path="/news/smart-news" component={SmartNews}></Route>
        </Switch>
    )
}
