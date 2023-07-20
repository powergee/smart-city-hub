import React from "react";
import { Route, Switch } from "react-router-dom";
import { ContentContainer } from "../components";
import GeneralArticleList from "./GeneralArticleList";
import GeneralArticleView from "./GeneralArticleView";
import GeneralArticleWriter from "./GeneralArticleWriter";
import { useTranslation } from "react-i18next";
import "./Publish.scss";

import pubImage from "../images/page-pics/publish.jpeg";

function IssuePaper() {
  const { t } = useTranslation();

  return (
    <ContentContainer
      currentPath={"/publish/issue-paper"}
      title={t("발간물")}
      image={pubImage}
      imageOffset={0.5}
      subtitle="Issue Paper"
    >
      <Switch>
        <Route
          exact
          path="/publish/issue-paper"
          render={() => (
            <GeneralArticleList
              link="/publish/issue-paper"
              kind="issue-paper"
            />
          )}
        />
        <Route
          exact
          path="/publish/issue-paper/writer"
          render={() => (
            <GeneralArticleWriter
              link="/publish/issue-paper"
              kind="issue-paper"
            />
          )}
        />
        <Route
          path="/publish/issue-paper/writer/:articleId"
          render={(props) => (
            <GeneralArticleWriter
              {...props}
              link="/publish/issue-paper"
              kind="issue-paper"
            />
          )}
        />
        <Route
          exact
          path="/publish/issue-paper/:articleId"
          render={(props) => (
            <GeneralArticleView
              {...props}
              listLink="/publish/issue-paper"
              kind="issue-paper"
            />
          )}
        />
      </Switch>
    </ContentContainer>
  );
}

function ArchSouthern() {
  const { t } = useTranslation();

  return (
    <ContentContainer
      currentPath={"/publish/archive/southern"}
      title={t("발간물")}
      image={pubImage}
      imageOffset={0.5}
      description={t("신남방 & 스마트도시 기술 리포트")}
      subtitle={t("아카이브")}
    >
      <Switch>
        <Route
          exact
          path="/publish/archive"
          render={() => (
            <GeneralArticleList link="/publish/archive" kind="archive*" />
          )}
        />
        <Route
          exact
          path="/publish/archive/writer"
          render={() => (
            <GeneralArticleWriter link="/publish/archive" kind="archive" />
          )}
        />
        <Route
          path="/publish/archive/writer/:articleId"
          render={(props) => (
            <GeneralArticleWriter
              {...props}
              link="/publish/archive"
              kind="archive"
            />
          )}
        />
        <Route
          exact
          path="/publish/archive/:articleId"
          render={(props) => (
            <GeneralArticleView {...props} listLink="/publish/archive" />
          )}
        />
      </Switch>
    </ContentContainer>
  );
}

export default function Publish() {
  return (
    <Switch>
      <Route path="/publish/issue-paper" component={IssuePaper} />
      <Route path="/publish/archive" component={ArchSouthern} />
    </Switch>
  );
}
