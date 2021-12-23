import React from 'react';
import Stats from './../Stats';

const First = ({update, ...props}) => {
    const thisUpdate = (e) => update(e.target.name, e.target.value);

    return (
        <div>
            <h3 className='text-center'>FIRST: Welcome! Have a look around!</h3>

            <label>First Name</label>
            <input type='text' className='form-control' name='firstname' placeholder='First Name'
                onChange={thisUpdate} />
            <Stats step={1} {...props} />
        </div>
    );
};

export default First;
