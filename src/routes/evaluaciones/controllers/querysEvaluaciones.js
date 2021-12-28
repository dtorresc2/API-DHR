const mysqlConnection = require('../../../config/db');

// Registro de Citas
const registrarEvaluacion = ({
   CODIGO_INTERNO,
   DESCRIPCION,
   ENGANCHE,
   COSTO_VISITA,
   TERAPIA,
   FECHA,
   ID_PACIENTE,
   ID_USUARIO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_crear_actualizar(1,0,?,?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         CODIGO_INTERNO,
         DESCRIPCION,
         ENGANCHE,
         COSTO_VISITA,
         TERAPIA,
         FECHA,
         ID_PACIENTE,
         ID_USUARIO
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
const obtenerListadoEvaluaciones = ({
   ID_USUARIO,
   ID_EVALUACION
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_listado(?,?)';

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
const actualizarEvaluacion = ({
   ID_EVALUACION,
   DESCRIPCION,
   ENGANCHE,
   COSTO_VISITA,
   TERAPIA,
   ID_PACIENTE,
   ID_USUARIO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_crear_actualizar(2,?,0,?,?,?,?,"",?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         DESCRIPCION,
         ENGANCHE,
         COSTO_VISITA,
         TERAPIA,
         ID_PACIENTE,
         ID_USUARIO
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
   registrarEvaluacion: registrarEvaluacion,
   actualizarEvaluacion: actualizarEvaluacion,
   obtenerListadoEvaluaciones: obtenerListadoEvaluaciones
}