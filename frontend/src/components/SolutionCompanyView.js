import "./SolutionCompanyView.scss";

import React from "react";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Badge,
} from "@material-ui/core";
import { DetailBox } from ".";

function SolutionCards(props) {
  const { solutions, col, solutionPath } = props;
  const row = Math.ceil(solutions.length / col);

  const history = useHistory();

  const rows = [];
  for (let i = 0; i < row; i++) {
    const cols = [];

    for (let j = 0; j < col; j++) {
      const index = i * col + j;

      if (solutions.length < index + 1) {
        break;
      }

      const solution = solutions[index];

      cols.push(
        <Grid item xs={Math.floor(12 / col)}>
          <Card variant="outlined">
            <CardMedia
              title="solution"
              image="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              style={{ height: 160 }}
            />
            <CardContent>
              <Typography variant="h6" component="h6">
                {solution.title}
              </Typography>
              <Typography color="textSecondary">{solution.summary}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  history.push(solutionPath(solution));
                }}
              >
                자세히 보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    }

    rows.push(
      <Grid container spacing={2}>
        {cols}
      </Grid>
    );
  }

  return <div>{rows}</div>;
}

export default function SolutionCompanyView(props) {
  const { solutions, company, solutionPath } = props;

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
      {solutions && (
        <div>
          <Badge color="secondary" badgeContent={solutions.length}>
            <Typography
              variant="h5"
              component="h5"
              style={{ fontWeight: "bold", marginBottom: "16px" }}
            >
              보유 솔루션
            </Typography>
          </Badge>
          <SolutionCards
            solutions={solutions}
            col={3}
            solutionPath={solutionPath}
          />
        </div>
      )}
    </div>
  );
}
