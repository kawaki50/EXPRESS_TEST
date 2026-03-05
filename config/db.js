const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'mini_erp'
});

module.exports = db;