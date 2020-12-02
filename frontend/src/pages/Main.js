import React from 'react'
import { Route } from 'react-router-dom';
import { NavigationBar } from '../components'
import { Home, Introduction, Projects, Community, Hub } from '.'

export default function Main() {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Route exact path="/" component={Home}></Route>
            <Route path="/introduction" component={Introduction}></Route>
            <Route path="/events" component={Projects}></Route>
            <Route path="/community" component={Community}></Route>
            <Route path="/hub" component={Hub}></Route>
            {/* 여기에 푸터를 만들 예정 */}
        </div>
    )
}
