const mysqlConnection = require('../../../config/db');

// Registrar historial fotografico
const registrarFotos = ({
    URL, DESCRIPCION, NOMBRE, ID_FICHA
}) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO fotos ' +
            '(url,descripcion,nombre,id_ficha) ' +
            'VALUES (?,?,?,?)';

        mysqlConnection.query(query, [
            URL, DESCRIPCION, NOMBRE, ID_FICHA
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

const obtenerListadoFotosFicha = ({ id }) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT ' +
            'id_fotos AS ID_FOTOS, ' +
            'url AS URL, ' +
            'descripcion AS DESCRIPCION, ' +
            "nombre AS NOMBRE, " +
            "id_ficha AS ID_FICHA " +
            'FROM fotos ' +
            'WHERE id_ficha = ? ';

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

// Eliminar fotos
const eliminarFotosFicha = ({ id }) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM fotos ' +
            'WHERE id_ficha = ?';

        mysqlConnection.query(query, [id], (err, rows, fields) => {
            if (!err) {
                resolve({ ID: id, MENSAJE: 'FOTOS ELIMINADAS' });
            }
            else {
                reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
            }
        });
    });
}


module.exports = {
    registrarFotos: registrarFotos,
    obtenerListadoFotosFicha: obtenerListadoFotosFicha,
    eliminarFotosFicha: eliminarFotosFicha
}