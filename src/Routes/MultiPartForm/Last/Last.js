import React from 'react';
import Stats from './../Stats';

const Last = (props) => {
    const submit = () => {
        alert('You did it! Yay!') // eslint-disable-line
    };

    return (
        <div>
            <div className={'text-center'}>
                <h3>This is the last step in this example!</h3>
                <hr />
                {/* <Plugs /> */}
            </div>
            <Stats step={4} {...props} nextStep={submit} />
        </div>
    );
};

export default Last;
