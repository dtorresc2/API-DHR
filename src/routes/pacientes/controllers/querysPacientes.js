const mysqlConnection = require('../../../config/db');
const bcrypt = require('bcrypt');
// SELECT version();

// Funcion de Prueba
const obtenerVersionMYSQL = () => {
   return new Promise((resolve, reject) => {
       const query = 'SELECT version()';
       mysqlConnection.query(query, (err, rows, fields) => {
           if (!err) {
               resolve(rows[0]);
           }
           else {
               reject('Error');
           }
       });
   });
}

module.exports = {
   obtenerVersionMYSQL : obtenerVersionMYSQL
}