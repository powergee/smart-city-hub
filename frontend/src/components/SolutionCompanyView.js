import "./SolutionCompanyView.scss";

import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { DetailBox } from ".";

export default function SolutionCompanyView(props) {
  const { solutions, company } = props;

  return (
    <div className="solution-company-view">
      <Grid container>
        <Grid item xs={8}>
          <div className="c-name">{company.name}</div>
          <div className="c-name-eng">{company.nameEng}</div>
          <div className="c-info-container">
            <div className="c-info-item">
              <div>대표자</div>
              <div>{company.representative}</div>
            </div>
            <div className="c-info-item">
              <div>위치</div>
              <div>{company.location}</div>
            </div>
            <div className="c-info-item">
              <div>연락처</div>
              <div>{company.contact}</div>
            </div>
            <div className="c-info-item">
              <div>웹사이트</div>
              <div>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.website}
                </a>
              </div>
            </div>
          </div>
          <div>{company.summary}</div>
        </Grid>
        <Grid item xs={4}>
          <img className="c-logo" src={company.logo} alt="company" />
        </Grid>
      </Grid>
      <DetailBox height={300}>
        <div dangerouslySetInnerHTML={{ __html: company.detail }} />
      </DetailBox>
    </div>
  );
}
