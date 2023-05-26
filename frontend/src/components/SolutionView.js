import "./SolutionView.scss";

import React from "react";
import { Grid, Card } from "@material-ui/core";

export default function SolutionView(props) {
  const { solution, company } = props;

  return (
    solution && (
      <div className="solution-view">
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Card variant="outlined">
              <img src={solution.mainImage} style={{ width: "100%" }} />
            </Card>
          </Grid>
          <Grid item xs={8}>
            <div className="s-title">{solution.title}</div>
            <div className="s-summary">{solution.summary}</div>
            <div className="s-category-container">
              {solution.categoryTag.map((item) => (
                <div className="s-category">{item}</div>
              ))}
            </div>
            {company && (
              <Card variant="outlined" className="s-company">
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <img src={company.logo} style={{ width: "100%" }} />
                  </Grid>
                  <Grid item xs={9}>
                    <div className="sc-name">{company.name}</div>
                    <div className="sc-nameEng">{company.nameEng}</div>
                    <div>연락처: {company.contact}</div>
                    <div>홈페이지: {company.website}</div>
                    <div>위치: {company.location}</div>
                    <div>대표: {company.representative}</div>
                  </Grid>
                </Grid>
              </Card>
            )}
          </Grid>
        </Grid>
        <div
          className="s-detail"
          dangerouslySetInnerHTML={{ __html: solution.detail }}
        />
      </div>
    )
  );
}
