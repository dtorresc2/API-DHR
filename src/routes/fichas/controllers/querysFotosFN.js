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


module.exports = {
    registrarFotos: registrarFotos
}