import React from "react";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import CountryData from "../asean-data/CountryData";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { ContentContainer, AseanTable } from "../components";
import Grid from "@material-ui/core/Grid";
import "./Asean.scss";

function AseanNavigator() {
  const { countryIdx } = useParams();
  const data = CountryData[countryIdx];
  return <AseanTable data={data} />;
}

function AseanSelector() {
  const history = useHistory();

  return (
    <Grid className="asean-selector-container" container spacing={2}>
      {CountryData.map((country, index) => (
        <Grid item className="asean-selector-item">
          <Card>
            <CardActionArea onClick={() => history.push(`/asean/${index}`)}>
              <img
                style={{ width: "100%" }}
                src={country.flag}
                title={`${country.name} 국기`}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {country.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="div"
                >
                  {country.nameEng}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default function Asean() {
  return (
    <ContentContainer
      currentPath="/asean"
      title="스마트시티 네크워크"
      description="아래 목록에서 원하시는 국가를 선택해주세요."
      subtitle="Smart City Network"
    >
      <Switch>
        <Route exact path="/asean" component={AseanSelector}></Route>
        <Route
          exact
          path="/asean/:countryIdx"
          component={AseanNavigator}
        ></Route>
      </Switch>
    </ContentContainer>
  );
}
