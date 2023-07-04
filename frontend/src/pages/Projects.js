import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ContentContainer,
  MarkdownViewer,
  ProjectTable,
  PreparingContents,
} from "../components";
import humanDoc from "../docs/인문사회연구소지원사업 개요.md";
import smartDoc from "../docs/스마트재난안전관련사업 개요.md";

import projImage from "../images/page-pics/projects.jpeg";

// 총괄 연구 & 사업
function Summary() {
  const { t } = useTranslation();

  let rows = t("data", { ns: "projects", returnObjects: true });
  for (let i = 0; i < rows.length; ++i) {
    rows[i].no = rows.length - i;
  }

  return (
    <ContentContainer
      currentPath="/projects/summary"
      image={projImage}
      imageOffset={0.7}
      title={t("연구 & 사업")}
      subtitle={t("총괄 연구 & 사업")}
    >
      <h2 className="projects-subtitle">{t("총괄 연구 & 사업")}</h2>
      <ProjectTable rows={rows} />
    </ContentContainer>
  );
}

// 인문사회연구소
function WithHumanism() {
  const { t } = useTranslation();
  const [source, setSource] = useState("");

  useEffect(() => {
    fetch(humanDoc)
      .then((res) => res.text())
      .then((text) => setSource(text));
  }, []);

  return (
    <ContentContainer
      currentPath="/projects/withhs"
      image={projImage}
      imageOffset={0.7}
      title={t("연구 & 사업")}
      subtitle={t("인문사회연구소")}
    >
      <MarkdownViewer source={source} />
    </ContentContainer>
  );
}

// 스마트재난안전
function SmartDisasterPrep() {
  const { t } = useTranslation();
  const [source, setSource] = useState("");

  useEffect(() => {
    fetch(smartDoc)
      .then((res) => res.text())
      .then((text) => setSource(text));
  }, []);

  return (
    <ContentContainer
      currentPath="/projects/smtdstpre"
      image={projImage}
      imageOffset={0.7}
      title={t("연구 & 사업")}
      subtitle={t("스마트재난안전")}
    >
      <MarkdownViewer source={source} />
    </ContentContainer>
  );
}

function EtcProjects() {
  const { t } = useTranslation();

  return (
    <ContentContainer
      currentPath="/projects/etc"
      image={projImage}
      imageOffset={0.7}
      title={t("연구 & 사업")}
      subtitle={t("기타")}
    >
      <PreparingContents />
    </ContentContainer>
  );
}

export default function Projects() {
  return (
    <Switch>
      <Route exact path="/projects" component={Summary}></Route>
      <Route exact path="/projects/summary" component={Summary}></Route>
      <Route exact path="/projects/withhs" component={WithHumanism}></Route>
      <Route
        exact
        path="/projects/smtdstpre"
        component={SmartDisasterPrep}
      ></Route>
      <Route exact path="/projects/etc" component={EtcProjects}></Route>
    </Switch>
  );
}
