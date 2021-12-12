const express = require('express');
const router = express.Router();

const querysPiezas = require('./controllers/querysPiezas');

router.post('/piezas', async (req, res) => {
   const resultado = await querysPiezas.registrarPieza(req.body);
   res.json(resultado);
});

router.post('/piezas/listado', async (req, res) => {
   const resultado = await querysPiezas.obtenerListadoPiezas(req.body);
   res.json(resultado);
});

router.put('/piezas/:id', async (req, res) => {
   const resultadoRegistro = await querysPiezas.actualizarPiezas(req.params, req.body);
   res.json(resultadoRegistro);
});

router.delete('/piezas/:id', async (req, res) => {
   const resultado = await querysPiezas.eliminarPieza(req.params);
   res.json(resultado);
});


module.exports = router;