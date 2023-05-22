import React from "react";
import { Grid } from "@material-ui/core";

export default function SolutionCompanyView(props) {
  const { data } = props;

  return (
    <div className="solution-company-view">
      <Grid container>
        <Grid item xs={6}>
          <div className="section-info">
            <div className="c-name">{data.name}</div>
            <div className="c-name-eng">{data.nameEng}</div>
            <div className="">대표자: {data.representative}</div>
            <div className="">위치: {data.location}</div>
            <div className="">연락처: {data.contact}</div>
            <div className="">웹사이트: {data.website}</div>
            <div className="">{data.summary}</div>
          </div>
        </Grid>
        <Grid item xs={6}>
          회사 로고 및 솔루션 보유 개수
        </Grid>
      </Grid>
      <div dangerouslySetInnerHTML={{ __html: data.detail }} />
    </div>
  );
}
