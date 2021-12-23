import React from 'react';
import Stats from './../Stats';

const Second = ({previousStep, form: { firstname }, ...props}) => {
    const thisUpdate = (e) => update(e.target.name, e.target.value);

    const validate = () => {
        if (confirm('Are you sure you want to go back?')) { // eslint-disable-line
            previousStep();
        }
    };

    return (
        <div>
            { firstname && <h3>Hey {firstname}! 👋</h3> }
            I've added validation to the previous button.<br/>
            <label>Last Name</label>
            <input type='text' className='form-control' name='lastname' placeholder='Last Name'
                onChange={thisUpdate} />
            <Stats step={2} {...props} previousStep={validate} />
        </div>
    );
};

export default Second;
