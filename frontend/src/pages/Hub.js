import React, { useState, useEffect, useRef } from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer, ContentHeader, CardBoard, PreparingContents } from "../components"
import { Paper, ButtonBase, Typography } from '@material-ui/core'
import HubJson from "../hub-data/generated/domestic-parsed.json"
import { useHistory } from 'react-router-dom';
import CateToEng from "../hub-data/cateToEng.json"
import Samp1 from "../hub-data/1.jpg"
import Samp2 from "../hub-data/2.jpg"
import Samp3 from "../hub-data/3.jpg"
import "./Hub.scss"

function parsePath(first, second, third) {
    let section = [
        {
            title: "스마트도시수출 거점HUB",
            link: "/hub"
        }
    ];

    let currentNode = HubJson["tree"];
    let nextCate = HubJson["firstCate"];

    if (first) {
        let cateName = HubJson["firstCate"][first];
        nextCate = HubJson["secondCate"];
        section.push({
            title: cateName,
            link: "/hub/" + first
        });
        currentNode = currentNode.next[cateName];

        if (second) {
            cateName = HubJson["secondCate"][second];
            nextCate = HubJson["thirdCate"];
            section.push({
                title: cateName,
                link: "/hub/" + first + "/" + second
            });
            currentNode = currentNode.next[cateName];

            if (third) {
                cateName = HubJson["thirdCate"][third];
                nextCate = undefined;
                section.push({
                    title: cateName,
                    link: "/hub/" + first + "/" + second + "/" + third
                });
                currentNode = currentNode.next[cateName];
            }
        }
    }

    return [section, currentNode, nextCate];
}

function FirstCategoryViewer(props) {
    const [section, setSection] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        let [section, _, nextCate] = parsePath(undefined, undefined, undefined);
        let categories = [];
    
        // 디자인 테스트를 위한 것이므로, 본격적으로 배포할 때는 수정해야 함.
        for (const next in nextCate) {
            categories.push({
                link: section[section.length - 1].link + "/" + next,
                title: nextCate[next],
                image: Math.random() > 0.66 ? (Samp3) : (Math.random() > 0.5 ? (Samp2) : (Samp1)),
                description: CateToEng[nextCate[next]]
            })
        }

        setSection(section);
        setCategories(categories);
    }, [props])

    return (
        section && categories ? ( 
            <ContentContainer currentPath={section[section.length - 1].link}>
                <ContentHeader sections={section}>
                    <CardBoard variant="large" menuList={categories}></CardBoard>
                </ContentHeader>
            </ContentContainer>
        ) : (
            <React.Fragment></React.Fragment>
        )
    )
}

function SecondCategoryViewer(props) {
    const leftDefaultStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "75%",
        marginRight: "5px",
        transition: ".25s all"
    };

    const rightDefaultStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "0%",
        marginLeft: "5px",
        overflow: "hidden",
        transition: ".25s all"
    };

    const first = props?.match?.params?.first;
    const [section, setSection] = useState();
    const [secondNode, setSecondNode] = useState();
    const [secondTitle, setSecondTitle] = useState();
    const [thirdNode, setThirdNode] = useState();

    const leftDiv = useRef();
    const rightDiv = useRef();

    const history = useHistory();

    useEffect(() => {
        let [section, currentNode, _] = parsePath(first, undefined, undefined);
        setSecondNode(currentNode);
        setSection(section);
    }, [props]);

    function getLeftStyle() {
        let style = Object.assign({}, leftDefaultStyle);
        if (thirdNode) {
            style["width"] = "25%";
        }
        return style;
    }

    function getRightStyle() {
        let style = Object.assign({}, rightDefaultStyle);
        if (thirdNode) {
            style["width"] = "65%";
        }
        return style;
    }

    function selectSecond(selected) {
        setSecondTitle(selected);
        setThirdNode(secondNode.next[selected]);
    }

    function moveToList(thirdTitle) {
        const secondIndex = HubJson["secondCate"].indexOf(secondTitle);
        const thirdIndex = HubJson["thirdCate"].indexOf(thirdTitle);
        history.push("/hub/" + first + "/" + secondIndex + "/" + thirdIndex);
    }

    return (
        section ? ( 
            <ContentContainer currentPath={section[section.length - 1].link}>
                <ContentHeader sections={section}>
                    <div className="hub-sv-viewer">
                        <div ref={leftDiv} style={getLeftStyle()}> {
                            Object.keys(secondNode.next).map((value) => {
                                return (
                                    <Paper elevation={2} className="hub-sv-2nd-paper">
                                        <ButtonBase className="hub-sv-2nd-button" onClick={() => selectSecond(value)}>
                                            <Typography align="center" variant="h5">{value}</Typography>
                                        </ButtonBase>
                                    </Paper>
                                )
                            })
                        }</div>

                        <div ref={rightDiv} style={getRightStyle()}>{
                            thirdNode ? (
                                Object.keys(thirdNode.next).map((value) => {
                                    return (
                                        <Paper elevation={2} className="hub-sv-2nd-paper">
                                            <ButtonBase className="hub-sv-2nd-button" onClick={() => moveToList(value)}>
                                                <Typography align="center" variant="h6">{value}</Typography>
                                            </ButtonBase>
                                        </Paper>
                                    )
                                })
                            ) : undefined
                        }</div>
                    </div>
                </ContentHeader>
            </ContentContainer>
        ) : (
            <React.Fragment></React.Fragment>
        )
    )
}

function ListViewer(props) {
    const first = props?.match?.params?.first;
    const second = props?.match?.params?.second;
    const third = props?.match?.params?.third;

    const [section, setSection] = useState();

    useEffect(() => {
        let [section, currentNode, nextCate] = parsePath(first, second, third);
        setSection(section);
    }, [props]);

    return (
        section ? (
            <ContentContainer currentPath={section[section.length - 1].link}>
                <ContentHeader sections={section}>
                    
                </ContentHeader>
            </ContentContainer>
        ) : (
            <React.Fragment></React.Fragment>
        )
    );
}

function CompanyViewer(props) {
    const first = props?.match?.params?.first;
    const second = props?.match?.params?.second;
    const third = props?.match?.params?.third;
    const comp = props?.match?.params?.comp;

    const [section, setSection] = useState();

    useEffect(() => {
        let [section, currentNode, nextCate] = parsePath(first, second, third);
        setSection(section);
    }, [props]);

    return (
        section ? (
            <ContentContainer currentPath={section[section.length - 1].link}>
                <ContentHeader sections={section}>
                    <div>

                    </div>
                </ContentHeader>
            </ContentContainer>
        ) : (
            <React.Fragment></React.Fragment>
        )
    );
}

export default function Hub(props) {
    return (
        <Switch>
            <Route exact path="/hub" component={FirstCategoryViewer}></Route>
            <Route exact path="/hub/:first" component={SecondCategoryViewer}></Route>
            <Route exact path="/hub/:first/:second/:third" component={ListViewer}></Route>
            <Route exact path="/hub/:first/:second/:third/:comp" component={CompanyViewer}></Route>
        </Switch>
    )
}