const express = require('express');
const app = express.Router();
const cn = require('../connectionDB.js');

app.post('/visitorInitialisation', (req, res) => {
    const ipAddress = req.body.ipAddress;
    const screenHeight = req.body.screenHeight;
    const screenWidth = req.body.screenWidth;
    const query = `INSERT INTO visitor(ipAddress,screenHeight,screenWidth) VALUES (?,?,?)`;
    cn.query(query, [ipAddress, screenHeight, screenWidth], (err, data, fields) => {
        if (err)
            throw err;
        res.send("Visitor inserted successfully !!");
    });
});

app.get('/visitorCount', (request, response) => {
    const query = 'SELECT count(*) as count FROM visitor';
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        response.send(data);
    });
});

// Count Visitors Last 24 Hours : Hour by Hour
app.get('/visitorLastHours', (request, response) => {
    const query = `SELECT date,time FROM visitor 
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

// Count Visitors Last 30 Days : Day by Day
app.get('/visitorLastDays', (request, response) => {
    const query = "SELECT date,time FROM visitor WHERE date BETWEEN (CURDATE() - INTERVAL 29 DAY) AND CURDATE()";
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

// Count Visitors Last 12 Months : Month by Month
app.get('/visitorLastMonths', (request, response) => {
    const query = `SELECT date,time FROM visitor 
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

app.get('/plateform', (request, response) => {
    const query = 'SELECT screenHeight,screenWidth FROM visitor';
    cn.query(query, (err, data, fields) => {
        if (err)
            throw err;
        let pcCount = 0;
        let telCount = 0;
        let tabletCount = 0;
        data.map(item => {
            // min resolution pc screen en pixel : 1024x768
            if (item.screenHeight >= 1024 && item.screenWidth >= 768)
                pcCount++;
            // max resolution tel screen en pixel : 414x736
            else if (item.screenWidth <= 414 && item.screenHeight <= 736)
                telCount++;
            else
                tabletCount++;
        });
        response.send({ pcCount, telCount, tabletCount });
    });
});

module.exports = app;