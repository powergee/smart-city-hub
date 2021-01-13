import React from 'react'
import { Route } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';

export default function IssuePaper() {
    return (
        <ContentContainer>
            <Route exact path="/issue-paper"
                render={() => <GeneralArticleList title="Issue Paper" link="/issue-paper" kind="issue-paper"></GeneralArticleList>}></Route>
            <Route exact path="/issue-paper/:articleId"
                render={(props) => <GeneralArticleView {...props} title="Issue Paper" listLink="/issue-paper" kind="issue-paper"></GeneralArticleView>}></Route>
        </ContentContainer>
    )
}
