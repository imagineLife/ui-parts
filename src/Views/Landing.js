import React from 'react';
// import sections
import Hero from './../Components/Hero';
import FeaturesTiles from './../Components/FeaturesTiles';
import FeaturesSplit from './../Components/FeaturesSplit';
import Testimonial from './../Components/TestimonialOld';
import Cta from './../Components/Cta';

const LandingPage = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
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

export default LandingPage;