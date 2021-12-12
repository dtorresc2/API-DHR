const express = require('express');
const router = express.Router();

const querysServicios = require('./controllers/querysServicios');
const guardia = require('./../../config/guardia');

router.post('/servicios', guardia, async (req, res) => {
   const resultado = await querysServicios.registrarServicio(req.body);
   res.json(resultado);
});

router.post('/servicios/listado', guardia, async (req, res) => {
   const resultado = await querysServicios.obtenerListadoServicios(req.body);
   res.json(resultado);
});

router.put('/servicios/:id', guardia, async (req, res) => {
   const resultadoRegistro = await querysServicios.actualizarServicio(req.params, req.body);
   res.json(resultadoRegistro);
});

router.put('/servicios/:id/estado', guardia, async (req, res) => {
   const resultadoRegistro = await querysServicios.actualizarEstadoServicio(req.params, req.body);
   res.json(resultadoRegistro);
});

router.delete('/servicios/:id', guardia, async (req, res) => {
   const resultado = await querysServicios.eliminarServicio(req.params);
   res.json(resultado);
});

module.exports = router;