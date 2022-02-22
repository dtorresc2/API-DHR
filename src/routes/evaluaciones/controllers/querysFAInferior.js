const mysqlConnection = require('../../../config/db');

const registrarFAInferior = ({
   ID_EVALUACION,
   NORMAL,
   ESTRECHA,
   APLANADO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_arco_inferior_crear_actualizar(1,?,0,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         NORMAL,
         ESTRECHA,
         APLANADO
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

const actualizarFAInferior = (ID_EVALUACION,{
   ID_FA_INFERIOR,
   NORMAL,
   ESTRECHA,
   APLANADO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_arco_inferior_crear_actualizar(2,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         ID_FA_INFERIOR,
         NORMAL,
         ESTRECHA,
         APLANADO
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
   registrarFAInferior: registrarFAInferior,
   actualizarFAInferior: actualizarFAInferior
}