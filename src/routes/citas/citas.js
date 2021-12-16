const express = require('express');
const router = express.Router();

const querysCitas = require('./controllers/querysCitas');
const guardia = require('./../../config/guardia');

router.post('/citas/consulta', guardia, async (req, res) => {
   const resultado = await querysCitas.obtenerListadoCitas(req.body);
   res.json(resultado);
});

router.post('/citas/consulta/avanzado', guardia, async (req, res) => {
   const resultado = await querysCitas.consultaAvanzada(req.body);
   res.json(resultado);
});

router.post('/citas/consulta/filtrado', guardia, async (req, res) => {
   const resultado = await querysCitas.obtenerListadoCitasFiltrado(req.body);
   res.json(resultado);
});

router.post('/citas/registro', guardia, async (req, res) => {
   const resultado = await querysCitas.registrarCita(req.body);
   res.json(resultado);
});

router.post('/citas/actualiza', guardia, async (req, res) => {
   const resultado = await querysCitas.actualizarCita(req.body);
   res.json(resultado);
});

router.post('/citas/actualiza/estado', guardia, async (req, res) => {
   const resultado = await querysCitas.actualizarEstado(req.body);
   res.json(resultado);
});

router.post('/citas/elimina', guardia, async (req, res) => {
   const resultado = await querysCitas.eliminarCita(req.body);
   res.json(resultado);
});

module.exports = router;