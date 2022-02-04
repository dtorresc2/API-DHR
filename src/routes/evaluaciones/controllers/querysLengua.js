const mysqlConnection = require('../../../config/db');

const registrarLengua = ({
   ID_EVALUACION,
   CORRECTA_POSICION,
   INCORRECTA_POSICION,
   INSERCION
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_lengua_crear_actualizar(1,?,0,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         CORRECTA_POSICION,
         INCORRECTA_POSICION,
         INSERCION
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

const actualizarLengua = ({
   ID_EVALUACION,
   ID_LENGUA,
   CORRECTA_POSICION,
   INCORRECTA_POSICION,
   INSERCION
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_lengua_crear_actualizar(2,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         ID_LENGUA,
         CORRECTA_POSICION,
         INCORRECTA_POSICION,
         INSERCION
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
   registrarLengua: registrarLengua,
   actualizarLengua: actualizarLengua
}