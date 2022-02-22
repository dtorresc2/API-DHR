const mysqlConnection = require('../../../config/db');

const registrarOclusion = ({
   ID_EVALUACION,
   RELACION_CORRECTA,
   SOBRE_MORDIDA,
   RESALTE_DENTAL,
   MORDIDA_ABIERTA,
   MORDIDA_CERRADA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_oclusion_crear_actualizar(1,?,0,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         RELACION_CORRECTA,
         SOBRE_MORDIDA,
         RESALTE_DENTAL,
         MORDIDA_ABIERTA,
         MORDIDA_CERRADA
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

const actualizarOclusion = (ID_EVALUACION, {
   ID_OCLUSION,
   RELACION_CORRECTA,
   SOBRE_MORDIDA,
   RESALTE_DENTAL,
   MORDIDA_ABIERTA,
   MORDIDA_CERRADA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_oclusion_crear_actualizar(2,?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         ID_OCLUSION,
         RELACION_CORRECTA,
         SOBRE_MORDIDA,
         RESALTE_DENTAL,
         MORDIDA_ABIERTA,
         MORDIDA_CERRADA
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
   registrarOclusion: registrarOclusion,
   actualizarOclusion: actualizarOclusion
}