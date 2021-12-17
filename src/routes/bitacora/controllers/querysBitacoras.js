const mysqlConnection = require('../../../config/db');

// Listado de Bitacora
const obtenerListadoBitacora = () => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         'id_bitacora AS ID_BITACORA, ' +
         'accion AS ACCION, ' +
         "CONCAT(DATE_FORMAT(fecha,'%d/%m/%Y'),' ',DATE_FORMAT(fecha,'%l:%i:%s %p')) AS FECHA, " +
         "id_cuenta AS ID_CUENTA, " +
         "id_usuario AS ID_USUARIO, " +
         "(SELECT usuario FROM cuentas WHERE cuentas.id_cuenta = bitacora.id_cuenta) AS CUENTA " +
         'FROM bitacora';

      mysqlConnection.query(query, (err, rows, fields) => {
         if (!err) {
            resolve(rows);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const obtenerBitacoraFiltrada = ({
   ID_USUARIO,
   FECHA_INICIAL,
   FECHA_FINAL
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_bitacora_listado_filtrado(?, ?, ?)';

      mysqlConnection.query(query, [ID_USUARIO, FECHA_INICIAL, FECHA_FINAL], (err, rows, fields) => {
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
   ID_CUENTA,
   EVENTO,
   SECCION,
   FECHA_INICIAL,
   FECHA_FINAL
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_bitacora_consulta_avanzada(?, ?, ?, ?, ?, ?)';

      mysqlConnection.query(query, [ID_USUARIO, ID_CUENTA, EVENTO, SECCION, FECHA_INICIAL, FECHA_FINAL], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const obtenerListadoEventos = () => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_bitacora_eventos_listado()';

      mysqlConnection.query(query, (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const obtenerListadoSecciones = () => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_bitacora_secciones_listado()';

      mysqlConnection.query(query, (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Listado de Bitacora
const obtenerListadoBitacoraXUsuario = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_bitacora_listado(?)';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve(rows[0]);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Registrar bitacora
const registrarBitacora = ({ EVENTO, ACCION, SECCION, FECHA, ID_CUENTA, ID_USUARIO }) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_bitacora_crear(?, ?, ?, ?, ?, ?)';

      mysqlConnection.query(query, [EVENTO, ACCION, SECCION, FECHA, ID_CUENTA, ID_USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows[0], MENSAJE: "ACCION REGISTRADA" }
            );
         }
         else {
            reject(
               { ID: -1, MENSAJE: "ERROR", ERROR: err }
            );
         }
      });
   });
}

module.exports = {
   obtenerListadoBitacora: obtenerListadoBitacora,
   registrarBitacora: registrarBitacora,
   obtenerListadoBitacoraXUsuario: obtenerListadoBitacoraXUsuario,
   obtenerBitacoraFiltrada: obtenerBitacoraFiltrada,
   obtenerListadoEventos:obtenerListadoEventos,
   obtenerListadoSecciones: obtenerListadoSecciones,
   consultaAvanzada: consultaAvanzada
}