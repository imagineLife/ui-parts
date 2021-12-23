import React from 'react';
import './Nav.scss';

const Nav = ({totalSteps, currentStep, goToStep}) => {
  console.log('totalSteps')
  console.log(totalSteps)
  console.log('currentStep')
  console.log(currentStep)
  console.log('- - - - ')
  let dots = Array.from(Array(totalSteps - 1).keys()).map((curDot, idx) => (
    <span
        key={`step-${idx + 1}`}
        className={`dot${currentStep === idx + 1 ? " active" : ''}`}
        onClick={() => goToStep(idx + 1)}
    >&bull;</span>
  ))
  
  return (
      <div className="nav">{dots}</div>
  );
};

export default Nav;