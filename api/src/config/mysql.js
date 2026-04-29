const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'../../.env')});
const mysql = require('mysql2/promise');
//require('dotenv').config();

const mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function connectMySQL() {
    try {
        const connection = await mysqlPool.getConnection();
        console.log('Conexion exitosa a mysql');
        connection.release();
    } catch(error){
        console.error ('Error al conectar con mYSQL: ', error.message);
        throw error;
    }
}

module.exports = {mysqlPool,connectMySQL};