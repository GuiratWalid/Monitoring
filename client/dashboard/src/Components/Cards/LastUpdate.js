import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { modeContext } from '../../Context/ModeContext';

const LastUpdate = () => {
    const { darkMode } = useContext(modeContext);
    const [lastUpdate, setLastUpdate] = useState({});
    useEffect(() => {
        Axios.get("http://localhost:5000/lastUpdate").then(
            response => setLastUpdate(response.data[0])
        );
    }, []);
    return (
        <div className="card rounded m-3" style={darkMode ?
            { backgroundColor: "rgb(57,58,61)", color: "#fff" } :
            { backgroundColor: "#fff", color: "#000" }}>
            <div className="card-header">
                <i className="fas fa-sort-amount-up icon"></i>
            </div>
            <div className="card-body">
                <h1 className="card-title">Last Update</h1>
                <h3 className="card-text">Version : {lastUpdate.version}</h3>
                <h5 className="card-text">Date : {lastUpdate.date}</h5>
            </div>
        </div>
    );
}

export default LastUpdate;