const mysqlConnection = require('../../../config/db');

// Registrar pagos
const registrarPago = ({ PAGO, DESCRIPCION, FECHA, ID_FICHA }) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO pagos ' +
         '(pago,descripcion,fecha,id_ficha) ' +
         'VALUES (?,?,?,?)';

      mysqlConnection.query(query, [PAGO, DESCRIPCION, FECHA, ID_FICHA], (err, rows, fields) => {
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

// listado de pagos x ficha
const obtenerListadoPagosFicha = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_pago AS ID_PAGO, ' +
         'pago AS PAGO, ' +
         'descripcion AS DESCRIPCION, ' +
         "DATE_FORMAT(fecha,'%d/%m/%Y') AS FECHA, " +
         "id_ficha AS ID_FICHA " +
         'FROM pagos ' +
         'WHERE id_ficha = ? ';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve(rows);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Eliminar Pagos
const eliminarPago = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM pagos ' +
         'WHERE id_pago = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'PAGO ELIMINADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Eliminar Pagos
const eliminarPagoFicha = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM pagos ' +
         'WHERE id_ficha = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'PAGOS ELIMINADOS' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}


module.exports = {
   registrarPago: registrarPago,
   obtenerListadoPagosFicha: obtenerListadoPagosFicha,
   eliminarPago: eliminarPago,
   eliminarPagoFicha: eliminarPagoFicha
}