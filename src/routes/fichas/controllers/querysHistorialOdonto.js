const mysqlConnection = require('../../../config/db');

// Registrar historial odontodologico
const registrarHistorialOdontodologico = ({
   DOLOR, DESCRIPCION_DOLOR, GINGIVITIS,
   OTROS, ID_FICHA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO historial_odonto ' +
         '(dolor,descripcion_dolor,gingivitis,' +
         'otros,id_ficha) ' +
         'VALUES (?,?,?,?,?)';

      mysqlConnection.query(query, [
         DOLOR, DESCRIPCION_DOLOR, GINGIVITIS,
         OTROS, ID_FICHA
      ], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "HISTORIAL REGISTRADO" }
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

const obtenerHistorialOdontodologico = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "id_historial_odonto AS ID_HISTORIAL_ODONTO, " +
         "dolor AS DOLOR, " +
         "descripcion_dolor AS DESCRIPCION_DOLOR, " +
         "gingivitis AS GINGIVITIS, " +
         'otros AS OTROS, ' +
         'id_ficha AS ID_FICHA ' +
         'FROM historial_odonto WHERE id_ficha = ?';

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


const obtenerHistorialOdontodologicoEspecifico = (id) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "id_historial_odonto AS ID_HISTORIAL_ODONTO, " +
         "dolor AS DOLOR, " +
         "descripcion_dolor AS DESCRIPCION_DOLOR, " +
         "gingivitis AS GINGIVITIS, " +
         'otros AS OTROS, ' +
         'id_ficha AS ID_FICHA ' +
         'FROM historial_odonto WHERE id_historial_odonto = ?';

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
const actualizarHistorialOdontogologico = ({ id }, {
   DOLOR, DESCRIPCION_DOLOR, GINGIVITIS, OTROS,
}) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE historial_odonto SET ' +
         'dolor = ?,' +
         'descripcion_dolor = ?,' +
         'gingivitis = ?,' +
         'otros = ? ' +
         'WHERE id_ficha = ?';

      mysqlConnection.query(query, [
         DOLOR, DESCRIPCION_DOLOR, GINGIVITIS, OTROS, id
      ], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'HISTORIAL ACTUALIZADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const eliminarHistorialOdontodologico = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM historial_odonto ' +
         'WHERE id_ficha = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'HISTORIAL ELIMINADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarHistorialOdontodologico: registrarHistorialOdontodologico,
   obtenerHistorialOdontodologico: obtenerHistorialOdontodologico,
   obtenerHistorialOdontodologicoEspecifico: obtenerHistorialOdontodologicoEspecifico,
   actualizarHistorialOdontogologico: actualizarHistorialOdontogologico,
   eliminarHistorialOdontodologico: eliminarHistorialOdontodologico
}