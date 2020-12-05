const express = require('express');
const router = express.Router();

const querysHistorialMed = require('./controllers/querysHistorialMed');

router.post('/historial-medico', async (req, res) => {
   const resultado = await querysHistorialMed.registrarHistorialMed(req.body);
   res.json(resultado);
});

router.get('/historial-medico/:id', async (req, res) => {
   const resultado = await querysHistorialMed.obtenerHistorialMedico(req.params);
   res.json(resultado);
});

router.put('/historial-medico/:id', async (req, res) => {
   const resultado = await querysHistorialMed.actualizarHistorialMedico(req.params, req.body);
   res.json(resultado);
});

router.delete('/historial-medico/:id', async (req, res) => {
   const resultado = await querysHistorialMed.eliminarHistorialMedico(req.params);
   res.json(resultado);
});

module.exports = router;