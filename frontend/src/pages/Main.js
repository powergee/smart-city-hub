import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { NavigationBar, NotFound } from '../components'
import { Home, Introduction, Projects, IssuePaper, Community, Hub } from '.'
import './Main.scss'

export default function Main() {
    return (
        <div>
            <div className="main-header">
                <NavigationBar></NavigationBar>
            </div>
            <div className="main-body">
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/introduction" component={Introduction}></Route>
                    <Route path="/issue-paper" component={IssuePaper}></Route>
                    <Route path="/projects" component={Projects}></Route>
                    <Route path="/community" component={Community}></Route>
                    <Route path="/hub" component={Hub}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </div>
            {/* 여기에 푸터를 만들 예정 */}
        </div>
    )
}
