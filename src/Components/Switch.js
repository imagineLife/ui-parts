import React from 'react';
import classNames from 'classnames';

const Switch = ({
  className,
  children,
  name,
  value,
  rightLabel,
  disabled,
  checked,
  ...props
}) => {

  const classes = classNames(
    'form-switch',
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
      <span className="form-switch-icon"></span>
      <span>
        {children}
      </span>
      {rightLabel &&
        <span>
          {rightLabel}
        </span>
      }
    </label>
  );
}

export default Switch;