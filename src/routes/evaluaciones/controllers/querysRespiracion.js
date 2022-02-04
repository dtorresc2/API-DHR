const mysqlConnection = require('../../../config/db');

const registrarRespiracion = ({
   ID_EVALUACION,
   RES_NASALLEV,
   RES_NSAFUERTE,
   RES_BUCAL,
   BUENA_POSTURA,
   INCORPOSTURA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_repiracion_crear_actualizar(1,?,0,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         RES_NASALLEV,
         RES_NSAFUERTE,
         RES_BUCAL,
         BUENA_POSTURA,
         INCORPOSTURA
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

const actualizarOclusion = ({
   ID_EVALUACION,
   ID_RESPIRACION,
   RES_NASALLEV,
   RES_NSAFUERTE,
   RES_BUCAL,
   BUENA_POSTURA,
   INCORPOSTURA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_repiracion_crear_actualizar(2,?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         ID_RESPIRACION,
         RES_NASALLEV,
         RES_NSAFUERTE,
         RES_BUCAL,
         BUENA_POSTURA,
         INCORPOSTURA
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
   registrarRespiracion: registrarRespiracion,
   actualizarOclusion: actualizarOclusion
}