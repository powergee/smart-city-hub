import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./AseanTable.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function AseanTable(props) {
  const countryName = props.data.name;
  const contents = props.data.contents;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "overview"}
        onChange={handleChange("overview")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>국가개요</Typography>
          <Typography className={classes.secondaryHeading}>
            country overview
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ReactMarkdown
              className="markdown-body"
              remarkPlugins={[remarkGfm]}
            >
              {contents.overview}
            </ReactMarkdown>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "constTrends"}
        onChange={handleChange("constTrends")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="constTrendsbh-content"
          id="constTrendsbh-header"
        >
          <Typography className={classes.heading}>건설시장 동향</Typography>
          <Typography className={classes.secondaryHeading}>
            construction market trends
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ReactMarkdown
              className="markdown-body"
              remarkPlugins={[remarkGfm]}
            >
              {contents.constTrends}
            </ReactMarkdown>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "urbanTrends"}
        onChange={handleChange("urbanTrends")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="urbanTrendsbh-content"
          id="urbanTrendsbh-header"
        >
          <Typography className={classes.heading}>도시개발 동향</Typography>
          <Typography className={classes.secondaryHeading}>
            urban development trends
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{contents.urbanTrends}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "smartCityStatus"}
        onChange={handleChange("smartCityStatus")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="smartCityStatusbh-content"
          id="smartCityStatusbh-header"
        >
          <Typography className={classes.heading}>
            스마트도시 추진 현황
          </Typography>
          <Typography className={classes.secondaryHeading}>
            Smart City Promotion Status
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{contents.smartCityStatus}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "adoptionDemand"}
        onChange={handleChange("adoptionDemand")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="adoptionDemandbh-content"
          id="adoptionDemandbh-header"
        >
          <Typography className={classes.heading}>
            스마트도시 도입 수요
          </Typography>
          <Typography className={classes.secondaryHeading}>
            Demand for smart city adoption
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{contents.adoptionDemand}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "example"}
        onChange={handleChange("example")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="examplebh-content"
          id="examplebh-header"
        >
          <Typography className={classes.heading}>
            주요기관 스마트도시 참여 사례
          </Typography>
          <Typography className={classes.secondaryHeading}>
            Examples of Smart City Participation by Major Institutions
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{contents.example}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
