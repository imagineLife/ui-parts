import React from 'react';
import classNames from 'classnames';

const SectionHeader = ({
  className,
  data,
  children,
  tag,
  ...props
}) => {

  const classes = classNames(
    'section-header',
    className
  );

  const Component = tag;

  return (
   <div>sauce</div>
  );
}
/*
   <>
      {(data.title || data.paragraph) &&
        <div
          {...props}
          className={classes}
        >
          <div className="container-xs">
            {children}
            {data.title &&
              <Component className={
                classNames(
                  'mt-0',
                  data.paragraph ? 'mb-16' : 'mb-0'
                )}>{data.title}</Component>
            }
            {data.paragraph &&
              <p className="m-0">{data.paragraph}</p>
            }
          </div>
        </div>
      }
    </>
*/ 
export default SectionHeader;