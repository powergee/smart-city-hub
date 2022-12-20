import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "./CompanyView.scss";

const makeListItemStyles = (styles) => {
  return makeStyles((theme) => ({
    listItemText: styles,
  }));
};

const useStyles = makeStyles({
  root: {
    height: 150,
  },
});

function CustomListItemText(props) {
  const { primary, secondary } = props;
  const primaryClasses = makeListItemStyles({ fontSize: "1.5rem" })();
  const secondaryClasses = makeListItemStyles({ fontSize: "1rem" })();
  return (
    <ListItemText
      primary={primary}
      secondary={secondary}
      classes={{
        primary: primaryClasses.listItemText,
        secondary: secondaryClasses.listItemText,
      }}
    />
  );
}

export default function CompanyView(props) {
  const { data, logo } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={9}>
          <h1 className="companyName" style={{ textAlign: "center" }}>
            {data.name}
          </h1>
        </Grid>
        <Grid item xs={3}>
          <img src={logo} alt="회사로고" style={{ width: "100%" }} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <List>
            <ListItem>
              <CustomListItemText primary="대표자" secondary={data.owner} />
            </ListItem>
            <ListItem>
              <CustomListItemText primary="주소" secondary={data.address} />
            </ListItem>
            <ListItem>
              <CustomListItemText primary="사이트" secondary={data.homepage} />
            </ListItem>
            <ListItem>
              <CustomListItemText primary="TEL/FAX" secondary={data.contact} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <div className="solutions-count-wrap">
            <div className="solutions-count">
              <div style={{ fontSize: "2rem" }}>솔루션 개수</div>
              <div style={{ fontSize: "4rem" }}>{data.solutions.length}</div>
            </div>
          </div>
        </Grid>
      </Grid>
      <div className="company-comment">{data.comment}</div>
      <h1 style={{ textAlign: "center" }}>스마트도시 솔루션</h1>
      <div className="solution-cardboard">
        {data.solutions.map((solution) => (
          <div className="solution-card">
            <Card>
              <CardActionArea className={classes.root}>
                <CardContent>
                  <Typography variant="h5">{solution.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {solution.introduction}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
