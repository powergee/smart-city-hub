import React from "react";
import { Route, Switch } from "react-router-dom";
import { ContentContainer } from "../components";
import GeneralArticleList from "./GeneralArticleList";
import GeneralArticleView from "./GeneralArticleView";
import GeneralArticleWriter from "./GeneralArticleWriter";

import commImage from "../images/page-pics/community.jpeg";
import { useTranslation } from "react-i18next";

function Seminar() {
  const { t } = useTranslation();

  return (
    <ContentContainer
      currentPath={"/community/seminar"}
      image={commImage}
      imageOffset={0.35}
      title={t("커뮤니티")}
      description="정부·민간기업 등 대상 설명회"
      subtitle={t("세미나")}
    >
      <Switch>
        <Route
          exact
          path="/community/seminar"
          render={() => (
            <GeneralArticleList link="/community/seminar" kind="seminar" />
          )}
        />
        <Route
          exact
          path="/community/seminar/writer"
          render={() => (
            <GeneralArticleWriter link="/community/seminar" kind="seminar" />
          )}
        />
        <Route
          path="/community/seminar/writer/:articleId"
          render={(props) => (
            <GeneralArticleWriter
              {...props}
              link="/community/seminar"
              kind="seminar"
            />
          )}
        />
        <Route
          exact
          path="/community/seminar/:articleId"
          render={(props) => (
            <GeneralArticleView
              {...props}
              listLink="/community/seminar"
              kind="seminar"
            />
          )}
        />
      </Switch>
    </ContentContainer>
  );
}

function Workshop() {
  const { t } = useTranslation();

  return (
    <ContentContainer
      currentPath={"/community/workshop"}
      image={commImage}
      imageOffset={0.35}
      title={t("커뮤니티")}
      subtitle={t("기관 및 기업 소개")}
    >
      <Switch>
        <Route
          exact
          path="/community/workshop"
          render={() => (
            <GeneralArticleList link="/community/workshop" kind="workshop" />
          )}
        />
        <Route
          exact
          path="/community/workshop/writer"
          render={() => (
            <GeneralArticleWriter link="/community/workshop" kind="workshop" />
          )}
        />
        <Route
          path="/community/workshop/writer/:articleId"
          render={(props) => (
            <GeneralArticleWriter
              {...props}
              link="/community/workshop"
              kind="workshop"
            />
          )}
        />
        <Route
          exact
          path="/community/workshop/:articleId"
          render={(props) => (
            <GeneralArticleView
              {...props}
              listLink="/community/workshop"
              kind="workshop"
            />
          )}
        />
      </Switch>
    </ContentContainer>
  );
}

export default function Community() {
  return (
    <Switch>
      <Route path="/community/seminar" component={Seminar} />
      <Route path="/community/workshop" component={Workshop} />
    </Switch>
  );
}
