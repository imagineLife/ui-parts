import React, { forwardRef } from 'react';

const RefInput = forwardRef(({...props}, ref) => <input ref={ref} {...props} />);

export default RefInput;