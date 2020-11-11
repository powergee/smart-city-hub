import React from 'react'
import { Route } from 'react-router-dom';
import { ContentContainer, ContentHeader } from "../components"

function Greeting() {
    const primary = {
        title: "연구실소개",
        link: "/introduction"
    };

    const secondary = {
        title: "인사말",
        link: "/introduction/greeting"
    };

    return (
        <React.Fragment>
            <ContentHeader primary={primary} secondary={secondary}></ContentHeader>
        </React.Fragment>
    )
}

export default function Introduction() {
    return (
        <ContentContainer>
            <Route exact path="/introduction" component={Greeting}></Route>
        </ContentContainer>
    )
}
