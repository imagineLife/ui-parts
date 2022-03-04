import React from 'react';
// import sections
import Hero from './../Hero';
import FeaturesTiles from './../FeaturesTiles';
import FeaturesSplit from './../FeaturesSplit';
import Testimonial from './../Testimonial';
import Cta from './../Cta';

const Home = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Testimonial topDivider />
      <Cta split />
    </>
  );
}

export default Home;