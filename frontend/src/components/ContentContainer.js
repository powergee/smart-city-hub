import { Paper, ButtonBase, Collapse } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import "./ContentContainer.scss";
import { useHistory } from 'react-router-dom';

function NavigatorRow(props) {
    const { defaultOpen, title, subPath, link, depth } = props;
    const [open, setOpen] = useState(defaultOpen);
    const history = useHistory();

    const getRedirector = (path) => () => {
        history.push(path);
    }

    return (
        subPath ? (
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
                            <NavigatorRow {...element} depth={depth+1}></NavigatorRow>
                        ))}
                    </div>
                </Collapse>
            </React.Fragment>
        ) : (
            <ButtonBase className="nav-row-sub-button" onClick={getRedirector(link)}>
                <h4>{title}</h4>
            </ButtonBase>
        )
    )
}

export default function ContentContainer(props) {
    const { children, currentPath } = props;
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        let defaultPaths = [
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
                title: "발간물",
                subPath: [
                    {
                        title: "Issue Paper",
                        link: "/publish/issue-paper"
                    },
                    {
                        title: "아카이브",
                        link: "/publish/archive"
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
                        title: "스마트뉴스",
                        link: "/news/smart-news"
                    },
                    {
                        title: "연구실적",
                        link: "/news/research"
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
                    }
                ]
            },
            {
                title: "스마트도시수출 거점HUB",
                link: "/hub"
            }
        ];

        // DFS에 기초함
        function openPaths(paths) {
            let foundOne = false;

            for (let i = 0; i < paths.length; ++i) {
                let found = false;
                if (paths[i].hasOwnProperty("link")) {
                    console.log(paths[i].link)
                    let shortLength = Math.min(paths[i].link.length, currentPath.length)
                    if (paths[i].link.substring(0, shortLength) === currentPath.substring(0, shortLength)) {
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
        console.log(defaultPaths);
        setPaths(defaultPaths);
    }, []);

    return (
        <div className="content-background">
            <div className="content-root">
                <div className="content-left">
                    <Paper variant="outlined" className="content-navi">
                        {paths.map(element => <NavigatorRow {...element} depth={0}></NavigatorRow>)}
                    </Paper>
                </div>
                <div className="content-right">
                    {children}
                </div>
            </div>
        </div>
    )
}
