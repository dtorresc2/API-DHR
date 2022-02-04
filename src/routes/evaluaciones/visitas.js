const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const funcionesS3 = require('./../../config/s3');
const guardia = require('./../../config/guardia');

const querysVisitas = require('./controllers/querysVisitas');

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
      // Actualizacion de Saldos - Ficha
      // const resultadoSaldoFicha = await querysFichas.actualizarSaldoFicha(resultadoFichas.ID_USUARIO, resultadoFichas.ID_FICHA);
      // Actualizavion de Saldos - Pacientes
      // const resultadoSaldoPaciente = await querysPacientes.actualizarSaldoPaciente(resultadoFichas.ID_USUARIO, resultadoFichas.ID_PACIENTE);
      res.json({ MENSAJE: 'VISITAS REGISTRADAS', CUENTA: contador });
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

router.post('/evaluaciones/visitas/actualizar', guardia, async (req, res) => {
   let contador = 0;

   if (req.body.VISITAS.length > 0) {
      let arreglo = req.body.VISITAS;
      const resultadoLimpiaVisitas = await querysVisitas.eliminarVisitas(arreglo[0].ID_EVALUACION);

      for (let element of arreglo) {
         contador++;
         const resultado = await querysVisitas.registrarVisita(element);
      }
      res.json({ MENSAJE: 'VISITAS REGISTRADAS', CUENTA: contador });
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

module.exports = router;