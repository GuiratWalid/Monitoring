import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const AccountCard = () => {
    const [accountCount, setAccountCount] = useState(0);
    useEffect(() => {
        Axios.get("http://localhost:5000/AccountCount").then(
            response => setAccountCount(response.data[0].count)
        );
    }, []);
    return (
        <div className="card text-white bg-success m-3 rounded " >
            <div className="card-header">
                <i className="fas fa-user-alt icon"></i>
            </div>
            <div className="card-body">
                <h1 className="card-title">Account</h1>
                <h2 className="card-text">{accountCount}</h2>
            </div>
        </div>
    );
}

export default AccountCard;