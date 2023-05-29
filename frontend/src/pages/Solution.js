import "./Solution.scss";

import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useLocation,
  useHistory,
  useParams,
} from "react-router-dom";
import axios from "axios";

import { Paper, Grid } from "@material-ui/core";

import {
  ContentContainer,
  SolutionCategorySelector,
  SolutionCompanyTable,
  SolutionCompanyView,
  SolutionView,
} from "../components";

import { updateCategoryTag } from "../shared/LocalStorage";

function SolutionCompanyPage() {
  const [categoryTag, setCategoryTag] = useState(null);
  const [solutionCompany, setSolutionCompany] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (!categoryTag) {
      setCategoryTag(updateCategoryTag());
    }
  }, []);

  useEffect(() => {
    async function getSolutionCompany(tag) {
      const res = await axios.post("/v1/solutions/cat2com", tag);
      setSolutionCompany(res.data);
    }

    updateCategoryTag(categoryTag);
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
          <div className="left-section">
            {company && (
              <SolutionCompanyView
                company={company}
                solutions={
                  solutionCompany.find(
                    (item) => item.company._id === company._id
                  )?.solutions
                }
                solutionPath={(item) => `/solution/${item._id}`}
              />
            )}
            <Paper>
              <SolutionCompanyTable
                data={solutionCompany}
                href={(id) => `?companyId=${id}`}
                onClick={(item) => {
                  history.push(`?companyId=${item.company._id}`);
                }}
              />
            </Paper>
          </div>
        </Grid>
        <Grid item xs={3}>
          {/* Right Section: Category Select Sidebar */}
          <Paper className="right-section">
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

function SolutionPage(props) {
  const { id } = useParams();
  const [solution, setSolution] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getSolution(id) {
      const res = await axios.get(`/v1/solutions/${id}`);
      setSolution(res.data);
    }

    id && getSolution(id);
  }, [id]);

  useEffect(() => {
    async function getCompany(id) {
      const res = await axios.get(`/v1/solutions/companies/${id}?detail=false`);
      setCompany(res.data);
    }

    solution && getCompany(solution.companyId);
  }, [solution]);

  return (
    <ContentContainer
      currentPath="/solution/:id"
      title="스마트도시 솔루션"
      subtitle="Smart City Solution"
    >
      <SolutionView solution={solution} company={company} />
    </ContentContainer>
  );
}

export default function Solution() {
  return (
    <Switch>
      <Route exact path="/solution" component={SolutionCompanyPage} />
      <Route exact path="/solution/:id" component={SolutionPage} />
    </Switch>
  );
}
