const mysqlConnection = require('../../../config/db');

const registrarPago = ({
   ID_EVALUACION,
   FECHA,
   DESCRIPCION,
   PAGO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_pagos_crear(?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         FECHA,
         DESCRIPCION,
         PAGO
      ], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: rows.insertId, MENSAJE: "PAGO REGISTRADA" });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const eliminarPago = (
   ID_EVALUACION
) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM pagos_visita WHERE id_evaluacion = ?';

      mysqlConnection.query(query, [
         ID_EVALUACION
      ], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: rows.insertId, MENSAJE: "PAGOS ELIMINADAS" });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarPago: registrarPago,
   eliminarPago: eliminarPago
}