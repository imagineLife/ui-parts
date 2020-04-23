import React from 'react';
import { Link } from 'react-router-dom';
const Home = ({routes}) => {  
  return (
    <nav>
      <ul>
        {routes.map((r, idx) => (
          <li key={`${r.path}-${idx}`}>
            <Link to={r.path}>{r.component.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
};

export default Home;
