import React, { Fragment, useState, useEffect } from 'react';
import StepWizard from 'react-step-wizard';

import Nav from './Nav'
import First from './First';
import Second from './Second';
import Last from './Last';
import Stats from './Stats';
import Progress from './Progress';
import InstanceDemo from './InstanceDemo'
import './MultiPartForm.scss'

const Wizard = () => {
    const [state, updateState] = useState({
        form: {},
        demo: true, // uncomment to see more
    });

    const updateForm = (key, value) => {
        console.log('%c Update Form Called', 'background-color: pink; color: white;')
        
        const { form } = state;

        form[key] = value;
        updateState({
            ...state,
            form,
        });
    };
    console.log('state')
    console.log(state)

    const setInstance = SW => updateState({
      ...state,
      SW,
    });

    const { SW, demo } = state;

    return (
        <div className='container'>
            <h3>React Step Wizard</h3>
            <div className='jumbotron'>
                <div className='row'>
                    <div className="col-12 col-sm-6 offset-sm-3 rsw-wrapper">
                        <StepWizard
                            onStepChange={(stats) => console.log(stats)} //onStepChange
                            nav={<Nav />}
                            instance={setInstance}
                            isLazyMount
                        >
                            <First hashKey={'FirstStep'} update={updateForm} />
                            <Second form={state.form} update={updateForm}/>
                            <Progress stepName='progress' />
                            {null /* will be ignored */}
                            <Last hashKey={'TheEnd!'} />
                        </StepWizard>
                    </div>
                </div>
            </div>
            { (demo && SW) && <InstanceDemo SW={SW} /> }
        </div>
    );
};

export default Wizard;

// Do something on step change
// const onStepChange = (stats) => {
    // console.log(stats);
// };