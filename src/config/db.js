const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: "dhrbd.cfluyrpcigfd.us-east-1.rds.amazonaws.com",
    user: "admin_dhr",
    password: "admin-dhr1234",
    database: "db_dhr"
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