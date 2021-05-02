const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');

const querysFichas = require('../fichas/controllers/querysFichas');
const querysHistorialM = require('./controllers/querysHistorialMed');
const querysPadecimientos = require('./controllers/querysPadecimientos');
const querysHistorialO = require('./controllers/querysHistorialOdonto');
const querysTratamientos = require('./controllers/querysTratamientos');

router.post('/fichas', async (req, res) => {
   const fechaMoment = moment().tz("America/Guatemala").format('YYYY/MM/DD');
   req.body.FICHA.FECHA = fechaMoment;

   // Registrar Ficha
   let conteo = await querysFichas.obtenerConteoFichas(req.body.FICHA.ID_USUARIO);
   req.body.FICHA.CODIGO_INTERNO = conteo.CONTEO;
   let resultadoFicha = await querysFichas.registrarFicha(req.body.FICHA);

   // Registrar Historial Medico
   req.body.HISTORIAL_MEDICO.ID_FICHA = resultadoFicha.ID;
   let resultadoHM = await querysHistorialM.registrarHistorialMedico(req.body.HISTORIAL_MEDICO);

   // Registrar Padecimientos
   req.body.HISTORIAL_MEDICO.PADECIMIENTOS.ID_HISTORIAL_MEDICO = resultadoHM.ID;
   let resultadoPAD = await querysPadecimientos.registrarPadecimientos(req.body.HISTORIAL_MEDICO.PADECIMIENTOS);

   // Registrar Historial Odontodologico
   req.body.HISTORIAL_ODONTO.ID_FICHA = resultadoFicha.ID;
   let resultadoHO = await querysHistorialO.registrarHistorialOdontodologico(req.body.HISTORIAL_ODONTO);

   // Registrar Tratamientos
   let contador = 0;

   for (let i = 0; i < req.body.HISTORIAL_ODONTO.TRATAMIENTOS.length; i++) {
      req.body.HISTORIAL_ODONTO.TRATAMIENTOS[i].ID_HISTORIAL_ODONTO = resultadoHO.ID;
      req.body.HISTORIAL_ODONTO.TRATAMIENTOS[i].FECHA = fechaMoment;
   }

   let arreglo = req.body.HISTORIAL_ODONTO.TRATAMIENTOS;
   for (let element of arreglo) {
      contador++;
      const resultado = await querysTratamientos.registrarTratamiento(element, contador);
   }

   // FOTOS
   // for (let i = 0; i < req.body.HISTORIAL_FOTOS.length; i++) {
   //    req.body.HISTORIAL_FOTOS[i].ID_FICHA = 66;
   // }
   // console.log('HISTORIAL_FOTOS => ', req.body.HISTORIAL_FOTOS);
   // console.log('');

   // PAGOS
   // for (let i = 0; i < req.body.PAGOS.length; i++) {
   //    req.body.PAGOS[i].ID_FICHA = 78;
   // }
   // console.log('PAGOS => ', req.body.PAGOS);
   // console.log('');

   res.json({
      ID: resultadoFicha.ID,
      ESTADO = true
   });
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