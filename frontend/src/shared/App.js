import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Main } from "../pages";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Main}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
