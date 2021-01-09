const mysqlConnection = require('../../../config/db');

// Listado de Bitacora
const obtenerListadoBitacora = () => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_bitacora AS ID_BITACORA, ' +
         'accion AS ACCION, ' +
         // "DATE_FORMAT(fecha,'%d/%m/%Y') AS FECHA, " +
         "CONCAT(DATE_FORMAT(fecha,'%d/%m/%Y'),' ',DATE_FORMAT(fecha,'%l:%i:%s %p')) AS FECHA, " +
         "id_cuenta AS ID_CUENTA, " +
         "id_usuario AS ID_USUARIO, " +
         "(SELECT usuario FROM cuentas WHERE cuentas.id_cuenta = bitacora.id_cuenta) AS CUENTA " +
         'FROM bitacora';

      mysqlConnection.query(query, (err, rows, fields) => {
         if (!err) {
            resolve(rows);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Listado de Bitacora
const obtenerListadoBitacoraXUsuario = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_bitacora AS ID_BITACORA, ' +
         'accion AS ACCION, ' +
         "CONCAT(DATE_FORMAT(fecha,'%d/%m/%Y'),' ',DATE_FORMAT(fecha,'%l:%i:%s %p')) AS FECHA, " +
         "id_cuenta AS ID_CUENTA, " +
         "id_usuario AS ID_USUARIO, " +
         "(SELECT usuario FROM cuentas WHERE cuentas.id_cuenta = bitacora.id_cuenta) AS CUENTA " +
         'FROM bitacora ' +
         'WHERE id_usuario = ? ';

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

// Registrar bitacora
const registrarBitacora = ({ ACCION, FECHA, ID_CUENTA, ID_USUARIO }) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO bitacora ' +
         '(accion,fecha,id_cuenta,id_usuario) ' +
         'VALUES (?,?,?,?)';

      mysqlConnection.query(query, [ACCION, FECHA, ID_CUENTA, ID_USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "ACCION REGISTRADA" }
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
   obtenerListadoBitacora: obtenerListadoBitacora,
   registrarBitacora: registrarBitacora,
   obtenerListadoBitacoraXUsuario: obtenerListadoBitacoraXUsuario
}