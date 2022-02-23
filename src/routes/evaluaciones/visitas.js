const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const funcionesS3 = require('./../../config/s3');
const guardia = require('./../../config/guardia');

const querysVisitas = require('./controllers/querysVisitas');
const querysEvaluaciones = require('./controllers/querysEvaluaciones');
const querysPacientes = require('./../pacientes/controllers/querysPacientes');

router.post('/evaluaciones/visitas/registro', guardia, async (req, res) => {
   const FECHA_ACTUAL = moment().tz("America/Guatemala").format('YYYY/MM/DD HH:mm:ss');
   let contador = 0;

   if (req.body.VISITAS.length > 0) {
      let arreglo = req.body.VISITAS;

      for (let element of arreglo) {
         contador++;
         element.FECHA = FECHA_ACTUAL;
         const resultado = await querysVisitas.registrarVisita(element);
      }
      res.json({ MENSAJE: 'VISITAS REGISTRADAS', CUENTA: contador });
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

router.post('/evaluaciones/visitas/actualizar', guardia, async (req, res) => {
   let contador = 0;

   if (req.body.VISITAS.DETALLE.length > 0) {
      let arreglo = req.body.VISITAS.DETALLE;
      let ID_EVALUACION = req.body.VISITAS.DETALLE[0].ID_EVALUACION;
      let ID_USUARIO = req.body.VISITAS.ID_USUARIO;
      let ID_PACIENTE = req.body.VISITAS.ID_PACIENTE;
      const resultadoLimpiaVisitas = await querysVisitas.eliminarVisitas(ID_EVALUACION);

      for (let element of arreglo) {
         contador++;
         const resultado = await querysVisitas.registrarVisita(element);
      }

      // Actualizacion de Saldos - Ficha
      const resultadoSaldoFicha = await querysEvaluaciones.actualizarSaldoEvaluacion(ID_USUARIO, ID_EVALUACION);
      // Actualizavion de Saldos - Pacientes
      const resultadoSaldoPaciente = await querysPacientes.actualizarSaldoPaciente(ID_USUARIO, ID_PACIENTE);

      res.json({ MENSAJE: 'VISITAS REGISTRADAS', CUENTA: contador });
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

module.exports = router;