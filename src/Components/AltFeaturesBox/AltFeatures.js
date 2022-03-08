import React from 'react';
import classNames from 'classnames';
import SectionHeader from './../SectionHeader';
import Image from './../Image';
import './altFeatures.scss'
import imgOne from './../assets/images/features-split-image-01.png';

const AltFeatures = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionData = {
    header: {
      title: 'Workflow that just works',
      paragraph: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.'
    },
    itms: [
      {
        title: "Words of Interest",
        body: "2 interactive lists - 1 selectable list containing categories of words: Common Words, Longest Words, and Action Words. 1 list containing results of the selected word category list.",
        img: imgOne
      },
      {
        title: "Words By Length",
        body: "A \"bubble\" comparison of how many words by character-length were spoken",
        img: imgOne
      },
      {
        title: "Textual Themes",
        body: "Thematic words from a sentence-by-sentence isolated perspective",
        img: imgOne
      },
      {
        title: "The Shape of the Speech",
        body: "Comparing the number of words per sentence against the sentence number, see the \"shape\" of the speech",
        img: imgOne
      },
      {
        title: "Responsive Analytic Selections",
        body: "Pick which details are important to consider and see selections reflected with styling in the speech text body",
        img: imgOne
      }
    ]
  }

  if(!sectionData) return <div>horse</div>
  
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          {/* Optional Section Header */}
          {
            sectionData.header && <SectionHeader data={{...sectionData.header}} className="center-content" />
          }
          <div className={splitClasses}>
            {/* 
              Loop through & render Layout Items
            */}
            {sectionData.itms.map(({subtitle, title, body},itmIdx) => (
              <div className="split-item" key={`${title}-alt-itm-${itmIdx}`}>
                <div className={`split-item-content center-content-mobile reveal-from-${itmIdx % 2 === 0 ? 'left' : 'right'}`} data-reveal-container=".split-item">
                  {
                    subtitle && 
                    <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                      {subtitle}
                    </div>
                  }
                  <h3 className="mt-0 mb-12">
                    {title}
                    </h3>
                  <p className="m-0">
                    {body}
                    </p>
                </div>
                <div className={
                  classNames(
                    'split-item-image center-content-mobile reveal-from-bottom',
                    // imageFill && 'split-item-image-fill'
                  )}
                  data-reveal-container=".split-item">
                  <Image
                    src={imgOne}
                    alt="Features split 01"
                    width={528}
                    height={396} />
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

export default AltFeatures;