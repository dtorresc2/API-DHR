const mysqlConnection = require('../../../config/db');

// Listado de Usuarios
const obtenerListadoUsuarios = () => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_usuario AS ID_USUARIO, ' +
         'codigo AS CODIGO, ' +
         'nombre AS NOMBRE, ' +
         'url AS URL, ' +
         "DATE_FORMAT(fecha,'%d/%m/%y') AS FECHA, " +
         'app AS APP, ' +
         'web AS WEB ' +
         'FROM usuarios';

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

// Usuario especifico
const obtenerUsuarioEspecifico = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_usuario AS ID_USUARIO, ' +
         'codigo AS CODIGO, ' +
         'nombre AS NOMBRE, ' +
         'url AS URL, ' +
         "DATE_FORMAT(fecha,'%d/%m/%y') AS FECHA, " +
         'app AS APP, ' +
         'web AS WEB ' +
         'FROM usuarios ' +
         'WHERE id_usuario = ? ';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
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
const registrarUsuario = ({ CODIGO, NOMBRE, URL, FECHA, APP, WEB }) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO usuarios ' +
         '(codigo,nombre,url,fecha,app,web) ' +
         'VALUES (?,?,?,?,?,?)';

      mysqlConnection.query(query, [CODIGO, NOMBRE, URL, FECHA, APP, WEB], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "USUARIO REGISTRADO" }
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

// Obtener codigo de usuario general
const obtenerIdUsuario = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM usuarios ' +
         'WHERE codigo = ? ';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Actualizar usuarios
const actualizarUsuario = ({ id }, { NOMBRE, URL }) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE usuarios SET ' +
         'nombre = ?, ' +
         'url = ? ' +
         'WHERE id_usuario = ?';

      mysqlConnection.query(query, [NOMBRE, URL, id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'USUARIO ACTUALIZADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Eliminar usuarios
const eliminarUsuario = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM usuarios ' +
         'WHERE id_usuario = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'USUARIO ELIMINADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   obtenerListadoUsuarios: obtenerListadoUsuarios,
   obtenerUsuarioEspecifico: obtenerUsuarioEspecifico,
   registrarUsuario: registrarUsuario,
   obtenerIdUsuario: obtenerIdUsuario,
   actualizarUsuario: actualizarUsuario,
   eliminarUsuario: eliminarUsuario
}