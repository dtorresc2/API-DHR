const mysqlConnection = require('../../../config/db');

const registrarFASuperior = ({
   ID_EVALUACION,
   iNORMAL,
   iESTRECHA,
   iAPLANADO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_arco_superior_crear_actualizar(1,?,0,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         iNORMAL,
         iESTRECHA,
         iAPLANADO
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

const actualizarFASuperior = ({
   ID_EVALUACION,
   iFA_SUPERIOR,
   iNORMAL,
   iESTRECHA,
   iAPLANADO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_arco_superior_crear_actualizar(2,?,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         iFA_SUPERIOR,
         iNORMAL,
         iESTRECHA,
         iAPLANADO
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
   registrarFASuperior: registrarFASuperior,
   actualizarFASuperior: actualizarFASuperior
}