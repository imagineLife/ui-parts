import React from 'react';
import Stats from './../Stats';

const Second = ({previousStep, nextStep, update, form, ...props}) => {
    const thisUpdate = (e) => {
        update(e.target.name, e.target.value)
    };

    const validate = () => {
        if (confirm('Are you sure you want to go back?')) { // eslint-disable-line
            previousStep();
        }
    };

    function assureLastName(e){
        if(!form.lastname || form.lastname.length < 1){
            if(confirm('Are you sure you want to continue without a last name?')){
                nextStep()
            }
        }else{
            nextStep()
        }
    }
    return (
        <div>
            { form.firstname && <h3>Hey {form.firstname}! 👋</h3> }
            SECOND: I've added validation to the previous button.<br/>
            <label>Last Name</label>
            <input type='text' className='form-control' name='lastname' placeholder='Last Name'
                onChange={thisUpdate} />
            <Stats step={2} {...props} previousStep={validate} nextStep={assureLastName}/>
        </div>
    );
};

export default Second;
