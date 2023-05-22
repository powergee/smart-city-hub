import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import axios from "axios";

import { Paper, Grid } from "@material-ui/core";

import {
  ContentContainer,
  SolutionCategorySelector,
  SolutionCompanyTable,
  SolutionCompanyView,
} from "../components";

function SolutionPage() {
  const [company, setCompany] = useState(null);
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const companyId = searchParams.get("company");

  useEffect(() => {
    async function getCompany(id) {
      try {
        const res = await axios.get(`/v1/solutions/companies/${id}`);
        setCompany(res.data);
      } catch (err) {
        window.alert(err.message);
        setCompany(null);
      }
    }

    if (companyId) {
      getCompany(companyId);
    } else {
      setCompany(null);
    }
  }, [companyId]);

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
            {/* Left Section */}
            {company && <SolutionCompanyView data={company} />}
            <SolutionCompanyTable />;
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            {/* Right Section: Category Select Sidebar */}
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
      <Route exact path="/solution" component={SolutionPage} />
      <Route exact path="/solution/:id" />
    </Switch>
  );
}
