import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { NavigationBar, NotFound } from '../components'
import { Home, Login, Register, Introduction, Projects, IssuePaper, Hub, News } from '.'
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
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <Route path="/introduction" component={Introduction}></Route>
                    <Route path="/issue-paper" component={IssuePaper}></Route>
                    <Route path="/news" component={News}></Route>
                    <Route path="/projects" component={Projects}></Route>
                    <Route path="/hub" component={Hub}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </div>
            {/* 여기에 푸터를 만들 예정 */}
        </div>
    )
}
