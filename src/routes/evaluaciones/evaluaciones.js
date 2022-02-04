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
const querysLengua = require('./controllers/querysLengua');
const querysOclusion = require('./controllers/querysOclusion');
const querysRespiracion = require('./controllers/querysRespiracion');
const querysVisitas = require('./controllers/querysVisitas');
const querysPagosEvaluacion = require('./controllers/querysPagosEvaluacion');
const querysFotosEvaluacion = require('./controllers/querysFotosEvaluacion');

router.post('/evaluaciones/registro', guardia, async (req, res) => {
   const FECHA_ACTUAL = moment().tz("America/Guatemala").format('YYYY/MM/DD HH:mm:ss');
   req.body.EVALUACION.FECHA = FECHA_ACTUAL;

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

   // DETALLE EVALUACION - LENGUA
   req.body.DETALLE_EVALUACION.LENGUA.ID_EVALUACION = ID_EVALUACION;
   const resultadoLengua = await querysLengua.registrarLengua(req.body.DETALLE_EVALUACION.LENGUA);

   // DETALLE EVALUACION - OCLUSION
   req.body.DETALLE_EVALUACION.OCLUSION.ID_EVALUACION = ID_EVALUACION;
   const resultadoOclusion = await querysOclusion.registrarOclusion(req.body.DETALLE_EVALUACION.OCLUSION);

   // DETALLE EVALUACION - RESPIRACION
   req.body.DETALLE_EVALUACION.RESPIRACION.ID_EVALUACION = ID_EVALUACION;
   const resultadoRespiracion = await querysRespiracion.registrarRespiracion(req.body.DETALLE_EVALUACION.RESPIRACION);

   // DETALLE VISITAS
   let contador = 0;
   if (req.body.VISITAS.length > 0) {
      let arreglo = req.body.VISITAS;

      for (let element of arreglo) {
         contador++;
         element.FECHA = FECHA_ACTUAL;
         element.ID_EVALUACION = ID_EVALUACION;
         const resultado = await querysVisitas.registrarVisita(element);
      }
   }

   // DETALLE PAGOS
   contador = 0;

   if (req.body.PAGOS.length > 0) {
      let arreglo = req.body.PAGOS;

      for (let element of arreglo) {
         contador++;
         element.FECHA = FECHA_ACTUAL;
         element.ID_EVALUACION = ID_EVALUACION;
         const resultado = await querysPagosEvaluacion.registrarPago(element);
      }
   }

   // FOTOS
   contador = 0;

   if (req.body.FOTOS.length > 0) {
      let arreglo = req.body.FOTOS;

      for (let element of arreglo) {
         contador++;
         element.ID_EVALUACION = ID_EVALUACION;

         // RegistrarImagen
         let ruta = "Usuarios/" + req.body.EVALUACION.ID_USUARIO + "/FE/FE-" + ID_EVALUACION;
         let nombre = "F-" + (contador + 1);
         let nombreArchivo = `${ruta}/${nombre}.jpg`

         const buffer = Buffer.from(element.FOTO, 'base64');
         const resultadoURL = await funcionesS3.imageUpload(nombreArchivo, buffer);

         // Ajustar Datos
         element.DESCRIPCION = "FOTO EVALUACION - Foto #" + (contador + 1);
         element.URL = ruta;
         element.NOMBRE = nombre + '.jpg';

         const resultadoFoto = await querysFotosEvaluacion.registrarFoto(element);
      }
   }
   // Actualizacion de Saldos - Evaluacion
   const resultadoSaldoFicha = await querysEvaluaciones.actualizarSaldoEvaluacion(req.body.EVALUACION.ID_USUARIO, ID_EVALUACION);
   // Actualizavion de Saldos - Pacientes
   // const resultadoSaldoPaciente = await querysPacientes.actualizarSaldoPaciente(resultadoFichas.ID_USUARIO, resultadoFichas.ID_PACIENTE);

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