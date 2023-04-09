import React from "react";
import { Route, Switch, useHistory, useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Document, Page, pdfjs } from "react-pdf";

import { ContentContainer } from "../components";
import CountryData from "../asean-data/CountryData";
import "./Asean.scss";

// this js file in public directory
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function AseanSelector() {
  const history = useHistory();

  return (
    <div>
      <h2 className="asean-sub">아세안 국가 목록</h2>
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
    </div>
  );
}

function AseanDocumentAccordion(props) {
  const { title, subTitle, pdf, section, expandedDefault } = props;

  const [expanded, setExpanded] = React.useState(expandedDefault || false);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          <Grid item xs={4}>
            <Typography>{title}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography style={{ color: "#757575" }}>{subTitle}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Document file={pdf}>
          {section.map(([page, pageHeight], index) => (
            <div style={{ height: pageHeight || "unset", overflow: "hidden" }}>
              <Page key={index} pageNumber={page} width={980} />
            </div>
          ))}
        </Document>
      </AccordionDetails>
    </Accordion>
  );
}

function AseanView() {
  const { countryIdx } = useParams();
  const country = CountryData[countryIdx];

  return (
    <div className="asean-view">
      <h2 className="asean-sub">
        {country.name}
        <img
          className="asean-view-flag"
          src={country.flag}
          title={`${country.name} 국기`}
        />
        <div className="asean-view-name-sub">{country.nameEng}</div>
      </h2>
      <AseanDocumentAccordion
        title="국가개요"
        subTitle="Country Overview"
        pdf={country.pdf}
        section={country.sections.overview}
        expandedDefault
      />
      <AseanDocumentAccordion
        title="건설시장 동향"
        subTitle="Construction Market Trends"
        pdf={country.pdf}
        section={country.sections.constTrends}
      />
      <AseanDocumentAccordion
        title="도시개발 동향"
        subTitle="Urban Development Trends"
        pdf={country.pdf}
        section={country.sections.urbanTrends}
      />
      <AseanDocumentAccordion
        title="스마트도시 추진 현황"
        subTitle="Smart City Promotion Status"
        pdf={country.pdf}
        section={country.sections.smartCityStatus}
      />
      <AseanDocumentAccordion
        title="스마트도시 도입 수요"
        subTitle="Demand for Smart City Adoption"
        pdf={country.pdf}
        section={country.sections.adoptionDemand}
      />
      <AseanDocumentAccordion
        title="주요기관 스마트도시 참여 사례"
        subTitle="Examples of Smart City Participation by Major Institutions"
        pdf={country.pdf}
        section={country.sections.example}
      />
    </div>
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
        <Route exact path="/asean/:countryIdx" component={AseanView}></Route>
      </Switch>
    </ContentContainer>
  );
}
