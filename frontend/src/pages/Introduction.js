import { Paper, Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ContentContainer, MarkdownViewer } from "../components";
import { getGlobalRes, getProjectRes } from "../shared/Researchers.js";
import goalDoc from "../docs/설립 배경 및 목적.md";
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
      subtitle="인사말"
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
  const [source, setSource] = useState("");

  const sections = [
    {
      title: "센터소개",
      link: "/introduction",
    },
    {
      title: "설립배경 및 목적",
      link: "/introduction/goal",
    },
  ];

  useEffect(() => {
    fetch(goalDoc)
      .then((res) => res.text())
      .then((text) => setSource(text));
  }, []);

  return (
    <ContentContainer
      currentPath={sections[1].link}
      image={introImage}
      title="센터소개"
      subtitle="설립배경 및 목적"
    >
      <MarkdownViewer source={source}></MarkdownViewer>
    </ContentContainer>
  );
}

function Researchers() {
  const [tab, setTab] = useState(0);

  const sections = [
    {
      title: "센터소개",
      link: "/introduction",
    },
    {
      title: "연구진",
      link: "/introduction/researchers",
    },
  ];

  const globalRes = getGlobalRes();
  const projectRes = getProjectRes();

  return (
    <ContentContainer
      currentPath={sections[1].link}
      image={introImage}
      title="센터소개"
      subtitle="연구진"
    >
      <div className="researchers-tab-container">
        <Button
          size="large"
          variant="outlined"
          onClick={() => setTab(0)}
          disabled={0 === tab}
          color="primary"
        >
          국제도시 및 인프라 연구센터
        </Button>

        <Button
          size="large"
          variant="outlined"
          onClick={() => setTab(1)}
          disabled={1 === tab}
          color="primary"
        >
          인문사회연구소지원사업 참여 교수
        </Button>
      </div>
      <div style={{ display: tab === 0 ? "block" : "none" }}>
        {globalRes.map((res) => (
          <Paper variant="outlined" className="researchers-paper">
            <Grid
              className="researchers-grid"
              container
              direction="row"
              alignItems="center"
            >
              <img alt="" src={res.image}></img>
              <Grid item>
                <h2>{res.name}</h2>
                <ul>
                  {res.details.map((d) => (
                    <li>{d}</li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
      <div style={{ display: tab === 1 ? "block" : "none" }}>
        {projectRes.map((res) => (
          <Paper variant="outlined" className="researchers-paper">
            <Grid className="researchers-grid" container direction="row">
              <img alt="" src={res.image}></img>
              <Grid item>
                <h2>{res.name}</h2>
                <ul>
                  {res.details.map((d) => (
                    <li>{d}</li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </Paper>
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
