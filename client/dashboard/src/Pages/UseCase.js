import React from 'react';
import ByType from '../Components/Charts/ByType';
import UseCaseByYear from '../Components/Charts/UseCaseByYear';
import UseCaseCount from '../Components/Charts/UseCaseCount';

const UseCaseComponent = () => {
    return (
        <div className="container">
            <ByType type="UseCase" />
            <UseCaseByYear />
            <UseCaseCount />
        </div>
    );
}

export default UseCaseComponent;