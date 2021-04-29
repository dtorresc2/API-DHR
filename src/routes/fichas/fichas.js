const express = require('express');
const router = express.Router();

const querysFichas = require('../fichas/controllers/querysFichas');
const querysHistorialM = require('./controllers/querysHistorialMed');

router.post('/fichas', async (req, res) => {
   // Registrar Ficha
   // let conteo = await querysFichas.obtenerConteoFichas(req.body.ID_USUARIO);
   // req.body.CODIGO_INTERNO = conteo.CONTEO;
   // let resultadoFicha = await querysFichas.registrarFicha(req.body);

   // Registrar Historial Medico
   // let resultadoHM = await querysHistorialM.registrarHistorialMedico(req.body);
   // Registrar Padecimientos

   // Registrar Historial Odontodologico

   // Registrar Tratamientos

   // Registrar Historial Fotografico

   // Registrar Pagos

   // DATOS DE FICHA
   console.log('-> FICHA <-');
   console.log('FICHA => ', req.body.FICHA);
   console.log('');
   // DATOS DE HISTORIAL MEDICO
   req.body.HISTORIAL_MEDICO.ID_FICHA = 23;
   console.log('HISTORIAL MEDICO => ', req.body.HISTORIAL_MEDICO);
   console.log('');

   // DATOS DE PADECIMIENTOS
   req.body.HISTORIAL_MEDICO.PADECIMIENTOS.ID_HISTORIAL_MEDICO = 34;
   console.log('PADECIMIENTOS => ', req.body.HISTORIAL_MEDICO.PADECIMIENTOS);
   console.log('');

   // DATOS DE HISTORIAL ODONTO
   req.body.HISTORIAL_ODONTO.ID_FICHA = 23;
   console.log('HISTORIAL ODONTO => ', req.body.HISTORIAL_ODONTO);
   console.log('');

   // TRATAMIENTOS
   for (let i = 0; i < req.body.HISTORIAL_ODONTO.TRATAMIENTOS.length; i++) {
      req.body.HISTORIAL_ODONTO.TRATAMIENTOS[i].ID_HISTORIAL_ODONTO = 51;
   }
   console.log('TRATAMIENTOS => ', req.body.HISTORIAL_ODONTO.TRATAMIENTOS);
   console.log('');

   // FOTOS
   for (let i = 0; i < req.body.HISTORIAL_FOTOS.length; i++) {
      req.body.HISTORIAL_FOTOS[i].ID_FICHA = 66;
   }
   console.log('HISTORIAL_FOTOS => ', req.body.HISTORIAL_FOTOS);
   console.log('');

   // PAGOS
   for (let i = 0; i < req.body.PAGOS.length; i++) {
      req.body.PAGOS[i].ID_FICHA = 78;
   }
   console.log('PAGOS => ', req.body.PAGOS);
   console.log('');

   // {
   //     "CODIGO_INTERNO": 1,
   //     "FECHA" : "2020/11/28", 
   //     "MEDICO" : "LUCY", 
   //     "MOTIVO" : "Ficha de prueba", 
   //     "REFERENTE": "-", 
   //     "ID_PACIENTE": 1, 
   //     "ID_USUARIO": 1
   // }

   res.json(req.body);
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