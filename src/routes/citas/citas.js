const express = require('express');
const router = express.Router();

const querysCitas = require('./controllers/querysCitas');

router.post('/citas/consulta', async (req, res) => {
   const resultado = await querysCitas.obtenerListadoCitas(req.body);
   res.json(resultado);
});

router.post('/citas/registro', async (req, res) => {
   const resultado = await querysCitas.registrarCita(req.body);
   res.json(resultado);
});

router.post('/citas/actualiza', async (req, res) => {
   const resultado = await querysCitas.actualizarCita(req.body);
   res.json(resultado);
});

router.post('/citas/actualiza/estado', async (req, res) => {
   const resultado = await querysCitas.actualizarEstado(req.body);
   res.json(resultado);
});

router.post('/citas/elimina', async (req, res) => {
   const resultado = await querysCitas.eliminarCita(req.body);
   res.json(resultado);
});

module.exports = router;