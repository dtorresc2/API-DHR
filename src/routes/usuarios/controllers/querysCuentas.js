const mysqlConnection = require('../../../config/db');
const bcrypt = require('bcrypt');
const { eliminarUsuario } = require('./querysUsuarios');

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
         'WHERE id_usuario = ?';

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
            resolve(rows[0]);
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

const desencriptarPassowrd = (password, hash) => {
   return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function (err, result) {
         if (!err) {
            if (result) {
               resolve({ MENSAJE: "USUARIO AUTENTICADO", ESTADO: 1 });
            }
            else {
               resolve({ MENSAJE: "PASSWORD INCORRECTO", ESTADO: 0 });
            }
         }
         else {
            reject({ MENSAJE: "ERROR AL COMPARAR PASSWORD", ESTADO: -1, });
         }
      });
   });
}

const actualizarPassword = ({ PASSWORD }, { id }) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE cuentas SET password = ? WHERE id_cuenta = ?';
      mysqlConnection.query(query, [PASSWORD, id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: "PASSWORD ACTUALIZADO" });
         }
         else {
            reject({ ID: id, MENSAJE: "ERROR" });
         }
      });
   });
}

// Eliminar usuarios
const eliminarCuenta = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM cuentas ' +
         'WHERE id_cuenta = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'CUENTA ELIMINADA' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
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
   obtenerConteoCuentaSesion: obtenerConteoCuentaSesion,
   desencriptarPassowrd: desencriptarPassowrd,
   actualizarPassword: actualizarPassword,
   eliminarCuenta: eliminarUsuario
}