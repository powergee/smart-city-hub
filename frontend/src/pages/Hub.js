import React, { useState, useEffect, useRef } from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer, ContentHeader, CardBoard, CompanyList } from "../components"
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
                    <ul>
                        <li>아래 목록에서 원하시는 대분류를 선택해주세요.</li>
                    </ul>
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
        width: "50%",
        marginRight: "5px",
        transition: ".25s all"
    };

    const rightDefaultStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "0%",
        visibility: "hidden",
        marginLeft: "5px",
        overflow: "hidden",
        transition: ".25s all"
    };

    const first = props?.match?.params?.first;
    const [section, setSection] = useState();
    const [secondNode, setSecondNode] = useState();
    const [secondTitle, setSecondTitle] = useState("");
    const [thirdNode, setThirdNode] = useState();

    const history = useHistory();

    useEffect(() => {
        let [section, currentNode, _] = parsePath(first, undefined, undefined);
        setSecondNode(currentNode);
        setSection(section);
    }, [props]);

    function getLeftStyle() {
        let style = Object.assign({}, leftDefaultStyle);
        if (thirdNode) {
            style["flexDirection"] = "column";
            style["width"] = "30%";
        }
        return style;
    }

    function getRightStyle() {
        let style = Object.assign({}, rightDefaultStyle);
        if (thirdNode) {
            style["width"] = "60%";
            style["visibility"] = "visible"
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
                    <ul>
                        <li>'{section[1].title}' 대분류에 대한 {Object.keys(secondNode.next).length} 가지 중분류가 있습니다.</li>
                        <li>아래 목록에서 중분류를 선택해주시면 그에 따른 소분류가 나타납니다.</li>
                    </ul>

                    <div className="hub-sv-viewer">
                        <div className="hub-subtitle" style={getLeftStyle()}>
                            <Typography variant="h6" align="center">'{section[1].title}'에 대한 중분류</Typography>
                            <div className="hub-sv-left">
                            {
                                Object.keys(secondNode.next).map((value) => {
                                    return (
                                        <Paper elevation={2} className="hub-sv-2nd-paper hub-sv-first">
                                            <ButtonBase className="hub-sv-2nd-button" onClick={() => selectSecond(value)}>
                                                <Typography align="center" variant="h5">{value}</Typography>
                                            </ButtonBase>
                                        </Paper>
                                    )
                                })
                            }
                            </div>
                        </div>
                        
                        
                        {thirdNode ? (
                            <div className="hub-subtitle" style={getRightStyle()}>
                                <Typography variant="h6" align="center">'{secondTitle}'에 대한 소분류</Typography>
                                <div>
                                {
                                    Object.keys(thirdNode.next).map((value) => {
                                        return (
                                            <Paper elevation={2} className="hub-sv-2nd-paper hub-sv-second">
                                                <ButtonBase className="hub-sv-2nd-button" onClick={() => moveToList(value)}>
                                                    <Typography noWrap={true} align="center" variant="h6">{value}</Typography>
                                                </ButtonBase>
                                            </Paper>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        ) : undefined}
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
                    <ul>
                        <li>'{section[1].title}' - '{section[2].title}' - '{section[3].title}'에 대한 검색 결과입니다.</li>
                        <li>각 행의 좌측 화살표를 클릭하시면 추가 정보를 보실 수 있습니다.</li>
                    </ul>

                    <CompanyList firstIndex={first} secondIndex={second} thirdIndex={third}></CompanyList>
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