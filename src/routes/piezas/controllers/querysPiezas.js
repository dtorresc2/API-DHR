const mysqlConnection = require('../../../config/db');

// Registrar piezas
const registrarPieza = ({ NUMERO, NOMBRE, ESTADO, ID_USUARIO }) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO piezas ' +
         '(numero,nombre,estado,id_usuario) ' +
         'VALUES (?,?,?,?)';

      mysqlConnection.query(query, [NUMERO, NOMBRE, ESTADO, ID_USUARIO], (err, rows, fields) => {
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
const obtenerListadoPiezas = ({
   ID_USUARIO,
   ID_PIEZA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_piezas_listado(?, ?)';

      mysqlConnection.query(query, [ID_USUARIO, ID_PIEZA], (err, rows, fields) => {
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
const actualizarPiezas = ({ id }, { NUMERO, NOMBRE, ESTADO }) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE piezas SET ' +
         'numero = ?,' +
         'nombre = ?, ' +
         'estado = ? ' +
         'WHERE id_pieza = ?';

      mysqlConnection.query(query, [NUMERO, NOMBRE, ESTADO, id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'PIEZA ACTUALIZADA' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const actualizarEstadoPieza = ({ id }, { ESTADO }) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE piezas SET ' +
         'estado = ? ' +
         'WHERE id_pieza = ?';

      mysqlConnection.query(query, [ESTADO, id], (err, rows, fields) => {
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
   actualizarPiezas: actualizarPiezas,
   actualizarEstadoPieza: actualizarEstadoPieza,
   eliminarPieza: eliminarPieza
}