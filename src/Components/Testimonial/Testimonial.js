import React, { Fragment } from 'react';
// import './Testimonial.scss';

const Testimonial = ({quote, person, link}) => {
  // Error Handling
  // ||
  if(!quote || !person || (link && (!link.url || !link.text))){
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
            link &&
            <Fragment>
              <span className="text-color-low"> / </span>
              <span className="testimonial-item-link">
                <a href={`http://${link.url}`}>{link.text}</a>
              </span>
            </Fragment>
          }
        </div>
      </div>
    </div>
  )
}

export default Testimonial;