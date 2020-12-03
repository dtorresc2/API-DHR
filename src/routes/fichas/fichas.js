const express = require('express');
const router = express.Router();

const querysFichas = require('../fichas/controllers/querysFichas');

router.post('/fichas', async (req, res) => {
   const conteo = await querysFichas.obtenerConteoFichas(req.body.ID_USUARIO);
   req.body.CODIGO_INTERNO = conteo.CONTEO;
   const resultado = await querysFichas.registrarFicha(req.body);
   res.json(resultado);
});

router.get('/fichas', async (req, res) => {
   const resultado = await querysFichas.obtenerListadoFichas();
   res.json(resultado);
});

router.get('/fichas/:id', async (req, res) => {
   const resultado = await querysFichas.obtenerListadoFichasEspecifico(req.params);
   res.json(resultado);
});

router.get('/fichas/:id/usuario', async (req, res) => {
   const resultado = await querysFichas.obtenerListadoFichasXUsuario(req.params);
   res.json(resultado);
});

router.put('/fichas/:id', async (req, res) => {
   const resultadoRegistro = await querysFichas.actualizarFichas(req.params, req.body);
   res.json(resultadoRegistro);
});

router.put('/fichas/:id/estado', async (req, res) => {
   const resultadoRegistro = await querysFichas.actualizarEstadoFicha(req.params, req.body);
   res.json(resultadoRegistro);
});

router.delete('/fichas/:id', async (req, res) => {
   const resultado = await querysFichas.eliminarFicha(req.params);
   res.json(resultado);
});

module.exports = router;