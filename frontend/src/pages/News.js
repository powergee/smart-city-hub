import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';

function Notices() {
    return (
        <ContentContainer currentPath={"/news/notices"}>
            <Route exact path="/news/notices"
                render={() => <GeneralArticleList superTitle="소식" title="공지사항" link="/news/notices" kind="notices"></GeneralArticleList>}></Route>
            <Route exact path="/news/notices/:articleId"
                render={(props) => <GeneralArticleView {...props} superTitle="소식" title="공지사항" listLink="/news/notices" kind="notices"></GeneralArticleView>}></Route>
        </ContentContainer>
    )
}

function Events() {
    return (
        <ContentContainer currentPath={"/news/events"}>
            <Route exact path="/news/events"
                render={() => <GeneralArticleList superTitle="소식" title="학술행사" link="/news/events" kind="events"></GeneralArticleList>}></Route>
            <Route exact path="/news/events/:articleId"
                render={(props) => <GeneralArticleView {...props} superTitle="소식" title="학술행사" listLink="/news/events" kind="events"></GeneralArticleView>}></Route>
        </ContentContainer>
    )
}

function SmartNews() {
    return (
        <ContentContainer currentPath={"/news/smart-news"}>
            <Route exact path="/news/smart-news"
                render={() => <GeneralArticleList superTitle="소식" title="스마트 뉴스" link="/news/smart-news" kind="smart-news"></GeneralArticleList>}></Route>
            <Route exact path="/news/smart-news/:articleId"
                render={(props) => <GeneralArticleView {...props} superTitle="소식" title="스마트 뉴스" listLink="/news/smart-news" kind="smart-news"></GeneralArticleView>}></Route>
        </ContentContainer>
    )
}

export default function News() {
    return (
        <Switch>
            <Route path="/news/notices" component={Notices}></Route>
            <Route path="/news/events" component={Events}></Route>
            <Route path="/news/smart-news" component={SmartNews}></Route>
        </Switch>
    )
}
