const mysqlConnection = require('../../../config/db');

const registrarDesarrollo = ({
   ID_EVALUACION,
   DES_FACBUENO,
   DEF_TERCIOMED,
   DEF_TERINF,
   CRECIMIENTO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_desarrollo_crear_actualizar(1,?,0,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         DES_FACBUENO,
         DEF_TERCIOMED,
         DEF_TERINF,
         CRECIMIENTO
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
   registrarDesarrollo: registrarDesarrollo
}