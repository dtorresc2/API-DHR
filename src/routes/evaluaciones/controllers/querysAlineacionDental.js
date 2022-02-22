const mysqlConnection = require('../../../config/db');

const registrarAlineacionDental = ({
   ID_EVALUACION,
   BUENA_ALIMENTACION,
   APILLAMIENTO_MAXILLAR,
   APILLAMIENTO_MANDIBULA,
   LINEA_MEDIA,
   DISCREPANCIA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_alineacion_dental_crear_actualizar(1,?,0,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         BUENA_ALIMENTACION,
         APILLAMIENTO_MAXILLAR,
         APILLAMIENTO_MANDIBULA,
         LINEA_MEDIA,
         DISCREPANCIA
      ], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const actualizarAlineacionDental = (ID_EVALUACION, {
   ID_ALINEACION,
   BUENA_ALIMENTACION,
   APILLAMIENTO_MAXILLAR,
   APILLAMIENTO_MANDIBULA,
   LINEA_MEDIA,
   DISCREPANCIA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_alineacion_dental_crear_actualizar(2,?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         ID_ALINEACION,
         BUENA_ALIMENTACION,
         APILLAMIENTO_MAXILLAR,
         APILLAMIENTO_MANDIBULA,
         LINEA_MEDIA,
         DISCREPANCIA
      ], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarAlineacionDental: registrarAlineacionDental,
   actualizarAlineacionDental: actualizarAlineacionDental
}