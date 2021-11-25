const mysqlConnection = require('../../../config/db');


// Listado de Citas
const obtenerListadoCitas = ({ ID_USUARIO, ID_CITA }) => {
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

module.exports = {
   obtenerListadoCitas: obtenerListadoCitas
}