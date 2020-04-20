import React from 'react';
import './Sidebar.css';

import {
  NavLink,
  useRouteMatch
} from "react-router-dom";

const Sidebar = () => {
  let {url} = useRouteMatch();
  return(
    <main>
      <div className="sidebar">
        <NavLink to={`${url}/responsive`} activeClassName="active">Responsive</NavLink>
        <NavLink to={`${url}/responsiveBurger`}>News</NavLink>
        <NavLink to={`${url}/responsiveThree`}>Contact</NavLink>
        <NavLink to={`${url}/responsiveFour`}>About</NavLink>
      </div>

      <div className="content">
        <h2>Responsive Sidebar Example</h2>
        <p>This example use media queries to transform the sidebar to a top navigation bar when the screen size is 700px or less.</p>
        <p>We have also added a media query for screens that are 400px or less, which will vertically stack and center the navigation links.</p>
        <h3>Resize the browser window to see the effect.</h3>
      </div>
  </main>
)};

export default Sidebar;
