const mysqlConnection = require('../../../config/db');

// Registrar pagos
const registrarPago = ({ PAGO, DESCRIPCION, ID_FICHA }) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO pagos ' +
         '(pago,descripcion,id_ficha) ' +
         'VALUES (?,?,?)';

      mysqlConnection.query(query, [PAGO, DESCRIPCION, ID_FICHA], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "PAGO REGISTRADO" }
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
   registrarPago: registrarPago
}