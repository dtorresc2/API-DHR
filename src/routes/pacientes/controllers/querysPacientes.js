const mysqlConnection = require('../../../config/db');

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
            "DATE_FORMAT(fecha_nacimiento,'%d/%m/%Y') AS FECHA_NACIMIENTO, " +
            'dpi AS DPI, ' +
            'debe AS DEBE, ' +
            'haber AS HABER, ' +
            'saldo AS SALDO, ' +
            'estado AS ESTADO ' +
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
const obtenerPacienteEspecifico = ({
    ID_USUARIO,
    ID_PACIENTE
}) => {
    return new Promise((resolve, reject) => {
        const query = 'CALL pa_pacientes_listado(?, ?)';

        mysqlConnection.query(query, [ID_USUARIO, ID_PACIENTE], (err, rows, fields) => {
            if (!err) {
                resolve(rows[0]);
            }
            else {
                reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
            }
        });
    });
}

// Listado de Pacientes
const obtenerListadoPacientesPorUsuario = ({
    ID_USUARIO
}) => {
    return new Promise((resolve, reject) => {
        const query = 'CALL pa_pacientes_listado(?, 0)';

        mysqlConnection.query(query, [ID_USUARIO], (err, rows, fields) => {
            if (!err) {
                resolve(rows[0]);
            }
            else {
                reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
            }
        });
    });
}

// Listado de Pacientes
const comprobarPaciente = ({ NOMBRE, DPI }) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS CONTEO ' +
            'FROM pacientes ' +
            'WHERE nombre = ? OR dpi = ?';

        mysqlConnection.query(query, [NOMBRE, DPI], (err, rows, fields) => {
            if (!err) {
                resolve(rows[0]);
            }
            else {
                reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
            }
        });
    });
}

// Registrar paciente
const registrarPaciente = ({ NOMBRE, EDAD, OCUPACION, SEXO, TELEFONO, FECHA_NACIMIENTO, DPI, ID_USUARIO }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO pacientes ' +
            '(nombre,edad,ocupacion,sexo,tel,fecha_nacimiento,' +
            'dpi,debe,haber,saldo,id_usuario) ' +
            'VALUES (?,?,?,?,?,?,?,0,0,0,?)';

        mysqlConnection.query(query, [NOMBRE, EDAD, OCUPACION, SEXO, TELEFONO, FECHA_NACIMIENTO, DPI, ID_USUARIO], (err, rows, fields) => {
            if (!err) {
                resolve(
                    { ID: rows.insertId, MENSAJE: "PACIENTE REGISTRADO" }
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

// Actualizar usuarios
const actualizarPaciente = ({ id }, { NOMBRE, EDAD, OCUPACION, SEXO, TELEFONO, FECHA_NACIMIENTO, DPI, ESTADO }) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE pacientes SET ' +
            'nombre = ?,' +
            'edad = ?,' +
            'ocupacion = ?,' +
            'sexo = ?,' +
            'tel = ?,' +
            'fecha_nacimiento = ?,' +
            'dpi = ?, ' +
            'estado = ? ' +
            'WHERE id_paciente = ?';

        mysqlConnection.query(query, [NOMBRE, EDAD, OCUPACION, SEXO, TELEFONO, FECHA_NACIMIENTO, DPI, ESTADO, id], (err, rows, fields) => {
            if (!err) {
                resolve({ ID: id, MENSAJE: 'PACIENTE ACTUALIZADO' });
            }
            else {
                reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
            }
        });
    });
}

const actualizarEstadoPaciente = ({ id }, { ESTADO }) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE pacientes SET ' +
            'estado = ? ' +
            'WHERE id_paciente = ?';

        mysqlConnection.query(query, [ESTADO, id], (err, rows, fields) => {
            if (!err) {
                resolve({ ID: id, MENSAJE: 'PACIENTE ACTUALIZADO' });
            }
            else {
                reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
            }
        });
    });
}

// Eliminar usuarios
const eliminarPaciente = ({ id }) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM pacientes ' +
            'WHERE id_paciente = ?';

        mysqlConnection.query(query, [id], (err, rows, fields) => {
            if (!err) {
                resolve({ ID: id, MENSAJE: 'PACIENTE ELIMINADO' });
            }
            else {
                reject({ ID: -1, MENSAJE: "ERROR", ERROR: err });
            }
        });
    });
}

// Actualizar Saldo Paciente
const actualizarSaldoPaciente = (ID_USUARIO, ID_PACIENTE) => {
    return new Promise((resolve, reject) => {
        const query = 'CALL pa_pacientes_saldos_actualiza(?,?)';

        mysqlConnection.query(query, [ID_USUARIO, ID_PACIENTE], (err, rows, fields) => {
            if (!err) {
                resolve({ ID: ID_PACIENTE, MENSAJE: 'SALDO ACTUALIZADO' });
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
    obtenerPacienteEspecifico: obtenerPacienteEspecifico,
    obtenerListadoPacientesPorUsuario: obtenerListadoPacientesPorUsuario,
    registrarPaciente: registrarPaciente,
    comprobarPaciente: comprobarPaciente,
    actualizarPaciente: actualizarPaciente,
    actualizarEstadoPaciente: actualizarEstadoPaciente,
    eliminarPaciente: eliminarPaciente,
    actualizarSaldoPaciente: actualizarSaldoPaciente
}