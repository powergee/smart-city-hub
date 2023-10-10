import { Paper, Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ContentContainer, MarkdownViewer } from "../components";
import goalDoc from "../docs/설립 배경 및 목적.md";
import goalDocEng from "../docs/Establishment Background and Purpose.md";
import "./Introduction.scss";

import introImage from "../images/page-pics/introduction.png";

import { useTranslation } from "react-i18next";

function Greeting() {
  const { t } = useTranslation();

  return (
    <ContentContainer
      currentPath={"/introduction/greeting"}
      image={introImage}
      title={t("센터소개")}
      subtitle={t("인사말")}
    >
      <div className="introduction-contents">
        <h3>{t("greeting.h3")}</h3>

        {t("greeting.jobs", { returnObjects: true }).map((j) => (
          <Paper variant="outlined" className="introduction-paper">
            <p>{j}</p>
          </Paper>
        ))}
      </div>
    </ContentContainer>
  );
}

function Goal() {
  const { t, i18n } = useTranslation();
  const [source, setSource] = useState("");

  useEffect(() => {
    let doc = goalDoc;
    if (i18n.resolvedLanguage === "en") {
      doc = goalDocEng;
    }

    fetch(doc)
      .then((res) => res.text())
      .then((text) => setSource(text));
  }, [i18n.resolvedLanguage]);

  return (
    <ContentContainer
      currentPath={"/introduction/goal"}
      image={introImage}
      title={t("센터소개")}
      subtitle={t("설립배경 및 목적")}
    >
      <MarkdownViewer source={source}></MarkdownViewer>
    </ContentContainer>
  );
}

function Researchers() {
  const [tab, setTab] = useState(0);
  const { t } = useTranslation();

  const Profile = ({ person }) => (
    <Paper variant="outlined" className="researchers-paper" key={person.name}>
      <Grid
        className="researchers-grid"
        container
        direction="row"
        alignItems="center"
      >
        <img alt={person.name} src={`/researcher-images/${person.name}.jpg`} />
        <Grid item>
          <h2>{person.name}</h2>
          <ul>
            {person.details.map((d) => (
              <li>{d}</li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <ContentContainer
      currentPath={"/introduction/researchers"}
      image={introImage}
      title={t("센터소개")}
      subtitle={t("연구진")}
    >
      <div className="researchers-tab-container">
        <Button
          size="large"
          variant="outlined"
          onClick={() => setTab(0)}
          disabled={0 === tab}
          color="primary"
        >
          {t("국제도시 및 인프라 연구센터")}
        </Button>
        <Button
          size="large"
          variant="outlined"
          onClick={() => setTab(1)}
          disabled={1 === tab}
          color="primary"
        >
          {t("인문사회연구소지원사업 참여 교수")}
        </Button>
      </div>
      <div style={{ display: tab === 0 ? "block" : "none" }}>
        {t("people", { ns: "researchers", returnObjects: true }).map((res) => (
          <Profile person={res} key={res.name} />
        ))}
      </div>
      <div style={{ display: tab === 1 ? "block" : "none" }}>
        {t("people", { ns: "professors", returnObjects: true }).map((res) => (
          <Profile person={res} key={res.name} />
        ))}
      </div>
    </ContentContainer>
  );
}

export default function Introduction() {
  return (
    <Switch>
      <Route exact path="/introduction" component={Greeting}></Route>
      <Route exact path="/introduction/greeting" component={Greeting}></Route>
      <Route exact path="/introduction/goal" component={Goal}></Route>
      <Route
        exact
        path="/introduction/researchers"
        component={Researchers}
      ></Route>
    </Switch>
  );
}
