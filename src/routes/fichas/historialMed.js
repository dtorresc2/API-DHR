const express = require('express');
const router = express.Router();

const querysHistorialMed = require('./controllers/querysHistorialMed');
const guardia = require('./../../config/guardia');

router.post('/historial-medico', guardia, async (req, res) => {
   const resultado = await querysHistorialMed.registrarHistorialMedico(req.body);
   res.json(resultado);
});

router.get('/historial-medico/:id', guardia, async (req, res) => {
   const resultado = await querysHistorialMed.obtenerHistorialMedico(req.params);
   res.json(resultado);
});

router.put('/historial-medico/:id', guardia, async (req, res) => {
   const resultado = await querysHistorialMed.actualizarHistorialMedico(req.params, req.body);
   res.json(resultado);
});

router.delete('/historial-medico/:id', guardia, async (req, res) => {
   const resultado = await querysHistorialMed.eliminarHistorialMedico(req.params);
   res.json(resultado);
});

module.exports = router;