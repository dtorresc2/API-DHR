const express = require('express');
const router = express.Router();

const querysPacientes = require('../pacientes/controllers/querysPacientes');

router.get('/version', async (req, res) => {
   const version = await querysPacientes.obtenerVersionMYSQL();
   res.json(version);
});

router.get('/pacientes', async (req, res) => {
   const resultado = await querysPacientes.obtenerListadoPacientes();
   res.json(resultado);
});

router.get('/pacientes/:id', async (req, res) => {
   const resultado = await querysPacientes.obtenerPacienteEspecifico(req.params);
   res.json(resultado);
});

router.get('/pacientes/:id/usuario', async (req, res) => {
   const resultado = await querysPacientes.obtenerListadoPacientesPorUsuario(req.params);
   res.json(resultado);
});

router.post('/pacientes', async (req, res) => {
   const resultado = await querysPacientes.comprobarPaciente(req.body);
   if (resultado.CONTEO < 1) {
      const resultadoRegistro = await querysPacientes.registrarPaciente(req.body);
      res.json(resultadoRegistro);
   }
   else {
      res.json({ ID: -2, MENSAJE: "PACIENTE DUPLICADO" })
   }
});

router.put('/pacientes/:id', async (req, res) => {
   const resultadoRegistro = await querysPacientes.actualizarPaciente(req.params, req.body);
   res.json(resultadoRegistro);
});

router.put('/pacientes/:id/estado', async (req, res) => {
   const resultadoRegistro = await querysPacientes.actualizarEstadoPaciente(req.params, req.body);
   res.json(resultadoRegistro);
});

router.delete('/pacientes/:id', async (req, res) => {
   const resultado = await querysPacientes.eliminarPaciente(req.params);
   res.json(resultado);
});

module.exports = router;