import React from 'react';
import classNames from 'classnames';
import FormLabel from './FormLabel';
import FormHint from './FormHint';

const Select = ({
  className,
  children,
  label,
  labelHidden,
  name,
  status,
  disabled,
  value,
  size,
  placeholder,
  hint,
  ...props
}) => {

  const classes = classNames(
    'form-select',
    size && `form-select-${size}`,
    status && `form-${status}`,
    className
  );

  return (
    <>
      {label && <FormLabel labelHidden={labelHidden} id={props.id}>{label}</FormLabel>}
      <select
        {...props}
        className={classes}
        name={name}
        disabled={disabled}
        value={value}
      >
        {placeholder && <option hidden value="">{placeholder}</option>}
        {children}
      </select>
      {hint && <FormHint status={status}>{hint}</FormHint>}
    </>
  );
}

export default Select;
