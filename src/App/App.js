import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Sidebars from './../Routes/Sidebar';
import Widgets from './../Routes/Widgets';
import Home from './../Routes/Home'

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/sidebars">
            <Sidebars />
          </Route>
          <Route path="/widgets">
            <Widgets />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}