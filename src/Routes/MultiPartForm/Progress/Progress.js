import React, { useState, useEffect } from 'react';

const Progress = (props) => {
    const [state, updateState] = useState({
        isActiveClass: '',
        timeout: null,
    });

    useEffect(() => {
        const { timeout } = state;

        if (props.isActive && !timeout) {
            updateState({
                isActiveClass: 'loaded',
                timeout: setTimeout(() => {
                    props.nextStep();
                }, 3000),
            });
        } else if (!props.isActive && timeout) {
            clearTimeout(timeout);
            updateState({
                isActiveClass: '',
                timeout: null,
            });
        }
    });

    return (
        <div className={'progress-wrapper'}>
            <p className='text-center'>Automated Progress...</p>
            <div className={`progress ${state.isActiveClass}`}>
                <div className={`${'progress-bar'} progress-bar-striped`} />
            </div>
        </div>
    );
};

export default Progress;
