import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { NavigationBar, NotFound } from '../components'
import { Home, Login, Register, Introduction, Projects, Publish, Hub, News, Community } from '.'
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
                    <Route path="/publish" component={Publish}></Route>
                    <Route path="/news" component={News}></Route>
                    <Route path="/community" component={Community}></Route>
                    <Route path="/projects" component={Projects}></Route>
                    <Route path="/hub" component={Hub}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </div>
            <footer className="main-footer">
                <p>서울시립대학교 도시과학연구원 국제도시 및 인프라 연구센터 (서울특별시 동대문구 서울시립대로 163, 21세기관 104-1호)</p>
                <p>University of Seoul, Institute of Urban Science, Global Urban &#38; Infrastructure Research Center (The 21st Century Building, Seoulsiripdaero 163, Dongdaemun-gu, Seoul 02504 KOREA)</p>
                <p>Tel : +82-2-6490-5154 / CP : +82-10-2969-2504 / Email : chunhoy7@uos.ac.kr</p>
                <strong>Copyright 2021 Global Urban &#38; Infrastructure Research Center. All Rights Reserved.</strong>
            </footer>
        </div>
    )
}
