const mysql = require('mysql');

var cn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monitoring'
});

cn.connect(err => {
    if (err)
        throw err;
    else
        console.log('DB connection Succeded .');
});

module.exports = cn;