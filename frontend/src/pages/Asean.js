import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import CountryJson from "../asean-data/country.json";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { ContentContainer, AseanTable } from "../components";

function AseanTableView() {
  const countries = CountryJson;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>국가명</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((country, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Link to={`/asean/${index}`}>{country.name}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AseanTableSection() {
  const { countryIdx } = useParams();
  const countryData = CountryJson[countryIdx];
  console.log(`countryData: ${countryData.name}`);
  return <AseanTable data={countryData} />;
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
        <Route exact path="/asean" component={AseanTableView}></Route>
        <Route
          exact
          path="/asean/:countryIdx"
          component={AseanTableSection}
        ></Route>
      </Switch>
    </ContentContainer>
  );
}
