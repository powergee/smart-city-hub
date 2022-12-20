import React from "react";
import "./Solution.scss";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import SolutionNavigationBar from "../components/SolutionNavigationBar";
import SolutionTable from "../components/SolutionTable";
import CompanyView from "../components/CompanyView";

import CompaniesJson from "../solution-data/companies.json";
import CompanyLogos from "../solution-data/CompanyLogos";

function SolutionTableSection(props) {
  const { main, middle } = useParams();
  const companies = [];

  for (let i = 0; i < CompaniesJson.length; i++) {
    for (let j = 0; j < CompaniesJson[i].solutions.length; j++) {
      if (
        CompaniesJson[i].solutions[j].mainCategory == main &&
        CompaniesJson[i].solutions[j].middleCategories == middle
      ) {
        companies.push({ ...CompaniesJson[i], absoluteIndex: i });
        break;
      }
    }
  }

  return <SolutionTable data={companies} />;
}

function SolutionMainSection(props) {
  const main = 0;
  const middle = 0;
  const companies = [];

  for (let i = 0; i < CompaniesJson.length; i++) {
    for (let j = 0; j < CompaniesJson[i].solutions.length; j++) {
      if (
        CompaniesJson[i].solutions[j].mainCategory == main &&
        CompaniesJson[i].solutions[j].middleCategories == middle
      ) {
        companies.push({ ...CompaniesJson[i], absoluteIndex: i });
        break;
      }
    }
  }

  return <SolutionTable data={companies} />;
}

function CompanyViewSection(props) {
  const { companyIdx } = useParams();
  const companyData = CompaniesJson[companyIdx];
  const companyLogo = CompanyLogos[companyIdx];

  return companyData ? (
    <CompanyView data={companyData} logo={companyLogo} />
  ) : (
    <div>회사 정보가 없습니다</div>
  );
}

export default function Solution() {
  const { path } = useRouteMatch();

  return (
    <div className="solution-container">
      <div className="solution-root">
        <div className="content-left">
          <SolutionNavigationBar />
        </div>
        <div className="content-right">
          <Switch>
            <Route exact path={`${path}`} component={SolutionMainSection} />
            <Route
              path={`${path}/list/:main/:middle`}
              component={SolutionTableSection}
            />
            <Route
              path={`${path}/:companyIdx`}
              component={CompanyViewSection}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
