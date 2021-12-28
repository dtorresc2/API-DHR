const mysqlConnection = require('../../../config/');

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
      const query = 'CALL pa_citas_crear_editar(1,0,?,?,?,?,?,?,?,?)';

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
const actualizarEvaluacion  = ({
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
      const query = 'CALL pa_citas_crear_editar(1,0,?,?,?,?,?,?,?,?)';

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

module.exports = {
   registrarEvaluacion: registrarEvaluacion
}