const mysqlConnection = require('../../../config/db');

// Listado de Cuentas
const obtenerListadoCuentas = () => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_cuenta AS ID_CUENTA, ' +
         'usuario AS USUARIO, ' +
         'password AS PASSWORD, ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM cuentas';

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

const obtenerListadoCuentasPorUsuario = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_cuenta AS ID_CUENTA, ' +
         'usuario AS USUARIO, ' +
         'password AS PASSWORD, ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM cuentas ' +
         'WHERE id_usuario = ?' +

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

const obtenerCuentaEspecifica = ({ id, user }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_cuenta AS ID_CUENTA, ' +
         'usuario AS USUARIO, ' +
         'password AS PASSWORD, ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM cuentas ' +
         'WHERE id_cuenta = ? ' +
         'AND id_usuario = ?' +

         mysqlConnection.query(query, [id, user], (err, rows, fields) => {
            if (!err) {
               resolve(rows[0]);
            }
            else {
               reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
            }
         });
   });
}

const obtenerCuentaSesion = ({ ID_USUARIO, USUARIO }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_cuenta AS ID_CUENTA, ' +
         'password AS PASSWORD ' +
         'FROM cuentas ' +
         'WHERE id_usuario = ? ' +
         'AND usuario = ? ';

      mysqlConnection.query(query, [ID_USUARIO, USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(rows);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const obtenerConteoCuentaSesion = ({ ID_USUARIO, USUARIO }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'IFNULL(COUNT(*),0) AS CONTEO ' +
         'FROM cuentas ' +
         'WHERE id_usuario = ? ' +
         'AND usuario = ? ';

      mysqlConnection.query(query, [ID_USUARIO, USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Registrar usuarios
const registrarCuenta = ({ USUARIO, PASSWORD, ID_USUARIO }) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO cuentas ' +
         '(usuario,password,id_usuario) ' +
         'VALUES (?,?,?)';

      mysqlConnection.query(query, [USUARIO, PASSWORD, ID_USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "CUENTA REGISTRADA" }
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
   obtenerListadoCuentas: obtenerListadoCuentas,
   obtenerListadoCuentasPorUsuario: obtenerListadoCuentasPorUsuario,
   obtenerCuentaEspecifica: obtenerCuentaEspecifica,
   obtenerCuentaSesion: obtenerCuentaSesion,
   registrarCuenta: registrarCuenta,
   obtenerConteoCuentaSesion : obtenerConteoCuentaSesion
}