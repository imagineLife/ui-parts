import React, { useState, Fragment } from 'react';
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
  },
  {
    t: 'hide-on-scroll',
    txt: 'ScrollHide'
  }
]

const Sidebar = () => {
  let {url} = useRouteMatch();
  let params = useParams()
  let [sidebarType, setSidebarType] = useState('side-to-top')
  const [sideOpen, setSideOpen] = useState(false);
  const mainClass = `${sidebarType}-wrapper${sideOpen === true ? ' open' : ''}`
  const listClass = `${sidebarType}${sideOpen ? ' open' : sidebarType && sideOpen ? ' closed' : ''}`

  const handleScroll = () => {
    console.log('Scrolling!');
  }
  
  return(
    <main className={mainClass}>
      <ul className={listClass} id="navbar">
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

      <div className="content" onScroll={() => {
        if(sidebarType === 'hide-on-scroll'){
          handleScroll()
        }
      }}>
        <h2>Responsive Sidebar Example</h2>
        <p>A few examples of navigation && a sidebar.</p>
        {
          sidebarType === 'hide-on-scroll' && 
          <Fragment>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          <p>
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
            A few examples of navigation && a sidebar.
          </p>
          </Fragment>

        }

        {/* slide-in only button */}
        {
          sidebarType === 'slide-in' && 
          <button onClick={() => setSideOpen(!sideOpen)}>Show/Hide Sidebar</button>
        }
      </div>
  </main>


)};

export default Sidebar;
