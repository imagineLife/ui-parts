import React, { Fragment } from 'react';

const Testimonial = ({quote, person, personLink}) => {
  // Error Handling
  // ||
  if(!quote || !person){
    throw new Error('Please review & update the Testimonial Component Props')
  }

  return(
     <div className="tiles-item reveal-from-right" data-reveal-delay="200">
      <div className="tiles-item-inner">
        <div className="testimonial-item-content">
          <p className="text-sm mb-0">
            {`- ${quote}`}
              </p>
        </div>
        <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
          <span className="testimonial-item-name text-color-high">{person}</span>
          {
            personLink &&
            <Fragment>
              <span className="text-color-low"> / </span>
              <span className="testimonial-item-link">
                <a href="#0">TEST app name</a>
              </span>
            </Fragment>
          }
        </div>
      </div>
    </div>
  )
}

export default Testimonial;