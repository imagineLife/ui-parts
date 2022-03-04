import React from 'react';
import classNames from 'classnames';

const FormHint = ({
  children,
  className,
  status,
  ...props
}) => {

  const classes = classNames(
    'form-hint',
    status && `text-color-${status}`,
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      {children}
    </div>
  );
}

export default FormHint;