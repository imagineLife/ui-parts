import React from 'react';
// import sections
import HeroBox from './../Components/HeroBox';
import TilesBox from './../Components/TilesBox';
import AltFeaturesBox from './../Components/AltFeaturesBox';
import TestimonialBox from './../Components/TestimonialBox';
import CtaBox from './../Components/CtaBox';
import './SayWhat.scss'

import landingPageData from './say-what.json';

const componentLookup = {
  'HeroBox': HeroBox,
  'TilesBox': TilesBox,
  'AltFeaturesBox': AltFeaturesBox
}
const SayWhatLanding = () => {

  return (
    <>
      {landingPageData.map((itm, itmIdx) => {
        let ThisComponent = componentLookup[itm.section]
        return (<ThisComponent key={`say-what-landing-${itmIdx}-${itm.section}`} {...itm.props} />)
      })}
      <TestimonialBox topDivider />
      <CtaBox split prompt="water melon"/>
    </>
  );
}

export default SayWhatLanding;