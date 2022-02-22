const mysqlConnection = require('../../../config/db');

const registrarLabios = ({
   ID_EVALUACION,
   CORRECTA_POST,
   INCORRECTA_POST
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_labios_crear_actualizar(1,?,0,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         CORRECTA_POST,
         INCORRECTA_POST
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

const actualizarLabios = (ID_EVALUACION, {
   ID_LABIOS,
   CORRECTA_POST,
   INCORRECTA_POST
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_labios_crear_actualizar(2,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         ID_LABIOS,
         CORRECTA_POST,
         INCORRECTA_POST
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
   registrarLabios: registrarLabios,
   actualizarLabios: actualizarLabios
}