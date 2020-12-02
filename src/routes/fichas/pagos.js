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

router.delete('/pagos/:id', async (req, res) => {
   const resultado = await querysPagos.eliminarPago(req.params);
   res.json(resultado);
});

router.delete('/pagos/:id/ficha', async (req, res) => {
   const resultado = await querysPagos.eliminarPagoFicha(req.params);
   res.json(resultado);
});

module.exports = router;