const express = require('express');
const app = express.Router();
const cn = require('../connectionDB.js');

app.post('/updateInitialisation', (req, res) => {
    const version = req.body.version;
    const message = req.body.message;
    const query = `INSERT INTO updates(version,message) VALUES (?,?)`;
    cn.query(query, [version, message], (err, data, fields) => {
        if (err)
            throw err;
        res.send("Version inserted successfully !!");
    });
});

app.get('/lastUpdates', (request, response) => {
    const query = 'SELECT version,date,message FROM updates ORDER BY date DESC';
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        response.send(data);
    });
});

app.get('/lastUpdate', (request, response) => {
    const query = `SELECT version,CONCAT(date,' ',time ) as date 
            FROM updates 
            WHERE date = (SELECT max(date) FROM updates)`;
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        response.send(data);
    });
});

module.exports = app;