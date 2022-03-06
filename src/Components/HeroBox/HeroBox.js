import React, { useState } from 'react';
import classNames from 'classnames';
import ButtonGroup from './../ButtonGroup';
import Button from './../Button';
import Image from './../Image';
import Modal from './../Modal';
import SectionHeader from './../SectionHeader'
const HeroBox = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner container-sm',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >

        <div className={innerClasses}>
          <div className="hero-content">
            <SectionHeader
            tag="h1"
            data={{
              title:"Say What",
              paragraph:"See what some simple analytics \"say\" about text: longest words, common words, most-frequent words by letter-count, and more."
            }}
            />

            {/* 
              TODO: add buttons to...
              - see example
              - sign up?!
            */}
              {/* <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href="https://cruip.com/">
                    Get started
                    </Button>
                  <Button tag="a" color="dark" wideMobile href="https://github.com/cruip/open-react-template/">
                    View on Github
                    </Button>
                </ButtonGroup>
              </div> */}
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
              <Image
                className="has-shadow"
                src={require('./../assets/images/slice.gif')}
                alt="SayWhat Animation"
                width={896}
                height={504} />
          </div>
          {/* AVAILABLE modal on-click for above video link */}
          {/* <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" /> */}
        </div>
      {/* </div> */}
    </section>
  );
}

export default HeroBox;