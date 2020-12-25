import React from 'react'
import { Route } from 'react-router-dom';
import { NavigationBar } from '../components'
import { Home, Introduction, Projects, Publish, Community, Hub } from '.'
import './Main.scss'

export default function Main() {
    return (
        <div>
            <div className="main-header">
                <NavigationBar></NavigationBar>
            </div>
            <div className="main-body">
                <Route exact path="/" component={Home}></Route>
                <Route path="/introduction" component={Introduction}></Route>
                <Route path="/publish" component={Publish}></Route>
                <Route path="/projects" component={Projects}></Route>
                <Route path="/community" component={Community}></Route>
                <Route path="/hub" component={Hub}></Route>
            </div>
            {/* 여기에 푸터를 만들 예정 */}
        </div>
    )
}
