import React from 'react';
import classNames from 'classnames';
import FormLabel from './FormLabel';
import FormHint from './FormHint';

const Input = ({
  className,
  children,
  label,
  labelHidden,
  type,
  name,
  status,
  disabled,
  value,
  formGroup,
  hasIcon,
  size,
  placeholder,
  rows,
  hint,
  ...props
}) => {

  const wrapperClasses = classNames(
    (formGroup && formGroup !== '') && (formGroup === 'desktop' ? 'form-group-desktop' : 'form-group'),
    (hasIcon && hasIcon !== '') && 'has-icon-' + hasIcon
  );

  const classes = classNames(
    'form-input',
    size && `form-input-${size}`,
    status && `form-${status}`,
    className
  );

  const Component = type === 'textarea' ? 'textarea' : 'input';
  return (
    <>
      {label && <FormLabel labelHidden={labelHidden} id={props.id}>{label}</FormLabel>}
      <div
        className={wrapperClasses}
      >
        <Component
          {...props}
          type={type !== 'textarea' ? type : null}
          className={classes}
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          rows={type === 'textarea' ? rows : null}
        />
        {children}
      </div>
      {hint && <FormHint status={status}>{hint}</FormHint>}
    </>
  );
}

export default Input;
