import React from 'react';
import classNames from 'classnames';

const defaultProps = {
  tag: 'button',
  color: '',
  size: '',
  loading: false,
  wide: false,
  wideMobile: false,
  disabled: false
}

const Button = ({
  className,
  tag,
  color,
  size,
  loading,
  wide,
  wideMobile,
  disabled,
  ...props
}) => {

  const classes = classNames(
    'button',
    color && `button-${color}`,
    size && `button-${size}`,
    loading && 'is-loading',
    wide && 'button-block',
    wideMobile && 'button-wide-mobile',
    className
  );

  const Component = tag;
  return (
    <Component
      {...props}
      className={classes}
      disabled={disabled}
    />
  );
}

export default Button;