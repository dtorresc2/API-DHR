const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const funcionesS3 = require('./../../config/s3');
const guardia = require('./../../config/guardia');

const querysEvaluaciones = require('./controllers/querysEvaluaciones');
const querysContrato = require('./controllers/querysContrato');
const querysAlineacionDental = require('./controllers/querysAlineacionDental');
const querysDeglucion = require('./controllers/querysDeglucion');
const querysDesarrollo = require('./controllers/querysDesarrollo');
const querysDisfucion = require('./controllers/querysDisfucionTMJ');
const querysFaSuperior = require('./controllers/querysFaSuperior');
const querysFaInferior = require('./controllers/querysFAInferior');
const querysHabitos = require('./controllers/querysHabitos');
const querysLabios = require('./controllers/querysLabios');

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

   // DETALLE EVALUACION - DESARROLLO
   req.body.DETALLE_EVALUACION.DESARROLLO.ID_EVALUACION = ID_EVALUACION;
   const resultadoDesarrollo = await querysDesarrollo.registrarDesarrollo(req.body.DETALLE_EVALUACION.DESARROLLO);

   // DETALLE EVALUACION - DISFUCION TMJ
   req.body.DETALLE_EVALUACION.DISFUCION_TMJ.ID_EVALUACION = ID_EVALUACION;
   const resultadoDisfucion = await querysDisfucion.registrarDisfucion(req.body.DETALLE_EVALUACION.DISFUCION_TMJ);

   // DETALLE EVALUACION - FA SUPERIOR
   req.body.DETALLE_EVALUACION.FA_SUPERIOR.ID_EVALUACION = ID_EVALUACION;
   const resultadoFASuperior = await querysFaSuperior.registrarFASuperior(req.body.DETALLE_EVALUACION.FA_SUPERIOR);

   // DETALLE EVALUACION - FA SUPERIOR
   req.body.DETALLE_EVALUACION.FA_INFERIOR.ID_EVALUACION = ID_EVALUACION;
   const resultadoFAInferior = await querysFaInferior.registrarFAInferior(req.body.DETALLE_EVALUACION.FA_INFERIOR);

   // DETALLE EVALUACION - HABITOS
   req.body.DETALLE_EVALUACION.HABITOS.ID_EVALUACION = ID_EVALUACION;
   const resultadoHabitos = await querysHabitos.registrarHabitos(req.body.DETALLE_EVALUACION.HABITOS);

   // DETALLE EVALUACION - LABIOS
   req.body.DETALLE_EVALUACION.LABIOS.ID_EVALUACION = ID_EVALUACION;
   const resultadoLabios = await querysLabios.registrarLabios(req.body.DETALLE_EVALUACION.LABIOS);

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
