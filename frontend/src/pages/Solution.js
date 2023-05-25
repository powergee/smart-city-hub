import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import axios from "axios";

import { Paper, Grid } from "@material-ui/core";

import {
  ContentContainer,
  SolutionCategorySelector,
  SolutionCompanyTable,
  SolutionCompanyView,
} from "../components";

function SolutionPage() {
  const [categoryTag, setCategoryTag] = useState([]);
  const [solutionCompany, setSolutionCompany] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getSolutionCompany(tag) {
      const res = await axios.post("/v1/solutions/cat2com", tag);
      setSolutionCompany(res.data);
    }

    getSolutionCompany(categoryTag);
  }, [categoryTag]);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const companyId = searchParams.get("companyId");

  useEffect(() => {
    async function getCompany(id) {
      const res = await axios.get(`/v1/solutions/companies/${id}`);
      setCompany(res.data);
    }

    if (companyId && companyId !== "") {
      getCompany(companyId);
    }
  }, [companyId]);

  const history = useHistory();

  return (
    <ContentContainer
      currentPath="/solution"
      title="스마트도시 솔루션"
      subtitle="Smart City Solution"
      description="원하는 솔루션을 보유하고 있는 회사를 찾아보세요."
    >
      <Grid container spacing={3}>
        <Grid item xs={9}>
          {/* Left Section */}
          <Paper>
            {company && <SolutionCompanyView data={company} />}
            <SolutionCompanyTable
              data={solutionCompany}
              href={(id) => `?companyId=${id}`}
              onClick={(item) => {
                history.push(`?companyId=${item.company._id}`);
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          {/* Right Section: Category Select Sidebar */}
          <Paper>
            <SolutionCategorySelector
              value={categoryTag}
              onChange={(value) => setCategoryTag(value)}
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
