import React, { useState, useEffect, useRef } from 'react'
import { Route, Switch } from 'react-router-dom';
import { ContentContainer, CardBoard, CompanyList } from "../components"
import { Paper, Button, Typography, Divider } from '@material-ui/core'
import HubJson from "../hub-data/generated/domestic-parsed.json"
import CateToEng from "../hub-data/cateToEng.json"
import CategoryImage from '../shared/CategoryImage';
import CategoryDescription from "../shared/CategoryDescription.json";
import "./Hub.scss"

function FirstCategoryViewer(props) {
    const [categories, setCategories] = useState();

    useEffect(() => {
        let categories = [];
    
        for (const title of HubJson.firstCate) {
            categories.push({
                link: "/hub/" + HubJson.firstCate.indexOf(title),
                title: title,
                image: CategoryImage[title],
                description: CateToEng[title]
            })
        }

        setCategories(categories);
    }, [props])

    return (
        categories ? ( 
            <ContentContainer currentPath="/hub" title="스마트도시수출 거점 HUB" description="아래 목록에서 원하시는 대분류를 선택해주세요." subtitle="Smart City Export HUB Platform">
                <CardBoard variant="large" menuList={categories}></CardBoard>
            </ContentContainer>
        ) : (
            <React.Fragment></React.Fragment>
        )
    )
}

function SecondCategoryViewer(props) {
    const first = props?.match?.params?.first;
    const firstStr = HubJson.firstCate[first];
    const [second, setSecond] = useState(undefined);
    const [third, setThird] = useState(undefined);
    const [selected, setSelected] = useState(undefined);
    const listRef = useRef(null);

    function showList(secondStr, thirdStr) {
        setSecond(HubJson["secondCate"].indexOf(secondStr));
        setThird(HubJson["thirdCate"].indexOf(thirdStr));
        setSelected(thirdStr);
        listRef.current.scrollIntoView({behavior: 'smooth'});
    }

    function getThirdButtons(category, node) {
        const nextCount = Object.keys(node.next).length;
        const compCount =  Number(Math.ceil(nextCount / 3)) * 3;

        const result = [];
        Object.keys(node.next).forEach((title) => {
            result.push((
                <Button
                    className="hub-second-paper"
                    variant={title === selected ? "contained" : "outlined"}
                    color={title === selected ? "secondary" : "default"}
                    onClick={() => showList(category, title)}
                >
                    {title}
                </Button>
            ))
        });

        for (let i = 0; i < compCount - nextCount; ++i) {
            result.push((
                <Paper className="hub-second-paper" variant="outlined"></Paper>
            ))
        }

        return (
            <div className="hub-wrap-layout">
                {result}
            </div>
        )
    }

    return (
        <ContentContainer
            currentPath={`/hub/${first}`}
            title={firstStr}
            subtitle={CateToEng[firstStr]}
            image={CategoryImage[firstStr]}
            imageOffset={0.5}
        >
            <Paper className="hub-control-paper" elevation={4}>
                {CategoryDescription[firstStr] && <div className="hub-description">
                    {CategoryDescription[firstStr].map(para => (
                        <p>{para}</p>
                    ))}
                </div>}

                <h3 className="hub-control-notice">{`아래 소분류를 선택해서 ${firstStr} 분야의 국내 기업들을 확인해보세요.`}</h3>
                <Divider className="hub-divider"></Divider>
                <div className="hub-control-contents">
                    <div className="hub-header">
                        <div className="hub-subtitle hub-first">
                            <Typography variant="h6" align="center">중분류</Typography>
                        </div>
                        
                        <div className="hub-subtitle hub-second">
                            <Typography variant="h6" align="center">소분류</Typography>
                        </div>
                    </div>

                    {Object.entries(HubJson.tree.next[firstStr].next).map(([category, node]) => (
                        <div className="hub-row">
                            <Paper className="hub-first hub-first-paper" variant="outlined">
                                <strong>{category}</strong>
                            </Paper>

                            <div className="hub-second">{getThirdButtons(category, node)}</div>
                        </div>
                    ))}
                </div>
            </Paper>

            <Divider className="hub-divider"></Divider>

            <ul ref={listRef}>
                <li>{firstStr} 분류에 대한 검색 결과입니다.</li>
                <li>각 행의 좌측에 화살표를 클릭하시면 추가 정보를 보실 수 있습니다.</li>
                <li>각 행의 기업명을 클릭하시면 그 기업의 홈페이지로 이동하실 수 있습니다.</li>
            </ul>

            <CompanyList firstIndex={first} secondIndex={second} thirdIndex={third}></CompanyList>
        </ContentContainer>
    )
}

export default function Hub() {
    return (
        <Switch>
            <Route exact path="/hub" component={FirstCategoryViewer}></Route>
            <Route exact path="/hub/:first" component={SecondCategoryViewer}></Route>
        </Switch>
    )
}