import React from 'react';
import Page from '../Components/Page.js';
import ByType from '../Components/Charts/ByType.js';

const ErrorComponent = () => {
    return (
        <>
            <ByType type="Error" />
            <Page type="Error" />
        </>
    );
}

export default ErrorComponent;