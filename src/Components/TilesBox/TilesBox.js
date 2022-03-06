import React from 'react';
import classNames from 'classnames';
import SectionHeader from './../SectionHeader';
import Image from './../Image';
import Tile from './../Tile/';
import StarImg  from './../assets/images/feature-tile-icon-01.svg'
import CardImg from './../assets/images/feature-tile-icon-02.svg'
import GlobeImg from './../assets/images/feature-tile-icon-03.svg'
import HeadImg from './../assets/images/feature-tile-icon-04.svg'
import ThumbsupImg from './../assets/images/feature-tile-icon-05.svg'

function imageSrcFromStr(str){
  const lookupObj = {
    StarImg,
    CardImg,
    GlobeImg,
    HeadImg,
    ThumbsupImg
  }
  return lookupObj[str]
}

const TilesBox = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  tiles,
  ...props
}) => {

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  // const sectionHeader = {
  //   title: 'Build up the whole picture',
  //   paragraph: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.'
  // };


  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          {/* <SectionHeader data={sectionHeader} className="center-content" /> */}
          <div className={tilesClasses}>
            {tiles.map((t,idx) => <Tile {...t} image={{...t.image, src: imageSrcFromStr(t.image.src)}} key={`tile-${t.title}`}/>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TilesBox;