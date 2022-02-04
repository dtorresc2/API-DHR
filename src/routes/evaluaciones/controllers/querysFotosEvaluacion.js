const mysqlConnection = require('../../../config/db');

const registrarFoto = ({
   ID_EVALUACION,
   URL,
   DESCRIPCION,
   NOMBRE
}) => {
   return new Promise((resolve, reject) => {
      const query = 'CALL pa_evaluaciones_fotos_crear(?,?,?,?)';

      mysqlConnection.query(query, [
         ID_EVALUACION,
         URL,
         DESCRIPCION,
         NOMBRE
      ], (err, rows, fields) => {
         // console.log(err);
         if (!err) {
            resolve({ ID: rows.insertId, MENSAJE: "FOTO REGISTRADA" });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

module.exports = {
   registrarFoto: registrarFoto
}