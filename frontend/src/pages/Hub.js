import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer, ContentHeader, CardBoard, PreparingContents } from "../components"
import HubJson from "../hub-data/domestic-parsed.json"
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

function CategoryViewer(props) {
    const first = props?.match?.params?.first;
    const second = props?.match?.params?.second;

    const [section, setSection] = useState();
    const [categories, setCategories] = useState();

    useEffect(() => {
        let [section, currentNode, nextCate] = parsePath(first, second, undefined);
        let categories = [];
    
        // 디자인 테스트를 위한 것이므로, 본격적으로 배포할 때는 수정해야 함.
        const images = [Samp1, Samp2, Samp3]; 
        for (const next in currentNode.next) {
            categories.push({
                link: section[section.length - 1].link + "/" + nextCate.indexOf(next),
                title: next,
                image: Math.random() > 0.66 ? (Samp3) : (Math.random() > 0.5 ? (Samp2) : (Samp1)),
                description: ""
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

function ListViewer(props) {
    const first = props?.match?.params?.first;
    const second = props?.match?.params?.second;
    const third = props?.match?.params?.third;

    const [section, setSection] = useState();

    useEffect(() => {
        let [section, currentNode, nextCate] = parsePath(first, second, undefined);
        setSection(section);
    }, [props]);

    return (
        section ? (
            <ContentContainer currentPath={section[section.length - 1].link}>
                <ContentHeader sections={section}>
                    <PreparingContents></PreparingContents>
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
        let [section, currentNode, nextCate] = parsePath(first, second, undefined);
        setSection(section);
    }, [props]);

    return (
        section ? (
            <ContentContainer currentPath={section[section.length - 1].link}>
                <ContentHeader sections={section}>
                    <PreparingContents></PreparingContents>
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
            <Route exact path="/hub" component={CategoryViewer}></Route>
            <Route exact path="/hub/:first" component={CategoryViewer}></Route>
            <Route exact path="/hub/:first/:second" component={CategoryViewer}></Route>
            <Route exact path="/hub/:first/:second/:third" component={ListViewer}></Route>
            <Route exact path="/hub/:first/:second/:third/:comp" component={ListViewer}></Route>
        </Switch>
    )
}


// import React, { useState, useEffect } from 'react'
// import { Button } from '@material-ui/core';
// import { ContentContainer, ContentHeader } from "../components"
// import HubJson from "../hub-data/domestic-parsed.json"
// import "./Hub.scss"

// export default function Hub() {
//     const section = [
//         {
//             title: "스마트도시수출 거점HUB",
//             link: "/hub"
//         }
//     ];

//     const [selected, setSelected] = useState("first");

//     const getButtonHandler = (kind) => () => {
//         setSelected(kind);
//     }

//     return (
//         <ContentContainer currentPath={section[0].link}>
//             <ContentHeader sections={section}>
//                 <div className="hub-instruction">
//                     <li>대분류, 중분류, 소분류를 각각 선택해주시면 기업의 목록이 나타납니다.</li>
//                 </div>
//                 <div className="hub-cate-container">
//                     <Button onClick={getButtonHandler("first")} color={(selected === "first" ? "primary" : "default")} size="large">대분류</Button>
//                     <Button onClick={getButtonHandler("second")} color={(selected === "second" ? "primary" : "default")} size="large">중분류</Button>
//                     <Button onClick={getButtonHandler("third")} color={(selected === "third" ? "primary" : "default")} size="large">소분류</Button>
//                 </div>
//             </ContentHeader>
//         </ContentContainer>
//     )
// }
