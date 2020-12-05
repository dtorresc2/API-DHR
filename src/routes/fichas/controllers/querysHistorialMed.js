const mysqlConnection = require('../../../config/db');

// Registrar historial medico
const registrarHistorialMedico = ({
   HOSPITALIZADO, DESCRIPCION_HOS, TRATAMIENTO_MEDICO,
   ALERGIA, DESCRIPCION_ALERGIA, HEMORRAGIA, MEDICAMENTO,
   DESCRIPCION_MEDICAMENTO, ID_FICHA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO historial_medico ' +
         '(hospitalizado,descripcion_hos,tratamiento_medico,' +
         'alergia,descripcion_alergia,hemorragia,medicamento,' +
         'descripcion_medicamento,id_ficha) ' +
         'VALUES (?,?,?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         HOSPITALIZADO, DESCRIPCION_HOS, TRATAMIENTO_MEDICO,
         ALERGIA, DESCRIPCION_ALERGIA, HEMORRAGIA, MEDICAMENTO,
         DESCRIPCION_MEDICAMENTO, ID_FICHA
      ], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "HISTORIAL REGISTRADO" }
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

const obtenerHistorialMedico = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "id_historial_medico AS ID_HISTORIAL_MEDICO, " +
         "hospitalizado AS HOSPITALIZADO, " +
         "descripcion_hos AS DESCRIPCION_HOS, " +
         "tratamiento_medico AS TRATAMIENTO_MEDICO, " +
         'alergia AS ALERGIA, ' +
         'descripcion_alergia AS DESCRIPCION_ALERGIA, ' +
         'hemorragia AS HEMORRAGIA, ' +
         'medicamento AS MEDICAMENTO, ' +
         'descripcion_medicamento AS DESCRIPCION_MEDICAMENTO, ' +
         'id_ficha AS ID_FICHA ' +
         'FROM historial_medico WHERE id_ficha = ?';

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

// Actualizar usuarios
const actualizarHistorialMedico = ({ id }, {
   HOSPITALIZADO, DESCRIPCION_HOS, TRATAMIENTO_MEDICO,
   ALERGIA, DESCRIPCION_ALERGIA, HEMORRAGIA, MEDICAMENTO,
   DESCRIPCION_MEDICAMENTO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE historial_medico SET ' +
         'hospitalizado = ?,' +
         'descripcion_hos = ?,' +
         'tratamiento_medico = ?,' +
         'alergia = ?,' +
         'descripcion_alergia = ?, ' +
         'hemorragia = ?, ' +
         'medicamento = ?, ' +
         'descripcion_medicamento = ? ' +
         'WHERE id_ficha = ?';

      mysqlConnection.query(query, [
         HOSPITALIZADO, DESCRIPCION_HOS, TRATAMIENTO_MEDICO,
         ALERGIA, DESCRIPCION_ALERGIA, HEMORRAGIA, MEDICAMENTO,
         DESCRIPCION_MEDICAMENTO, id
      ], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'HISTORIAL ACTUALIZADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Eliminar historial medico
const eliminarHistorialMedico = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM historial_medico ' +
         'WHERE id_ficha = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'FICHA ELIMINADA' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarHistorialMedico: registrarHistorialMedico,
   obtenerHistorialMedico: obtenerHistorialMedico,
   actualizarHistorialMedico: actualizarHistorialMedico,
   eliminarHistorialMedico : eliminarHistorialMedico
}