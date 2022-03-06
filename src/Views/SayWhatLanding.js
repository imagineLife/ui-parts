import React from 'react';
// import sections
import HeroBox from './../Components/HeroBox';
import TilesBox from './../Components/TilesBox';
import FeaturesSplit from './../Components/FeaturesSplit';
import Testimonial from './../Components/Testimonial';
import Cta from './../Components/Cta';
import './SayWhat.scss'

import LandingPageData from './say-what.json';
console.log('LandingPageData')
console.log(LandingPageData)


const SayWhatLanding = () => {

  return (
    <>
      <HeroBox 
        className="illustration-section-01" 
        invertColor
      />
      <TilesBox 
        invertColor
        tiles={LandingPageData[0].props.tiles}
      />
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