import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom';
import { ContentHeader, ContentContainer } from "../components"
import "./IssuePaper.scss"

function IssuePaperList() {
    const primary = {
        title: "Issue Paper",
        link: "/issue-paper"
    };

    const secondary = {
        title: "목록",
        link: "/issue-paper"
    };

    return (
        <ContentHeader primary={primary} secondary={secondary}>

        </ContentHeader>
    )
}

function IssuePaperView(props) {
    const articleId = props.match.params.articleId

    const primary = {
        title: "Issue Paper",
        link: "/issue-paper"
    };

    const initialSecondary = {
        title: "불러오는 중...",
        link: "/issue-paper/" + articleId
    };

    const [secondary, setSecondary] = useState(initialSecondary);

    return (
        <ContentHeader primary={primary} secondary={secondary}>

        </ContentHeader>
    )
}

export default function IssuePaper() {
    const primary = {
        title: "Issue Paper",
        link: "/issue-paper"
    };

    const defaultSecondary = {
        title: "목록",
        link: "/issue-paper"
    }

    return (
        <ContentContainer>
            <Route exact path="/issue-paper" component={IssuePaperList}></Route>
            <Route exact path="/issue-paper/:articleId" component={IssuePaperList}></Route>
        </ContentContainer>
    )
}
