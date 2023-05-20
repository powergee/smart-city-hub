import React, { useState, useEffect } from "react";

import {
  Checkbox,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import solutionCategories from "../solution-data/SolutionCategories";

export default function CategorySelector(props) {
  const { onChange } = props;
  const [checked, setChecked] = useState(null);
  const [collapsed, setCollapsed] = useState(null);

  useEffect(() => {
    // initialize checked state
    if (!checked) {
      const newChecked = {};
      solutionCategories.forEach((main) => {
        main.sub.forEach((sub) => {
          newChecked[sub.tag] = false;
        });
      });
      setChecked(newChecked);
    }

    // initialilze collapsed state
    if (!collapsed) {
      const newCollapsed = {};
      solutionCategories.forEach((main) => {
        newCollapsed[main.name] = true;
      });

      setCollapsed(newCollapsed);
    }
  }, []);

  useEffect(() => {
    // call onChange event when checked has been changed
    if (typeof onChange === "function") {
      onChange(checked);
    }
  }, [checked]);

  return (
    <List
      subheader={<ListSubheader>분류 선택</ListSubheader>}
      dense
      disablePadding
    >
      {checked &&
        solutionCategories.map((main) => {
          let orChecked = false;
          let andChecked = true;

          main.sub.forEach((sub) => {
            orChecked |= checked[sub.tag];
            andChecked &= checked[sub.tag];
          });

          return (
            <>
              <ListItem dense>
                <Checkbox
                  edge="start"
                  indeterminate={!andChecked && orChecked}
                  checked={andChecked}
                  onClick={() => {
                    const newChecked = { ...checked };
                    main.sub.forEach((sub) => {
                      newChecked[sub.tag] = !andChecked;
                    });
                    setChecked(newChecked);
                  }}
                />
                <ListItemText primary={main.name} />
                <IconButton
                  size="small"
                  onClick={() => {
                    const newCollapsed = { ...collapsed };
                    newCollapsed[main.name] = !newCollapsed[main.name];
                    setCollapsed(newCollapsed);
                  }}
                >
                  {collapsed[main.name] ? <ExpandMore /> : <ExpandLess />}
                </IconButton>
              </ListItem>
              <Collapse in={!collapsed[main.name]} timeout="auto">
                <List disablePadding>
                  {main.sub.map((sub) => (
                    <ListItem dense>
                      <Checkbox
                        size="small"
                        onClick={() => {
                          const newChecked = { ...checked };
                          newChecked[sub.tag] = !newChecked[sub.tag];
                          setChecked(newChecked);
                        }}
                        checked={checked[sub.tag]}
                      />
                      <ListItemText primary={sub.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </>
          );
        })}
    </List>
  );
}
