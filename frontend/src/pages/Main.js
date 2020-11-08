import React from 'react'
import { Route } from 'react-router-dom';
import { NavigationBar } from '../components'
import { Home, Introduction, Projects, Events, Community, Hub } from '.'

export default function Main() {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/introduction" component={Introduction}></Route>
            <Route exact path="/projects" component={Projects}></Route>
            <Route exact path="/events" component={Events}></Route>
            <Route exact path="/community" component={Community}></Route>
            <Route exact path="/hub" component={Hub}></Route>
            {/* 여기에 푸터를 만들 예정 */}
        </div>
    )
}
