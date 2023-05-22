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

import categorySolution from "../shared/CategorySolution";

export default function CategorySelector(props) {
  const { onChange, ...restProps } = props;
  const [checked, setChecked] = useState(null);
  const [collapsed, setCollapsed] = useState(null);

  useEffect(() => {
    // initialize checked state
    if (!checked) {
      const newChecked = {};
      categorySolution.forEach((item) => {
        item.subs.forEach((sub) => {
          newChecked[sub] = false;
        });
      });

      setChecked(newChecked);
    }

    // initialilze collapsed state
    if (!collapsed) {
      const newCollapsed = {};
      categorySolution.forEach((item) => {
        newCollapsed[item.main] = true;
      });

      setCollapsed(newCollapsed);
    }
  }, []);

  useEffect(() => {
    // checked 상태가 변경되면 onChange 이벤트 호출
    if (typeof onChange === "function") {
      checked && onChange(checked);
    }
  }, [checked]);

  return (
    <List
      subheader={<ListSubheader>분류 선택</ListSubheader>}
      dense
      disablePadding
      {...restProps}
    >
      {checked &&
        categorySolution.map((value) => {
          let orChecked = false;
          let andChecked = true;

          value.subs.forEach((sub) => {
            orChecked |= checked[sub];
            andChecked &= checked[sub];
          });

          return (
            <>
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

                    setChecked(newChecked);
                  }}
                />
                <ListItemText primary={value.main} />
                <IconButton
                  size="small"
                  onClick={() => {
                    const newCollapsed = { ...collapsed };
                    newCollapsed[value.main] = !newCollapsed[value.main];

                    setCollapsed(newCollapsed);
                  }}
                >
                  {collapsed[value.main] ? <ExpandMore /> : <ExpandLess />}
                </IconButton>
              </ListItem>
              {/* sub 카테고리 */}
              <Collapse in={!collapsed[value.main]} timeout="auto">
                <List disablePadding>
                  {value.subs.map((sub) => (
                    <ListItem dense>
                      <Checkbox
                        size="small"
                        onClick={() => {
                          const newChecked = { ...checked };
                          newChecked[sub] = !newChecked[sub];

                          setChecked(newChecked);
                        }}
                        checked={checked[sub]}
                      />
                      <ListItemText primary={sub} />
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
