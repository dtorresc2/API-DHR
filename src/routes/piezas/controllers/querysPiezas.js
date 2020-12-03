const mysqlConnection = require('../../../config/db');

// Registrar piezas
const registrarPieza = ({ NUMERO, NOMBRE, ID_USUARIO }) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO piezas ' +
         '(numero,nombre,id_usuario) ' +
         'VALUES (?,?,?)';

      mysqlConnection.query(query, [NUMERO, NOMBRE, ID_USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "PIEZA REGISTRADA" }
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

// Listado de Piezas
const obtenerListadoPiezas = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "id_pieza AS ID_PIEZA, " +
         "numero AS NUMERO, " +
         'nombre AS NOMBRE, ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM piezas WHERE id_usuario = ?';

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

const obtenerPiezaEspecifica = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "id_pieza AS ID_PIEZA, " +
         "numero AS NUMERO, " +
         'nombre AS NOMBRE, ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM piezas WHERE id_pieza = ?';

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

// Actualizar piezas
const actualizarPiezas = ({ id }, { NUMERO, NOMBRE }) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE piezas SET ' +
         'numero = ?,' +
         'nombre = ? ' +
         'WHERE id_pieza = ?';

      mysqlConnection.query(query, [NUMERO, NOMBRE, id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'PIEZA ACTUALIZADA' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Eliminar piezas
const eliminarPieza = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM piezas ' +
         'WHERE id_pieza = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'PIEZA ELIMINADA' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarPieza: registrarPieza,
   obtenerListadoPiezas: obtenerListadoPiezas,
   obtenerPiezaEspecifica : obtenerPiezaEspecifica,
   actualizarPiezas: actualizarPiezas,
   eliminarPieza : eliminarPieza
}