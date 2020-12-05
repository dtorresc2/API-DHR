const mysqlConnection = require('../../../config/db');

// Registrar historial odontodologico
const registrarHistorialOdontodologico = ({
   HOSPITALIZADO, DESCRIPCION_HOS, TRATAMIENTO_MEDICO,
   ALERGIA, DESCRIPCION_ALERGIA, HEMORRAGIA, MEDICAMENTO,
   DESCRIPCION_MEDICAMENTO, ID_FICHA
}) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO historial_medico ' +
         '(dolor,descripcion_dolor,gingivitis,' +
         'otros,id_ficha) ' +
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

module.exports = {
   registrarHistorialOdontodologico : registrarHistorialOdontodologico
}