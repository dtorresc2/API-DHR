const express = require('express');
const router = express.Router();

const querysPagos = require('../fichas/controllers/querysPagos');

router.post('/pagos', async (req, res) => {
   const resultado = await querysPagos.registrarPago(req.body);
   res.json(resultado);
});

router.get('/pagos/:id', async (req, res) => {
   const resultado = await querysPagos.obtenerListadoPagosFicha(req.params);
   res.json(resultado);
});

router.put('/pagos/:id', async (req, res) => {
   let contador = 0;
   const resultado = await querysPagos.eliminarPagoFicha(req.params);

   if (resultado.ID != -1) {
      if (req.body.PAGOS.length > 0) {
         let arreglo = req.body.PAGOS;

         for (let element of arreglo) {
            contador++;
            const resultado = await querysPagos.registrarPago(element);
         }
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

router.delete('/pagos/:id', async (req, res) => {
   const resultado = await querysPagos.eliminarPago(req.params);
   res.json(resultado);
});

router.delete('/pagos/:id/ficha', async (req, res) => {
   const resultado = await querysPagos.eliminarPagoFicha(req.params);
   res.json(resultado);
});

module.exports = router;