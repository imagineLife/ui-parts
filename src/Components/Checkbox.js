import React from 'react';
import classNames from 'classnames';

const Checkbox = ({
  className,
  children,
  name,
  value,
  disabled,
  checked,
  ...props
}) => {

  const classes = classNames(
    'form-checkbox',
    className
  );

  return (
    <label className={classes}>
      <input
        {...props}
        type="checkbox"
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
      />
      {children}
    </label>
  );
}

export default Checkbox;