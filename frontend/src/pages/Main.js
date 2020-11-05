import React from 'react'
import { Route } from 'react-router-dom';
import { NavigationBar } from '../components'
import { Home } from '.'

export default function Main() {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/intro" component={Home}></Route>
            {/* 여기에 푸터를 만들 예정 */}
        </div>
    )
}
