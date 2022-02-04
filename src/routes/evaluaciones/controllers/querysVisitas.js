const mysqlConnection = require('../../../config/db');

const registrarVisita = ({
   ID_EVALUACION,
   FECHA,
   DESCRIPCION,
   COSTO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_visitas_crear(?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         FECHA,
         DESCRIPCION,
         COSTO
      ], (err, rows, fields) => {
         // console.log(err);
         if (!err) {
            resolve({ ID: rows.insertId, MENSAJE: "VISITA REGISTRADA" });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const eliminarVisitas = (
   ID_EVALUACION
) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM visitas WHERE id_evaluacion = ?';

      mysqlConnection.query(query, [
         ID_EVALUACION
      ], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: rows.insertId, MENSAJE: "VISITAS ELIMINADAS" });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarVisita: registrarVisita,
   eliminarVisitas: eliminarVisitas
}