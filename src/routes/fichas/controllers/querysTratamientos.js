const mysqlConnection = require('../../../config/db');

const registrarTratamiento = ({
   PLAN, COSTO, FECHA, ID_PIEZA, ID_SERVICIO,
   ID_HISTORIAL_ODONTO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO tratamientos ' +
         '(plan,costo,fecha,' +
         'id_pieza,id_servicio,id_historial_odonto) ' +
         'VALUES (?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         PLAN, COSTO, FECHA, ID_PIEZA, ID_SERVICIO,
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

module.exports = {
   registrarTratamiento : registrarTratamiento
}