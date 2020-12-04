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


module.exports = router;