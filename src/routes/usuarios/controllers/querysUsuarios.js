const mysqlConnection = require('../../../config/db');
const bcrypt = require('bcrypt');

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
            resolve(rows[0]);
         }
         else {
            reject('Error');
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
            reject('Error');
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
            resolve(rows[0]);
         }
         else {
            reject('Error');
         }
      });
   });
}

module.exports = {
   obtenerListadoUsuarios: obtenerListadoUsuarios,
   obtenerUsuarioEspecifico: obtenerUsuarioEspecifico,
   registrarUsuario: registrarUsuario
}