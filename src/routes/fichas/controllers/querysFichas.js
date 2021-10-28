const mysqlConnection = require('../../../config/db');

// Registrar ficha
const registrarFicha = ({ CODIGO_INTERNO, FECHA, MEDICO, MOTIVO, REFERENTE, ID_PACIENTE, ID_USUARIO }) => {
   return new Promise((resolve, reject) => {
      const query = 'INSERT INTO fichas ' +
         '(codigo_interno,fecha,medico,motivo,referente,id_paciente,id_usuario) ' +
         'VALUES (?,?,?,?,?,?,?)';

      mysqlConnection.query(query, [CODIGO_INTERNO, FECHA, MEDICO, MOTIVO, REFERENTE, ID_PACIENTE, ID_USUARIO], (err, rows, fields) => {
         if (!err) {
            resolve(
               { ID: rows.insertId, MENSAJE: "FICHA REGISTRADA" }
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

const obtenerListadoFichas = () => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "id_ficha AS ID_FICHA, " +
         "codigo_interno AS CODIGO_INTERNO, " +
         "DATE_FORMAT(fecha,'%d/%m/%Y') AS FECHA, " +
         'medico AS MEDICO, ' +
         'motivo AS MOTIVO, ' +
         'referente AS REFERENTE, ' +
         'estado AS ESTADO, ' +
         'id_paciente AS ID_PACIENTE, ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM fichas';

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

const obtenerListadoFichasEspecifico = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         "id_ficha AS ID_FICHA, " +
         "codigo_interno AS CODIGO_INTERNO, " +
         "DATE_FORMAT(fecha,'%d/%m/%Y') AS FECHA, " +
         'medico AS MEDICO, ' +
         'motivo AS MOTIVO, ' +
         'referente AS REFERENTE, ' +
         'estado AS ESTADO, ' +
         'debe AS DEBE, ' +
         'haber AS HABER, ' +
         'saldo AS SALDO, ' +
         'id_paciente AS ID_PACIENTE, ' +
         'id_usuario AS ID_USUARIO ' +
         'FROM fichas WHERE id_ficha = ?';

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

const obtenerListadoFichasXUsuario = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' +
         " f.id_ficha AS ID_FICHA, " +
         " f.codigo_interno AS CODIGO_INTERNO, " +
         " DATE_FORMAT(f.fecha, '%d/%m/%Y') AS FECHA, " +
         ' f.motivo AS MOTIVO, ' +
         ' f.estado AS ESTADO, ' +
         ' FORMAT(f.debe, 2) AS DEBE, ' +
         ' FORMAT(f.haber, 2) AS HABER, ' +
         ' FORMAT(f.saldo, 2) AS SALDO, ' +
         ' f.id_paciente AS ID_PACIENTE, ' +
         ' p.nombre AS NOMBRE, ' +
         ' f.id_usuario AS ID_USUARIO ' +
         'FROM fichas f ' +
         ' LEFT JOIN pacientes p ON f.id_paciente = p.id_paciente ' +
         'WHERE f.id_usuario = ?';

      mysqlConnection.query(query, [id], (err, rows, fields) => {
         if (!err) {
            resolve(rows);
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Listado de Pacientes
const obtenerConteoFichas = (id) => {
   return new Promise((resolve, reject) => {
      const query = 'SELECT ' + 
         'IFNULL(MAX(codigo_interno), 0) + 1 AS CONTEO ' +
         'FROM fichas ' +
         'WHERE id_usuario = ?';

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

// Actualizar fichas
const actualizarFichas = ({ id }, { ID_PACIENTE, FECHA, MEDICO, MOTIVO, REFERENTE, ESTADO }) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE fichas SET ' +
         'id_paciente = ?,' +
         'fecha = ?,' +
         'medico = ?,' +
         'motivo = ?,' +
         'referente = ?, ' +
         'estado = ? ' +
         'WHERE id_ficha = ?';

      mysqlConnection.query(query, [ID_PACIENTE, FECHA, MEDICO, MOTIVO, REFERENTE, ESTADO, id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'FICHA ACTUALIZADA' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

const actualizarEstadoFicha = ({ id }, { ESTADO }) => {
   return new Promise((resolve, reject) => {
      const query = 'UPDATE fichas SET ' +
         'estado = ? ' +
         'WHERE id_ficha = ?';

      mysqlConnection.query(query, [ESTADO, id], (err, rows, fields) => {
         if (!err) {
            resolve({ ID: id, MENSAJE: 'SERVICIO ACTUALIZADO' });
         }
         else {
            reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
         }
      });
   });
}

// Eliminar usuarios
const eliminarFicha = ({ id }) => {
   return new Promise((resolve, reject) => {
      const query = 'DELETE FROM fichas ' +
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
   registrarFicha: registrarFicha,
   obtenerListadoFichas: obtenerListadoFichas,
   obtenerListadoFichasEspecifico: obtenerListadoFichasEspecifico,
   obtenerConteoFichas: obtenerConteoFichas,
   obtenerListadoFichasXUsuario: obtenerListadoFichasXUsuario,
   actualizarFichas: actualizarFichas,
   actualizarEstadoFicha: actualizarEstadoFicha,
   eliminarFicha: eliminarFicha
}