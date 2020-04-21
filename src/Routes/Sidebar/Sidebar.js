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
    t: 'hover-expand',
    txt: 'Hover-Expand'
  },
  {
    t: 'slide-in',
    txt: 'Slide-In'
  }
]

const Sidebar = () => {
  let {url} = useRouteMatch();
  let params = useParams()
  let [sidebarType, setSidebarType] = useState('side-to-top')
  const [sideOpen, setSideOpen] = useState(false);

  return(
    <main className={`${sidebarType}-wrapper${sideOpen === true ? ' open' : ''}`}>
      <ul className={`${sidebarType}${sideOpen ? ' open' : sidebarType && sideOpen ? ' closed' : ''}`}>
        {sidebarTypes.map((itm, idx) => {
            const hoverExpandClass = sidebarType === 'hover-expand' ? `h-e-${idx}` : ''
            const optHoverClass = hoverExpandClass ? hoverExpandClass : null
            const finalClass = sidebarType === itm.t ? `${optHoverClass} active`: optHoverClass
            const k = `sidebar-${itm.t}`
            return(
              <li 
                key={k} 
                className={finalClass}
                onClick={() => {
                  setSideOpen(false)
                  setSidebarType(itm.t)
                }}
              >{itm.txt}</li>
            ) 
        })}

        {/*TopNav-only optional hamburger*/}
        {sidebarType === 'topnav' && 
          <li className="icon" onClick={() => {
            if(!sidebarType.includes('responsive')) setSidebarType('topnav responsive')
              else{setSidebarType('topnav')}
          }}>
            <i className="fa fa-bars"></i>
          </li>
        }
      </ul>

      <div className="content">
        <h2>Responsive Sidebar Example</h2>
        <p>A few examples of navigation && a sidebar.</p>

        {/* slide-in only button */}
        {
          sidebarType === 'slide-in' && 
          <button onClick={() => setSideOpen(!sideOpen)}>Show/Hide Sidebar</button>
        }
      </div>
  </main>


)};

export default Sidebar;
