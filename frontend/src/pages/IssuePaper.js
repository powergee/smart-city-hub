import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer } from "../components"
import GeneralArticleList from './GeneralArticleList';
import GeneralArticleView from './GeneralArticleView';
import GeneralArticleWriter from './GeneralArticleWriter';

export default function IssuePaper() {
    return (
        <ContentContainer currentPath={"/issue-paper"}>
            <Switch>
                <Route exact path="/issue-paper"
                    render={() => <GeneralArticleList superTitle="Issue Paper" title="Issue Paper" link="/issue-paper" kind="issue-paper"></GeneralArticleList>}></Route>
                <Route exact path="/issue-paper/writer"
                    render={() => <GeneralArticleWriter superTitle="Issue Paper" title="Issue Paper" link="/issue-paper" kind="issue-paper"></GeneralArticleWriter>}></Route>
                <Route exact path="/issue-paper/:articleId"
                    render={(props) => <GeneralArticleView {...props} superTitle="Issue Paper" title="Issue Paper" listLink="/issue-paper" kind="issue-paper"></GeneralArticleView>}></Route>
            </Switch>
        </ContentContainer>
    )
}
