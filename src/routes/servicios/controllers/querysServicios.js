const mysqlConnection = require('../../../config/db');

// Registrar piezas
const registrarServicio = ({ DESCRIPCION, MONTO, ESTADO, ID_USUARIO }) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO servicios ' +
         '(descripcion,monto,estado,id_usuario) ' +
         'VALUES (?,?,?,?)';

      mysqlConnection.query(query, [DESCRIPCION, MONTO, ESTADO, ID_USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "SERVICIO REGISTRADO" }
            );
         }
         else {
            reject(
               { ID: -1, MENSAJE: "ERROR", ERROR: err }
            );
         }
      });
   });
}

module.exports = {
   registrarServicio: registrarServicio
}