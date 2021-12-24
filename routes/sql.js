var mysql = require('mysql');

var connect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: '3306',       
    database: 'express', // 数据库名称
});

module.exports = connect;
