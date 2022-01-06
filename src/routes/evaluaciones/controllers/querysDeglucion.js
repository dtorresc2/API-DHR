const mysqlConnection = require('../../../config/db');

const registrarDeglucion = ({
   ID_EVALUACION,
   PATRON_CORRECTO,
   PATRON_INCORRECTO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_deglucion_crear_actualizar(1,?,0,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         PATRON_CORRECTO,
         PATRON_INCORRECTO
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

const actualizarDeglucion = ({
   ID_EVALUACION,
   ID_DEGLUCION,
   PATRON_CORRECTO,
   PATRON_INCORRECTO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_deglucion_crear_actualizar(2,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         ID_DEGLUCION,
         PATRON_CORRECTO,
         PATRON_INCORRECTO
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
   registrarDeglucion: registrarDeglucion,
   actualizarDeglucion: actualizarDeglucion
}