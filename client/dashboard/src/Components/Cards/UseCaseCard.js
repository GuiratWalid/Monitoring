import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const UseCaseCard = () => {
    const [useCaseCount, setUseCaseCount] = useState(0);
    useEffect(() => {
        Axios.get("http://localhost:5000/useCaseCount").then(
            response => setUseCaseCount(response.data[0].count)
        );
    }, []);
    return (
        <div className="card text-white bg-warning m-3 rounded" >
            <div className="card-header">
                <i className="fas fa-users-cog icon"></i>
            </div>
            <div className="card-body">
                <h1 className="card-title">Use Case</h1>
                <h2 className="card-text">{useCaseCount}</h2>
            </div>
        </div>
    );
}

export default UseCaseCard;