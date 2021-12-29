const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const funcionesS3 = require('./../../config/s3');
const guardia = require('./../../config/guardia');
const req = require('express/lib/request');

const querysEvaluaciones = require('./controllers/querysEvaluaciones');

router.post('/evaluaciones/registro', guardia, async (req, res) => {
   const fechaMoment = moment().tz("America/Guatemala").format('YYYY/MM/DD HH:mm:ss');
   req.body.EVALUACION.FECHA = fechaMoment;

   const conteo = await querysEvaluaciones.obtenerConteoEvaluaciones(req.body.EVALUACION.ID_USUARIO);
   req.body.EVALUACION.CODIGO_INTERNO = conteo.CONTEO;

   const resultado = await querysEvaluaciones.registrarEvaluacion(req.body.EVALUACION);
   res.json(resultado);
});

router.post('/evaluaciones/consulta', guardia, async (req, res) => {
   const resultado = await querysEvaluaciones.obtenerListadoEvaluaciones(req.body);
   res.json(resultado);
});

router.post('/evaluaciones/actualiza', guardia, async (req, res) => {
   const resultado = await querysEvaluaciones.actualizarEvaluacion(req.body);
   res.json(resultado);
});

module.exports = router;