const mysql = require('mysql2/promise');
//connection name: yolohome
const connection = mysql.createPool({
    host: 'localhost',
    user: 'joyboy',
    password: '321323',
    database: 'yolohome',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;