import React from 'react';
// import sections
import HeroBox from './../Components/HeroBox';
import FeaturesTiles from './../Components/FeaturesTiles';
import FeaturesSplit from './../Components/FeaturesSplit';
import Testimonial from './../Components/Testimonial';
import Cta from './../Components/Cta';
import './SayWhat.scss'

const SayWhatLanding = () => {

  return (
    <>
      <HeroBox className="illustration-section-01" />
      <FeaturesTiles />
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