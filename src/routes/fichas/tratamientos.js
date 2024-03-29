const express = require('express');
const router = express.Router();

const querysTratamientos = require('./controllers/querysTratamientos');
const querysFichas = require('../fichas/controllers/querysFichas');
const querysHistorialOdonto = require('./controllers/querysHistorialOdonto');
const querysPacientes = require('../pacientes/controllers/querysPacientes');
const guardia = require('./../../config/guardia');

router.post('/tratamientos', guardia, async (req, res) => {
   let contador = 0;

   if (req.body.TRATAMIENTOS.length > 0) {
      let arreglo = req.body.TRATAMIENTOS;

      for (let element of arreglo) {
         contador++;
         const resultado = await querysTratamientos.registrarTratamiento(element, contador);
      }

      res.json({ MENSAJE: 'TRATAMIENTOS REGISTRADOS', CUENTA: contador });
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

router.get('/tratamientos/:id', guardia, async (req, res) => {
   const resultado = await querysTratamientos.obtenerTratamientos(req.params);
   res.json(resultado);
});

router.put('/tratamientos/:id', guardia, async (req, res) => {
   let contador = 0;
   const resultado = await querysTratamientos.eliminarTratamientos(req.params);
   let resultadoHistorialO = await querysHistorialOdonto.obtenerHistorialOdontodologicoEspecifico(req.params);
   let resultadoFichas = await querysFichas.obtenerListadoFichasEspecifico({ id: resultadoHistorialO.ID_FICHA });

   if (resultado.ID != -1) {
      if (req.body.TRATAMIENTOS.length > 0) {
         let arreglo = req.body.TRATAMIENTOS;

         for (let element of arreglo) {
            contador++;
            const resultado = await querysTratamientos.registrarTratamiento(element, contador);
         }

         // Actualizacion de Saldos - Ficha
         const resultadoSaldoFicha = await querysFichas.actualizarSaldoFicha(resultadoFichas.ID_USUARIO, resultadoFichas.ID_FICHA);
         // Actualizavion de Saldos - Pacientes
         const resultadoSaldoPaciente = await querysPacientes.actualizarSaldoPaciente(resultadoFichas.ID_USUARIO, resultadoFichas.ID_PACIENTE);

         res.json({ MENSAJE: 'TRATAMIENTOS REGISTRADOS', CUENTA: contador });
      }
      else {
         res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
      }
   }
   else {
      res.json({ MENSAJE: 'ERROR', CUENTA: -1 });
   }
});

router.delete('/tratamientos/:id', guardia, async (req, res) => {
   const resultado = await querysTratamientos.eliminarTratamientos(req.params);
   res.json(resultado);
});

module.exports = router;