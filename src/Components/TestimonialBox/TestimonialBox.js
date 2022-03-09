import React from 'react';
import classNames from 'classnames';
import SectionHeader from './../SectionHeader';
import './testBox.scss';
import Testimonial from './../Testimonial';

const TestimonialBox = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'testimonial section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'testimonial-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Customer testimonials',
    paragraph: 'Vitae aliquet nec ullamcorper sit amet risus nullam eget felis semper quis lectus nulla at volutpat diam ut venenatis tellus—in ornare.'
  };

  const itm = {
    section: "TestimonialBox",
    props: {
      tiles: [
        {
          quote: "I'm enjoying working on this - working with sass, react, ui details... all great stuff",
          person: "Me",
          link: {
            url: "laursen.tech/folio",
            text: "Online Portfolio"
          }
        },
        {
          quote: "This is great",
          person: "Me",
          link: {
            url: "laursen.tech/folio",
            text: "Online Portfolio"
          }
        },
      ]
    }
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>

            {
              itm.props.tiles.map((t,tIdx) => <Testimonial key={`Testimonial-${t.quote}-${t.person}`} {...t}/>)
            }

          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialBox;