const mysqlConnection = require('../../../config/db');

// Registrar padecimientos
const registrarPadecimientos = ({
   CORAZON, ARTRITIS, TUBERCULOSIS,
   PRESION_ALTA, PRESION_BAJA, FIEBREREU, ANEMIA,
   EPILEPSIA, DIABETES, OTROS, ID_HISTORIAL_MEDICO
}) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO padecimientos ' +
         '(corazon,artritis,tuberculosis,' +
         'presion_alta,presion_baja,fiebrereu,anemia,' +
         'epilepsia,diabetes,otros,id_historial_medico) ' +
         'VALUES (?,?,?,?,?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [
         CORAZON, ARTRITIS, TUBERCULOSIS,
         PRESION_ALTA, PRESION_BAJA, FIEBREREU, ANEMIA,
         EPILEPSIA, DIABETES, OTROS, ID_HISTORIAL_MEDICO
      ], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "PADECIMIENTOS REGISTRADOS" }
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

const obtenerPadecimientos = ({ id }) => {
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

module.exports = {
   registrarPadecimientos: registrarPadecimientos,
   obtenerPadecimientos : obtenerPadecimientos
}