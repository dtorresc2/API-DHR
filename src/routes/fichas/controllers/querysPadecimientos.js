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
         "id_padecimiento AS ID_PADECIMIENTO, " +
         "corazon AS CORAZON, " +
         "artritis AS ARTRITIS, " +
         "tuberculosis AS TUBERCULOSIS, " +
         'presion_alta AS PRESION_ALTA, ' +
         'presion_baja AS PRESION_BAJA, ' +
         'fiebrereu AS FIEBREREU, ' +
         'anemia AS ANEMIA, ' +
         'epilepsia AS EPILEPSIA, ' +
         'diabetes AS DIABETES, ' +
         'otros AS OTROS, ' +
         'id_historial_medico AS ID_HISTORIAL_MEDICO ' +
         'FROM padecimientos WHERE id_historial_medico = ?';

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

const actualizarPadecimientos = ({ id }, {
   CORAZON, ARTRITIS, TUBERCULOSIS,
   PRESION_ALTA, PRESION_BAJA, FIEBREREU, ANEMIA,
   EPILEPSIA, DIABETES, OTROS
}) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE padecimientos SET ' +
         'corazon = ?,' +
         'artritis = ?,' +
         'tuberculosis = ?,' +
         'presion_alta = ?,' +
         'presion_baja = ?, ' +
         'fiebrereu = ?, ' +
         'anemia = ?, ' +
         'epilepsia = ?, ' +
         'diabetes = ?, ' +
         'otros = ? ' +
         'WHERE id_padecimiento = ?';

      mysqlConnection.query(query, [
         CORAZON, ARTRITIS, TUBERCULOSIS,
         PRESION_ALTA, PRESION_BAJA, FIEBREREU, ANEMIA,
         EPILEPSIA, DIABETES, OTROS, id
      ], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'PADECIMIENTOS ACTUALIZADOS', ROWS : rows });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const eliminarPadecimientos = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM padecimientos ' +
         'WHERE id_padecimiento = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'PADECIMIENTOS ELIMINADOS' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarPadecimientos: registrarPadecimientos,
   obtenerPadecimientos: obtenerPadecimientos,
   actualizarPadecimientos: actualizarPadecimientos,
   eliminarPadecimientos: eliminarPadecimientos
}