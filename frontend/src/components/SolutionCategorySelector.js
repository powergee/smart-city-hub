import React, { useState } from "react";

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

import categorySolution from "../shared/CategorySolution";

export default function CategorySelector(props) {
  /**
   * `value`: An Array where checked categories are
   */
  const { value, onChange, ...restProps } = props;
  const [spread, setSpread] = useState({});

  /**
   * `checked`: An dictionary to store which category is checked
   */
  const checked =
    value?.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {}) || {};

  const invokeChange = (checked) => {
    if (typeof onChange === "function") {
      onChange(Object.keys(checked).filter((category) => checked[category]));
    }
  };

  return (
    <List
      subheader={<ListSubheader>분류 선택</ListSubheader>}
      dense
      disablePadding
      {...restProps}
    >
      {categorySolution.map((value) => {
        let orChecked = false;
        let andChecked = true;

        value.subs.forEach((sub) => {
          orChecked |= !!checked[sub];
          andChecked &= !!checked[sub];
        });

        return (
          <div key={value.main}>
            {/* main 카테고리 */}
            <ListItem dense>
              <Checkbox
                edge="start"
                indeterminate={!andChecked && orChecked}
                checked={andChecked}
                onClick={() => {
                  const newChecked = { ...checked };
                  value.subs.forEach((sub) => {
                    newChecked[sub] = !andChecked;
                  });

                  invokeChange(newChecked);
                }}
              />
              <ListItemText primary={value.main} />
              <IconButton
                size="small"
                onClick={() => {
                  const newSpread = { ...spread };
                  newSpread[value.main] = !newSpread[value.main];

                  setSpread(newSpread);
                }}
              >
                {spread[value.main] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            {/* sub 카테고리 */}
            <Collapse in={!!spread[value.main]} timeout="auto">
              <List disablePadding>
                {value.subs.map((sub) => (
                  <ListItem dense key={sub}>
                    <Checkbox
                      size="small"
                      onClick={() => {
                        const newChecked = { ...checked };
                        newChecked[sub] = !newChecked[sub];

                        invokeChange(newChecked);
                      }}
                      checked={!!checked[sub]}
                    />
                    <ListItemText primary={sub} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
}
