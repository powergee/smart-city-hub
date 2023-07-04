import { Paper, ButtonBase, Collapse, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "./ContentContainer.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import defaultImage from "../images/page-pics/introduction.png";

function NavigatorRow(props) {
  const { defaultOpen, title, subPath, link, depth } = props;
  const [open, setOpen] = useState(defaultOpen);

  return subPath ? (
    <React.Fragment>
      <ButtonBase
        className="nav-row-root-button"
        onClick={() => setOpen(!open)}
      >
        <div className="nav-row-root-box">
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          <h3>{title}</h3>
        </div>
      </ButtonBase>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="nav-row-sub-list">
          {subPath.map((element) => (
            <NavigatorRow {...element} depth={depth + 1}></NavigatorRow>
          ))}
        </div>
      </Collapse>
    </React.Fragment>
  ) : (
    <Link to={link} className="nav-row-sub-button">
      {title}
    </Link>
  );
}

export default function ContentContainer(props) {
  const {
    children,
    currentPath,
    image = defaultImage,
    imageOffset = 0,
    title,
    description,
    subtitle,
  } = props;
  const [paths, setPaths] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const defaultPaths = [
      {
        defaultOpen: false,
        title: t("센터소개"),
        subPath: [
          {
            title: t("인사말"),
            link: "/introduction/greeting",
          },
          {
            title: t("설립배경 및 목적"),
            link: "/introduction/goal",
          },
          {
            title: t("연구진"),
            link: "/introduction/researchers",
          },
        ],
      },
      {
        defaultOpen: false,
        title: t("연구 & 사업"),
        subPath: [
          {
            title: t("총괄 연구 & 사업"),
            link: "/projects/summary",
          },
          {
            title: t("인문사회연구소"),
            link: "/projects/withhs",
          },
          {
            title: t("스마트재난안전"),
            link: "/projects/smtdstpre",
          },
          {
            title: t("기타"),
            link: "/projects/etc",
          },
        ],
      },
      {
        defaultOpen: false,
        title: t("발간물"),
        subPath: [
          {
            title: "Issue Paper",
            link: "/publish/issue-paper",
          },
          {
            title: "아카이브",
            link: "/publish/archive",
          },
        ],
      },
      {
        defaultOpen: false,
        title: t("소식"),
        subPath: [
          {
            title: "공지사항",
            link: "/news/notices",
          },
          {
            title: "스마트뉴스",
            link: "/news/smart-news",
          },
          {
            title: "연구실적",
            link: "/news/research",
          },
        ],
      },
      {
        defaultOpen: false,
        title: t("커뮤니티"),
        subPath: [
          {
            title: "세미나",
            link: "/community/seminar",
          },
          {
            title: "기관 및 기업 소개",
            link: "/community/workshop",
          },
        ],
      },
      {
        defaultOpen: false,
        title: t("스마트도시수출 거점HUB"),
        subPath: [
          {
            title: "기업정보",
            link: "/hub",
          },
          {
            title: "솔루션",
            link: "/solution",
          },
          {
            title: "아세안",
            link: "/asean",
          },
        ],
      },
    ];

    // DFS에 기초함
    function openPaths(paths) {
      let foundOne = false;

      for (let i = 0; i < paths.length; ++i) {
        let found = false;
        if (paths[i].hasOwnProperty("link")) {
          let shortLength = Math.min(paths[i].link.length, currentPath.length);
          if (
            paths[i].link.substring(0, shortLength) ===
            currentPath.substring(0, shortLength)
          ) {
            found = true;
          }
        }
        if (paths[i].hasOwnProperty("subPath")) {
          found = found || openPaths(paths[i].subPath);
        }
        if (paths[i].hasOwnProperty("defaultOpen")) {
          paths[i].defaultOpen = found;
        }

        foundOne = foundOne || found;
      }

      return foundOne;
    }

    openPaths(defaultPaths);
    setPaths(defaultPaths);
  }, [currentPath, t]);

  return (
    <div className="content-background">
      <div
        className="content-banner"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPositionY: `${100 * imageOffset}%`,
        }}
      >
        <div className="content-banner-overlay">
          <Typography className="content-banner-title" variant="h2">
            {title}
          </Typography>
          <Typography className="content-banner-subtitle" variant="h4">
            {subtitle}
          </Typography>
          {description && (
            <Typography className="content-banner-description" variant="h6">
              {description}
            </Typography>
          )}
        </div>
      </div>

      <div className="content-root">
        <div className="content-left">
          <Paper variant="outlined" className="content-navi">
            {paths.map((element) => (
              <NavigatorRow {...element} depth={0}></NavigatorRow>
            ))}
          </Paper>
        </div>
        <div className="content-right">{children}</div>
      </div>
    </div>
  );
}
