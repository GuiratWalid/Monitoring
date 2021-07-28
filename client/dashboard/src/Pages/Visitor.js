import React from 'react';
import Page from '../Components/Page.js';
import TrafficByDevices from './../Components/Charts/TrafficByDevices.js';

const VisitorComponent = () => {
    return (
        <>
            <TrafficByDevices />
            <Page type="Visitor" />
        </>
    );
}

export default VisitorComponent;