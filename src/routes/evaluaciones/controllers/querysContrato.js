const mysqlConnection = require('../../../config/db');

// Registro de Citas
const registrarContrato = ({
   URL_FIRMA_DOC,
   URL_FIRMA_PAC,
   ID_EVALUACION
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_contrato_crear_actualizar(1,0,?,?,?)';

      mysqlConnection.query(query, [
         URL_FIRMA_DOC,
         URL_FIRMA_PAC,
         ID_EVALUACION
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

const obtenerContrato = ({
   ID_CONTRATO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_contrato_listado(?)';

      mysqlConnection.query(query, [
         ID_USUARIO,
         ID_EVALUACION
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

// Registro de Citas
const actualizarContrato = ({
   ID_CONTRATO,
   URL_FIRMA_DOC,
   URL_FIRMA_PAC,
   ID_EVALUACION
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_contrato_crear_actualizar(2,?,?,?,?)';

      mysqlConnection.query(query, [
         ID_CONTRATO,
         URL_FIRMA_DOC,
         URL_FIRMA_PAC,
         ID_EVALUACION
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
   registrarContrato: registrarContrato,
   obtenerContrato: obtenerContrato,
   actualizarContrato: actualizarContrato
}