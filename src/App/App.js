import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Sidebars from './../Routes/Sidebar';
import Widgets from './../Routes/Widgets';

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
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
      </div>
    </Router>
  );
}

const Home = () => (
	<nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/sidebars">Sidebars</Link>
      </li>
      <li>
        <Link to="/widgets">Widgets</Link>
      </li>
    </ul>
  </nav>
)

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}