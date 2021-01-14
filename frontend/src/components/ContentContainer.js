import { Paper, ButtonBase, Collapse, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import "./ContentContainer.scss";
import { useHistory } from 'react-router-dom';

function NavigatorRow(props) {
    const { defaultOpen, title, subPath } = props;
    const [open, setOpen] = useState(defaultOpen);
    const history = useHistory();

    const getRedirector = (path) => () => {
        history.push(path);
    }

    return (
        <React.Fragment>
            <ButtonBase className="nav-row-root-button" onClick={() => setOpen(!open)}>
                <div className="nav-row-root-box">
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    <h3>{title}</h3>
                </div>
            </ButtonBase>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div className="nav-row-sub-list">
                    {subPath.map(element => (
                        <ButtonBase className="nav-row-sub-button" onClick={getRedirector(element.link)}>
                            <h4>{element.title}</h4>
                        </ButtonBase>
                    ))}
                </div>
            </Collapse>
        </React.Fragment>
    )
}

export default function ContentContainer(props) {
    const { children, currentPath } = props;

    let paths = [
        {
            defaultOpen: false,
            title: "센터소개",
            subPath: [
                {
                    title: "인사말",
                    link: "/introduction/greeting"
                },
                {
                    title: "설립배경 및 목적",
                    link: "/introduction/goal"
                },
                {
                    title: "연구진",
                    link: "/introduction/researchers"
                }
            ]
        },
        {
            defaultOpen: false,
            title: "연구 & 사업",
            subPath: [
                {
                    title: "총괄 연구 & 사업",
                    link: "/projects/summary"
                },
                {
                    title: "인문사회연구소",
                    link: "/projects/withhs"
                },
                {
                    title: "스마트재난안전",
                    link: "/projects/smtdstpre"
                },
                {
                    title: "기타",
                    link: "/projects/etc"
                }
            ]
        },
        {
            defaultOpen: false,
            title: "Issue Paper",
            subPath: [
                {
                    title: "Issue Paper",
                    link: "/issue-paper"
                }
            ]
        },
        {
            defaultOpen: false,
            title: "소식",
            subPath: [
                {
                    title: "공지사항",
                    link: "/news/notices"
                },
                {
                    title: "학술행사",
                    link: "/news/events"
                },
                {
                    title: "스마트뉴스",
                    link: "/news/smart-news"
                }
            ]
        },
        {
            defaultOpen: false,
            title: "커뮤니티",
            subPath: [
                {
                    title: "세미나",
                    link: "/community/seminar"
                },
                {
                    title: "워크숍",
                    link: "/community/workshop"
                },
                {
                    title: "추천 도서",
                    link: "/community/readings"
                }
            ]
        }
    ];

    if (currentPath) {
        for (let i = 0; i < paths.length; ++i) {
            let found = false;
            paths[i].subPath.forEach(sp => {
                if (sp.link === currentPath.substring(0, sp.link.length)) {
                    found = true;
                }
            });
            if (found) {
                paths[i].defaultOpen = true;
            }
        }
    }

    return (
        <div className="content-background">
            <div className="content-root">
                <div className="content-left">
                    <Paper className="content-navi">
                        {paths.map(element => <NavigatorRow {...element}></NavigatorRow>)}
                    </Paper>
                </div>
                <div className="content-right">
                    {children}
                </div>
            </div>
        </div>
    )
}
