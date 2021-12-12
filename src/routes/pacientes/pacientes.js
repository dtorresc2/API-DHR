const express = require('express');
const router = express.Router();

const querysPacientes = require('../pacientes/controllers/querysPacientes');
const guardia = require('./../../config/guardia');

router.get('/version', async (req, res) => {
   const version = await querysPacientes.obtenerVersionMYSQL();
   res.json(version);
});

router.post('/pacientes/listado', guardia, async (req, res) => {
   const resultado = await querysPacientes.obtenerListadoPacientes(req.body);
   res.json(resultado);
});

router.post('/pacientes', guardia, async (req, res) => {
   const resultado = await querysPacientes.comprobarPaciente(req.body);
   if (resultado.CONTEO < 1) {
      const resultadoRegistro = await querysPacientes.registrarPaciente(req.body);
      res.json(resultadoRegistro);
   }
   else {
      res.json({ ID: -2, MENSAJE: "PACIENTE DUPLICADO" })
   }
});

router.put('/pacientes/:id', guardia, async (req, res) => {
   const resultadoRegistro = await querysPacientes.actualizarPaciente(req.params, req.body);
   res.json(resultadoRegistro);
});

router.put('/pacientes/:id/estado', guardia, async (req, res) => {
   const resultadoRegistro = await querysPacientes.actualizarEstadoPaciente(req.params, req.body);
   res.json(resultadoRegistro);
});

router.delete('/pacientes/:id', guardia, async (req, res) => {
   const resultado = await querysPacientes.eliminarPaciente(req.params);
   res.json(resultado);
});

module.exports = router;