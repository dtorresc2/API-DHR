const mysqlConnection = require('../../../config/db');
const { obtenerIdUsuario } = require('../../usuarios/controllers/querysUsuarios');
// SELECT version();

// Funcion de Prueba
const obtenerVersionMYSQL = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT version()';
        mysqlConnection.query(query, (err, rows, fields) => {
            if (!err) {
                resolve(rows[0]);
            }
            else {
                reject('Error');
            }
        });
    });
}

// Listado de Pacientes
const obtenerListadoPacientes = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT ' +
            'id_paciente AS ID_PACIENTE, ' +
            'nombre AS NOMBRE, ' +
            'edad AS EDAD, ' +
            'ocupacion AS OCUPACION, ' +
            'sexo AS SEXO, ' +
            'tel AS TELEFONO, ' +
            "DATE_FORMAT(fecha_nacimiento,'%d/%m/%y') AS FECHA_NACIMIENTO, " +
            'dpi AS DPI, ' +
            'debe AS DEBE, ' +
            'haber AS HABER, ' +
            'saldo AS SALDO ' +
            'FROM pacientes';

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

// Listado de Pacientes
const obtenerPacienteEspecifico = ({ id }) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT ' +
            'id_paciente AS ID_PACIENTE, ' +
            'nombre AS NOMBRE, ' +
            'edad AS EDAD, ' +
            'ocupacion AS OCUPACION, ' +
            'sexo AS SEXO, ' +
            'tel AS TELEFONO, ' +
            "DATE_FORMAT(fecha_nacimiento,'%d/%m/%y') AS FECHA_NACIMIENTO, " +
            'dpi AS DPI, ' +
            'debe AS DEBE, ' +
            'haber AS HABER, ' +
            'saldo AS SALDO ' +
            'FROM pacientes ' +
            'WHERE id_paciente = ? ';

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
    obtenerVersionMYSQL: obtenerVersionMYSQL,
    obtenerListadoPacientes: obtenerListadoPacientes,
    obtenerPacienteEspecifico: obtenerPacienteEspecifico
}