const mysqlConnection = require('../../../config/db');


// Listado de Citas
const obtenerListadoCitas = ({
   ID_USUARIO,
   ID_CITA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_citas_listado(?, ?)';

      mysqlConnection.query(query, [ID_USUARIO, ID_CITA], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const consultaAvanzada = ({
   ID_USUARIO,
   REALIZADO,
   FECHA_INICAL,
   FECHA_FINAL
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_citas_consulta_avanzada(?, ?, ?, ?)';

      mysqlConnection.query(query, [ID_USUARIO, REALIZADO, FECHA_INICAL, FECHA_FINAL], (err, rows, fields) => {
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
const registrarCita = ({
   DESCRIPCION,
   FECHA,
   REALIZADO,
   ID_PACIENTE,
   ID_USUARIO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_citas_crear_editar(1,0,?,?,?,?,?)';

      mysqlConnection.query(query, [DESCRIPCION, FECHA, REALIZADO, ID_PACIENTE, ID_USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Actualizar Cita
const actualizarCita = ({
   ID_CITA,
   DESCRIPCION,
   FECHA,
   REALIZADO,
   ID_PACIENTE,
   ID_USUARIO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_citas_crear_editar(2,?,?,?,?,?,?)';

      mysqlConnection.query(query, [ID_CITA, DESCRIPCION, FECHA, REALIZADO, ID_PACIENTE, ID_USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const actualizarEstado = ({
   ID_CITA,
   ID_USUARIO,
   REALIZADO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_citas_actualizar_realizado(?,?,?)';

      mysqlConnection.query(query, [ID_USUARIO, ID_CITA, REALIZADO], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const eliminarCita = ({
   ID_CITA,
   ID_USUARIO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_citas_eliminar(?,?)';

      mysqlConnection.query(query, [ID_USUARIO, ID_CITA], (err, rows, fields) => {
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
   obtenerListadoCitas: obtenerListadoCitas,
   registrarCita: registrarCita,
   actualizarCita: actualizarCita,
   actualizarEstado: actualizarEstado,
   eliminarCita: eliminarCita,
   consultaAvanzada: consultaAvanzada
}