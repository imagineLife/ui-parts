import React from 'react';
import { Link } from 'react-router-dom';
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
);

export default Home;
