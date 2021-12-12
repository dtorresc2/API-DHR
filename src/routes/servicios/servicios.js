const express = require('express');
const router = express.Router();

const querysServicios = require('./controllers/querysServicios');

router.post('/servicios', async (req, res) => {
   const resultado = await querysServicios.registrarServicio(req.body);
   res.json(resultado);
});

router.post('/servicios/listado', async (req, res) => {
   const resultado = await querysServicios.obtenerListadoServicios(req.body);
   res.json(resultado);
});

router.put('/servicios/:id', async (req, res) => {
   const resultadoRegistro = await querysServicios.actualizarServicio(req.params, req.body);
   res.json(resultadoRegistro);
});

router.put('/servicios/:id/estado', async (req, res) => {
   const resultadoRegistro = await querysServicios.actualizarEstadoServicio(req.params, req.body);
   res.json(resultadoRegistro);
});

router.delete('/servicios/:id', async (req, res) => {
   const resultado = await querysServicios.eliminarServicio(req.params);
   res.json(resultado);
});

module.exports = router;