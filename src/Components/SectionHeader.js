import React, { Fragment } from 'react';
import classNames from 'classnames';

/*
  returns
  - div with props + className
    - child div with container-xs class
      - conditional "title" text in customizable element 
      - conditional paragraph 
*/ 
const SectionHeader = ({
  className,
  data,
  children,
  tag,
  ...props
}) => {
  if(!data.title && !data.paragraph){
    throw 'Update Section HEader data prop'
    return;
  }

  const divWrapperClasses = classNames(
    'section-header',
    className
  );

  const HeaderTextElement = tag || 'h2';

  return (
    <div
      {...props}
      className={divWrapperClasses}
    >
      <div className="container-xs">
        {/* All Childre */}
        {children}

        {/* Section Title */}
        {data.title &&
          <HeaderTextElement className={
            classNames(
              'mt-0',
              data.paragraph ? 'mb-16' : 'mb-0'
            )}>{data.title}</HeaderTextElement>
        }

        {/* section sub-text */}
        {data.paragraph &&
          <p className="m-0">{data.paragraph}</p>
        }
      </div>
    </div>
  );
}

export default SectionHeader;