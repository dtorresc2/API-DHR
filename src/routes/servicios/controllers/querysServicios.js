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

const obtenerListadoServicios = ({
   ID_USUARIO,
   ID_SERVICIO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_servicios_listado(?, ?)';

      mysqlConnection.query(query, [ID_USUARIO, ID_SERVICIO], (err, rows, fields) => {
         if (!err) {
            resolve(rows);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const actualizarServicio = ({ id }, { DESCRIPCION, MONTO, ESTADO }) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE servicios SET ' +
         'descripcion = ?,' +
         'monto = ?, ' +
         'estado = ? ' +
         'WHERE id_servicio = ?';

      mysqlConnection.query(query, [DESCRIPCION, MONTO, ESTADO, id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'SERVICIO ACTUALIZADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const actualizarEstadoServicio = ({ id }, { ESTADO }) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE servicios SET ' +
         'estado = ? ' +
         'WHERE id_servicio = ?';

      mysqlConnection.query(query, [ESTADO, id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'SERVICIO ACTUALIZADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const eliminarServicio = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM servicios ' +
         'WHERE id_servicio = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'SERVICIO ELIMINADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarServicio: registrarServicio,
   obtenerListadoServicios: obtenerListadoServicios,
   actualizarServicio: actualizarServicio,
   actualizarEstadoServicio: actualizarEstadoServicio,
   eliminarServicio: eliminarServicio
}