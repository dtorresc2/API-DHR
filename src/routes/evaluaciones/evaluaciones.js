const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const funcionesS3 = require('./../../config/s3');
const guardia = require('./../../config/guardia');

const querysEvaluaciones = require('./controllers/querysEvaluaciones');
const querysContrato = require('./controllers/querysContrato');
const querysAlineacionDental = require('./controllers/querysAlineacionDental');
const querysDeglucion = require('./controllers/querysDeglucion');

router.post('/evaluaciones/registro', guardia, async (req, res) => {
   const fechaMoment = moment().tz("America/Guatemala").format('YYYY/MM/DD HH:mm:ss');
   req.body.EVALUACION.FECHA = fechaMoment;

   const conteo = await querysEvaluaciones.obtenerConteoEvaluaciones(req.body.EVALUACION.ID_USUARIO);
   req.body.EVALUACION.CODIGO_INTERNO = conteo.CONTEO;

   // ENCABEZADO EVALUACION
   const resultado = await querysEvaluaciones.registrarEvaluacion(req.body.EVALUACION);
   let ID_EVALUACION = resultado[0].ID;

   // CONTRATO
   req.body.CONTRATO.ID_EVALUACION = ID_EVALUACION;
   const resultadoContrato = await querysContrato.registrarContrato(req.body.CONTRATO);

   // DETALLE EVALUACION - ALINEACION DENTAL
   req.body.DETALLE_EVALUACION.ALINEACION_DENTAL.ID_EVALUACION = ID_EVALUACION;
   const resultadoEvaluacion = await querysAlineacionDental.registrarAlineacionDental(req.body.DETALLE_EVALUACION.ALINEACION_DENTAL);
   
   // DETALLE EVALUACION - DEGLUCION
   req.body.DETALLE_EVALUACION.DEGLUCION.ID_EVALUACION = ID_EVALUACION;
   const resultadoDeglucion = await querysDeglucion.registrarDeglucion(req.body.DETALLE_EVALUACION.DEGLUCION);

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