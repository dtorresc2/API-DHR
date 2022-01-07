const mysqlConnection = require('../../../config/db');

const registrarDisfucion = ({
   ID_EVALUACION,
   TEMPORAL,
   PTERIGOIDEO,
   MASATEROS,
   CERVICAL,
   TRAPECIO,
   TMJCLICK,
   TMJDOLOR
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_difusion_tmj_crear_actualizar(1,?,0,?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         TEMPORAL,
         PTERIGOIDEO,
         MASATEROS,
         CERVICAL,
         TRAPECIO,
         TMJCLICK,
         TMJDOLOR
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

const actualizarDifusion = ({
   ID_EVALUACION,
   ID_DEGLUCION,
   TEMPORAL,
   PTERIGOIDEO,
   MASATEROS,
   CERVICAL,
   TRAPECIO,
   TMJCLICK,
   TMJDOLOR
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_difusion_tmj_crear_actualizar(2,?,?,?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         ID_DEGLUCION,
         TEMPORAL,
         PTERIGOIDEO,
         MASATEROS,
         CERVICAL,
         TRAPECIO,
         TMJCLICK,
         TMJDOLOR
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
   registrarDisfucion: registrarDisfucion,
   actualizarDifusion: actualizarDifusion
}