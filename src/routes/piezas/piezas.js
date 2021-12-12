const express = require('express');
const router = express.Router();

const querysPiezas = require('./controllers/querysPiezas');
const guardia = require('./../../config/guardia');

router.post('/piezas', guardia, async (req, res) => {
   const resultado = await querysPiezas.registrarPieza(req.body);
   res.json(resultado);
});

router.post('/piezas/listado', guardia, async (req, res) => {
   const resultado = await querysPiezas.obtenerListadoPiezas(req.body);
   res.json(resultado);
});

router.put('/piezas/:id', guardia, async (req, res) => {
   const resultadoRegistro = await querysPiezas.actualizarPiezas(req.params, req.body);
   res.json(resultadoRegistro);
});

router.delete('/piezas/:id', guardia, async (req, res) => {
   const resultado = await querysPiezas.eliminarPieza(req.params);
   res.json(resultado);
});


module.exports = router;