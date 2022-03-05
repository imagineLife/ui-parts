import React from 'react';
import Image from './../Image';
const Tile = ({title, body, image, delay}) => {
  // prop validation
  if(!title || !body) throw `Update the Tile component with reqd props`
  
  // conditional img + props
  let imgProps;
  if(image){
    imgProps = {
      src: image.src,
      alt: image.alt || 'Tile Image',
      width: image.w || 64,
      height: image.h || 64
    }
  }
  const wrapperProps = {
    className: "tiles-item reveal-from-bottom",
    'data-reveal-delay': delay || 0
  }
  return (
    <div {...wrapperProps}>
      <div className="tiles-item-inner">
        <div className="features-tiles-item-header">
          {
            image &&
            <div className="features-tiles-item-image mb-16">
              <React.Suspense fallback={<span></span>}>
                <Image {...imgProps} />
              </React.Suspense>
            </div>
          }
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