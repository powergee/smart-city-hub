import "./DetailBox.scss";
import React, { useState } from "react";

import { Button } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

export default function DetailBox(props) {
  const { className, style, children, height } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${className ? className : ""} detail-box`}
      style={{ ...style, height: expanded ? "unset" : height }}
    >
      {!expanded && (
        <div className="detail-bg" style={{ height }}>
          <Button className="button-more" onClick={() => setExpanded(true)}>
            더 보기
            <ExpandMore />
          </Button>
        </div>
      )}
      {children}
      <div className="detail-bottom">
        <Button className="button-less" onClick={() => setExpanded(false)}>
          줄이기
          <ExpandLess />
        </Button>
      </div>
    </div>
  );
}
