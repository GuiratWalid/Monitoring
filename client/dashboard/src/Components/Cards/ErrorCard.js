import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const ErrorCard = () => {
    const [errorCount, setErrorCount] = useState(0);
    useEffect(() => {
        Axios.get("http://localhost:5000/errorCount").then(
            response => setErrorCount(response.data[0].count)
        );
    }, []);
    return (
        <div className="card text-white bg-danger m-3 rounded" >
            <div className="card-header">
                <i className="fas fa-exclamation-triangle icon"></i>
            </div>
            <div className="card-body">
                <h1 className="card-title">Error</h1>
                <h2 className="card-text">{errorCount}</h2>
            </div>
        </div>
    );
}

export default ErrorCard;