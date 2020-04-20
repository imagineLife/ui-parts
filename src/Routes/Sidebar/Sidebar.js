import React, { useState } from 'react';
import './Sidebar.css';

import {
  NavLink,
  useRouteMatch,
  useParams
} from "react-router-dom";

const sidebarTypes = [
  {
    t: 'side-to-top',
    txt: 'Responsive'
  },
  {
    t: 'topnav',
    txt: 'Topnav'
  },
  {
    t: 'top-nav',
    txt: 'Top Nav'
  },
  {
    t: 'expand-collapse',
    txt: 'Expand / Collapse'
  }
]

const Sidebar = () => {
  let {url} = useRouteMatch();
  let params = useParams()
  let [sidebarType, setSidebarType] = useState('side-to-top')
  
  return(
    <main>
      <ul className={sidebarType}>
        {sidebarTypes.map(itm => (
          <li 
            key={`sidebar-${itm.t}`} 
            className={sidebarType === itm.t ? 'active': null}
            onClick={() => setSidebarType(itm.t)}
          >{itm.txt}</li>
        ))}

        {/*TopNav-only optional hamburger*/}
        {sidebarType === 'topnav' && 
          <li className="icon" onClick={() => {
            if(!sidebarType.includes('responsive')) setSidebarType('topnav responsive')
              setSidebarType('topnav')
          }}>
            <i class="fa fa-bars"></i>
          </li>
        }
      </ul>

      <div className="content">
        <h2>Responsive Sidebar Example</h2>
        <p>This example use media queries to transform the sidebar to a top navigation bar when the screen size is 700px or less.</p>
        <p>We have also added a media query for screens that are 400px or less, which will vertically stack and center the navigation links.</p>
        <h3>Resize the browser window to see the effect.</h3>
      </div>
  </main>


)};

export default Sidebar;
