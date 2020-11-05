import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { Main } from '../pages';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Main}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
