import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const VisitorCard = () => {
    const [visitorCount, setVisitorCount] = useState(0);
    useEffect(() => {
        Axios.get("http://localhost:5000/visitorCount").then(
            response => setVisitorCount(response.data[0].count)
        );
    }, []);
    return (
        <div className="card text-white bg-primary m-3 rounded" >
            <div className="card-header">
                <i className="fas fa-eye icon"></i>
            </div>
            <div className="card-body">
                <h1 className="card-title">Visitor</h1>
                <h2 className="card-text">{visitorCount}</h2>
            </div>
        </div>
    );
}

export default VisitorCard;