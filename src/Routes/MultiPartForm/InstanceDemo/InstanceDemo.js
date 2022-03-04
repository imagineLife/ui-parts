import React, { Fragment } from 'react';

/** Demo of using instance */
const InstanceDemo = ({ SW: { previousStep, nextStep, goToNamedStep } }) => (
  <Fragment>
    <h4>Instance Demo: control from outside component</h4>
    <button className={'btn btn-secondary'} onClick={previousStep}>Previous Step</button>
    &nbsp;
    <button className={'btn btn-secondary'} onClick={nextStep}>Next Step</button>
    &nbsp;
    <button className={'btn btn-secondary'} onClick={() => goToNamedStep('progress')}>Go to 'progress'</button>
  </Fragment>
);

export default InstanceDemo;
