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

const obtenerListadoServicios = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "id_servicio AS ID_SERVICIO, " +
         "descripcion AS DESCRIPCION, " +
         'monto AS MONTO, ' +
         'estado AS ESTADO, ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM servicios WHERE id_usuario = ?';

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

const obtenerServicioEspecifico = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "id_servicio AS ID_SERVICIO, " +
         "descripcion AS DESCRIPCION, " +
         'monto AS MONTO, ' +
         'estado AS ESTADO, ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM servicios WHERE id_servicio = ?';

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
   obtenerListadoServicios : obtenerListadoServicios,
   obtenerServicioEspecifico : obtenerServicioEspecifico,
   actualizarServicio : actualizarServicio,
   actualizarEstadoServicio : actualizarEstadoServicio,
   eliminarServicio : eliminarServicio
}