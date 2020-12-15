const mysql = require('mysql');
const dotenv = require('dotenv');
// require('../../src/config/')

// Configuracion archivo - variables de entorno
const envFile = "./src/config/.env";
dotenv.config({ path: envFile });

const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectTimeout : 30000
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log('Conexion Correcta');
    }
});

module.exports = mysqlConnection;