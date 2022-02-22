const mysqlConnection = require('../../../config/db');

const registrarHabitos = ({
   ID_EVALUACION,
   BRUXISMO,
   SUCCION,
   CHUPETE,
   BIBERON,
   RONCA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_habitos_crear_actualizar(1,?,0,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         BRUXISMO,
         SUCCION,
         CHUPETE,
         BIBERON,
         RONCA
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

const actualizarHabitos = (ID_EVALUACION, {
   ID_HABITOS,
   BRUXISMO,
   SUCCION,
   CHUPETE,
   BIBERON,
   RONCA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_habitos_crear_actualizar(2,?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         ID_HABITOS,
         BRUXISMO,
         SUCCION,
         CHUPETE,
         BIBERON,
         RONCA
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
   registrarHabitos: registrarHabitos,
   actualizarHabitos: actualizarHabitos
}