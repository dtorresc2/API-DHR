const express = require('express');
const router = express.Router();

const querysPiezas = require('./controllers/querysPiezas');

router.post('/piezas', async (req, res) => {
   const resultado = await querysPiezas.registrarPieza(req.body);
   res.json(resultado);
});

router.get('/piezas/:id/usuario', async (req, res) => {
   const resultado = await querysPiezas.obtenerListadoPiezas(req.params);
   res.json(resultado);
});

router.get('/piezas/:id', async (req, res) => {
   const resultado = await querysPiezas.obtenerPiezaEspecifica(req.params);
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