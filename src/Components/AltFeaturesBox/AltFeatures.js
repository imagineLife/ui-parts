import React from 'react';
import classNames from 'classnames';
import SectionHeader from './../SectionHeader';
import Image from './../Image';
import './altFeatures.scss'
import imgOne from './../assets/images/features-split-image-01.png';
import glance from './../assets/images/glance.jpg'
import text from './../assets/images/text.jpg'
import themes from './../assets/images/themes.jpg'
import wbl from './../assets/images/wbl.jpg'
import woi from './../assets/images/woi.jpg'

const AltFeatures = ({
  tiles,
  header,
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

  const imageLookup = {
    glance,
    text,
    themes,
    wbl,
    woi
  }

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

  if(!tiles) return <div>horse</div>
  
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          {/* Optional Section Header */}
          {
            header && <SectionHeader data={{...header}} className="center-content" />
          }
          <div className={splitClasses}>
            {/* 
              Loop through & render Layout Items
            */}
            {tiles.map(({
              subtitle, 
              title, 
              body, 
              image
            }, itmIdx) => (
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
                    src={imageLookup[image]}
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