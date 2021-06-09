import React, { forwardRef } from 'react';

const Input = forwardRef(({...props}, ref) => <input ref={ref} {...props} />);

export default Input;