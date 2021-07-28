import React from 'react';
import Page from '../Components/Page.js';
import ByType from '../Components/Charts/ByType.js';

const AccountComponent = () => {
    return (
        <>
            <ByType type="Account" />
            <Page type="Account" />
        </>
    );
}

export default AccountComponent;