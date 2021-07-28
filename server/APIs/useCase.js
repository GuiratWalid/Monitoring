const express = require('express');
const app = express.Router();
const cn = require('../connectionDB.js');

app.post('/useCaseInitialisation', (request, response) => {
    const ipAddress = request.body.mail;
    const type = request.body.type;
    const query = "INSERT INTO useCase(mail,type) VALUES (?,?)";
    cn.query(query, [ipAddress, type], (err, data, fields) => {
        if (err)
            throw err;
        response.send("UseCase inserted successfully !!");
    });
});

app.get('/useCaseCount', (request, response) => {
    const query = 'SELECT count(id) as count FROM useCase';
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        response.send(data);
    });
});

// Count all use cases used by one user
app.get('/useCaseCountOneUser/:mail', (request, response) => {
    const mail = request.params.mail;
    const query = 'SELECT count(id) as count FROM useCase WHERE mail = ? ';
    cn.query(query, [mail], (err, data, fields) => {
        if (err)
            throw err;
        let result = {
            mail,
            count: data[0].count
        };
        response.send(result);
    });
});

// Count all use cases used by one user grouped by type
app.get('/useCaseTypeOneUser/:mail', (request, response) => {
    const mail = request.params.mail;
    const query = 'SELECT count(id) as count,type FROM useCase WHERE mail = ? GROUP BY type';
    cn.query(query, [mail], (err, data, fields) => {
        if (err)
            throw err;
        let result = [];
        let mails = [];
        data.map(item => {
            if (mails.indexOf(mail) === -1) {
                mails.push(mail);
                result.push({
                    mail,
                });
            }
            result[mails.indexOf(mail)][item.type] = item.count;

        });
        response.send(result);
    });
});

// Count all use cases used by all user
app.get('/useCaseCountAllUsers', (request, response) => {
    const query = 'SELECT count(id) as count,mail FROM useCase GROUP BY mail ORDER BY count desc';
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        response.send(data);
    });
});

// Count all useCases used by all user grouped by type
app.get('/useCaseTypeAllUsers', (request, response) => {
    const query = 'SELECT count(id) as count,mail,type FROM useCase GROUP BY mail,type';
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        let result = [];
        let mails = [];
        data.map(item => {
            if (mails.indexOf(item.mail) === -1) {
                mails.push(item.mail);
                result.push({
                    mail: item.mail,
                });
            }
            result[mails.indexOf(item.mail)][item.type] = item.count;

        });
        response.send(result);
    });
});

app.get('/useCaseType', (request, response) => {
    const query = 'SELECT count(*) as count,type FROM useCase GROUP BY type';
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        response.send(data);
    });
});

app.get('/UseCaseByYear', (request, response) => {
    const query = `SELECT type,YEAR(date) as year,count(*) as count
    FROM usecase 
    WHERE YEAR(date) > YEAR(NOW())-5
    GROUP BY type,year`;
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        response.send(data);
    });
});

module.exports = app;