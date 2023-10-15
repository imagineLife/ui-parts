import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Components
const Sidebars = lazy(() => import('./../Routes/Sidebar'));
// import Widgets from './../Routes/Widgets';
// import DataLoader from './../Routes/DataLoader'
// import CsvLoader from './../Routes/CsvLoader'
// import Scatter from './../Routes/Scatter';
// import Mapper from './../Routes/Map';
// import MapperTwo from './../Routes/Map2';
// import MapperThree from './../Routes/Map3';
// import MapperFour from './../Routes/Map4';
// import MapperFive from './../Routes/Map5';
// import MapperSix from './../Routes/Map6';
import Home from './../Routes/Home'
const BigList = lazy(() => import('./../Routes/BigList'));
const MapperSeven = lazy(() => import('./../Routes/Map7'));
const ColorLegend = lazy(() => import('./../Routes/ColorLegend'));
const FetchOnHover = lazy(() => import('./../Routes/FetchOnHover'));
const TextUploader = lazy(() => import('./../Routes/TextUploader'));
const FOHChanged = lazy(() => import('./../Routes/FOHCodeChange'));
const CodeEditor = lazy(() => import('./../Routes/CodeEditor'))
const MultiPartForm = lazy(() => import('./../Routes/MultiPartForm'));
const TemplateAppRoute = lazy(() => import('./../Routes/AppRoute'));
const LandingPage = lazy(() => import('./../Views/Landing'));
const SayWhatLandingPage = lazy(() => import('./../Views/SayWhatLanding'));
const Layout = lazy(() => import('./../Components/Layout/'));
const Platform = lazy(() => import('./../Components/Platform/'));
const PollingUi = lazy(() => import('./../Components/PollingUi/'));
const NlpDash = lazy(() => import('./../Components/NlpDash/'));

// data
// import percBelow from './../mockData/percBelowPov.json'
// import percBelowMale from './../mockData/percBelowPovMale.json'
//single-source of routes && Components to Lookup
const RoutesLookup = [
  {
    component: Sidebars,
    path: '/sidebars',
  },
  // {
  //   component: Widgets,
  //   path: '/widgets'
  // },
  // {
  //   component: DataLoader,
  //   path: '/tsvLoader'
  // },
  // {
  //   component: CsvLoader,
  //   path: '/csvLoader'
  // },
  // {
  //   component: Scatter,
  //   path: '/scatter',
  //   props: {
  //     x: percBelow,
  //     y: percBelowMale
  //   }
  // },
  // {
  //   component: Mapper,
  //   path:'/map'
  // },
  // {
  //   component: MapperTwo,
  //   path:'/map2'
  // },
  // {
  //   component: MapperThree,
  //   path:'/map3'
  // },
  // {
  //   component: MapperFour,
  //   path:'/map4'
  // },
  {
    component: Platform,
    path: '/platform',
  },
  {
    component: BigList,
    path: '/big-list',
  },
  {
    component: FetchOnHover,
    path: '/fetch-on-hover',
  },
  {
    component: TextUploader,
    path: '/upload-text',
  },
  {
    component: FOHChanged,
    path: '/foh-changed',
  },
  // {
  //   component: MapperFive,
  //   path:'/map5'
  // },
  // {
  //   component: MapperSix,
  //   path:'/map6'
  // },
  {
    component: MapperSeven,
    path: '/map7',
  },
  {
    component: ColorLegend,
    path: '/colorLegend',
    props: {
      color: 'red',
      axis: 'bottom',
      ticks: 4,
    },
  },
  {
    component: CodeEditor,
    path: '/editor',
  },
  {
    component: MultiPartForm,
    path: '/multi-part-form',
  },
  {
    component: TemplateAppRoute,
    path: '/responsive-lander',
    props: {
      component: LandingPage,
      layout: Layout,
    },
  },
  {
    component: TemplateAppRoute,
    path: '/say-what-lander',
    props: {
      component: SayWhatLandingPage,
      layout: Layout,
    },
  },
  {
    component: PollingUi,
    path: '/polling',
    props: {
      layout: Layout,
    },
  },
  {
    component: NlpDash,
    path: '/nlp-dash',
    props: {
      layout: Layout,
    },
  },
  {
    component: Home,
    path: '/',
  },
];

export default function App() {
  return (
    <Suspense fallback={<span />} >
      <Router>
          <Switch>

            {/* Loop through above array && render Routes from each */}
            {
            RoutesLookup.map((r, idx) => {
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
    </Suspense>
  );
}