import React from 'react';
// import sections
import HeroBox from './../Components/HeroBox';
import TilesBox from './../Components/TilesBox';
import AltFeaturesBox from './../Components/AltFeaturesBox';
import TestimonialBox from './../Components/TestimonialBox';
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
      <AltFeaturesBox 
        invertMobile 
        topDivider 
        imageFill
        invertColor 
        // className="illustration-section-02"
      />
      <TestimonialBox topDivider />
      <Cta split />
    </>
  );
}

export default SayWhatLanding;