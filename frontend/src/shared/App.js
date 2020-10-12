import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { Home } from '../pages';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
