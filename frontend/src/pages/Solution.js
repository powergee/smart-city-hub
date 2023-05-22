import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import axios from "axios";

import { Paper, Grid } from "@material-ui/core";

import {
  ContentContainer,
  SolutionManager,
  SolutionCategorySelector,
  SolutionCompanyTable,
} from "../components";

function SolutionManagerPage() {
  return (
    <ContentContainer
      currentPath="/solution/company"
      title="스마트도시 솔루션"
      subtitle="Smart City Solution"
      description="솔루션 회사를 관리하는 페이지입니다."
    >
      <SolutionManager />
    </ContentContainer>
  );
}

function SolutionPage() {
  return (
    <ContentContainer
      currentPath="/solution"
      title="스마트도시 솔루션"
      subtitle="Smart City Solution"
      description="원하는 솔루션을 보유하고 있는 회사를 찾아보세요."
    >
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper>
            <SolutionCompanyTable />;
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <SolutionCategorySelector
              onChange={(categories) => {
                console.log(
                  Object.keys(categories)
                    .filter((key) => categories[key])
                    .join(",")
                );
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </ContentContainer>
  );
}

export default function Solution() {
  return (
    <Switch>
      <Route exact path="/solution/manager" component={SolutionManagerPage} />
      <Route exact path="/solution" component={SolutionPage} />
      <Route exact path="/solution/:id" />
    </Switch>
  );
}
