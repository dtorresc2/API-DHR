const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');

const querysBitacora = require('../bitacora/controllers/querysBitacoras');
const guardia = require('./../../config/guardia');

router.get('/bitacora', async (req, res) => {
   const resultado = await querysBitacora.obtenerListadoBitacora();
   res.json(resultado);
});

router.get('/bitacora/:id', guardia, async (req, res) => {
   const resultado = await querysBitacora.obtenerListadoBitacoraXUsuario(req.params);
   res.json(resultado);
});

router.post('/bitacora/consulta/filtrado', guardia, async (req, res) => {
   const resultado = await querysBitacora.obtenerBitacoraFiltrada(req.body);
   res.json(resultado);
});

router.post('/bitacora/consulta/avanzada', guardia, async (req, res) => {
   const resultado = await querysBitacora.consultaAvanzada(req.body);
   res.json(resultado);
});

router.get('/bitacora/consulta/eventos', guardia, async (req, res) => {
   const resultado = await querysBitacora.obtenerListadoEventos();
   res.json(resultado);
});

router.get('/bitacora/consulta/secciones', guardia, async (req, res) => {
   const resultado = await querysBitacora.obtenerListadoSecciones();
   res.json(resultado);
});

router.post('/bitacora', guardia, async (req, res) => {
   const fechaMoment = moment().tz("America/Guatemala").format('YYYY-MM-DD HH:mm:ss');
   req.body.FECHA = fechaMoment;

   const resultado = await querysBitacora.registrarBitacora(req.body);
   res.json(resultado);
});

module.exports = router;