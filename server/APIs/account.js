const express = require('express');
const app = express.Router();
const cn = require('../connectionDB.js');

app.post('/accountInitialisation', (request, response) => {
    const type = request.body.type;
    const mail = request.body.mail;
    const ipAddress = request.body.ipAddress;
    const query = `INSERT INTO account(ipAddress,mail,type) VALUES(?,?,?)`;
    cn.query(query, [ipAddress, mail, type], (err, data, fields) => {
        if (err)
            if (err.sqlMessage)
                response.send("Mail address is duplicated !!");
            else throw err;
        response.send("Account inserted successfully !!");
    });
});

// Count accounts
app.get('/accountCount', (request, response) => {
    const query = `SELECT count(*) as count FROM account`;
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        response.send(data);
    });
});

// sign up with Facebook , Github , Gmail or creating a new application account
app.get('/accountType', (request, response) => {
    const query = `SELECT type,count(*) as count FROM account GROUP BY type`;
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        response.send(data);
    });
});

// Count Accounts Last 24 Hours : Hour by Hour
app.get('/accountLastHours', (request, response) => {
    const query = `SELECT date,time FROM account 
    WHERE CONCAT(date, ' ', time) >= CONCAT(DATE(NOW() - INTERVAL 1 DAY),' ',HOUR(NOW())+1,':00:00')`;
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;

        let hours = [];
        let count = [];
        let now = new Date();
        let currentDate = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours()];
        for (let i = 0; i < 24; i++) {
            if (currentDate[3] - i < 0) {
                hours.push(currentDate[3] - i + 24);
            }
            else
                hours.push(currentDate[3] - i);
            count.push(0);
        }
        data.map(item => {
            let time = item.time.split(':').map(x => parseInt(x));
            let index = hours.indexOf(time[0])
            count[index]++;
        });
        let result = [];
        for (let i = 0; i < 24; i++)
            result.push({
                hour: hours[i],
                count: count[i]
            });

        response.send(result);
    });
});

// Count Accounts Last 30 Days : Day by Day
app.get('/accountLastDays', (request, response) => {
    const query = "SELECT date,time FROM account WHERE date BETWEEN (CURDATE() - INTERVAL 29 DAY) AND CURDATE()";
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        let days = [];
        let count = [];
        let now = new Date();
        let monthDays = 0;
        let currentDate = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
        for (let i = 0; i < 30; i++) {
            if (currentDate[2] - i <= 0) {
                if (currentDate[1] === 2 || currentDate[1] === 2 || currentDate[1] === 4 || currentDate[1] === 6 || currentDate[1] === 8 || currentDate[1] === 9 || currentDate[1] === 11) {
                    monthDays = 31;
                }
                else if (currentDate[1] === 3) {
                    if (currentDate[0] % 4 === 0) {
                        monthDays = 29;
                    }
                    else {
                        monthDays = 28;
                    }
                }
                else {
                    monthDays = 30;
                }
                days.push(currentDate[2] - i + monthDays);
            }
            else
                days.push(currentDate[2] - i);
            count.push(0);
        }
        data.map(item => {
            let date = [item.date.getFullYear(), item.date.getMonth() + 1, item.date.getDate()];
            let index = currentDate[1] === date[1] ? days.indexOf(date[2]) : days.lastIndexOf(date[2]);
            count[index]++;
        });
        let result = [];
        for (let i = 0; i < 30; i++)
            result.push({
                day: days[i],
                count: count[i]
            });

        response.send(result);
    });
});

// Count Accounts Last 12 Months : Month by Month
app.get('/accountLastMonths', (request, response) => {
    const query = `SELECT date,time FROM account 
    WHERE (YEAR(date) = YEAR(NOW())
    AND MONTH(date) <= MONTH(NOW()) )
    OR (YEAR(date) = YEAR(NOW())-1
    AND MONTH(date) > MONTH(NOW()) )`;
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        let months = [];
        let count = [];
        let now = new Date();
        let currentDate = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
        for (let i = 0; i < 12; i++) {
            currentDate[1] - i <= 0 ?
                months.push(currentDate[1] - i + 12) :
                months.push(currentDate[1] - i);
            count.push(0);
        }
        data.map(item => {
            let date = [item.date.getFullYear(), item.date.getMonth() + 1, item.date.getDate()];
            let index = months.indexOf(date[1]);
            count[index]++;
        });
        let result = [];
        for (let i = 0; i < 12; i++)
            result.push({
                month: months[i],
                count: count[i]
            });
        response.send(result);
    });
});

app.delete('/deleteAccount/:mail', (request, response) => {
    const mail = request.params.mail;
    console.log(mail);
    const query = `DELETE FROM account WHERE mail = ?`;
    cn.query(query, [mail], (err, data, fields) => {
        if (err)
            throw err;
        response.send("Account deleted successfully !!");
    });
});

module.exports = app;