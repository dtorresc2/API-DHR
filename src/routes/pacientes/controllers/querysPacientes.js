const mysqlConnection = require('../../../config/awsbd');
const bcrypt = require('bcrypt');
// SELECT version();

// Funcion de Prueba
const obtenerVersionMYSQL = ({ email, user, password }) => {
   return new Promise((resolve, reject) => {
       const query = 'SELECT version()';
       mysqlConnection.query(query, (err, rows, fields) => {
           if (!err) {
               resolve(rows[0]);
           }
           else {
               reject('Error al insertar usuario');
           }
       });
   });
}

module.exports = {
   obtenerVersionMYSQL : obtenerVersionMYSQL
}