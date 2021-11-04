const mysqlConnection = require('../../../config/db');

const registrarTratamiento = ({
   PLAN, COSTO, FECHA, ID_PIEZA, ID_SERVICIO,
   ID_HISTORIAL_ODONTO
}, NUMERO) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO tratamientos ' +
         '(numero,plan,costo,fecha,' +
         'id_pieza,id_servicio,id_historial_odonto) ' +
         'VALUES (?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         NUMERO, PLAN, COSTO, FECHA, ID_PIEZA, ID_SERVICIO,
         ID_HISTORIAL_ODONTO
      ], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "TRATAMIENTO REGISTRADO" }
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

const obtenerTratamientos = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "t.id_tratamiento AS ID_TRATAMIENTO, " +
         "t.numero AS NUMERO, " +
         "t.plan AS PLAN, " +
         "t.costo AS COSTO, " +
         "DATE_FORMAT(t.fecha,'%d/%m/%Y') AS FECHA, " +
         't.id_pieza AS ID_PIEZA, ' +
         'p.nombre AS NOMBRE_PIEZA, ' +
         't.id_servicio AS ID_SERVICIO, ' +
         's.descripcion AS DESCRIPCION_SERVICIO, ' +
         't.id_historial_odonto AS ID_HISTORIAL_ODONTO ' +
         'FROM tratamientos t ' +
         'LEFT JOIN servicios s ON t.id_servicio = s.id_servicio ' +
         'LEFT JOIN piezas p ON t.id_pieza = p.id_pieza ' +
         'WHERE t.id_historial_odonto = ? ' +
         'ORDER BY t.numero ';

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

const eliminarTratamientos = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM tratamientos ' +
         'WHERE id_historial_odonto = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'TRATAMIENTOS ELIMINADOS' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarTratamiento: registrarTratamiento,
   obtenerTratamientos: obtenerTratamientos,
   eliminarTratamientos: eliminarTratamientos
}