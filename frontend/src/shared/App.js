import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
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
