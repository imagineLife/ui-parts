import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Sidebars from './../Routes/Sidebar';
import Widgets from './../Routes/Widgets';
import Home from './../Routes/Home'
import DataLoader from './../Routes/DataLoader'
import CsvLoader from './../Routes/CsvLoader'
import Scatter from './../Routes/Scatter';
import Mapper from './../Routes/Map';
import percBelow from './../mockData/percBelowPov.json'
import percBelowMale from './../mockData/percBelowPovMale.json'
//single-source of routes && Components to Lookup
const RoutesLookup = [
  {
    component: Sidebars,
    path: '/sidebars'
  },
  {
    component: Widgets,
    path: '/widgets'
  },
  {
    component: DataLoader,
    path: '/tsvLoader'
  },
  {
    component: CsvLoader,
    path: '/csvLoader'
  },
  {
    component: Scatter,
    path: '/scatter',
    props: {
      x: percBelow,
      y: percBelowMale
    }
  },
  {
    component: Mapper,
    path:'/map'
  },
  {
    component: Home,
    path: '/',
  }
]

export default function App() {
  return (
    <Router>
        <Switch>

          {/* Loop through above array && render Routes from each */}
          {
            RoutesLookup.map((r,idx) => {
              const ThisRoute = r.component
              let props = r.props ? r.props : {}
              if(r.path === '/'){
                props = {
                  routes: [...RoutesLookup]
                }
              }
              return (
                <Route 
                  key={`${r.component}-${idx}`}
                  path={r.path}>
                  <ThisRoute {...props} />
                </Route>
              )
            })
          }
        </Switch>
    </Router>
  );
}