import React from 'react';
// import sections
import HeroBox from './../Components/HeroBox';
import TilesBox from './../Components/TilesBox';
import FeaturesSplit from './../Components/FeaturesSplit';
import Testimonial from './../Components/Testimonial';
import Cta from './../Components/Cta';
import './SayWhat.scss'

import landingPageData from './say-what.json';

const componentLookup = {
  'HeroBox': {
    component: HeroBox,
  },
  'TilesBox': {
    component: TilesBox,
  }
}
const SayWhatLanding = () => {

  return (
    <>
      {landingPageData.map((itm, itmIdx) => {
        let ThisComponent = componentLookup[itm.section].component
        return (<ThisComponent key={`say-what-landing-${itmIdx}-${itm.section}`} {...itm.props} />)
      })}
      <FeaturesSplit 
        invertMobile 
        topDivider 
        imageFill 
        className="illustration-section-02"
      />
      <Testimonial topDivider />
      <Cta split />
    </>
  );
}

export default SayWhatLanding;