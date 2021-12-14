const express = require('express');
const router = express.Router();

const querysPagos = require('../fichas/controllers/querysPagos');
const querysFichas = require('../fichas/controllers/querysFichas');
const querysPacientes = require('../pacientes/controllers/querysPacientes');
const guardia = require('./../../config/guardia');

router.post('/pagos', guardia, async (req, res) => {
   const resultado = await querysPagos.registrarPago(req.body);
   res.json(resultado);
});

router.get('/pagos/:id', guardia, async (req, res) => {
   const resultado = await querysPagos.obtenerListadoPagosFicha(req.params);
   res.json(resultado);
});

router.put('/pagos/:id', guardia, async (req, res) => {
   let contador = 0;
   const resultado = await querysPagos.eliminarPagoFicha(req.params);
   let resultadoFichas = await querysFichas.obtenerListadoFichasEspecifico(req.params);

   if (resultado.ID != -1) {
      if (req.body.PAGOS.length > 0) {
         let arreglo = req.body.PAGOS;

         for (let element of arreglo) {
            contador++;
            const resultado = await querysPagos.registrarPago(element);
         }

         // Actualizacion de Saldos - Ficha
         const resultadoSaldoFicha = await querysFichas.actualizarSaldoFicha(resultadoFichas.ID_USUARIO, resultadoFichas.ID_FICHA);
         // Actualizavion de Saldos - Pacientes
         const resultadoSaldoPaciente = await querysPacientes.actualizarSaldoPaciente(resultadoFichas.ID_USUARIO, resultadoFichas.ID_PACIENTE);

         res.json({ MENSAJE: 'PAGOS REGISTRADOS', CUENTA: contador });
      }
      else {
         res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
      }
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

router.delete('/pagos/:id', guardia, async (req, res) => {
   const resultado = await querysPagos.eliminarPago(req.params);
   res.json(resultado);
});

router.delete('/pagos/:id/ficha', guardia, async (req, res) => {
   const resultado = await querysPagos.eliminarPagoFicha(req.params);
   res.json(resultado);
});

module.exports = router;