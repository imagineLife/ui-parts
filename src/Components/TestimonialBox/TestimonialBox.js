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
    paragraph: 'If this were a product and if I collected testimonials from happy customers...'
  };

  const itm = {
    section: "TestimonialBox",
    props: {
      tiles: [
        {
          quote: "It's no use going back to yesterday, because I was a different person then",
          person: "Alice",
          link: {
            url: "https://www.gutenberg.org/files/11/11-h/11-h.htm",
            text: "Alice in Wonderland"
          }
        },
        {
          quote: "The idea is that some designs are intrinsically defect prone; they are to be rejected, not repaired. Such dead ends should be expected in the design activity.",
          person: "Tom DeMarco & Timothy Lister",
          link: {
            url: "https://www.amazon.com/Peopleware-Productive-Projects-Tom-DeMarco/dp/0932633439",
            text: "Peopleware"
          }
        },
        {
          quote: "The sin of respectable people reveals itself in flight from responsibility",
          person: "Dietrich Bonhoeffer",
          link: {
            url :"https://www.amazon.com/Life-Together-Exploration-Christian-Community/dp/0060608528/ref=sr_1_1?crid=2UO12CY263Y8G&keywords=life+together&qid=1646916764&sprefix=life+together%2Caps%2C78&sr=8-1",
            text: "Life Together"
          }
        },
        // {
        //   quote: "The idea of an all encompassing, all penetrating world of God, interactive at every point with our lives, where we can always be totally at home and safe regardless of what happens in the visible dimension of the universe, is routinely treated as ridiculous",
        //   person: "Dallas Willard",
        //   link: {
        //     url: "https://www.amazon.com/Divine-Conspiracy-Rediscovering-Hidden-Life/dp/0060693339",
        //     text: "The Divine Conspiracy"
        //   }
        // }
        // {
        //   quote: "There is, there ought to be, something that we do in life that is not for a return but just because what we are doing is life itself, something a little mad. That is the gift. ",
        //   person: "John Caputo",
        //   link: {
        //     url: "https://www.amazon.com/What-Would-Jesus-Deconstruct-Postmodernism/dp/0801031362/ref=sr_1_1?crid=1HD568XWS1TLJ&keywords=what+would+jesus+deconstruct&qid=1646915463&sprefix=what+would+jesus+deconstruc%2Caps%2C89&sr=8-1",
        //     text: "What Would Jesus Deconstruct"
        //   }
        // },
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