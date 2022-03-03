const express = require('express');
const router = express.Router();

const guardia = require('./../../config/guardia');
const querysPagosEvaluacion = require('./controllers/querysPagosEvaluacion');
const querysEvaluaciones = require('./controllers/querysEvaluaciones');
const querysPacientes = require('./../pacientes/controllers/querysPacientes');

router.post('/evaluaciones/pagos/actualizar', guardia, async (req, res) => {
   let contador = 0;

   if (req.body.PAGOS.DETALLE.length > 0) {
      let arreglo = req.body.PAGOS.DETALLE;
      let ID_EVALUACION = req.body.PAGOS.DETALLE[0].ID_EVALUACION;
      let ID_USUARIO = req.body.PAGOS.ID_USUARIO;
      let ID_PACIENTE = req.body.PAGOS.ID_PACIENTE;
      const resultadoLimpiaPagos = await querysPagosEvaluacion.eliminarPago(ID_EVALUACION);

      for (let element of arreglo) {
         contador++;
         const resultado = await querysPagosEvaluacion.registrarPago(element);
      }

      // Actualizacion de Saldos - Ficha
      const resultadoSaldoFicha = await querysEvaluaciones.actualizarSaldoEvaluacion(ID_USUARIO, ID_EVALUACION);
      // Actualizavion de Saldos - Pacientes
      const resultadoSaldoPaciente = await querysPacientes.actualizarSaldoPaciente(ID_USUARIO, ID_PACIENTE);

      res.json({ MENSAJE: 'PAGOS REGISTRADOS', CUENTA: contador });
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

module.exports = router;