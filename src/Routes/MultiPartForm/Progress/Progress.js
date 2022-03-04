import React, { useState, useEffect, useMemo } from 'react';

const Progress = (props) => {
    const [state, updateState] = useState({
        isActiveClass: '',
        timeout: null,
    });
    console.log('%c Progress Render', 'background-color: orange; color: white;')
    console.log('state')
    console.log(state)
    console.log('%c ----', 'background-color: orange; color: white;')
    useEffect(() => {
        const { timeout } = state;
        console.log('%c UseEffect', 'background-color: white; color: black;')
        console.log('timeout, isActive')
        console.log(timeout, props.isActive)
        let thisTimer = setTimeout(() => {
            props.nextStep();
        }, 3000)
        if (props.isActive && !timeout) {
            console.log('ue if ')
            
            updateState({
                isActiveClass: 'loaded',
                timeout: thisTimer,
            });
        } else if (!props.isActive && timeout) {
            console.log('ue if ')
            clearTimeout(timeout);
            updateState({
                isActiveClass: '',
                timeout: null,
            });
        }

        return () => {
            console.log('HERE?!')
            clearTimeout(thisTimer);
            updateState((s)=> ({...s, timeout: null}))
        }
    }, []);

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
