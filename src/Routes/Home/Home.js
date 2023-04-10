import React from 'react';
import { Link } from 'react-router-dom';
const Home = ({ routes }) => {  
  
  return (
    <nav>
      <ul>
        {routes.map((r, idx) => (
          <li key={`${r.path}-${idx}`}>
            <Link to={r.path}>{r.path}</Link>
            {/* r.component.name */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Home;
