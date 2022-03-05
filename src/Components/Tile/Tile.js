import React from 'react';
import Image from './../Image';
const Tile = ({title, body}) => {
  if(!title || !body) throw `Update the Tile component with reqd props`
  return (
    <div className="tiles-item reveal-from-bottom">
      <div className="tiles-item-inner">
        <div className="features-tiles-item-header">
          <div className="features-tiles-item-image mb-16">
            <Image
              src={require('./../assets/images/feature-tile-icon-01.svg')}
              alt="Features tile icon 01"
              width={64}
              height={64} />
          </div>
        </div>
        <div className="features-tiles-item-content">
          <h4 className="mt-0 mb-8">
            {title}
            </h4>
          <p className="m-0 text-sm">
            {body}
            </p>
        </div>
      </div>
    </div>
  )
}

export default Tile;