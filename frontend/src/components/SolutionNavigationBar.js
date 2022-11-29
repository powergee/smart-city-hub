import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link, useRouteMatch } from "react-router-dom";

import CategoriesJson from "../solution-data/categories.json";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid #d1d1d1",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function CategoryListItem(props) {
  const { data, locator } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const { url } = useRouteMatch();

  return (
    <>
      <ListItem button onClick={handleClick} className={classes.root}>
        <ListItemText primary={data.mainCategory} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {data.middleCategories.map((cate, idx) => (
            <ListItem
              component={Link}
              to={`${url}/list/${locator}/${idx}`}
              button
              className={classes.nested}
            >
              <ListItemText primary={cate} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default function SolutionNavigationBar() {
  return (
    <List component="nav">
      {CategoriesJson.map((data, index) => (
        <CategoryListItem data={data} locator={index} />
      ))}
    </List>
  );
}
